export function ArrayData<T>(arr?: T[]) {
  return {
    data: arr ?? [],
    meta: {
      total: arr?.length ?? 0,
    },
  };
}
