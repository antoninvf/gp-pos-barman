import axios from 'axios';
import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/auth/login',
		//signOut: '/auth/logout',
		error: '/auth/login', // Error code passed in query string as ?error=
	},
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: 'Credentials',
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				username: { label: 'Username', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				if (credentials == null) return null;

				const res = await axios({
					method: 'POST',
					url: 'http://localhost:8001/user/login',
					data: credentials,
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (res.status == 200) {
					const user = await res.data;
					return user;
				} else if (res.status === 401) {
					return null;
				}
				// Return null if user data could not be retrieved
				return null;
			},
		}),
	],
};

export default NextAuth(authOptions);
