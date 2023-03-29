import { Service } from 'typedi';
import { Client } from 'pg'

import { databases } from './db'
import { Payload } from './models';

@Service()
export class PayloadService {
    fetchPayload(id: number): Payload {

        const databaseCredentials = databases.find(d => d.id && +d.id === id)

        if (!databaseCredentials) throw new Error('Invalid ID!')

        const client = new Client({
            host: databaseCredentials.host,
            port: +(databaseCredentials.port || 5432),
            user: databaseCredentials.username,
            password: databaseCredentials.password,
            database: databaseCredentials.database,
            ssl: {
                rejectUnauthorized: false,
            },
        })

        return {
            id,
            data: []
        }
    }
}