import { db } from '@/backend/db';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    await db.task.delete({
      where: { id },
    });
    return NextResponse.json(
      { message: 'Task deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json(
      { message: 'Oops...Something went wrong!' },
      { status: 500 }
    );
  }
};
