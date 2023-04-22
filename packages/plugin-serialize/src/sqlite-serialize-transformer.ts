import type { ColumnUpdateNode, PrimitiveValueListNode, ValueNode } from 'kysely'
import { OperationNodeTransformer } from 'kysely'

import type { Serializer } from './sqlite-serialize'
import { defaultSerializer } from './sqlite-serialize'

export class SerializeParametersTransformer extends OperationNodeTransformer {
  readonly #serializer: Serializer

  public constructor(serializer: Serializer | undefined) {
    super()
    this.#serializer = serializer || defaultSerializer
  }

  protected override transformPrimitiveValueList(
    node: PrimitiveValueListNode,
  ): PrimitiveValueListNode {
    return {
      ...node,
      values: node.values.map(this.#serializer),
    }
  }

  // https://www.npmjs.com/package/zodsql

  protected transformColumnUpdate(node: ColumnUpdateNode): ColumnUpdateNode {
    const { value: valueNode } = node

    if (valueNode.kind !== 'ValueNode') {
      return super.transformColumnUpdate(node)
    }

    const { value, ...item } = valueNode as ValueNode

    const serializedValue = this.#serializer(value)

    if (value === serializedValue) {
      return super.transformColumnUpdate(node)
    }

    return super.transformColumnUpdate({
      ...node,
      value: { ...item, value: serializedValue } as ValueNode,
    })
  }

  protected override transformValue(node: ValueNode): ValueNode {
    return {
      ...node,
      value: this.#serializer(node.value),
    }
  }
}
