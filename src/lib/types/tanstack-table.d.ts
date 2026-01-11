import "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface FilterFns {
    enumArrayFilter: FilterFn<unknown>;
    assetFilter: FilterFn<unknown>;
  }
}
