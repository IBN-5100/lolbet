import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

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
      const email = user.email;
      const name = user.name;

      if (email) {
        const existingUser = await sql`
          SELECT * FROM users WHERE email = ${email};
        `;
        if (existingUser.count === 0) {
          await sql`
            INSERT INTO users (name, email) VALUES (${name}, ${email});
          `;
        }
      }
      return true;
    },
  },
});
