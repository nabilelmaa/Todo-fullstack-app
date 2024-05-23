import { db } from '@/backend/db';
import { NextRequest, NextResponse } from 'next/server';


export const GET = async(req: NextRequest, res: NextResponse) => {
    try {
      const todos = await db.task.findMany();
      return NextResponse.json(
        { todos: todos },
        { status: 200 }
    );
    } catch (error) {
      console.error('Error fetching todos:', error);
      return NextResponse.json(
        { message: 'Oops...Something went wrong!' },
        { status: 500 }
    );
    }
}