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

// Test the connection
pool.getConnection()
  .then(connection => {
    console.log('Successfully connected to the database');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });

export default pool;