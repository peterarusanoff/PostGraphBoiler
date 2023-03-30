import { Service } from 'typedi';
import { Client } from 'pg';

import { databases } from './db';
import { Payload } from './models';

@Service()
export class PayloadService {
    async fetchPayload(id: number, column?: string, filter?: string, value?: string): Promise<Payload> {
        const databaseCredentials = databases.find(d => d.id && +d.id === id);

        if (!databaseCredentials) throw new Error('Invalid ID!');

        const client = new Client({
            host: databaseCredentials.host,
            port: +(databaseCredentials.port || 5432),
            user: databaseCredentials.username,
            password: databaseCredentials.password,
            database: databaseCredentials.database,
            ssl: {
                rejectUnauthorized: false,
            },
        });

        await client.connect();
        
        let query = 'SELECT * FROM table_name';

        if (column && filter && value) {
          query += ` WHERE "${column}"`;

          switch (filter) {
            case 'equal':
              query += ` = $1`;
              break;
            case 'greater':
              query += ` > $1`;
              break;
            case 'less':
              query += ` < $1`;
              break;
            case 'contains':
              query += ` LIKE '%' || $1 || '%'`;
              break;
            case 'starts':
              query += ` LIKE $1 || '%'`;
              break;
            case 'ends':
              query += ` LIKE '%' || $1`;
              break;
            case 'before':
              query += ` < $1`;
              break;
            case 'after':
              query += ` > $1`;
              break;
            default:
              throw new Error('Invalid filter option!');
          }
        }

        const result = await client.query(query, value ? [value] : undefined);
        await client.end();

        return {
            id,
            data: result.rows,
        };
    }
}
