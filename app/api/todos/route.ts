import { db } from '@/backend/db';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export const GET = async (req: NextRequest) => {
  const decodedToken = await verifyToken(req);

  if (decodedToken instanceof NextResponse) {
    return decodedToken;
  }

  const userId = decodedToken.userId;

  try {
    const tasks = await db.task.findMany({
      where: { userId },
    });
    return NextResponse.json(
      { tasks },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { message: 'Unable to fetch tasks' },
      { status: 500 }
    );
  }
};
