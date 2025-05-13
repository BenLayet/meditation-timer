export class UserRepository {
    constructor(datasource) {
        this.datasource = datasource;
    }
    async createUser(email) {
        await insertUserIfNecessary(this.datasource, email);
        const { uuid } = await selectUserUuid(this.datasource, email);
        return { uuid, email };
    }
}
const insertUserIfNecessary = async (datasource, email) => datasource`
        INSERT INTO users (uuid, email)
        VALUES (${createUuid()}, ${email})
        ON CONFLICT (email) DO NOTHING`;
const selectUserUuid = async (datasource, email) => datasource`
        SELECT uuid
        FROM users
        WHERE email = ${email}
        LIMIT 1`;