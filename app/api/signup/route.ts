// create api for signup
// connect it to frontend
// sigin using nextauth options by accessing the db user data and vaildating it

import PrismaClient from "@/lib/prismaClient";
import { signupSchema } from "@/lib/zodValidations";
import { NextRequest, NextResponse } from "next/server";




export async function POST (req:NextRequest){
 const {username, password, firstName, lastName} = await req.json();
 try {  
    const result = signupSchema.safeParse({username,password,firstName,lastName});
    if (!result.success) return NextResponse.json({error: result.error.errors},{status:400});
    const existingUser = await PrismaClient.user.findFirst({
        where:{
            username
        }
    })
    if (existingUser) return NextResponse.json({error: "user already exist with this username"},{status:400});
    const user = await PrismaClient.user.create({
        data:{
            username,
            password,
            firstName,
            lastName
        }
    })
    return NextResponse.json({
        message: "user created successully",
        user
    },{status:201})
 } catch (error) {
    console.log(error);
    return NextResponse.json({
        error: "error ocurred in signup route"
    },{status:400}) 
 }
}