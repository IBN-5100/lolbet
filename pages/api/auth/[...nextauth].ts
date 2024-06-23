import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

const scopes = ['identify', 'email'];

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.OAUTH_CLIENT_KEY as string,
      clientSecret: process.env.OAUTH_CLIENT_SECRET as string,
      authorization: { params: { scope: scopes.join(' ') } }
    })
  ],
  pages: {
    signIn: '/sign-in'
  },
  callbacks: {
    async signIn({ profile }) {
      let username = profile?.username;
      let email = profile?.email;
      if (typeof username == 'string' && typeof email == 'string') {
        // // const check = await sql`
        // //   SELECT * FROM users WHERE email = ${email};
        // // `;
        const check = { rowCount: 0 };
        if (check.rowCount === 0) {
          // await sql`
          //   INSERT INTO users (name, email) VALUES (${username}, ${email});
          // `;
        }
      } else {
        console.error('nonstring:', profile);
        return false;
      }
      return true;
    }
  }
});
