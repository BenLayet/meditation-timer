import postgres from "postgres";

export const createDatasource = (datasourceProperties) => {
  return postgres(datasourceProperties);
};
