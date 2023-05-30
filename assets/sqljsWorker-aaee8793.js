var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
(function() {
  var _props, _props2, _dynamicReference, _insertId, _numInsertedOrUpdatedRows, _props3, _props4, _props5, _props6, _numDeletedRows, _props7, _numUpdatedRows, _props8, _queryId, _transformers, _schema, _schemableIds, _isRootOperationNode, isRootOperationNode_fn, _collectSchemableIds, collectSchemableIds_fn, _collectSchemableIdsFromTableExpr, collectSchemableIdsFromTableExpr_fn, _collectSchemableId, collectSchemableId_fn, _removeCommonTableExpressionTables, removeCommonTableExpressionTables_fn, _transformer, _props9, _promise, _resolve, _reject, _plugins, _transformResult, transformResult_fn, _props10, _queryBuilder, _alias, _node, _expr, _alias2, _props11, _aggregateFunctionBuilder, _alias3, _props12, _props13, _props14, _props15, _node2, _node3, _props16, _props17, _props18, _props19, _props20, _props21, _props22, _props23, _props24, _props25, _props26, _transformer2, _props27, _props28, _props29, _props30, _executor, _driver, _compiler, _adapter, _connectionProvider, _driver2, _log, _initPromise, _destroyPromise, _connections, _needsLogging, needsLogging_fn, _addLogging, addLogging_fn, _logError, logError_fn, _logQuery, logQuery_fn, _calculateDurationMillis, calculateDurationMillis_fn, _connection, _runningPromise, _run, run_fn, _levels, _logger, _props31, _props32, _props33, _props34, _props35, _getExecutor, getExecutor_fn, _toOperationNode, toOperationNode_fn, _compile, compile_fn, _rawBuilder, _alias4, _visitors, _sql, _parameters, _db, _getTableMetadata, getTableMetadata_fn, _connectionMutex, _db2, _a, _promise2, _resolve2, _b, _config, _db3, _c, _db4, _onWrite, _d, _config2, _e, _serializer, _f, _serializeParametersTransformer, _deserializer, _data, _g, _status, _tableMap, _h;
  "use strict";
  function isUndefined(obj) {
    return typeof obj === "undefined" || obj === void 0;
  }
  function isString$1(obj) {
    return typeof obj === "string";
  }
  function isNumber(obj) {
    return typeof obj === "number";
  }
  function isBoolean$1(obj) {
    return typeof obj === "boolean";
  }
  function isNull(obj) {
    return obj === null;
  }
  function isDate(obj) {
    return obj instanceof Date;
  }
  function isBigInt(obj) {
    return typeof obj === "bigint";
  }
  function isFunction(obj) {
    return typeof obj === "function";
  }
  function isObject(obj) {
    return typeof obj === "object" && obj !== null;
  }
  function freeze(obj) {
    return Object.freeze(obj);
  }
  function isReadonlyArray(arg) {
    return Array.isArray(arg);
  }
  function noop(obj) {
    return obj;
  }
  const AlterTableNode = freeze({
    is(node) {
      return node.kind === "AlterTableNode";
    },
    create(table) {
      return freeze({
        kind: "AlterTableNode",
        table
      });
    },
    cloneWithTableProps(node, props) {
      return freeze({
        ...node,
        ...props
      });
    },
    cloneWithColumnAlteration(node, columnAlteration) {
      return freeze({
        ...node,
        columnAlterations: node.columnAlterations ? [...node.columnAlterations, columnAlteration] : [columnAlteration]
      });
    }
  });
  const IdentifierNode = freeze({
    is(node) {
      return node.kind === "IdentifierNode";
    },
    create(name) {
      return freeze({
        kind: "IdentifierNode",
        name
      });
    }
  });
  const CreateIndexNode = freeze({
    is(node) {
      return node.kind === "CreateIndexNode";
    },
    create(name) {
      return freeze({
        kind: "CreateIndexNode",
        name: IdentifierNode.create(name)
      });
    },
    cloneWith(node, props) {
      return freeze({
        ...node,
        ...props
      });
    },
    cloneWithColumns(node, columns) {
      return freeze({
        ...node,
        columns: [...node.columns || [], ...columns]
      });
    }
  });
  const CreateSchemaNode = freeze({
    is(node) {
      return node.kind === "CreateSchemaNode";
    },
    create(schema, params) {
      return freeze({
        kind: "CreateSchemaNode",
        schema: IdentifierNode.create(schema),
        ...params
      });
    },
    cloneWith(createSchema, params) {
      return freeze({
        ...createSchema,
        ...params
      });
    }
  });
  const ON_COMMIT_ACTIONS = ["preserve rows", "delete rows", "drop"];
  const CreateTableNode = freeze({
    is(node) {
      return node.kind === "CreateTableNode";
    },
    create(table) {
      return freeze({
        kind: "CreateTableNode",
        table,
        columns: freeze([])
      });
    },
    cloneWithColumn(createTable, column) {
      return freeze({
        ...createTable,
        columns: freeze([...createTable.columns, column])
      });
    },
    cloneWithConstraint(createTable, constraint) {
      return freeze({
        ...createTable,
        constraints: createTable.constraints ? freeze([...createTable.constraints, constraint]) : freeze([constraint])
      });
    },
    cloneWithFrontModifier(createTable, modifier) {
      return freeze({
        ...createTable,
        frontModifiers: createTable.frontModifiers ? freeze([...createTable.frontModifiers, modifier]) : freeze([modifier])
      });
    },
    cloneWithEndModifier(createTable, modifier) {
      return freeze({
        ...createTable,
        endModifiers: createTable.endModifiers ? freeze([...createTable.endModifiers, modifier]) : freeze([modifier])
      });
    },
    cloneWith(createTable, params) {
      return freeze({
        ...createTable,
        ...params
      });
    }
  });
  const SchemableIdentifierNode = freeze({
    is(node) {
      return node.kind === "SchemableIdentifierNode";
    },
    create(identifier) {
      return freeze({
        kind: "SchemableIdentifierNode",
        identifier: IdentifierNode.create(identifier)
      });
    },
    createWithSchema(schema, identifier) {
      return freeze({
        kind: "SchemableIdentifierNode",
        schema: IdentifierNode.create(schema),
        identifier: IdentifierNode.create(identifier)
      });
    }
  });
  const DropIndexNode = freeze({
    is(node) {
      return node.kind === "DropIndexNode";
    },
    create(name, params) {
      return freeze({
        kind: "DropIndexNode",
        name: SchemableIdentifierNode.create(name),
        ...params
      });
    },
    cloneWith(dropIndex, props) {
      return freeze({
        ...dropIndex,
        ...props
      });
    }
  });
  const DropSchemaNode = freeze({
    is(node) {
      return node.kind === "DropSchemaNode";
    },
    create(schema, params) {
      return freeze({
        kind: "DropSchemaNode",
        schema: IdentifierNode.create(schema),
        ...params
      });
    },
    cloneWith(dropSchema, params) {
      return freeze({
        ...dropSchema,
        ...params
      });
    }
  });
  const DropTableNode = freeze({
    is(node) {
      return node.kind === "DropTableNode";
    },
    create(table, params) {
      return freeze({
        kind: "DropTableNode",
        table,
        ...params
      });
    },
    cloneWith(dropIndex, params) {
      return freeze({
        ...dropIndex,
        ...params
      });
    }
  });
  const AliasNode = freeze({
    is(node) {
      return node.kind === "AliasNode";
    },
    create(node, alias) {
      return freeze({
        kind: "AliasNode",
        node,
        alias
      });
    }
  });
  const TableNode = freeze({
    is(node) {
      return node.kind === "TableNode";
    },
    create(table) {
      return freeze({
        kind: "TableNode",
        table: SchemableIdentifierNode.create(table)
      });
    },
    createWithSchema(schema, table) {
      return freeze({
        kind: "TableNode",
        table: SchemableIdentifierNode.createWithSchema(schema, table)
      });
    }
  });
  function isOperationNodeSource(obj) {
    return isObject(obj) && isFunction(obj.toOperationNode);
  }
  function isExpression(obj) {
    return isObject(obj) && "expressionType" in obj && isOperationNodeSource(obj);
  }
  function isAliasedExpression(obj) {
    return isObject(obj) && "expression" in obj && isString$1(obj.alias) && isOperationNodeSource(obj);
  }
  const SelectModifierNode = freeze({
    is(node) {
      return node.kind === "SelectModifierNode";
    },
    create(modifier) {
      return freeze({
        kind: "SelectModifierNode",
        modifier
      });
    },
    createWithExpression(modifier) {
      return freeze({
        kind: "SelectModifierNode",
        rawModifier: modifier
      });
    }
  });
  const AndNode = freeze({
    is(node) {
      return node.kind === "AndNode";
    },
    create(left, right) {
      return freeze({
        kind: "AndNode",
        left,
        right
      });
    }
  });
  const OrNode = freeze({
    is(node) {
      return node.kind === "OrNode";
    },
    create(left, right) {
      return freeze({
        kind: "OrNode",
        left,
        right
      });
    }
  });
  const OnNode = freeze({
    is(node) {
      return node.kind === "OnNode";
    },
    create(filter) {
      return freeze({
        kind: "OnNode",
        on: filter
      });
    },
    cloneWithOperation(onNode, operator, operation) {
      return freeze({
        ...onNode,
        on: operator === "And" ? AndNode.create(onNode.on, operation) : OrNode.create(onNode.on, operation)
      });
    }
  });
  const JoinNode = freeze({
    is(node) {
      return node.kind === "JoinNode";
    },
    create(joinType, table) {
      return freeze({
        kind: "JoinNode",
        joinType,
        table,
        on: void 0
      });
    },
    createWithOn(joinType, table, on) {
      return freeze({
        kind: "JoinNode",
        joinType,
        table,
        on: OnNode.create(on)
      });
    },
    cloneWithOn(joinNode, operation) {
      return freeze({
        ...joinNode,
        on: joinNode.on ? OnNode.cloneWithOperation(joinNode.on, "And", operation) : OnNode.create(operation)
      });
    },
    cloneWithOrOn(joinNode, operation) {
      return freeze({
        ...joinNode,
        on: joinNode.on ? OnNode.cloneWithOperation(joinNode.on, "Or", operation) : OnNode.create(operation)
      });
    }
  });
  const BinaryOperationNode = freeze({
    is(node) {
      return node.kind === "BinaryOperationNode";
    },
    create(leftOperand, operator, rightOperand) {
      return freeze({
        kind: "BinaryOperationNode",
        leftOperand,
        operator,
        rightOperand
      });
    }
  });
  const RawNode = freeze({
    is(node) {
      return node.kind === "RawNode";
    },
    create(sqlFragments, parameters) {
      return freeze({
        kind: "RawNode",
        sqlFragments: freeze(sqlFragments),
        parameters: freeze(parameters)
      });
    },
    createWithSql(sql2) {
      return RawNode.create([sql2], []);
    },
    createWithChild(child) {
      return RawNode.create(["", ""], [child]);
    },
    createWithChildren(children) {
      return RawNode.create(new Array(children.length + 1).fill(""), children);
    }
  });
  const COMPARISON_OPERATORS = [
    "=",
    "==",
    "!=",
    "<>",
    ">",
    ">=",
    "<",
    "<=",
    "in",
    "not in",
    "is",
    "is not",
    "like",
    "not like",
    "match",
    "ilike",
    "not ilike",
    "@>",
    "<@",
    "?",
    "?&",
    "!<",
    "!>",
    "<=>",
    "!~",
    "~",
    "~*",
    "!~*",
    "@@",
    "@@@",
    "!!",
    "<->"
  ];
  const ARITHMETIC_OPERATORS = [
    "+",
    "-",
    "*",
    "/",
    "%",
    "^",
    "&",
    "|",
    "#",
    "<<",
    ">>"
  ];
  const BINARY_OPERATORS = [
    ...COMPARISON_OPERATORS,
    ...ARITHMETIC_OPERATORS,
    "&&",
    "||"
  ];
  const UNARY_FILTER_OPERATORS = ["exists", "not exists"];
  const UNARY_OPERATORS = ["not", "-", ...UNARY_FILTER_OPERATORS];
  const OPERATORS = [...BINARY_OPERATORS, ...UNARY_OPERATORS];
  const OperatorNode = freeze({
    is(node) {
      return node.kind === "OperatorNode";
    },
    create(operator) {
      return freeze({
        kind: "OperatorNode",
        operator
      });
    }
  });
  function isBinaryOperator(op) {
    return isString$1(op) && BINARY_OPERATORS.includes(op);
  }
  function isComparisonOperator(op) {
    return isString$1(op) && COMPARISON_OPERATORS.includes(op);
  }
  const ParensNode = freeze({
    is(node) {
      return node.kind === "ParensNode";
    },
    create(node) {
      return freeze({
        kind: "ParensNode",
        node
      });
    }
  });
  const ColumnNode = freeze({
    is(node) {
      return node.kind === "ColumnNode";
    },
    create(column) {
      return freeze({
        kind: "ColumnNode",
        column: IdentifierNode.create(column)
      });
    }
  });
  const SelectAllNode = freeze({
    is(node) {
      return node.kind === "SelectAllNode";
    },
    create() {
      return freeze({
        kind: "SelectAllNode"
      });
    }
  });
  const ReferenceNode = freeze({
    is(node) {
      return node.kind === "ReferenceNode";
    },
    create(table, column) {
      return freeze({
        kind: "ReferenceNode",
        table,
        column
      });
    },
    createSelectAll(table) {
      return freeze({
        kind: "ReferenceNode",
        table,
        column: SelectAllNode.create()
      });
    }
  });
  const OrderByItemNode = freeze({
    is(node) {
      return node.kind === "OrderByItemNode";
    },
    create(orderBy, direction) {
      return freeze({
        kind: "OrderByItemNode",
        orderBy,
        direction
      });
    }
  });
  function isOrderByDirection(thing) {
    return thing === "asc" || thing === "desc";
  }
  function parseOrderBy(orderBy, direction) {
    return OrderByItemNode.create(parseOrderByExpression(orderBy), parseOrderByDirectionExpression(direction));
  }
  function parseOrderByExpression(expr) {
    return parseReferenceExpression(expr);
  }
  function parseOrderByDirectionExpression(expr) {
    if (!expr) {
      return void 0;
    }
    if (expr === "asc" || expr === "desc") {
      return RawNode.createWithSql(expr);
    } else {
      return expr.toOperationNode();
    }
  }
  function parseSimpleReferenceExpression(exp) {
    if (isString$1(exp)) {
      return parseStringReference(exp);
    }
    return exp.toOperationNode();
  }
  function parseReferenceExpressionOrList(arg) {
    if (isReadonlyArray(arg)) {
      return arg.map((it) => parseReferenceExpression(it));
    } else {
      return [parseReferenceExpression(arg)];
    }
  }
  function parseReferenceExpression(exp) {
    if (isExpressionOrFactory(exp)) {
      return parseExpression(exp);
    }
    return parseSimpleReferenceExpression(exp);
  }
  function parseStringReference(ref) {
    const COLUMN_SEPARATOR = ".";
    if (ref.includes(COLUMN_SEPARATOR)) {
      const parts = ref.split(COLUMN_SEPARATOR).map(trim$2);
      if (parts.length === 3) {
        return parseStringReferenceWithTableAndSchema(parts);
      } else if (parts.length === 2) {
        return parseStringReferenceWithTable(parts);
      } else {
        throw new Error(`invalid column reference ${ref}`);
      }
    } else {
      return ColumnNode.create(ref);
    }
  }
  function parseAliasedStringReference(ref) {
    const ALIAS_SEPARATOR = " as ";
    if (ref.includes(ALIAS_SEPARATOR)) {
      const [columnRef, alias] = ref.split(ALIAS_SEPARATOR).map(trim$2);
      return AliasNode.create(parseStringReference(columnRef), IdentifierNode.create(alias));
    } else {
      return parseStringReference(ref);
    }
  }
  function parseColumnName(column) {
    return ColumnNode.create(column);
  }
  function parseOrderedColumnName(column) {
    const ORDER_SEPARATOR = " ";
    if (column.includes(ORDER_SEPARATOR)) {
      const [columnName, order] = column.split(ORDER_SEPARATOR).map(trim$2);
      if (!isOrderByDirection(order)) {
        throw new Error(`invalid order direction "${order}" next to "${columnName}"`);
      }
      return parseOrderBy(columnName, order);
    } else {
      return parseColumnName(column);
    }
  }
  function parseStringReferenceWithTableAndSchema(parts) {
    const [schema, table, column] = parts;
    return ReferenceNode.create(TableNode.createWithSchema(schema, table), ColumnNode.create(column));
  }
  function parseStringReferenceWithTable(parts) {
    const [table, column] = parts;
    return ReferenceNode.create(TableNode.create(table), ColumnNode.create(column));
  }
  function trim$2(str) {
    return str.trim();
  }
  const PrimitiveValueListNode = freeze({
    is(node) {
      return node.kind === "PrimitiveValueListNode";
    },
    create(values) {
      return freeze({
        kind: "PrimitiveValueListNode",
        values: freeze([...values])
      });
    }
  });
  const ValueListNode = freeze({
    is(node) {
      return node.kind === "ValueListNode";
    },
    create(values) {
      return freeze({
        kind: "ValueListNode",
        values: freeze(values)
      });
    }
  });
  const ValueNode = freeze({
    is(node) {
      return node.kind === "ValueNode";
    },
    create(value) {
      return freeze({
        kind: "ValueNode",
        value
      });
    },
    createImmediate(value) {
      return freeze({
        kind: "ValueNode",
        value,
        immediate: true
      });
    }
  });
  function parseValueExpressionOrList(arg) {
    if (isReadonlyArray(arg)) {
      return parseValueExpressionList(arg);
    }
    return parseValueExpression(arg);
  }
  function parseValueExpression(exp) {
    if (isExpressionOrFactory(exp)) {
      return parseExpression(exp);
    }
    return ValueNode.create(exp);
  }
  function parseValueExpressionList(arg) {
    if (arg.some(isExpressionOrFactory)) {
      return ValueListNode.create(arg.map((it) => parseValueExpression(it)));
    }
    return PrimitiveValueListNode.create(arg);
  }
  const OrderByNode = freeze({
    is(node) {
      return node.kind === "OrderByNode";
    },
    create(item) {
      return freeze({
        kind: "OrderByNode",
        items: freeze([item])
      });
    },
    cloneWithItem(orderBy, item) {
      return freeze({
        ...orderBy,
        items: freeze([...orderBy.items, item])
      });
    }
  });
  const PartitionByNode = freeze({
    is(node) {
      return node.kind === "PartitionByNode";
    },
    create(items) {
      return freeze({
        kind: "PartitionByNode",
        items: freeze(items)
      });
    },
    cloneWithItems(partitionBy, items) {
      return freeze({
        ...partitionBy,
        items: freeze([...partitionBy.items, ...items])
      });
    }
  });
  const OverNode = freeze({
    is(node) {
      return node.kind === "OverNode";
    },
    create() {
      return freeze({
        kind: "OverNode"
      });
    },
    cloneWithOrderByItem(overNode, item) {
      return freeze({
        ...overNode,
        orderBy: overNode.orderBy ? OrderByNode.cloneWithItem(overNode.orderBy, item) : OrderByNode.create(item)
      });
    },
    cloneWithPartitionByItems(overNode, items) {
      return freeze({
        ...overNode,
        partitionBy: overNode.partitionBy ? PartitionByNode.cloneWithItems(overNode.partitionBy, items) : PartitionByNode.create(items)
      });
    }
  });
  const FromNode = freeze({
    is(node) {
      return node.kind === "FromNode";
    },
    create(froms) {
      return freeze({
        kind: "FromNode",
        froms: freeze(froms)
      });
    },
    cloneWithFroms(from, froms) {
      return freeze({
        ...from,
        froms: freeze([...from.froms, ...froms])
      });
    }
  });
  const GroupByNode = freeze({
    is(node) {
      return node.kind === "GroupByNode";
    },
    create(items) {
      return freeze({
        kind: "GroupByNode",
        items: freeze(items)
      });
    },
    cloneWithItems(groupBy, items) {
      return freeze({
        ...groupBy,
        items: freeze([...groupBy.items, ...items])
      });
    }
  });
  const HavingNode = freeze({
    is(node) {
      return node.kind === "HavingNode";
    },
    create(filter) {
      return freeze({
        kind: "HavingNode",
        having: filter
      });
    },
    cloneWithOperation(havingNode, operator, operation) {
      return freeze({
        ...havingNode,
        having: operator === "And" ? AndNode.create(havingNode.having, operation) : OrNode.create(havingNode.having, operation)
      });
    }
  });
  const SelectQueryNode = freeze({
    is(node) {
      return node.kind === "SelectQueryNode";
    },
    create(fromItems, withNode) {
      return freeze({
        kind: "SelectQueryNode",
        from: FromNode.create(fromItems),
        ...withNode && { with: withNode }
      });
    },
    cloneWithSelections(select, selections) {
      return freeze({
        ...select,
        selections: select.selections ? freeze([...select.selections, ...selections]) : freeze(selections)
      });
    },
    cloneWithDistinctOn(select, expressions) {
      return freeze({
        ...select,
        distinctOn: select.distinctOn ? freeze([...select.distinctOn, ...expressions]) : freeze(expressions)
      });
    },
    cloneWithFrontModifier(select, modifier) {
      return freeze({
        ...select,
        frontModifiers: select.frontModifiers ? freeze([...select.frontModifiers, modifier]) : freeze([modifier])
      });
    },
    cloneWithEndModifier(select, modifier) {
      return freeze({
        ...select,
        endModifiers: select.endModifiers ? freeze([...select.endModifiers, modifier]) : freeze([modifier])
      });
    },
    cloneWithOrderByItem(selectNode, item) {
      return freeze({
        ...selectNode,
        orderBy: selectNode.orderBy ? OrderByNode.cloneWithItem(selectNode.orderBy, item) : OrderByNode.create(item)
      });
    },
    cloneWithGroupByItems(selectNode, items) {
      return freeze({
        ...selectNode,
        groupBy: selectNode.groupBy ? GroupByNode.cloneWithItems(selectNode.groupBy, items) : GroupByNode.create(items)
      });
    },
    cloneWithLimit(selectNode, limit) {
      return freeze({
        ...selectNode,
        limit
      });
    },
    cloneWithOffset(selectNode, offset) {
      return freeze({
        ...selectNode,
        offset
      });
    },
    cloneWithHaving(selectNode, operation) {
      return freeze({
        ...selectNode,
        having: selectNode.having ? HavingNode.cloneWithOperation(selectNode.having, "And", operation) : HavingNode.create(operation)
      });
    },
    cloneWithOrHaving(selectNode, operation) {
      return freeze({
        ...selectNode,
        having: selectNode.having ? HavingNode.cloneWithOperation(selectNode.having, "Or", operation) : HavingNode.create(operation)
      });
    },
    cloneWithSetOperation(selectNode, setOperation) {
      return freeze({
        ...selectNode,
        setOperations: selectNode.setOperations ? freeze([...selectNode.setOperations, setOperation]) : freeze([setOperation])
      });
    },
    cloneWithoutSelections(select) {
      return freeze({
        ...select,
        selections: []
      });
    },
    cloneWithoutLimit(select) {
      return freeze({
        ...select,
        limit: void 0
      });
    },
    cloneWithoutOffset(select) {
      return freeze({
        ...select,
        offset: void 0
      });
    },
    cloneWithoutOrderBy(select) {
      return freeze({
        ...select,
        orderBy: void 0
      });
    }
  });
  const UnaryOperationNode = freeze({
    is(node) {
      return node.kind === "UnaryOperationNode";
    },
    create(operator, operand) {
      return freeze({
        kind: "UnaryOperationNode",
        operator,
        operand
      });
    }
  });
  function parseExists(operand) {
    return parseUnaryOperation("exists", operand);
  }
  function parseNotExists(operand) {
    return parseUnaryOperation("not exists", operand);
  }
  function parseUnaryOperation(operator, operand) {
    return UnaryOperationNode.create(OperatorNode.create(operator), parseReferenceExpression(operand));
  }
  function preventAwait(clazz, message) {
    Object.defineProperties(clazz.prototype, {
      then: {
        enumerable: false,
        value: () => {
          throw new Error(message);
        }
      }
    });
  }
  const _JoinBuilder = class {
    constructor(props) {
      __privateAdd(this, _props, void 0);
      __privateSet(this, _props, freeze(props));
    }
    on(...args) {
      return new _JoinBuilder({
        ...__privateGet(this, _props),
        joinNode: JoinNode.cloneWithOn(__privateGet(this, _props).joinNode, parseOn(args))
      });
    }
    /**
     * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
     */
    orOn(...args) {
      return new _JoinBuilder({
        ...__privateGet(this, _props),
        joinNode: JoinNode.cloneWithOrOn(__privateGet(this, _props).joinNode, parseOn(args))
      });
    }
    /**
     * Just like {@link WhereInterface.whereRef} but adds an item to the join's
     * `on` clause instead.
     *
     * See {@link WhereInterface.whereRef} for documentation and examples.
     */
    onRef(lhs, op, rhs) {
      return new _JoinBuilder({
        ...__privateGet(this, _props),
        joinNode: JoinNode.cloneWithOn(__privateGet(this, _props).joinNode, parseReferentialComparison(lhs, op, rhs))
      });
    }
    /**
     * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
     */
    orOnRef(lhs, op, rhs) {
      return new _JoinBuilder({
        ...__privateGet(this, _props),
        joinNode: JoinNode.cloneWithOrOn(__privateGet(this, _props).joinNode, parseReferentialComparison(lhs, op, rhs))
      });
    }
    /**
     * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
     */
    onExists(arg) {
      return new _JoinBuilder({
        ...__privateGet(this, _props),
        joinNode: JoinNode.cloneWithOn(__privateGet(this, _props).joinNode, parseExists(arg))
      });
    }
    /**
     * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
     */
    onNotExists(arg) {
      return new _JoinBuilder({
        ...__privateGet(this, _props),
        joinNode: JoinNode.cloneWithOn(__privateGet(this, _props).joinNode, parseNotExists(arg))
      });
    }
    /**
     * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
     */
    orOnExists(arg) {
      return new _JoinBuilder({
        ...__privateGet(this, _props),
        joinNode: JoinNode.cloneWithOrOn(__privateGet(this, _props).joinNode, parseExists(arg))
      });
    }
    /**
     * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
     */
    orOnNotExists(arg) {
      return new _JoinBuilder({
        ...__privateGet(this, _props),
        joinNode: JoinNode.cloneWithOrOn(__privateGet(this, _props).joinNode, parseNotExists(arg))
      });
    }
    /**
     * Adds `on true`.
     */
    onTrue() {
      return new _JoinBuilder({
        ...__privateGet(this, _props),
        joinNode: JoinNode.cloneWithOn(__privateGet(this, _props).joinNode, RawNode.createWithSql("true"))
      });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
      return func(this);
    }
    toOperationNode() {
      return __privateGet(this, _props).joinNode;
    }
  };
  let JoinBuilder = _JoinBuilder;
  _props = new WeakMap();
  preventAwait(JoinBuilder, "don't await JoinBuilder instances. They are never executed directly and are always just a part of a query.");
  const PartitionByItemNode = freeze({
    is(node) {
      return node.kind === "PartitionByItemNode";
    },
    create(partitionBy) {
      return freeze({
        kind: "PartitionByItemNode",
        partitionBy
      });
    }
  });
  function parsePartitionBy(partitionBy) {
    return parseReferenceExpressionOrList(partitionBy).map(PartitionByItemNode.create);
  }
  const _OverBuilder = class {
    constructor(props) {
      __privateAdd(this, _props2, void 0);
      __privateSet(this, _props2, freeze(props));
    }
    /**
     * Adds an order by clause item inside the over function.
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select(
     *     eb => eb.fn.avg<number>('age').over(
     *       ob => ob.orderBy('first_name', 'asc').orderBy('last_name', 'asc')
     *     ).as('average_age')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select avg("age") over(order by "first_name" asc, "last_name" asc) as "average_age"
     * from "person"
     * ```
     */
    orderBy(orderBy, direction) {
      return new _OverBuilder({
        overNode: OverNode.cloneWithOrderByItem(__privateGet(this, _props2).overNode, parseOrderBy(orderBy, direction))
      });
    }
    partitionBy(partitionBy) {
      return new _OverBuilder({
        overNode: OverNode.cloneWithPartitionByItems(__privateGet(this, _props2).overNode, parsePartitionBy(partitionBy))
      });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
      return func(this);
    }
    toOperationNode() {
      return __privateGet(this, _props2).overNode;
    }
  };
  let OverBuilder = _OverBuilder;
  _props2 = new WeakMap();
  preventAwait(OverBuilder, "don't await OverBuilder instances. They are never executed directly and are always just a part of a query.");
  const SelectionNode = freeze({
    is(node) {
      return node.kind === "SelectionNode";
    },
    create(selection) {
      return freeze({
        kind: "SelectionNode",
        selection
      });
    },
    createSelectAll() {
      return freeze({
        kind: "SelectionNode",
        selection: SelectAllNode.create()
      });
    },
    createSelectAllFromTable(table) {
      return freeze({
        kind: "SelectionNode",
        selection: ReferenceNode.createSelectAll(table)
      });
    }
  });
  class DynamicReferenceBuilder {
    constructor(reference) {
      __privateAdd(this, _dynamicReference, void 0);
      __privateSet(this, _dynamicReference, reference);
    }
    get dynamicReference() {
      return __privateGet(this, _dynamicReference);
    }
    /**
     * @private
     *
     * This needs to be here just so that the typings work. Without this
     * the generated .d.ts file contains no reference to the type param R
     * which causes this type to be equal to DynamicReferenceBuilder with
     * any R.
     */
    get refType() {
      return void 0;
    }
    toOperationNode() {
      return parseSimpleReferenceExpression(__privateGet(this, _dynamicReference));
    }
  }
  _dynamicReference = new WeakMap();
  function isDynamicReferenceBuilder(obj) {
    return isObject(obj) && isOperationNodeSource(obj) && isString$1(obj.dynamicReference);
  }
  function parseSelectArg(selection) {
    if (isFunction(selection)) {
      return parseSelectArg(selection(expressionBuilder()));
    } else if (isReadonlyArray(selection)) {
      return selection.map((it) => parseSelectExpression(it));
    } else {
      return [parseSelectExpression(selection)];
    }
  }
  function parseSelectExpression(selection) {
    if (isString$1(selection)) {
      return SelectionNode.create(parseAliasedStringReference(selection));
    } else if (isDynamicReferenceBuilder(selection)) {
      return SelectionNode.create(selection.toOperationNode());
    } else {
      return SelectionNode.create(parseAliasedExpression(selection));
    }
  }
  function parseSelectAll(table) {
    if (!table) {
      return [SelectionNode.createSelectAll()];
    } else if (Array.isArray(table)) {
      return table.map(parseSelectAllArg);
    } else {
      return [parseSelectAllArg(table)];
    }
  }
  function parseSelectAllArg(table) {
    if (isString$1(table)) {
      return SelectionNode.createSelectAllFromTable(parseTable(table));
    }
    throw new Error(`invalid value selectAll expression: ${JSON.stringify(table)}`);
  }
  const ValuesNode = freeze({
    is(node) {
      return node.kind === "ValuesNode";
    },
    create(values) {
      return freeze({
        kind: "ValuesNode",
        values: freeze(values)
      });
    }
  });
  const DefaultInsertValueNode = freeze({
    is(node) {
      return node.kind === "DefaultInsertValueNode";
    },
    create() {
      return freeze({
        kind: "DefaultInsertValueNode"
      });
    }
  });
  function parseInsertExpression(arg) {
    const objectOrList = isFunction(arg) ? arg(expressionBuilder()) : arg;
    const list = isReadonlyArray(objectOrList) ? objectOrList : freeze([objectOrList]);
    return parseInsertColumnsAndValues(list);
  }
  function parseInsertColumnsAndValues(rows) {
    const columns = parseColumnNamesAndIndexes(rows);
    return [
      freeze([...columns.keys()].map(ColumnNode.create)),
      ValuesNode.create(rows.map((row) => parseRowValues(row, columns)))
    ];
  }
  function parseColumnNamesAndIndexes(rows) {
    const columns = /* @__PURE__ */ new Map();
    for (const row of rows) {
      const cols = Object.keys(row);
      for (const col of cols) {
        if (!columns.has(col) && row[col] !== void 0) {
          columns.set(col, columns.size);
        }
      }
    }
    return columns;
  }
  function parseRowValues(row, columns) {
    const rowColumns = Object.keys(row);
    const rowValues = Array.from({
      length: columns.size
    });
    let hasUndefinedOrComplexColumns = false;
    for (const col of rowColumns) {
      const columnIdx = columns.get(col);
      if (isUndefined(columnIdx)) {
        continue;
      }
      const value = row[col];
      if (isUndefined(value) || isExpressionOrFactory(value)) {
        hasUndefinedOrComplexColumns = true;
      }
      rowValues[columnIdx] = value;
    }
    const hasMissingColumns = rowColumns.length < columns.size;
    if (hasMissingColumns || hasUndefinedOrComplexColumns) {
      const defaultValue = DefaultInsertValueNode.create();
      return ValueListNode.create(rowValues.map((it) => isUndefined(it) ? defaultValue : parseValueExpression(it)));
    }
    return PrimitiveValueListNode.create(rowValues);
  }
  const InsertQueryNode = freeze({
    is(node) {
      return node.kind === "InsertQueryNode";
    },
    create(into, withNode, replace) {
      return freeze({
        kind: "InsertQueryNode",
        into,
        ...withNode && { with: withNode },
        replace
      });
    },
    cloneWith(insertQuery, props) {
      return freeze({
        ...insertQuery,
        ...props
      });
    }
  });
  const UpdateQueryNode = freeze({
    is(node) {
      return node.kind === "UpdateQueryNode";
    },
    create(table, withNode) {
      return freeze({
        kind: "UpdateQueryNode",
        table,
        ...withNode && { with: withNode }
      });
    },
    cloneWithFromItems(updateQuery, fromItems) {
      return freeze({
        ...updateQuery,
        from: updateQuery.from ? FromNode.cloneWithFroms(updateQuery.from, fromItems) : FromNode.create(fromItems)
      });
    },
    cloneWithUpdates(updateQuery, updates) {
      return freeze({
        ...updateQuery,
        updates: updateQuery.updates ? freeze([...updateQuery.updates, ...updates]) : updates
      });
    }
  });
  const UsingNode = freeze({
    is(node) {
      return node.kind === "UsingNode";
    },
    create(tables) {
      return freeze({
        kind: "UsingNode",
        tables: freeze(tables)
      });
    },
    cloneWithTables(using, tables) {
      return freeze({
        ...using,
        tables: freeze([...using.tables, ...tables])
      });
    }
  });
  const DeleteQueryNode = freeze({
    is(node) {
      return node.kind === "DeleteQueryNode";
    },
    create(fromItems, withNode) {
      return freeze({
        kind: "DeleteQueryNode",
        from: FromNode.create(fromItems),
        ...withNode && { with: withNode }
      });
    },
    cloneWithOrderByItem(deleteNode, item) {
      return freeze({
        ...deleteNode,
        orderBy: deleteNode.orderBy ? OrderByNode.cloneWithItem(deleteNode.orderBy, item) : OrderByNode.create(item)
      });
    },
    cloneWithLimit(deleteNode, limit) {
      return freeze({
        ...deleteNode,
        limit
      });
    },
    cloneWithUsing(deleteNode, tables) {
      return freeze({
        ...deleteNode,
        using: deleteNode.using !== void 0 ? UsingNode.cloneWithTables(deleteNode.using, tables) : UsingNode.create(tables)
      });
    }
  });
  const WhereNode = freeze({
    is(node) {
      return node.kind === "WhereNode";
    },
    create(filter) {
      return freeze({
        kind: "WhereNode",
        where: filter
      });
    },
    cloneWithOperation(whereNode, operator, operation) {
      return freeze({
        ...whereNode,
        where: operator === "And" ? AndNode.create(whereNode.where, operation) : OrNode.create(whereNode.where, operation)
      });
    }
  });
  const ReturningNode = freeze({
    is(node) {
      return node.kind === "ReturningNode";
    },
    create(selections) {
      return freeze({
        kind: "ReturningNode",
        selections: freeze(selections)
      });
    },
    cloneWithSelections(returning, selections) {
      return freeze({
        ...returning,
        selections: returning.selections ? freeze([...returning.selections, ...selections]) : freeze(selections)
      });
    }
  });
  const ExplainNode = freeze({
    is(node) {
      return node.kind === "ExplainNode";
    },
    create(format, options) {
      return freeze({
        kind: "ExplainNode",
        format,
        options
      });
    }
  });
  const QueryNode = freeze({
    is(node) {
      return SelectQueryNode.is(node) || InsertQueryNode.is(node) || UpdateQueryNode.is(node) || DeleteQueryNode.is(node);
    },
    cloneWithWhere(node, operation) {
      return freeze({
        ...node,
        where: node.where ? WhereNode.cloneWithOperation(node.where, "And", operation) : WhereNode.create(operation)
      });
    },
    cloneWithOrWhere(node, operation) {
      return freeze({
        ...node,
        where: node.where ? WhereNode.cloneWithOperation(node.where, "Or", operation) : WhereNode.create(operation)
      });
    },
    cloneWithJoin(node, join) {
      return freeze({
        ...node,
        joins: node.joins ? freeze([...node.joins, join]) : freeze([join])
      });
    },
    cloneWithReturning(node, selections) {
      return freeze({
        ...node,
        returning: node.returning ? ReturningNode.cloneWithSelections(node.returning, selections) : ReturningNode.create(selections)
      });
    },
    cloneWithoutWhere(node) {
      return freeze({
        ...node,
        where: void 0
      });
    },
    cloneWithExplain(node, format, options) {
      return freeze({
        ...node,
        explain: ExplainNode.create(format, options == null ? void 0 : options.toOperationNode())
      });
    }
  });
  const ColumnUpdateNode = freeze({
    is(node) {
      return node.kind === "ColumnUpdateNode";
    },
    create(column, value) {
      return freeze({
        kind: "ColumnUpdateNode",
        column,
        value
      });
    }
  });
  function parseUpdateExpression(update) {
    const updateObj = isFunction(update) ? update(expressionBuilder()) : update;
    return Object.entries(updateObj).filter(([_, value]) => value !== void 0).map(([key, value]) => {
      return ColumnUpdateNode.create(ColumnNode.create(key), parseValueExpression(value));
    });
  }
  const OnDuplicateKeyNode = freeze({
    is(node) {
      return node.kind === "OnDuplicateKeyNode";
    },
    create(updates) {
      return freeze({
        kind: "OnDuplicateKeyNode",
        updates
      });
    }
  });
  class InsertResult {
    constructor(insertId, numInsertedOrUpdatedRows) {
      __privateAdd(this, _insertId, void 0);
      __privateAdd(this, _numInsertedOrUpdatedRows, void 0);
      __privateSet(this, _insertId, insertId);
      __privateSet(this, _numInsertedOrUpdatedRows, numInsertedOrUpdatedRows);
    }
    /**
     * The auto incrementing primary key
     */
    get insertId() {
      return __privateGet(this, _insertId);
    }
    /**
     * Affected rows count.
     */
    get numInsertedOrUpdatedRows() {
      return __privateGet(this, _numInsertedOrUpdatedRows);
    }
  }
  _insertId = new WeakMap();
  _numInsertedOrUpdatedRows = new WeakMap();
  for (const property of ["insertId", "numInsertedOrUpdatedRows"]) {
    Object.defineProperty(InsertResult.prototype, property, { enumerable: true });
  }
  class NoResultError extends Error {
    constructor(node) {
      super("no result");
      /**
       * The operation node tree of the query that was executed.
       */
      __publicField(this, "node");
      this.node = node;
    }
  }
  function isNoResultErrorConstructor(fn) {
    return Object.prototype.hasOwnProperty.call(fn, "prototype");
  }
  const OnConflictNode = freeze({
    is(node) {
      return node.kind === "OnConflictNode";
    },
    create() {
      return freeze({
        kind: "OnConflictNode"
      });
    },
    cloneWith(node, props) {
      return freeze({
        ...node,
        ...props
      });
    },
    cloneWithIndexWhere(node, operation) {
      return freeze({
        ...node,
        indexWhere: node.indexWhere ? WhereNode.cloneWithOperation(node.indexWhere, "And", operation) : WhereNode.create(operation)
      });
    },
    cloneWithIndexOrWhere(node, operation) {
      return freeze({
        ...node,
        indexWhere: node.indexWhere ? WhereNode.cloneWithOperation(node.indexWhere, "Or", operation) : WhereNode.create(operation)
      });
    },
    cloneWithUpdateWhere(node, operation) {
      return freeze({
        ...node,
        updateWhere: node.updateWhere ? WhereNode.cloneWithOperation(node.updateWhere, "And", operation) : WhereNode.create(operation)
      });
    },
    cloneWithUpdateOrWhere(node, operation) {
      return freeze({
        ...node,
        updateWhere: node.updateWhere ? WhereNode.cloneWithOperation(node.updateWhere, "Or", operation) : WhereNode.create(operation)
      });
    },
    cloneWithoutIndexWhere(node) {
      return freeze({
        ...node,
        indexWhere: void 0
      });
    },
    cloneWithoutUpdateWhere(node) {
      return freeze({
        ...node,
        updateWhere: void 0
      });
    }
  });
  const _OnConflictBuilder = class {
    constructor(props) {
      __privateAdd(this, _props3, void 0);
      __privateSet(this, _props3, freeze(props));
    }
    /**
     * Specify a single column as the conflict target.
     *
     * Also see the {@link columns}, {@link constraint} and {@link expression}
     * methods for alternative ways to specify the conflict target.
     */
    column(column) {
      const columnNode = ColumnNode.create(column);
      return new _OnConflictBuilder({
        ...__privateGet(this, _props3),
        onConflictNode: OnConflictNode.cloneWith(__privateGet(this, _props3).onConflictNode, {
          columns: __privateGet(this, _props3).onConflictNode.columns ? freeze([...__privateGet(this, _props3).onConflictNode.columns, columnNode]) : freeze([columnNode])
        })
      });
    }
    /**
     * Specify a list of columns as the conflict target.
     *
     * Also see the {@link column}, {@link constraint} and {@link expression}
     * methods for alternative ways to specify the conflict target.
     */
    columns(columns) {
      const columnNodes = columns.map(ColumnNode.create);
      return new _OnConflictBuilder({
        ...__privateGet(this, _props3),
        onConflictNode: OnConflictNode.cloneWith(__privateGet(this, _props3).onConflictNode, {
          columns: __privateGet(this, _props3).onConflictNode.columns ? freeze([...__privateGet(this, _props3).onConflictNode.columns, ...columnNodes]) : freeze(columnNodes)
        })
      });
    }
    /**
     * Specify a specific constraint by name as the conflict target.
     *
     * Also see the {@link column}, {@link columns} and {@link expression}
     * methods for alternative ways to specify the conflict target.
     */
    constraint(constraintName) {
      return new _OnConflictBuilder({
        ...__privateGet(this, _props3),
        onConflictNode: OnConflictNode.cloneWith(__privateGet(this, _props3).onConflictNode, {
          constraint: IdentifierNode.create(constraintName)
        })
      });
    }
    /**
     * Specify an expression as the conflict target.
     *
     * This can be used if the unique index is an expression index.
     *
     * Also see the {@link column}, {@link columns} and {@link constraint}
     * methods for alternative ways to specify the conflict target.
     */
    expression(expression) {
      return new _OnConflictBuilder({
        ...__privateGet(this, _props3),
        onConflictNode: OnConflictNode.cloneWith(__privateGet(this, _props3).onConflictNode, {
          indexExpression: expression.toOperationNode()
        })
      });
    }
    where(...args) {
      return new _OnConflictBuilder({
        ...__privateGet(this, _props3),
        onConflictNode: OnConflictNode.cloneWithIndexWhere(__privateGet(this, _props3).onConflictNode, parseWhere(args))
      });
    }
    /**
     * Specify an index predicate for the index target.
     *
     * See {@link WhereInterface.whereRef} for more info.
     */
    whereRef(lhs, op, rhs) {
      return new _OnConflictBuilder({
        ...__privateGet(this, _props3),
        onConflictNode: OnConflictNode.cloneWithIndexWhere(__privateGet(this, _props3).onConflictNode, parseReferentialComparison(lhs, op, rhs))
      });
    }
    /**
     * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
     */
    orWhere(...args) {
      return new _OnConflictBuilder({
        ...__privateGet(this, _props3),
        onConflictNode: OnConflictNode.cloneWithIndexOrWhere(__privateGet(this, _props3).onConflictNode, parseWhere(args))
      });
    }
    /**
     * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
     */
    orWhereRef(lhs, op, rhs) {
      return new _OnConflictBuilder({
        ...__privateGet(this, _props3),
        onConflictNode: OnConflictNode.cloneWithIndexOrWhere(__privateGet(this, _props3).onConflictNode, parseReferentialComparison(lhs, op, rhs))
      });
    }
    /**
     * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
     */
    whereExists(arg) {
      return new _OnConflictBuilder({
        ...__privateGet(this, _props3),
        onConflictNode: OnConflictNode.cloneWithIndexWhere(__privateGet(this, _props3).onConflictNode, parseExists(arg))
      });
    }
    /**
     * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
     */
    whereNotExists(arg) {
      return new _OnConflictBuilder({
        ...__privateGet(this, _props3),
        onConflictNode: OnConflictNode.cloneWithIndexWhere(__privateGet(this, _props3).onConflictNode, parseNotExists(arg))
      });
    }
    /**
     * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
     */
    orWhereExists(arg) {
      return new _OnConflictBuilder({
        ...__privateGet(this, _props3),
        onConflictNode: OnConflictNode.cloneWithIndexOrWhere(__privateGet(this, _props3).onConflictNode, parseExists(arg))
      });
    }
    /**
     * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
     */
    orWhereNotExists(arg) {
      return new _OnConflictBuilder({
        ...__privateGet(this, _props3),
        onConflictNode: OnConflictNode.cloneWithIndexOrWhere(__privateGet(this, _props3).onConflictNode, parseNotExists(arg))
      });
    }
    clearWhere() {
      return new _OnConflictBuilder({
        ...__privateGet(this, _props3),
        onConflictNode: OnConflictNode.cloneWithoutIndexWhere(__privateGet(this, _props3).onConflictNode)
      });
    }
    /**
     * Adds the "do nothing" conflict action.
     *
     * ### Examples
     *
     * ```ts
     * await db
     *   .insertInto('person')
     *   .values({ first_name, pic })
     *   .onConflict((oc) => oc
     *     .column('pic')
     *     .doNothing()
     *   )
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "pic")
     * values ($1, $2)
     * on conflict ("pic") do nothing
     * ```
     */
    doNothing() {
      return new OnConflictDoNothingBuilder({
        ...__privateGet(this, _props3),
        onConflictNode: OnConflictNode.cloneWith(__privateGet(this, _props3).onConflictNode, {
          doNothing: true
        })
      });
    }
    /**
     * Adds the "do update set" conflict action.
     *
     * ### Examples
     *
     * ```ts
     * await db
     *   .insertInto('person')
     *   .values({ first_name, pic })
     *   .onConflict((oc) => oc
     *     .column('pic')
     *     .doUpdateSet({ first_name })
     *   )
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name", "pic")
     * values ($1, $2)
     * on conflict ("pic")
     * do update set "first_name" = $3
     * ```
     *
     * In the next example we use the `ref` method to reference
     * columns of the virtual table `excluded` in a type-safe way
     * to create an upsert operation:
     *
     * ```ts
     * db.insertInto('person')
     *   .values(person)
     *   .onConflict((oc) => oc
     *     .column('id')
     *     .doUpdateSet((eb) => ({
     *       first_name: eb.ref('excluded.first_name'),
     *       last_name: eb.ref('excluded.last_name')
     *     }))
     *   )
     * ```
     */
    doUpdateSet(update) {
      return new OnConflictUpdateBuilder({
        ...__privateGet(this, _props3),
        onConflictNode: OnConflictNode.cloneWith(__privateGet(this, _props3).onConflictNode, {
          updates: parseUpdateExpression(update)
        })
      });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
      return func(this);
    }
  };
  let OnConflictBuilder = _OnConflictBuilder;
  _props3 = new WeakMap();
  preventAwait(OnConflictBuilder, "don't await OnConflictBuilder instances.");
  class OnConflictDoNothingBuilder {
    constructor(props) {
      __privateAdd(this, _props4, void 0);
      __privateSet(this, _props4, freeze(props));
    }
    toOperationNode() {
      return __privateGet(this, _props4).onConflictNode;
    }
  }
  _props4 = new WeakMap();
  preventAwait(OnConflictDoNothingBuilder, "don't await OnConflictDoNothingBuilder instances.");
  const _OnConflictUpdateBuilder = class {
    constructor(props) {
      __privateAdd(this, _props5, void 0);
      __privateSet(this, _props5, freeze(props));
    }
    where(...args) {
      return new _OnConflictUpdateBuilder({
        ...__privateGet(this, _props5),
        onConflictNode: OnConflictNode.cloneWithUpdateWhere(__privateGet(this, _props5).onConflictNode, parseWhere(args))
      });
    }
    /**
     * Specify a where condition for the update operation.
     *
     * See {@link WhereInterface.whereRef} for more info.
     */
    whereRef(lhs, op, rhs) {
      return new _OnConflictUpdateBuilder({
        ...__privateGet(this, _props5),
        onConflictNode: OnConflictNode.cloneWithUpdateWhere(__privateGet(this, _props5).onConflictNode, parseReferentialComparison(lhs, op, rhs))
      });
    }
    /**
     * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
     */
    orWhere(...args) {
      return new _OnConflictUpdateBuilder({
        ...__privateGet(this, _props5),
        onConflictNode: OnConflictNode.cloneWithUpdateOrWhere(__privateGet(this, _props5).onConflictNode, parseWhere(args))
      });
    }
    /**
     * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
     */
    orWhereRef(lhs, op, rhs) {
      return new _OnConflictUpdateBuilder({
        ...__privateGet(this, _props5),
        onConflictNode: OnConflictNode.cloneWithUpdateOrWhere(__privateGet(this, _props5).onConflictNode, parseReferentialComparison(lhs, op, rhs))
      });
    }
    /**
     * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
     */
    whereExists(arg) {
      return new _OnConflictUpdateBuilder({
        ...__privateGet(this, _props5),
        onConflictNode: OnConflictNode.cloneWithUpdateWhere(__privateGet(this, _props5).onConflictNode, parseExists(arg))
      });
    }
    /**
     * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
     */
    whereNotExists(arg) {
      return new _OnConflictUpdateBuilder({
        ...__privateGet(this, _props5),
        onConflictNode: OnConflictNode.cloneWithUpdateWhere(__privateGet(this, _props5).onConflictNode, parseNotExists(arg))
      });
    }
    /**
     * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
     */
    orWhereExists(arg) {
      return new _OnConflictUpdateBuilder({
        ...__privateGet(this, _props5),
        onConflictNode: OnConflictNode.cloneWithUpdateOrWhere(__privateGet(this, _props5).onConflictNode, parseExists(arg))
      });
    }
    /**
     * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
     */
    orWhereNotExists(arg) {
      return new _OnConflictUpdateBuilder({
        ...__privateGet(this, _props5),
        onConflictNode: OnConflictNode.cloneWithUpdateOrWhere(__privateGet(this, _props5).onConflictNode, parseNotExists(arg))
      });
    }
    clearWhere() {
      return new _OnConflictUpdateBuilder({
        ...__privateGet(this, _props5),
        onConflictNode: OnConflictNode.cloneWithoutUpdateWhere(__privateGet(this, _props5).onConflictNode)
      });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
      return func(this);
    }
    toOperationNode() {
      return __privateGet(this, _props5).onConflictNode;
    }
  };
  let OnConflictUpdateBuilder = _OnConflictUpdateBuilder;
  _props5 = new WeakMap();
  preventAwait(OnConflictUpdateBuilder, "don't await OnConflictUpdateBuilder instances.");
  const _InsertQueryBuilder = class {
    constructor(props) {
      __privateAdd(this, _props6, void 0);
      __privateSet(this, _props6, freeze(props));
    }
    values(insert) {
      const [columns, values] = parseInsertExpression(insert);
      return new _InsertQueryBuilder({
        ...__privateGet(this, _props6),
        queryNode: InsertQueryNode.cloneWith(__privateGet(this, _props6).queryNode, {
          columns,
          values
        })
      });
    }
    /**
     * Sets the columns to insert.
     *
     * The {@link values} method sets both the columns and the values and this method
     * is not needed. But if you are using the {@link expression} method, you can use
     * this method to set the columns to insert.
     *
     * ### Examples
     *
     * ```ts
     * db.insertInto('person')
     *   .columns(['first_name'])
     *   .expression((eb) => eb.selectFrom('pet').select('pet.name'))
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name")
     * select "pet"."name" from "pet"
     * ```
     */
    columns(columns) {
      return new _InsertQueryBuilder({
        ...__privateGet(this, _props6),
        queryNode: InsertQueryNode.cloneWith(__privateGet(this, _props6).queryNode, {
          columns: freeze(columns.map(ColumnNode.create))
        })
      });
    }
    /**
     * Insert an arbitrary expression. For example the result of a select query.
     *
     * ### Examples
     *
     * ```ts
     * db.insertInto('person')
     *   .columns(['first_name'])
     *   .expression((eb) => eb.selectFrom('pet').select('pet.name'))
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "person" ("first_name")
     * select "pet"."name" from "pet"
     * ```
     */
    expression(expression) {
      return new _InsertQueryBuilder({
        ...__privateGet(this, _props6),
        queryNode: InsertQueryNode.cloneWith(__privateGet(this, _props6).queryNode, {
          values: parseExpression(expression)
        })
      });
    }
    /**
     * Changes an `insert into` query to an `insert ignore into` query.
     *
     * If you use the ignore modifier, ignorable errors that occur while executing the
     * insert statement are ignored. For example, without ignore, a row that duplicates
     * an existing unique index or primary key value in the table causes a duplicate-key
     * error and the statement is aborted. With ignore, the row is discarded and no error
     * occurs.
     *
     * This is only supported on some dialects like MySQL. On most dialects you should
     * use the {@link onConflict} method.
     *
     * ### Examples
     *
     * ```ts
     * await db.insertInto('person')
     *   .ignore()
     *   .values(values)
     *   .execute()
     * ```
     */
    ignore() {
      return new _InsertQueryBuilder({
        ...__privateGet(this, _props6),
        queryNode: InsertQueryNode.cloneWith(__privateGet(this, _props6).queryNode, {
          ignore: true
        })
      });
    }
    /**
     * Adds an `on conflict` clause to the query.
     *
     * `on conflict` is only supported by some dialects like PostgreSQL and SQLite. On MySQL
     * you can use {@link ignore} and {@link onDuplicateKeyUpdate} to achieve similar results.
     *
     * ### Examples
     *
     * ```ts
     * await db
     *   .insertInto('pet')
     *   .values({
     *     name: 'Catto',
     *     species: 'cat',
     *   })
     *   .onConflict((oc) => oc
     *     .column('name')
     *     .doUpdateSet({ species: 'hamster' })
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "pet" ("name", "species")
     * values ($1, $2)
     * on conflict ("name")
     * do update set "species" = $3
     * ```
     *
     * You can provide the name of the constraint instead of a column name:
     *
     * ```ts
     * await db
     *   .insertInto('pet')
     *   .values({
     *     name: 'Catto',
     *     species: 'cat',
     *   })
     *   .onConflict((oc) => oc
     *     .constraint('pet_name_key')
     *     .doUpdateSet({ species: 'hamster' })
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "pet" ("name", "species")
     * values ($1, $2)
     * on conflict on constraint "pet_name_key"
     * do update set "species" = $3
     * ```
     *
     * You can also specify an expression as the conflict target in case
     * the unique index is an expression index:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db
     *   .insertInto('pet')
     *   .values({
     *     name: 'Catto',
     *     species: 'cat',
     *   })
     *   .onConflict((oc) => oc
     *     .expression(sql`lower(name)`)
     *     .doUpdateSet({ species: 'hamster' })
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "pet" ("name", "species")
     * values ($1, $2)
     * on conflict (lower(name))
     * do update set "species" = $3
     * ```
     *
     * You can add a filter for the update statement like this:
     *
     * ```ts
     * await db
     *   .insertInto('pet')
     *   .values({
     *     name: 'Catto',
     *     species: 'cat',
     *   })
     *   .onConflict((oc) => oc
     *     .column('name')
     *     .doUpdateSet({ species: 'hamster' })
     *     .where('excluded.name', '!=', 'Catto'')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "pet" ("name", "species")
     * values ($1, $2)
     * on conflict ("name")
     * do update set "species" = $3
     * where "excluded"."name" != $4
     * ```
     *
     * You can create an `on conflict do nothing` clauses like this:
     *
     * ```ts
     * await db
     *   .insertInto('pet')
     *   .values({
     *     name: 'Catto',
     *     species: 'cat',
     *   })
     *   .onConflict((oc) => oc
     *     .column('name')
     *     .doNothing()
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * insert into "pet" ("name", "species")
     * values ($1, $2)
     * on conflict ("name") do nothing
     * ```
     *
     * You can refer to the columns of the virtual `excluded` table
     * in a type-safe way using a callback and the `ref` method of
     * `ExpressionBuilder`:
     *
     * ```ts
     * db.insertInto('person')
     *   .values(person)
     *   .onConflict(oc => oc
     *     .column('id')
     *     .doUpdateSet({
     *       first_name: (eb) => eb.ref('excluded.first_name'),
     *       last_name: (eb) => eb.ref('excluded.last_name')
     *     })
     *   )
     * ```
     */
    onConflict(callback) {
      return new _InsertQueryBuilder({
        ...__privateGet(this, _props6),
        queryNode: InsertQueryNode.cloneWith(__privateGet(this, _props6).queryNode, {
          onConflict: callback(new OnConflictBuilder({
            onConflictNode: OnConflictNode.create()
          })).toOperationNode()
        })
      });
    }
    /**
     * Adds `on duplicate key update` to the query.
     *
     * If you specify `on duplicate key update`, and a row is inserted that would cause
     * a duplicate value in a unique index or primary key, an update of the old row occurs.
     *
     * This is only implemented by some dialects like MySQL. On most dialects you should
     * use {@link onConflict} instead.
     *
     * ### Examples
     *
     * ```ts
     * await db
     *   .insertInto('person')
     *   .values(values)
     *   .onDuplicateKeyUpdate({ species: 'hamster' })
     * ```
     */
    onDuplicateKeyUpdate(update) {
      return new _InsertQueryBuilder({
        ...__privateGet(this, _props6),
        queryNode: InsertQueryNode.cloneWith(__privateGet(this, _props6).queryNode, {
          onDuplicateKey: OnDuplicateKeyNode.create(parseUpdateExpression(update))
        })
      });
    }
    returning(selection) {
      return new _InsertQueryBuilder({
        ...__privateGet(this, _props6),
        queryNode: QueryNode.cloneWithReturning(__privateGet(this, _props6).queryNode, parseSelectArg(selection))
      });
    }
    returningAll() {
      return new _InsertQueryBuilder({
        ...__privateGet(this, _props6),
        queryNode: QueryNode.cloneWithReturning(__privateGet(this, _props6).queryNode, parseSelectAll())
      });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     *
     * If you want to conditionally call a method on `this`, see
     * the {@link $if} method.
     *
     * ### Examples
     *
     * The next example uses a helper function `log` to log a query:
     *
     * ```ts
     * function log<T extends Compilable>(qb: T): T {
     *   console.log(qb.compile())
     *   return qb
     * }
     *
     * db.updateTable('person')
     *   .set(values)
     *   .$call(log)
     *   .execute()
     * ```
     */
    $call(func) {
      return func(this);
    }
    /**
     * @deprecated Use `$call` instead
     */
    call(func) {
      return this.$call(func);
    }
    /**
     * Call `func(this)` if `condition` is true.
     *
     * This method is especially handy with optional selects. Any `returning` or `returningAll`
     * method calls add columns as optional fields to the output type when called inside
     * the `func` callback. This is because we can't know if those selections were actually
     * made before running the code.
     *
     * You can also call any other methods inside the callback.
     *
     * ### Examples
     *
     * ```ts
     * async function insertPerson(values: InsertablePerson, returnLastName: boolean) {
     *   return await db
     *     .insertInto('person')
     *     .values(values)
     *     .returning(['id', 'first_name'])
     *     .$if(returnLastName, (qb) => qb.returning('last_name'))
     *     .executeTakeFirstOrThrow()
     * }
     * ```
     *
     * Any selections added inside the `if` callback will be added as optional fields to the
     * output type since we can't know if the selections were actually made before running
     * the code. In the example above the return type of the `insertPerson` function is:
     *
     * ```ts
     * {
     *   id: number
     *   first_name: string
     *   last_name?: string
     * }
     * ```
     */
    $if(condition, func) {
      if (condition) {
        return func(this);
      }
      return new _InsertQueryBuilder({
        ...__privateGet(this, _props6)
      });
    }
    /**
     * @deprecated Use `$if` instead
     */
    if(condition, func) {
      if (condition) {
        return func(this);
      }
      return new _InsertQueryBuilder({
        ...__privateGet(this, _props6)
      });
    }
    /**
     * Change the output type of the query.
     *
     * You should only use this method as the last resort if the types
     * don't support your use case.
     */
    $castTo() {
      return new _InsertQueryBuilder(__privateGet(this, _props6));
    }
    /**
     * @deprecated Use `$castTo` instead.
     */
    castTo() {
      return this.$castTo();
    }
    /**
     * Narrows (parts of) the output type of the query.
     *
     * Kysely tries to be as type-safe as possible, but in some cases we have to make
     * compromises for better maintainability and compilation performance. At present,
     * Kysely doesn't narrow the output type of the query based on {@link values} input
     * when using {@link returning} or {@link returningAll}.
     *
     * This utility method is very useful for these situations, as it removes unncessary
     * runtime assertion/guard code. Its input type is limited to the output type
     * of the query, so you can't add a column that doesn't exist, or change a column's
     * type to something that doesn't exist in its union type.
     *
     * ### Examples
     *
     * Turn this code:
     *
     * ```ts
     * const person = await db.insertInto('person')
     *   .values({ ...inputPerson, nullable_column: 'hell yeah!' })
     *   .returningAll()
     *   .executeTakeFirstOrThrow()
     *
     * if (nullable_column) {
     *   functionThatExpectsPersonWithNonNullValue(person)
     * }
     * ```
     *
     * Into this:
     *
     * ```ts
     * const person = await db.insertInto('person')
     *   .values({ ...inputPerson, nullable_column: 'hell yeah!' })
     *   .returningAll()
     *   .$narrowType<{ nullable_column: string }>()
     *   .executeTakeFirstOrThrow()
     *
     * functionThatExpectsPersonWithNonNullValue(person)
     * ```
     */
    $narrowType() {
      return new _InsertQueryBuilder(__privateGet(this, _props6));
    }
    /**
     * Asserts that query's output row type equals the given type `T`.
     *
     * This method can be used to simplify excessively complex types to make typescript happy
     * and much faster.
     *
     * Kysely uses complex type magic to achieve its type safety. This complexity is sometimes too much
     * for typescript and you get errors like this:
     *
     * ```
     * error TS2589: Type instantiation is excessively deep and possibly infinite.
     * ```
     *
     * In these case you can often use this method to help typescript a little bit. When you use this
     * method to assert the output type of a query, Kysely can drop the complex output type that
     * consists of multiple nested helper types and replace it with the simple asserted type.
     *
     * Using this method doesn't reduce type safety at all. You have to pass in a type that is
     * structurally equal to the current type.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .with('new_person', (qb) => qb
     *     .insertInto('person')
     *     .values(person)
     *     .returning('id')
     *     .$assertType<{ id: string }>()
     *   )
     *   .with('new_pet', (qb) => qb
     *     .insertInto('pet')
     *     .values((eb) => ({ owner_id: eb.selectFrom('new_person').select('id'), ...pet }))
     *     .returning(['name as pet_name', 'species'])
     *     .$assertType<{ pet_name: string, species: Species }>()
     *   )
     *   .selectFrom(['new_person', 'new_pet'])
     *   .selectAll()
     *   .executeTakeFirstOrThrow()
     * ```
     */
    $assertType() {
      return new _InsertQueryBuilder(__privateGet(this, _props6));
    }
    /**
     * @deprecated Use `$assertType` instead.
     */
    assertType() {
      return new _InsertQueryBuilder(__privateGet(this, _props6));
    }
    /**
     * Returns a copy of this InsertQueryBuilder instance with the given plugin installed.
     */
    withPlugin(plugin) {
      return new _InsertQueryBuilder({
        ...__privateGet(this, _props6),
        executor: __privateGet(this, _props6).executor.withPlugin(plugin)
      });
    }
    toOperationNode() {
      return __privateGet(this, _props6).executor.transformQuery(__privateGet(this, _props6).queryNode, __privateGet(this, _props6).queryId);
    }
    compile() {
      return __privateGet(this, _props6).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props6).queryId);
    }
    /**
     * Executes the query and returns an array of rows.
     *
     * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
     */
    async execute() {
      const compiledQuery = this.compile();
      const query = compiledQuery.query;
      const result = await __privateGet(this, _props6).executor.executeQuery(compiledQuery, __privateGet(this, _props6).queryId);
      if (__privateGet(this, _props6).executor.adapter.supportsReturning && query.returning) {
        return result.rows;
      }
      return [
        new InsertResult(
          result.insertId,
          // TODO: remove numUpdatedOrDeletedRows.
          result.numAffectedRows ?? result.numUpdatedOrDeletedRows
        )
      ];
    }
    /**
     * Executes the query and returns the first result or undefined if
     * the query returned no result.
     */
    async executeTakeFirst() {
      const [result] = await this.execute();
      return result;
    }
    /**
     * Executes the query and returns the first result or throws if
     * the query returned no result.
     *
     * By default an instance of {@link NoResultError} is thrown, but you can
     * provide a custom error class, or callback as the only argument to throw a different
     * error.
     */
    async executeTakeFirstOrThrow(errorConstructor = NoResultError) {
      const result = await this.executeTakeFirst();
      if (result === void 0) {
        const error = isNoResultErrorConstructor(errorConstructor) ? new errorConstructor(this.toOperationNode()) : errorConstructor(this.toOperationNode());
        throw error;
      }
      return result;
    }
    async *stream(chunkSize = 100) {
      const compiledQuery = this.compile();
      const stream = __privateGet(this, _props6).executor.stream(compiledQuery, chunkSize, __privateGet(this, _props6).queryId);
      for await (const item of stream) {
        yield* item.rows;
      }
    }
    async explain(format, options) {
      const builder = new _InsertQueryBuilder({
        ...__privateGet(this, _props6),
        queryNode: QueryNode.cloneWithExplain(__privateGet(this, _props6).queryNode, format, options)
      });
      return await builder.execute();
    }
  };
  let InsertQueryBuilder = _InsertQueryBuilder;
  _props6 = new WeakMap();
  preventAwait(InsertQueryBuilder, "don't await InsertQueryBuilder instances directly. To execute the query you need to call `execute` or `executeTakeFirst`.");
  class DeleteResult {
    constructor(numDeletedRows) {
      __privateAdd(this, _numDeletedRows, void 0);
      __privateSet(this, _numDeletedRows, numDeletedRows);
    }
    get numDeletedRows() {
      return __privateGet(this, _numDeletedRows);
    }
  }
  _numDeletedRows = new WeakMap();
  Object.defineProperty(DeleteResult.prototype, "numDeletedRows", {
    enumerable: true
  });
  const LimitNode = freeze({
    is(node) {
      return node.kind === "LimitNode";
    },
    create(limit) {
      return freeze({
        kind: "LimitNode",
        limit: ValueNode.create(limit)
      });
    }
  });
  const _DeleteQueryBuilder = class {
    constructor(props) {
      __privateAdd(this, _props7, void 0);
      __privateSet(this, _props7, freeze(props));
    }
    where(...args) {
      return new _DeleteQueryBuilder({
        ...__privateGet(this, _props7),
        queryNode: QueryNode.cloneWithWhere(__privateGet(this, _props7).queryNode, parseWhere(args))
      });
    }
    whereRef(lhs, op, rhs) {
      return new _DeleteQueryBuilder({
        ...__privateGet(this, _props7),
        queryNode: QueryNode.cloneWithWhere(__privateGet(this, _props7).queryNode, parseReferentialComparison(lhs, op, rhs))
      });
    }
    orWhere(...args) {
      return new _DeleteQueryBuilder({
        ...__privateGet(this, _props7),
        queryNode: QueryNode.cloneWithOrWhere(__privateGet(this, _props7).queryNode, parseWhere(args))
      });
    }
    orWhereRef(lhs, op, rhs) {
      return new _DeleteQueryBuilder({
        ...__privateGet(this, _props7),
        queryNode: QueryNode.cloneWithOrWhere(__privateGet(this, _props7).queryNode, parseReferentialComparison(lhs, op, rhs))
      });
    }
    whereExists(arg) {
      return new _DeleteQueryBuilder({
        ...__privateGet(this, _props7),
        queryNode: QueryNode.cloneWithWhere(__privateGet(this, _props7).queryNode, parseExists(arg))
      });
    }
    whereNotExists(arg) {
      return new _DeleteQueryBuilder({
        ...__privateGet(this, _props7),
        queryNode: QueryNode.cloneWithWhere(__privateGet(this, _props7).queryNode, parseNotExists(arg))
      });
    }
    orWhereExists(arg) {
      return new _DeleteQueryBuilder({
        ...__privateGet(this, _props7),
        queryNode: QueryNode.cloneWithOrWhere(__privateGet(this, _props7).queryNode, parseExists(arg))
      });
    }
    orWhereNotExists(arg) {
      return new _DeleteQueryBuilder({
        ...__privateGet(this, _props7),
        queryNode: QueryNode.cloneWithOrWhere(__privateGet(this, _props7).queryNode, parseNotExists(arg))
      });
    }
    clearWhere() {
      return new _DeleteQueryBuilder({
        ...__privateGet(this, _props7),
        queryNode: QueryNode.cloneWithoutWhere(__privateGet(this, _props7).queryNode)
      });
    }
    using(tables) {
      return new _DeleteQueryBuilder({
        ...__privateGet(this, _props7),
        queryNode: DeleteQueryNode.cloneWithUsing(__privateGet(this, _props7).queryNode, parseTableExpressionOrList(tables))
      });
    }
    innerJoin(...args) {
      return new _DeleteQueryBuilder({
        ...__privateGet(this, _props7),
        queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props7).queryNode, parseJoin("InnerJoin", args))
      });
    }
    leftJoin(...args) {
      return new _DeleteQueryBuilder({
        ...__privateGet(this, _props7),
        queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props7).queryNode, parseJoin("LeftJoin", args))
      });
    }
    rightJoin(...args) {
      return new _DeleteQueryBuilder({
        ...__privateGet(this, _props7),
        queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props7).queryNode, parseJoin("RightJoin", args))
      });
    }
    fullJoin(...args) {
      return new _DeleteQueryBuilder({
        ...__privateGet(this, _props7),
        queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props7).queryNode, parseJoin("FullJoin", args))
      });
    }
    returning(selection) {
      return new _DeleteQueryBuilder({
        ...__privateGet(this, _props7),
        queryNode: QueryNode.cloneWithReturning(__privateGet(this, _props7).queryNode, parseSelectArg(selection))
      });
    }
    returningAll(table) {
      return new _DeleteQueryBuilder({
        ...__privateGet(this, _props7),
        queryNode: QueryNode.cloneWithReturning(__privateGet(this, _props7).queryNode, parseSelectAll(table))
      });
    }
    /**
     * Adds an `order by` clause to the query.
     *
     * `orderBy` calls are additive. To order by multiple columns, call `orderBy`
     * multiple times.
     *
     * The first argument is the expression to order by and the second is the
     * order (`asc` or `desc`).
     *
     * An `order by` clause in a delete query is only supported by some dialects
     * like MySQL.
     *
     * See {@link SelectQueryBuilder.orderBy} for more examples.
     *
     * ### Examples
     *
     * Delete 5 oldest items in a table:
     *
     * ```ts
     * await db
     *   .deleteFrom('pet')
     *   .orderBy('created_at')
     *   .limit(5)
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * delete from `pet`
     * order by `created_at`
     * limit ?
     * ```
     */
    orderBy(orderBy, direction) {
      return new _DeleteQueryBuilder({
        ...__privateGet(this, _props7),
        queryNode: DeleteQueryNode.cloneWithOrderByItem(__privateGet(this, _props7).queryNode, parseOrderBy(orderBy, direction))
      });
    }
    /**
     * Adds a limit clause to the query.
     *
     * A limit clause in a delete query is only supported by some dialects
     * like MySQL.
     *
     * ### Examples
     *
     * Delete 5 oldest items in a table:
     *
     * ```ts
     * await db
     *   .deleteFrom('pet')
     *   .orderBy('created_at')
     *   .limit(5)
     *   .execute()
     * ```
     */
    limit(limit) {
      return new _DeleteQueryBuilder({
        ...__privateGet(this, _props7),
        queryNode: DeleteQueryNode.cloneWithLimit(__privateGet(this, _props7).queryNode, LimitNode.create(limit))
      });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     *
     * If you want to conditionally call a method on `this`, see
     * the {@link $if} method.
     *
     * ### Examples
     *
     * The next example uses a helper function `log` to log a query:
     *
     * ```ts
     * function log<T extends Compilable>(qb: T): T {
     *   console.log(qb.compile())
     *   return qb
     * }
     *
     * db.deleteFrom('person')
     *   .$call(log)
     *   .execute()
     * ```
     */
    $call(func) {
      return func(this);
    }
    /**
     * @deprecated Use `$call` instead
     */
    call(func) {
      return this.$call(func);
    }
    /**
     * Call `func(this)` if `condition` is true.
     *
     * This method is especially handy with optional selects. Any `returning` or `returningAll`
     * method calls add columns as optional fields to the output type when called inside
     * the `func` callback. This is because we can't know if those selections were actually
     * made before running the code.
     *
     * You can also call any other methods inside the callback.
     *
     * ### Examples
     *
     * ```ts
     * async function deletePerson(id: number, returnLastName: boolean) {
     *   return await db
     *     .deleteFrom('person')
     *     .where('id', '=', id)
     *     .returning(['id', 'first_name'])
     *     .$if(returnLastName, (qb) => qb.returning('last_name'))
     *     .executeTakeFirstOrThrow()
     * }
     * ```
     *
     * Any selections added inside the `if` callback will be added as optional fields to the
     * output type since we can't know if the selections were actually made before running
     * the code. In the example above the return type of the `deletePerson` function is:
     *
     * ```ts
     * {
     *   id: number
     *   first_name: string
     *   last_name?: string
     * }
     * ```
     */
    $if(condition, func) {
      if (condition) {
        return func(this);
      }
      return new _DeleteQueryBuilder({
        ...__privateGet(this, _props7)
      });
    }
    /**
     * @deprecated Use `$if` instead
     */
    if(condition, func) {
      return this.$if(condition, func);
    }
    /**
     * Change the output type of the query.
     *
     * You should only use this method as the last resort if the types
     * don't support your use case.
     */
    $castTo() {
      return new _DeleteQueryBuilder(__privateGet(this, _props7));
    }
    /**
     * @deprecated Use `$castTo` instead.
     */
    castTo() {
      return this.$castTo();
    }
    /**
     * Narrows (parts of) the output type of the query.
     *
     * Kysely tries to be as type-safe as possible, but in some cases we have to make
     * compromises for better maintainability and compilation performance. At present,
     * Kysely doesn't narrow the output type of the query when using {@link where} and {@link returning} or {@link returningAll}.
     *
     * This utility method is very useful for these situations, as it removes unncessary
     * runtime assertion/guard code. Its input type is limited to the output type
     * of the query, so you can't add a column that doesn't exist, or change a column's
     * type to something that doesn't exist in its union type.
     *
     * ### Examples
     *
     * Turn this code:
     *
     * ```ts
     * const person = await db.deleteFrom('person')
     *   .where('id', '=', id)
     *   .where('nullable_column', 'is not', null)
     *   .returningAll()
     *   .executeTakeFirstOrThrow()
     *
     * if (person.nullable_column) {
     *   functionThatExpectsPersonWithNonNullValue(person)
     * }
     * ```
     *
     * Into this:
     *
     * ```ts
     * const person = await db.deleteFrom('person')
     *   .where('id', '=', id)
     *   .where('nullable_column', 'is not', null)
     *   .returningAll()
     *   .$narrowType<{ nullable_column: string }>()
     *   .executeTakeFirstOrThrow()
     *
     * functionThatExpectsPersonWithNonNullValue(person)
     * ```
     */
    $narrowType() {
      return new _DeleteQueryBuilder(__privateGet(this, _props7));
    }
    /**
     * Asserts that query's output row type equals the given type `T`.
     *
     * This method can be used to simplify excessively complex types to make typescript happy
     * and much faster.
     *
     * Kysely uses complex type magic to achieve its type safety. This complexity is sometimes too much
     * for typescript and you get errors like this:
     *
     * ```
     * error TS2589: Type instantiation is excessively deep and possibly infinite.
     * ```
     *
     * In these case you can often use this method to help typescript a little bit. When you use this
     * method to assert the output type of a query, Kysely can drop the complex output type that
     * consists of multiple nested helper types and replace it with the simple asserted type.
     *
     * Using this method doesn't reduce type safety at all. You have to pass in a type that is
     * structurally equal to the current type.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .with('deleted_person', (qb) => qb
     *     .deleteFrom('person')
     *     .where('id', '=', person.id)
     *     .returning('first_name')
     *     .$assertType<{ first_name: string }>()
     *   )
     *   .with('deleted_pet', (qb) => qb
     *     .deleteFrom('pet')
     *     .where('owner_id', '=', person.id)
     *     .returning(['name as pet_name', 'species'])
     *     .$assertType<{ pet_name: string, species: Species }>()
     *   )
     *   .selectFrom(['deleted_person', 'deleted_pet'])
     *   .selectAll()
     *   .executeTakeFirstOrThrow()
     * ```
     */
    $assertType() {
      return new _DeleteQueryBuilder(__privateGet(this, _props7));
    }
    /**
     * @deprecated Use `$assertType` instead.
     */
    assertType() {
      return new _DeleteQueryBuilder(__privateGet(this, _props7));
    }
    /**
     * Returns a copy of this DeleteQueryBuilder instance with the given plugin installed.
     */
    withPlugin(plugin) {
      return new _DeleteQueryBuilder({
        ...__privateGet(this, _props7),
        executor: __privateGet(this, _props7).executor.withPlugin(plugin)
      });
    }
    toOperationNode() {
      return __privateGet(this, _props7).executor.transformQuery(__privateGet(this, _props7).queryNode, __privateGet(this, _props7).queryId);
    }
    compile() {
      return __privateGet(this, _props7).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props7).queryId);
    }
    /**
     * Executes the query and returns an array of rows.
     *
     * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
     */
    async execute() {
      const compiledQuery = this.compile();
      const query = compiledQuery.query;
      const result = await __privateGet(this, _props7).executor.executeQuery(compiledQuery, __privateGet(this, _props7).queryId);
      if (__privateGet(this, _props7).executor.adapter.supportsReturning && query.returning) {
        return result.rows;
      }
      return [
        new DeleteResult(
          // TODO: remove numUpdatedOrDeletedRows.
          result.numAffectedRows ?? result.numUpdatedOrDeletedRows ?? BigInt(0)
        )
      ];
    }
    /**
     * Executes the query and returns the first result or undefined if
     * the query returned no result.
     */
    async executeTakeFirst() {
      const [result] = await this.execute();
      return result;
    }
    /**
     * Executes the query and returns the first result or throws if
     * the query returned no result.
     *
     * By default an instance of {@link NoResultError} is thrown, but you can
     * provide a custom error class, or callback as the only argument to throw a different
     * error.
     */
    async executeTakeFirstOrThrow(errorConstructor = NoResultError) {
      const result = await this.executeTakeFirst();
      if (result === void 0) {
        const error = isNoResultErrorConstructor(errorConstructor) ? new errorConstructor(this.toOperationNode()) : errorConstructor(this.toOperationNode());
        throw error;
      }
      return result;
    }
    async *stream(chunkSize = 100) {
      const compiledQuery = this.compile();
      const stream = __privateGet(this, _props7).executor.stream(compiledQuery, chunkSize, __privateGet(this, _props7).queryId);
      for await (const item of stream) {
        yield* item.rows;
      }
    }
    async explain(format, options) {
      const builder = new _DeleteQueryBuilder({
        ...__privateGet(this, _props7),
        queryNode: QueryNode.cloneWithExplain(__privateGet(this, _props7).queryNode, format, options)
      });
      return await builder.execute();
    }
  };
  let DeleteQueryBuilder = _DeleteQueryBuilder;
  _props7 = new WeakMap();
  preventAwait(DeleteQueryBuilder, "don't await DeleteQueryBuilder instances directly. To execute the query you need to call `execute` or `executeTakeFirst`.");
  class UpdateResult {
    constructor(numUpdatedRows) {
      __privateAdd(this, _numUpdatedRows, void 0);
      __privateSet(this, _numUpdatedRows, numUpdatedRows);
    }
    get numUpdatedRows() {
      return __privateGet(this, _numUpdatedRows);
    }
  }
  _numUpdatedRows = new WeakMap();
  Object.defineProperty(UpdateResult.prototype, "numUpdatedRows", {
    enumerable: true
  });
  const _UpdateQueryBuilder = class {
    constructor(props) {
      __privateAdd(this, _props8, void 0);
      __privateSet(this, _props8, freeze(props));
    }
    where(...args) {
      return new _UpdateQueryBuilder({
        ...__privateGet(this, _props8),
        queryNode: QueryNode.cloneWithWhere(__privateGet(this, _props8).queryNode, parseWhere(args))
      });
    }
    whereRef(lhs, op, rhs) {
      return new _UpdateQueryBuilder({
        ...__privateGet(this, _props8),
        queryNode: QueryNode.cloneWithWhere(__privateGet(this, _props8).queryNode, parseReferentialComparison(lhs, op, rhs))
      });
    }
    orWhere(...args) {
      return new _UpdateQueryBuilder({
        ...__privateGet(this, _props8),
        queryNode: QueryNode.cloneWithOrWhere(__privateGet(this, _props8).queryNode, parseWhere(args))
      });
    }
    orWhereRef(lhs, op, rhs) {
      return new _UpdateQueryBuilder({
        ...__privateGet(this, _props8),
        queryNode: QueryNode.cloneWithOrWhere(__privateGet(this, _props8).queryNode, parseReferentialComparison(lhs, op, rhs))
      });
    }
    whereExists(arg) {
      return new _UpdateQueryBuilder({
        ...__privateGet(this, _props8),
        queryNode: QueryNode.cloneWithWhere(__privateGet(this, _props8).queryNode, parseExists(arg))
      });
    }
    whereNotExists(arg) {
      return new _UpdateQueryBuilder({
        ...__privateGet(this, _props8),
        queryNode: QueryNode.cloneWithWhere(__privateGet(this, _props8).queryNode, parseNotExists(arg))
      });
    }
    orWhereExists(arg) {
      return new _UpdateQueryBuilder({
        ...__privateGet(this, _props8),
        queryNode: QueryNode.cloneWithOrWhere(__privateGet(this, _props8).queryNode, parseExists(arg))
      });
    }
    orWhereNotExists(arg) {
      return new _UpdateQueryBuilder({
        ...__privateGet(this, _props8),
        queryNode: QueryNode.cloneWithOrWhere(__privateGet(this, _props8).queryNode, parseNotExists(arg))
      });
    }
    clearWhere() {
      return new _UpdateQueryBuilder({
        ...__privateGet(this, _props8),
        queryNode: QueryNode.cloneWithoutWhere(__privateGet(this, _props8).queryNode)
      });
    }
    from(from) {
      return new _UpdateQueryBuilder({
        ...__privateGet(this, _props8),
        queryNode: UpdateQueryNode.cloneWithFromItems(__privateGet(this, _props8).queryNode, parseTableExpressionOrList(from))
      });
    }
    innerJoin(...args) {
      return new _UpdateQueryBuilder({
        ...__privateGet(this, _props8),
        queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props8).queryNode, parseJoin("InnerJoin", args))
      });
    }
    leftJoin(...args) {
      return new _UpdateQueryBuilder({
        ...__privateGet(this, _props8),
        queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props8).queryNode, parseJoin("LeftJoin", args))
      });
    }
    rightJoin(...args) {
      return new _UpdateQueryBuilder({
        ...__privateGet(this, _props8),
        queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props8).queryNode, parseJoin("RightJoin", args))
      });
    }
    fullJoin(...args) {
      return new _UpdateQueryBuilder({
        ...__privateGet(this, _props8),
        queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props8).queryNode, parseJoin("FullJoin", args))
      });
    }
    set(update) {
      return new _UpdateQueryBuilder({
        ...__privateGet(this, _props8),
        queryNode: UpdateQueryNode.cloneWithUpdates(__privateGet(this, _props8).queryNode, parseUpdateExpression(update))
      });
    }
    returning(selection) {
      return new _UpdateQueryBuilder({
        ...__privateGet(this, _props8),
        queryNode: QueryNode.cloneWithReturning(__privateGet(this, _props8).queryNode, parseSelectArg(selection))
      });
    }
    returningAll() {
      return new _UpdateQueryBuilder({
        ...__privateGet(this, _props8),
        queryNode: QueryNode.cloneWithReturning(__privateGet(this, _props8).queryNode, parseSelectAll())
      });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     *
     * If you want to conditionally call a method on `this`, see
     * the {@link $if} method.
     *
     * ### Examples
     *
     * The next example uses a helper function `log` to log a query:
     *
     * ```ts
     * function log<T extends Compilable>(qb: T): T {
     *   console.log(qb.compile())
     *   return qb
     * }
     *
     * db.updateTable('person')
     *   .set(values)
     *   .$call(log)
     *   .execute()
     * ```
     */
    $call(func) {
      return func(this);
    }
    /**
     * @deprecated Use `$call` instead
     */
    call(func) {
      return this.$call(func);
    }
    /**
     * Call `func(this)` if `condition` is true.
     *
     * This method is especially handy with optional selects. Any `returning` or `returningAll`
     * method calls add columns as optional fields to the output type when called inside
     * the `func` callback. This is because we can't know if those selections were actually
     * made before running the code.
     *
     * You can also call any other methods inside the callback.
     *
     * ### Examples
     *
     * ```ts
     * async function updatePerson(id: number, updates: UpdateablePerson, returnLastName: boolean) {
     *   return await db
     *     .updateTable('person')
     *     .set(updates)
     *     .where('id', '=', id)
     *     .returning(['id', 'first_name'])
     *     .$if(returnLastName, (qb) => qb.returning('last_name'))
     *     .executeTakeFirstOrThrow()
     * }
     * ```
     *
     * Any selections added inside the `if` callback will be added as optional fields to the
     * output type since we can't know if the selections were actually made before running
     * the code. In the example above the return type of the `updatePerson` function is:
     *
     * ```ts
     * {
     *   id: number
     *   first_name: string
     *   last_name?: string
     * }
     * ```
     */
    $if(condition, func) {
      if (condition) {
        return func(this);
      }
      return new _UpdateQueryBuilder({
        ...__privateGet(this, _props8)
      });
    }
    /**
     * @deprecated Use `$if` instead
     */
    if(condition, func) {
      return this.$if(condition, func);
    }
    /**
     * Change the output type of the query.
     *
     * You should only use this method as the last resort if the types
     * don't support your use case.
     */
    $castTo() {
      return new _UpdateQueryBuilder(__privateGet(this, _props8));
    }
    /**
     * @deprecated Use `$castTo` instead.
     */
    castTo() {
      return this.$castTo();
    }
    /**
     * Narrows (parts of) the output type of the query.
     *
     * Kysely tries to be as type-safe as possible, but in some cases we have to make
     * compromises for better maintainability and compilation performance. At present,
     * Kysely doesn't narrow the output type of the query based on {@link set} input
     * when using {@link where} and/or {@link returning} or {@link returningAll}.
     *
     * This utility method is very useful for these situations, as it removes unncessary
     * runtime assertion/guard code. Its input type is limited to the output type
     * of the query, so you can't add a column that doesn't exist, or change a column's
     * type to something that doesn't exist in its union type.
     *
     * ### Examples
     *
     * Turn this code:
     *
     * ```ts
     * const person = await db.updateTable('person')
     *   .set({ deletedAt: now })
     *   .where('id', '=', id)
     *   .where('nullable_column', 'is not', null)
     *   .returningAll()
     *   .executeTakeFirstOrThrow()
     *
     * if (person.nullable_column) {
     *   functionThatExpectsPersonWithNonNullValue(person)
     * }
     * ```
     *
     * Into this:
     *
     * ```ts
     * const person = await db.updateTable('person')
     *   .set({ deletedAt: now })
     *   .where('id', '=', id)
     *   .where('nullable_column', 'is not', null)
     *   .returningAll()
     *   .$narrowType<{ deletedAt: Date; nullable_column: string }>()
     *   .executeTakeFirstOrThrow()
     *
     * functionThatExpectsPersonWithNonNullValue(person)
     * ```
     */
    $narrowType() {
      return new _UpdateQueryBuilder(__privateGet(this, _props8));
    }
    /**
     * Asserts that query's output row type equals the given type `T`.
     *
     * This method can be used to simplify excessively complex types to make typescript happy
     * and much faster.
     *
     * Kysely uses complex type magic to achieve its type safety. This complexity is sometimes too much
     * for typescript and you get errors like this:
     *
     * ```
     * error TS2589: Type instantiation is excessively deep and possibly infinite.
     * ```
     *
     * In these case you can often use this method to help typescript a little bit. When you use this
     * method to assert the output type of a query, Kysely can drop the complex output type that
     * consists of multiple nested helper types and replace it with the simple asserted type.
     *
     * Using this method doesn't reduce type safety at all. You have to pass in a type that is
     * structurally equal to the current type.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .with('updated_person', (qb) => qb
     *     .updateTable('person')
     *     .set(person)
     *     .where('id', '=', person.id)
     *     .returning('first_name')
     *     .$assertType<{ first_name: string }>()
     *   )
     *   .with('updated_pet', (qb) => qb
     *     .updateTable('pet')
     *     .set(pet)
     *     .where('owner_id', '=', person.id)
     *     .returning(['name as pet_name', 'species'])
     *     .$assertType<{ pet_name: string, species: Species }>()
     *   )
     *   .selectFrom(['updated_person', 'updated_pet'])
     *   .selectAll()
     *   .executeTakeFirstOrThrow()
     * ```
     */
    $assertType() {
      return new _UpdateQueryBuilder(__privateGet(this, _props8));
    }
    /**
     * @deprecated Use `$assertType` instead.
     */
    assertType() {
      return new _UpdateQueryBuilder(__privateGet(this, _props8));
    }
    /**
     * Returns a copy of this UpdateQueryBuilder instance with the given plugin installed.
     */
    withPlugin(plugin) {
      return new _UpdateQueryBuilder({
        ...__privateGet(this, _props8),
        executor: __privateGet(this, _props8).executor.withPlugin(plugin)
      });
    }
    toOperationNode() {
      return __privateGet(this, _props8).executor.transformQuery(__privateGet(this, _props8).queryNode, __privateGet(this, _props8).queryId);
    }
    compile() {
      return __privateGet(this, _props8).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props8).queryId);
    }
    /**
     * Executes the query and returns an array of rows.
     *
     * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
     */
    async execute() {
      const compiledQuery = this.compile();
      const query = compiledQuery.query;
      const result = await __privateGet(this, _props8).executor.executeQuery(compiledQuery, __privateGet(this, _props8).queryId);
      if (__privateGet(this, _props8).executor.adapter.supportsReturning && query.returning) {
        return result.rows;
      }
      return [
        new UpdateResult(
          // TODO: remove numUpdatedOrDeletedRows.
          result.numAffectedRows ?? result.numUpdatedOrDeletedRows ?? BigInt(0)
        )
      ];
    }
    /**
     * Executes the query and returns the first result or undefined if
     * the query returned no result.
     */
    async executeTakeFirst() {
      const [result] = await this.execute();
      return result;
    }
    /**
     * Executes the query and returns the first result or throws if
     * the query returned no result.
     *
     * By default an instance of {@link NoResultError} is thrown, but you can
     * provide a custom error class, or callback as the only argument to throw a different
     * error.
     */
    async executeTakeFirstOrThrow(errorConstructor = NoResultError) {
      const result = await this.executeTakeFirst();
      if (result === void 0) {
        const error = isNoResultErrorConstructor(errorConstructor) ? new errorConstructor(this.toOperationNode()) : errorConstructor(this.toOperationNode());
        throw error;
      }
      return result;
    }
    async *stream(chunkSize = 100) {
      const compiledQuery = this.compile();
      const stream = __privateGet(this, _props8).executor.stream(compiledQuery, chunkSize, __privateGet(this, _props8).queryId);
      for await (const item of stream) {
        yield* item.rows;
      }
    }
    async explain(format, options) {
      const builder = new _UpdateQueryBuilder({
        ...__privateGet(this, _props8),
        queryNode: QueryNode.cloneWithExplain(__privateGet(this, _props8).queryNode, format, options)
      });
      return await builder.execute();
    }
  };
  let UpdateQueryBuilder = _UpdateQueryBuilder;
  _props8 = new WeakMap();
  preventAwait(UpdateQueryBuilder, "don't await UpdateQueryBuilder instances directly. To execute the query you need to call `execute` or `executeTakeFirst`.");
  const CommonTableExpressionNode = freeze({
    is(node) {
      return node.kind === "CommonTableExpressionNode";
    },
    create(name, expression) {
      return freeze({
        kind: "CommonTableExpressionNode",
        name,
        expression
      });
    }
  });
  const CommonTableExpressionNameNode = freeze({
    is(node) {
      return node.kind === "CommonTableExpressionNameNode";
    },
    create(tableName, columnNames) {
      return freeze({
        kind: "CommonTableExpressionNameNode",
        table: TableNode.create(tableName),
        columns: columnNames ? freeze(columnNames.map(ColumnNode.create)) : void 0
      });
    }
  });
  function parseCommonTableExpression(name, expression) {
    const builder = expression(createQueryCreator());
    return CommonTableExpressionNode.create(parseCommonTableExpressionName(name), builder.toOperationNode());
  }
  function parseCommonTableExpressionName(name) {
    if (name.includes("(")) {
      const parts = name.split(/[\(\)]/);
      const table = parts[0];
      const columns = parts[1].split(",").map((it) => it.trim());
      return CommonTableExpressionNameNode.create(table, columns);
    } else {
      return CommonTableExpressionNameNode.create(name);
    }
  }
  const WithNode = freeze({
    is(node) {
      return node.kind === "WithNode";
    },
    create(expression, params) {
      return freeze({
        kind: "WithNode",
        expressions: freeze([expression]),
        ...params
      });
    },
    cloneWithExpression(withNode, expression) {
      return freeze({
        ...withNode,
        expressions: freeze([...withNode.expressions, expression])
      });
    }
  });
  const CHARS = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9"
  ];
  function randomString(length) {
    let chars = "";
    for (let i = 0; i < length; ++i) {
      chars += randomChar();
    }
    return chars;
  }
  function randomChar() {
    return CHARS[~~(Math.random() * CHARS.length)];
  }
  function createQueryId() {
    return new LazyQueryId();
  }
  class LazyQueryId {
    constructor() {
      __privateAdd(this, _queryId, void 0);
    }
    get queryId() {
      if (__privateGet(this, _queryId) === void 0) {
        __privateSet(this, _queryId, randomString(8));
      }
      return __privateGet(this, _queryId);
    }
  }
  _queryId = new WeakMap();
  function requireAllProps(obj) {
    return obj;
  }
  class OperationNodeTransformer {
    constructor() {
      __publicField(this, "nodeStack", []);
      __privateAdd(this, _transformers, freeze({
        AliasNode: this.transformAlias.bind(this),
        ColumnNode: this.transformColumn.bind(this),
        IdentifierNode: this.transformIdentifier.bind(this),
        SchemableIdentifierNode: this.transformSchemableIdentifier.bind(this),
        RawNode: this.transformRaw.bind(this),
        ReferenceNode: this.transformReference.bind(this),
        SelectQueryNode: this.transformSelectQuery.bind(this),
        SelectionNode: this.transformSelection.bind(this),
        TableNode: this.transformTable.bind(this),
        FromNode: this.transformFrom.bind(this),
        SelectAllNode: this.transformSelectAll.bind(this),
        AndNode: this.transformAnd.bind(this),
        OrNode: this.transformOr.bind(this),
        ValueNode: this.transformValue.bind(this),
        ValueListNode: this.transformValueList.bind(this),
        PrimitiveValueListNode: this.transformPrimitiveValueList.bind(this),
        ParensNode: this.transformParens.bind(this),
        JoinNode: this.transformJoin.bind(this),
        OperatorNode: this.transformOperator.bind(this),
        WhereNode: this.transformWhere.bind(this),
        InsertQueryNode: this.transformInsertQuery.bind(this),
        DeleteQueryNode: this.transformDeleteQuery.bind(this),
        ReturningNode: this.transformReturning.bind(this),
        CreateTableNode: this.transformCreateTable.bind(this),
        AddColumnNode: this.transformAddColumn.bind(this),
        ColumnDefinitionNode: this.transformColumnDefinition.bind(this),
        DropTableNode: this.transformDropTable.bind(this),
        DataTypeNode: this.transformDataType.bind(this),
        OrderByNode: this.transformOrderBy.bind(this),
        OrderByItemNode: this.transformOrderByItem.bind(this),
        GroupByNode: this.transformGroupBy.bind(this),
        GroupByItemNode: this.transformGroupByItem.bind(this),
        UpdateQueryNode: this.transformUpdateQuery.bind(this),
        ColumnUpdateNode: this.transformColumnUpdate.bind(this),
        LimitNode: this.transformLimit.bind(this),
        OffsetNode: this.transformOffset.bind(this),
        OnConflictNode: this.transformOnConflict.bind(this),
        OnDuplicateKeyNode: this.transformOnDuplicateKey.bind(this),
        CreateIndexNode: this.transformCreateIndex.bind(this),
        DropIndexNode: this.transformDropIndex.bind(this),
        ListNode: this.transformList.bind(this),
        PrimaryKeyConstraintNode: this.transformPrimaryKeyConstraint.bind(this),
        UniqueConstraintNode: this.transformUniqueConstraint.bind(this),
        ReferencesNode: this.transformReferences.bind(this),
        CheckConstraintNode: this.transformCheckConstraint.bind(this),
        WithNode: this.transformWith.bind(this),
        CommonTableExpressionNode: this.transformCommonTableExpression.bind(this),
        CommonTableExpressionNameNode: this.transformCommonTableExpressionName.bind(this),
        HavingNode: this.transformHaving.bind(this),
        CreateSchemaNode: this.transformCreateSchema.bind(this),
        DropSchemaNode: this.transformDropSchema.bind(this),
        AlterTableNode: this.transformAlterTable.bind(this),
        DropColumnNode: this.transformDropColumn.bind(this),
        RenameColumnNode: this.transformRenameColumn.bind(this),
        AlterColumnNode: this.transformAlterColumn.bind(this),
        ModifyColumnNode: this.transformModifyColumn.bind(this),
        AddConstraintNode: this.transformAddConstraint.bind(this),
        DropConstraintNode: this.transformDropConstraint.bind(this),
        ForeignKeyConstraintNode: this.transformForeignKeyConstraint.bind(this),
        CreateViewNode: this.transformCreateView.bind(this),
        DropViewNode: this.transformDropView.bind(this),
        GeneratedNode: this.transformGenerated.bind(this),
        DefaultValueNode: this.transformDefaultValue.bind(this),
        OnNode: this.transformOn.bind(this),
        ValuesNode: this.transformValues.bind(this),
        SelectModifierNode: this.transformSelectModifier.bind(this),
        CreateTypeNode: this.transformCreateType.bind(this),
        DropTypeNode: this.transformDropType.bind(this),
        ExplainNode: this.transformExplain.bind(this),
        DefaultInsertValueNode: this.transformDefaultInsertValue.bind(this),
        AggregateFunctionNode: this.transformAggregateFunction.bind(this),
        OverNode: this.transformOver.bind(this),
        PartitionByNode: this.transformPartitionBy.bind(this),
        PartitionByItemNode: this.transformPartitionByItem.bind(this),
        SetOperationNode: this.transformSetOperation.bind(this),
        BinaryOperationNode: this.transformBinaryOperation.bind(this),
        UnaryOperationNode: this.transformUnaryOperation.bind(this),
        UsingNode: this.transformUsing.bind(this),
        FunctionNode: this.transformFunction.bind(this),
        CaseNode: this.transformCase.bind(this),
        WhenNode: this.transformWhen.bind(this)
      }));
    }
    transformNode(node) {
      if (!node) {
        return node;
      }
      this.nodeStack.push(node);
      const out = this.transformNodeImpl(node);
      this.nodeStack.pop();
      return freeze(out);
    }
    transformNodeImpl(node) {
      return __privateGet(this, _transformers)[node.kind](node);
    }
    transformNodeList(list) {
      if (!list) {
        return list;
      }
      return freeze(list.map((node) => this.transformNode(node)));
    }
    transformSelectQuery(node) {
      return requireAllProps({
        kind: "SelectQueryNode",
        from: this.transformNode(node.from),
        selections: this.transformNodeList(node.selections),
        distinctOn: this.transformNodeList(node.distinctOn),
        joins: this.transformNodeList(node.joins),
        groupBy: this.transformNode(node.groupBy),
        orderBy: this.transformNode(node.orderBy),
        where: this.transformNode(node.where),
        frontModifiers: this.transformNodeList(node.frontModifiers),
        endModifiers: this.transformNodeList(node.endModifiers),
        limit: this.transformNode(node.limit),
        offset: this.transformNode(node.offset),
        with: this.transformNode(node.with),
        having: this.transformNode(node.having),
        explain: this.transformNode(node.explain),
        setOperations: this.transformNodeList(node.setOperations)
      });
    }
    transformSelection(node) {
      return requireAllProps({
        kind: "SelectionNode",
        selection: this.transformNode(node.selection)
      });
    }
    transformColumn(node) {
      return requireAllProps({
        kind: "ColumnNode",
        column: this.transformNode(node.column)
      });
    }
    transformAlias(node) {
      return requireAllProps({
        kind: "AliasNode",
        node: this.transformNode(node.node),
        alias: this.transformNode(node.alias)
      });
    }
    transformTable(node) {
      return requireAllProps({
        kind: "TableNode",
        table: this.transformNode(node.table)
      });
    }
    transformFrom(node) {
      return requireAllProps({
        kind: "FromNode",
        froms: this.transformNodeList(node.froms)
      });
    }
    transformReference(node) {
      return requireAllProps({
        kind: "ReferenceNode",
        table: this.transformNode(node.table),
        column: this.transformNode(node.column)
      });
    }
    transformAnd(node) {
      return requireAllProps({
        kind: "AndNode",
        left: this.transformNode(node.left),
        right: this.transformNode(node.right)
      });
    }
    transformOr(node) {
      return requireAllProps({
        kind: "OrNode",
        left: this.transformNode(node.left),
        right: this.transformNode(node.right)
      });
    }
    transformValueList(node) {
      return requireAllProps({
        kind: "ValueListNode",
        values: this.transformNodeList(node.values)
      });
    }
    transformParens(node) {
      return requireAllProps({
        kind: "ParensNode",
        node: this.transformNode(node.node)
      });
    }
    transformJoin(node) {
      return requireAllProps({
        kind: "JoinNode",
        joinType: node.joinType,
        table: this.transformNode(node.table),
        on: this.transformNode(node.on)
      });
    }
    transformRaw(node) {
      return requireAllProps({
        kind: "RawNode",
        sqlFragments: freeze([...node.sqlFragments]),
        parameters: this.transformNodeList(node.parameters)
      });
    }
    transformWhere(node) {
      return requireAllProps({
        kind: "WhereNode",
        where: this.transformNode(node.where)
      });
    }
    transformInsertQuery(node) {
      return requireAllProps({
        kind: "InsertQueryNode",
        into: this.transformNode(node.into),
        columns: this.transformNodeList(node.columns),
        values: this.transformNode(node.values),
        returning: this.transformNode(node.returning),
        onConflict: this.transformNode(node.onConflict),
        onDuplicateKey: this.transformNode(node.onDuplicateKey),
        with: this.transformNode(node.with),
        ignore: node.ignore,
        replace: node.replace,
        explain: this.transformNode(node.explain)
      });
    }
    transformValues(node) {
      return requireAllProps({
        kind: "ValuesNode",
        values: this.transformNodeList(node.values)
      });
    }
    transformDeleteQuery(node) {
      return requireAllProps({
        kind: "DeleteQueryNode",
        from: this.transformNode(node.from),
        using: this.transformNode(node.using),
        joins: this.transformNodeList(node.joins),
        where: this.transformNode(node.where),
        returning: this.transformNode(node.returning),
        with: this.transformNode(node.with),
        orderBy: this.transformNode(node.orderBy),
        limit: this.transformNode(node.limit),
        explain: this.transformNode(node.explain)
      });
    }
    transformReturning(node) {
      return requireAllProps({
        kind: "ReturningNode",
        selections: this.transformNodeList(node.selections)
      });
    }
    transformCreateTable(node) {
      return requireAllProps({
        kind: "CreateTableNode",
        table: this.transformNode(node.table),
        columns: this.transformNodeList(node.columns),
        constraints: this.transformNodeList(node.constraints),
        temporary: node.temporary,
        ifNotExists: node.ifNotExists,
        onCommit: node.onCommit,
        frontModifiers: this.transformNodeList(node.frontModifiers),
        endModifiers: this.transformNodeList(node.endModifiers)
      });
    }
    transformColumnDefinition(node) {
      return requireAllProps({
        kind: "ColumnDefinitionNode",
        column: this.transformNode(node.column),
        dataType: this.transformNode(node.dataType),
        references: this.transformNode(node.references),
        primaryKey: node.primaryKey,
        autoIncrement: node.autoIncrement,
        unique: node.unique,
        notNull: node.notNull,
        unsigned: node.unsigned,
        defaultTo: this.transformNode(node.defaultTo),
        check: this.transformNode(node.check),
        generated: this.transformNode(node.generated),
        frontModifiers: this.transformNodeList(node.frontModifiers),
        endModifiers: this.transformNodeList(node.endModifiers)
      });
    }
    transformAddColumn(node) {
      return requireAllProps({
        kind: "AddColumnNode",
        column: this.transformNode(node.column)
      });
    }
    transformDropTable(node) {
      return requireAllProps({
        kind: "DropTableNode",
        table: this.transformNode(node.table),
        ifExists: node.ifExists,
        cascade: node.cascade
      });
    }
    transformOrderBy(node) {
      return requireAllProps({
        kind: "OrderByNode",
        items: this.transformNodeList(node.items)
      });
    }
    transformOrderByItem(node) {
      return requireAllProps({
        kind: "OrderByItemNode",
        orderBy: this.transformNode(node.orderBy),
        direction: this.transformNode(node.direction)
      });
    }
    transformGroupBy(node) {
      return requireAllProps({
        kind: "GroupByNode",
        items: this.transformNodeList(node.items)
      });
    }
    transformGroupByItem(node) {
      return requireAllProps({
        kind: "GroupByItemNode",
        groupBy: this.transformNode(node.groupBy)
      });
    }
    transformUpdateQuery(node) {
      return requireAllProps({
        kind: "UpdateQueryNode",
        table: this.transformNode(node.table),
        from: this.transformNode(node.from),
        joins: this.transformNodeList(node.joins),
        where: this.transformNode(node.where),
        updates: this.transformNodeList(node.updates),
        returning: this.transformNode(node.returning),
        with: this.transformNode(node.with),
        explain: this.transformNode(node.explain)
      });
    }
    transformColumnUpdate(node) {
      return requireAllProps({
        kind: "ColumnUpdateNode",
        column: this.transformNode(node.column),
        value: this.transformNode(node.value)
      });
    }
    transformLimit(node) {
      return requireAllProps({
        kind: "LimitNode",
        limit: this.transformNode(node.limit)
      });
    }
    transformOffset(node) {
      return requireAllProps({
        kind: "OffsetNode",
        offset: this.transformNode(node.offset)
      });
    }
    transformOnConflict(node) {
      return requireAllProps({
        kind: "OnConflictNode",
        columns: this.transformNodeList(node.columns),
        constraint: this.transformNode(node.constraint),
        indexExpression: this.transformNode(node.indexExpression),
        indexWhere: this.transformNode(node.indexWhere),
        updates: this.transformNodeList(node.updates),
        updateWhere: this.transformNode(node.updateWhere),
        doNothing: node.doNothing
      });
    }
    transformOnDuplicateKey(node) {
      return requireAllProps({
        kind: "OnDuplicateKeyNode",
        updates: this.transformNodeList(node.updates)
      });
    }
    transformCreateIndex(node) {
      return requireAllProps({
        kind: "CreateIndexNode",
        name: this.transformNode(node.name),
        table: this.transformNode(node.table),
        columns: this.transformNodeList(node.columns),
        unique: node.unique,
        using: this.transformNode(node.using),
        ifNotExists: node.ifNotExists,
        where: this.transformNode(node.where)
      });
    }
    transformList(node) {
      return requireAllProps({
        kind: "ListNode",
        items: this.transformNodeList(node.items)
      });
    }
    transformDropIndex(node) {
      return requireAllProps({
        kind: "DropIndexNode",
        name: this.transformNode(node.name),
        table: this.transformNode(node.table),
        ifExists: node.ifExists,
        cascade: node.cascade
      });
    }
    transformPrimaryKeyConstraint(node) {
      return requireAllProps({
        kind: "PrimaryKeyConstraintNode",
        columns: this.transformNodeList(node.columns),
        name: this.transformNode(node.name)
      });
    }
    transformUniqueConstraint(node) {
      return requireAllProps({
        kind: "UniqueConstraintNode",
        columns: this.transformNodeList(node.columns),
        name: this.transformNode(node.name)
      });
    }
    transformForeignKeyConstraint(node) {
      return requireAllProps({
        kind: "ForeignKeyConstraintNode",
        columns: this.transformNodeList(node.columns),
        references: this.transformNode(node.references),
        name: this.transformNode(node.name),
        onDelete: node.onDelete,
        onUpdate: node.onUpdate
      });
    }
    transformSetOperation(node) {
      return requireAllProps({
        kind: "SetOperationNode",
        operator: node.operator,
        expression: this.transformNode(node.expression),
        all: node.all
      });
    }
    transformReferences(node) {
      return requireAllProps({
        kind: "ReferencesNode",
        table: this.transformNode(node.table),
        columns: this.transformNodeList(node.columns),
        onDelete: node.onDelete,
        onUpdate: node.onUpdate
      });
    }
    transformCheckConstraint(node) {
      return requireAllProps({
        kind: "CheckConstraintNode",
        expression: this.transformNode(node.expression),
        name: this.transformNode(node.name)
      });
    }
    transformWith(node) {
      return requireAllProps({
        kind: "WithNode",
        expressions: this.transformNodeList(node.expressions),
        recursive: node.recursive
      });
    }
    transformCommonTableExpression(node) {
      return requireAllProps({
        kind: "CommonTableExpressionNode",
        name: this.transformNode(node.name),
        expression: this.transformNode(node.expression)
      });
    }
    transformCommonTableExpressionName(node) {
      return requireAllProps({
        kind: "CommonTableExpressionNameNode",
        table: this.transformNode(node.table),
        columns: this.transformNodeList(node.columns)
      });
    }
    transformHaving(node) {
      return requireAllProps({
        kind: "HavingNode",
        having: this.transformNode(node.having)
      });
    }
    transformCreateSchema(node) {
      return requireAllProps({
        kind: "CreateSchemaNode",
        schema: this.transformNode(node.schema),
        ifNotExists: node.ifNotExists
      });
    }
    transformDropSchema(node) {
      return requireAllProps({
        kind: "DropSchemaNode",
        schema: this.transformNode(node.schema),
        ifExists: node.ifExists,
        cascade: node.cascade
      });
    }
    transformAlterTable(node) {
      return requireAllProps({
        kind: "AlterTableNode",
        table: this.transformNode(node.table),
        renameTo: this.transformNode(node.renameTo),
        setSchema: this.transformNode(node.setSchema),
        columnAlterations: this.transformNodeList(node.columnAlterations),
        addConstraint: this.transformNode(node.addConstraint),
        dropConstraint: this.transformNode(node.dropConstraint)
      });
    }
    transformDropColumn(node) {
      return requireAllProps({
        kind: "DropColumnNode",
        column: this.transformNode(node.column)
      });
    }
    transformRenameColumn(node) {
      return requireAllProps({
        kind: "RenameColumnNode",
        column: this.transformNode(node.column),
        renameTo: this.transformNode(node.renameTo)
      });
    }
    transformAlterColumn(node) {
      return requireAllProps({
        kind: "AlterColumnNode",
        column: this.transformNode(node.column),
        dataType: this.transformNode(node.dataType),
        dataTypeExpression: this.transformNode(node.dataTypeExpression),
        setDefault: this.transformNode(node.setDefault),
        dropDefault: node.dropDefault,
        setNotNull: node.setNotNull,
        dropNotNull: node.dropNotNull
      });
    }
    transformModifyColumn(node) {
      return requireAllProps({
        kind: "ModifyColumnNode",
        column: this.transformNode(node.column)
      });
    }
    transformAddConstraint(node) {
      return requireAllProps({
        kind: "AddConstraintNode",
        constraint: this.transformNode(node.constraint)
      });
    }
    transformDropConstraint(node) {
      return requireAllProps({
        kind: "DropConstraintNode",
        constraintName: this.transformNode(node.constraintName),
        ifExists: node.ifExists,
        modifier: node.modifier
      });
    }
    transformCreateView(node) {
      return requireAllProps({
        kind: "CreateViewNode",
        name: this.transformNode(node.name),
        temporary: node.temporary,
        orReplace: node.orReplace,
        ifNotExists: node.ifNotExists,
        materialized: node.materialized,
        columns: this.transformNodeList(node.columns),
        as: this.transformNode(node.as)
      });
    }
    transformDropView(node) {
      return requireAllProps({
        kind: "DropViewNode",
        name: this.transformNode(node.name),
        ifExists: node.ifExists,
        materialized: node.materialized,
        cascade: node.cascade
      });
    }
    transformGenerated(node) {
      return requireAllProps({
        kind: "GeneratedNode",
        byDefault: node.byDefault,
        always: node.always,
        identity: node.identity,
        stored: node.stored,
        expression: this.transformNode(node.expression)
      });
    }
    transformDefaultValue(node) {
      return requireAllProps({
        kind: "DefaultValueNode",
        defaultValue: this.transformNode(node.defaultValue)
      });
    }
    transformOn(node) {
      return requireAllProps({
        kind: "OnNode",
        on: this.transformNode(node.on)
      });
    }
    transformSelectModifier(node) {
      return requireAllProps({
        kind: "SelectModifierNode",
        modifier: node.modifier,
        rawModifier: this.transformNode(node.rawModifier)
      });
    }
    transformCreateType(node) {
      return requireAllProps({
        kind: "CreateTypeNode",
        name: this.transformNode(node.name),
        enum: this.transformNode(node.enum)
      });
    }
    transformDropType(node) {
      return requireAllProps({
        kind: "DropTypeNode",
        name: this.transformNode(node.name),
        ifExists: node.ifExists
      });
    }
    transformExplain(node) {
      return requireAllProps({
        kind: "ExplainNode",
        format: node.format,
        options: this.transformNode(node.options)
      });
    }
    transformSchemableIdentifier(node) {
      return requireAllProps({
        kind: "SchemableIdentifierNode",
        schema: this.transformNode(node.schema),
        identifier: this.transformNode(node.identifier)
      });
    }
    transformAggregateFunction(node) {
      return requireAllProps({
        kind: "AggregateFunctionNode",
        aggregated: this.transformNodeList(node.aggregated),
        distinct: node.distinct,
        filter: this.transformNode(node.filter),
        func: node.func,
        over: this.transformNode(node.over)
      });
    }
    transformOver(node) {
      return requireAllProps({
        kind: "OverNode",
        orderBy: this.transformNode(node.orderBy),
        partitionBy: this.transformNode(node.partitionBy)
      });
    }
    transformPartitionBy(node) {
      return requireAllProps({
        kind: "PartitionByNode",
        items: this.transformNodeList(node.items)
      });
    }
    transformPartitionByItem(node) {
      return requireAllProps({
        kind: "PartitionByItemNode",
        partitionBy: this.transformNode(node.partitionBy)
      });
    }
    transformBinaryOperation(node) {
      return requireAllProps({
        kind: "BinaryOperationNode",
        leftOperand: this.transformNode(node.leftOperand),
        operator: this.transformNode(node.operator),
        rightOperand: this.transformNode(node.rightOperand)
      });
    }
    transformUnaryOperation(node) {
      return requireAllProps({
        kind: "UnaryOperationNode",
        operator: this.transformNode(node.operator),
        operand: this.transformNode(node.operand)
      });
    }
    transformUsing(node) {
      return requireAllProps({
        kind: "UsingNode",
        tables: this.transformNodeList(node.tables)
      });
    }
    transformFunction(node) {
      return requireAllProps({
        kind: "FunctionNode",
        func: node.func,
        arguments: this.transformNodeList(node.arguments)
      });
    }
    transformCase(node) {
      return requireAllProps({
        kind: "CaseNode",
        value: this.transformNode(node.value),
        when: this.transformNodeList(node.when),
        else: this.transformNode(node.else),
        isStatement: node.isStatement
      });
    }
    transformWhen(node) {
      return requireAllProps({
        kind: "WhenNode",
        condition: this.transformNode(node.condition),
        result: this.transformNode(node.result)
      });
    }
    transformDataType(node) {
      return node;
    }
    transformSelectAll(node) {
      return node;
    }
    transformIdentifier(node) {
      return node;
    }
    transformValue(node) {
      return node;
    }
    transformPrimitiveValueList(node) {
      return node;
    }
    transformOperator(node) {
      return node;
    }
    transformDefaultInsertValue(node) {
      return node;
    }
  }
  _transformers = new WeakMap();
  const ROOT_OPERATION_NODES = freeze({
    AlterTableNode: true,
    CreateIndexNode: true,
    CreateSchemaNode: true,
    CreateTableNode: true,
    CreateTypeNode: true,
    CreateViewNode: true,
    DeleteQueryNode: true,
    DropIndexNode: true,
    DropSchemaNode: true,
    DropTableNode: true,
    DropTypeNode: true,
    DropViewNode: true,
    InsertQueryNode: true,
    RawNode: true,
    SelectQueryNode: true,
    UpdateQueryNode: true
  });
  class WithSchemaTransformer extends OperationNodeTransformer {
    constructor(schema) {
      super();
      __privateAdd(this, _isRootOperationNode);
      __privateAdd(this, _collectSchemableIds);
      __privateAdd(this, _collectSchemableIdsFromTableExpr);
      __privateAdd(this, _collectSchemableId);
      __privateAdd(this, _removeCommonTableExpressionTables);
      __privateAdd(this, _schema, void 0);
      __privateAdd(this, _schemableIds, /* @__PURE__ */ new Set());
      __privateSet(this, _schema, schema);
    }
    transformNodeImpl(node) {
      if (!__privateMethod(this, _isRootOperationNode, isRootOperationNode_fn).call(this, node)) {
        return super.transformNodeImpl(node);
      }
      const tables = __privateMethod(this, _collectSchemableIds, collectSchemableIds_fn).call(this, node);
      for (const table of tables) {
        __privateGet(this, _schemableIds).add(table);
      }
      const transformed = super.transformNodeImpl(node);
      for (const table of tables) {
        __privateGet(this, _schemableIds).delete(table);
      }
      return transformed;
    }
    transformSchemableIdentifier(node) {
      const transformed = super.transformSchemableIdentifier(node);
      if (transformed.schema || !__privateGet(this, _schemableIds).has(node.identifier.name)) {
        return transformed;
      }
      return {
        ...transformed,
        schema: IdentifierNode.create(__privateGet(this, _schema))
      };
    }
    transformReferences(node) {
      const transformed = super.transformReferences(node);
      if (transformed.table.table.schema) {
        return transformed;
      }
      return {
        ...transformed,
        table: TableNode.createWithSchema(__privateGet(this, _schema), transformed.table.table.identifier.name)
      };
    }
  }
  _schema = new WeakMap();
  _schemableIds = new WeakMap();
  _isRootOperationNode = new WeakSet();
  isRootOperationNode_fn = function(node) {
    return node.kind in ROOT_OPERATION_NODES;
  };
  _collectSchemableIds = new WeakSet();
  collectSchemableIds_fn = function(node) {
    const schemableIds = /* @__PURE__ */ new Set();
    if ("name" in node && node.name && SchemableIdentifierNode.is(node.name)) {
      __privateMethod(this, _collectSchemableId, collectSchemableId_fn).call(this, node.name, schemableIds);
    }
    if ("from" in node && node.from) {
      for (const from of node.from.froms) {
        __privateMethod(this, _collectSchemableIdsFromTableExpr, collectSchemableIdsFromTableExpr_fn).call(this, from, schemableIds);
      }
    }
    if ("into" in node && node.into) {
      __privateMethod(this, _collectSchemableIdsFromTableExpr, collectSchemableIdsFromTableExpr_fn).call(this, node.into, schemableIds);
    }
    if ("table" in node && node.table) {
      __privateMethod(this, _collectSchemableIdsFromTableExpr, collectSchemableIdsFromTableExpr_fn).call(this, node.table, schemableIds);
    }
    if ("joins" in node && node.joins) {
      for (const join of node.joins) {
        __privateMethod(this, _collectSchemableIdsFromTableExpr, collectSchemableIdsFromTableExpr_fn).call(this, join.table, schemableIds);
      }
    }
    if ("with" in node && node.with) {
      __privateMethod(this, _removeCommonTableExpressionTables, removeCommonTableExpressionTables_fn).call(this, node.with, schemableIds);
    }
    return schemableIds;
  };
  _collectSchemableIdsFromTableExpr = new WeakSet();
  collectSchemableIdsFromTableExpr_fn = function(node, schemableIds) {
    const table = TableNode.is(node) ? node : AliasNode.is(node) && TableNode.is(node.node) ? node.node : null;
    if (table) {
      __privateMethod(this, _collectSchemableId, collectSchemableId_fn).call(this, table.table, schemableIds);
    }
  };
  _collectSchemableId = new WeakSet();
  collectSchemableId_fn = function(node, schemableIds) {
    if (!__privateGet(this, _schemableIds).has(node.identifier.name)) {
      schemableIds.add(node.identifier.name);
    }
  };
  _removeCommonTableExpressionTables = new WeakSet();
  removeCommonTableExpressionTables_fn = function(node, schemableIds) {
    for (const expr of node.expressions) {
      schemableIds.delete(expr.name.table.table.identifier.name);
    }
  };
  class WithSchemaPlugin {
    constructor(schema) {
      __privateAdd(this, _transformer, void 0);
      __privateSet(this, _transformer, new WithSchemaTransformer(schema));
    }
    transformQuery(args) {
      return __privateGet(this, _transformer).transformNode(args.node);
    }
    async transformResult(args) {
      return args.result;
    }
  }
  _transformer = new WeakMap();
  const _QueryCreator = class {
    constructor(props) {
      __privateAdd(this, _props9, void 0);
      __privateSet(this, _props9, freeze(props));
    }
    selectFrom(from) {
      return new SelectQueryBuilder({
        queryId: createQueryId(),
        executor: __privateGet(this, _props9).executor,
        queryNode: SelectQueryNode.create(parseTableExpressionOrList(from), __privateGet(this, _props9).withNode)
      });
    }
    /**
     * Creates an insert query.
     *
     * The return value of this query is an instance of {@link InsertResult}. {@link InsertResult}
     * has the {@link InsertResult.insertId | insertId} field that holds the auto incremented id of
     * the inserted row if the db returned one.
     *
     * See the {@link InsertQueryBuilder.values | values} method for more info and examples. Also see
     * the {@link ReturningInterface.returning | returning} method for a way to return columns
     * on supported databases like PostgreSQL.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .executeTakeFirst()
     *
     * console.log(result.insertId)
     * ```
     *
     * Some databases like PostgreSQL support the `returning` method:
     *
     * ```ts
     * const { id } = await db
     *   .insertInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .returning('id')
     *   .executeTakeFirst()
     * ```
     */
    insertInto(table) {
      return new InsertQueryBuilder({
        queryId: createQueryId(),
        executor: __privateGet(this, _props9).executor,
        queryNode: InsertQueryNode.create(parseTable(table), __privateGet(this, _props9).withNode)
      });
    }
    /**
     * Creates a replace query.
     *
     * A MySQL-only statement similar to {@link InsertQueryBuilder.onDuplicateKeyUpdate}
     * that deletes and inserts values on collision instead of updating existing rows.
     *
     * The return value of this query is an instance of {@link InsertResult}. {@link InsertResult}
     * has the {@link InsertResult.insertId | insertId} field that holds the auto incremented id of
     * the inserted row if the db returned one.
     *
     * See the {@link InsertQueryBuilder.values | values} method for more info and examples.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .replaceInto('person')
     *   .values({
     *     first_name: 'Jennifer',
     *     last_name: 'Aniston'
     *   })
     *   .executeTakeFirst()
     *
     * console.log(result.insertId)
     * ```
     */
    replaceInto(table) {
      return new InsertQueryBuilder({
        queryId: createQueryId(),
        executor: __privateGet(this, _props9).executor,
        queryNode: InsertQueryNode.create(parseTable(table), __privateGet(this, _props9).withNode, true)
      });
    }
    deleteFrom(tables) {
      return new DeleteQueryBuilder({
        queryId: createQueryId(),
        executor: __privateGet(this, _props9).executor,
        queryNode: DeleteQueryNode.create(parseTableExpressionOrList(tables), __privateGet(this, _props9).withNode)
      });
    }
    updateTable(table) {
      return new UpdateQueryBuilder({
        queryId: createQueryId(),
        executor: __privateGet(this, _props9).executor,
        queryNode: UpdateQueryNode.create(parseTableExpression(table), __privateGet(this, _props9).withNode)
      });
    }
    /**
     * Creates a `with` query (Common Table Expression).
     *
     * ### Examples
     *
     * ```ts
     * await db
     *   .with('jennifers', (db) => db
     *     .selectFrom('person')
     *     .where('first_name', '=', 'Jennifer')
     *     .select(['id', 'age'])
     *   )
     *   .with('adult_jennifers', (db) => db
     *     .selectFrom('jennifers')
     *     .where('age', '>', 18)
     *     .select(['id', 'age'])
     *   )
     *   .selectFrom('adult_jennifers')
     *   .where('age', '<', 60)
     *   .selectAll()
     *   .execute()
     * ```
     *
     * The CTE name can optionally specify column names in addition to
     * a name. In that case Kysely requires the expression to retun
     * rows with the same columns.
     *
     * ```ts
     * await db
     *   .with('jennifers(id, age)', (db) => db
     *     .selectFrom('person')
     *     .where('first_name', '=', 'Jennifer')
     *     // This is ok since we return columns with the same
     *     // names as specified by `jennifers(id, age)`.
     *     .select(['id', 'age'])
     *   )
     *   .selectFrom('jennifers')
     *   .selectAll()
     *   .execute()
     * ```
     */
    with(name, expression) {
      const cte = parseCommonTableExpression(name, expression);
      return new _QueryCreator({
        ...__privateGet(this, _props9),
        withNode: __privateGet(this, _props9).withNode ? WithNode.cloneWithExpression(__privateGet(this, _props9).withNode, cte) : WithNode.create(cte)
      });
    }
    /**
     * Creates a recursive `with` query (Common Table Expression).
     *
     * See the {@link with} method for examples and more documentation.
     */
    withRecursive(name, expression) {
      const cte = parseCommonTableExpression(name, expression);
      return new _QueryCreator({
        ...__privateGet(this, _props9),
        withNode: __privateGet(this, _props9).withNode ? WithNode.cloneWithExpression(__privateGet(this, _props9).withNode, cte) : WithNode.create(cte, { recursive: true })
      });
    }
    /**
     * Returns a copy of this query creator instance with the given plugin installed.
     */
    withPlugin(plugin) {
      return new _QueryCreator({
        ...__privateGet(this, _props9),
        executor: __privateGet(this, _props9).executor.withPlugin(plugin)
      });
    }
    /**
     * Returns a copy of this query creator instance without any plugins.
     */
    withoutPlugins() {
      return new _QueryCreator({
        ...__privateGet(this, _props9),
        executor: __privateGet(this, _props9).executor.withoutPlugins()
      });
    }
    /**
     * Sets the schema to be used for all table references that don't explicitly
     * specify a schema.
     *
     * This only affects the query created through the builder returned from
     * this method and doesn't modify the `db` instance.
     *
     * See [this recipe](https://github.com/koskimas/kysely/tree/master/site/docs/recipes/schemas.md)
     * for a more detailed explanation.
     *
     * ### Examples
     *
     * ```
     * await db
     *   .withSchema('mammals')
     *   .selectFrom('pet')
     *   .selectAll()
     *   .innerJoin('public.person', 'public.person.id', 'pet.owner_id')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select * from "mammals"."pet"
     * inner join "public"."person"
     * on "public"."person"."id" = "mammals"."pet"."owner_id"
     * ```
     *
     * `withSchema` is smart enough to not add schema for aliases,
     * common table expressions or other places where the schema
     * doesn't belong to:
     *
     * ```
     * await db
     *   .withSchema('mammals')
     *   .selectFrom('pet as p')
     *   .select('p.name')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "p"."name" from "mammals"."pet" as "p"
     * ```
     */
    withSchema(schema) {
      return new _QueryCreator({
        ...__privateGet(this, _props9),
        executor: __privateGet(this, _props9).executor.withPluginAtFront(new WithSchemaPlugin(schema))
      });
    }
  };
  let QueryCreator = _QueryCreator;
  _props9 = new WeakMap();
  class Deferred {
    constructor() {
      __privateAdd(this, _promise, void 0);
      __privateAdd(this, _resolve, void 0);
      __privateAdd(this, _reject, void 0);
      __publicField(this, "resolve", (value) => {
        if (__privateGet(this, _resolve)) {
          __privateGet(this, _resolve).call(this, value);
        }
      });
      __publicField(this, "reject", (reason) => {
        if (__privateGet(this, _reject)) {
          __privateGet(this, _reject).call(this, reason);
        }
      });
      __privateSet(this, _promise, new Promise((resolve, reject) => {
        __privateSet(this, _reject, reject);
        __privateSet(this, _resolve, resolve);
      }));
    }
    get promise() {
      return __privateGet(this, _promise);
    }
  }
  _promise = new WeakMap();
  _resolve = new WeakMap();
  _reject = new WeakMap();
  const LOGGED_MESSAGES = /* @__PURE__ */ new Set();
  function logOnce(message) {
    if (LOGGED_MESSAGES.has(message)) {
      return;
    }
    LOGGED_MESSAGES.add(message);
    console.log(message);
  }
  const NO_PLUGINS = freeze([]);
  class QueryExecutorBase {
    constructor(plugins = NO_PLUGINS) {
      __privateAdd(this, _transformResult);
      __privateAdd(this, _plugins, void 0);
      __privateSet(this, _plugins, plugins);
    }
    get plugins() {
      return __privateGet(this, _plugins);
    }
    transformQuery(node, queryId) {
      for (const plugin of __privateGet(this, _plugins)) {
        const transformedNode = plugin.transformQuery({ node, queryId });
        if (transformedNode.kind === node.kind) {
          node = transformedNode;
        } else {
          throw new Error([
            `KyselyPlugin.transformQuery must return a node`,
            `of the same kind that was given to it.`,
            `The plugin was given a ${node.kind}`,
            `but it returned a ${transformedNode.kind}`
          ].join(" "));
        }
      }
      return node;
    }
    async executeQuery(compiledQuery, queryId) {
      return await this.provideConnection(async (connection) => {
        const result = await connection.executeQuery(compiledQuery);
        const transformedResult = await __privateMethod(this, _transformResult, transformResult_fn).call(this, result, queryId);
        warnOfOutdatedDriverOrPlugins(result, transformedResult);
        return transformedResult;
      });
    }
    async *stream(compiledQuery, chunkSize, queryId) {
      const connectionDefer = new Deferred();
      const connectionReleaseDefer = new Deferred();
      this.provideConnection(async (connection2) => {
        connectionDefer.resolve(connection2);
        return await connectionReleaseDefer.promise;
      }).catch((ex) => connectionDefer.reject(ex));
      const connection = await connectionDefer.promise;
      try {
        for await (const result of connection.streamQuery(compiledQuery, chunkSize)) {
          yield await __privateMethod(this, _transformResult, transformResult_fn).call(this, result, queryId);
        }
      } finally {
        connectionReleaseDefer.resolve();
      }
    }
  }
  _plugins = new WeakMap();
  _transformResult = new WeakSet();
  transformResult_fn = async function(result, queryId) {
    for (const plugin of __privateGet(this, _plugins)) {
      result = await plugin.transformResult({ result, queryId });
    }
    return result;
  };
  function warnOfOutdatedDriverOrPlugins(result, transformedResult) {
    const { numAffectedRows } = result;
    if (numAffectedRows === void 0 && result.numUpdatedOrDeletedRows === void 0 || numAffectedRows !== void 0 && transformedResult.numAffectedRows !== void 0) {
      return;
    }
    logOnce("kysely:warning: outdated driver/plugin detected! QueryResult.numUpdatedOrDeletedRows is deprecated and will be removed in a future release.");
  }
  class NoopQueryExecutor extends QueryExecutorBase {
    get adapter() {
      throw new Error("this query cannot be compiled to SQL");
    }
    compileQuery() {
      throw new Error("this query cannot be compiled to SQL");
    }
    provideConnection() {
      throw new Error("this query cannot be executed");
    }
    withConnectionProvider() {
      throw new Error("this query cannot have a connection provider");
    }
    withPlugin(plugin) {
      return new NoopQueryExecutor([...this.plugins, plugin]);
    }
    withPlugins(plugins) {
      return new NoopQueryExecutor([...this.plugins, ...plugins]);
    }
    withPluginAtFront(plugin) {
      return new NoopQueryExecutor([plugin, ...this.plugins]);
    }
    withoutPlugins() {
      return new NoopQueryExecutor([]);
    }
  }
  const NOOP_QUERY_EXECUTOR = new NoopQueryExecutor();
  function createSelectQueryBuilder() {
    return new SelectQueryBuilder({
      queryId: createQueryId(),
      executor: NOOP_QUERY_EXECUTOR,
      queryNode: SelectQueryNode.create(parseTableExpressionOrList([]))
    });
  }
  function createQueryCreator() {
    return new QueryCreator({
      executor: NOOP_QUERY_EXECUTOR
    });
  }
  function createJoinBuilder(joinType, table) {
    return new JoinBuilder({
      joinNode: JoinNode.create(joinType, parseTableExpression(table))
    });
  }
  function createOverBuilder() {
    return new OverBuilder({
      overNode: OverNode.create()
    });
  }
  const WhenNode = freeze({
    is(node) {
      return node.kind === "WhenNode";
    },
    create(condition) {
      return freeze({
        kind: "WhenNode",
        condition
      });
    },
    cloneWithResult(whenNode, result) {
      return freeze({
        ...whenNode,
        result
      });
    }
  });
  const CaseNode = freeze({
    is(node) {
      return node.kind === "CaseNode";
    },
    create(value) {
      return freeze({
        kind: "CaseNode",
        value
      });
    },
    cloneWithWhen(caseNode, when) {
      return freeze({
        ...caseNode,
        when: freeze(caseNode.when ? [...caseNode.when, when] : [when])
      });
    },
    cloneWithThen(caseNode, then) {
      return freeze({
        ...caseNode,
        when: caseNode.when ? freeze([
          ...caseNode.when.slice(0, -1),
          WhenNode.cloneWithResult(caseNode.when[caseNode.when.length - 1], then)
        ]) : void 0
      });
    },
    cloneWith(caseNode, props) {
      return freeze({
        ...caseNode,
        ...props
      });
    }
  });
  function parseValueBinaryOperation(leftOperand, operator, rightOperand) {
    if (!isBinaryOperator(operator) && !isOperationNodeSource(operator)) {
      throw new Error(`invalid binary operator ${JSON.stringify(operator)}`);
    }
    if (isIsComparison(operator, rightOperand)) {
      return parseIs(leftOperand, operator, rightOperand);
    }
    return BinaryOperationNode.create(parseReferenceExpression(leftOperand), parseOperator(operator), parseValueExpressionOrList(rightOperand));
  }
  function parseReferentialBinaryOperation(leftOperand, operator, rightOperand) {
    if (!isBinaryOperator(operator) && !isOperationNodeSource(operator)) {
      throw new Error(`invalid binary operator ${JSON.stringify(operator)}`);
    }
    return BinaryOperationNode.create(parseReferenceExpression(leftOperand), parseOperator(operator), parseReferenceExpression(rightOperand));
  }
  function parseValueComparison(leftOperand, operator, rightOperand) {
    if (!isComparisonOperator(operator) && !isOperationNodeSource(operator)) {
      throw new Error(`invalid comparison operator ${JSON.stringify(operator)}`);
    }
    return parseValueBinaryOperation(leftOperand, operator, rightOperand);
  }
  function parseReferentialComparison(leftOperand, operator, rightOperand) {
    if (!isComparisonOperator(operator) && !isOperationNodeSource(operator)) {
      throw new Error(`invalid comparison operator ${JSON.stringify(operator)}`);
    }
    return parseReferentialBinaryOperation(leftOperand, operator, rightOperand);
  }
  function parseWhere(args) {
    return parseFilter("where", args);
  }
  function parseHaving(args) {
    return parseFilter("having", args);
  }
  function parseOn(args) {
    return parseFilter("on", args);
  }
  function parseWhen(args) {
    return parseFilter("when", args);
  }
  function parseFilter(type, args) {
    if (args.length === 3) {
      return parseValueComparison(args[0], args[1], args[2]);
    }
    if (args.length === 1) {
      return parseOneArgFilterExpression(type, args[0]);
    }
    throw createFilterExpressionError(type, args);
  }
  function isIsComparison(operator, rightOperand) {
    return (operator === "is" || operator === "is not") && (isNull(rightOperand) || isBoolean$1(rightOperand));
  }
  function parseIs(leftOperand, operator, rightOperand) {
    return BinaryOperationNode.create(parseReferenceExpression(leftOperand), parseOperator(operator), ValueNode.createImmediate(rightOperand));
  }
  function parseOperator(operator) {
    if (isString$1(operator) && OPERATORS.includes(operator)) {
      return OperatorNode.create(operator);
    }
    if (isOperationNodeSource(operator)) {
      return operator.toOperationNode();
    }
    throw new Error(`invalid operator ${JSON.stringify(operator)}`);
  }
  function parseOneArgFilterExpression(type, arg) {
    if (isFunction(arg)) {
      if (type === "when") {
        throw new Error(`when method doesn't accept a callback as an argument`);
      }
      return CALLBACK_PARSERS[type](arg);
    } else if (isOperationNodeSource(arg)) {
      const node = arg.toOperationNode();
      if (RawNode.is(node) || BinaryOperationNode.is(node) || UnaryOperationNode.is(node) || ParensNode.is(node) || CaseNode.is(node)) {
        return node;
      }
    } else if (type === "when") {
      return ValueNode.create(arg);
    }
    throw createFilterExpressionError(type, arg);
  }
  function createFilterExpressionError(type, args) {
    return new Error(`invalid arguments passed to a '${type}' method: ${JSON.stringify(args)}`);
  }
  const CALLBACK_PARSERS = freeze({
    where(callback) {
      const whereBuilder = createSelectQueryBuilder();
      const exprBuilder = expressionBuilder();
      const res = callback(Object.assign(whereBuilder, exprBuilder));
      const node = res.toOperationNode();
      if (SelectQueryNode.is(node)) {
        if (!node.where) {
          throw new Error("no `where` methods called inside a group callback");
        }
        return ParensNode.create(node.where.where);
      } else {
        return node;
      }
    },
    having(callback) {
      const havingBuilder = createSelectQueryBuilder();
      const exprBuilder = expressionBuilder();
      const res = callback(Object.assign(havingBuilder, exprBuilder));
      const node = res.toOperationNode();
      if (SelectQueryNode.is(node)) {
        if (!node.having) {
          throw new Error("no `having` methods called inside a group callback");
        }
        return ParensNode.create(node.having.having);
      } else {
        return node;
      }
    },
    on(callback) {
      const onBuilder = createJoinBuilder("InnerJoin", "table");
      const exprBuilder = expressionBuilder();
      const res = callback(Object.assign(onBuilder, exprBuilder));
      const node = res.toOperationNode();
      if (JoinNode.is(node)) {
        if (!node.on) {
          throw new Error("no `on` methods called inside a group callback");
        }
        return ParensNode.create(node.on.on);
      } else {
        return node;
      }
    }
  });
  function parseJoin(joinType, args) {
    if (args.length === 3) {
      return parseSingleOnJoin(joinType, args[0], args[1], args[2]);
    } else if (args.length === 2) {
      return parseCallbackJoin(joinType, args[0], args[1]);
    } else {
      throw new Error("not implemented");
    }
  }
  function parseCallbackJoin(joinType, from, callback) {
    const joinBuilder = callback(createJoinBuilder(joinType, from));
    return joinBuilder.toOperationNode();
  }
  function parseSingleOnJoin(joinType, from, lhsColumn, rhsColumn) {
    return JoinNode.createWithOn(joinType, parseTableExpression(from), parseReferentialComparison(lhsColumn, "=", rhsColumn));
  }
  const OffsetNode = freeze({
    is(node) {
      return node.kind === "OffsetNode";
    },
    create(offset) {
      return freeze({
        kind: "OffsetNode",
        offset: ValueNode.create(offset)
      });
    }
  });
  const GroupByItemNode = freeze({
    is(node) {
      return node.kind === "GroupByItemNode";
    },
    create(groupBy) {
      return freeze({
        kind: "GroupByItemNode",
        groupBy
      });
    }
  });
  function parseGroupBy(groupBy) {
    groupBy = isFunction(groupBy) ? groupBy(expressionBuilder()) : groupBy;
    return parseReferenceExpressionOrList(groupBy).map(GroupByItemNode.create);
  }
  const SetOperationNode = freeze({
    is(node) {
      return node.kind === "SetOperationNode";
    },
    create(operator, expression, all) {
      return freeze({
        kind: "SetOperationNode",
        operator,
        expression,
        all
      });
    }
  });
  function parseSetOperation(operator, expression, all) {
    return SetOperationNode.create(operator, expression.toOperationNode(), all);
  }
  const _SelectQueryBuilder = class {
    constructor(props) {
      __privateAdd(this, _props10, void 0);
      __privateSet(this, _props10, freeze(props));
    }
    /** @private */
    get expressionType() {
      return void 0;
    }
    where(...args) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: QueryNode.cloneWithWhere(__privateGet(this, _props10).queryNode, parseWhere(args))
      });
    }
    whereRef(lhs, op, rhs) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: QueryNode.cloneWithWhere(__privateGet(this, _props10).queryNode, parseReferentialComparison(lhs, op, rhs))
      });
    }
    orWhere(...args) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: QueryNode.cloneWithOrWhere(__privateGet(this, _props10).queryNode, parseWhere(args))
      });
    }
    orWhereRef(lhs, op, rhs) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: QueryNode.cloneWithOrWhere(__privateGet(this, _props10).queryNode, parseReferentialComparison(lhs, op, rhs))
      });
    }
    whereExists(arg) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: QueryNode.cloneWithWhere(__privateGet(this, _props10).queryNode, parseExists(arg))
      });
    }
    whereNotExists(arg) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: QueryNode.cloneWithWhere(__privateGet(this, _props10).queryNode, parseNotExists(arg))
      });
    }
    orWhereExists(arg) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: QueryNode.cloneWithOrWhere(__privateGet(this, _props10).queryNode, parseExists(arg))
      });
    }
    orWhereNotExists(arg) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: QueryNode.cloneWithOrWhere(__privateGet(this, _props10).queryNode, parseNotExists(arg))
      });
    }
    having(...args) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithHaving(__privateGet(this, _props10).queryNode, parseHaving(args))
      });
    }
    havingRef(lhs, op, rhs) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithHaving(__privateGet(this, _props10).queryNode, parseReferentialComparison(lhs, op, rhs))
      });
    }
    orHaving(...args) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithOrHaving(__privateGet(this, _props10).queryNode, parseHaving(args))
      });
    }
    orHavingRef(lhs, op, rhs) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithOrHaving(__privateGet(this, _props10).queryNode, parseReferentialComparison(lhs, op, rhs))
      });
    }
    havingExists(arg) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithHaving(__privateGet(this, _props10).queryNode, parseExists(arg))
      });
    }
    /**
     * @deprecated Use {@link havingNotExists} instead.
     */
    havingNotExist(arg) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithHaving(__privateGet(this, _props10).queryNode, parseNotExists(arg))
      });
    }
    havingNotExists(arg) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithHaving(__privateGet(this, _props10).queryNode, parseNotExists(arg))
      });
    }
    orHavingExists(arg) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithOrHaving(__privateGet(this, _props10).queryNode, parseExists(arg))
      });
    }
    orHavingNotExists(arg) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithOrHaving(__privateGet(this, _props10).queryNode, parseNotExists(arg))
      });
    }
    /**
     * Adds a select statement to the query.
     *
     * When a column (or any expression) is selected, Kysely adds its type to the return
     * type of the query. Kysely is smart enough to parse the selection names and types
     * from aliased columns, subqueries, raw expressions etc.
     *
     * Kysely only allows you to select columns and expressions that exist and would
     * produce valid SQL. However, Kysely is not perfect and there may be cases where
     * the type inference doesn't work and you need to override it. You can always
     * use the {@link Kysely.dynamic | dynamic} module and the {@link sql} tag
     * to override the types.
     *
     * Select calls are additive. Calling `select('id').select('first_name')` is the
     * same as calling `select(['id', 'first_name'])`.
     *
     * To select all columns of the query or specific tables see the
     * {@link selectAll} method.
     *
     * See the {@link $if} method if you are looking for a way to add selections
     * based on a runtime condition.
     *
     * ### Examples
     *
     * Select a single column:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .select('id')
     *   .where('first_name', '=', 'Arnold')
     *   .execute()
     *
     * persons[0].id
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "id" from "person" where "first_name" = $1
     * ```
     *
     * Select a single column and specify a table:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom(['person', 'pet'])
     *   .select('person.id')
     *   .execute()
     *
     * persons[0].id
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."id" from "person", "pet"
     * ```
     *
     * Select multiple columns:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .select(['person.id', 'first_name'])
     *   .execute()
     *
     * persons[0].id
     * persons[0].first_name
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."id", "first_name" from "person"
     * ```
     *
     * Aliased selections:
     *
     * ```ts
     * const persons = await db
     *   .selectFrom('person')
     *   .select([
     *     'person.first_name as fn',
     *     'person.last_name as ln'
     *   ])
     *   .execute()
     *
     * persons[0].fn
     * persons[0].ln
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select
     *   "person"."first_name" as "fn",
     *   "person"."last_name" as "ln"
     * from "person"
     * ```
     *
     * You can also select arbitrary expression including subqueries and raw sql snippets.
     * When you do that, you need to give a name for the selections using the {@link as} method:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * const persons = await db.selectFrom('person')
     *   .select(({ selectFrom, or, cmpr }) => [
     *     // Select a correlated subquery
     *     selectFrom('pet')
     *       .whereRef('person.id', '=', 'pet.owner_id')
     *       .select('pet.name')
     *       .orderBy('pet.name')
     *       .limit(1)
     *       .as('first_pet_name'),
     *
     *     // Build and select an expression using the expression builder
     *     or([
     *       cmpr('first_name', '=', 'Jennifer'),
     *       cmpr('first_name', '=', 'Arnold')
     *     ]).as('is_jennifer_or_arnold'),
     *
     *     // Select a raw sql expression
     *     sql<string>`concat(first_name, ' ', last_name)`.as('full_name')
     *   ])
     *   .execute()
     *
     * persons[0].first_pet_name
     * persons[0].is_jennifer_or_arnold
     * persons[0].full_name
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select
     *   (
     *     select "pet"."name"
     *     from "pet"
     *     where "person"."id" = "pet"."owner_id"
     *     order by "pet"."name"
     *     limit $1
     *   ) as "pet_name",
     *   ("first_name" = $2 or "first_name" = $3) as "jennifer_or_arnold",
     *   concat(first_name, ' ', last_name) as "full_name"
     * from "person"
     * ```
     *
     * In case you use the {@link sql} tag you need to specify the type of the expression
     * (in this example `string`).
     *
     * All the examples above assume you know the column names at compile time.
     * While it's better to build your code like that (that way you also know
     * the types) sometimes it's not possible or you just prefer to write more
     * dynamic code.
     * <br><br>
     * In this example, we use the `dynamic` module's methods to add selections
     * dynamically:
     *
     * ```ts
     * const { ref } = db.dynamic
     *
     * // Some column name provided by the user. Value not known at compile time.
     * const columnFromUserInput = req.query.select;
     *
     * // A type that lists all possible values `columnFromUserInput` can have.
     * // You can use `keyof Person` if any column of an interface is allowed.
     * type PossibleColumns = 'last_name' | 'first_name' | 'birth_date'
     *
     * const spersons = await db
     *   .selectFrom('person')
     *   .select([
     *     ref<PossibleColumns>(columnFromUserInput)
     *     'id'
     *   ])
     *   .execute()
     *
     * // The resulting type contains all `PossibleColumns` as optional fields
     * // because we cannot know which field was actually selected before
     * // running the code.
     * const lastName: string | undefined = persons[0].last_name
     * const firstName: string | undefined = persons[0].first_name
     * const birthDate: string | undefined = persons[0].birth_date
     *
     * // The result type also contains the compile time selection `id`.
     * persons[0].id
     * ```
     */
    select(selection) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithSelections(__privateGet(this, _props10).queryNode, parseSelectArg(selection))
      });
    }
    distinctOn(selection) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithDistinctOn(__privateGet(this, _props10).queryNode, parseReferenceExpressionOrList(selection))
      });
    }
    /**
     * This can be used to add any additional SQL to the front of the query __after__ the `select` keyword.
     *
     * ### Examples
     *
     * ```ts
     * db.selectFrom('person')
     *   .modifyFront(sql`sql_no_cache`)
     *   .select('first_name')
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * select sql_no_cache `first_name`
     * from `person`
     * ```
     */
    modifyFront(modifier) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithFrontModifier(__privateGet(this, _props10).queryNode, SelectModifierNode.createWithExpression(modifier.toOperationNode()))
      });
    }
    /**
     * This can be used to add any additional SQL to the end of the query.
     *
     * Also see {@link forUpdate}, {@link forShare}, {@link forKeyShare}, {@link forNoKeyUpdate}
     * {@link skipLocked} and  {@link noWait}.
     *
     * ### Examples
     *
     * ```ts
     * db.selectFrom('person')
     *   .select('first_name')
     *   .modifyEnd(sql`for update`)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "first_name"
     * from "person"
     * for update
     * ```
     */
    modifyEnd(modifier) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithEndModifier(__privateGet(this, _props10).queryNode, SelectModifierNode.createWithExpression(modifier.toOperationNode()))
      });
    }
    /**
     * Makes the selection distinct.
     *
     * ### Examples
     *
     * ```ts
     * await db.selectFrom('person')
     *   .select('first_name')
     *   .distinct()
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select distinct "first_name" from "person"
     * ```
     */
    distinct() {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithFrontModifier(__privateGet(this, _props10).queryNode, SelectModifierNode.create("Distinct"))
      });
    }
    /**
     * Adds the `for update` modifier to a select query on supported databases.
     */
    forUpdate() {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithEndModifier(__privateGet(this, _props10).queryNode, SelectModifierNode.create("ForUpdate"))
      });
    }
    /**
     * Adds the `for share` modifier to a select query on supported databases.
     */
    forShare() {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithEndModifier(__privateGet(this, _props10).queryNode, SelectModifierNode.create("ForShare"))
      });
    }
    /**
     * Adds the `for key share` modifier to a select query on supported databases.
     */
    forKeyShare() {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithEndModifier(__privateGet(this, _props10).queryNode, SelectModifierNode.create("ForKeyShare"))
      });
    }
    /**
     * Adds the `for no key update` modifier to a select query on supported databases.
     */
    forNoKeyUpdate() {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithEndModifier(__privateGet(this, _props10).queryNode, SelectModifierNode.create("ForNoKeyUpdate"))
      });
    }
    /**
     * Adds the `skip locked` modifier to a select query on supported databases.
     */
    skipLocked() {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithEndModifier(__privateGet(this, _props10).queryNode, SelectModifierNode.create("SkipLocked"))
      });
    }
    /**
     * Adds the `nowait` modifier to a select query on supported databases.
     */
    noWait() {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithEndModifier(__privateGet(this, _props10).queryNode, SelectModifierNode.create("NoWait"))
      });
    }
    selectAll(table) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithSelections(__privateGet(this, _props10).queryNode, parseSelectAll(table))
      });
    }
    innerJoin(...args) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props10).queryNode, parseJoin("InnerJoin", args))
      });
    }
    leftJoin(...args) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props10).queryNode, parseJoin("LeftJoin", args))
      });
    }
    rightJoin(...args) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props10).queryNode, parseJoin("RightJoin", args))
      });
    }
    fullJoin(...args) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props10).queryNode, parseJoin("FullJoin", args))
      });
    }
    innerJoinLateral(...args) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props10).queryNode, parseJoin("LateralInnerJoin", args))
      });
    }
    leftJoinLateral(...args) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: QueryNode.cloneWithJoin(__privateGet(this, _props10).queryNode, parseJoin("LateralLeftJoin", args))
      });
    }
    /**
     * Adds an `order by` clause to the query.
     *
     * `orderBy` calls are additive. To order by multiple columns, call `orderBy`
     * multiple times.
     *
     * The first argument is the expression to order by and the second is the
     * order (`asc` or `desc`).
     *
     * ### Examples
     *
     * ```ts
     * await db
     *   .selectFrom('person')
     *   .select('person.first_name as fn')
     *   .orderBy('id')
     *   .orderBy('fn', 'desc')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."first_name" as "fn"
     * from "person"
     * order by "id" asc, "fn" desc
     * ```
     *
     * The order by expression can also be a raw sql expression or a subquery
     * in addition to column references:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db
     *   .selectFrom('person')
     *   .selectAll()
     *   .orderBy((eb) => eb.selectFrom('pet')
     *     .select('pet.name')
     *     .whereRef('pet.owner_id', '=', 'person.id')
     *     .limit(1)
     *   )
     *   .orderBy(
     *     sql`concat(first_name, last_name)`
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select *
     * from "person"
     * order by
     *   ( select "pet"."name"
     *     from "pet"
     *     where "pet"."owner_id" = "person"."id"
     *     limit 1
     *   ) asc,
     *   concat(first_name, last_name) asc
     * ```
     *
     * `dynamic.ref` can be used to refer to columns not known at
     * compile time:
     *
     * ```ts
     * async function someQuery(orderBy: string) {
     *   const { ref } = db.dynamic
     *
     *   return await db
     *     .selectFrom('person')
     *     .select('person.first_name as fn')
     *     .orderBy(ref(orderBy))
     *     .execute()
     * }
     *
     * someQuery('fn')
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."first_name" as "fn"
     * from "person"
     * order by "fn" asc
     * ```
     */
    orderBy(orderBy, direction) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithOrderByItem(__privateGet(this, _props10).queryNode, parseOrderBy(orderBy, direction))
      });
    }
    /**
     * Adds a `group by` clause to the query.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db
     *   .selectFrom('person')
     *   .select([
     *     'first_name',
     *     sql`max(id)`.as('max_id')
     *   ])
     *   .groupBy('first_name')
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "first_name", max(id)
     * from "person"
     * group by "first_name"
     * ```
     *
     * `groupBy` also accepts an array:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db
     *   .selectFrom('person')
     *   .select([
     *     'first_name',
     *     'last_name',
     *     sql`max(id)`.as('max_id')
     *   ])
     *   .groupBy([
     *     'first_name',
     *     'last_name'
     *   ])
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "first_name", "last_name", max(id)
     * from "person"
     * group by "first_name", "last_name"
     * ```
     *
     * The group by expressions can also be subqueries or
     * raw sql expressions:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db
     *   .selectFrom('person')
     *   .select([
     *     'first_name',
     *     'last_name',
     *     sql`max(id)`.as('max_id')
     *   ])
     *   .groupBy([
     *     sql`concat(first_name, last_name)`,
     *     (qb) => qb.selectFrom('pet').select('id').limit(1)
     *   ])
     *   .execute()
     * ```
     *
     * `dynamic.ref` can be used to refer to columns not known at
     * compile time:
     *
     * ```ts
     * async function someQuery(groupBy: string) {
     *   const { ref } = db.dynamic
     *
     *   return await db
     *     .selectFrom('person')
     *     .select('first_name')
     *     .groupBy(ref(groupBy))
     *     .execute()
     * }
     *
     * someQuery('first_name')
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "first_name"
     * from "person"
     * group by "first_name"
     * ```
     */
    groupBy(groupBy) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithGroupByItems(__privateGet(this, _props10).queryNode, parseGroupBy(groupBy))
      });
    }
    /**
     * Adds a limit clause to the query.
     *
     * ### Examples
     *
     * Select the first 10 rows of the result:
     *
     * ```ts
     * return await db
     *   .selectFrom('person')
     *   .select('first_name')
     *   .limit(10)
     * ```
     *
     * Select rows from index 10 to index 19 of the result:
     *
     * ```ts
     * return await db
     *   .selectFrom('person')
     *   .select('first_name')
     *   .offset(10)
     *   .limit(10)
     * ```
     */
    limit(limit) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithLimit(__privateGet(this, _props10).queryNode, LimitNode.create(limit))
      });
    }
    /**
     * Adds an offset clause to the query.
     *
     * ### Examples
     *
     * Select rows from index 10 to index 19 of the result:
     *
     * ```ts
     * return await db
     *   .selectFrom('person')
     *   .select('first_name')
     *   .offset(10)
     *   .limit(10)
     * ```
     */
    offset(offset) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithOffset(__privateGet(this, _props10).queryNode, OffsetNode.create(offset))
      });
    }
    /**
     * Combines another select query or raw expression to this query using `union`.
     *
     * The output row type of the combined query must match `this` query.
     *
     * ### Examples
     *
     * ```ts
     * db.selectFrom('person')
     *   .select(['id', 'first_name as name'])
     *   .union(db.selectFrom('pet').select(['id', 'name']))
     *   .orderBy('name')
     * ```
     */
    union(expression) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithSetOperation(__privateGet(this, _props10).queryNode, parseSetOperation("union", expression, false))
      });
    }
    /**
     * Combines another select query or raw expression to this query using `union all`.
     *
     * The output row type of the combined query must match `this` query.
     *
     * ### Examples
     *
     * ```ts
     * db.selectFrom('person')
     *   .select(['id', 'first_name as name'])
     *   .unionAll(db.selectFrom('pet').select(['id', 'name']))
     *   .orderBy('name')
     * ```
     */
    unionAll(expression) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithSetOperation(__privateGet(this, _props10).queryNode, parseSetOperation("union", expression, true))
      });
    }
    /**
     * Combines another select query or raw expression to this query using `intersect`.
     *
     * The output row type of the combined query must match `this` query.
     *
     * ### Examples
     *
     * ```ts
     * db.selectFrom('person')
     *   .select(['id', 'first_name as name'])
     *   .intersect(db.selectFrom('pet').select(['id', 'name']))
     *   .orderBy('name')
     * ```
     */
    intersect(expression) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithSetOperation(__privateGet(this, _props10).queryNode, parseSetOperation("intersect", expression, false))
      });
    }
    /**
     * Combines another select query or raw expression to this query using `intersect all`.
     *
     * The output row type of the combined query must match `this` query.
     *
     * ### Examples
     *
     * ```ts
     * db.selectFrom('person')
     *   .select(['id', 'first_name as name'])
     *   .intersectAll(db.selectFrom('pet').select(['id', 'name']))
     *   .orderBy('name')
     * ```
     */
    intersectAll(expression) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithSetOperation(__privateGet(this, _props10).queryNode, parseSetOperation("intersect", expression, true))
      });
    }
    /**
     * Combines another select query or raw expression to this query using `except`.
     *
     * The output row type of the combined query must match `this` query.
     *
     * ### Examples
     *
     * ```ts
     * db.selectFrom('person')
     *   .select(['id', 'first_name as name'])
     *   .except(db.selectFrom('pet').select(['id', 'name']))
     *   .orderBy('name')
     * ```
     */
    except(expression) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithSetOperation(__privateGet(this, _props10).queryNode, parseSetOperation("except", expression, false))
      });
    }
    /**
     * Combines another select query or raw expression to this query using `except all`.
     *
     * The output row type of the combined query must match `this` query.
     *
     * ### Examples
     *
     * ```ts
     * db.selectFrom('person')
     *   .select(['id', 'first_name as name'])
     *   .exceptAll(db.selectFrom('pet').select(['id', 'name']))
     *   .orderBy('name')
     * ```
     */
    exceptAll(expression) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithSetOperation(__privateGet(this, _props10).queryNode, parseSetOperation("except", expression, true))
      });
    }
    /**
     * Gives an alias for the query. This method is only useful for sub queries.
     *
     * ### Examples
     *
     * ```ts
     * const pets = await db.selectFrom('pet')
     *   .selectAll('pet')
     *   .select(
     *     (qb) => qb.selectFrom('person')
     *       .select('first_name')
     *       .whereRef('pet.owner_id', '=', 'person.id')
     *       .as('owner_first_name')
     *   )
     *   .execute()
     *
     * pets[0].owner_first_name
     * ```
     */
    as(alias) {
      return new AliasedSelectQueryBuilder(this, alias);
    }
    /**
     * Clears all select clauses from the query.
     *
     * ### Examples
     *
     * ```ts
     * db.selectFrom('person')
     *   .select(['id', 'first_name'])
     *   .clearSelect()
     *   .select(['id', 'gender'])
     * ```
     *
     * The generated SQL(PostgreSQL):
     *
     * ```sql
     * select "id", "gender" from "person"
     * ```
     */
    clearSelect() {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithoutSelections(__privateGet(this, _props10).queryNode)
      });
    }
    clearWhere() {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: QueryNode.cloneWithoutWhere(__privateGet(this, _props10).queryNode)
      });
    }
    /**
     * Clears limit clause from the query.
     *
     * ### Examples
     *
     * ```ts
     * db.selectFrom('person')
     *   .selectAll()
     *   .limit(10)
     *   .clearLimit()
     * ```
     *
     * The generated SQL(PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * ```
     */
    clearLimit() {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithoutLimit(__privateGet(this, _props10).queryNode)
      });
    }
    /**
     * Clears offset clause from the query.
     *
     * ### Examples
     *
     * ```ts
     * db.selectFrom('person')
     *   .selectAll()
     *   .limit(10)
     *   .offset(20)
     *   .clearOffset()
     * ```
     *
     * The generated SQL(PostgreSQL):
     *
     * ```sql
     * select * from "person" limit 10
     * ```
     */
    clearOffset() {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithoutOffset(__privateGet(this, _props10).queryNode)
      });
    }
    /**
     * Clears all `order by` clauses from the query.
     *
     * ### Examples
     *
     * ```ts
     * db.selectFrom('person')
     *   .selectAll()
     *   .orderBy('id')
     *   .clearOrderBy()
     * ```
     *
     * The generated SQL(PostgreSQL):
     *
     * ```sql
     * select * from "person"
     * ```
     */
    clearOrderBy() {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: SelectQueryNode.cloneWithoutOrderBy(__privateGet(this, _props10).queryNode)
      });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     *
     * If you want to conditionally call a method on `this`, see
     * the {@link $if} method.
     *
     * ### Examples
     *
     * The next example uses a helper function `log` to log a query:
     *
     * ```ts
     * function log<T extends Compilable>(qb: T): T {
     *   console.log(qb.compile())
     *   return qb
     * }
     *
     * db.selectFrom('person')
     *   .selectAll()
     *   .$call(log)
     *   .execute()
     * ```
     */
    $call(func) {
      return func(this);
    }
    /**
     * @deprecated Use `$call` instead
     */
    call(func) {
      return this.$call(func);
    }
    /**
     * Call `func(this)` if `condition` is true.
     *
     * NOTE: This method has an impact on typescript performance and it should only be used
     * when necessary. Remember that you can call most methods like `where` conditionally
     * like this:
     *
     * ```ts
     * let query = db.selectFrom('person').selectAll()
     *
     * if (firstName) {
     *   query = query.where('first_name', '=', firstName)
     * }
     *
     * if (lastName) {
     *   query = query.where('last_name', '=', lastName)
     * }
     *
     * const result = await query.execute()
     * ```
     *
     * This method is mainly useful with optional selects. Any `select` or `selectAll`
     * method called inside the callback add optional fields to the result type. This is
     * because we can't know if those selections were actually made before running the code.
     *
     * Also see [this recipe](https://github.com/koskimas/kysely/tree/master/site/docs/recipes/conditional-selects.md)
     *
     * ### Examples
     *
     * ```ts
     * async function getPerson(id: number, withLastName: boolean) {
     *   return await db
     *     .selectFrom('person')
     *     .select(['id', 'first_name'])
     *     .$if(withLastName, (qb) => qb.select('last_name'))
     *     .where('id', '=', id)
     *     .executeTakeFirstOrThrow()
     * }
     * ```
     *
     * Any selections added inside the `if` callback will be added as optional fields to the
     * output type since we can't know if the selections were actually made before running
     * the code. In the example above the return type of the `getPerson` function is:
     *
     * ```ts
     * {
     *   id: number
     *   first_name: string
     *   last_name?: string
     * }
     * ```
     *
     * You can also call any other methods inside the callback:
     *
     * ```ts
     * const { count } = db.fn
     *
     * db.selectFrom('person')
     *   .select('person.id')
     *   .$if(filterByFirstName, (qb) => qb.where('first_name', '=', firstName))
     *   .$if(filterByPetCount, (qb) => qb
     *     .innerJoin('pet', 'pet.owner_id', 'person.id')
     *     .having(count('pet.id'), '>', petCountLimit)
     *     .groupBy('person.id')
     *   )
     * ```
     */
    $if(condition, func) {
      if (condition) {
        return func(this);
      }
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10)
      });
    }
    /**
     * @deprecated Use `$if` instead
     */
    if(condition, func) {
      return this.$if(condition, func);
    }
    /**
     * Change the output type of the query.
     *
     * You should only use this method as the last resort if the types
     * don't support your use case.
     */
    $castTo() {
      return new _SelectQueryBuilder(__privateGet(this, _props10));
    }
    /**
     * @deprecated Use `$castTo` instead.
     */
    castTo() {
      return this.$castTo();
    }
    /**
     * Narrows (parts of) the output type of the query.
     *
     * Kysely tries to be as type-safe as possible, but in some cases we have to make
     * compromises for better maintainability and compilation performance. At present,
     * Kysely doesn't narrow the output type of the query when using {@link where}, {@link having}
     * or {@link JoinQueryBuilder.on}.
     *
     * This utility method is very useful for these situations, as it removes unncessary
     * runtime assertion/guard code. Its input type is limited to the output type
     * of the query, so you can't add a column that doesn't exist, or change a column's
     * type to something that doesn't exist in its union type.
     *
     * ### Examples
     *
     * Turn this code:
     *
     * ```ts
     * const person = await db.selectFrom('person')
     *   .where('nullable_column', 'is not', null)
     *   .selectAll()
     *   .executeTakeFirstOrThrow()
     *
     * if (person.nullable_column) {
     *   functionThatExpectsPersonWithNonNullValue(person)
     * }
     * ```
     *
     * Into this:
     *
     * ```ts
     * const person = await db.selectFrom('person')
     *   .where('nullable_column', 'is not', null)
     *   .selectAll()
     *   .$narrowType<{ nullable_column: string }>()
     *   .executeTakeFirstOrThrow()
     *
     * functionThatExpectsPersonWithNonNullValue(person)
     * ```
     */
    $narrowType() {
      return new _SelectQueryBuilder(__privateGet(this, _props10));
    }
    /**
     * Asserts that query's output row type equals the given type `T`.
     *
     * This method can be used to simplify excessively complex types to make typescript happy
     * and much faster.
     *
     * Kysely uses complex type magic to achieve its type safety. This complexity is sometimes too much
     * for typescript and you get errors like this:
     *
     * ```
     * error TS2589: Type instantiation is excessively deep and possibly infinite.
     * ```
     *
     * In these case you can often use this method to help typescript a little bit. When you use this
     * method to assert the output type of a query, Kysely can drop the complex output type that
     * consists of multiple nested helper types and replace it with the simple asserted type.
     *
     * Using this method doesn't reduce type safety at all. You have to pass in a type that is
     * structurally equal to the current type.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .with('first_and_last', (qb) => qb
     *     .selectFrom('person')
     *     .select(['first_name', 'last_name'])
     *     .$assertType<{ first_name: string, last_name: string }>()
     *   )
     *   .with('age', (qb) => qb
     *     .selectFrom('person')
     *     .select('age')
     *     .$assertType<{ age: number }>()
     *   )
     *   .selectFrom(['first_and_last', 'age'])
     *   .selectAll()
     *   .executeTakeFirstOrThrow()
     * ```
     */
    $assertType() {
      return new _SelectQueryBuilder(__privateGet(this, _props10));
    }
    /**
     * @deprecated Use `$assertType` instead.
     */
    assertType() {
      return new _SelectQueryBuilder(__privateGet(this, _props10));
    }
    /**
     * Returns a copy of this SelectQueryBuilder instance with the given plugin installed.
     */
    withPlugin(plugin) {
      return new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        executor: __privateGet(this, _props10).executor.withPlugin(plugin)
      });
    }
    toOperationNode() {
      return __privateGet(this, _props10).executor.transformQuery(__privateGet(this, _props10).queryNode, __privateGet(this, _props10).queryId);
    }
    compile() {
      return __privateGet(this, _props10).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props10).queryId);
    }
    /**
     * Executes the query and returns an array of rows.
     *
     * Also see the {@link executeTakeFirst} and {@link executeTakeFirstOrThrow} methods.
     */
    async execute() {
      const compiledQuery = this.compile();
      const result = await __privateGet(this, _props10).executor.executeQuery(compiledQuery, __privateGet(this, _props10).queryId);
      return result.rows;
    }
    /**
     * Executes the query and returns the first result or undefined if
     * the query returned no result.
     */
    async executeTakeFirst() {
      const [result] = await this.execute();
      return result;
    }
    /**
     * Executes the query and returns the first result or throws if
     * the query returned no result.
     *
     * By default an instance of {@link NoResultError} is thrown, but you can
     * provide a custom error class, or callback to throw a different
     * error.
     */
    async executeTakeFirstOrThrow(errorConstructor = NoResultError) {
      const result = await this.executeTakeFirst();
      if (result === void 0) {
        const error = isNoResultErrorConstructor(errorConstructor) ? new errorConstructor(this.toOperationNode()) : errorConstructor(this.toOperationNode());
        throw error;
      }
      return result;
    }
    async *stream(chunkSize = 100) {
      const compiledQuery = this.compile();
      const stream = __privateGet(this, _props10).executor.stream(compiledQuery, chunkSize, __privateGet(this, _props10).queryId);
      for await (const item of stream) {
        yield* item.rows;
      }
    }
    async explain(format, options) {
      const builder = new _SelectQueryBuilder({
        ...__privateGet(this, _props10),
        queryNode: QueryNode.cloneWithExplain(__privateGet(this, _props10).queryNode, format, options)
      });
      return await builder.execute();
    }
  };
  let SelectQueryBuilder = _SelectQueryBuilder;
  _props10 = new WeakMap();
  preventAwait(SelectQueryBuilder, "don't await SelectQueryBuilder instances directly. To execute the query you need to call `execute` or `executeTakeFirst`.");
  class AliasedSelectQueryBuilder {
    constructor(queryBuilder, alias) {
      __privateAdd(this, _queryBuilder, void 0);
      __privateAdd(this, _alias, void 0);
      __privateSet(this, _queryBuilder, queryBuilder);
      __privateSet(this, _alias, alias);
    }
    /** @private */
    get expression() {
      return __privateGet(this, _queryBuilder);
    }
    /** @private */
    get alias() {
      return __privateGet(this, _alias);
    }
    toOperationNode() {
      return AliasNode.create(__privateGet(this, _queryBuilder).toOperationNode(), IdentifierNode.create(__privateGet(this, _alias)));
    }
  }
  _queryBuilder = new WeakMap();
  _alias = new WeakMap();
  const _ExpressionWrapper = class {
    constructor(node) {
      __privateAdd(this, _node, void 0);
      __privateSet(this, _node, node);
    }
    /** @private */
    get expressionType() {
      return void 0;
    }
    as(alias) {
      return new AliasedExpressionWrapper(this, alias);
    }
    /**
     * Change the output type of the raw expression.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `ExpressionWrapper` with a new output type.
     */
    $castTo() {
      return new _ExpressionWrapper(__privateGet(this, _node));
    }
    toOperationNode() {
      return __privateGet(this, _node);
    }
  };
  let ExpressionWrapper = _ExpressionWrapper;
  _node = new WeakMap();
  class AliasedExpressionWrapper {
    constructor(expr, alias) {
      __privateAdd(this, _expr, void 0);
      __privateAdd(this, _alias2, void 0);
      __privateSet(this, _expr, expr);
      __privateSet(this, _alias2, alias);
    }
    /** @private */
    get expression() {
      return __privateGet(this, _expr);
    }
    /** @private */
    get alias() {
      return __privateGet(this, _alias2);
    }
    toOperationNode() {
      return AliasNode.create(__privateGet(this, _expr).toOperationNode(), isOperationNodeSource(__privateGet(this, _alias2)) ? __privateGet(this, _alias2).toOperationNode() : IdentifierNode.create(__privateGet(this, _alias2)));
    }
  }
  _expr = new WeakMap();
  _alias2 = new WeakMap();
  const AggregateFunctionNode = freeze({
    is(node) {
      return node.kind === "AggregateFunctionNode";
    },
    create(aggregateFunction, aggregated = []) {
      return freeze({
        kind: "AggregateFunctionNode",
        func: aggregateFunction,
        aggregated
      });
    },
    cloneWithDistinct(aggregateFunctionNode) {
      return freeze({
        ...aggregateFunctionNode,
        distinct: true
      });
    },
    cloneWithFilter(aggregateFunctionNode, filter) {
      return freeze({
        ...aggregateFunctionNode,
        filter: aggregateFunctionNode.filter ? WhereNode.cloneWithOperation(aggregateFunctionNode.filter, "And", filter) : WhereNode.create(filter)
      });
    },
    cloneWithOrFilter(aggregateFunctionNode, filter) {
      return freeze({
        ...aggregateFunctionNode,
        filter: aggregateFunctionNode.filter ? WhereNode.cloneWithOperation(aggregateFunctionNode.filter, "Or", filter) : WhereNode.create(filter)
      });
    },
    cloneWithOver(aggregateFunctionNode, over) {
      return freeze({
        ...aggregateFunctionNode,
        over
      });
    }
  });
  const FunctionNode = freeze({
    is(node) {
      return node.kind === "FunctionNode";
    },
    create(func, args) {
      return freeze({
        kind: "FunctionNode",
        func,
        arguments: args
      });
    }
  });
  const _AggregateFunctionBuilder = class {
    constructor(props) {
      __privateAdd(this, _props11, void 0);
      __privateSet(this, _props11, freeze(props));
    }
    /** @private */
    get expressionType() {
      return void 0;
    }
    /**
     * Returns an aliased version of the function.
     *
     * In addition to slapping `as "the_alias"` to the end of the SQL,
     * this method also provides strict typing:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select(
     *     eb => eb.fn.count<number>('id').as('person_count')
     *   )
     *   .executeTakeFirstOrThrow()
     *
     * // `person_count: number` field exists in the result type.
     * console.log(result.person_count)
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select count("id") as "person_count"
     * from "person"
     * ```
     */
    as(alias) {
      return new AliasedAggregateFunctionBuilder(this, alias);
    }
    /**
     * Adds a `distinct` clause inside the function.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select((eb) =>
     *     eb.fn.count<number>('first_name').distinct().as('first_name_count')
     *   )
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select count(distinct "first_name") as "first_name_count"
     * from "person"
     * ```
     */
    distinct() {
      return new _AggregateFunctionBuilder({
        ...__privateGet(this, _props11),
        aggregateFunctionNode: AggregateFunctionNode.cloneWithDistinct(__privateGet(this, _props11).aggregateFunctionNode)
      });
    }
    filterWhere(...args) {
      return new _AggregateFunctionBuilder({
        ...__privateGet(this, _props11),
        aggregateFunctionNode: AggregateFunctionNode.cloneWithFilter(__privateGet(this, _props11).aggregateFunctionNode, parseWhere(args))
      });
    }
    /**
     * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
     */
    filterWhereExists(arg) {
      return new _AggregateFunctionBuilder({
        ...__privateGet(this, _props11),
        aggregateFunctionNode: AggregateFunctionNode.cloneWithFilter(__privateGet(this, _props11).aggregateFunctionNode, parseExists(arg))
      });
    }
    /**
     * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
     */
    filterWhereNotExists(arg) {
      return new _AggregateFunctionBuilder({
        ...__privateGet(this, _props11),
        aggregateFunctionNode: AggregateFunctionNode.cloneWithFilter(__privateGet(this, _props11).aggregateFunctionNode, parseNotExists(arg))
      });
    }
    /**
     * Adds a `filter` clause with a nested `where` clause after the function, where
     * both sides of the operator are references to columns.
     *
     * Similar to {@link WhereInterface}'s `whereRef` method.
     *
     * ### Examples
     *
     * Count people with same first and last names versus general public:
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select((eb) => [
     *     eb.fn
     *       .count<number>('id')
     *       .filterWhereRef('first_name', '=', 'last_name')
     *       .as('repeat_name_count'),
     *     eb.fn.count<number>('id').as('total_count'),
     *   ])
     *   .executeTakeFirstOrThrow()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select
     *   count("id") filter(where "first_name" = "last_name") as "repeat_name_count",
     *   count("id") as "total_count"
     * from "person"
     * ```
     */
    filterWhereRef(lhs, op, rhs) {
      return new _AggregateFunctionBuilder({
        ...__privateGet(this, _props11),
        aggregateFunctionNode: AggregateFunctionNode.cloneWithFilter(__privateGet(this, _props11).aggregateFunctionNode, parseReferentialComparison(lhs, op, rhs))
      });
    }
    /**
     * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
     */
    orFilterWhere(...args) {
      return new _AggregateFunctionBuilder({
        ...__privateGet(this, _props11),
        aggregateFunctionNode: AggregateFunctionNode.cloneWithOrFilter(__privateGet(this, _props11).aggregateFunctionNode, parseWhere(args))
      });
    }
    /**
     * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
     */
    orFilterWhereExists(arg) {
      return new _AggregateFunctionBuilder({
        ...__privateGet(this, _props11),
        aggregateFunctionNode: AggregateFunctionNode.cloneWithOrFilter(__privateGet(this, _props11).aggregateFunctionNode, parseExists(arg))
      });
    }
    /**
     * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
     */
    orFilterWhereNotExists(arg) {
      return new _AggregateFunctionBuilder({
        ...__privateGet(this, _props11),
        aggregateFunctionNode: AggregateFunctionNode.cloneWithOrFilter(__privateGet(this, _props11).aggregateFunctionNode, parseNotExists(arg))
      });
    }
    /**
     * @deprecated Follow [these](https://github.com/koskimas/kysely/releases/tag/0.24.0) instructions to migrate
     */
    orFilterWhereRef(lhs, op, rhs) {
      return new _AggregateFunctionBuilder({
        ...__privateGet(this, _props11),
        aggregateFunctionNode: AggregateFunctionNode.cloneWithOrFilter(__privateGet(this, _props11).aggregateFunctionNode, parseReferentialComparison(lhs, op, rhs))
      });
    }
    /**
     * Adds an `over` clause (window functions) after the function.
     *
     * ### Examples
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select(
     *     eb => eb.fn.avg<number>('age').over().as('average_age')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select avg("age") over() as "average_age"
     * from "person"
     * ```
     *
     * Also supports passing a callback that returns an over builder,
     * allowing to add partition by and sort by clauses inside over.
     *
     * ```ts
     * const result = await db
     *   .selectFrom('person')
     *   .select(
     *     eb => eb.fn.avg<number>('age').over(
     *       ob => ob.partitionBy('last_name').orderBy('first_name', 'asc')
     *     ).as('average_age')
     *   )
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select avg("age") over(partition by "last_name" order by "first_name" asc) as "average_age"
     * from "person"
     * ```
     */
    over(over) {
      const builder = createOverBuilder();
      return new _AggregateFunctionBuilder({
        ...__privateGet(this, _props11),
        aggregateFunctionNode: AggregateFunctionNode.cloneWithOver(__privateGet(this, _props11).aggregateFunctionNode, (over ? over(builder) : builder).toOperationNode())
      });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
      return func(this);
    }
    toOperationNode() {
      return __privateGet(this, _props11).aggregateFunctionNode;
    }
  };
  let AggregateFunctionBuilder = _AggregateFunctionBuilder;
  _props11 = new WeakMap();
  preventAwait(AggregateFunctionBuilder, "don't await AggregateFunctionBuilder instances. They are never executed directly and are always just a part of a query.");
  class AliasedAggregateFunctionBuilder {
    constructor(aggregateFunctionBuilder, alias) {
      __privateAdd(this, _aggregateFunctionBuilder, void 0);
      __privateAdd(this, _alias3, void 0);
      __privateSet(this, _aggregateFunctionBuilder, aggregateFunctionBuilder);
      __privateSet(this, _alias3, alias);
    }
    /** @private */
    get expression() {
      return __privateGet(this, _aggregateFunctionBuilder);
    }
    /** @private */
    get alias() {
      return __privateGet(this, _alias3);
    }
    toOperationNode() {
      return AliasNode.create(__privateGet(this, _aggregateFunctionBuilder).toOperationNode(), IdentifierNode.create(__privateGet(this, _alias3)));
    }
  }
  _aggregateFunctionBuilder = new WeakMap();
  _alias3 = new WeakMap();
  function createFunctionModule() {
    const fn = (name, args) => {
      return new ExpressionWrapper(FunctionNode.create(name, parseReferenceExpressionOrList(args)));
    };
    const agg = (name, args) => {
      return new AggregateFunctionBuilder({
        aggregateFunctionNode: AggregateFunctionNode.create(name, args ? parseReferenceExpressionOrList(args) : void 0)
      });
    };
    return Object.assign(fn, {
      agg,
      avg(column) {
        return agg("avg", [column]);
      },
      coalesce(value, ...otherValues) {
        return fn("coalesce", [value, ...otherValues]);
      },
      count(column) {
        return agg("count", [column]);
      },
      countAll(table) {
        return new AggregateFunctionBuilder({
          aggregateFunctionNode: AggregateFunctionNode.create("count", parseSelectAll(table))
        });
      },
      max(column) {
        return agg("max", [column]);
      },
      min(column) {
        return agg("min", [column]);
      },
      sum(column) {
        return agg("sum", [column]);
      }
    });
  }
  class CaseBuilder {
    constructor(props) {
      __privateAdd(this, _props12, void 0);
      __privateSet(this, _props12, freeze(props));
    }
    when(...args) {
      return new CaseThenBuilder({
        ...__privateGet(this, _props12),
        node: CaseNode.cloneWithWhen(__privateGet(this, _props12).node, WhenNode.create(parseWhen(args)))
      });
    }
  }
  _props12 = new WeakMap();
  class CaseThenBuilder {
    constructor(props) {
      __privateAdd(this, _props13, void 0);
      __privateSet(this, _props13, freeze(props));
    }
    then(valueExpression) {
      return new CaseWhenBuilder({
        ...__privateGet(this, _props13),
        node: CaseNode.cloneWithThen(__privateGet(this, _props13).node, parseValueExpression(valueExpression))
      });
    }
  }
  _props13 = new WeakMap();
  class CaseWhenBuilder {
    constructor(props) {
      __privateAdd(this, _props14, void 0);
      __privateSet(this, _props14, freeze(props));
    }
    when(...args) {
      return new CaseThenBuilder({
        ...__privateGet(this, _props14),
        node: CaseNode.cloneWithWhen(__privateGet(this, _props14).node, WhenNode.create(parseWhen(args)))
      });
    }
    else(valueExpression) {
      return new CaseEndBuilder({
        ...__privateGet(this, _props14),
        node: CaseNode.cloneWith(__privateGet(this, _props14).node, {
          else: parseValueExpression(valueExpression)
        })
      });
    }
    end() {
      return new ExpressionWrapper(CaseNode.cloneWith(__privateGet(this, _props14).node, { isStatement: false }));
    }
    endCase() {
      return new ExpressionWrapper(CaseNode.cloneWith(__privateGet(this, _props14).node, { isStatement: true }));
    }
  }
  _props14 = new WeakMap();
  class CaseEndBuilder {
    constructor(props) {
      __privateAdd(this, _props15, void 0);
      __privateSet(this, _props15, freeze(props));
    }
    end() {
      return new ExpressionWrapper(CaseNode.cloneWith(__privateGet(this, _props15).node, { isStatement: false }));
    }
    endCase() {
      return new ExpressionWrapper(CaseNode.cloneWith(__privateGet(this, _props15).node, { isStatement: true }));
    }
  }
  _props15 = new WeakMap();
  function createExpressionBuilder(executor = NOOP_QUERY_EXECUTOR) {
    function unary(op, expr) {
      return new ExpressionWrapper(parseUnaryOperation(op, expr));
    }
    return {
      get fn() {
        return createFunctionModule();
      },
      selectFrom(table) {
        return new SelectQueryBuilder({
          queryId: createQueryId(),
          executor,
          queryNode: SelectQueryNode.create(parseTableExpressionOrList(table))
        });
      },
      case(reference) {
        return new CaseBuilder({
          node: CaseNode.create(isUndefined(reference) ? void 0 : parseReferenceExpression(reference))
        });
      },
      ref(reference) {
        return new ExpressionWrapper(parseStringReference(reference));
      },
      val(value) {
        return new ExpressionWrapper(parseValueExpressionOrList(value));
      },
      cmpr(lhs, op, rhs) {
        return new ExpressionWrapper(parseValueBinaryOperation(lhs, op, rhs));
      },
      bxp(lhs, op, rhs) {
        return new ExpressionWrapper(parseValueBinaryOperation(lhs, op, rhs));
      },
      unary,
      not(expr) {
        return unary("not", expr);
      },
      exists(expr) {
        return unary("exists", expr);
      },
      neg(expr) {
        return unary("-", expr);
      },
      and(exprs) {
        if (exprs.length === 0) {
          return new ExpressionWrapper(ValueNode.createImmediate(true));
        } else if (exprs.length === 1) {
          return new ExpressionWrapper(exprs[0].toOperationNode());
        }
        let node = AndNode.create(exprs[0].toOperationNode(), exprs[1].toOperationNode());
        for (let i = 2; i < exprs.length; ++i) {
          node = AndNode.create(node, exprs[i].toOperationNode());
        }
        return new ExpressionWrapper(ParensNode.create(node));
      },
      or(exprs) {
        if (exprs.length === 0) {
          return new ExpressionWrapper(ValueNode.createImmediate(false));
        } else if (exprs.length === 1) {
          return new ExpressionWrapper(exprs[0].toOperationNode());
        }
        let node = OrNode.create(exprs[0].toOperationNode(), exprs[1].toOperationNode());
        for (let i = 2; i < exprs.length; ++i) {
          node = OrNode.create(node, exprs[i].toOperationNode());
        }
        return new ExpressionWrapper(ParensNode.create(node));
      },
      withSchema(schema) {
        return createExpressionBuilder(executor.withPluginAtFront(new WithSchemaPlugin(schema)));
      }
    };
  }
  function expressionBuilder(_) {
    return createExpressionBuilder();
  }
  function parseExpression(exp) {
    if (isOperationNodeSource(exp)) {
      return exp.toOperationNode();
    } else if (isFunction(exp)) {
      return exp(expressionBuilder()).toOperationNode();
    }
    throw new Error(`invalid expression: ${JSON.stringify(exp)}`);
  }
  function parseAliasedExpression(exp) {
    if (isOperationNodeSource(exp)) {
      return exp.toOperationNode();
    } else if (isFunction(exp)) {
      return exp(expressionBuilder()).toOperationNode();
    }
    throw new Error(`invalid aliased expression: ${JSON.stringify(exp)}`);
  }
  function isExpressionOrFactory(obj) {
    return isExpression(obj) || isAliasedExpression(obj) || isFunction(obj);
  }
  function parseTableExpressionOrList(table) {
    if (isReadonlyArray(table)) {
      return table.map((it) => parseTableExpression(it));
    } else {
      return [parseTableExpression(table)];
    }
  }
  function parseTableExpression(table) {
    if (isString$1(table)) {
      return parseAliasedTable(table);
    } else {
      return parseAliasedExpression(table);
    }
  }
  function parseAliasedTable(from) {
    const ALIAS_SEPARATOR = " as ";
    if (from.includes(ALIAS_SEPARATOR)) {
      const [table, alias] = from.split(ALIAS_SEPARATOR).map(trim$1);
      return AliasNode.create(parseTable(table), IdentifierNode.create(alias));
    } else {
      return parseTable(from);
    }
  }
  function parseTable(from) {
    const SCHEMA_SEPARATOR = ".";
    if (from.includes(SCHEMA_SEPARATOR)) {
      const [schema, table] = from.split(SCHEMA_SEPARATOR).map(trim$1);
      return TableNode.createWithSchema(schema, table);
    } else {
      return TableNode.create(from);
    }
  }
  function trim$1(str) {
    return str.trim();
  }
  const AddColumnNode = freeze({
    is(node) {
      return node.kind === "AddColumnNode";
    },
    create(column) {
      return freeze({
        kind: "AddColumnNode",
        column
      });
    }
  });
  const AlterColumnNode = freeze({
    is(node) {
      return node.kind === "AlterColumnNode";
    },
    create(column) {
      return freeze({
        kind: "AlterColumnNode",
        column: ColumnNode.create(column)
      });
    },
    cloneWith(node, props) {
      return freeze({
        ...node,
        ...props
      });
    }
  });
  const ColumnDefinitionNode = freeze({
    is(node) {
      return node.kind === "ColumnDefinitionNode";
    },
    create(column, dataType) {
      return freeze({
        kind: "ColumnDefinitionNode",
        column: ColumnNode.create(column),
        dataType
      });
    },
    cloneWithFrontModifier(node, modifier) {
      return freeze({
        ...node,
        frontModifiers: node.frontModifiers ? freeze([...node.frontModifiers, modifier]) : [modifier]
      });
    },
    cloneWithEndModifier(node, modifier) {
      return freeze({
        ...node,
        endModifiers: node.endModifiers ? freeze([...node.endModifiers, modifier]) : [modifier]
      });
    },
    cloneWith(node, props) {
      return freeze({
        ...node,
        ...props
      });
    }
  });
  const DropColumnNode = freeze({
    is(node) {
      return node.kind === "DropColumnNode";
    },
    create(column) {
      return freeze({
        kind: "DropColumnNode",
        column: ColumnNode.create(column)
      });
    }
  });
  const RenameColumnNode = freeze({
    is(node) {
      return node.kind === "RenameColumnNode";
    },
    create(column, newColumn) {
      return freeze({
        kind: "RenameColumnNode",
        column: ColumnNode.create(column),
        renameTo: ColumnNode.create(newColumn)
      });
    }
  });
  const CheckConstraintNode = freeze({
    is(node) {
      return node.kind === "CheckConstraintNode";
    },
    create(expression, constraintName) {
      return freeze({
        kind: "CheckConstraintNode",
        expression,
        name: constraintName ? IdentifierNode.create(constraintName) : void 0
      });
    }
  });
  const ON_MODIFY_FOREIGN_ACTIONS = [
    "no action",
    "restrict",
    "cascade",
    "set null",
    "set default"
  ];
  const ReferencesNode = freeze({
    is(node) {
      return node.kind === "ReferencesNode";
    },
    create(table, columns) {
      return freeze({
        kind: "ReferencesNode",
        table,
        columns: freeze([...columns])
      });
    },
    cloneWithOnDelete(references, onDelete) {
      return freeze({
        ...references,
        onDelete
      });
    },
    cloneWithOnUpdate(references, onUpdate) {
      return freeze({
        ...references,
        onUpdate
      });
    }
  });
  function parseDefaultValueExpression(value) {
    return isOperationNodeSource(value) ? value.toOperationNode() : ValueNode.createImmediate(value);
  }
  const GeneratedNode = freeze({
    is(node) {
      return node.kind === "GeneratedNode";
    },
    create(params) {
      return freeze({
        kind: "GeneratedNode",
        ...params
      });
    },
    createWithExpression(expression) {
      return freeze({
        kind: "GeneratedNode",
        always: true,
        expression
      });
    },
    cloneWith(node, params) {
      return freeze({
        ...node,
        ...params
      });
    }
  });
  const DefaultValueNode = freeze({
    is(node) {
      return node.kind === "DefaultValueNode";
    },
    create(defaultValue) {
      return freeze({
        kind: "DefaultValueNode",
        defaultValue
      });
    }
  });
  function parseOnModifyForeignAction(action) {
    if (ON_MODIFY_FOREIGN_ACTIONS.includes(action)) {
      return action;
    }
    throw new Error(`invalid OnModifyForeignAction ${action}`);
  }
  const _ColumnDefinitionBuilder = class {
    constructor(node) {
      __privateAdd(this, _node2, void 0);
      __privateSet(this, _node2, node);
    }
    /**
     * Adds `auto_increment` or `autoincrement` to the column definition
     * depending on the dialect.
     *
     * Some dialects like PostgreSQL don't support this. On PostgreSQL
     * you can use the `serial` or `bigserial` data type instead.
     */
    autoIncrement() {
      return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node2), { autoIncrement: true }));
    }
    /**
     * Makes the column the primary key.
     *
     * If you want to specify a composite primary key use the
     * {@link CreateTableBuilder.addPrimaryKeyConstraint} method.
     */
    primaryKey() {
      return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node2), { primaryKey: true }));
    }
    /**
     * Adds a foreign key constraint for the column.
     *
     * If your database engine doesn't support foreign key constraints in the
     * column definition (like MySQL 5) you need to call the table level
     * {@link CreateTableBuilder.addForeignKeyConstraint} method instead.
     *
     * ### Examples
     *
     * ```ts
     * col.references('person.id')
     * ```
     */
    references(ref) {
      const references = parseStringReference(ref);
      if (!ReferenceNode.is(references) || SelectAllNode.is(references.column)) {
        throw new Error(`invalid call references('${ref}'). The reference must have format table.column or schema.table.column`);
      }
      return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node2), {
        references: ReferencesNode.create(references.table, [
          references.column
        ])
      }));
    }
    /**
     * Adds an `on delete` constraint for the foreign key column.
     *
     * If your database engine doesn't support foreign key constraints in the
     * column definition (like MySQL 5) you need to call the table level
     * {@link CreateTableBuilder.addForeignKeyConstraint} method instead.
     *
     * ### Examples
     *
     * ```ts
     * col.references('person.id').onDelete('cascade')
     * ```
     */
    onDelete(onDelete) {
      if (!__privateGet(this, _node2).references) {
        throw new Error("on delete constraint can only be added for foreign keys");
      }
      return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node2), {
        references: ReferencesNode.cloneWithOnDelete(__privateGet(this, _node2).references, parseOnModifyForeignAction(onDelete))
      }));
    }
    /**
     * Adds an `on update` constraint for the foreign key column.
     *
     * ### Examples
     *
     * ```ts
     * col.references('person.id').onUpdate('cascade')
     * ```
     */
    onUpdate(onUpdate) {
      if (!__privateGet(this, _node2).references) {
        throw new Error("on update constraint can only be added for foreign keys");
      }
      return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node2), {
        references: ReferencesNode.cloneWithOnUpdate(__privateGet(this, _node2).references, parseOnModifyForeignAction(onUpdate))
      }));
    }
    /**
     * Adds a unique constraint for the column.
     */
    unique() {
      return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node2), { unique: true }));
    }
    /**
     * Adds a `not null` constraint for the column.
     */
    notNull() {
      return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node2), { notNull: true }));
    }
    /**
     * Adds a `unsigned` modifier for the column.
     *
     * This only works on some dialects like MySQL.
     */
    unsigned() {
      return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node2), { unsigned: true }));
    }
    /**
     * Adds a default value constraint for the column.
     *
     * ### Examples
     *
     * ```ts
     * db.schema
     *   .createTable('pet')
     *   .addColumn('number_of_legs', 'integer', (col) => col.defaultTo(4))
     *   .execute()
     * ```
     *
     * Values passed to `defaultTo` are interpreted as value literals by default. You can define
     * an arbitrary SQL expression using the {@link sql} template tag:
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * db.schema
     *   .createTable('pet')
     *   .addColumn(
     *     'number_of_legs',
     *     'integer',
     *     (col) => col.defaultTo(sql`any SQL here`)
     *   )
     *   .execute()
     * ```
     */
    defaultTo(value) {
      return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node2), {
        defaultTo: DefaultValueNode.create(parseDefaultValueExpression(value))
      }));
    }
    /**
     * Adds a check constraint for the column.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * db.schema
     *   .createTable('pet')
     *   .addColumn('number_of_legs', 'integer', (col) =>
     *     col.check(sql`number_of_legs < 5`)
     *   )
     *   .execute()
     * ```
     */
    check(expression) {
      return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node2), {
        check: CheckConstraintNode.create(expression.toOperationNode())
      }));
    }
    /**
     * Makes the column a generated column using a `generated always as` statement.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * db.schema
     *   .createTable('person')
     *   .addColumn('full_name', 'varchar(255)',
     *     (col) => col.generatedAlwaysAs(sql`concat(first_name, ' ', last_name)`)
     *   )
     *   .execute()
     * ```
     */
    generatedAlwaysAs(expression) {
      return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node2), {
        generated: GeneratedNode.createWithExpression(expression.toOperationNode())
      }));
    }
    /**
     * Adds the `generated always as identity` specifier on supported dialects.
     */
    generatedAlwaysAsIdentity() {
      return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node2), {
        generated: GeneratedNode.create({ identity: true, always: true })
      }));
    }
    /**
     * Adds the `generated by default as identity` specifier on supported dialects.
     */
    generatedByDefaultAsIdentity() {
      return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node2), {
        generated: GeneratedNode.create({ identity: true, byDefault: true })
      }));
    }
    /**
     * Makes a generated column stored instead of virtual. This method can only
     * be used with {@link generatedAlwaysAs}
     *
     * ### Examples
     *
     * ```ts
     * db.schema
     *   .createTable('person')
     *   .addColumn('full_name', 'varchar(255)', (col) => col
     *     .generatedAlwaysAs("concat(first_name, ' ', last_name)")
     *     .stored()
     *   )
     *   .execute()
     * ```
     */
    stored() {
      if (!__privateGet(this, _node2).generated) {
        throw new Error("stored() can only be called after generatedAlwaysAs");
      }
      return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWith(__privateGet(this, _node2), {
        generated: GeneratedNode.cloneWith(__privateGet(this, _node2).generated, {
          stored: true
        })
      }));
    }
    /**
     * This can be used to add any additional SQL right after the column's data type.
     *
     * ### Examples
     *
     * ```ts
     * db.schema.createTable('person')
     *  .addColumn('id', 'integer', col => col.primaryKey())
     *  .addColumn('first_name', 'varchar(36)', col => col.modifyFront(sql`collate utf8mb4_general_ci`).notNull())
     *  .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `id` integer primary key,
     *   `first_name` varchar(36) collate utf8mb4_general_ci not null
     * )
     * ```
     */
    modifyFront(modifier) {
      return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWithFrontModifier(__privateGet(this, _node2), modifier.toOperationNode()));
    }
    /**
     * This can be used to add any additional SQL to the end of the column definition.
     *
     * ### Examples
     *
     * ```ts
     * db.schema.createTable('person')
     *  .addColumn('id', 'integer', col => col.primaryKey())
     *  .addColumn('age', 'integer', col => col.unsigned().notNull().modifyEnd(sql`comment ${sql.lit('it is not polite to ask a woman her age')}`))
     *  .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `id` integer primary key,
     *   `age` integer unsigned not null comment 'it is not polite to ask a woman her age'
     * )
     * ```
     */
    modifyEnd(modifier) {
      return new _ColumnDefinitionBuilder(ColumnDefinitionNode.cloneWithEndModifier(__privateGet(this, _node2), modifier.toOperationNode()));
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
      return func(this);
    }
    toOperationNode() {
      return __privateGet(this, _node2);
    }
  };
  let ColumnDefinitionBuilder = _ColumnDefinitionBuilder;
  _node2 = new WeakMap();
  preventAwait(ColumnDefinitionBuilder, "don't await ColumnDefinitionBuilder instances directly.");
  const ModifyColumnNode = freeze({
    is(node) {
      return node.kind === "ModifyColumnNode";
    },
    create(column) {
      return freeze({
        kind: "ModifyColumnNode",
        column
      });
    }
  });
  const DataTypeNode = freeze({
    is(node) {
      return node.kind === "DataTypeNode";
    },
    create(dataType) {
      return freeze({
        kind: "DataTypeNode",
        dataType
      });
    }
  });
  function parseDataTypeExpression(dataType) {
    return isOperationNodeSource(dataType) ? dataType.toOperationNode() : DataTypeNode.create(dataType);
  }
  const ForeignKeyConstraintNode = freeze({
    is(node) {
      return node.kind === "ForeignKeyConstraintNode";
    },
    create(sourceColumns, targetTable, targetColumns, constraintName) {
      return freeze({
        kind: "ForeignKeyConstraintNode",
        columns: sourceColumns,
        references: ReferencesNode.create(targetTable, targetColumns),
        name: constraintName ? IdentifierNode.create(constraintName) : void 0
      });
    },
    cloneWith(node, props) {
      return freeze({
        ...node,
        ...props
      });
    }
  });
  const _ForeignKeyConstraintBuilder = class {
    constructor(node) {
      __privateAdd(this, _node3, void 0);
      __privateSet(this, _node3, node);
    }
    onDelete(onDelete) {
      return new _ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.cloneWith(__privateGet(this, _node3), {
        onDelete: parseOnModifyForeignAction(onDelete)
      }));
    }
    onUpdate(onUpdate) {
      return new _ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.cloneWith(__privateGet(this, _node3), {
        onUpdate: parseOnModifyForeignAction(onUpdate)
      }));
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
      return func(this);
    }
    toOperationNode() {
      return __privateGet(this, _node3);
    }
  };
  let ForeignKeyConstraintBuilder = _ForeignKeyConstraintBuilder;
  _node3 = new WeakMap();
  preventAwait(ForeignKeyConstraintBuilder, "don't await ForeignKeyConstraintBuilder instances directly.");
  const AddConstraintNode = freeze({
    is(node) {
      return node.kind === "AddConstraintNode";
    },
    create(constraint) {
      return freeze({
        kind: "AddConstraintNode",
        constraint
      });
    }
  });
  const UniqueConstraintNode = freeze({
    is(node) {
      return node.kind === "UniqueConstraintNode";
    },
    create(columns, constraintName) {
      return freeze({
        kind: "UniqueConstraintNode",
        columns: freeze(columns.map(ColumnNode.create)),
        name: constraintName ? IdentifierNode.create(constraintName) : void 0
      });
    }
  });
  const DropConstraintNode = freeze({
    is(node) {
      return node.kind === "DropConstraintNode";
    },
    create(constraintName) {
      return freeze({
        kind: "DropConstraintNode",
        constraintName: IdentifierNode.create(constraintName)
      });
    },
    cloneWith(dropConstraint, props) {
      return freeze({
        ...dropConstraint,
        ...props
      });
    }
  });
  class AlterColumnBuilder {
    constructor(alterColumnNode) {
      __publicField(this, "alterColumnNode");
      this.alterColumnNode = alterColumnNode;
    }
    setDataType(dataType) {
      return new AlteredColumnBuilder(AlterColumnNode.cloneWith(this.alterColumnNode, {
        dataType: parseDataTypeExpression(dataType)
      }));
    }
    setDefault(value) {
      return new AlteredColumnBuilder(AlterColumnNode.cloneWith(this.alterColumnNode, {
        setDefault: parseDefaultValueExpression(value)
      }));
    }
    dropDefault() {
      return new AlteredColumnBuilder(AlterColumnNode.cloneWith(this.alterColumnNode, {
        dropDefault: true
      }));
    }
    setNotNull() {
      return new AlteredColumnBuilder(AlterColumnNode.cloneWith(this.alterColumnNode, {
        setNotNull: true
      }));
    }
    dropNotNull() {
      return new AlteredColumnBuilder(AlterColumnNode.cloneWith(this.alterColumnNode, {
        dropNotNull: true
      }));
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
      return func(this);
    }
  }
  class AlteredColumnBuilder extends AlterColumnBuilder {
    toOperationNode() {
      return this.alterColumnNode;
    }
  }
  class AlterTableExecutor {
    constructor(props) {
      __privateAdd(this, _props16, void 0);
      __privateSet(this, _props16, freeze(props));
    }
    toOperationNode() {
      return __privateGet(this, _props16).executor.transformQuery(__privateGet(this, _props16).node, __privateGet(this, _props16).queryId);
    }
    compile() {
      return __privateGet(this, _props16).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props16).queryId);
    }
    async execute() {
      await __privateGet(this, _props16).executor.executeQuery(this.compile(), __privateGet(this, _props16).queryId);
    }
  }
  _props16 = new WeakMap();
  preventAwait(AlterTableExecutor, "don't await AlterTableExecutor instances directly. To execute the query you need to call `execute`");
  const _AlterTableAddForeignKeyConstraintBuilder = class {
    constructor(props) {
      __privateAdd(this, _props17, void 0);
      __privateSet(this, _props17, freeze(props));
    }
    onDelete(onDelete) {
      return new _AlterTableAddForeignKeyConstraintBuilder({
        ...__privateGet(this, _props17),
        constraintBuilder: __privateGet(this, _props17).constraintBuilder.onDelete(onDelete)
      });
    }
    onUpdate(onUpdate) {
      return new _AlterTableAddForeignKeyConstraintBuilder({
        ...__privateGet(this, _props17),
        constraintBuilder: __privateGet(this, _props17).constraintBuilder.onUpdate(onUpdate)
      });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
      return func(this);
    }
    toOperationNode() {
      return __privateGet(this, _props17).executor.transformQuery(AlterTableNode.cloneWithTableProps(__privateGet(this, _props17).node, {
        addConstraint: AddConstraintNode.create(__privateGet(this, _props17).constraintBuilder.toOperationNode())
      }), __privateGet(this, _props17).queryId);
    }
    compile() {
      return __privateGet(this, _props17).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props17).queryId);
    }
    async execute() {
      await __privateGet(this, _props17).executor.executeQuery(this.compile(), __privateGet(this, _props17).queryId);
    }
  };
  let AlterTableAddForeignKeyConstraintBuilder = _AlterTableAddForeignKeyConstraintBuilder;
  _props17 = new WeakMap();
  preventAwait(AlterTableAddForeignKeyConstraintBuilder, "don't await AlterTableAddForeignKeyConstraintBuilder instances directly. To execute the query you need to call `execute`");
  const _AlterTableDropConstraintBuilder = class {
    constructor(props) {
      __privateAdd(this, _props18, void 0);
      __privateSet(this, _props18, freeze(props));
    }
    ifExists() {
      return new _AlterTableDropConstraintBuilder({
        ...__privateGet(this, _props18),
        node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props18).node, {
          dropConstraint: DropConstraintNode.cloneWith(__privateGet(this, _props18).node.dropConstraint, {
            ifExists: true
          })
        })
      });
    }
    cascade() {
      return new _AlterTableDropConstraintBuilder({
        ...__privateGet(this, _props18),
        node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props18).node, {
          dropConstraint: DropConstraintNode.cloneWith(__privateGet(this, _props18).node.dropConstraint, {
            modifier: "cascade"
          })
        })
      });
    }
    restrict() {
      return new _AlterTableDropConstraintBuilder({
        ...__privateGet(this, _props18),
        node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props18).node, {
          dropConstraint: DropConstraintNode.cloneWith(__privateGet(this, _props18).node.dropConstraint, {
            modifier: "restrict"
          })
        })
      });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
      return func(this);
    }
    toOperationNode() {
      return __privateGet(this, _props18).executor.transformQuery(__privateGet(this, _props18).node, __privateGet(this, _props18).queryId);
    }
    compile() {
      return __privateGet(this, _props18).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props18).queryId);
    }
    async execute() {
      await __privateGet(this, _props18).executor.executeQuery(this.compile(), __privateGet(this, _props18).queryId);
    }
  };
  let AlterTableDropConstraintBuilder = _AlterTableDropConstraintBuilder;
  _props18 = new WeakMap();
  preventAwait(AlterTableDropConstraintBuilder, "don't await AlterTableDropConstraintBuilder instances directly. To execute the query you need to call `execute`");
  class AlterTableBuilder {
    constructor(props) {
      __privateAdd(this, _props19, void 0);
      __privateSet(this, _props19, freeze(props));
    }
    renameTo(newTableName) {
      return new AlterTableExecutor({
        ...__privateGet(this, _props19),
        node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props19).node, {
          renameTo: parseTable(newTableName)
        })
      });
    }
    setSchema(newSchema) {
      return new AlterTableExecutor({
        ...__privateGet(this, _props19),
        node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props19).node, {
          setSchema: IdentifierNode.create(newSchema)
        })
      });
    }
    alterColumn(column, alteration) {
      const builder = alteration(new AlterColumnBuilder(AlterColumnNode.create(column)));
      return new AlterTableColumnAlteringBuilder({
        ...__privateGet(this, _props19),
        node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props19).node, builder.toOperationNode())
      });
    }
    dropColumn(column) {
      return new AlterTableColumnAlteringBuilder({
        ...__privateGet(this, _props19),
        node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props19).node, DropColumnNode.create(column))
      });
    }
    renameColumn(column, newColumn) {
      return new AlterTableColumnAlteringBuilder({
        ...__privateGet(this, _props19),
        node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props19).node, RenameColumnNode.create(column, newColumn))
      });
    }
    addColumn(columnName, dataType, build = noop) {
      const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
      return new AlterTableColumnAlteringBuilder({
        ...__privateGet(this, _props19),
        node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props19).node, AddColumnNode.create(builder.toOperationNode()))
      });
    }
    modifyColumn(columnName, dataType, build = noop) {
      const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
      return new AlterTableColumnAlteringBuilder({
        ...__privateGet(this, _props19),
        node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props19).node, ModifyColumnNode.create(builder.toOperationNode()))
      });
    }
    /**
     * See {@link CreateTableBuilder.addUniqueConstraint}
     */
    addUniqueConstraint(constraintName, columns) {
      return new AlterTableExecutor({
        ...__privateGet(this, _props19),
        node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props19).node, {
          addConstraint: AddConstraintNode.create(UniqueConstraintNode.create(columns, constraintName))
        })
      });
    }
    /**
     * See {@link CreateTableBuilder.addCheckConstraint}
     */
    addCheckConstraint(constraintName, checkExpression) {
      return new AlterTableExecutor({
        ...__privateGet(this, _props19),
        node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props19).node, {
          addConstraint: AddConstraintNode.create(CheckConstraintNode.create(checkExpression.toOperationNode(), constraintName))
        })
      });
    }
    /**
     * See {@link CreateTableBuilder.addForeignKeyConstraint}
     *
     * Unlike {@link CreateTableBuilder.addForeignKeyConstraint} this method returns
     * the constraint builder and doesn't take a callback as the last argument. This
     * is because you can only add one column per `ALTER TABLE` query.
     */
    addForeignKeyConstraint(constraintName, columns, targetTable, targetColumns) {
      return new AlterTableAddForeignKeyConstraintBuilder({
        ...__privateGet(this, _props19),
        constraintBuilder: new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.create(columns.map(ColumnNode.create), parseTable(targetTable), targetColumns.map(ColumnNode.create), constraintName))
      });
    }
    dropConstraint(constraintName) {
      return new AlterTableDropConstraintBuilder({
        ...__privateGet(this, _props19),
        node: AlterTableNode.cloneWithTableProps(__privateGet(this, _props19).node, {
          dropConstraint: DropConstraintNode.create(constraintName)
        })
      });
    }
    /**
     * Calls the given function passing `this` as the only argument.
     *
     * See {@link CreateTableBuilder.$call}
     */
    $call(func) {
      return func(this);
    }
    /**
     * @deprecated Use `$call` instead
     */
    call(func) {
      return this.$call(func);
    }
  }
  _props19 = new WeakMap();
  const _AlterTableColumnAlteringBuilder = class {
    constructor(props) {
      __privateAdd(this, _props20, void 0);
      __privateSet(this, _props20, freeze(props));
    }
    alterColumn(column, alteration) {
      const builder = alteration(new AlterColumnBuilder(AlterColumnNode.create(column)));
      return new _AlterTableColumnAlteringBuilder({
        ...__privateGet(this, _props20),
        node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props20).node, builder.toOperationNode())
      });
    }
    dropColumn(column) {
      return new _AlterTableColumnAlteringBuilder({
        ...__privateGet(this, _props20),
        node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props20).node, DropColumnNode.create(column))
      });
    }
    renameColumn(column, newColumn) {
      return new _AlterTableColumnAlteringBuilder({
        ...__privateGet(this, _props20),
        node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props20).node, RenameColumnNode.create(column, newColumn))
      });
    }
    addColumn(columnName, dataType, build = noop) {
      const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
      return new _AlterTableColumnAlteringBuilder({
        ...__privateGet(this, _props20),
        node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props20).node, AddColumnNode.create(builder.toOperationNode()))
      });
    }
    modifyColumn(columnName, dataType, build = noop) {
      const builder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
      return new _AlterTableColumnAlteringBuilder({
        ...__privateGet(this, _props20),
        node: AlterTableNode.cloneWithColumnAlteration(__privateGet(this, _props20).node, ModifyColumnNode.create(builder.toOperationNode()))
      });
    }
    toOperationNode() {
      return __privateGet(this, _props20).executor.transformQuery(__privateGet(this, _props20).node, __privateGet(this, _props20).queryId);
    }
    compile() {
      return __privateGet(this, _props20).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props20).queryId);
    }
    async execute() {
      await __privateGet(this, _props20).executor.executeQuery(this.compile(), __privateGet(this, _props20).queryId);
    }
  };
  let AlterTableColumnAlteringBuilder = _AlterTableColumnAlteringBuilder;
  _props20 = new WeakMap();
  preventAwait(AlterTableBuilder, "don't await AlterTableBuilder instances");
  preventAwait(AlterColumnBuilder, "don't await AlterColumnBuilder instances");
  preventAwait(AlterTableColumnAlteringBuilder, "don't await AlterTableColumnAlteringBuilder instances directly. To execute the query you need to call `execute`");
  class ImmediateValueTransformer extends OperationNodeTransformer {
    transformValue(node) {
      return {
        ...super.transformValue(node),
        immediate: true
      };
    }
  }
  const _CreateIndexBuilder = class {
    constructor(props) {
      __privateAdd(this, _props21, void 0);
      __privateSet(this, _props21, freeze(props));
    }
    /**
     * Adds the "if not exists" modifier.
     *
     * If the index already exists, no error is thrown if this method has been called.
     */
    ifNotExists() {
      return new _CreateIndexBuilder({
        ...__privateGet(this, _props21),
        node: CreateIndexNode.cloneWith(__privateGet(this, _props21).node, {
          ifNotExists: true
        })
      });
    }
    /**
     * Makes the index unique.
     */
    unique() {
      return new _CreateIndexBuilder({
        ...__privateGet(this, _props21),
        node: CreateIndexNode.cloneWith(__privateGet(this, _props21).node, {
          unique: true
        })
      });
    }
    /**
     * Specifies the table for the index.
     */
    on(table) {
      return new _CreateIndexBuilder({
        ...__privateGet(this, _props21),
        node: CreateIndexNode.cloneWith(__privateGet(this, _props21).node, {
          table: parseTable(table)
        })
      });
    }
    /**
     * Adds a column to the index.
     *
     * Also see {@link columns} for adding multiple columns at once or {@link expression}
     * for specifying an arbitrary expression.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *         .createIndex('person_first_name_and_age_index')
     *         .on('person')
     *         .column('first_name')
     *         .column('age desc')
     *         .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create index "person_first_name_and_age_index" on "person" ("first_name", "age" desc)
     * ```
     */
    column(column) {
      return new _CreateIndexBuilder({
        ...__privateGet(this, _props21),
        node: CreateIndexNode.cloneWithColumns(__privateGet(this, _props21).node, [
          parseOrderedColumnName(column)
        ])
      });
    }
    /**
     * Specifies a list of columns for the index.
     *
     * Also see {@link column} for adding a single column or {@link expression} for
     * specifying an arbitrary expression.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *         .createIndex('person_first_name_and_age_index')
     *         .on('person')
     *         .columns(['first_name', 'age desc'])
     *         .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create index "person_first_name_and_age_index" on "person" ("first_name", "age" desc)
     * ```
     */
    columns(columns) {
      return new _CreateIndexBuilder({
        ...__privateGet(this, _props21),
        node: CreateIndexNode.cloneWithColumns(__privateGet(this, _props21).node, columns.map(parseOrderedColumnName))
      });
    }
    /**
     * Specifies an arbitrary expression for the index.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createIndex('person_first_name_index')
     *   .on('person')
     *   .expression(sql`first_name COLLATE "fi_FI"`)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * create index "person_first_name_index" on "person" (first_name COLLATE "fi_FI")
     * ```
     */
    expression(expression) {
      return new _CreateIndexBuilder({
        ...__privateGet(this, _props21),
        node: CreateIndexNode.cloneWithColumns(__privateGet(this, _props21).node, [
          expression.toOperationNode()
        ])
      });
    }
    using(indexType) {
      return new _CreateIndexBuilder({
        ...__privateGet(this, _props21),
        node: CreateIndexNode.cloneWith(__privateGet(this, _props21).node, {
          using: RawNode.createWithSql(indexType)
        })
      });
    }
    where(...args) {
      const transformer = new ImmediateValueTransformer();
      return new _CreateIndexBuilder({
        ...__privateGet(this, _props21),
        node: QueryNode.cloneWithWhere(__privateGet(this, _props21).node, transformer.transformNode(parseWhere(args)))
      });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
      return func(this);
    }
    toOperationNode() {
      return __privateGet(this, _props21).executor.transformQuery(__privateGet(this, _props21).node, __privateGet(this, _props21).queryId);
    }
    compile() {
      return __privateGet(this, _props21).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props21).queryId);
    }
    async execute() {
      await __privateGet(this, _props21).executor.executeQuery(this.compile(), __privateGet(this, _props21).queryId);
    }
  };
  let CreateIndexBuilder = _CreateIndexBuilder;
  _props21 = new WeakMap();
  preventAwait(CreateIndexBuilder, "don't await CreateIndexBuilder instances directly. To execute the query you need to call `execute`");
  const _CreateSchemaBuilder = class {
    constructor(props) {
      __privateAdd(this, _props22, void 0);
      __privateSet(this, _props22, freeze(props));
    }
    ifNotExists() {
      return new _CreateSchemaBuilder({
        ...__privateGet(this, _props22),
        node: CreateSchemaNode.cloneWith(__privateGet(this, _props22).node, { ifNotExists: true })
      });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
      return func(this);
    }
    toOperationNode() {
      return __privateGet(this, _props22).executor.transformQuery(__privateGet(this, _props22).node, __privateGet(this, _props22).queryId);
    }
    compile() {
      return __privateGet(this, _props22).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props22).queryId);
    }
    async execute() {
      await __privateGet(this, _props22).executor.executeQuery(this.compile(), __privateGet(this, _props22).queryId);
    }
  };
  let CreateSchemaBuilder = _CreateSchemaBuilder;
  _props22 = new WeakMap();
  preventAwait(CreateSchemaBuilder, "don't await CreateSchemaBuilder instances directly. To execute the query you need to call `execute`");
  const PrimaryConstraintNode = freeze({
    is(node) {
      return node.kind === "PrimaryKeyConstraintNode";
    },
    create(columns, constraintName) {
      return freeze({
        kind: "PrimaryKeyConstraintNode",
        columns: freeze(columns.map(ColumnNode.create)),
        name: constraintName ? IdentifierNode.create(constraintName) : void 0
      });
    }
  });
  function parseOnCommitAction(action) {
    if (ON_COMMIT_ACTIONS.includes(action)) {
      return action;
    }
    throw new Error(`invalid OnCommitAction ${action}`);
  }
  const _CreateTableBuilder = class {
    constructor(props) {
      __privateAdd(this, _props23, void 0);
      __privateSet(this, _props23, freeze(props));
    }
    /**
     * Adds the "temporary" modifier.
     *
     * Use this to create a temporary table.
     */
    temporary() {
      return new _CreateTableBuilder({
        ...__privateGet(this, _props23),
        node: CreateTableNode.cloneWith(__privateGet(this, _props23).node, {
          temporary: true
        })
      });
    }
    /**
     * Adds an "on commit" statement.
     *
     * This can be used in conjunction with temporary tables on supported databases
     * like PostgreSQL.
     */
    onCommit(onCommit) {
      return new _CreateTableBuilder({
        ...__privateGet(this, _props23),
        node: CreateTableNode.cloneWith(__privateGet(this, _props23).node, {
          onCommit: parseOnCommitAction(onCommit)
        })
      });
    }
    /**
     * Adds the "if not exists" modifier.
     *
     * If the table already exists, no error is thrown if this method has been called.
     */
    ifNotExists() {
      return new _CreateTableBuilder({
        ...__privateGet(this, _props23),
        node: CreateTableNode.cloneWith(__privateGet(this, _props23).node, {
          ifNotExists: true
        })
      });
    }
    /**
     * Adds a column to the table.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey()),
     *   .addColumn('first_name', 'varchar(50)', (col) => col.notNull())
     *   .addColumn('last_name', 'varchar(255)')
     *   .addColumn('bank_balance', 'numeric(8, 2)')
     *   // You can specify any data type using the `sql` tag if the types
     *   // don't include it.
     *   .addColumn('data', sql`any_type_here`)
     *   .addColumn('parent_id', 'integer', (col) =>
     *     col.references('person.id').onDelete('cascade'))
     *   )
     * ```
     *
     * With this method, it's once again good to remember that Kysely just builds the
     * query and doesn't provide the same API for all databses. For example, some
     * databases like older MySQL don't support the `references` statement in the
     * column definition. Instead foreign key constraints need to be defined in the
     * `create table` query. See the next example:
     *
     * ```ts
     *   .addColumn('parent_id', 'integer')
     *   .addForeignKeyConstraint(
     *     'person_parent_id_fk', ['parent_id'], 'person', ['id'],
     *     (cb) => cb.onDelete('cascade')
     *   )
     * ```
     *
     * Another good example is that PostgreSQL doesn't support the `auto_increment`
     * keyword and you need to define an autoincrementing column for example using
     * `serial`:
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'serial', (col) => col.primaryKey()),
     * ```
     */
    addColumn(columnName, dataType, build = noop) {
      const columnBuilder = build(new ColumnDefinitionBuilder(ColumnDefinitionNode.create(columnName, parseDataTypeExpression(dataType))));
      return new _CreateTableBuilder({
        ...__privateGet(this, _props23),
        node: CreateTableNode.cloneWithColumn(__privateGet(this, _props23).node, columnBuilder.toOperationNode())
      });
    }
    /**
     * Adds a primary key constraint for one or more columns.
     *
     * The constraint name can be anything you want, but it must be unique
     * across the whole database.
     *
     * ### Examples
     *
     * ```ts
     * addPrimaryKeyConstraint('primary_key', ['first_name', 'last_name'])
     * ```
     */
    addPrimaryKeyConstraint(constraintName, columns) {
      return new _CreateTableBuilder({
        ...__privateGet(this, _props23),
        node: CreateTableNode.cloneWithConstraint(__privateGet(this, _props23).node, PrimaryConstraintNode.create(columns, constraintName))
      });
    }
    /**
     * Adds a unique constraint for one or more columns.
     *
     * The constraint name can be anything you want, but it must be unique
     * across the whole database.
     *
     * ### Examples
     *
     * ```ts
     * addUniqueConstraint('first_name_last_name_unique', ['first_name', 'last_name'])
     * ```
     */
    addUniqueConstraint(constraintName, columns) {
      return new _CreateTableBuilder({
        ...__privateGet(this, _props23),
        node: CreateTableNode.cloneWithConstraint(__privateGet(this, _props23).node, UniqueConstraintNode.create(columns, constraintName))
      });
    }
    /**
     * Adds a check constraint.
     *
     * The constraint name can be anything you want, but it must be unique
     * across the whole database.
     *
     * ### Examples
     *
     * ```ts
     * import { sql } from 'kysely'
     *
     * addCheckConstraint('check_legs', sql`number_of_legs < 5`)
     * ```
     */
    addCheckConstraint(constraintName, checkExpression) {
      return new _CreateTableBuilder({
        ...__privateGet(this, _props23),
        node: CreateTableNode.cloneWithConstraint(__privateGet(this, _props23).node, CheckConstraintNode.create(checkExpression.toOperationNode(), constraintName))
      });
    }
    /**
     * Adds a foreign key constraint.
     *
     * The constraint name can be anything you want, but it must be unique
     * across the whole database.
     *
     * ### Examples
     *
     * ```ts
     * addForeignKeyConstraint(
     *   'owner_id_foreign',
     *   ['owner_id'],
     *   'person',
     *   ['id'],
     * )
     * ```
     *
     * Add constraint for multiple columns:
     *
     * ```ts
     * addForeignKeyConstraint(
     *   'owner_id_foreign',
     *   ['owner_id1', 'owner_id2'],
     *   'person',
     *   ['id1', 'id2'],
     *   (cb) => cb.onDelete('cascade')
     * )
     * ```
     */
    addForeignKeyConstraint(constraintName, columns, targetTable, targetColumns, build = noop) {
      const builder = build(new ForeignKeyConstraintBuilder(ForeignKeyConstraintNode.create(columns.map(ColumnNode.create), parseTable(targetTable), targetColumns.map(ColumnNode.create), constraintName)));
      return new _CreateTableBuilder({
        ...__privateGet(this, _props23),
        node: CreateTableNode.cloneWithConstraint(__privateGet(this, _props23).node, builder.toOperationNode())
      });
    }
    /**
     * This can be used to add any additional SQL to the front of the query __after__ the `create` keyword.
     *
     * Also see {@link temporary}.
     *
     * ### Examples
     *
     * ```ts
     * db.schema.createTable('person')
     *   .modifyFront(sql`global temporary`)
     *   .addColumn('id', 'integer', col => col.primaryKey())
     *   .addColumn('first_name', 'varchar(64)', col => col.notNull())
     *   .addColumn('last_name', 'varchar(64), col => col.notNull())
     *   .execute()
     * ```
     *
     * The generated SQL (Postgres):
     *
     * ```sql
     * create global temporary table "person" (
     *   "id" integer primary key,
     *   "first_name" varchar(64) not null,
     *   "last_name" varchar(64) not null
     * )
     * ```
     */
    modifyFront(modifier) {
      return new _CreateTableBuilder({
        ...__privateGet(this, _props23),
        node: CreateTableNode.cloneWithFrontModifier(__privateGet(this, _props23).node, modifier.toOperationNode())
      });
    }
    /**
     * This can be used to add any additional SQL to the end of the query.
     *
     * Also see {@link onCommit}.
     *
     * ### Examples
     *
     * ```ts
     * db.schema.createTable('person')
     *   .addColumn('id', 'integer', col => col => primaryKey())
     *   .addColumn('first_name', 'varchar(64)', col => col.notNull())
     *   .addColumn('last_name', 'varchar(64), col => col.notNull())
     *   .modifyEnd(sql`collate utf8_unicode_ci`)
     *   .execute()
     * ```
     *
     * The generated SQL (MySQL):
     *
     * ```sql
     * create table `person` (
     *   `id` integer primary key,
     *   `first_name` varchar(64) not null,
     *   `last_name` varchar(64) not null
     * ) collate utf8_unicode_ci
     * ```
     */
    modifyEnd(modifier) {
      return new _CreateTableBuilder({
        ...__privateGet(this, _props23),
        node: CreateTableNode.cloneWithEndModifier(__privateGet(this, _props23).node, modifier.toOperationNode())
      });
    }
    /**
     * Calls the given function passing `this` as the only argument.
     *
     * ### Examples
     *
     * ```ts
     * db.schema
     *   .createTable('test')
     *   .$call((builder) => builder.addColumn('id', 'integer'))
     *   .execute()
     * ```
     *
     * ```ts
     * const addDefaultColumns = <T extends string, C extends string = never>(
     *   builder: CreateTableBuilder<T, C>
     * ) => {
     *   return builder
     *     .addColumn('id', 'integer', (col) => col.notNull())
     *     .addColumn('created_at', 'date', (col) =>
     *       col.notNull().defaultTo(sql`now()`)
     *     )
     *     .addColumn('updated_at', 'date', (col) =>
     *       col.notNull().defaultTo(sql`now()`)
     *     )
     * }
     *
     * db.schema
     *   .createTable('test')
     *   .$call(addDefaultColumns)
     *   .execute()
     * ```
     */
    $call(func) {
      return func(this);
    }
    /**
     * @deprecated Use `$call` instead
     */
    call(func) {
      return this.$call(func);
    }
    toOperationNode() {
      return __privateGet(this, _props23).executor.transformQuery(__privateGet(this, _props23).node, __privateGet(this, _props23).queryId);
    }
    compile() {
      return __privateGet(this, _props23).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props23).queryId);
    }
    async execute() {
      await __privateGet(this, _props23).executor.executeQuery(this.compile(), __privateGet(this, _props23).queryId);
    }
  };
  let CreateTableBuilder = _CreateTableBuilder;
  _props23 = new WeakMap();
  preventAwait(CreateTableBuilder, "don't await CreateTableBuilder instances directly. To execute the query you need to call `execute`");
  const _DropIndexBuilder = class {
    constructor(props) {
      __privateAdd(this, _props24, void 0);
      __privateSet(this, _props24, freeze(props));
    }
    /**
     * Specifies the table the index was created for. This is not needed
     * in all dialects.
     */
    on(table) {
      return new _DropIndexBuilder({
        ...__privateGet(this, _props24),
        node: DropIndexNode.cloneWith(__privateGet(this, _props24).node, {
          table: parseTable(table)
        })
      });
    }
    ifExists() {
      return new _DropIndexBuilder({
        ...__privateGet(this, _props24),
        node: DropIndexNode.cloneWith(__privateGet(this, _props24).node, {
          ifExists: true
        })
      });
    }
    cascade() {
      return new _DropIndexBuilder({
        ...__privateGet(this, _props24),
        node: DropIndexNode.cloneWith(__privateGet(this, _props24).node, {
          cascade: true
        })
      });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
      return func(this);
    }
    toOperationNode() {
      return __privateGet(this, _props24).executor.transformQuery(__privateGet(this, _props24).node, __privateGet(this, _props24).queryId);
    }
    compile() {
      return __privateGet(this, _props24).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props24).queryId);
    }
    async execute() {
      await __privateGet(this, _props24).executor.executeQuery(this.compile(), __privateGet(this, _props24).queryId);
    }
  };
  let DropIndexBuilder = _DropIndexBuilder;
  _props24 = new WeakMap();
  preventAwait(DropIndexBuilder, "don't await DropIndexBuilder instances directly. To execute the query you need to call `execute`");
  const _DropSchemaBuilder = class {
    constructor(props) {
      __privateAdd(this, _props25, void 0);
      __privateSet(this, _props25, freeze(props));
    }
    ifExists() {
      return new _DropSchemaBuilder({
        ...__privateGet(this, _props25),
        node: DropSchemaNode.cloneWith(__privateGet(this, _props25).node, {
          ifExists: true
        })
      });
    }
    cascade() {
      return new _DropSchemaBuilder({
        ...__privateGet(this, _props25),
        node: DropSchemaNode.cloneWith(__privateGet(this, _props25).node, {
          cascade: true
        })
      });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
      return func(this);
    }
    toOperationNode() {
      return __privateGet(this, _props25).executor.transformQuery(__privateGet(this, _props25).node, __privateGet(this, _props25).queryId);
    }
    compile() {
      return __privateGet(this, _props25).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props25).queryId);
    }
    async execute() {
      await __privateGet(this, _props25).executor.executeQuery(this.compile(), __privateGet(this, _props25).queryId);
    }
  };
  let DropSchemaBuilder = _DropSchemaBuilder;
  _props25 = new WeakMap();
  preventAwait(DropSchemaBuilder, "don't await DropSchemaBuilder instances directly. To execute the query you need to call `execute`");
  const _DropTableBuilder = class {
    constructor(props) {
      __privateAdd(this, _props26, void 0);
      __privateSet(this, _props26, freeze(props));
    }
    ifExists() {
      return new _DropTableBuilder({
        ...__privateGet(this, _props26),
        node: DropTableNode.cloneWith(__privateGet(this, _props26).node, {
          ifExists: true
        })
      });
    }
    cascade() {
      return new _DropTableBuilder({
        ...__privateGet(this, _props26),
        node: DropTableNode.cloneWith(__privateGet(this, _props26).node, {
          cascade: true
        })
      });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
      return func(this);
    }
    toOperationNode() {
      return __privateGet(this, _props26).executor.transformQuery(__privateGet(this, _props26).node, __privateGet(this, _props26).queryId);
    }
    compile() {
      return __privateGet(this, _props26).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props26).queryId);
    }
    async execute() {
      await __privateGet(this, _props26).executor.executeQuery(this.compile(), __privateGet(this, _props26).queryId);
    }
  };
  let DropTableBuilder = _DropTableBuilder;
  _props26 = new WeakMap();
  preventAwait(DropTableBuilder, "don't await DropTableBuilder instances directly. To execute the query you need to call `execute`");
  const CreateViewNode = freeze({
    is(node) {
      return node.kind === "CreateViewNode";
    },
    create(name) {
      return freeze({
        kind: "CreateViewNode",
        name: SchemableIdentifierNode.create(name)
      });
    },
    cloneWith(createView, params) {
      return freeze({
        ...createView,
        ...params
      });
    }
  });
  class ImmediateValuePlugin {
    constructor() {
      __privateAdd(this, _transformer2, new ImmediateValueTransformer());
    }
    transformQuery(args) {
      return __privateGet(this, _transformer2).transformNode(args.node);
    }
    transformResult(args) {
      return Promise.resolve(args.result);
    }
  }
  _transformer2 = new WeakMap();
  const _CreateViewBuilder = class {
    constructor(props) {
      __privateAdd(this, _props27, void 0);
      __privateSet(this, _props27, freeze(props));
    }
    /**
     * Adds the "temporary" modifier.
     *
     * Use this to create a temporary view.
     */
    temporary() {
      return new _CreateViewBuilder({
        ...__privateGet(this, _props27),
        node: CreateViewNode.cloneWith(__privateGet(this, _props27).node, {
          temporary: true
        })
      });
    }
    materialized() {
      return new _CreateViewBuilder({
        ...__privateGet(this, _props27),
        node: CreateViewNode.cloneWith(__privateGet(this, _props27).node, {
          materialized: true
        })
      });
    }
    /**
     * Only implemented on some dialects like SQLite. On most dialects, use {@link orReplace}.
     */
    ifNotExists() {
      return new _CreateViewBuilder({
        ...__privateGet(this, _props27),
        node: CreateViewNode.cloneWith(__privateGet(this, _props27).node, {
          ifNotExists: true
        })
      });
    }
    orReplace() {
      return new _CreateViewBuilder({
        ...__privateGet(this, _props27),
        node: CreateViewNode.cloneWith(__privateGet(this, _props27).node, {
          orReplace: true
        })
      });
    }
    columns(columns) {
      return new _CreateViewBuilder({
        ...__privateGet(this, _props27),
        node: CreateViewNode.cloneWith(__privateGet(this, _props27).node, {
          columns: columns.map(parseColumnName)
        })
      });
    }
    /**
     * Sets the select query or a `values` statement that creates the view.
     *
     * WARNING!
     * Some dialects don't support parameterized queries in DDL statements and therefore
     * the query or raw {@link sql } expression passed here is interpolated into a single
     * string opening an SQL injection vulnerability. DO NOT pass unchecked user input
     * into the query or raw expression passed to this method!
     */
    as(query) {
      const queryNode = query.withPlugin(new ImmediateValuePlugin()).toOperationNode();
      return new _CreateViewBuilder({
        ...__privateGet(this, _props27),
        node: CreateViewNode.cloneWith(__privateGet(this, _props27).node, {
          as: queryNode
        })
      });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
      return func(this);
    }
    toOperationNode() {
      return __privateGet(this, _props27).executor.transformQuery(__privateGet(this, _props27).node, __privateGet(this, _props27).queryId);
    }
    compile() {
      return __privateGet(this, _props27).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props27).queryId);
    }
    async execute() {
      await __privateGet(this, _props27).executor.executeQuery(this.compile(), __privateGet(this, _props27).queryId);
    }
  };
  let CreateViewBuilder = _CreateViewBuilder;
  _props27 = new WeakMap();
  preventAwait(CreateViewBuilder, "don't await CreateViewBuilder instances directly. To execute the query you need to call `execute`");
  const DropViewNode = freeze({
    is(node) {
      return node.kind === "DropViewNode";
    },
    create(name) {
      return freeze({
        kind: "DropViewNode",
        name: SchemableIdentifierNode.create(name)
      });
    },
    cloneWith(dropView, params) {
      return freeze({
        ...dropView,
        ...params
      });
    }
  });
  const _DropViewBuilder = class {
    constructor(props) {
      __privateAdd(this, _props28, void 0);
      __privateSet(this, _props28, freeze(props));
    }
    materialized() {
      return new _DropViewBuilder({
        ...__privateGet(this, _props28),
        node: DropViewNode.cloneWith(__privateGet(this, _props28).node, {
          materialized: true
        })
      });
    }
    ifExists() {
      return new _DropViewBuilder({
        ...__privateGet(this, _props28),
        node: DropViewNode.cloneWith(__privateGet(this, _props28).node, {
          ifExists: true
        })
      });
    }
    cascade() {
      return new _DropViewBuilder({
        ...__privateGet(this, _props28),
        node: DropViewNode.cloneWith(__privateGet(this, _props28).node, {
          cascade: true
        })
      });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
      return func(this);
    }
    toOperationNode() {
      return __privateGet(this, _props28).executor.transformQuery(__privateGet(this, _props28).node, __privateGet(this, _props28).queryId);
    }
    compile() {
      return __privateGet(this, _props28).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props28).queryId);
    }
    async execute() {
      await __privateGet(this, _props28).executor.executeQuery(this.compile(), __privateGet(this, _props28).queryId);
    }
  };
  let DropViewBuilder = _DropViewBuilder;
  _props28 = new WeakMap();
  preventAwait(DropViewBuilder, "don't await DropViewBuilder instances directly. To execute the query you need to call `execute`");
  const CreateTypeNode = freeze({
    is(node) {
      return node.kind === "CreateTypeNode";
    },
    create(name) {
      return freeze({
        kind: "CreateTypeNode",
        name
      });
    },
    cloneWithEnum(createType, values) {
      return freeze({
        ...createType,
        enum: ValueListNode.create(values.map((value) => ValueNode.createImmediate(value)))
      });
    }
  });
  const _CreateTypeBuilder = class {
    constructor(props) {
      __privateAdd(this, _props29, void 0);
      __privateSet(this, _props29, freeze(props));
    }
    toOperationNode() {
      return __privateGet(this, _props29).executor.transformQuery(__privateGet(this, _props29).node, __privateGet(this, _props29).queryId);
    }
    /**
     * Creates an anum type.
     *
     * ### Examples
     *
     * ```ts
     * db.schema.createType('species').asEnum(['cat', 'dog', 'frog'])
     * ```
     */
    asEnum(values) {
      return new _CreateTypeBuilder({
        ...__privateGet(this, _props29),
        node: CreateTypeNode.cloneWithEnum(__privateGet(this, _props29).node, values)
      });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
      return func(this);
    }
    compile() {
      return __privateGet(this, _props29).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props29).queryId);
    }
    async execute() {
      await __privateGet(this, _props29).executor.executeQuery(this.compile(), __privateGet(this, _props29).queryId);
    }
  };
  let CreateTypeBuilder = _CreateTypeBuilder;
  _props29 = new WeakMap();
  preventAwait(CreateTypeBuilder, "don't await CreateTypeBuilder instances directly. To execute the query you need to call `execute`");
  const DropTypeNode = freeze({
    is(node) {
      return node.kind === "DropTypeNode";
    },
    create(name) {
      return freeze({
        kind: "DropTypeNode",
        name
      });
    },
    cloneWith(dropType, params) {
      return freeze({
        ...dropType,
        ...params
      });
    }
  });
  const _DropTypeBuilder = class {
    constructor(props) {
      __privateAdd(this, _props30, void 0);
      __privateSet(this, _props30, freeze(props));
    }
    ifExists() {
      return new _DropTypeBuilder({
        ...__privateGet(this, _props30),
        node: DropTypeNode.cloneWith(__privateGet(this, _props30).node, {
          ifExists: true
        })
      });
    }
    /**
     * Simply calls the provided function passing `this` as the only argument. `$call` returns
     * what the provided function returns.
     */
    $call(func) {
      return func(this);
    }
    toOperationNode() {
      return __privateGet(this, _props30).executor.transformQuery(__privateGet(this, _props30).node, __privateGet(this, _props30).queryId);
    }
    compile() {
      return __privateGet(this, _props30).executor.compileQuery(this.toOperationNode(), __privateGet(this, _props30).queryId);
    }
    async execute() {
      await __privateGet(this, _props30).executor.executeQuery(this.compile(), __privateGet(this, _props30).queryId);
    }
  };
  let DropTypeBuilder = _DropTypeBuilder;
  _props30 = new WeakMap();
  preventAwait(DropTypeBuilder, "don't await DropTypeBuilder instances directly. To execute the query you need to call `execute`");
  function parseSchemableIdentifier(id) {
    const SCHEMA_SEPARATOR = ".";
    if (id.includes(SCHEMA_SEPARATOR)) {
      const parts = id.split(SCHEMA_SEPARATOR).map(trim);
      if (parts.length === 2) {
        return SchemableIdentifierNode.createWithSchema(parts[0], parts[1]);
      } else {
        throw new Error(`invalid schemable identifier ${id}`);
      }
    } else {
      return SchemableIdentifierNode.create(id);
    }
  }
  function trim(str) {
    return str.trim();
  }
  const _SchemaModule = class {
    constructor(executor) {
      __privateAdd(this, _executor, void 0);
      __privateSet(this, _executor, executor);
    }
    /**
     * Create a new table.
     *
     * ### Examples
     *
     * This example creates a new table with columns `id`, `first_name`,
     * `last_name` and `gender`:
     *
     * ```ts
     * await db.schema
     *   .createTable('person')
     *   .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
     *   .addColumn('first_name', 'varchar', col => col.notNull())
     *   .addColumn('last_name', 'varchar', col => col.notNull())
     *   .addColumn('gender', 'varchar')
     *   .execute()
     * ```
     *
     * This example creates a table with a foreign key. Not all database
     * engines support column-level foreign key constraint definitions.
     * For example if you are using MySQL 5.X see the next example after
     * this one.
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
     *   .addColumn('owner_id', 'integer', col => col
     *     .references('person.id')
     *     .onDelete('cascade')
     *   )
     *   .execute()
     * ```
     *
     * This example adds a foreign key constraint for a columns just
     * like the previous example, but using a table-level statement.
     * On MySQL 5.X you need to define foreign key constraints like
     * this:
     *
     * ```ts
     * await db.schema
     *   .createTable('pet')
     *   .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
     *   .addColumn('owner_id', 'integer')
     *   .addForeignKeyConstraint(
     *     'pet_owner_id_foreign', ['owner_id'], 'person', ['id'],
     *     (constraint) => constraint.onDelete('cascade')
     *   )
     *   .execute()
     * ```
     */
    createTable(table) {
      return new CreateTableBuilder({
        queryId: createQueryId(),
        executor: __privateGet(this, _executor),
        node: CreateTableNode.create(parseTable(table))
      });
    }
    /**
     * Drop a table.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .dropTable('person')
     *   .execute()
     * ```
     */
    dropTable(table) {
      return new DropTableBuilder({
        queryId: createQueryId(),
        executor: __privateGet(this, _executor),
        node: DropTableNode.create(parseTable(table))
      });
    }
    /**
     * Create a new index.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createIndex('person_full_name_unique_index')
     *   .on('person')
     *   .columns(['first_name', 'last_name'])
     *   .execute()
     * ```
     */
    createIndex(indexName) {
      return new CreateIndexBuilder({
        queryId: createQueryId(),
        executor: __privateGet(this, _executor),
        node: CreateIndexNode.create(indexName)
      });
    }
    /**
     * Drop an index.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .dropIndex('person_full_name_unique_index')
     *   .execute()
     * ```
     */
    dropIndex(indexName) {
      return new DropIndexBuilder({
        queryId: createQueryId(),
        executor: __privateGet(this, _executor),
        node: DropIndexNode.create(indexName)
      });
    }
    /**
     * Create a new schema.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createSchema('some_schema')
     *   .execute()
     * ```
     */
    createSchema(schema) {
      return new CreateSchemaBuilder({
        queryId: createQueryId(),
        executor: __privateGet(this, _executor),
        node: CreateSchemaNode.create(schema)
      });
    }
    /**
     * Drop a schema.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .dropSchema('some_schema')
     *   .execute()
     * ```
     */
    dropSchema(schema) {
      return new DropSchemaBuilder({
        queryId: createQueryId(),
        executor: __privateGet(this, _executor),
        node: DropSchemaNode.create(schema)
      });
    }
    /**
     * Alter a table.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .alterTable('person')
     *   .alterColumn('first_name')
     *   .setDataType('text')
     *   .execute()
     * ```
     */
    alterTable(table) {
      return new AlterTableBuilder({
        queryId: createQueryId(),
        executor: __privateGet(this, _executor),
        node: AlterTableNode.create(parseTable(table))
      });
    }
    /**
     * Create a new view.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createView('dogs')
     *   .orReplace()
     *   .as(db.selectFrom('pet').selectAll().where('species', '=', 'dog'))
     *   .execute()
     * ```
     */
    createView(viewName) {
      return new CreateViewBuilder({
        queryId: createQueryId(),
        executor: __privateGet(this, _executor),
        node: CreateViewNode.create(viewName)
      });
    }
    /**
     * Drop a view.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .dropView('dogs')
     *   .ifExists()
     *   .execute()
     * ```
     */
    dropView(viewName) {
      return new DropViewBuilder({
        queryId: createQueryId(),
        executor: __privateGet(this, _executor),
        node: DropViewNode.create(viewName)
      });
    }
    /**
     * Create a new type.
     *
     * Only some dialects like PostgreSQL have user-defined types.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .createType('species')
     *   .asEnum(['dog', 'cat', 'frog'])
     *   .execute()
     * ```
     */
    createType(typeName) {
      return new CreateTypeBuilder({
        queryId: createQueryId(),
        executor: __privateGet(this, _executor),
        node: CreateTypeNode.create(parseSchemableIdentifier(typeName))
      });
    }
    /**
     * Drop a type.
     *
     * Only some dialects like PostgreSQL have user-defined types.
     *
     * ### Examples
     *
     * ```ts
     * await db.schema
     *   .dropType('species')
     *   .ifExists()
     *   .execute()
     * ```
     */
    dropType(typeName) {
      return new DropTypeBuilder({
        queryId: createQueryId(),
        executor: __privateGet(this, _executor),
        node: DropTypeNode.create(parseSchemableIdentifier(typeName))
      });
    }
    /**
     * Returns a copy of this schema module with the given plugin installed.
     */
    withPlugin(plugin) {
      return new _SchemaModule(__privateGet(this, _executor).withPlugin(plugin));
    }
    /**
     * Returns a copy of this schema module  without any plugins.
     */
    withoutPlugins() {
      return new _SchemaModule(__privateGet(this, _executor).withoutPlugins());
    }
    /**
     * See {@link QueryCreator.withSchema}
     */
    withSchema(schema) {
      return new _SchemaModule(__privateGet(this, _executor).withPluginAtFront(new WithSchemaPlugin(schema)));
    }
  };
  let SchemaModule = _SchemaModule;
  _executor = new WeakMap();
  class DynamicModule {
    /**
     * Creates a dynamic reference to a column that is not know at compile time.
     *
     * Kysely is built in a way that by default you can't refer to tables or columns
     * that are not actually visible in the current query and context. This is all
     * done by typescript at compile time, which means that you need to know the
     * columns and tables at compile time. This is not always the case of course.
     *
     * This method is meant to be used in those cases where the column names
     * come from the user input or are not otherwise known at compile time.
     *
     * WARNING! Unlike values, column names are not escaped by the database engine
     * or Kysely and if you pass in unchecked column names using this method, you
     * create an SQL injection vulnerability. Always __always__ validate the user
     * input before passing it to this method.
     *
     * There are couple of examples below for some use cases, but you can pass
     * `ref` to other methods as well. If the types allow you to pass a `ref`
     * value to some place, it should work.
     *
     * ### Examples
     *
     * Filter by a column not know at compile time:
     *
     * ```ts
     * async function someQuery(filterColumn: string, filterValue: string) {
     *   const { ref } = db.dynamic
     *
     *   return await db
     *     .selectFrom('person')
     *     .selectAll()
     *     .where(ref(filterColumn), '=', filterValue)
     *     .execute()
     * }
     *
     * someQuery('first_name', 'Arnold')
     * someQuery('person.last_name', 'Aniston')
     * ```
     *
     * Order by a column not know at compile time:
     *
     * ```ts
     * async function someQuery(orderBy: string) {
     *   const { ref } = db.dynamic
     *
     *   return await db
     *     .selectFrom('person')
     *     .select('person.first_name as fn')
     *     .orderBy(ref(orderBy))
     *     .execute()
     * }
     *
     * someQuery('fn')
     * ```
     *
     * In this example we add selections dynamically:
     *
     * ```ts
     * const { ref } = db.dynamic
     *
     * // Some column name provided by the user. Value not known at compile time.
     * const columnFromUserInput = req.query.select;
     *
     * // A type that lists all possible values `columnFromUserInput` can have.
     * // You can use `keyof Person` if any column of an interface is allowed.
     * type PossibleColumns = 'last_name' | 'first_name' | 'birth_date'
     *
     * const [person] = await db.selectFrom('person')
     *   .select([
     *     ref<PossibleColumns>(columnFromUserInput),
     *     'id'
     *   ])
     *   .execute()
     *
     * // The resulting type contains all `PossibleColumns` as optional fields
     * // because we cannot know which field was actually selected before
     * // running the code.
     * const lastName: string | undefined = person.last_name
     * const firstName: string | undefined = person.first_name
     * const birthDate: string | undefined = person.birth_date
     *
     * // The result type also contains the compile time selection `id`.
     * person.id
     * ```
     */
    ref(reference) {
      return new DynamicReferenceBuilder(reference);
    }
  }
  class DefaultConnectionProvider {
    constructor(driver) {
      __privateAdd(this, _driver, void 0);
      __privateSet(this, _driver, driver);
    }
    async provideConnection(consumer) {
      const connection = await __privateGet(this, _driver).acquireConnection();
      try {
        return await consumer(connection);
      } finally {
        await __privateGet(this, _driver).releaseConnection(connection);
      }
    }
  }
  _driver = new WeakMap();
  const _DefaultQueryExecutor = class extends QueryExecutorBase {
    constructor(compiler, adapter, connectionProvider, plugins = []) {
      super(plugins);
      __privateAdd(this, _compiler, void 0);
      __privateAdd(this, _adapter, void 0);
      __privateAdd(this, _connectionProvider, void 0);
      __privateSet(this, _compiler, compiler);
      __privateSet(this, _adapter, adapter);
      __privateSet(this, _connectionProvider, connectionProvider);
    }
    get adapter() {
      return __privateGet(this, _adapter);
    }
    compileQuery(node) {
      return __privateGet(this, _compiler).compileQuery(node);
    }
    provideConnection(consumer) {
      return __privateGet(this, _connectionProvider).provideConnection(consumer);
    }
    withPlugins(plugins) {
      return new _DefaultQueryExecutor(__privateGet(this, _compiler), __privateGet(this, _adapter), __privateGet(this, _connectionProvider), [...this.plugins, ...plugins]);
    }
    withPlugin(plugin) {
      return new _DefaultQueryExecutor(__privateGet(this, _compiler), __privateGet(this, _adapter), __privateGet(this, _connectionProvider), [...this.plugins, plugin]);
    }
    withPluginAtFront(plugin) {
      return new _DefaultQueryExecutor(__privateGet(this, _compiler), __privateGet(this, _adapter), __privateGet(this, _connectionProvider), [plugin, ...this.plugins]);
    }
    withConnectionProvider(connectionProvider) {
      return new _DefaultQueryExecutor(__privateGet(this, _compiler), __privateGet(this, _adapter), connectionProvider, [...this.plugins]);
    }
    withoutPlugins() {
      return new _DefaultQueryExecutor(__privateGet(this, _compiler), __privateGet(this, _adapter), __privateGet(this, _connectionProvider), []);
    }
  };
  let DefaultQueryExecutor = _DefaultQueryExecutor;
  _compiler = new WeakMap();
  _adapter = new WeakMap();
  _connectionProvider = new WeakMap();
  function performanceNow() {
    if (typeof performance !== "undefined" && isFunction(performance.now)) {
      return performance.now();
    } else {
      return Date.now();
    }
  }
  class RuntimeDriver {
    constructor(driver, log) {
      __privateAdd(this, _needsLogging);
      // This method monkey patches the database connection's executeQuery method
      // by adding logging code around it. Monkey patching is not pretty, but it's
      // the best option in this case.
      __privateAdd(this, _addLogging);
      __privateAdd(this, _logError);
      __privateAdd(this, _logQuery);
      __privateAdd(this, _calculateDurationMillis);
      __privateAdd(this, _driver2, void 0);
      __privateAdd(this, _log, void 0);
      __privateAdd(this, _initPromise, void 0);
      __privateAdd(this, _destroyPromise, void 0);
      __privateAdd(this, _connections, /* @__PURE__ */ new WeakSet());
      __privateSet(this, _driver2, driver);
      __privateSet(this, _log, log);
    }
    async init() {
      if (!__privateGet(this, _initPromise)) {
        __privateSet(this, _initPromise, __privateGet(this, _driver2).init().catch((err) => {
          __privateSet(this, _initPromise, void 0);
          return Promise.reject(err);
        }));
      }
      await __privateGet(this, _initPromise);
    }
    async acquireConnection() {
      await this.init();
      const connection = await __privateGet(this, _driver2).acquireConnection();
      if (!__privateGet(this, _connections).has(connection)) {
        if (__privateMethod(this, _needsLogging, needsLogging_fn).call(this)) {
          __privateMethod(this, _addLogging, addLogging_fn).call(this, connection);
        }
        __privateGet(this, _connections).add(connection);
      }
      return connection;
    }
    async releaseConnection(connection) {
      await __privateGet(this, _driver2).releaseConnection(connection);
    }
    beginTransaction(connection, settings) {
      return __privateGet(this, _driver2).beginTransaction(connection, settings);
    }
    commitTransaction(connection) {
      return __privateGet(this, _driver2).commitTransaction(connection);
    }
    rollbackTransaction(connection) {
      return __privateGet(this, _driver2).rollbackTransaction(connection);
    }
    async destroy() {
      if (!__privateGet(this, _initPromise)) {
        return;
      }
      await __privateGet(this, _initPromise);
      if (!__privateGet(this, _destroyPromise)) {
        __privateSet(this, _destroyPromise, __privateGet(this, _driver2).destroy().catch((err) => {
          __privateSet(this, _destroyPromise, void 0);
          return Promise.reject(err);
        }));
      }
      await __privateGet(this, _destroyPromise);
    }
  }
  _driver2 = new WeakMap();
  _log = new WeakMap();
  _initPromise = new WeakMap();
  _destroyPromise = new WeakMap();
  _connections = new WeakMap();
  _needsLogging = new WeakSet();
  needsLogging_fn = function() {
    return __privateGet(this, _log).isLevelEnabled("query") || __privateGet(this, _log).isLevelEnabled("error");
  };
  _addLogging = new WeakSet();
  addLogging_fn = function(connection) {
    const executeQuery = connection.executeQuery;
    connection.executeQuery = async (compiledQuery) => {
      const startTime = performanceNow();
      try {
        return await executeQuery.call(connection, compiledQuery);
      } catch (error) {
        await __privateMethod(this, _logError, logError_fn).call(this, error, compiledQuery, startTime);
        throw error;
      } finally {
        await __privateMethod(this, _logQuery, logQuery_fn).call(this, compiledQuery, startTime);
      }
    };
  };
  _logError = new WeakSet();
  logError_fn = async function(error, compiledQuery, startTime) {
    await __privateGet(this, _log).error(() => ({
      level: "error",
      error,
      query: compiledQuery,
      queryDurationMillis: __privateMethod(this, _calculateDurationMillis, calculateDurationMillis_fn).call(this, startTime)
    }));
  };
  _logQuery = new WeakSet();
  logQuery_fn = async function(compiledQuery, startTime) {
    await __privateGet(this, _log).query(() => ({
      level: "query",
      query: compiledQuery,
      queryDurationMillis: __privateMethod(this, _calculateDurationMillis, calculateDurationMillis_fn).call(this, startTime)
    }));
  };
  _calculateDurationMillis = new WeakSet();
  calculateDurationMillis_fn = function(startTime) {
    return performanceNow() - startTime;
  };
  class SingleConnectionProvider {
    constructor(connection) {
      // Run the runner in an async function to make sure it doesn't
      // throw synchronous errors.
      __privateAdd(this, _run);
      __privateAdd(this, _connection, void 0);
      __privateAdd(this, _runningPromise, void 0);
      __privateSet(this, _connection, connection);
    }
    async provideConnection(consumer) {
      while (__privateGet(this, _runningPromise)) {
        await __privateGet(this, _runningPromise);
      }
      const promise = __privateMethod(this, _run, run_fn).call(this, consumer);
      __privateSet(this, _runningPromise, promise.then(() => {
        __privateSet(this, _runningPromise, void 0);
      }).catch(() => {
        __privateSet(this, _runningPromise, void 0);
      }));
      return promise;
    }
  }
  _connection = new WeakMap();
  _runningPromise = new WeakMap();
  _run = new WeakSet();
  run_fn = async function(runner) {
    return await runner(__privateGet(this, _connection));
  };
  const TRANSACTION_ISOLATION_LEVELS = [
    "read uncommitted",
    "read committed",
    "repeatable read",
    "serializable"
  ];
  freeze(["query", "error"]);
  class Log {
    constructor(config) {
      __privateAdd(this, _levels, void 0);
      __privateAdd(this, _logger, void 0);
      if (isFunction(config)) {
        __privateSet(this, _logger, config);
        __privateSet(this, _levels, freeze({
          query: true,
          error: true
        }));
      } else {
        __privateSet(this, _logger, defaultLogger);
        __privateSet(this, _levels, freeze({
          query: config.includes("query"),
          error: config.includes("error")
        }));
      }
    }
    isLevelEnabled(level) {
      return __privateGet(this, _levels)[level];
    }
    async query(getEvent) {
      if (__privateGet(this, _levels).query) {
        await __privateGet(this, _logger).call(this, getEvent());
      }
    }
    async error(getEvent) {
      if (__privateGet(this, _levels).error) {
        await __privateGet(this, _logger).call(this, getEvent());
      }
    }
  }
  _levels = new WeakMap();
  _logger = new WeakMap();
  function defaultLogger(event) {
    if (event.level === "query") {
      console.log(`kysely:query: ${event.query.sql}`);
      console.log(`kysely:query: duration: ${event.queryDurationMillis.toFixed(1)}ms`);
    } else if (event.level === "error") {
      if (event.error instanceof Error) {
        console.error(`kysely:error: ${event.error.stack ?? event.error.message}`);
      } else {
        console.error(`kysely:error: ${event}`);
      }
    }
  }
  function isCompilable(value) {
    return isObject(value) && isFunction(value.compile);
  }
  const _Kysely = class extends QueryCreator {
    constructor(args) {
      let superProps;
      let props;
      if (isKyselyProps(args)) {
        superProps = { executor: args.executor };
        props = { ...args };
      } else {
        const dialect2 = args.dialect;
        const driver = dialect2.createDriver();
        const compiler = dialect2.createQueryCompiler();
        const adapter = dialect2.createAdapter();
        const log = new Log(args.log ?? []);
        const runtimeDriver = new RuntimeDriver(driver, log);
        const connectionProvider = new DefaultConnectionProvider(runtimeDriver);
        const executor = new DefaultQueryExecutor(compiler, adapter, connectionProvider, args.plugins ?? []);
        superProps = { executor };
        props = {
          config: args,
          executor,
          dialect: dialect2,
          driver: runtimeDriver
        };
      }
      super(superProps);
      __privateAdd(this, _props31, void 0);
      __privateSet(this, _props31, freeze(props));
    }
    /**
     * Returns the {@link SchemaModule} module for building database schema.
     */
    get schema() {
      return new SchemaModule(__privateGet(this, _props31).executor);
    }
    /**
     * Returns a the {@link DynamicModule} module.
     *
     * The {@link DynamicModule} module can be used to bypass strict typing and
     * passing in dynamic values for the queries.
     */
    get dynamic() {
      return new DynamicModule();
    }
    /**
     * Returns a {@link DatabaseIntrospector | database introspector}.
     */
    get introspection() {
      return __privateGet(this, _props31).dialect.createIntrospector(this.withoutPlugins());
    }
    case(value) {
      return new CaseBuilder({
        node: CaseNode.create(isUndefined(value) ? void 0 : parseExpression(value))
      });
    }
    /**
     * Returns a {@link FunctionModule} that can be used to write type safe function
     * calls.
     *
     * ```ts
     * const { count } = db.fn
     *
     * await db.selectFrom('person')
     *   .innerJoin('pet', 'pet.owner_id', 'person.id')
     *   .select([
     *     'person.id',
     *     count('pet.id').as('pet_count')
     *   ])
     *   .groupBy('person.id')
     *   .having(count('pet.id'), '>', 10)
     *   .execute()
     * ```
     *
     * The generated SQL (PostgreSQL):
     *
     * ```sql
     * select "person"."id", count("pet"."id") as "pet_count"
     * from "person"
     * inner join "pet" on "pet"."owner_id" = "person"."id"
     * group by "person"."id"
     * having count("pet"."id") > $1
     * ```
     */
    get fn() {
      return createFunctionModule();
    }
    /**
     * Creates a {@link TransactionBuilder} that can be used to run queries inside a transaction.
     *
     * The returned {@link TransactionBuilder} can be used to configure the transaction. The
     * {@link TransactionBuilder.execute} method can then be called to run the transaction.
     * {@link TransactionBuilder.execute} takes a function that is run inside the
     * transaction. If the function throws, the transaction is rolled back. Otherwise
     * the transaction is committed.
     *
     * The callback function passed to the {@link TransactionBuilder.execute | execute}
     * method gets the transaction object as its only argument. The transaction is
     * of type {@link Transaction} which inherits {@link Kysely}. Any query
     * started through the transaction object is executed inside the transaction.
     *
     * ### Examples
     *
     * ```ts
     * const catto = await db.transaction().execute(async (trx) => {
     *   const jennifer = await trx.insertInto('person')
     *     .values({
     *       first_name: 'Jennifer',
     *       last_name: 'Aniston',
     *     })
     *     .returning('id')
     *     .executeTakeFirstOrThrow()
     *
     *   await someFunction(trx, jennifer)
     *
     *   return await trx.insertInto('pet')
     *     .values({
     *       user_id: jennifer.id,
     *       name: 'Catto',
     *       species: 'cat'
     *     })
     *     .returningAll()
     *     .executeTakeFirst()
     * })
     * ```
     *
     * Setting the isolation level:
     *
     * ```ts
     * await db
     *   .transaction()
     *   .setIsolationLevel('serializable')
     *   .execute(async (trx) => {
     *     await doStuff(trx)
     *   })
     * ```
     */
    transaction() {
      return new TransactionBuilder({ ...__privateGet(this, _props31) });
    }
    /**
     * Provides a kysely instance bound to a single database connection.
     *
     * ### Examples
     *
     * ```ts
     * await db
     *   .connection()
     *   .execute(async (db) => {
     *     // `db` is an instance of `Kysely` that's bound to a single
     *     // database connection. All queries executed through `db` use
     *     // the same connection.
     *     await doStuff(db)
     *   })
     * ```
     */
    connection() {
      return new ConnectionBuilder({ ...__privateGet(this, _props31) });
    }
    /**
     * Returns a copy of this Kysely instance with the given plugin installed.
     */
    withPlugin(plugin) {
      return new _Kysely({
        ...__privateGet(this, _props31),
        executor: __privateGet(this, _props31).executor.withPlugin(plugin)
      });
    }
    /**
     * Returns a copy of this Kysely instance without any plugins.
     */
    withoutPlugins() {
      return new _Kysely({
        ...__privateGet(this, _props31),
        executor: __privateGet(this, _props31).executor.withoutPlugins()
      });
    }
    /**
     * @override
     */
    withSchema(schema) {
      return new _Kysely({
        ...__privateGet(this, _props31),
        executor: __privateGet(this, _props31).executor.withPluginAtFront(new WithSchemaPlugin(schema))
      });
    }
    /**
     * Returns a copy of this Kysely instance with tables added to its
     * database type.
     *
     * This method only modifies the types and doesn't affect any of the
     * executed queries in any way.
     *
     * ### Examples
     *
     * The following example adds and uses a temporary table:
     *
     * @example
     * ```ts
     * await db.schema
     *   .createTable('temp_table')
     *   .temporary()
     *   .addColumn('some_column', 'integer')
     *   .execute()
     *
     * const tempDb = db.withTables<{
     *   temp_table: {
     *     some_column: number
     *   }
     * }>()
     *
     * await tempDb
     *   .insertInto('temp_table')
     *   .values({ some_column: 100 })
     *   .execute()
     * ```
     */
    withTables() {
      return new _Kysely({ ...__privateGet(this, _props31) });
    }
    /**
     * Releases all resources and disconnects from the database.
     *
     * You need to call this when you are done using the `Kysely` instance.
     */
    async destroy() {
      await __privateGet(this, _props31).driver.destroy();
    }
    /**
     * Returns true if this `Kysely` instance is a transaction.
     *
     * You can also use `db instanceof Transaction`.
     */
    get isTransaction() {
      return false;
    }
    /**
     * @internal
     * @private
     */
    getExecutor() {
      return __privateGet(this, _props31).executor;
    }
    /**
     * Executes a given compiled query or query builder.
     *
     * See {@link https://github.com/koskimas/kysely/blob/master/site/docs/recipes/splitting-build-compile-and-execute-code.md#execute-compiled-queries splitting build, compile and execute code recipe} for more information.
     */
    executeQuery(query, queryId = createQueryId()) {
      const compiledQuery = isCompilable(query) ? query.compile() : query;
      return this.getExecutor().executeQuery(compiledQuery, queryId);
    }
  };
  let Kysely = _Kysely;
  _props31 = new WeakMap();
  const _Transaction = class extends Kysely {
    constructor(props) {
      super(props);
      __privateAdd(this, _props32, void 0);
      __privateSet(this, _props32, props);
    }
    // The return type is `true` instead of `boolean` to make Kysely<DB>
    // unassignable to Transaction<DB> while allowing assignment the
    // other way around.
    get isTransaction() {
      return true;
    }
    transaction() {
      throw new Error("calling the transaction method for a Transaction is not supported");
    }
    connection() {
      throw new Error("calling the connection method for a Transaction is not supported");
    }
    async destroy() {
      throw new Error("calling the destroy method for a Transaction is not supported");
    }
    withPlugin(plugin) {
      return new _Transaction({
        ...__privateGet(this, _props32),
        executor: __privateGet(this, _props32).executor.withPlugin(plugin)
      });
    }
    withoutPlugins() {
      return new _Transaction({
        ...__privateGet(this, _props32),
        executor: __privateGet(this, _props32).executor.withoutPlugins()
      });
    }
    /**
     * @override
     */
    withSchema(schema) {
      return new _Transaction({
        ...__privateGet(this, _props32),
        executor: __privateGet(this, _props32).executor.withPluginAtFront(new WithSchemaPlugin(schema))
      });
    }
    withTables() {
      return new _Transaction({ ...__privateGet(this, _props32) });
    }
  };
  let Transaction = _Transaction;
  _props32 = new WeakMap();
  function isKyselyProps(obj) {
    return isObject(obj) && isObject(obj.config) && isObject(obj.driver) && isObject(obj.executor) && isObject(obj.dialect);
  }
  class ConnectionBuilder {
    constructor(props) {
      __privateAdd(this, _props33, void 0);
      __privateSet(this, _props33, freeze(props));
    }
    async execute(callback) {
      return __privateGet(this, _props33).executor.provideConnection(async (connection) => {
        const executor = __privateGet(this, _props33).executor.withConnectionProvider(new SingleConnectionProvider(connection));
        const db = new Kysely({
          ...__privateGet(this, _props33),
          executor
        });
        return await callback(db);
      });
    }
  }
  _props33 = new WeakMap();
  preventAwait(ConnectionBuilder, "don't await ConnectionBuilder instances directly. To execute the query you need to call the `execute` method");
  const _TransactionBuilder = class {
    constructor(props) {
      __privateAdd(this, _props34, void 0);
      __privateSet(this, _props34, freeze(props));
    }
    setIsolationLevel(isolationLevel) {
      return new _TransactionBuilder({
        ...__privateGet(this, _props34),
        isolationLevel
      });
    }
    async execute(callback) {
      const { isolationLevel, ...kyselyProps } = __privateGet(this, _props34);
      const settings = { isolationLevel };
      validateTransactionSettings(settings);
      return __privateGet(this, _props34).executor.provideConnection(async (connection) => {
        const executor = __privateGet(this, _props34).executor.withConnectionProvider(new SingleConnectionProvider(connection));
        const transaction = new Transaction({
          ...kyselyProps,
          executor
        });
        try {
          await __privateGet(this, _props34).driver.beginTransaction(connection, settings);
          const result = await callback(transaction);
          await __privateGet(this, _props34).driver.commitTransaction(connection);
          return result;
        } catch (error) {
          await __privateGet(this, _props34).driver.rollbackTransaction(connection);
          throw error;
        }
      });
    }
  };
  let TransactionBuilder = _TransactionBuilder;
  _props34 = new WeakMap();
  preventAwait(TransactionBuilder, "don't await TransactionBuilder instances directly. To execute the transaction you need to call the `execute` method");
  function validateTransactionSettings(settings) {
    if (settings.isolationLevel && !TRANSACTION_ISOLATION_LEVELS.includes(settings.isolationLevel)) {
      throw new Error(`invalid transaction isolation level ${settings.isolationLevel}`);
    }
  }
  const _RawBuilder = class {
    constructor(props) {
      __privateAdd(this, _getExecutor);
      __privateAdd(this, _toOperationNode);
      __privateAdd(this, _compile);
      __privateAdd(this, _props35, void 0);
      __privateSet(this, _props35, freeze(props));
    }
    /** @private */
    get expressionType() {
      return void 0;
    }
    as(alias) {
      return new AliasedRawBuilder(this, alias);
    }
    /**
     * Change the output type of the raw expression.
     *
     * This method call doesn't change the SQL in any way. This methods simply
     * returns a copy of this `RawBuilder` with a new output type.
     */
    $castTo() {
      return new _RawBuilder({ ...__privateGet(this, _props35) });
    }
    /**
     * @deprecated Use `$castTo` instead.
     */
    castTo() {
      return this.$castTo();
    }
    /**
     * Adds a plugin for this SQL snippet.
     */
    withPlugin(plugin) {
      return new _RawBuilder({
        ...__privateGet(this, _props35),
        plugins: __privateGet(this, _props35).plugins !== void 0 ? freeze([...__privateGet(this, _props35).plugins, plugin]) : freeze([plugin])
      });
    }
    toOperationNode() {
      return __privateMethod(this, _toOperationNode, toOperationNode_fn).call(this, __privateMethod(this, _getExecutor, getExecutor_fn).call(this));
    }
    compile(executorProvider) {
      return __privateMethod(this, _compile, compile_fn).call(this, __privateMethod(this, _getExecutor, getExecutor_fn).call(this, executorProvider));
    }
    async execute(executorProvider) {
      const executor = __privateMethod(this, _getExecutor, getExecutor_fn).call(this, executorProvider);
      return executor.executeQuery(__privateMethod(this, _compile, compile_fn).call(this, executor), __privateGet(this, _props35).queryId);
    }
  };
  let RawBuilder = _RawBuilder;
  _props35 = new WeakMap();
  _getExecutor = new WeakSet();
  getExecutor_fn = function(executorProvider) {
    const executor = executorProvider !== void 0 ? executorProvider.getExecutor() : NOOP_QUERY_EXECUTOR;
    return __privateGet(this, _props35).plugins !== void 0 ? executor.withPlugins(__privateGet(this, _props35).plugins) : executor;
  };
  _toOperationNode = new WeakSet();
  toOperationNode_fn = function(executor) {
    return executor.transformQuery(__privateGet(this, _props35).rawNode, __privateGet(this, _props35).queryId);
  };
  _compile = new WeakSet();
  compile_fn = function(executor) {
    return executor.compileQuery(__privateMethod(this, _toOperationNode, toOperationNode_fn).call(this, executor), __privateGet(this, _props35).queryId);
  };
  preventAwait(RawBuilder, "don't await RawBuilder instances directly. To execute the query you need to call `execute`");
  class AliasedRawBuilder {
    constructor(rawBuilder, alias) {
      __privateAdd(this, _rawBuilder, void 0);
      __privateAdd(this, _alias4, void 0);
      __privateSet(this, _rawBuilder, rawBuilder);
      __privateSet(this, _alias4, alias);
    }
    /** @private */
    get expression() {
      return __privateGet(this, _rawBuilder);
    }
    /** @private */
    get alias() {
      return __privateGet(this, _alias4);
    }
    toOperationNode() {
      return AliasNode.create(__privateGet(this, _rawBuilder).toOperationNode(), isOperationNodeSource(__privateGet(this, _alias4)) ? __privateGet(this, _alias4).toOperationNode() : IdentifierNode.create(__privateGet(this, _alias4)));
    }
  }
  _rawBuilder = new WeakMap();
  _alias4 = new WeakMap();
  const sql = Object.assign((sqlFragments, ...parameters) => {
    return new RawBuilder({
      queryId: createQueryId(),
      rawNode: RawNode.create(sqlFragments, (parameters == null ? void 0 : parameters.map(parseValueExpression)) ?? [])
    });
  }, {
    ref(columnReference) {
      return new RawBuilder({
        queryId: createQueryId(),
        rawNode: RawNode.createWithChild(parseStringReference(columnReference))
      });
    },
    val(value) {
      return new RawBuilder({
        queryId: createQueryId(),
        rawNode: RawNode.createWithChild(parseValueExpression(value))
      });
    },
    value(value) {
      return this.val(value);
    },
    table(tableReference) {
      return new RawBuilder({
        queryId: createQueryId(),
        rawNode: RawNode.createWithChild(parseTable(tableReference))
      });
    },
    id(...ids) {
      const fragments = new Array(ids.length + 1).fill(".");
      fragments[0] = "";
      fragments[fragments.length - 1] = "";
      return new RawBuilder({
        queryId: createQueryId(),
        rawNode: RawNode.create(fragments, ids.map(IdentifierNode.create))
      });
    },
    lit(value) {
      return new RawBuilder({
        queryId: createQueryId(),
        rawNode: RawNode.createWithChild(ValueNode.createImmediate(value))
      });
    },
    literal(value) {
      return this.lit(value);
    },
    raw(sql2) {
      return new RawBuilder({
        queryId: createQueryId(),
        rawNode: RawNode.createWithSql(sql2)
      });
    },
    join(array, separator = sql`, `) {
      const nodes = new Array(2 * array.length - 1);
      const sep = separator.toOperationNode();
      for (let i = 0; i < array.length; ++i) {
        nodes[2 * i] = parseValueExpression(array[i]);
        if (i !== array.length - 1) {
          nodes[2 * i + 1] = sep;
        }
      }
      return new RawBuilder({
        queryId: createQueryId(),
        rawNode: RawNode.createWithChildren(nodes)
      });
    }
  });
  class OperationNodeVisitor {
    constructor() {
      __publicField(this, "nodeStack", []);
      __privateAdd(this, _visitors, freeze({
        AliasNode: this.visitAlias.bind(this),
        ColumnNode: this.visitColumn.bind(this),
        IdentifierNode: this.visitIdentifier.bind(this),
        SchemableIdentifierNode: this.visitSchemableIdentifier.bind(this),
        RawNode: this.visitRaw.bind(this),
        ReferenceNode: this.visitReference.bind(this),
        SelectQueryNode: this.visitSelectQuery.bind(this),
        SelectionNode: this.visitSelection.bind(this),
        TableNode: this.visitTable.bind(this),
        FromNode: this.visitFrom.bind(this),
        SelectAllNode: this.visitSelectAll.bind(this),
        AndNode: this.visitAnd.bind(this),
        OrNode: this.visitOr.bind(this),
        ValueNode: this.visitValue.bind(this),
        ValueListNode: this.visitValueList.bind(this),
        PrimitiveValueListNode: this.visitPrimitiveValueList.bind(this),
        ParensNode: this.visitParens.bind(this),
        JoinNode: this.visitJoin.bind(this),
        OperatorNode: this.visitOperator.bind(this),
        WhereNode: this.visitWhere.bind(this),
        InsertQueryNode: this.visitInsertQuery.bind(this),
        DeleteQueryNode: this.visitDeleteQuery.bind(this),
        ReturningNode: this.visitReturning.bind(this),
        CreateTableNode: this.visitCreateTable.bind(this),
        AddColumnNode: this.visitAddColumn.bind(this),
        ColumnDefinitionNode: this.visitColumnDefinition.bind(this),
        DropTableNode: this.visitDropTable.bind(this),
        DataTypeNode: this.visitDataType.bind(this),
        OrderByNode: this.visitOrderBy.bind(this),
        OrderByItemNode: this.visitOrderByItem.bind(this),
        GroupByNode: this.visitGroupBy.bind(this),
        GroupByItemNode: this.visitGroupByItem.bind(this),
        UpdateQueryNode: this.visitUpdateQuery.bind(this),
        ColumnUpdateNode: this.visitColumnUpdate.bind(this),
        LimitNode: this.visitLimit.bind(this),
        OffsetNode: this.visitOffset.bind(this),
        OnConflictNode: this.visitOnConflict.bind(this),
        OnDuplicateKeyNode: this.visitOnDuplicateKey.bind(this),
        CreateIndexNode: this.visitCreateIndex.bind(this),
        DropIndexNode: this.visitDropIndex.bind(this),
        ListNode: this.visitList.bind(this),
        PrimaryKeyConstraintNode: this.visitPrimaryKeyConstraint.bind(this),
        UniqueConstraintNode: this.visitUniqueConstraint.bind(this),
        ReferencesNode: this.visitReferences.bind(this),
        CheckConstraintNode: this.visitCheckConstraint.bind(this),
        WithNode: this.visitWith.bind(this),
        CommonTableExpressionNode: this.visitCommonTableExpression.bind(this),
        CommonTableExpressionNameNode: this.visitCommonTableExpressionName.bind(this),
        HavingNode: this.visitHaving.bind(this),
        CreateSchemaNode: this.visitCreateSchema.bind(this),
        DropSchemaNode: this.visitDropSchema.bind(this),
        AlterTableNode: this.visitAlterTable.bind(this),
        DropColumnNode: this.visitDropColumn.bind(this),
        RenameColumnNode: this.visitRenameColumn.bind(this),
        AlterColumnNode: this.visitAlterColumn.bind(this),
        ModifyColumnNode: this.visitModifyColumn.bind(this),
        AddConstraintNode: this.visitAddConstraint.bind(this),
        DropConstraintNode: this.visitDropConstraint.bind(this),
        ForeignKeyConstraintNode: this.visitForeignKeyConstraint.bind(this),
        CreateViewNode: this.visitCreateView.bind(this),
        DropViewNode: this.visitDropView.bind(this),
        GeneratedNode: this.visitGenerated.bind(this),
        DefaultValueNode: this.visitDefaultValue.bind(this),
        OnNode: this.visitOn.bind(this),
        ValuesNode: this.visitValues.bind(this),
        SelectModifierNode: this.visitSelectModifier.bind(this),
        CreateTypeNode: this.visitCreateType.bind(this),
        DropTypeNode: this.visitDropType.bind(this),
        ExplainNode: this.visitExplain.bind(this),
        DefaultInsertValueNode: this.visitDefaultInsertValue.bind(this),
        AggregateFunctionNode: this.visitAggregateFunction.bind(this),
        OverNode: this.visitOver.bind(this),
        PartitionByNode: this.visitPartitionBy.bind(this),
        PartitionByItemNode: this.visitPartitionByItem.bind(this),
        SetOperationNode: this.visitSetOperation.bind(this),
        BinaryOperationNode: this.visitBinaryOperation.bind(this),
        UnaryOperationNode: this.visitUnaryOperation.bind(this),
        UsingNode: this.visitUsing.bind(this),
        FunctionNode: this.visitFunction.bind(this),
        CaseNode: this.visitCase.bind(this),
        WhenNode: this.visitWhen.bind(this)
      }));
      __publicField(this, "visitNode", (node) => {
        this.nodeStack.push(node);
        __privateGet(this, _visitors)[node.kind](node);
        this.nodeStack.pop();
      });
    }
    get parentNode() {
      return this.nodeStack[this.nodeStack.length - 2];
    }
  }
  _visitors = new WeakMap();
  class DefaultQueryCompiler extends OperationNodeVisitor {
    constructor() {
      super(...arguments);
      __privateAdd(this, _sql, "");
      __privateAdd(this, _parameters, []);
    }
    get numParameters() {
      return __privateGet(this, _parameters).length;
    }
    compileQuery(node) {
      __privateSet(this, _sql, "");
      __privateSet(this, _parameters, []);
      this.visitNode(node);
      return freeze({
        query: node,
        sql: this.getSql(),
        parameters: [...__privateGet(this, _parameters)]
      });
    }
    getSql() {
      return __privateGet(this, _sql);
    }
    visitSelectQuery(node) {
      const wrapInParens = this.parentNode !== void 0 && !InsertQueryNode.is(this.parentNode) && !CreateViewNode.is(this.parentNode) && !SetOperationNode.is(this.parentNode);
      if (this.parentNode === void 0 && node.explain) {
        this.visitNode(node.explain);
        this.append(" ");
      }
      if (wrapInParens) {
        this.append("(");
      }
      if (node.with) {
        this.visitNode(node.with);
        this.append(" ");
      }
      this.append("select ");
      if (node.distinctOn) {
        this.compileDistinctOn(node.distinctOn);
        this.append(" ");
      }
      if (node.frontModifiers && node.frontModifiers.length > 0) {
        this.compileList(node.frontModifiers, " ");
        this.append(" ");
      }
      if (node.selections) {
        this.compileList(node.selections);
        this.append(" ");
      }
      this.visitNode(node.from);
      if (node.joins) {
        this.append(" ");
        this.compileList(node.joins, " ");
      }
      if (node.where) {
        this.append(" ");
        this.visitNode(node.where);
      }
      if (node.groupBy) {
        this.append(" ");
        this.visitNode(node.groupBy);
      }
      if (node.having) {
        this.append(" ");
        this.visitNode(node.having);
      }
      if (node.setOperations) {
        this.append(" ");
        this.compileList(node.setOperations, " ");
      }
      if (node.orderBy) {
        this.append(" ");
        this.visitNode(node.orderBy);
      }
      if (node.limit) {
        this.append(" ");
        this.visitNode(node.limit);
      }
      if (node.offset) {
        this.append(" ");
        this.visitNode(node.offset);
      }
      if (node.endModifiers && node.endModifiers.length > 0) {
        this.append(" ");
        this.compileList(node.endModifiers, " ");
      }
      if (wrapInParens) {
        this.append(")");
      }
    }
    visitFrom(node) {
      this.append("from ");
      this.compileList(node.froms);
    }
    visitSelection(node) {
      this.visitNode(node.selection);
    }
    visitColumn(node) {
      this.visitNode(node.column);
    }
    compileDistinctOn(expressions) {
      this.append("distinct on (");
      this.compileList(expressions);
      this.append(")");
    }
    compileList(nodes, separator = ", ") {
      const lastIndex = nodes.length - 1;
      for (let i = 0; i <= lastIndex; i++) {
        this.visitNode(nodes[i]);
        if (i < lastIndex) {
          this.append(separator);
        }
      }
    }
    visitWhere(node) {
      this.append("where ");
      this.visitNode(node.where);
    }
    visitHaving(node) {
      this.append("having ");
      this.visitNode(node.having);
    }
    visitInsertQuery(node) {
      const isSubQuery = this.nodeStack.find(QueryNode.is) !== node;
      if (!isSubQuery && node.explain) {
        this.visitNode(node.explain);
        this.append(" ");
      }
      if (isSubQuery) {
        this.append("(");
      }
      if (node.with) {
        this.visitNode(node.with);
        this.append(" ");
      }
      this.append(node.replace ? "replace" : "insert");
      if (node.ignore) {
        this.append(" ignore");
      }
      this.append(" into ");
      this.visitNode(node.into);
      if (node.columns) {
        this.append(" (");
        this.compileList(node.columns);
        this.append(")");
      }
      if (node.values) {
        this.append(" ");
        this.visitNode(node.values);
      }
      if (node.onConflict) {
        this.append(" ");
        this.visitNode(node.onConflict);
      }
      if (node.onDuplicateKey) {
        this.append(" ");
        this.visitNode(node.onDuplicateKey);
      }
      if (node.returning) {
        this.append(" ");
        this.visitNode(node.returning);
      }
      if (isSubQuery) {
        this.append(")");
      }
    }
    visitValues(node) {
      this.append("values ");
      this.compileList(node.values);
    }
    visitDeleteQuery(node) {
      const isSubQuery = this.nodeStack.find(QueryNode.is) !== node;
      if (!isSubQuery && node.explain) {
        this.visitNode(node.explain);
        this.append(" ");
      }
      if (isSubQuery) {
        this.append("(");
      }
      if (node.with) {
        this.visitNode(node.with);
        this.append(" ");
      }
      this.append("delete ");
      this.visitNode(node.from);
      if (node.using) {
        this.append(" ");
        this.visitNode(node.using);
      }
      if (node.joins) {
        this.append(" ");
        this.compileList(node.joins, " ");
      }
      if (node.where) {
        this.append(" ");
        this.visitNode(node.where);
      }
      if (node.orderBy) {
        this.append(" ");
        this.visitNode(node.orderBy);
      }
      if (node.limit) {
        this.append(" ");
        this.visitNode(node.limit);
      }
      if (node.returning) {
        this.append(" ");
        this.visitNode(node.returning);
      }
      if (isSubQuery) {
        this.append(")");
      }
    }
    visitReturning(node) {
      this.append("returning ");
      this.compileList(node.selections);
    }
    visitAlias(node) {
      this.visitNode(node.node);
      this.append(" as ");
      this.visitNode(node.alias);
    }
    visitReference(node) {
      this.visitNode(node.table);
      this.append(".");
      this.visitNode(node.column);
    }
    visitSelectAll(_) {
      this.append("*");
    }
    visitIdentifier(node) {
      this.append(this.getLeftIdentifierWrapper());
      this.compileUnwrappedIdentifier(node);
      this.append(this.getRightIdentifierWrapper());
    }
    compileUnwrappedIdentifier(node) {
      if (!isString$1(node.name)) {
        throw new Error("a non-string identifier was passed to compileUnwrappedIdentifier.");
      }
      this.append(this.sanitizeIdentifier(node.name));
    }
    visitAnd(node) {
      this.visitNode(node.left);
      this.append(" and ");
      this.visitNode(node.right);
    }
    visitOr(node) {
      this.visitNode(node.left);
      this.append(" or ");
      this.visitNode(node.right);
    }
    visitValue(node) {
      if (node.immediate) {
        this.appendImmediateValue(node.value);
      } else {
        this.appendValue(node.value);
      }
    }
    visitValueList(node) {
      this.append("(");
      this.compileList(node.values);
      this.append(")");
    }
    visitPrimitiveValueList(node) {
      this.append("(");
      const { values } = node;
      for (let i = 0; i < values.length; ++i) {
        this.appendValue(values[i]);
        if (i !== values.length - 1) {
          this.append(", ");
        }
      }
      this.append(")");
    }
    visitParens(node) {
      this.append("(");
      this.visitNode(node.node);
      this.append(")");
    }
    visitJoin(node) {
      this.append(JOIN_TYPE_SQL[node.joinType]);
      this.append(" ");
      this.visitNode(node.table);
      if (node.on) {
        this.append(" ");
        this.visitNode(node.on);
      }
    }
    visitOn(node) {
      this.append("on ");
      this.visitNode(node.on);
    }
    visitRaw(node) {
      const { sqlFragments, parameters: params } = node;
      for (let i = 0; i < sqlFragments.length; ++i) {
        this.append(sqlFragments[i]);
        if (params.length > i) {
          this.visitNode(params[i]);
        }
      }
    }
    visitOperator(node) {
      this.append(node.operator);
    }
    visitTable(node) {
      this.visitNode(node.table);
    }
    visitSchemableIdentifier(node) {
      if (node.schema) {
        this.visitNode(node.schema);
        this.append(".");
      }
      this.visitNode(node.identifier);
    }
    visitCreateTable(node) {
      this.append("create ");
      if (node.frontModifiers && node.frontModifiers.length > 0) {
        this.compileList(node.frontModifiers, " ");
        this.append(" ");
      }
      if (node.temporary) {
        this.append("temporary ");
      }
      this.append("table ");
      if (node.ifNotExists) {
        this.append("if not exists ");
      }
      this.visitNode(node.table);
      this.append(" (");
      this.compileList([...node.columns, ...node.constraints ?? []]);
      this.append(")");
      if (node.onCommit) {
        this.append(" on commit ");
        this.append(node.onCommit);
      }
      if (node.endModifiers && node.endModifiers.length > 0) {
        this.append(" ");
        this.compileList(node.endModifiers, " ");
      }
    }
    visitColumnDefinition(node) {
      this.visitNode(node.column);
      this.append(" ");
      this.visitNode(node.dataType);
      if (node.unsigned) {
        this.append(" unsigned");
      }
      if (node.frontModifiers && node.frontModifiers.length > 0) {
        this.append(" ");
        this.compileList(node.frontModifiers, " ");
      }
      if (node.generated) {
        this.append(" ");
        this.visitNode(node.generated);
      }
      if (node.defaultTo) {
        this.append(" ");
        this.visitNode(node.defaultTo);
      }
      if (node.notNull) {
        this.append(" not null");
      }
      if (node.unique) {
        this.append(" unique");
      }
      if (node.primaryKey) {
        this.append(" primary key");
      }
      if (node.autoIncrement) {
        this.append(" ");
        this.append(this.getAutoIncrement());
      }
      if (node.references) {
        this.append(" ");
        this.visitNode(node.references);
      }
      if (node.check) {
        this.append(" ");
        this.visitNode(node.check);
      }
      if (node.endModifiers && node.endModifiers.length > 0) {
        this.append(" ");
        this.compileList(node.endModifiers, " ");
      }
    }
    getAutoIncrement() {
      return "auto_increment";
    }
    visitReferences(node) {
      this.append("references ");
      this.visitNode(node.table);
      this.append(" (");
      this.compileList(node.columns);
      this.append(")");
      if (node.onDelete) {
        this.append(" on delete ");
        this.append(node.onDelete);
      }
      if (node.onUpdate) {
        this.append(" on update ");
        this.append(node.onUpdate);
      }
    }
    visitDropTable(node) {
      this.append("drop table ");
      if (node.ifExists) {
        this.append("if exists ");
      }
      this.visitNode(node.table);
      if (node.cascade) {
        this.append(" cascade");
      }
    }
    visitDataType(node) {
      this.append(node.dataType);
    }
    visitOrderBy(node) {
      this.append("order by ");
      this.compileList(node.items);
    }
    visitOrderByItem(node) {
      this.visitNode(node.orderBy);
      if (node.direction) {
        this.append(" ");
        this.visitNode(node.direction);
      }
    }
    visitGroupBy(node) {
      this.append("group by ");
      this.compileList(node.items);
    }
    visitGroupByItem(node) {
      this.visitNode(node.groupBy);
    }
    visitUpdateQuery(node) {
      const isSubQuery = this.nodeStack.find(QueryNode.is) !== node;
      if (!isSubQuery && node.explain) {
        this.visitNode(node.explain);
        this.append(" ");
      }
      if (isSubQuery) {
        this.append("(");
      }
      if (node.with) {
        this.visitNode(node.with);
        this.append(" ");
      }
      this.append("update ");
      this.visitNode(node.table);
      this.append(" set ");
      if (node.updates) {
        this.compileList(node.updates);
      }
      if (node.from) {
        this.append(" ");
        this.visitNode(node.from);
      }
      if (node.joins) {
        this.append(" ");
        this.compileList(node.joins, " ");
      }
      if (node.where) {
        this.append(" ");
        this.visitNode(node.where);
      }
      if (node.returning) {
        this.append(" ");
        this.visitNode(node.returning);
      }
      if (isSubQuery) {
        this.append(")");
      }
    }
    visitColumnUpdate(node) {
      this.visitNode(node.column);
      this.append(" = ");
      this.visitNode(node.value);
    }
    visitLimit(node) {
      this.append("limit ");
      this.visitNode(node.limit);
    }
    visitOffset(node) {
      this.append("offset ");
      this.visitNode(node.offset);
    }
    visitOnConflict(node) {
      this.append("on conflict");
      if (node.columns) {
        this.append(" (");
        this.compileList(node.columns);
        this.append(")");
      } else if (node.constraint) {
        this.append(" on constraint ");
        this.visitNode(node.constraint);
      } else if (node.indexExpression) {
        this.append(" (");
        this.visitNode(node.indexExpression);
        this.append(")");
      }
      if (node.indexWhere) {
        this.append(" ");
        this.visitNode(node.indexWhere);
      }
      if (node.doNothing === true) {
        this.append(" do nothing");
      } else if (node.updates) {
        this.append(" do update set ");
        this.compileList(node.updates);
        if (node.updateWhere) {
          this.append(" ");
          this.visitNode(node.updateWhere);
        }
      }
    }
    visitOnDuplicateKey(node) {
      this.append("on duplicate key update ");
      this.compileList(node.updates);
    }
    visitCreateIndex(node) {
      this.append("create ");
      if (node.unique) {
        this.append("unique ");
      }
      this.append("index ");
      if (node.ifNotExists) {
        this.append("if not exists ");
      }
      this.visitNode(node.name);
      if (node.table) {
        this.append(" on ");
        this.visitNode(node.table);
      }
      if (node.using) {
        this.append(" using ");
        this.visitNode(node.using);
      }
      if (node.columns) {
        this.append(" (");
        this.compileList(node.columns);
        this.append(")");
      }
      if (node.where) {
        this.append(" ");
        this.visitNode(node.where);
      }
    }
    visitDropIndex(node) {
      this.append("drop index ");
      if (node.ifExists) {
        this.append("if exists ");
      }
      this.visitNode(node.name);
      if (node.table) {
        this.append(" on ");
        this.visitNode(node.table);
      }
      if (node.cascade) {
        this.append(" cascade");
      }
    }
    visitCreateSchema(node) {
      this.append("create schema ");
      if (node.ifNotExists) {
        this.append("if not exists ");
      }
      this.visitNode(node.schema);
    }
    visitDropSchema(node) {
      this.append("drop schema ");
      if (node.ifExists) {
        this.append("if exists ");
      }
      this.visitNode(node.schema);
      if (node.cascade) {
        this.append(" cascade");
      }
    }
    visitPrimaryKeyConstraint(node) {
      if (node.name) {
        this.append("constraint ");
        this.visitNode(node.name);
        this.append(" ");
      }
      this.append("primary key (");
      this.compileList(node.columns);
      this.append(")");
    }
    visitUniqueConstraint(node) {
      if (node.name) {
        this.append("constraint ");
        this.visitNode(node.name);
        this.append(" ");
      }
      this.append("unique (");
      this.compileList(node.columns);
      this.append(")");
    }
    visitCheckConstraint(node) {
      if (node.name) {
        this.append("constraint ");
        this.visitNode(node.name);
        this.append(" ");
      }
      this.append("check (");
      this.visitNode(node.expression);
      this.append(")");
    }
    visitForeignKeyConstraint(node) {
      if (node.name) {
        this.append("constraint ");
        this.visitNode(node.name);
        this.append(" ");
      }
      this.append("foreign key (");
      this.compileList(node.columns);
      this.append(") ");
      this.visitNode(node.references);
      if (node.onDelete) {
        this.append(" on delete ");
        this.append(node.onDelete);
      }
      if (node.onUpdate) {
        this.append(" on update ");
        this.append(node.onUpdate);
      }
    }
    visitList(node) {
      this.compileList(node.items);
    }
    visitWith(node) {
      this.append("with ");
      if (node.recursive) {
        this.append("recursive ");
      }
      this.compileList(node.expressions);
    }
    visitCommonTableExpression(node) {
      this.visitNode(node.name);
      this.append(" as ");
      this.visitNode(node.expression);
    }
    visitCommonTableExpressionName(node) {
      this.visitNode(node.table);
      if (node.columns) {
        this.append("(");
        this.compileList(node.columns);
        this.append(")");
      }
    }
    visitAlterTable(node) {
      this.append("alter table ");
      this.visitNode(node.table);
      this.append(" ");
      if (node.renameTo) {
        this.append("rename to ");
        this.visitNode(node.renameTo);
      }
      if (node.setSchema) {
        this.append("set schema ");
        this.visitNode(node.setSchema);
      }
      if (node.addConstraint) {
        this.visitNode(node.addConstraint);
      }
      if (node.dropConstraint) {
        this.visitNode(node.dropConstraint);
      }
      if (node.columnAlterations) {
        this.compileList(node.columnAlterations);
      }
    }
    visitAddColumn(node) {
      this.append("add column ");
      this.visitNode(node.column);
    }
    visitRenameColumn(node) {
      this.append("rename column ");
      this.visitNode(node.column);
      this.append(" to ");
      this.visitNode(node.renameTo);
    }
    visitDropColumn(node) {
      this.append("drop column ");
      this.visitNode(node.column);
    }
    visitAlterColumn(node) {
      this.append("alter column ");
      this.visitNode(node.column);
      this.append(" ");
      if (node.dataType) {
        this.append("type ");
        this.visitNode(node.dataType);
        if (node.dataTypeExpression) {
          this.append("using ");
          this.visitNode(node.dataTypeExpression);
        }
      }
      if (node.setDefault) {
        this.append("set default ");
        this.visitNode(node.setDefault);
      }
      if (node.dropDefault) {
        this.append("drop default");
      }
      if (node.setNotNull) {
        this.append("set not null");
      }
      if (node.dropNotNull) {
        this.append("drop not null");
      }
    }
    visitModifyColumn(node) {
      this.append("modify column ");
      this.visitNode(node.column);
    }
    visitAddConstraint(node) {
      this.append("add ");
      this.visitNode(node.constraint);
    }
    visitDropConstraint(node) {
      this.append("drop constraint ");
      if (node.ifExists) {
        this.append("if exists ");
      }
      this.visitNode(node.constraintName);
      if (node.modifier === "cascade") {
        this.append(" cascade");
      } else if (node.modifier === "restrict") {
        this.append(" restrict");
      }
    }
    visitSetOperation(node) {
      this.append(node.operator);
      this.append(" ");
      if (node.all) {
        this.append("all ");
      }
      this.visitNode(node.expression);
    }
    visitCreateView(node) {
      this.append("create ");
      if (node.orReplace) {
        this.append("or replace ");
      }
      if (node.materialized) {
        this.append("materialized ");
      }
      if (node.temporary) {
        this.append("temporary ");
      }
      this.append("view ");
      if (node.ifNotExists) {
        this.append("if not exists ");
      }
      this.visitNode(node.name);
      this.append(" ");
      if (node.columns) {
        this.append("(");
        this.compileList(node.columns);
        this.append(") ");
      }
      if (node.as) {
        this.append("as ");
        this.visitNode(node.as);
      }
    }
    visitDropView(node) {
      this.append("drop ");
      if (node.materialized) {
        this.append("materialized ");
      }
      this.append("view ");
      if (node.ifExists) {
        this.append("if exists ");
      }
      this.visitNode(node.name);
      if (node.cascade) {
        this.append(" cascade");
      }
    }
    visitGenerated(node) {
      this.append("generated ");
      if (node.always) {
        this.append("always ");
      }
      if (node.byDefault) {
        this.append("by default ");
      }
      this.append("as ");
      if (node.identity) {
        this.append("identity");
      }
      if (node.expression) {
        this.append("(");
        this.visitNode(node.expression);
        this.append(")");
      }
      if (node.stored) {
        this.append(" stored");
      }
    }
    visitDefaultValue(node) {
      this.append("default ");
      this.visitNode(node.defaultValue);
    }
    visitSelectModifier(node) {
      if (node.rawModifier) {
        this.visitNode(node.rawModifier);
      } else {
        this.append(SELECT_MODIFIER_SQL[node.modifier]);
      }
    }
    visitCreateType(node) {
      this.append("create type ");
      this.visitNode(node.name);
      if (node.enum) {
        this.append(" as enum ");
        this.visitNode(node.enum);
      }
    }
    visitDropType(node) {
      this.append("drop type ");
      if (node.ifExists) {
        this.append("if exists ");
      }
      this.visitNode(node.name);
    }
    visitExplain(node) {
      this.append("explain");
      if (node.options || node.format) {
        this.append(" ");
        this.append(this.getLeftExplainOptionsWrapper());
        if (node.options) {
          this.visitNode(node.options);
          if (node.format) {
            this.append(this.getExplainOptionsDelimiter());
          }
        }
        if (node.format) {
          this.append("format");
          this.append(this.getExplainOptionAssignment());
          this.append(node.format);
        }
        this.append(this.getRightExplainOptionsWrapper());
      }
    }
    visitDefaultInsertValue(_) {
      this.append("default");
    }
    visitAggregateFunction(node) {
      this.append(node.func);
      this.append("(");
      if (node.distinct) {
        this.append("distinct ");
      }
      this.compileList(node.aggregated);
      this.append(")");
      if (node.filter) {
        this.append(" filter(");
        this.visitNode(node.filter);
        this.append(")");
      }
      if (node.over) {
        this.append(" ");
        this.visitNode(node.over);
      }
    }
    visitOver(node) {
      this.append("over(");
      if (node.partitionBy) {
        this.visitNode(node.partitionBy);
        if (node.orderBy) {
          this.append(" ");
        }
      }
      if (node.orderBy) {
        this.visitNode(node.orderBy);
      }
      this.append(")");
    }
    visitPartitionBy(node) {
      this.append("partition by ");
      this.compileList(node.items);
    }
    visitPartitionByItem(node) {
      this.visitNode(node.partitionBy);
    }
    visitBinaryOperation(node) {
      this.visitNode(node.leftOperand);
      this.append(" ");
      this.visitNode(node.operator);
      this.append(" ");
      this.visitNode(node.rightOperand);
    }
    visitUnaryOperation(node) {
      this.visitNode(node.operator);
      if (!this.isMinusOperator(node.operator)) {
        this.append(" ");
      }
      this.visitNode(node.operand);
    }
    isMinusOperator(node) {
      return OperatorNode.is(node) && node.operator === "-";
    }
    visitUsing(node) {
      this.append("using ");
      this.compileList(node.tables);
    }
    visitFunction(node) {
      this.append(node.func);
      this.append("(");
      this.compileList(node.arguments);
      this.append(")");
    }
    visitCase(node) {
      this.append("case");
      if (node.value) {
        this.append(" ");
        this.visitNode(node.value);
      }
      if (node.when) {
        this.append(" ");
        this.compileList(node.when, " ");
      }
      if (node.else) {
        this.append(" else ");
        this.visitNode(node.else);
      }
      this.append(" end");
      if (node.isStatement) {
        this.append(" case");
      }
    }
    visitWhen(node) {
      this.append("when ");
      this.visitNode(node.condition);
      if (node.result) {
        this.append(" then ");
        this.visitNode(node.result);
      }
    }
    append(str) {
      __privateSet(this, _sql, __privateGet(this, _sql) + str);
    }
    appendValue(parameter) {
      this.addParameter(parameter);
      this.append(this.getCurrentParameterPlaceholder());
    }
    getLeftIdentifierWrapper() {
      return '"';
    }
    getRightIdentifierWrapper() {
      return '"';
    }
    getCurrentParameterPlaceholder() {
      return "$" + this.numParameters;
    }
    getLeftExplainOptionsWrapper() {
      return "(";
    }
    getExplainOptionAssignment() {
      return " ";
    }
    getExplainOptionsDelimiter() {
      return ", ";
    }
    getRightExplainOptionsWrapper() {
      return ")";
    }
    sanitizeIdentifier(identifier) {
      const leftWrap = this.getLeftIdentifierWrapper();
      const rightWrap = this.getRightIdentifierWrapper();
      let sanitized = "";
      for (const c of identifier) {
        sanitized += c;
        if (c === leftWrap) {
          sanitized += leftWrap;
        } else if (c === rightWrap) {
          sanitized += rightWrap;
        }
      }
      return sanitized;
    }
    addParameter(parameter) {
      __privateGet(this, _parameters).push(parameter);
    }
    appendImmediateValue(value) {
      if (isString$1(value)) {
        this.append(`'${value}'`);
      } else if (isNumber(value) || isBoolean$1(value)) {
        this.append(value.toString());
      } else if (isNull(value)) {
        this.append("null");
      } else if (isDate(value)) {
        this.appendImmediateValue(value.toISOString());
      } else if (isBigInt(value)) {
        this.appendImmediateValue(value.toString());
      } else {
        throw new Error(`invalid immediate value ${value}`);
      }
    }
  }
  _sql = new WeakMap();
  _parameters = new WeakMap();
  const SELECT_MODIFIER_SQL = freeze({
    ForKeyShare: "for key share",
    ForNoKeyUpdate: "for no key update",
    ForUpdate: "for update",
    ForShare: "for share",
    NoWait: "nowait",
    SkipLocked: "skip locked",
    Distinct: "distinct"
  });
  const JOIN_TYPE_SQL = freeze({
    InnerJoin: "inner join",
    LeftJoin: "left join",
    RightJoin: "right join",
    FullJoin: "full join",
    LateralInnerJoin: "inner join lateral",
    LateralLeftJoin: "left join lateral"
  });
  const CompiledQuery = freeze({
    raw(sql2) {
      return freeze({
        sql: sql2,
        query: RawNode.createWithSql(sql2),
        parameters: freeze([])
      });
    }
  });
  const ID_WRAP_REGEX = /"/g;
  class SqliteQueryCompiler extends DefaultQueryCompiler {
    getCurrentParameterPlaceholder() {
      return "?";
    }
    getLeftExplainOptionsWrapper() {
      return "";
    }
    getRightExplainOptionsWrapper() {
      return "";
    }
    getLeftIdentifierWrapper() {
      return '"';
    }
    getRightIdentifierWrapper() {
      return '"';
    }
    getAutoIncrement() {
      return "autoincrement";
    }
    sanitizeIdentifier(identifier) {
      return identifier.replace(ID_WRAP_REGEX, '""');
    }
    visitDefaultInsertValue(_) {
      this.append("null");
    }
  }
  const DEFAULT_MIGRATION_TABLE = "kysely_migration";
  const DEFAULT_MIGRATION_LOCK_TABLE = "kysely_migration_lock";
  freeze({ __noMigrations__: true });
  class SqliteIntrospector {
    constructor(db) {
      __privateAdd(this, _getTableMetadata);
      __privateAdd(this, _db, void 0);
      __privateSet(this, _db, db);
    }
    async getSchemas() {
      return [];
    }
    async getTables(options = { withInternalKyselyTables: false }) {
      let query = __privateGet(this, _db).selectFrom("sqlite_schema").where("type", "in", ["table", "view"]).where("name", "not like", "sqlite_%").select("name").orderBy("name").$castTo();
      if (!options.withInternalKyselyTables) {
        query = query.where("name", "!=", DEFAULT_MIGRATION_TABLE).where("name", "!=", DEFAULT_MIGRATION_LOCK_TABLE);
      }
      const tables = await query.execute();
      return Promise.all(tables.map(({ name }) => __privateMethod(this, _getTableMetadata, getTableMetadata_fn).call(this, name)));
    }
    async getMetadata(options) {
      return {
        tables: await this.getTables(options)
      };
    }
  }
  _db = new WeakMap();
  _getTableMetadata = new WeakSet();
  getTableMetadata_fn = async function(table) {
    var _a2, _b2, _c2, _d2, _e2, _f2;
    const db = __privateGet(this, _db);
    const tableDefinition = await db.selectFrom("sqlite_master").where("name", "=", table).select(["sql", "type"]).$castTo().executeTakeFirstOrThrow();
    const autoIncrementCol = (_f2 = (_e2 = (_d2 = (_c2 = (_b2 = (_a2 = tableDefinition.sql) == null ? void 0 : _a2.split(/[\(\),]/)) == null ? void 0 : _b2.find((it) => it.toLowerCase().includes("autoincrement"))) == null ? void 0 : _c2.trimStart()) == null ? void 0 : _d2.split(/\s+/)) == null ? void 0 : _e2[0]) == null ? void 0 : _f2.replace(/["`]/g, "");
    const columns = await db.selectFrom(sql`pragma_table_info(${table})`.as("table_info")).select(["name", "type", "notnull", "dflt_value"]).orderBy("cid").execute();
    return {
      name: table,
      isView: tableDefinition.type === "view",
      columns: columns.map((col) => ({
        name: col.name,
        dataType: col.type,
        isNullable: !col.notnull,
        isAutoIncrementing: col.name === autoIncrementCol,
        hasDefaultValue: col.dflt_value != null
      }))
    };
  };
  class SqliteAdapter {
    get supportsTransactionalDdl() {
      return false;
    }
    get supportsReturning() {
      return true;
    }
    async acquireMigrationLock() {
    }
    async releaseMigrationLock() {
    }
  }
  var BaseDialect = class {
    createQueryCompiler() {
      return new SqliteQueryCompiler();
    }
    createAdapter() {
      return new SqliteAdapter();
    }
    createIntrospector(db) {
      return new SqliteIntrospector(db);
    }
  };
  var BaseDriver = (_a = class {
    constructor() {
      __privateAdd(this, _connectionMutex, new ConnectionMutex());
      __publicField(this, "connection");
      __privateAdd(this, _db2, void 0);
    }
    async acquireConnection() {
      await __privateGet(this, _connectionMutex).lock();
      return this.connection;
    }
    async beginTransaction(connection) {
      await connection.executeQuery(CompiledQuery.raw("begin"));
    }
    async commitTransaction(connection) {
      await connection.executeQuery(CompiledQuery.raw("commit"));
    }
    async rollbackTransaction(connection) {
      await connection.executeQuery(CompiledQuery.raw("rollback"));
    }
    async releaseConnection() {
      __privateGet(this, _connectionMutex).unlock();
    }
    async destroy() {
      var _a2;
      (_a2 = __privateGet(this, _db2)) == null ? void 0 : _a2.close();
    }
  }, _connectionMutex = new WeakMap(), _db2 = new WeakMap(), _a);
  var ConnectionMutex = (_b = class {
    constructor() {
      __privateAdd(this, _promise2, void 0);
      __privateAdd(this, _resolve2, void 0);
    }
    async lock() {
      while (__privateGet(this, _promise2)) {
        await __privateGet(this, _promise2);
      }
      __privateSet(this, _promise2, new Promise((resolve) => {
        __privateSet(this, _resolve2, resolve);
      }));
    }
    unlock() {
      const resolve = __privateGet(this, _resolve2);
      __privateSet(this, _promise2, void 0);
      __privateSet(this, _resolve2, void 0);
      resolve == null ? void 0 : resolve();
    }
  }, _promise2 = new WeakMap(), _resolve2 = new WeakMap(), _b);
  var BaseSqliteConnection = class {
    streamQuery() {
      throw new Error("Sqlite driver doesn't support streaming");
    }
    async executeQuery(compiledQuery) {
      const { parameters, sql: sql2, query } = compiledQuery;
      return Promise.resolve(
        query.kind === "SelectQueryNode" || query.kind === "RawNode" ? {
          rows: await this.query(sql2, parameters)
        } : {
          rows: [],
          ...await this.exec(sql2, parameters)
        }
      );
    }
  };
  function throttle({ func, delay, maxCalls }) {
    let timer;
    let callCount = 0;
    let lastArgs = null;
    function reset() {
      timer && clearTimeout(timer);
      callCount = 0;
      lastArgs = null;
    }
    function callFunc() {
      if (callCount >= maxCalls) {
        func(lastArgs);
        reset();
      } else {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
          func(lastArgs);
          reset();
          timer = void 0;
        }, delay);
      }
    }
    return (s) => {
      callCount++;
      lastArgs = s;
      if (timer === void 0 && callCount === 0) {
        func(s);
        callCount++;
      } else {
        callFunc();
      }
    };
  }
  var SqlJsDriver = (_c = class extends BaseDriver {
    constructor(config) {
      super();
      __privateAdd(this, _config, void 0);
      __privateAdd(this, _db3, void 0);
      __privateSet(this, _config, config);
    }
    async init() {
      var _a2, _b2, _c2, _d2;
      __privateSet(this, _db3, typeof __privateGet(this, _config).database === "function" ? await __privateGet(this, _config).database() : __privateGet(this, _config).database);
      if (!__privateGet(this, _db3)) {
        throw new Error("no database");
      }
      this.connection = new SqlJsConnection(
        __privateGet(this, _db3),
        (_a2 = __privateGet(this, _config).onWrite) == null ? void 0 : _a2.func,
        (_b2 = __privateGet(this, _config).onWrite) == null ? void 0 : _b2.isThrottle,
        (_c2 = __privateGet(this, _config).onWrite) == null ? void 0 : _c2.maxCalls,
        (_d2 = __privateGet(this, _config).onWrite) == null ? void 0 : _d2.delay
      );
      if (__privateGet(this, _config).onCreateConnection) {
        await __privateGet(this, _config).onCreateConnection(this.connection);
      }
    }
    async beginTransaction(connection) {
      await connection.executeQuery(CompiledQuery.raw("begin"));
      this.connection && this.connection.transactionNum++;
    }
    async commitTransaction(connection) {
      await connection.executeQuery(CompiledQuery.raw("commit"));
      this.connection && this.connection.transactionNum--;
    }
    async rollbackTransaction(connection) {
      await connection.executeQuery(CompiledQuery.raw("rollback"));
      this.connection && this.connection.transactionNum--;
    }
  }, _config = new WeakMap(), _db3 = new WeakMap(), _c);
  var SqlJsConnection = (_d = class extends BaseSqliteConnection {
    constructor(db, func, isThrottle = false, maxCalls = 1e3, delay = 2e3) {
      super();
      __privateAdd(this, _db4, void 0);
      __privateAdd(this, _onWrite, void 0);
      __publicField(this, "transactionNum", 0);
      __privateSet(this, _db4, db);
      __privateSet(this, _onWrite, func ? isThrottle ? throttle({ func, maxCalls, delay }) : func : void 0);
    }
    query(sql2, parameters) {
      const stmt = __privateGet(this, _db4).prepare(sql2);
      stmt.bind(parameters);
      const rows = [];
      while (stmt.step()) {
        rows.push(stmt.getAsObject());
      }
      stmt.free();
      return rows;
    }
    exec(sql2, param) {
      __privateGet(this, _db4).run(sql2, param);
      const insertId = BigInt(this.query("SELECT last_insert_rowid() as id")[0].id);
      const numAffectedRows = BigInt(__privateGet(this, _db4).getRowsModified());
      this.transactionNum === 0 && __privateGet(this, _onWrite) && __privateGet(this, _onWrite).call(this, __privateGet(this, _db4).export());
      return {
        numAffectedRows,
        insertId
      };
    }
  }, _db4 = new WeakMap(), _onWrite = new WeakMap(), _d);
  var SqlJsDialect = (_e = class extends BaseDialect {
    /**
     * currently no support for bigint
     */
    constructor(config) {
      super();
      __privateAdd(this, _config2, void 0);
      __privateSet(this, _config2, config);
    }
    createDriver() {
      return new SqlJsDriver(__privateGet(this, _config2));
    }
  }, _config2 = new WeakMap(), _e);
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  function getAugmentedNamespace(n) {
    if (n.__esModule)
      return n;
    var f = n.default;
    if (typeof f == "function") {
      var a = function a2() {
        if (this instanceof a2) {
          var args = [null];
          args.push.apply(args, arguments);
          var Ctor = Function.bind.apply(f, args);
          return new Ctor();
        }
        return f.apply(this, arguments);
      };
      a.prototype = f.prototype;
    } else
      a = {};
    Object.defineProperty(a, "__esModule", { value: true });
    Object.keys(n).forEach(function(k) {
      var d = Object.getOwnPropertyDescriptor(n, k);
      Object.defineProperty(a, k, d.get ? d : {
        enumerable: true,
        get: function() {
          return n[k];
        }
      });
    });
    return a;
  }
  var sqlWasm = { exports: {} };
  var __viteBrowserExternal = {};
  var __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    default: __viteBrowserExternal
  });
  var require$$2 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
  (function(module, exports) {
    var initSqlJsPromise = void 0;
    var initSqlJs = function(moduleConfig) {
      if (initSqlJsPromise) {
        return initSqlJsPromise;
      }
      initSqlJsPromise = new Promise(function(resolveModule, reject) {
        var Module = typeof moduleConfig !== "undefined" ? moduleConfig : {};
        var originalOnAbortFunction = Module["onAbort"];
        Module["onAbort"] = function(errorThatCausedAbort) {
          reject(new Error(errorThatCausedAbort));
          if (originalOnAbortFunction) {
            originalOnAbortFunction(errorThatCausedAbort);
          }
        };
        Module["postRun"] = Module["postRun"] || [];
        Module["postRun"].push(function() {
          resolveModule(Module);
        });
        module = void 0;
        var e;
        e || (e = typeof Module !== "undefined" ? Module : {});
        e.onRuntimeInitialized = function() {
          function a(g, m) {
            switch (typeof m) {
              case "boolean":
                gc(g, m ? 1 : 0);
                break;
              case "number":
                hc(g, m);
                break;
              case "string":
                ic(g, m, -1, -1);
                break;
              case "object":
                if (null === m)
                  kb(g);
                else if (null != m.length) {
                  var n = aa(m);
                  jc(g, n, m.length, -1);
                  ba(n);
                } else
                  xa(g, "Wrong API use : tried to return a value of an unknown type (" + m + ").", -1);
                break;
              default:
                kb(g);
            }
          }
          function b(g, m) {
            for (var n = [], p = 0; p < g; p += 1) {
              var v = l(m + 4 * p, "i32"), y = kc(v);
              if (1 === y || 2 === y)
                v = lc(v);
              else if (3 === y)
                v = mc(v);
              else if (4 === y) {
                y = v;
                v = nc(y);
                y = oc(y);
                for (var L = new Uint8Array(v), G = 0; G < v; G += 1)
                  L[G] = r[y + G];
                v = L;
              } else
                v = null;
              n.push(v);
            }
            return n;
          }
          function c(g, m) {
            this.La = g;
            this.db = m;
            this.Ja = 1;
            this.fb = [];
          }
          function d(g, m) {
            this.db = m;
            m = ca(g) + 1;
            this.Ya = da(m);
            if (null === this.Ya)
              throw Error("Unable to allocate memory for the SQL string");
            t(g, u, this.Ya, m);
            this.eb = this.Ya;
            this.Ua = this.ib = null;
          }
          function f(g) {
            this.filename = "dbfile_" + (4294967295 * Math.random() >>> 0);
            if (null != g) {
              var m = this.filename, n = "/", p = m;
              n && (n = "string" == typeof n ? n : ea(n), p = m ? z(n + "/" + m) : n);
              m = fa(
                true,
                true
              );
              p = ha(p, (void 0 !== m ? m : 438) & 4095 | 32768, 0);
              if (g) {
                if ("string" == typeof g) {
                  n = Array(g.length);
                  for (var v = 0, y = g.length; v < y; ++v)
                    n[v] = g.charCodeAt(v);
                  g = n;
                }
                ia(p, m | 146);
                n = ja(p, 577);
                ka(n, g, 0, g.length, 0);
                la(n);
                ia(p, m);
              }
            }
            this.handleError(q(this.filename, h));
            this.db = l(h, "i32");
            pc(this.db);
            this.Za = {};
            this.Na = {};
          }
          var h = B(4), k = e.cwrap, q = k("sqlite3_open", "number", ["string", "number"]), x = k("sqlite3_close_v2", "number", ["number"]), w = k("sqlite3_exec", "number", ["number", "string", "number", "number", "number"]), A = k(
            "sqlite3_changes",
            "number",
            ["number"]
          ), S = k("sqlite3_prepare_v2", "number", ["number", "string", "number", "number", "number"]), nb = k("sqlite3_sql", "string", ["number"]), qc = k("sqlite3_normalized_sql", "string", ["number"]), ob = k("sqlite3_prepare_v2", "number", ["number", "number", "number", "number", "number"]), rc = k("sqlite3_bind_text", "number", ["number", "number", "number", "number", "number"]), pb = k("sqlite3_bind_blob", "number", ["number", "number", "number", "number", "number"]), sc = k("sqlite3_bind_double", "number", ["number", "number", "number"]), tc = k("sqlite3_bind_int", "number", ["number", "number", "number"]), uc = k("sqlite3_bind_parameter_index", "number", ["number", "string"]), vc = k("sqlite3_step", "number", ["number"]), wc = k("sqlite3_errmsg", "string", ["number"]), xc = k("sqlite3_column_count", "number", ["number"]), yc = k("sqlite3_data_count", "number", ["number"]), zc = k("sqlite3_column_double", "number", ["number", "number"]), qb = k("sqlite3_column_text", "string", ["number", "number"]), Ac = k("sqlite3_column_blob", "number", ["number", "number"]), Bc = k(
            "sqlite3_column_bytes",
            "number",
            ["number", "number"]
          ), Cc = k("sqlite3_column_type", "number", ["number", "number"]), Dc = k("sqlite3_column_name", "string", ["number", "number"]), Ec = k("sqlite3_reset", "number", ["number"]), Fc = k("sqlite3_clear_bindings", "number", ["number"]), Gc = k("sqlite3_finalize", "number", ["number"]), rb = k("sqlite3_create_function_v2", "number", "number string number number number number number number number".split(" ")), kc = k("sqlite3_value_type", "number", ["number"]), nc = k("sqlite3_value_bytes", "number", ["number"]), mc = k(
            "sqlite3_value_text",
            "string",
            ["number"]
          ), oc = k("sqlite3_value_blob", "number", ["number"]), lc = k("sqlite3_value_double", "number", ["number"]), hc = k("sqlite3_result_double", "", ["number", "number"]), kb = k("sqlite3_result_null", "", ["number"]), ic = k("sqlite3_result_text", "", ["number", "string", "number", "number"]), jc = k("sqlite3_result_blob", "", ["number", "number", "number", "number"]), gc = k("sqlite3_result_int", "", ["number", "number"]), xa = k("sqlite3_result_error", "", ["number", "string", "number"]), sb = k(
            "sqlite3_aggregate_context",
            "number",
            ["number", "number"]
          ), pc = k("RegisterExtensionFunctions", "number", ["number"]);
          c.prototype.bind = function(g) {
            if (!this.La)
              throw "Statement closed";
            this.reset();
            return Array.isArray(g) ? this.xb(g) : null != g && "object" === typeof g ? this.yb(g) : true;
          };
          c.prototype.step = function() {
            if (!this.La)
              throw "Statement closed";
            this.Ja = 1;
            var g = vc(this.La);
            switch (g) {
              case 100:
                return true;
              case 101:
                return false;
              default:
                throw this.db.handleError(g);
            }
          };
          c.prototype.sb = function(g) {
            null == g && (g = this.Ja, this.Ja += 1);
            return zc(this.La, g);
          };
          c.prototype.Cb = function(g) {
            null == g && (g = this.Ja, this.Ja += 1);
            g = qb(this.La, g);
            if ("function" !== typeof BigInt)
              throw Error("BigInt is not supported");
            return BigInt(g);
          };
          c.prototype.Db = function(g) {
            null == g && (g = this.Ja, this.Ja += 1);
            return qb(this.La, g);
          };
          c.prototype.getBlob = function(g) {
            null == g && (g = this.Ja, this.Ja += 1);
            var m = Bc(this.La, g);
            g = Ac(this.La, g);
            for (var n = new Uint8Array(m), p = 0; p < m; p += 1)
              n[p] = r[g + p];
            return n;
          };
          c.prototype.get = function(g, m) {
            m = m || {};
            null != g && this.bind(g) && this.step();
            g = [];
            for (var n = yc(this.La), p = 0; p < n; p += 1)
              switch (Cc(this.La, p)) {
                case 1:
                  var v = m.useBigInt ? this.Cb(p) : this.sb(p);
                  g.push(v);
                  break;
                case 2:
                  g.push(this.sb(p));
                  break;
                case 3:
                  g.push(this.Db(p));
                  break;
                case 4:
                  g.push(this.getBlob(p));
                  break;
                default:
                  g.push(null);
              }
            return g;
          };
          c.prototype.getColumnNames = function() {
            for (var g = [], m = xc(this.La), n = 0; n < m; n += 1)
              g.push(Dc(this.La, n));
            return g;
          };
          c.prototype.getAsObject = function(g, m) {
            g = this.get(g, m);
            m = this.getColumnNames();
            for (var n = {}, p = 0; p < m.length; p += 1)
              n[m[p]] = g[p];
            return n;
          };
          c.prototype.getSQL = function() {
            return nb(this.La);
          };
          c.prototype.getNormalizedSQL = function() {
            return qc(this.La);
          };
          c.prototype.run = function(g) {
            null != g && this.bind(g);
            this.step();
            return this.reset();
          };
          c.prototype.nb = function(g, m) {
            null == m && (m = this.Ja, this.Ja += 1);
            g = ma(g);
            var n = aa(g);
            this.fb.push(n);
            this.db.handleError(rc(this.La, m, n, g.length - 1, 0));
          };
          c.prototype.wb = function(g, m) {
            null == m && (m = this.Ja, this.Ja += 1);
            var n = aa(g);
            this.fb.push(n);
            this.db.handleError(pb(this.La, m, n, g.length, 0));
          };
          c.prototype.mb = function(g, m) {
            null == m && (m = this.Ja, this.Ja += 1);
            this.db.handleError((g === (g | 0) ? tc : sc)(this.La, m, g));
          };
          c.prototype.zb = function(g) {
            null == g && (g = this.Ja, this.Ja += 1);
            pb(this.La, g, 0, 0, 0);
          };
          c.prototype.ob = function(g, m) {
            null == m && (m = this.Ja, this.Ja += 1);
            switch (typeof g) {
              case "string":
                this.nb(g, m);
                return;
              case "number":
                this.mb(g, m);
                return;
              case "bigint":
                this.nb(g.toString(), m);
                return;
              case "boolean":
                this.mb(g + 0, m);
                return;
              case "object":
                if (null === g) {
                  this.zb(m);
                  return;
                }
                if (null != g.length) {
                  this.wb(g, m);
                  return;
                }
            }
            throw "Wrong API use : tried to bind a value of an unknown type (" + g + ").";
          };
          c.prototype.yb = function(g) {
            var m = this;
            Object.keys(g).forEach(function(n) {
              var p = uc(m.La, n);
              0 !== p && m.ob(g[n], p);
            });
            return true;
          };
          c.prototype.xb = function(g) {
            for (var m = 0; m < g.length; m += 1)
              this.ob(g[m], m + 1);
            return true;
          };
          c.prototype.reset = function() {
            this.freemem();
            return 0 === Fc(this.La) && 0 === Ec(this.La);
          };
          c.prototype.freemem = function() {
            for (var g; void 0 !== (g = this.fb.pop()); )
              ba(g);
          };
          c.prototype.free = function() {
            this.freemem();
            var g = 0 === Gc(this.La);
            delete this.db.Za[this.La];
            this.La = 0;
            return g;
          };
          d.prototype.next = function() {
            if (null === this.Ya)
              return { done: true };
            null !== this.Ua && (this.Ua.free(), this.Ua = null);
            if (!this.db.db)
              throw this.gb(), Error("Database closed");
            var g = oa(), m = B(4);
            pa(h);
            pa(m);
            try {
              this.db.handleError(ob(this.db.db, this.eb, -1, h, m));
              this.eb = l(m, "i32");
              var n = l(h, "i32");
              if (0 === n)
                return this.gb(), { done: true };
              this.Ua = new c(n, this.db);
              this.db.Za[n] = this.Ua;
              return { value: this.Ua, done: false };
            } catch (p) {
              throw this.ib = C(this.eb), this.gb(), p;
            } finally {
              qa(g);
            }
          };
          d.prototype.gb = function() {
            ba(this.Ya);
            this.Ya = null;
          };
          d.prototype.getRemainingSQL = function() {
            return null !== this.ib ? this.ib : C(this.eb);
          };
          "function" === typeof Symbol && "symbol" === typeof Symbol.iterator && (d.prototype[Symbol.iterator] = function() {
            return this;
          });
          f.prototype.run = function(g, m) {
            if (!this.db)
              throw "Database closed";
            if (m) {
              g = this.prepare(g, m);
              try {
                g.step();
              } finally {
                g.free();
              }
            } else
              this.handleError(w(this.db, g, 0, 0, h));
            return this;
          };
          f.prototype.exec = function(g, m, n) {
            if (!this.db)
              throw "Database closed";
            var p = oa(), v = null;
            try {
              var y = ca(g) + 1, L = B(y);
              t(g, r, L, y);
              var G = L;
              var H = B(4);
              for (g = []; 0 !== l(G, "i8"); ) {
                pa(h);
                pa(H);
                this.handleError(ob(this.db, G, -1, h, H));
                var I = l(h, "i32");
                G = l(H, "i32");
                if (0 !== I) {
                  y = null;
                  v = new c(I, this);
                  for (null != m && v.bind(m); v.step(); )
                    null === y && (y = { columns: v.getColumnNames(), values: [] }, g.push(y)), y.values.push(v.get(null, n));
                  v.free();
                }
              }
              return g;
            } catch (na) {
              throw v && v.free(), na;
            } finally {
              qa(p);
            }
          };
          f.prototype.each = function(g, m, n, p, v) {
            "function" === typeof m && (p = n, n = m, m = void 0);
            g = this.prepare(g, m);
            try {
              for (; g.step(); )
                n(g.getAsObject(null, v));
            } finally {
              g.free();
            }
            if ("function" === typeof p)
              return p();
          };
          f.prototype.prepare = function(g, m) {
            pa(h);
            this.handleError(S(this.db, g, -1, h, 0));
            g = l(h, "i32");
            if (0 === g)
              throw "Nothing to prepare";
            var n = new c(g, this);
            null != m && n.bind(m);
            return this.Za[g] = n;
          };
          f.prototype.iterateStatements = function(g) {
            return new d(g, this);
          };
          f.prototype["export"] = function() {
            Object.values(this.Za).forEach(function(m) {
              m.free();
            });
            Object.values(this.Na).forEach(ra);
            this.Na = {};
            this.handleError(x(this.db));
            var g = sa(this.filename);
            this.handleError(q(this.filename, h));
            this.db = l(h, "i32");
            return g;
          };
          f.prototype.close = function() {
            null !== this.db && (Object.values(this.Za).forEach(function(g) {
              g.free();
            }), Object.values(this.Na).forEach(ra), this.Na = {}, this.handleError(x(this.db)), ta("/" + this.filename), this.db = null);
          };
          f.prototype.handleError = function(g) {
            if (0 === g)
              return null;
            g = wc(this.db);
            throw Error(g);
          };
          f.prototype.getRowsModified = function() {
            return A(this.db);
          };
          f.prototype.create_function = function(g, m) {
            Object.prototype.hasOwnProperty.call(this.Na, g) && (ra(this.Na[g]), delete this.Na[g]);
            var n = ua(function(p, v, y) {
              v = b(v, y);
              try {
                var L = m.apply(null, v);
              } catch (G) {
                xa(p, G, -1);
                return;
              }
              a(p, L);
            }, "viii");
            this.Na[g] = n;
            this.handleError(rb(this.db, g, m.length, 1, 0, n, 0, 0, 0));
            return this;
          };
          f.prototype.create_aggregate = function(g, m) {
            var n = m.init || function() {
              return null;
            }, p = m.finalize || function(H) {
              return H;
            }, v = m.step;
            if (!v)
              throw "An aggregate function must have a step function in " + g;
            var y = {};
            Object.hasOwnProperty.call(this.Na, g) && (ra(this.Na[g]), delete this.Na[g]);
            m = g + "__finalize";
            Object.hasOwnProperty.call(this.Na, m) && (ra(this.Na[m]), delete this.Na[m]);
            var L = ua(function(H, I, na) {
              var Z = sb(H, 1);
              Object.hasOwnProperty.call(y, Z) || (y[Z] = n());
              I = b(I, na);
              I = [y[Z]].concat(I);
              try {
                y[Z] = v.apply(null, I);
              } catch (Ic) {
                delete y[Z], xa(H, Ic, -1);
              }
            }, "viii"), G = ua(function(H) {
              var I = sb(H, 1);
              try {
                var na = p(y[I]);
              } catch (Z) {
                delete y[I];
                xa(H, Z, -1);
                return;
              }
              a(H, na);
              delete y[I];
            }, "vi");
            this.Na[g] = L;
            this.Na[m] = G;
            this.handleError(rb(this.db, g, v.length - 1, 1, 0, 0, L, G, 0));
            return this;
          };
          e.Database = f;
        };
        var va = Object.assign({}, e), wa = "./this.program", ya = "object" == typeof window, za = "function" == typeof importScripts, Aa = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node, D = "", Ba, Ca, Da, fs, Ea, Fa;
        if (Aa)
          D = za ? require$$2.dirname(D) + "/" : __dirname + "/", Fa = () => {
            Ea || (fs = require$$2, Ea = require$$2);
          }, Ba = function(a, b) {
            Fa();
            a = Ea.normalize(a);
            return fs.readFileSync(a, b ? void 0 : "utf8");
          }, Da = (a) => {
            a = Ba(a, true);
            a.buffer || (a = new Uint8Array(a));
            return a;
          }, Ca = (a, b, c) => {
            Fa();
            a = Ea.normalize(a);
            fs.readFile(a, function(d, f) {
              d ? c(d) : b(f.buffer);
            });
          }, 1 < process.argv.length && (wa = process.argv[1].replace(/\\/g, "/")), process.argv.slice(2), module.exports = e, e.inspect = function() {
            return "[Emscripten Module object]";
          };
        else if (ya || za)
          za ? D = self.location.href : "undefined" != typeof document && document.currentScript && (D = document.currentScript.src), D = 0 !== D.indexOf("blob:") ? D.substr(0, D.replace(/[?#].*/, "").lastIndexOf("/") + 1) : "", Ba = (a) => {
            var b = new XMLHttpRequest();
            b.open("GET", a, false);
            b.send(null);
            return b.responseText;
          }, za && (Da = (a) => {
            var b = new XMLHttpRequest();
            b.open("GET", a, false);
            b.responseType = "arraybuffer";
            b.send(null);
            return new Uint8Array(b.response);
          }), Ca = (a, b, c) => {
            var d = new XMLHttpRequest();
            d.open("GET", a, true);
            d.responseType = "arraybuffer";
            d.onload = () => {
              200 == d.status || 0 == d.status && d.response ? b(d.response) : c();
            };
            d.onerror = c;
            d.send(null);
          };
        var Ga = e.print || console.log.bind(console), Ha = e.printErr || console.warn.bind(console);
        Object.assign(e, va);
        va = null;
        e.thisProgram && (wa = e.thisProgram);
        var Ia;
        e.wasmBinary && (Ia = e.wasmBinary);
        e.noExitRuntime || true;
        "object" != typeof WebAssembly && E("no native wasm support detected");
        var Ja, Ka = false, La = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;
        function Ma(a, b, c) {
          var d = b + c;
          for (c = b; a[c] && !(c >= d); )
            ++c;
          if (16 < c - b && a.buffer && La)
            return La.decode(a.subarray(b, c));
          for (d = ""; b < c; ) {
            var f = a[b++];
            if (f & 128) {
              var h = a[b++] & 63;
              if (192 == (f & 224))
                d += String.fromCharCode((f & 31) << 6 | h);
              else {
                var k = a[b++] & 63;
                f = 224 == (f & 240) ? (f & 15) << 12 | h << 6 | k : (f & 7) << 18 | h << 12 | k << 6 | a[b++] & 63;
                65536 > f ? d += String.fromCharCode(f) : (f -= 65536, d += String.fromCharCode(55296 | f >> 10, 56320 | f & 1023));
              }
            } else
              d += String.fromCharCode(f);
          }
          return d;
        }
        function C(a, b) {
          return a ? Ma(u, a, b) : "";
        }
        function t(a, b, c, d) {
          if (!(0 < d))
            return 0;
          var f = c;
          d = c + d - 1;
          for (var h = 0; h < a.length; ++h) {
            var k = a.charCodeAt(h);
            if (55296 <= k && 57343 >= k) {
              var q = a.charCodeAt(++h);
              k = 65536 + ((k & 1023) << 10) | q & 1023;
            }
            if (127 >= k) {
              if (c >= d)
                break;
              b[c++] = k;
            } else {
              if (2047 >= k) {
                if (c + 1 >= d)
                  break;
                b[c++] = 192 | k >> 6;
              } else {
                if (65535 >= k) {
                  if (c + 2 >= d)
                    break;
                  b[c++] = 224 | k >> 12;
                } else {
                  if (c + 3 >= d)
                    break;
                  b[c++] = 240 | k >> 18;
                  b[c++] = 128 | k >> 12 & 63;
                }
                b[c++] = 128 | k >> 6 & 63;
              }
              b[c++] = 128 | k & 63;
            }
          }
          b[c] = 0;
          return c - f;
        }
        function ca(a) {
          for (var b = 0, c = 0; c < a.length; ++c) {
            var d = a.charCodeAt(c);
            127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;
          }
          return b;
        }
        var Na, r, u, Oa, F, J, Pa, Qa;
        function Ra() {
          var a = Ja.buffer;
          Na = a;
          e.HEAP8 = r = new Int8Array(a);
          e.HEAP16 = Oa = new Int16Array(a);
          e.HEAP32 = F = new Int32Array(a);
          e.HEAPU8 = u = new Uint8Array(a);
          e.HEAPU16 = new Uint16Array(a);
          e.HEAPU32 = J = new Uint32Array(a);
          e.HEAPF32 = Pa = new Float32Array(a);
          e.HEAPF64 = Qa = new Float64Array(a);
        }
        var K, Sa = [], Ta = [], Ua = [];
        function Va() {
          var a = e.preRun.shift();
          Sa.unshift(a);
        }
        var Wa = 0, Ya = null;
        function E(a) {
          if (e.onAbort)
            e.onAbort(a);
          a = "Aborted(" + a + ")";
          Ha(a);
          Ka = true;
          throw new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
        }
        function Za() {
          return M.startsWith("data:application/octet-stream;base64,");
        }
        var M;
        M = "sql-wasm.wasm";
        if (!Za()) {
          var $a = M;
          M = e.locateFile ? e.locateFile($a, D) : D + $a;
        }
        function ab() {
          var a = M;
          try {
            if (a == M && Ia)
              return new Uint8Array(Ia);
            if (Da)
              return Da(a);
            throw "both async and sync fetching of the wasm failed";
          } catch (b) {
            E(b);
          }
        }
        function bb() {
          if (!Ia && (ya || za)) {
            if ("function" == typeof fetch && !M.startsWith("file://"))
              return fetch(M, { credentials: "same-origin" }).then(function(a) {
                if (!a.ok)
                  throw "failed to load wasm binary file at '" + M + "'";
                return a.arrayBuffer();
              }).catch(function() {
                return ab();
              });
            if (Ca)
              return new Promise(function(a, b) {
                Ca(M, function(c) {
                  a(new Uint8Array(c));
                }, b);
              });
          }
          return Promise.resolve().then(function() {
            return ab();
          });
        }
        var N, O;
        function cb(a) {
          for (; 0 < a.length; )
            a.shift()(e);
        }
        function l(a, b = "i8") {
          b.endsWith("*") && (b = "*");
          switch (b) {
            case "i1":
              return r[a >> 0];
            case "i8":
              return r[a >> 0];
            case "i16":
              return Oa[a >> 1];
            case "i32":
              return F[a >> 2];
            case "i64":
              return F[a >> 2];
            case "float":
              return Pa[a >> 2];
            case "double":
              return Qa[a >> 3];
            case "*":
              return J[a >> 2];
            default:
              E("invalid type for getValue: " + b);
          }
          return null;
        }
        function pa(a) {
          var b = "i32";
          b.endsWith("*") && (b = "*");
          switch (b) {
            case "i1":
              r[a >> 0] = 0;
              break;
            case "i8":
              r[a >> 0] = 0;
              break;
            case "i16":
              Oa[a >> 1] = 0;
              break;
            case "i32":
              F[a >> 2] = 0;
              break;
            case "i64":
              O = [0, (N = 0, 1 <= +Math.abs(N) ? 0 < N ? (Math.min(+Math.floor(N / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((N - +(~~N >>> 0)) / 4294967296) >>> 0 : 0)];
              F[a >> 2] = O[0];
              F[a + 4 >> 2] = O[1];
              break;
            case "float":
              Pa[a >> 2] = 0;
              break;
            case "double":
              Qa[a >> 3] = 0;
              break;
            case "*":
              J[a >> 2] = 0;
              break;
            default:
              E("invalid type for setValue: " + b);
          }
        }
        var db = (a, b) => {
          for (var c = 0, d = a.length - 1; 0 <= d; d--) {
            var f = a[d];
            "." === f ? a.splice(d, 1) : ".." === f ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--);
          }
          if (b)
            for (; c; c--)
              a.unshift("..");
          return a;
        }, z = (a) => {
          var b = "/" === a.charAt(0), c = "/" === a.substr(-1);
          (a = db(a.split("/").filter((d) => !!d), !b).join("/")) || b || (a = ".");
          a && c && (a += "/");
          return (b ? "/" : "") + a;
        }, eb = (a) => {
          var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
          a = b[0];
          b = b[1];
          if (!a && !b)
            return ".";
          b && (b = b.substr(0, b.length - 1));
          return a + b;
        }, fb = (a) => {
          if ("/" === a)
            return "/";
          a = z(a);
          a = a.replace(/\/$/, "");
          var b = a.lastIndexOf("/");
          return -1 === b ? a : a.substr(b + 1);
        };
        function gb() {
          if ("object" == typeof crypto && "function" == typeof crypto.getRandomValues) {
            var a = new Uint8Array(1);
            return () => {
              crypto.getRandomValues(a);
              return a[0];
            };
          }
          if (Aa)
            try {
              var b = require$$2;
              return () => b.randomBytes(1)[0];
            } catch (c) {
            }
          return () => E("randomDevice");
        }
        function hb() {
          for (var a = "", b = false, c = arguments.length - 1; -1 <= c && !b; c--) {
            b = 0 <= c ? arguments[c] : "/";
            if ("string" != typeof b)
              throw new TypeError("Arguments to path.resolve must be strings");
            if (!b)
              return "";
            a = b + "/" + a;
            b = "/" === b.charAt(0);
          }
          a = db(a.split("/").filter((d) => !!d), !b).join("/");
          return (b ? "/" : "") + a || ".";
        }
        function ma(a, b) {
          var c = Array(ca(a) + 1);
          a = t(a, c, 0, c.length);
          b && (c.length = a);
          return c;
        }
        var ib = [];
        function jb(a, b) {
          ib[a] = { input: [], output: [], Xa: b };
          lb(a, mb);
        }
        var mb = { open: function(a) {
          var b = ib[a.node.rdev];
          if (!b)
            throw new P(43);
          a.tty = b;
          a.seekable = false;
        }, close: function(a) {
          a.tty.Xa.fsync(a.tty);
        }, fsync: function(a) {
          a.tty.Xa.fsync(a.tty);
        }, read: function(a, b, c, d) {
          if (!a.tty || !a.tty.Xa.tb)
            throw new P(60);
          for (var f = 0, h = 0; h < d; h++) {
            try {
              var k = a.tty.Xa.tb(a.tty);
            } catch (q) {
              throw new P(29);
            }
            if (void 0 === k && 0 === f)
              throw new P(6);
            if (null === k || void 0 === k)
              break;
            f++;
            b[c + h] = k;
          }
          f && (a.node.timestamp = Date.now());
          return f;
        }, write: function(a, b, c, d) {
          if (!a.tty || !a.tty.Xa.jb)
            throw new P(60);
          try {
            for (var f = 0; f < d; f++)
              a.tty.Xa.jb(a.tty, b[c + f]);
          } catch (h) {
            throw new P(29);
          }
          d && (a.node.timestamp = Date.now());
          return f;
        } }, tb = { tb: function(a) {
          if (!a.input.length) {
            var b = null;
            if (Aa) {
              var c = Buffer.alloc(256), d = 0;
              try {
                d = fs.readSync(process.stdin.fd, c, 0, 256, -1);
              } catch (f) {
                if (f.toString().includes("EOF"))
                  d = 0;
                else
                  throw f;
              }
              0 < d ? b = c.slice(0, d).toString("utf-8") : b = null;
            } else
              "undefined" != typeof window && "function" == typeof window.prompt ? (b = window.prompt("Input: "), null !== b && (b += "\n")) : "function" == typeof readline && (b = readline(), null !== b && (b += "\n"));
            if (!b)
              return null;
            a.input = ma(b, true);
          }
          return a.input.shift();
        }, jb: function(a, b) {
          null === b || 10 === b ? (Ga(Ma(a.output, 0)), a.output = []) : 0 != b && a.output.push(b);
        }, fsync: function(a) {
          a.output && 0 < a.output.length && (Ga(Ma(a.output, 0)), a.output = []);
        } }, ub = { jb: function(a, b) {
          null === b || 10 === b ? (Ha(Ma(a.output, 0)), a.output = []) : 0 != b && a.output.push(b);
        }, fsync: function(a) {
          a.output && 0 < a.output.length && (Ha(Ma(a.output, 0)), a.output = []);
        } }, Q = { Qa: null, Ra: function() {
          return Q.createNode(
            null,
            "/",
            16895,
            0
          );
        }, createNode: function(a, b, c, d) {
          if (24576 === (c & 61440) || 4096 === (c & 61440))
            throw new P(63);
          Q.Qa || (Q.Qa = { dir: { node: { Pa: Q.Ga.Pa, Oa: Q.Ga.Oa, lookup: Q.Ga.lookup, ab: Q.Ga.ab, rename: Q.Ga.rename, unlink: Q.Ga.unlink, rmdir: Q.Ga.rmdir, readdir: Q.Ga.readdir, symlink: Q.Ga.symlink }, stream: { Ta: Q.Ha.Ta } }, file: { node: { Pa: Q.Ga.Pa, Oa: Q.Ga.Oa }, stream: { Ta: Q.Ha.Ta, read: Q.Ha.read, write: Q.Ha.write, lb: Q.Ha.lb, bb: Q.Ha.bb, cb: Q.Ha.cb } }, link: { node: { Pa: Q.Ga.Pa, Oa: Q.Ga.Oa, readlink: Q.Ga.readlink }, stream: {} }, pb: {
            node: { Pa: Q.Ga.Pa, Oa: Q.Ga.Oa },
            stream: vb
          } });
          c = wb(a, b, c, d);
          16384 === (c.mode & 61440) ? (c.Ga = Q.Qa.dir.node, c.Ha = Q.Qa.dir.stream, c.Ia = {}) : 32768 === (c.mode & 61440) ? (c.Ga = Q.Qa.file.node, c.Ha = Q.Qa.file.stream, c.Ma = 0, c.Ia = null) : 40960 === (c.mode & 61440) ? (c.Ga = Q.Qa.link.node, c.Ha = Q.Qa.link.stream) : 8192 === (c.mode & 61440) && (c.Ga = Q.Qa.pb.node, c.Ha = Q.Qa.pb.stream);
          c.timestamp = Date.now();
          a && (a.Ia[b] = c, a.timestamp = c.timestamp);
          return c;
        }, Jb: function(a) {
          return a.Ia ? a.Ia.subarray ? a.Ia.subarray(0, a.Ma) : new Uint8Array(a.Ia) : new Uint8Array(0);
        }, qb: function(a, b) {
          var c = a.Ia ? a.Ia.length : 0;
          c >= b || (b = Math.max(b, c * (1048576 > c ? 2 : 1.125) >>> 0), 0 != c && (b = Math.max(b, 256)), c = a.Ia, a.Ia = new Uint8Array(b), 0 < a.Ma && a.Ia.set(c.subarray(0, a.Ma), 0));
        }, Gb: function(a, b) {
          if (a.Ma != b)
            if (0 == b)
              a.Ia = null, a.Ma = 0;
            else {
              var c = a.Ia;
              a.Ia = new Uint8Array(b);
              c && a.Ia.set(c.subarray(0, Math.min(b, a.Ma)));
              a.Ma = b;
            }
        }, Ga: { Pa: function(a) {
          var b = {};
          b.dev = 8192 === (a.mode & 61440) ? a.id : 1;
          b.ino = a.id;
          b.mode = a.mode;
          b.nlink = 1;
          b.uid = 0;
          b.gid = 0;
          b.rdev = a.rdev;
          16384 === (a.mode & 61440) ? b.size = 4096 : 32768 === (a.mode & 61440) ? b.size = a.Ma : 40960 === (a.mode & 61440) ? b.size = a.link.length : b.size = 0;
          b.atime = new Date(a.timestamp);
          b.mtime = new Date(a.timestamp);
          b.ctime = new Date(a.timestamp);
          b.Ab = 4096;
          b.blocks = Math.ceil(b.size / b.Ab);
          return b;
        }, Oa: function(a, b) {
          void 0 !== b.mode && (a.mode = b.mode);
          void 0 !== b.timestamp && (a.timestamp = b.timestamp);
          void 0 !== b.size && Q.Gb(a, b.size);
        }, lookup: function() {
          throw xb[44];
        }, ab: function(a, b, c, d) {
          return Q.createNode(a, b, c, d);
        }, rename: function(a, b, c) {
          if (16384 === (a.mode & 61440)) {
            try {
              var d = yb(b, c);
            } catch (h) {
            }
            if (d)
              for (var f in d.Ia)
                throw new P(55);
          }
          delete a.parent.Ia[a.name];
          a.parent.timestamp = Date.now();
          a.name = c;
          b.Ia[c] = a;
          b.timestamp = a.parent.timestamp;
          a.parent = b;
        }, unlink: function(a, b) {
          delete a.Ia[b];
          a.timestamp = Date.now();
        }, rmdir: function(a, b) {
          var c = yb(a, b), d;
          for (d in c.Ia)
            throw new P(55);
          delete a.Ia[b];
          a.timestamp = Date.now();
        }, readdir: function(a) {
          var b = [".", ".."], c;
          for (c in a.Ia)
            a.Ia.hasOwnProperty(c) && b.push(c);
          return b;
        }, symlink: function(a, b, c) {
          a = Q.createNode(a, b, 41471, 0);
          a.link = c;
          return a;
        }, readlink: function(a) {
          if (40960 !== (a.mode & 61440))
            throw new P(28);
          return a.link;
        } }, Ha: { read: function(a, b, c, d, f) {
          var h = a.node.Ia;
          if (f >= a.node.Ma)
            return 0;
          a = Math.min(a.node.Ma - f, d);
          if (8 < a && h.subarray)
            b.set(h.subarray(f, f + a), c);
          else
            for (d = 0; d < a; d++)
              b[c + d] = h[f + d];
          return a;
        }, write: function(a, b, c, d, f, h) {
          b.buffer === r.buffer && (h = false);
          if (!d)
            return 0;
          a = a.node;
          a.timestamp = Date.now();
          if (b.subarray && (!a.Ia || a.Ia.subarray)) {
            if (h)
              return a.Ia = b.subarray(c, c + d), a.Ma = d;
            if (0 === a.Ma && 0 === f)
              return a.Ia = b.slice(c, c + d), a.Ma = d;
            if (f + d <= a.Ma)
              return a.Ia.set(b.subarray(c, c + d), f), d;
          }
          Q.qb(a, f + d);
          if (a.Ia.subarray && b.subarray)
            a.Ia.set(b.subarray(c, c + d), f);
          else
            for (h = 0; h < d; h++)
              a.Ia[f + h] = b[c + h];
          a.Ma = Math.max(a.Ma, f + d);
          return d;
        }, Ta: function(a, b, c) {
          1 === c ? b += a.position : 2 === c && 32768 === (a.node.mode & 61440) && (b += a.node.Ma);
          if (0 > b)
            throw new P(28);
          return b;
        }, lb: function(a, b, c) {
          Q.qb(a.node, b + c);
          a.node.Ma = Math.max(a.node.Ma, b + c);
        }, bb: function(a, b, c, d, f) {
          if (32768 !== (a.node.mode & 61440))
            throw new P(43);
          a = a.node.Ia;
          if (f & 2 || a.buffer !== Na) {
            if (0 < c || c + b < a.length)
              a.subarray ? a = a.subarray(c, c + b) : a = Array.prototype.slice.call(
                a,
                c,
                c + b
              );
            c = true;
            b = 65536 * Math.ceil(b / 65536);
            (f = zb(65536, b)) ? (u.fill(0, f, f + b), b = f) : b = 0;
            if (!b)
              throw new P(48);
            r.set(a, b);
          } else
            c = false, b = a.byteOffset;
          return { Fb: b, vb: c };
        }, cb: function(a, b, c, d, f) {
          if (32768 !== (a.node.mode & 61440))
            throw new P(43);
          if (f & 2)
            return 0;
          Q.Ha.write(a, b, 0, d, c, false);
          return 0;
        } } }, Ab = null, Bb = {}, R = [], Cb = 1, T = null, Db = true, P = null, xb = {}, U = (a, b = {}) => {
          a = hb("/", a);
          if (!a)
            return { path: "", node: null };
          b = Object.assign({ rb: true, kb: 0 }, b);
          if (8 < b.kb)
            throw new P(32);
          a = db(a.split("/").filter((k) => !!k), false);
          for (var c = Ab, d = "/", f = 0; f < a.length; f++) {
            var h = f === a.length - 1;
            if (h && b.parent)
              break;
            c = yb(c, a[f]);
            d = z(d + "/" + a[f]);
            c.Va && (!h || h && b.rb) && (c = c.Va.root);
            if (!h || b.Sa) {
              for (h = 0; 40960 === (c.mode & 61440); )
                if (c = Eb(d), d = hb(eb(d), c), c = U(d, { kb: b.kb + 1 }).node, 40 < h++)
                  throw new P(32);
            }
          }
          return { path: d, node: c };
        }, ea = (a) => {
          for (var b; ; ) {
            if (a === a.parent)
              return a = a.Ra.ub, b ? "/" !== a[a.length - 1] ? a + "/" + b : a + b : a;
            b = b ? a.name + "/" + b : a.name;
            a = a.parent;
          }
        }, Fb = (a, b) => {
          for (var c = 0, d = 0; d < b.length; d++)
            c = (c << 5) - c + b.charCodeAt(d) | 0;
          return (a + c >>> 0) % T.length;
        }, Gb = (a) => {
          var b = Fb(a.parent.id, a.name);
          if (T[b] === a)
            T[b] = a.Wa;
          else
            for (b = T[b]; b; ) {
              if (b.Wa === a) {
                b.Wa = a.Wa;
                break;
              }
              b = b.Wa;
            }
        }, yb = (a, b) => {
          var c;
          if (c = (c = Hb(a, "x")) ? c : a.Ga.lookup ? 0 : 2)
            throw new P(c, a);
          for (c = T[Fb(a.id, b)]; c; c = c.Wa) {
            var d = c.name;
            if (c.parent.id === a.id && d === b)
              return c;
          }
          return a.Ga.lookup(a, b);
        }, wb = (a, b, c, d) => {
          a = new Ib(a, b, c, d);
          b = Fb(a.parent.id, a.name);
          a.Wa = T[b];
          return T[b] = a;
        }, Jb = { r: 0, "r+": 2, w: 577, "w+": 578, a: 1089, "a+": 1090 }, Kb = (a) => {
          var b = ["r", "w", "rw"][a & 3];
          a & 512 && (b += "w");
          return b;
        }, Hb = (a, b) => {
          if (Db)
            return 0;
          if (!b.includes("r") || a.mode & 292) {
            if (b.includes("w") && !(a.mode & 146) || b.includes("x") && !(a.mode & 73))
              return 2;
          } else
            return 2;
          return 0;
        }, Lb = (a, b) => {
          try {
            return yb(a, b), 20;
          } catch (c) {
          }
          return Hb(a, "wx");
        }, Mb = (a, b, c) => {
          try {
            var d = yb(a, b);
          } catch (f) {
            return f.Ka;
          }
          if (a = Hb(a, "wx"))
            return a;
          if (c) {
            if (16384 !== (d.mode & 61440))
              return 54;
            if (d === d.parent || "/" === ea(d))
              return 10;
          } else if (16384 === (d.mode & 61440))
            return 31;
          return 0;
        }, Nb = (a = 0) => {
          for (; 4096 >= a; a++)
            if (!R[a])
              return a;
          throw new P(33);
        }, Pb = (a, b) => {
          Ob || (Ob = function() {
            this.$a = {};
          }, Ob.prototype = {}, Object.defineProperties(Ob.prototype, { object: { get: function() {
            return this.node;
          }, set: function(c) {
            this.node = c;
          } }, flags: { get: function() {
            return this.$a.flags;
          }, set: function(c) {
            this.$a.flags = c;
          } }, position: { get: function() {
            return this.$a.position;
          }, set: function(c) {
            this.$a.position = c;
          } } }));
          a = Object.assign(new Ob(), a);
          b = Nb(b);
          a.fd = b;
          return R[b] = a;
        }, vb = { open: (a) => {
          a.Ha = Bb[a.node.rdev].Ha;
          a.Ha.open && a.Ha.open(a);
        }, Ta: () => {
          throw new P(70);
        } }, lb = (a, b) => {
          Bb[a] = { Ha: b };
        }, Qb = (a, b) => {
          var c = "/" === b, d = !b;
          if (c && Ab)
            throw new P(10);
          if (!c && !d) {
            var f = U(b, { rb: false });
            b = f.path;
            f = f.node;
            if (f.Va)
              throw new P(10);
            if (16384 !== (f.mode & 61440))
              throw new P(54);
          }
          b = { type: a, Kb: {}, ub: b, Eb: [] };
          a = a.Ra(b);
          a.Ra = b;
          b.root = a;
          c ? Ab = a : f && (f.Va = b, f.Ra && f.Ra.Eb.push(b));
        }, ha = (a, b, c) => {
          var d = U(a, { parent: true }).node;
          a = fb(a);
          if (!a || "." === a || ".." === a)
            throw new P(28);
          var f = Lb(d, a);
          if (f)
            throw new P(f);
          if (!d.Ga.ab)
            throw new P(63);
          return d.Ga.ab(d, a, b, c);
        }, V = (a, b) => ha(a, (void 0 !== b ? b : 511) & 1023 | 16384, 0), Rb = (a, b, c) => {
          "undefined" == typeof c && (c = b, b = 438);
          ha(a, b | 8192, c);
        }, Sb = (a, b) => {
          if (!hb(a))
            throw new P(44);
          var c = U(b, { parent: true }).node;
          if (!c)
            throw new P(44);
          b = fb(b);
          var d = Lb(c, b);
          if (d)
            throw new P(d);
          if (!c.Ga.symlink)
            throw new P(63);
          c.Ga.symlink(c, b, a);
        }, Tb = (a) => {
          var b = U(a, { parent: true }).node;
          a = fb(a);
          var c = yb(b, a), d = Mb(b, a, true);
          if (d)
            throw new P(d);
          if (!b.Ga.rmdir)
            throw new P(63);
          if (c.Va)
            throw new P(10);
          b.Ga.rmdir(b, a);
          Gb(c);
        }, ta = (a) => {
          var b = U(a, { parent: true }).node;
          if (!b)
            throw new P(44);
          a = fb(a);
          var c = yb(b, a), d = Mb(b, a, false);
          if (d)
            throw new P(d);
          if (!b.Ga.unlink)
            throw new P(63);
          if (c.Va)
            throw new P(10);
          b.Ga.unlink(b, a);
          Gb(c);
        }, Eb = (a) => {
          a = U(a).node;
          if (!a)
            throw new P(44);
          if (!a.Ga.readlink)
            throw new P(28);
          return hb(ea(a.parent), a.Ga.readlink(a));
        }, Ub = (a, b) => {
          a = U(a, { Sa: !b }).node;
          if (!a)
            throw new P(44);
          if (!a.Ga.Pa)
            throw new P(63);
          return a.Ga.Pa(a);
        }, Vb = (a) => Ub(a, true), ia = (a, b) => {
          a = "string" == typeof a ? U(a, { Sa: true }).node : a;
          if (!a.Ga.Oa)
            throw new P(63);
          a.Ga.Oa(a, { mode: b & 4095 | a.mode & -4096, timestamp: Date.now() });
        }, Wb = (a, b) => {
          if (0 > b)
            throw new P(28);
          a = "string" == typeof a ? U(a, { Sa: true }).node : a;
          if (!a.Ga.Oa)
            throw new P(63);
          if (16384 === (a.mode & 61440))
            throw new P(31);
          if (32768 !== (a.mode & 61440))
            throw new P(28);
          var c = Hb(a, "w");
          if (c)
            throw new P(c);
          a.Ga.Oa(a, { size: b, timestamp: Date.now() });
        }, ja = (a, b, c) => {
          if ("" === a)
            throw new P(44);
          if ("string" == typeof b) {
            var d = Jb[b];
            if ("undefined" == typeof d)
              throw Error("Unknown file open mode: " + b);
            b = d;
          }
          c = b & 64 ? ("undefined" == typeof c ? 438 : c) & 4095 | 32768 : 0;
          if ("object" == typeof a)
            var f = a;
          else {
            a = z(a);
            try {
              f = U(a, { Sa: !(b & 131072) }).node;
            } catch (h) {
            }
          }
          d = false;
          if (b & 64)
            if (f) {
              if (b & 128)
                throw new P(20);
            } else
              f = ha(a, c, 0), d = true;
          if (!f)
            throw new P(44);
          8192 === (f.mode & 61440) && (b &= -513);
          if (b & 65536 && 16384 !== (f.mode & 61440))
            throw new P(54);
          if (!d && (c = f ? 40960 === (f.mode & 61440) ? 32 : 16384 === (f.mode & 61440) && ("r" !== Kb(b) || b & 512) ? 31 : Hb(f, Kb(b)) : 44))
            throw new P(c);
          b & 512 && !d && Wb(f, 0);
          b &= -131713;
          f = Pb({ node: f, path: ea(f), flags: b, seekable: true, position: 0, Ha: f.Ha, Ib: [], error: false });
          f.Ha.open && f.Ha.open(f);
          !e.logReadFiles || b & 1 || (Xb || (Xb = {}), a in Xb || (Xb[a] = 1));
          return f;
        }, la = (a) => {
          if (null === a.fd)
            throw new P(8);
          a.hb && (a.hb = null);
          try {
            a.Ha.close && a.Ha.close(a);
          } catch (b) {
            throw b;
          } finally {
            R[a.fd] = null;
          }
          a.fd = null;
        }, Yb = (a, b, c) => {
          if (null === a.fd)
            throw new P(8);
          if (!a.seekable || !a.Ha.Ta)
            throw new P(70);
          if (0 != c && 1 != c && 2 != c)
            throw new P(28);
          a.position = a.Ha.Ta(a, b, c);
          a.Ib = [];
        }, Zb = (a, b, c, d, f) => {
          if (0 > d || 0 > f)
            throw new P(28);
          if (null === a.fd)
            throw new P(8);
          if (1 === (a.flags & 2097155))
            throw new P(8);
          if (16384 === (a.node.mode & 61440))
            throw new P(31);
          if (!a.Ha.read)
            throw new P(28);
          var h = "undefined" != typeof f;
          if (!h)
            f = a.position;
          else if (!a.seekable)
            throw new P(70);
          b = a.Ha.read(a, b, c, d, f);
          h || (a.position += b);
          return b;
        }, ka = (a, b, c, d, f) => {
          if (0 > d || 0 > f)
            throw new P(28);
          if (null === a.fd)
            throw new P(8);
          if (0 === (a.flags & 2097155))
            throw new P(8);
          if (16384 === (a.node.mode & 61440))
            throw new P(31);
          if (!a.Ha.write)
            throw new P(28);
          a.seekable && a.flags & 1024 && Yb(a, 0, 2);
          var h = "undefined" != typeof f;
          if (!h)
            f = a.position;
          else if (!a.seekable)
            throw new P(70);
          b = a.Ha.write(a, b, c, d, f, void 0);
          h || (a.position += b);
          return b;
        }, sa = (a) => {
          var c;
          var d = ja(a, d || 0);
          a = Ub(a).size;
          var f = new Uint8Array(a);
          Zb(d, f, 0, a, 0);
          c = f;
          la(d);
          return c;
        }, $b = () => {
          P || (P = function(a, b) {
            this.node = b;
            this.Hb = function(c) {
              this.Ka = c;
            };
            this.Hb(a);
            this.message = "FS error";
          }, P.prototype = Error(), P.prototype.constructor = P, [44].forEach((a) => {
            xb[a] = new P(a);
            xb[a].stack = "<generic error, no stack>";
          }));
        }, ac, fa = (a, b) => {
          var c = 0;
          a && (c |= 365);
          b && (c |= 146);
          return c;
        }, cc = (a, b, c) => {
          a = z("/dev/" + a);
          var d = fa(!!b, !!c);
          bc || (bc = 64);
          var f = bc++ << 8 | 0;
          lb(f, { open: (h) => {
            h.seekable = false;
          }, close: () => {
            c && c.buffer && c.buffer.length && c(10);
          }, read: (h, k, q, x) => {
            for (var w = 0, A = 0; A < x; A++) {
              try {
                var S = b();
              } catch (nb) {
                throw new P(29);
              }
              if (void 0 === S && 0 === w)
                throw new P(6);
              if (null === S || void 0 === S)
                break;
              w++;
              k[q + A] = S;
            }
            w && (h.node.timestamp = Date.now());
            return w;
          }, write: (h, k, q, x) => {
            for (var w = 0; w < x; w++)
              try {
                c(k[q + w]);
              } catch (A) {
                throw new P(29);
              }
            x && (h.node.timestamp = Date.now());
            return w;
          } });
          Rb(a, d, f);
        }, bc, W = {}, Ob, Xb;
        function dc(a, b, c) {
          if ("/" === b.charAt(0))
            return b;
          a = -100 === a ? "/" : X(a).path;
          if (0 == b.length) {
            if (!c)
              throw new P(44);
            return a;
          }
          return z(a + "/" + b);
        }
        function ec(a, b, c) {
          try {
            var d = a(b);
          } catch (f) {
            if (f && f.node && z(b) !== z(ea(f.node)))
              return -54;
            throw f;
          }
          F[c >> 2] = d.dev;
          F[c + 8 >> 2] = d.ino;
          F[c + 12 >> 2] = d.mode;
          J[c + 16 >> 2] = d.nlink;
          F[c + 20 >> 2] = d.uid;
          F[c + 24 >> 2] = d.gid;
          F[c + 28 >> 2] = d.rdev;
          O = [d.size >>> 0, (N = d.size, 1 <= +Math.abs(N) ? 0 < N ? (Math.min(+Math.floor(N / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((N - +(~~N >>> 0)) / 4294967296) >>> 0 : 0)];
          F[c + 40 >> 2] = O[0];
          F[c + 44 >> 2] = O[1];
          F[c + 48 >> 2] = 4096;
          F[c + 52 >> 2] = d.blocks;
          O = [Math.floor(d.atime.getTime() / 1e3) >>> 0, (N = Math.floor(d.atime.getTime() / 1e3), 1 <= +Math.abs(N) ? 0 < N ? (Math.min(+Math.floor(N / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((N - +(~~N >>> 0)) / 4294967296) >>> 0 : 0)];
          F[c + 56 >> 2] = O[0];
          F[c + 60 >> 2] = O[1];
          J[c + 64 >> 2] = 0;
          O = [Math.floor(d.mtime.getTime() / 1e3) >>> 0, (N = Math.floor(d.mtime.getTime() / 1e3), 1 <= +Math.abs(N) ? 0 < N ? (Math.min(+Math.floor(N / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((N - +(~~N >>> 0)) / 4294967296) >>> 0 : 0)];
          F[c + 72 >> 2] = O[0];
          F[c + 76 >> 2] = O[1];
          J[c + 80 >> 2] = 0;
          O = [Math.floor(d.ctime.getTime() / 1e3) >>> 0, (N = Math.floor(d.ctime.getTime() / 1e3), 1 <= +Math.abs(N) ? 0 < N ? (Math.min(+Math.floor(N / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((N - +(~~N >>> 0)) / 4294967296) >>> 0 : 0)];
          F[c + 88 >> 2] = O[0];
          F[c + 92 >> 2] = O[1];
          J[c + 96 >> 2] = 0;
          O = [d.ino >>> 0, (N = d.ino, 1 <= +Math.abs(N) ? 0 < N ? (Math.min(+Math.floor(N / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((N - +(~~N >>> 0)) / 4294967296) >>> 0 : 0)];
          F[c + 104 >> 2] = O[0];
          F[c + 108 >> 2] = O[1];
          return 0;
        }
        var fc = void 0;
        function Hc() {
          fc += 4;
          return F[fc - 4 >> 2];
        }
        function X(a) {
          a = R[a];
          if (!a)
            throw new P(8);
          return a;
        }
        function Jc(a) {
          return J[a >> 2] + 4294967296 * F[a + 4 >> 2];
        }
        function Kc(a) {
          var b = ca(a) + 1, c = da(b);
          c && t(a, r, c, b);
          return c;
        }
        function Lc(a, b, c) {
          function d(x) {
            return (x = x.toTimeString().match(/\(([A-Za-z ]+)\)$/)) ? x[1] : "GMT";
          }
          var f = (/* @__PURE__ */ new Date()).getFullYear(), h = new Date(f, 0, 1), k = new Date(f, 6, 1);
          f = h.getTimezoneOffset();
          var q = k.getTimezoneOffset();
          F[a >> 2] = 60 * Math.max(f, q);
          F[b >> 2] = Number(f != q);
          a = d(h);
          b = d(k);
          a = Kc(a);
          b = Kc(b);
          q < f ? (J[c >> 2] = a, J[c + 4 >> 2] = b) : (J[c >> 2] = b, J[c + 4 >> 2] = a);
        }
        function Mc(a, b, c) {
          Mc.Bb || (Mc.Bb = true, Lc(a, b, c));
        }
        var Nc;
        Nc = Aa ? () => {
          var a = process.hrtime();
          return 1e3 * a[0] + a[1] / 1e6;
        } : () => performance.now();
        var Oc = {};
        function Pc() {
          if (!Qc) {
            var a = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _: wa || "./this.program" }, b;
            for (b in Oc)
              void 0 === Oc[b] ? delete a[b] : a[b] = Oc[b];
            var c = [];
            for (b in a)
              c.push(b + "=" + a[b]);
            Qc = c;
          }
          return Qc;
        }
        var Qc, Y = void 0, Rc = [];
        function ua(a, b) {
          if (!Y) {
            Y = /* @__PURE__ */ new WeakMap();
            var c = K.length;
            if (Y)
              for (var d = 0; d < 0 + c; d++) {
                var f = K.get(d);
                f && Y.set(f, d);
              }
          }
          if (Y.has(a))
            return Y.get(a);
          if (Rc.length)
            c = Rc.pop();
          else {
            try {
              K.grow(1);
            } catch (q) {
              if (!(q instanceof RangeError))
                throw q;
              throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.";
            }
            c = K.length - 1;
          }
          try {
            K.set(c, a);
          } catch (q) {
            if (!(q instanceof TypeError))
              throw q;
            if ("function" == typeof WebAssembly.Function) {
              d = WebAssembly.Function;
              f = { i: "i32", j: "i64", f: "f32", d: "f64", p: "i32" };
              for (var h = { parameters: [], results: "v" == b[0] ? [] : [f[b[0]]] }, k = 1; k < b.length; ++k)
                h.parameters.push(f[b[k]]);
              b = new d(h, a);
            } else {
              d = [1, 96];
              f = b.slice(0, 1);
              b = b.slice(1);
              h = { i: 127, p: 127, j: 126, f: 125, d: 124 };
              k = b.length;
              128 > k ? d.push(k) : d.push(k % 128 | 128, k >> 7);
              for (k = 0; k < b.length; ++k)
                d.push(h[b[k]]);
              "v" == f ? d.push(0) : d.push(1, h[f]);
              b = [0, 97, 115, 109, 1, 0, 0, 0, 1];
              f = d.length;
              128 > f ? b.push(f) : b.push(f % 128 | 128, f >> 7);
              b.push.apply(b, d);
              b.push(2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0);
              b = new WebAssembly.Module(new Uint8Array(b));
              b = new WebAssembly.Instance(b, { e: { f: a } }).exports.f;
            }
            K.set(
              c,
              b
            );
          }
          Y.set(a, c);
          return c;
        }
        function ra(a) {
          Y.delete(K.get(a));
          Rc.push(a);
        }
        function aa(a) {
          var b = da(a.length);
          a.subarray || a.slice || (a = new Uint8Array(a));
          u.set(a, b);
          return b;
        }
        function Uc(a, b, c, d) {
          var f = { string: (w) => {
            var A = 0;
            if (null !== w && void 0 !== w && 0 !== w) {
              var S = (w.length << 2) + 1;
              A = B(S);
              t(w, u, A, S);
            }
            return A;
          }, array: (w) => {
            var A = B(w.length);
            r.set(w, A);
            return A;
          } };
          a = e["_" + a];
          var h = [], k = 0;
          if (d)
            for (var q = 0; q < d.length; q++) {
              var x = f[c[q]];
              x ? (0 === k && (k = oa()), h[q] = x(d[q])) : h[q] = d[q];
            }
          c = a.apply(null, h);
          return c = function(w) {
            0 !== k && qa(k);
            return "string" === b ? C(w) : "boolean" === b ? !!w : w;
          }(c);
        }
        function Ib(a, b, c, d) {
          a || (a = this);
          this.parent = a;
          this.Ra = a.Ra;
          this.Va = null;
          this.id = Cb++;
          this.name = b;
          this.mode = c;
          this.Ga = {};
          this.Ha = {};
          this.rdev = d;
        }
        Object.defineProperties(Ib.prototype, { read: { get: function() {
          return 365 === (this.mode & 365);
        }, set: function(a) {
          a ? this.mode |= 365 : this.mode &= -366;
        } }, write: { get: function() {
          return 146 === (this.mode & 146);
        }, set: function(a) {
          a ? this.mode |= 146 : this.mode &= -147;
        } } });
        $b();
        T = Array(4096);
        Qb(Q, "/");
        V("/tmp");
        V("/home");
        V("/home/web_user");
        (() => {
          V("/dev");
          lb(259, { read: () => 0, write: (b, c, d, f) => f });
          Rb("/dev/null", 259);
          jb(1280, tb);
          jb(1536, ub);
          Rb("/dev/tty", 1280);
          Rb("/dev/tty1", 1536);
          var a = gb();
          cc("random", a);
          cc("urandom", a);
          V("/dev/shm");
          V("/dev/shm/tmp");
        })();
        (() => {
          V("/proc");
          var a = V("/proc/self");
          V("/proc/self/fd");
          Qb({ Ra: () => {
            var b = wb(a, "fd", 16895, 73);
            b.Ga = { lookup: (c, d) => {
              var f = R[+d];
              if (!f)
                throw new P(8);
              c = { parent: null, Ra: { ub: "fake" }, Ga: { readlink: () => f.path } };
              return c.parent = c;
            } };
            return b;
          } }, "/proc/self/fd");
        })();
        var Wc = { a: function(a, b, c, d) {
          E("Assertion failed: " + C(a) + ", at: " + [b ? C(b) : "unknown filename", c, d ? C(d) : "unknown function"]);
        }, h: function(a, b) {
          try {
            return a = C(a), ia(a, b), 0;
          } catch (c) {
            if ("undefined" == typeof W || !(c instanceof P))
              throw c;
            return -c.Ka;
          }
        }, H: function(a, b, c) {
          try {
            b = C(b);
            b = dc(a, b);
            if (c & -8)
              return -28;
            var d = U(b, { Sa: true }).node;
            if (!d)
              return -44;
            a = "";
            c & 4 && (a += "r");
            c & 2 && (a += "w");
            c & 1 && (a += "x");
            return a && Hb(d, a) ? -2 : 0;
          } catch (f) {
            if ("undefined" == typeof W || !(f instanceof P))
              throw f;
            return -f.Ka;
          }
        }, i: function(a, b) {
          try {
            var c = R[a];
            if (!c)
              throw new P(8);
            ia(c.node, b);
            return 0;
          } catch (d) {
            if ("undefined" == typeof W || !(d instanceof P))
              throw d;
            return -d.Ka;
          }
        }, g: function(a) {
          try {
            var b = R[a];
            if (!b)
              throw new P(8);
            var c = b.node;
            var d = "string" == typeof c ? U(c, { Sa: true }).node : c;
            if (!d.Ga.Oa)
              throw new P(63);
            d.Ga.Oa(d, { timestamp: Date.now() });
            return 0;
          } catch (f) {
            if ("undefined" == typeof W || !(f instanceof P))
              throw f;
            return -f.Ka;
          }
        }, b: function(a, b, c) {
          fc = c;
          try {
            var d = X(a);
            switch (b) {
              case 0:
                var f = Hc();
                return 0 > f ? -28 : Pb(d, f).fd;
              case 1:
              case 2:
                return 0;
              case 3:
                return d.flags;
              case 4:
                return f = Hc(), d.flags |= f, 0;
              case 5:
                return f = Hc(), Oa[f + 0 >> 1] = 2, 0;
              case 6:
              case 7:
                return 0;
              case 16:
              case 8:
                return -28;
              case 9:
                return F[Vc() >> 2] = 28, -1;
              default:
                return -28;
            }
          } catch (h) {
            if ("undefined" == typeof W || !(h instanceof P))
              throw h;
            return -h.Ka;
          }
        }, G: function(a, b) {
          try {
            var c = X(a);
            return ec(Ub, c.path, b);
          } catch (d) {
            if ("undefined" == typeof W || !(d instanceof P))
              throw d;
            return -d.Ka;
          }
        }, l: function(a, b, c) {
          try {
            b = c + 2097152 >>> 0 < 4194305 - !!b ? (b >>> 0) + 4294967296 * c : NaN;
            if (isNaN(b))
              return -61;
            var d = R[a];
            if (!d)
              throw new P(8);
            if (0 === (d.flags & 2097155))
              throw new P(28);
            Wb(d.node, b);
            return 0;
          } catch (f) {
            if ("undefined" == typeof W || !(f instanceof P))
              throw f;
            return -f.Ka;
          }
        }, B: function(a, b) {
          try {
            if (0 === b)
              return -28;
            var c = ca("/") + 1;
            if (b < c)
              return -68;
            t("/", u, a, b);
            return c;
          } catch (d) {
            if ("undefined" == typeof W || !(d instanceof P))
              throw d;
            return -d.Ka;
          }
        }, E: function(a, b) {
          try {
            return a = C(a), ec(Vb, a, b);
          } catch (c) {
            if ("undefined" == typeof W || !(c instanceof P))
              throw c;
            return -c.Ka;
          }
        }, y: function(a, b, c) {
          try {
            return b = C(b), b = dc(a, b), b = z(b), "/" === b[b.length - 1] && (b = b.substr(0, b.length - 1)), V(b, c), 0;
          } catch (d) {
            if ("undefined" == typeof W || !(d instanceof P))
              throw d;
            return -d.Ka;
          }
        }, D: function(a, b, c, d) {
          try {
            b = C(b);
            var f = d & 256;
            b = dc(a, b, d & 4096);
            return ec(f ? Vb : Ub, b, c);
          } catch (h) {
            if ("undefined" == typeof W || !(h instanceof P))
              throw h;
            return -h.Ka;
          }
        }, v: function(a, b, c, d) {
          fc = d;
          try {
            b = C(b);
            b = dc(a, b);
            var f = d ? Hc() : 0;
            return ja(b, c, f).fd;
          } catch (h) {
            if ("undefined" == typeof W || !(h instanceof P))
              throw h;
            return -h.Ka;
          }
        }, t: function(a, b, c, d) {
          try {
            b = C(b);
            b = dc(a, b);
            if (0 >= d)
              return -28;
            var f = Eb(b), h = Math.min(
              d,
              ca(f)
            ), k = r[c + h];
            t(f, u, c, d + 1);
            r[c + h] = k;
            return h;
          } catch (q) {
            if ("undefined" == typeof W || !(q instanceof P))
              throw q;
            return -q.Ka;
          }
        }, s: function(a) {
          try {
            return a = C(a), Tb(a), 0;
          } catch (b) {
            if ("undefined" == typeof W || !(b instanceof P))
              throw b;
            return -b.Ka;
          }
        }, F: function(a, b) {
          try {
            return a = C(a), ec(Ub, a, b);
          } catch (c) {
            if ("undefined" == typeof W || !(c instanceof P))
              throw c;
            return -c.Ka;
          }
        }, p: function(a, b, c) {
          try {
            return b = C(b), b = dc(a, b), 0 === c ? ta(b) : 512 === c ? Tb(b) : E("Invalid flags passed to unlinkat"), 0;
          } catch (d) {
            if ("undefined" == typeof W || !(d instanceof P))
              throw d;
            return -d.Ka;
          }
        }, o: function(a, b, c) {
          try {
            b = C(b);
            b = dc(a, b, true);
            if (c) {
              var d = Jc(c), f = F[c + 8 >> 2];
              h = 1e3 * d + f / 1e6;
              c += 16;
              d = Jc(c);
              f = F[c + 8 >> 2];
              k = 1e3 * d + f / 1e6;
            } else
              var h = Date.now(), k = h;
            a = h;
            var q = U(b, { Sa: true }).node;
            q.Ga.Oa(q, { timestamp: Math.max(a, k) });
            return 0;
          } catch (x) {
            if ("undefined" == typeof W || !(x instanceof P))
              throw x;
            return -x.Ka;
          }
        }, e: function() {
          return Date.now();
        }, j: function(a, b) {
          a = new Date(1e3 * Jc(a));
          F[b >> 2] = a.getSeconds();
          F[b + 4 >> 2] = a.getMinutes();
          F[b + 8 >> 2] = a.getHours();
          F[b + 12 >> 2] = a.getDate();
          F[b + 16 >> 2] = a.getMonth();
          F[b + 20 >> 2] = a.getFullYear() - 1900;
          F[b + 24 >> 2] = a.getDay();
          var c = new Date(a.getFullYear(), 0, 1);
          F[b + 28 >> 2] = (a.getTime() - c.getTime()) / 864e5 | 0;
          F[b + 36 >> 2] = -(60 * a.getTimezoneOffset());
          var d = new Date(a.getFullYear(), 6, 1).getTimezoneOffset();
          c = c.getTimezoneOffset();
          F[b + 32 >> 2] = (d != c && a.getTimezoneOffset() == Math.min(c, d)) | 0;
        }, w: function(a, b, c, d, f, h) {
          try {
            var k = X(d);
            if (0 !== (b & 2) && 0 === (c & 2) && 2 !== (k.flags & 2097155))
              throw new P(2);
            if (1 === (k.flags & 2097155))
              throw new P(2);
            if (!k.Ha.bb)
              throw new P(43);
            var q = k.Ha.bb(k, a, f, b, c);
            var x = q.Fb;
            F[h >> 2] = q.vb;
            return x;
          } catch (w) {
            if ("undefined" == typeof W || !(w instanceof P))
              throw w;
            return -w.Ka;
          }
        }, x: function(a, b, c, d, f, h) {
          try {
            var k = X(f);
            if (c & 2) {
              var q = u.slice(a, a + b);
              k && k.Ha.cb && k.Ha.cb(k, q, h, b, d);
            }
          } catch (x) {
            if ("undefined" == typeof W || !(x instanceof P))
              throw x;
            return -x.Ka;
          }
        }, n: Mc, q: function() {
          return 2147483648;
        }, d: Nc, c: function(a) {
          var b = u.length;
          a >>>= 0;
          if (2147483648 < a)
            return false;
          for (var c = 1; 4 >= c; c *= 2) {
            var d = b * (1 + 0.2 / c);
            d = Math.min(d, a + 100663296);
            var f = Math;
            d = Math.max(
              a,
              d
            );
            f = f.min.call(f, 2147483648, d + (65536 - d % 65536) % 65536);
            a: {
              try {
                Ja.grow(f - Na.byteLength + 65535 >>> 16);
                Ra();
                var h = 1;
                break a;
              } catch (k) {
              }
              h = void 0;
            }
            if (h)
              return true;
          }
          return false;
        }, z: function(a, b) {
          var c = 0;
          Pc().forEach(function(d, f) {
            var h = b + c;
            f = J[a + 4 * f >> 2] = h;
            for (h = 0; h < d.length; ++h)
              r[f++ >> 0] = d.charCodeAt(h);
            r[f >> 0] = 0;
            c += d.length + 1;
          });
          return 0;
        }, A: function(a, b) {
          var c = Pc();
          J[a >> 2] = c.length;
          var d = 0;
          c.forEach(function(f) {
            d += f.length + 1;
          });
          J[b >> 2] = d;
          return 0;
        }, f: function(a) {
          try {
            var b = X(a);
            la(b);
            return 0;
          } catch (c) {
            if ("undefined" == typeof W || !(c instanceof P))
              throw c;
            return c.Ka;
          }
        }, m: function(a, b) {
          try {
            var c = X(a);
            r[b >> 0] = c.tty ? 2 : 16384 === (c.mode & 61440) ? 3 : 40960 === (c.mode & 61440) ? 7 : 4;
            return 0;
          } catch (d) {
            if ("undefined" == typeof W || !(d instanceof P))
              throw d;
            return d.Ka;
          }
        }, u: function(a, b, c, d) {
          try {
            a: {
              var f = X(a);
              a = b;
              for (var h = b = 0; h < c; h++) {
                var k = J[a >> 2], q = J[a + 4 >> 2];
                a += 8;
                var x = Zb(f, r, k, q);
                if (0 > x) {
                  var w = -1;
                  break a;
                }
                b += x;
                if (x < q)
                  break;
              }
              w = b;
            }
            J[d >> 2] = w;
            return 0;
          } catch (A) {
            if ("undefined" == typeof W || !(A instanceof P))
              throw A;
            return A.Ka;
          }
        }, k: function(a, b, c, d, f) {
          try {
            b = c + 2097152 >>> 0 < 4194305 - !!b ? (b >>> 0) + 4294967296 * c : NaN;
            if (isNaN(b))
              return 61;
            var h = X(a);
            Yb(h, b, d);
            O = [h.position >>> 0, (N = h.position, 1 <= +Math.abs(N) ? 0 < N ? (Math.min(+Math.floor(N / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math.ceil((N - +(~~N >>> 0)) / 4294967296) >>> 0 : 0)];
            F[f >> 2] = O[0];
            F[f + 4 >> 2] = O[1];
            h.hb && 0 === b && 0 === d && (h.hb = null);
            return 0;
          } catch (k) {
            if ("undefined" == typeof W || !(k instanceof P))
              throw k;
            return k.Ka;
          }
        }, C: function(a) {
          try {
            var b = X(a);
            return b.Ha && b.Ha.fsync ? b.Ha.fsync(b) : 0;
          } catch (c) {
            if ("undefined" == typeof W || !(c instanceof P))
              throw c;
            return c.Ka;
          }
        }, r: function(a, b, c, d) {
          try {
            a: {
              var f = X(a);
              a = b;
              for (var h = b = 0; h < c; h++) {
                var k = J[a >> 2], q = J[a + 4 >> 2];
                a += 8;
                var x = ka(f, r, k, q);
                if (0 > x) {
                  var w = -1;
                  break a;
                }
                b += x;
              }
              w = b;
            }
            J[d >> 2] = w;
            return 0;
          } catch (A) {
            if ("undefined" == typeof W || !(A instanceof P))
              throw A;
            return A.Ka;
          }
        } };
        (function() {
          function a(f) {
            e.asm = f.exports;
            Ja = e.asm.I;
            Ra();
            K = e.asm.Aa;
            Ta.unshift(e.asm.J);
            Wa--;
            e.monitorRunDependencies && e.monitorRunDependencies(Wa);
            0 == Wa && (Ya && (f = Ya, Ya = null, f()));
          }
          function b(f) {
            a(f.instance);
          }
          function c(f) {
            return bb().then(function(h) {
              return WebAssembly.instantiate(h, d);
            }).then(function(h) {
              return h;
            }).then(f, function(h) {
              Ha("failed to asynchronously prepare wasm: " + h);
              E(h);
            });
          }
          var d = { a: Wc };
          Wa++;
          e.monitorRunDependencies && e.monitorRunDependencies(Wa);
          if (e.instantiateWasm)
            try {
              return e.instantiateWasm(d, a);
            } catch (f) {
              return Ha("Module.instantiateWasm callback failed with error: " + f), false;
            }
          (function() {
            return Ia || "function" != typeof WebAssembly.instantiateStreaming || Za() || M.startsWith("file://") || Aa || "function" != typeof fetch ? c(b) : fetch(M, { credentials: "same-origin" }).then(function(f) {
              return WebAssembly.instantiateStreaming(f, d).then(b, function(h) {
                Ha("wasm streaming compile failed: " + h);
                Ha("falling back to ArrayBuffer instantiation");
                return c(b);
              });
            });
          })();
          return {};
        })();
        e.___wasm_call_ctors = function() {
          return (e.___wasm_call_ctors = e.asm.J).apply(null, arguments);
        };
        e._sqlite3_free = function() {
          return (e._sqlite3_free = e.asm.K).apply(null, arguments);
        };
        e._sqlite3_value_double = function() {
          return (e._sqlite3_value_double = e.asm.L).apply(null, arguments);
        };
        e._sqlite3_value_text = function() {
          return (e._sqlite3_value_text = e.asm.M).apply(null, arguments);
        };
        var Vc = e.___errno_location = function() {
          return (Vc = e.___errno_location = e.asm.N).apply(null, arguments);
        };
        e._sqlite3_prepare_v2 = function() {
          return (e._sqlite3_prepare_v2 = e.asm.O).apply(null, arguments);
        };
        e._sqlite3_step = function() {
          return (e._sqlite3_step = e.asm.P).apply(null, arguments);
        };
        e._sqlite3_finalize = function() {
          return (e._sqlite3_finalize = e.asm.Q).apply(null, arguments);
        };
        e._sqlite3_reset = function() {
          return (e._sqlite3_reset = e.asm.R).apply(null, arguments);
        };
        e._sqlite3_value_int = function() {
          return (e._sqlite3_value_int = e.asm.S).apply(null, arguments);
        };
        e._sqlite3_clear_bindings = function() {
          return (e._sqlite3_clear_bindings = e.asm.T).apply(null, arguments);
        };
        e._sqlite3_value_blob = function() {
          return (e._sqlite3_value_blob = e.asm.U).apply(null, arguments);
        };
        e._sqlite3_value_bytes = function() {
          return (e._sqlite3_value_bytes = e.asm.V).apply(null, arguments);
        };
        e._sqlite3_value_type = function() {
          return (e._sqlite3_value_type = e.asm.W).apply(null, arguments);
        };
        e._sqlite3_result_blob = function() {
          return (e._sqlite3_result_blob = e.asm.X).apply(null, arguments);
        };
        e._sqlite3_result_double = function() {
          return (e._sqlite3_result_double = e.asm.Y).apply(null, arguments);
        };
        e._sqlite3_result_error = function() {
          return (e._sqlite3_result_error = e.asm.Z).apply(null, arguments);
        };
        e._sqlite3_result_int = function() {
          return (e._sqlite3_result_int = e.asm._).apply(null, arguments);
        };
        e._sqlite3_result_int64 = function() {
          return (e._sqlite3_result_int64 = e.asm.$).apply(null, arguments);
        };
        e._sqlite3_result_null = function() {
          return (e._sqlite3_result_null = e.asm.aa).apply(null, arguments);
        };
        e._sqlite3_result_text = function() {
          return (e._sqlite3_result_text = e.asm.ba).apply(null, arguments);
        };
        e._sqlite3_sql = function() {
          return (e._sqlite3_sql = e.asm.ca).apply(null, arguments);
        };
        e._sqlite3_aggregate_context = function() {
          return (e._sqlite3_aggregate_context = e.asm.da).apply(null, arguments);
        };
        e._sqlite3_column_count = function() {
          return (e._sqlite3_column_count = e.asm.ea).apply(null, arguments);
        };
        e._sqlite3_data_count = function() {
          return (e._sqlite3_data_count = e.asm.fa).apply(null, arguments);
        };
        e._sqlite3_column_blob = function() {
          return (e._sqlite3_column_blob = e.asm.ga).apply(null, arguments);
        };
        e._sqlite3_column_bytes = function() {
          return (e._sqlite3_column_bytes = e.asm.ha).apply(null, arguments);
        };
        e._sqlite3_column_double = function() {
          return (e._sqlite3_column_double = e.asm.ia).apply(null, arguments);
        };
        e._sqlite3_column_text = function() {
          return (e._sqlite3_column_text = e.asm.ja).apply(null, arguments);
        };
        e._sqlite3_column_type = function() {
          return (e._sqlite3_column_type = e.asm.ka).apply(null, arguments);
        };
        e._sqlite3_column_name = function() {
          return (e._sqlite3_column_name = e.asm.la).apply(null, arguments);
        };
        e._sqlite3_bind_blob = function() {
          return (e._sqlite3_bind_blob = e.asm.ma).apply(null, arguments);
        };
        e._sqlite3_bind_double = function() {
          return (e._sqlite3_bind_double = e.asm.na).apply(null, arguments);
        };
        e._sqlite3_bind_int = function() {
          return (e._sqlite3_bind_int = e.asm.oa).apply(null, arguments);
        };
        e._sqlite3_bind_text = function() {
          return (e._sqlite3_bind_text = e.asm.pa).apply(null, arguments);
        };
        e._sqlite3_bind_parameter_index = function() {
          return (e._sqlite3_bind_parameter_index = e.asm.qa).apply(null, arguments);
        };
        e._sqlite3_normalized_sql = function() {
          return (e._sqlite3_normalized_sql = e.asm.ra).apply(null, arguments);
        };
        e._sqlite3_errmsg = function() {
          return (e._sqlite3_errmsg = e.asm.sa).apply(null, arguments);
        };
        e._sqlite3_exec = function() {
          return (e._sqlite3_exec = e.asm.ta).apply(null, arguments);
        };
        e._sqlite3_changes = function() {
          return (e._sqlite3_changes = e.asm.ua).apply(null, arguments);
        };
        e._sqlite3_close_v2 = function() {
          return (e._sqlite3_close_v2 = e.asm.va).apply(null, arguments);
        };
        e._sqlite3_create_function_v2 = function() {
          return (e._sqlite3_create_function_v2 = e.asm.wa).apply(null, arguments);
        };
        e._sqlite3_open = function() {
          return (e._sqlite3_open = e.asm.xa).apply(null, arguments);
        };
        var da = e._malloc = function() {
          return (da = e._malloc = e.asm.ya).apply(null, arguments);
        }, ba = e._free = function() {
          return (ba = e._free = e.asm.za).apply(null, arguments);
        };
        e._RegisterExtensionFunctions = function() {
          return (e._RegisterExtensionFunctions = e.asm.Ba).apply(null, arguments);
        };
        var zb = e._emscripten_builtin_memalign = function() {
          return (zb = e._emscripten_builtin_memalign = e.asm.Ca).apply(null, arguments);
        }, oa = e.stackSave = function() {
          return (oa = e.stackSave = e.asm.Da).apply(null, arguments);
        }, qa = e.stackRestore = function() {
          return (qa = e.stackRestore = e.asm.Ea).apply(null, arguments);
        }, B = e.stackAlloc = function() {
          return (B = e.stackAlloc = e.asm.Fa).apply(null, arguments);
        };
        e.UTF8ToString = C;
        e.stackAlloc = B;
        e.stackSave = oa;
        e.stackRestore = qa;
        e.cwrap = function(a, b, c, d) {
          c = c || [];
          var f = c.every((h) => "number" === h || "boolean" === h);
          return "string" !== b && f && !d ? e["_" + a] : function() {
            return Uc(a, b, c, arguments);
          };
        };
        var Xc;
        Ya = function Yc() {
          Xc || Zc();
          Xc || (Ya = Yc);
        };
        function Zc() {
          function a() {
            if (!Xc && (Xc = true, e.calledRun = true, !Ka)) {
              e.noFSInit || ac || (ac = true, $b(), e.stdin = e.stdin, e.stdout = e.stdout, e.stderr = e.stderr, e.stdin ? cc("stdin", e.stdin) : Sb("/dev/tty", "/dev/stdin"), e.stdout ? cc("stdout", null, e.stdout) : Sb("/dev/tty", "/dev/stdout"), e.stderr ? cc("stderr", null, e.stderr) : Sb("/dev/tty1", "/dev/stderr"), ja("/dev/stdin", 0), ja("/dev/stdout", 1), ja("/dev/stderr", 1));
              Db = false;
              cb(Ta);
              if (e.onRuntimeInitialized)
                e.onRuntimeInitialized();
              if (e.postRun)
                for ("function" == typeof e.postRun && (e.postRun = [e.postRun]); e.postRun.length; ) {
                  var b = e.postRun.shift();
                  Ua.unshift(b);
                }
              cb(Ua);
            }
          }
          if (!(0 < Wa)) {
            if (e.preRun)
              for ("function" == typeof e.preRun && (e.preRun = [e.preRun]); e.preRun.length; )
                Va();
            cb(Sa);
            0 < Wa || (e.setStatus ? (e.setStatus("Running..."), setTimeout(function() {
              setTimeout(function() {
                e.setStatus("");
              }, 1);
              a();
            }, 1)) : a());
          }
        }
        if (e.preInit)
          for ("function" == typeof e.preInit && (e.preInit = [e.preInit]); 0 < e.preInit.length; )
            e.preInit.pop()();
        Zc();
        return Module;
      });
      return initSqlJsPromise;
    };
    {
      module.exports = initSqlJs;
      module.exports.default = initSqlJs;
    }
  })(sqlWasm);
  var sqlWasmExports = sqlWasm.exports;
  var InitSqlJS = /* @__PURE__ */ getDefaultExportFromCjs(sqlWasmExports);
  var WasmUrl = "" + new URL("sql-wasm-18fc45ef.wasm", self.location.href).href;
  const DB_NAME = "sqlitevfs";
  const LOADED_FILES = /* @__PURE__ */ new Map();
  const MIN_GROW_BYTES = 2048;
  const MAX_GROW_BYTES = 65536;
  class _Buffer {
    constructor(data) {
      __publicField(this, "_data");
      __publicField(this, "_size");
      this._data = data ?? new Uint8Array();
      this._size = this._data.length;
    }
    get size() {
      return this._size;
    }
    read(offset, buffer) {
      if (offset >= this._size) {
        return 0;
      }
      const toCopy = this._data.subarray(
        offset,
        Math.min(this._size, offset + buffer.length)
      );
      buffer.set(toCopy);
      return toCopy.length;
    }
    reserve(capacity) {
      if (this._data.length >= capacity) {
        return;
      }
      const neededBytes = capacity - this._data.length;
      const growBy = Math.min(
        MAX_GROW_BYTES,
        Math.max(MIN_GROW_BYTES, this._data.length)
      );
      const newArray = new Uint8Array(
        this._data.length + Math.max(growBy, neededBytes)
      );
      newArray.set(this._data);
      this._data = newArray;
    }
    write(offset, buffer) {
      this.reserve(offset + buffer.length);
      this._data.set(buffer, offset);
      this._size = Math.max(this._size, offset + buffer.length);
      return buffer.length;
    }
    truncate(size) {
      this._size = size;
    }
    toUint8Array() {
      return this._data.subarray(0, this._size);
    }
  }
  const indexedDB = self.indexedDB || window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
  const database = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore("files", { keyPath: "name" });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  async function loadFile(fileName) {
    const db = await database;
    const file = await new Promise((resolve, reject) => {
      const store = db.transaction("files", "readonly").objectStore("files");
      const request = store.get(fileName);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    if (file && !LOADED_FILES.has(fileName)) {
      const buffer = new _Buffer(file.data);
      LOADED_FILES.set(fileName, buffer);
      return buffer;
    } else if (LOADED_FILES.has(fileName)) {
      return LOADED_FILES.get(fileName);
    } else {
      return null;
    }
  }
  async function syncFile(fileName, data) {
    const db = await database;
    await new Promise((resolve, reject) => {
      const store = db.transaction("files", "readwrite").objectStore("files");
      const request = store.put({ name: fileName, data });
      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  }
  async function writeFile(fileName, data) {
    await syncFile(fileName, data);
    if (LOADED_FILES.has(fileName)) {
      const buffer = LOADED_FILES.get(fileName);
      buffer.truncate(0);
      buffer.write(0, data);
    }
  }
  var defaultSerializer = (parameter) => {
    if (parameter === void 0 || parameter === null || typeof parameter === "bigint" || typeof parameter === "number" || typeof parameter === "object" && "buffer" in parameter) {
      return parameter;
    } else if (typeof parameter === "boolean") {
      return `${parameter}`;
    } else if (parameter instanceof Date) {
      return parameter.toISOString();
    } else {
      return JSON.stringify(parameter);
    }
  };
  var defaultDeserializer = (parameter) => {
    if (parameter === void 0 || parameter === null || typeof parameter === "bigint" || typeof parameter === "number" || typeof parameter === "object" && "buffer" in parameter) {
      return parameter;
    }
    if (typeof parameter === "string") {
      const dateRegex = /^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?$/;
      if (/^(true|false)$/.test(parameter)) {
        return parameter === "true";
      } else if (dateRegex.test(parameter)) {
        return new Date(parameter);
      } else {
        try {
          return JSON.parse(parameter, (_k, v) => typeof v === "string" && dateRegex.exec(v) ? new Date(v) : v);
        } catch (e) {
        }
      }
    }
    return parameter;
  };
  var SerializeParametersTransformer = (_f = class extends OperationNodeTransformer {
    constructor(serializer) {
      super();
      __privateAdd(this, _serializer, void 0);
      __privateSet(this, _serializer, serializer || defaultSerializer);
    }
    transformPrimitiveValueList(node) {
      return {
        ...node,
        values: node.values.map(__privateGet(this, _serializer))
      };
    }
    // https://www.npmjs.com/package/zodsql
    transformColumnUpdate(node) {
      const { value: valueNode } = node;
      if (valueNode.kind !== "ValueNode") {
        return super.transformColumnUpdate(node);
      }
      const { value, ...item } = valueNode;
      const serializedValue = __privateGet(this, _serializer).call(this, value);
      if (value === serializedValue) {
        return super.transformColumnUpdate(node);
      }
      return super.transformColumnUpdate({
        ...node,
        value: { ...item, value: serializedValue }
      });
    }
    transformValue(node) {
      return {
        ...node,
        value: __privateGet(this, _serializer).call(this, node.value)
      };
    }
  }, _serializer = new WeakMap(), _f);
  var SqliteSerializePlugin = (_g = class {
    /**
     * reference from https://github.com/koskimas/kysely/pull/138
     *
     * see {@link SqliteSerializePluginOptions plugin option}
     *
     * The following example will return an error when using sqlite dialects, unless using this plugin:
     *
     * ```ts
     * interface Person {
     *   firstName: string
     *   lastName: string
     *   tags: string[]
     * }
     *
     * interface Database {
     *   person: Person
     * }
     *
     * const db = new Kysely<Database>({
     *   dialect: new SqliteDialect({
     *     database: new Database(":memory:"),
     *   }),
     *   plugins: [
     *     new SqliteSerializePlugin(),
     *   ],
     * })
     *
     * await db.insertInto('person')
     *   .values([{
     *     firstName: 'Jennifer',
     *     lastName: 'Aniston',
     *     tags: ['celebrity', 'actress'],
     *   }])
     *   .execute()
     * ```
     *
     * You can also provide a custom serializer function:
     *
     * ```ts
     * const db = new Kysely<Database>({
     *   dialect: new SqliteDialect({
     *     database: new Database(":memory:"),
     *   }),
     *   plugins: [
     *     new SqliteSerializePlugin({
     *         serializer: (value) => {
     *             if (value instanceof Date) {
     *                 return formatDatetime(value)
     *             }
     *
     *             if (value !== null && typeof value === 'object') {
     *                 return JSON.stringify(value)
     *             }
     *
     *             return value
     *         }
     *     }),
     *   ],
     * })
     * ```
     */
    constructor(opt = {}) {
      __privateAdd(this, _serializeParametersTransformer, void 0);
      __privateAdd(this, _deserializer, void 0);
      __privateAdd(this, _data, void 0);
      __privateSet(this, _serializeParametersTransformer, new SerializeParametersTransformer(
        opt.serializer
      ));
      __privateSet(this, _deserializer, opt.deserializer || defaultDeserializer);
      __privateSet(this, _data, /* @__PURE__ */ new WeakMap());
    }
    transformQuery(args) {
      const { node, queryId } = args;
      if (node.kind === "SelectQueryNode") {
        __privateGet(this, _data).set(queryId, node.kind);
      }
      return __privateGet(this, _serializeParametersTransformer).transformNode(args.node);
    }
    async parseResult(rows) {
      return await Promise.all(rows.map(async (row) => {
        const deserializedRow = { ...row };
        for (const key in deserializedRow) {
          deserializedRow[key] = await __privateGet(this, _deserializer).call(this, deserializedRow[key]);
        }
        return deserializedRow;
      }));
    }
    async transformResult(args) {
      const { result, queryId } = args;
      const { rows } = result;
      const ctx = __privateGet(this, _data).get(queryId);
      if (rows && ctx === "SelectQueryNode") {
        return {
          ...args.result,
          rows: await this.parseResult(rows)
        };
      }
      return args.result;
    }
  }, _serializeParametersTransformer = new WeakMap(), _deserializer = new WeakMap(), _data = new WeakMap(), _g);
  function isString(value) {
    return typeof value === "string";
  }
  function isBoolean(value) {
    return typeof value === "boolean";
  }
  async function createTimeTrigger(kysely, table, event, column, key = "rowid") {
    await sql`
      create trigger if not exists ${sql.raw(table)}_${sql.raw(column)}
      after ${sql.raw(event)}
      on ${sql.table(table)}
      begin
        update ${sql.table(table)}
        set ${sql.ref(column)} = datetime('now','localtime')
        where ${sql.ref(key)} = NEW.${sql.ref(key)};
      end
      `.execute(kysely).catch((err) => {
      console.error(err);
      return void 0;
    });
  }
  function parseTableMap(tables) {
    const map = /* @__PURE__ */ new Map();
    for (const tableName in tables) {
      if (!Object.prototype.hasOwnProperty.call(tables, tableName)) {
        continue;
      }
      const table = tables[tableName];
      map.set(tableName, table);
    }
    return map;
  }
  async function runCreateTable(kysely, tableMap, dropTableBeforeInit = false) {
    for (const [tableName, table] of tableMap) {
      const { columns: columnList, property: tableProperty } = table;
      if (dropTableBeforeInit) {
        await kysely.schema.dropTable(tableName).ifExists().execute().catch();
      }
      let tableSql = kysely.schema.createTable(tableName);
      let _triggerKey = "rowid";
      let _haveAutoKey = false;
      let _insertColumnName = "createAt";
      let _updateColumnName = "updateAt";
      if ((tableProperty == null ? void 0 : tableProperty.timestamp) && !isBoolean(tableProperty.timestamp)) {
        const { create, update } = tableProperty.timestamp;
        _insertColumnName = create ?? "createAt";
        _updateColumnName = update ?? "updateAt";
      }
      for (const columnName in columnList) {
        if (!Object.prototype.hasOwnProperty.call(columnList, columnName)) {
          continue;
        }
        const columnOption = columnList[columnName];
        let dataType = "text";
        const { type, notNull, defaultTo } = columnOption;
        switch (type) {
          case "boolean":
          case "date":
          case "object":
          case "string":
            dataType = "text";
            break;
          case "increments":
            _triggerKey = columnName;
          case "number":
            dataType = "integer";
            break;
          case "blob":
            dataType = "blob";
        }
        if ([_insertColumnName, _updateColumnName].includes(columnName)) {
          continue;
        }
        tableSql = tableSql.addColumn(columnName, dataType, (builder) => {
          if (type === "increments") {
            _haveAutoKey = true;
            return builder.autoIncrement().primaryKey();
          }
          notNull && (builder = builder.notNull());
          defaultTo !== void 0 && (builder = builder.defaultTo(
            defaultTo instanceof Function ? defaultTo(sql) : defaultTo
          ));
          return builder;
        });
      }
      if (tableProperty) {
        const _primary = tableProperty.primary;
        const _unique = tableProperty.unique;
        if (tableProperty.timestamp) {
          if (_insertColumnName) {
            tableSql = tableSql.addColumn(_insertColumnName, "text");
          }
          if (_updateColumnName) {
            tableSql = tableSql.addColumn(_updateColumnName, "text");
          }
        }
        if (!_haveAutoKey && _primary) {
          const is = isString(_primary);
          _triggerKey = is ? _primary : _primary[0];
          tableSql = tableSql.addPrimaryKeyConstraint(`pk_${is ? _primary : _primary.join("_")}`, is ? [_primary] : _primary);
        }
        _unique == null ? void 0 : _unique.forEach((u) => {
          const is = isString(u);
          _triggerKey = !_primary && !_haveAutoKey ? is ? u : u[0] : _triggerKey;
          tableSql = tableSql.addUniqueConstraint(`un_${is ? u : u.join("_")}`, is ? [u] : u);
        });
      }
      await tableSql.ifNotExists().execute();
      if (tableProperty == null ? void 0 : tableProperty.index) {
        for (const i of tableProperty.index) {
          const is = isString(i);
          let _idx = kysely.schema.createIndex(`idx_${is ? i : i.join("_")}`).on(tableName);
          _idx = is ? _idx.column(i) : _idx.columns(i);
          await _idx.ifNotExists().execute();
        }
      }
      if (tableProperty == null ? void 0 : tableProperty.timestamp) {
        _insertColumnName && await createTimeTrigger(kysely, tableName, "insert", _insertColumnName, _triggerKey);
        _updateColumnName && await createTimeTrigger(kysely, tableName, "update", _updateColumnName, _triggerKey);
      }
    }
  }
  var SqliteBuilder = (_h = class {
    constructor(option) {
      __publicField(this, "kysely");
      __privateAdd(this, _status, void 0);
      __privateAdd(this, _tableMap, void 0);
      const { dialect: dialect2, tables, dropTableBeforeInit: truncateBeforeInit, onError, onQuery, plugins: additionalPlugin } = option;
      const plugins = [new SqliteSerializePlugin()];
      additionalPlugin && plugins.push(...additionalPlugin);
      this.kysely = new Kysely({
        dialect: dialect2,
        log: (event) => {
          event.level === "error" ? onError && onError(event.error) : onQuery && onQuery(event.query, event.queryDurationMillis);
        },
        plugins
      });
      __privateSet(this, _status, truncateBeforeInit ? 0 : 1);
      __privateSet(this, _tableMap, parseTableMap(tables));
    }
    async init(dropTableBeforeInit = false) {
      const drop = dropTableBeforeInit || __privateGet(this, _status) === 0;
      await runCreateTable(this.kysely, __privateGet(this, _tableMap), drop);
      __privateSet(this, _status, 2);
      return this;
    }
    async checkInit() {
      __privateGet(this, _status) !== 2 && await this.init();
      if (__privateGet(this, _status) !== 2) {
        throw new Error("fail to init table");
      }
    }
    async transaction(cb, errorLog = false) {
      await this.checkInit();
      return await this.kysely.transaction().execute(cb).catch((err) => {
        errorLog && console.error(err);
        return void 0;
      });
    }
    async exec(cb, errorLog = false) {
      await this.checkInit();
      return cb(this.kysely).catch((err) => {
        errorLog && console.error(err);
        return void 0;
      });
    }
    async toSQL(cb) {
      await this.checkInit();
      return cb(this.kysely).compile();
    }
    async raw(rawSql) {
      await this.checkInit();
      return rawSql(sql).execute(this.kysely);
    }
  }, _status = new WeakMap(), _tableMap = new WeakMap(), _h);
  async function testDB(dialect2) {
    const db = await new SqliteBuilder({
      dialect: dialect2,
      tables: {
        test: {
          columns: {
            id: { type: "increments" },
            name: { type: "string" },
            blobtest: { type: "blob" },
            createAt: { type: "date" },
            updateAt: { type: "date" }
          },
          property: {
            timestamp: true
          }
        }
      }
    }).init();
    console.log("test");
    console.log(await db.raw((sql2) => sql2`PRAGMA table_info(${sql2.table("test")});`));
    for (let i = 0; i < 100; i++) {
      await db.transaction((trx) => {
        return trx.insertInto("test").values({
          name: `test at ${Date.now()}`,
          blobtest: Uint8Array.from([2, 3, 4, 5, 6, 7, 8])
        }).execute();
      });
    }
    return db.exec((db2) => {
      return db2.selectFrom("test").selectAll().execute();
    });
  }
  const dialect = new SqlJsDialect({
    async database() {
      const SQL = await InitSqlJS({
        // locateFile: file => `https://sql.js.org/dist/${file}`,
        locateFile: () => WasmUrl
      });
      return new SQL.Database(await loadFile("sqlijsWorker"));
    },
    onWrite: {
      func(data) {
        console.log(`[sqljs worker] write to indexeddb, length: ${data.length}`);
        writeFile("sqlijsWorker", data);
      }
    }
  });
  onmessage = () => {
    console.log("start sqljs test");
    testDB(dialect).then((data) => {
      data == null ? void 0 : data.forEach((e) => console.log("[sqlijs]", e));
    });
  };
})();
