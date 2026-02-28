import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
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

                if (!adminEmail || !adminHash) {
                    return null;
                }

                if (credentials?.email !== adminEmail) {
                    console.log('Email mismatch');
                    return null;
                }

                const isPlainMatch = credentials.password === adminHash;
                let isHashMatch = false;

                try {
                    isHashMatch = await bcrypt.compare(credentials.password as string, adminHash);
                } catch (e) {
                    console.error('Bcrypt compare error', e);
                }

                const isValid = isPlainMatch || isHashMatch;

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
    secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
    trustHost: true,
});
