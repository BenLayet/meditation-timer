export const toPage = (pageSize, toEntities) => (rows) => {
    const entities = toEntities(rows);
    const hasNextPage = entities.length === pageSize;
    return {
      entities,
      nextPage: hasNextPage
        ? { afterId: entities[entities.length - 1].id, size: pageSize }
        : null,
    };
  };

