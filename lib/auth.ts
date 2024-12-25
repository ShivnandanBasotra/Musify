import CredentialsProvider from "next-auth/providers/credentials"
import PrismaClient from "./prismaClient"

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          const user: any = await PrismaClient.user.findUnique({
            where: {
              username: credentials?.username,
              password: credentials?.password
            }
          })
          return user
        } catch (error) {
          console.log(error);
          return false
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }:any) {
      if (user) {
        token.id = user.id
        token.username = user.username
      }
      return token
    },
    async session({ session, token }:any) {
      if (session.user) {
        session.user.id = token.id
        session.user.username = token.username
      }
      return session
    }
  },
  pages: {
    signIn: '/signin',
  }
}

export { authOptions };