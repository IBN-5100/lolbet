import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { sql } from '@vercel/postgres';

const scopes = ['identify', 'email']

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.OAUTH_CLIENT_KEY as string,
      clientSecret: process.env.OAUTH_CLIENT_SECRET as string,
      authorization: {params: {scope: scopes.join(' ')}},
    })
  ],
  pages: {
    signIn: '/sign-in'
  },
  callbacks: {
    async signIn({profile}) {
      await sql`
          INSERT INTO users (name, email)
          VALUES (${profile.username}, ${profile.email})
          ON CONFLICT (email) DO NOTHING;
        `;
      return true; 
    },
  },
});
