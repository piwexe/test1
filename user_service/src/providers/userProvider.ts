import pool from '../db/pool';

interface User {
  id: number;
  name: string;
  email: string;
}

// Функция для создания пользователя
export const createUser = async (name: string, email: string): Promise<User> => {
  const client = await pool.connect();
  try {
    const result = await client.query<User>(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

// Функция для обновления пользователя
export const updateUser = async (id: number, name: string, email: string): Promise<User | null> => {
  const client = await pool.connect();
  try {
    const result = await client.query<User>(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    );
    return result.rows.length > 0 ? result.rows[0] : null;
  } finally {
    client.release();
  }
};

// Функция для получения списка пользователей
export const getUsers = async (): Promise<User[]> => {
  const client = await pool.connect();
  try {
    const result = await client.query<User>('SELECT * FROM users');
    return result.rows;
  } finally {
    client.release();
  }
};
