import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import jose from "node-jose";


export default NextAuth({
    //configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],

    callbacks: {
        async session({ session, token }) {
            session.user.tag = session.user.name.split(" ").join("").toLowerCase()

            session.user.uid = token.sub
            return session
        }
    },

    secret: process.env.JWT_SECRET
})