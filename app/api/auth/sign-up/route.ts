import { db } from '@/backend/db';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: 'Username, email, and password are required' },
        { status: 400 }
      );
    }

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists with this email' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: 'User registered successfully', user },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json(
      { message: 'Oops...Something went wrong!' },
      { status: 500 }
    );
  }
};
