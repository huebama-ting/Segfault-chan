import { dbUser, dbPass, dbName } from '../../config.json';

import { createPool } from 'mysql2/promise';

const pool = createPool({
  host: 'localhost',
  user: dbUser,
  password: dbPass,
  database: dbName,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function executeQuery(query: string, args: string[]): Promise<any> {
  const connection = await pool.getConnection();
  const [results, metadata] = await connection.execute(query, args);

  return results;
}
