// import { NextApiRequest, NextApiResponse } from 'next';
// import { prisma } from '@/lib/prisma';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     try {
//       const { username, email, password } = req.body;

//       const existingUser = await prisma.user.findUnique({
//         where: { email },
//       });

//       if (existingUser) {
//         return res.status(409).json({ message: 'User with this email already exists!' });
//       }

//       const newUser = await prisma.user.create({
//         data: {
//           username,
//           email,
//           password,
//         },
//       });

//       return res.status(201).json({ user: newUser, message: 'User created successfully!' });
//     } catch (error) {
//       console.error('Error creating user:', error);
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   } else if (req.method === 'GET') {
//     try {
//       const users = await prisma.user.findMany();
//       return res.status(200).json(users);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   } else {
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }
// }
