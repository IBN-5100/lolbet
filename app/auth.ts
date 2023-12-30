import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  providers: [
    Github({
      clientId: process.env.OAUTH_CLIENT_KEY as string,
      clientSecret: process.env.OAUTH_CLIENT_SECRET as string,
    })
  ],
  pages: {
    signIn: '/sign-in'
  }
});
