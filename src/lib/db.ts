import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: '34.101.240.126',
  port: 3306,
  user: 'lovableuser',
  password: 'Star*123',
  database: 'lovabledevlovable',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log('MySQL connection pool created');

export const executeQuery = async <T>(query: string, params: any[] = []): Promise<T> => {
  try {
    console.log('Executing query:', query);
    const [rows] = await pool.execute(query, params);
    return rows as T;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

export default pool;