import { ref } from 'vue';
import axios from 'axios';
import { toast } from 'vue-sonner';

interface AuthResponse {
    token: string;
    newToken: string,
}

const isAuthenticated = ref<boolean>(false);
const email = ref<string>('');
const password = ref<string>('');
const username = ref<string>('');
const errorMessage = ref<string>('');
const newPassword = ref<string>('');
const newToken = ref<string>(''); 

const initAuth = (): void => {
    refreshAuth();
    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                console.log("401 Unauthorized detected, clearing token");

                toast('401 Unauthorized detected', {
                    description: 'Clearing token',
                    duration: 2000,
                    type: 'error',
                    position: 'top-right', 
                });

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

            toast('Login successful', {
                duration: 1000,
                type: 'success',
                position: 'bottom-right', 
            });

            setTimeout(() => {
                router.push('/');
            }, 1100);

        } else {
            toast('Invalid credentials', {
                duration: 2000,
                type: 'error',
                position: 'top-right', 
            });
        }
    } catch (error: any) {
        console.error("Login error:", error);

        toast('Login error', {
            description: 'Incorrect email or password',
            duration: 2500,
            type: 'error',
            position: 'top-right', 
        });
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

            toast('Registration successful', {
                duration: 1000,
                position: 'bottom-right', 
                type: "success"
            });
              
            setTimeout(() => {
                router.push('/');
            }, 1100);

        } else {
            toast('Invalid credentials', {
                duration: 2500,
                position: 'top-right',
                type: 'error',
            });
        }
    } catch (error: any) {
        console.error("Registration error:", error);

        errorMessage.value = 'Registration failed: ' + (error.response?.data?.message || 'Unknown error');

        toast('Registration failed', {
            description: error.response?.data?.message || 'Unknown error',
            duration: 2500,
            position: 'top-right',
            type: 'error',
        });
    }
};

const logout = (router: any): void => {
    localStorage.removeItem('auth-token');
    isAuthenticated.value = false;
    email.value = '';
    username.value = '';
    password.value = '';
    console.log("User logged out, token removed");

    toast('User logged out', {
        description: 'You have been logged out',
        duration: 2500,
        position: 'top-left', 
        type: 'info',
    });

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

        toast('Token Error', {
            description: 'No auth token found in localStorage',
            duration: 2500,
            position: 'top-right', 
            type: 'error',
        });
          
        return {};
    }
    
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': contentType
        }
    };
};

const forgotPassword = async (emailToSend: string): Promise<void> => {
    try {
        await axios.post<AuthResponse>('http://localhost:8080/auth/forgot-password', { email: emailToSend });

        toast('Reset link sent', {
            description: 'Check your email for a reset link',
            duration: 3000,
            position: 'top-right',
            type: 'success',
        });
    } catch (error: any) {
        console.error("Forgot password error:", error);
        toast('Failed to send reset link', {
            description: error.response?.data?.message || 'Unknown error',
            duration: 3000,
            position: 'top-right',
            type: 'error',
        });
    }
};

const resetPassword = async (newt: string, newp: string): Promise<void> => {
    try {
        await axios.post<AuthResponse>('http://localhost:8080/auth/reset-password', {
            newToken: newt,
            newPassword: newp
        });

        toast('Password reset successful', {
            duration: 2000,
            position: 'top-right',
            type: 'success',
        });

    } catch (error: any) {
        console.error("Reset password error:", error);
        toast('Failed to reset password', {
            description: error.response?.data?.message || 'Unknown error',
            duration: 2000,
            position: 'top-right',
            type: 'error',
        });
    }
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
        getAuthHeader,
        forgotPassword,
        newPassword,
        newToken,
        resetPassword
    };
}