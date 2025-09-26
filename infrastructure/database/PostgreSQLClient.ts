import pg, { Client as PGClient, Pool as PGPool } from 'pg'
const { Pool, Client } = pg

export class PostgreSQLClient {

    public pool: PGPool;

    constructor() {
        this.pool = new Pool({
            user: process.env.PGUSER,
            password: process.env.PGPASSWORD,
            host: process.env.PGHOST,
            port: process.env.PGPORT,
            database: process.env.PGDATABASE,
        })
    }

    public async query(query: string | { text: string; values?: any[]; name?: string }) {
        try {
            const res = await this.pool.query(query)
            return res.rows
        } catch (error) {
            console.error('PostgreSQL query error:', error)
            throw error
        }
    }

    public async close() {
        await this.pool.end()
    }

}