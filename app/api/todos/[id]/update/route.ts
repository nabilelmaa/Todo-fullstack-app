import { db } from '@/backend/db';
import { NextRequest, NextResponse } from 'next/server';

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    const { title, description, dueDate } = await req.json();
    const updatedTask = await db.task.update({
      where: { id },
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });
    return NextResponse.json(
      { task: updatedTask },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { message: 'Oops...Something went wrong!' },
      { status: 500 }
    );
  }
};
