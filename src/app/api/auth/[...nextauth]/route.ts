import NextAuth, { DefaultSession, NextAuthOptions } from 'next-auth'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import GithubProvider, { GithubProfile } from 'next-auth/providers/github'
import FacebookProvider, { FacebookProfile } from 'next-auth/providers/facebook'

import { PrismaAdapter } from '@next-auth/prisma-adapter'

import { prisma } from '../../../../../prisma/prismaClient'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user']
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      profile: (profile: GoogleProfile) => {
        return {
          id: profile.email,
          email: profile.email,
          image: profile.picture,
          name: `${profile.given_name} ${profile.family_name}`,
        }
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
      profile: (profile: FacebookProfile) => {
        return {
          id: profile.id,
          image: profile.picture.data.url,
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      profile: (profile: GithubProfile) => {
        return {
          id: profile.id.toString(),
          email: profile.email,
          image: profile.avatar_url,
          name: profile.name,
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub || ''
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }