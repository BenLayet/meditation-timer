import postgres from "postgres";

export const createDatasource = (datasourceProperties) => {
  console.debug("Datasource configuration:", {...datasourceProperties,password: "***HIDDEN FROM LOGS***"});
  return postgres(datasourceProperties);
};
