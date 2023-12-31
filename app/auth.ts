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
    async signIn({ user }) {

        const existingUser = await sql`
          SELECT * FROM users WHERE email = ${user.email};
        `;
        if (existingUser.rowCount === 0) {
          await sql`
            INSERT INTO users (name, email) VALUES (${user.name}, ${user.email});
          `;
        }
      return true;
    },
  },
});
