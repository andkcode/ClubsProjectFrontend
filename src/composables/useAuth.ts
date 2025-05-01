import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

interface AuthResponse {
    message:string;
}

const isAuthenticated = ref<boolean>(false);
const email = ref<string>('');
const password = ref<string>('');
const errorMessage = ref<string>('');

export function useAuth() {
    const router = useRouter();

const login = async (em: string, pass: string): Promise<void> => {
    try {
        const response = await axios.post<AuthResponse>('http://localhost:8080/auth/login', {
            email: em,
            password: pass,
    });
        if(response.status === 200) {
            isAuthenticated.value = true;
            email.value = em;
            password.value = pass;
            localStorage.setItem('auth-token', response.data.message);
            router.push('/')
        } else {
            errorMessage.value = 'Invalid credentials'
        }
    }   catch(error: any) {
        errorMessage.value = 'Authentication failed: ' + (error.response?.data?.message || 'Unknown error');
    }
};

    const logout = (): void => {
        localStorage.removeItem('auth-token');
        isAuthenticated.value = false;
        email.value = '';
        password.value = '';
        router.push('/login');
    };

    const refreshAuth = (): void => {
        const token = localStorage.getItem('auth-token');
        isAuthenticated.value = !!token;
    }

    return {
        isAuthenticated,
        login,
        logout,
        email,
        refreshAuth,
        password,
        errorMessage
    };
}