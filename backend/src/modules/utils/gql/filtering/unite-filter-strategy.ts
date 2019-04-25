const enum UnionOperator {
    And = 'AND',
    Or  = 'OR'
}

export abstract class FilterUnionStrategy {
    protected abstract getOperator():     UnionOperator;
    protected abstract shouldBeNegated(): boolean;

    addOperand(prevQuery: string, operand: string) {
        return (
            prevQuery.length === 0 ? operand   :
            operand.length   === 0 ? prevQuery :
            `${prevQuery} ${this.getOperator()} ${operand}`
        ); 
    }

    wrapOperands(query: string) { 
        return query.length === 0  ? 
            query                  :
            this.shouldBeNegated() ? 
            `NOT (${query})`       : 
            `(${query})`;
    }
}

export class AndFilterUnionStrategy extends FilterUnionStrategy {
    protected getOperator()     { return UnionOperator.And; }
    protected shouldBeNegated() { return false; }
}

export class OrFilterUnionStrategy extends FilterUnionStrategy {
    protected getOperator()     { return UnionOperator.Or; }
    protected shouldBeNegated() { return false; }
}

export class NandFilterUnionStrategy extends FilterUnionStrategy {
    protected getOperator()     { return UnionOperator.And; }
    protected shouldBeNegated() { return true; }
}

export class NorFilterUnionStrategy extends FilterUnionStrategy {
    protected getOperator()     { return UnionOperator.Or; }
    protected shouldBeNegated() { return true; }
}