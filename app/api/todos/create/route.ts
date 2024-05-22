
import { db } from '@/backend/db';
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
      const { title, description, dueDate, status } = await req.json();
      const newTask = await db.task.create({
        data: {
          title,
          description,
          dueDate: dueDate ? new Date(dueDate) : null,
          status
        }
      });
      return NextResponse.json(
        { task: newTask },
        { status: 201 }
      );
    } catch (error) {
      console.error('Error creating task:', error);
      return NextResponse.json(
        { message: 'Oops...Something went wrong!' },
        { status: 500 }
      );
    }
  }
  