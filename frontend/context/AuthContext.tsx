
'use client';



import { createContext, useEffect, ReactNode, useState } from 'react';
import { SignInRequest, recoverUserInformations } from '@/utils/auth'
import { useRouter } from 'next/navigation';

export type User = {
    token: string;
    email: string;
};

export type AuthContextType = {
    isAuthenticated: boolean;
    user: User | null;
    signIn: (data: { email: string }) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {

    const [user, setUser] = useState<User | null>(null);
    const isAuthenticated = !!user;

    const router = useRouter();

    async function SignIn({ email }: { email: string }) {
        const data = await SignInRequest({ email });

        setUser({
            token: data.token,
            email: data.email
        })
        router.push('/home');
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated: isAuthenticated, user: user, signIn: SignIn }}>
            {children}
        </AuthContext.Provider>
    );
}
