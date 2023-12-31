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
      let username = profile?.username;
      let email = profile?.email;
      if (typeof username == 'string' && typeof email == 'string') {
      await sql`
        INSERT INTO users (name, email)
        VALUES (${username}, ${email})
        ON CONFLICT (email) DO NOTHING;
      `;
    } else {
      console.error('nonstring:', profile);
      return false;
    }
      return true; 
    },
  },
});
