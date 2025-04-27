import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

interface AuthResponse {
    message:string;
}

export function useAuth() {
    const isAuthenticated = ref<boolean>(false);
    const username = ref<string>('');
    const password = ref<string>('');
    const errorMessage = ref<string>('');
    const router = useRouter();

const login = async (user: string, pass: string): Promise<void> => {
    try {
        const response = await axios.post<AuthResponse>('http://localhost:8080/auth/login', {
            username: user,
            password: pass,
    });
        if(response.status === 200) {
            isAuthenticated.value = true;
            username.value = user;
        } else {
            errorMessage.value = 'Invalid credentials'
        }
    }   catch(error:any) {
        errorMessage.value = 'Authentication failed: ' + (error.response?.data?.message || 'Unknown error');
    }
};

    const logout = (): void => {
        isAuthenticated.value = false;
        username.value = '';
        password.value = '';
    };

    return {
        isAuthenticated,
        login,
        logout,
        username,
        password,
        errorMessage
    };
}