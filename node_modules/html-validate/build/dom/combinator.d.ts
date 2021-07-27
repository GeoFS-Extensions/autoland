export declare enum Combinator {
    DESCENDANT = 0,
    CHILD = 1,
    ADJACENT_SIBLING = 2,
    GENERAL_SIBLING = 3
}
export declare function parseCombinator(combinator: string): Combinator;
