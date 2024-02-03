import type { ColumnUpdateNode, PrimitiveValueListNode, ValueNode } from 'kysely'
import { OperationNodeTransformer } from 'kysely'
import type { Serializer } from './serializer'

export class SerializeParametersTransformer extends OperationNodeTransformer {
  private serializer: Serializer

  public constructor(serializer: Serializer) {
    super()
    this.serializer = serializer
  }

  protected override transformPrimitiveValueList(
    node: PrimitiveValueListNode,
  ): PrimitiveValueListNode {
    return {
      ...node,
      values: node.values.map(this.serializer),
    }
  }

  // https://www.npmjs.com/package/zodsql
  protected override transformColumnUpdate(node: ColumnUpdateNode): ColumnUpdateNode {
    const { value: valueNode } = node

    if (valueNode.kind !== 'ValueNode') {
      return super.transformColumnUpdate(node)
    }

    const { value, ...item } = valueNode as ValueNode

    const serializedValue = this.serializer(value)

    return value === serializedValue
      ? super.transformColumnUpdate(node)
      : super.transformColumnUpdate({
        ...node,
        value: { ...item, value: serializedValue } as ValueNode,
      })
  }

  protected override transformValue(node: ValueNode): ValueNode {
    return {
      ...node,
      value: this.serializer(node.value),
    }
  }
}
