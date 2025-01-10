import { NextResponse } from "next/server";

export async function GET(){
    return NextResponse.json([
        {message:"hello from API1"},
        {message:"hello from API2"},
    ])
}