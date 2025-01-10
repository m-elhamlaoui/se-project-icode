// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
}

export function useAuth() {
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: false,
        token: null
    });
    const router = useRouter();

    useEffect(() => {
        // Check for token in localStorage on component mount
        const token = localStorage.getItem('authToken');
        if (token) {
            setAuthState({
                isAuthenticated: true,
                token
            });
        }
    }, []);

    const login = (token: string) => {
        localStorage.setItem('authToken', token);
        setAuthState({
            isAuthenticated: true,
            token
        });
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setAuthState({
            isAuthenticated: false,
            token: null
        });
        router.push('/login');
    };

    return {
        ...authState,
        login,
        logout
    };
}