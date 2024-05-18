// pages/api/signin.ts
import { NextApiRequest, NextApiResponse } from 'next';

import { query } from '../../lib/db';

interface User {
  id: number;
  username: string;
  password: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body;
  console.log('username', username);
    console.log('password', password);

  const result = await query('SELECT * FROM users WHERE username = $1', [username]);
  console.log(result);
  const user: User = result.rows[0];
  console.log('user', user);

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  if (password !== user.password) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  
  res.json(user);
};

export default handler;
