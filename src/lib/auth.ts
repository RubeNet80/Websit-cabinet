import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Mot de passe', type: 'password' },
            },
            async authorize(credentials) {
                const adminEmail = process.env.ADMIN_EMAIL;
                const adminHash = process.env.ADMIN_PASSWORD_HASH;

                console.log('--- Login Attempt Debug ---');
                console.log('Target Email:', adminEmail);
                console.log('Provided Email:', credentials?.email);
                console.log('Hash configured:', !!adminHash);

                if (!adminEmail || !adminHash) {
                    console.error('Admin credentials not configured in environment variables');
                    return null;
                }

                if (credentials?.email !== adminEmail) {
                    console.log('Email mismatch');
                    return null;
                }

                const isValid = await bcrypt.compare(
                    credentials.password as string,
                    adminHash
                );

                if (!isValid) {
                    console.log('Password mismatch');
                    return null;
                }

                console.log('Login successful');

                return {
                    id: '1',
                    email: adminEmail,
                    name: 'Admin',
                };
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.id = user.id;
            return token;
        },
        async session({ session, token }) {
            if (session.user) session.user.id = token.id as string;
            return session;
        },
    },
});
