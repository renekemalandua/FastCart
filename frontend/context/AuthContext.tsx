'use client';

import { createContext, useEffect, ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fastCartApi } from '@/utils/axios';

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

    async function signIn({ email }: { email: string }) {
        try {
            const response = await fastCartApi.post('/auth/login', { email });

            const { sessionId, email: returnedEmail } = response.data;

            setUser({
                token: sessionId,
                email: returnedEmail,
            });

            router.push('/home');
        } catch (error) {
            console.error('Erro ao fazer login', error);
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, signIn }}>
            {children}
        </AuthContext.Provider>
    );
}