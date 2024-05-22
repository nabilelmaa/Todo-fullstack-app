import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';


export const POST = async (req: NextRequest) => {
    try {
      const body = await req.json();
        const { username, email, password } = body;
  
        const existingUser = await prisma.user.findUnique({
          where: { email },
        });
  
        if (existingUser) {
          return NextResponse.json(
            { user: null, message: 'User with this email already exists!' },
            { status: 409 }
        );
        }
  
        const user = await prisma.user.create({
          data: {
            username,
            email,
            password,
          },
        });
  
        return NextResponse.json(
          { user: { id: user.id, email: user.email }},
          { status: 200 }
      );
      } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json(
          { message: 'Oops...Something went wrong!' },
          { status: 500 }
      );
      }
};

