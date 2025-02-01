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

console.log('Database pool created');

export default pool;