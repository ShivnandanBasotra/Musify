import PrismaClient from "@/lib/prismaClient";
import { createSpaceSchema } from "@/lib/zodValidations";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const userId = req.headers.get('userId');
    try {
        if (!userId) return NextResponse.json({error:"user unauthenicated"},{status:411})
        const spaces = await PrismaClient.space.findMany({
            orderBy: {
                createdAt: "desc"
            },
            where: {
                userId
            }
        })
        return NextResponse.json({
            spaces
        }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: "error in get spaces api route"
        }, { status: 400 })
    }
}

export async function POST(req: NextRequest) {
    const { name, description } = await req.json();
    const userId = req.headers.get('userId');
    try {
        if (!userId) return NextResponse.json({ error: "user unauthenticated" });
        const result = createSpaceSchema.safeParse({ name, description });
        if (!result.success) return NextResponse.json({ error: result.error.errors }, { status: 400 });
        const existingSpace = await PrismaClient.space.findUnique({
            where: {
                name
            }
        })
        if (existingSpace) return NextResponse.json({ error: "space with this name already exists, choose other name" });
        const space = await PrismaClient.space.create({
            data: {
                name,
                description,
                userId
            }
        })
        return NextResponse.json({ message: "Space created successfully", space }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: "error in create space api route"
        }, { status: 400 })
    }
}