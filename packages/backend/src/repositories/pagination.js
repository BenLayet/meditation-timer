export const MAX_PAGE_SIZE = 100;

export const validatePageRequest = (pageRequest) => {
  if (!pageRequest) throw new Error("Page request cannot be null or undefined");
  if (typeof pageRequest.afterId !== "number")
    throw new Error("afterId must be a number");
  if (pageRequest.afterId < 0)
    throw new Error("afterId must be greater or equal to zero");
  if (typeof pageRequest.size !== "number") throw new Error("size must be a number");
  if (pageRequest.size <= 0) throw new Error("size must be greater than zero");
  if (pageRequest.size > MAX_PAGE_SIZE)
    throw new Error(`size must be less than or equal to ${MAX_PAGE_SIZE}`);
};
export const toPage = (pageSize, toEntities) => (rows) => {
    const entities = toEntities(rows);
    const hasNextPage = entities.length === pageSize;
    return {
      data: entities,
      nextPage: hasNextPage
        ? { afterId: entities[entities.length - 1].id, size: pageSize }
        : null,
    };
  };