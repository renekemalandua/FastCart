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
    signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const isAuthenticated = !!user;

    const router = useRouter();

    const fetchUser = async () => {

        const sessionId = sessionStorage.getItem('sessionId');
        if (!sessionId) return router.push('/');

        try {
            const response = await fastCartApi.get(`/auth/me/${sessionId}`);
            const { email } = response.data;

            setUser({
                token: sessionId,
                email,
            });
        } catch (error) {
            console.error('Erro ao carregar sessão', error);
            sessionStorage.removeItem('sessionId');
            setUser(null);
            router.push('/');
        }
    };
    
    async function signIn({ email }: { email: string }) {
        try {
            const response = await fastCartApi.post('/auth/login', { email });

            const { sessionId } = response.data;
            sessionStorage.setItem('sessionId', sessionId);

            router.push('/home');
            await fetchUser();
        } catch (error) {
            console.error('Erro ao fazer login', error);
        }
    }

    async function signOut() {
        if (user?.token) {
            try {
                await fastCartApi.post(`/auth/logout${user?.token}`);
                sessionStorage.removeItem('sessionId');
            } catch (error) {
                console.error('Erro ao fazer logout', error);
            }
        }

        sessionStorage.removeItem('sessionId');
        setUser(null);
        router.push('/');
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}