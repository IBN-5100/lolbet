import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.OAUTH_CLIENT_KEY as string,
      clientSecret: process.env.OAUTH_CLIENT_SECRET as string,
    })
  ],
  pages: {
    signIn: '/sign-in'
  }
});
