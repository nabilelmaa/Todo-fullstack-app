import { db } from '@/backend/db';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await verifyToken(req);

    const { title, description, dueDate, status } = await req.json();

    if (!title || !status) {
      return NextResponse.json(
        { message: 'Title and status are required' },
        { status: 400 }
      );
    }

    const task = await db.task.create({
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        status,
        userId,
      },
    });

    return NextResponse.json(
      { task },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { message: 'Unable to create task' },
      { status: 500 }
    );
  }
};
