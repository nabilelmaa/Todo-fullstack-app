import { db } from '@/backend/db';
import { NextRequest, NextResponse } from 'next/server';

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    const { status } = await req.json();
    const updatedTask = await db.task.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json(
      { task: updatedTask },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating task status:', error);
    return NextResponse.json(
      { message: 'Oops...Something went wrong!' },
      { status: 500 }
    );
  }
};

