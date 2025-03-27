import postgres from 'postgres';

const datasourceConfig = {
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    ssl: process.env.DATABASE_SSL_MODE ?? "require",
    port: process.env.DATABASE_PORT ?? 5432,
};

console.debug(`Connecting to PostgreSQL at ${datasourceConfig.host}:${datasourceConfig.port}/${datasourceConfig.database}`);

export const datasource = postgres(datasourceConfig)