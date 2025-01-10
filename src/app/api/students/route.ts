import { NextResponse } from "next/server";

export async function GET(){
    const students = [
        { id: 1, name: 'Alice', age: 20, major: 'Computer Science' },
        { id: 2, name: 'Bob', age: 22, major: 'Mathematics' },
        { id: 3, name: 'Charlie', age: 19, major: 'Physics' },
    ]
    return NextResponse.json(students);
}