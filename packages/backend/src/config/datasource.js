import postgres from "postgres";

export const createDatasource = (datasourceConfig) => {
  console.debug("Datasource configuration:", {...datasourceConfig,password: "***HIDDEN FROM LOGS***"});
  return postgres(datasourceConfig);
};
