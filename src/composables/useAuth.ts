import { ref } from 'vue';
import axios from 'axios';
import { toast } from 'vue-sonner'
interface AuthResponse {
    token: string;
}

const isAuthenticated = ref<boolean>(false);
const email = ref<string>('');
const password = ref<string>('');
const username = ref<string>('');
const errorMessage = ref<string>('');

const initAuth = (): void => {
    refreshAuth();
    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                console.log("401 Unauthorized detected, clearing token");
                isAuthenticated.value = false;
                localStorage.removeItem('auth-token');
            }
            return Promise.reject(error);
        }
    );
};

const login = async (em: string, pass: string, router: any): Promise<void> => {
    try {
        const response = await axios.post<AuthResponse>('http://localhost:8080/auth/login', {
            email: em,
            password: pass,
        });
        
        if (response.status === 200 && response.data.token) {
            isAuthenticated.value = true;
            email.value = em;
            password.value = ''; 
            
            localStorage.setItem('auth-token', response.data.token);
            console.log("Login successful, token stored");
            
            router.push('/');
        } else {
            toast.error('Invalid credentials');
        }
    } catch (error: any) {
        console.error("Login error:", error);
        toast.error('Invalid credentials');
    }
};

const register = async (em: string, pass: string, us: string, router: any): Promise<void> => {
    try {
        const response = await axios.post<AuthResponse>('http://localhost:8080/auth/register', {
            email: em,
            password: pass,
            username: us,
        });
        
        if (response.status === 200 && response.data.token) {
            isAuthenticated.value = true;
            email.value = em;
            username.value = us;
            password.value = ''; 
            
            localStorage.setItem('auth-token', response.data.token);
            console.log("Registration successful, token stored");
            
            router.push('/');
        } else {
            errorMessage.value = 'Invalid credentials';
        }
    } catch (error: any) {
        console.error("Registration error:", error);
        errorMessage.value = 'Registration failed: ' + (error.response?.data?.message || 'Unknown error');
    }
};

const logout = (router: any): void => {
    localStorage.removeItem('auth-token');
    isAuthenticated.value = false;
    email.value = '';
    password.value = '';
    console.log("User logged out, token removed");
    router.push('/login');
};

const refreshAuth = (): void => {
    const token = localStorage.getItem('auth-token');
    isAuthenticated.value = !!token;
};

const getAuthHeader = (contentType = 'application/json') => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
        console.warn("No auth token found in localStorage");
        return {};
    }
    
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': contentType
        }
    };
};

initAuth();

export function useAuth() {
    return {
        isAuthenticated,
        login,
        register,
        logout,
        username,
        email,
        password,
        refreshAuth,
        errorMessage,
        getAuthHeader
    };
}