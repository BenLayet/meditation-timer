export const toPage = (pageRequest, toEntities) => (rows) => {
  const entities = toEntities(rows);
  const hasNextPage = entities.length === pageRequest.size;
  const lastId =
    entities.length > 0
      ? entities[entities.length - 1].id
      : pageRequest.afterId;
  return {
    entities,
    hasNextPage,
    lastId,
  };
};
