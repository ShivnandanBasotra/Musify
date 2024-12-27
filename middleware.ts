import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

function authMiddleware(req:any) { /* here why we didn't make the req type of NextRequest beacause this req would would come from the withAuth and it has its different types thats why we can access req.nextauth.token other wise in req: NextRequest nexauth is not accessible */
    const token = req.nextauth.token
    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const response = NextResponse.next()
    response.headers.set("userId", token.sub || "")
    return response
}

export default withAuth( /* this with auth passes its req in which there is req.neaxth.token and we can access this token */
    async function middleware(req) {
        const { pathname } = req.nextUrl
        
        if (pathname.startsWith("/api/")) {
            return authMiddleware(req)
        }
        
        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
)

export const config = { 
    matcher: ["/dashboard(.*)", "/api(.*)"] 
}