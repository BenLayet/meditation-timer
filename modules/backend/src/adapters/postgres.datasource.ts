import postgres from "postgres";

export const createDatasource = (datasourceProperties) => {
  return postgres(datasourceProperties);
};
export const datasourceErrorCodes = {
  FOREIGN_KEY_VIOLATION: "23503",
  UNIQUE_VIOLATION: "23505", // Example: Unique Constraint Violation
  CHECK_VIOLATION: "23514", // Example: Check Constraint Violation
  NOT_NULL_VIOLATION: "23502", // Example: Not Null Violation
};
