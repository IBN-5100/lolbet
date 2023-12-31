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
    async signIn({ user, account, profile }) {
      if (!user.email) {
        console.error('Email not provided by Discord provider:', user);
        return false; 
      }

      try {
        const result = await sql`
          SELECT * FROM users WHERE email = ${user.email};
        `;

        if (result.rowCount === 0) {
          await sql`
            INSERT INTO users (name, email) VALUES (${user.name}, ${user.email});
          `;
        }
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false; 
      }

      return true; 
    },
  },
});
