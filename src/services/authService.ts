interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  id: number;
  email: string;
  role: 'superuser' | 'admin' | 'operator' | 'user';
}

const API_URL = 'http://localhost/src/server'; // Update this with your actual server URL

export const login = async (credentials: LoginCredentials): Promise<User> => {
  console.log("Making login request to:", `${API_URL}/auth.php`);
  
  const response = await fetch(`${API_URL}/auth.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'login',
      ...credentials,
    }),
    credentials: 'include', // Important for handling cookies
  });

  console.log("Login response status:", response.status);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("Login error:", errorData);
    throw new Error(errorData.error || 'Login failed');
  }

  const data = await response.json();
  console.log("Login success data:", data);
  
  if (!data.success || !data.user) {
    throw new Error('Invalid response format');
  }

  return data.user;
};

export const register = async (credentials: LoginCredentials): Promise<void> => {
  const response = await fetch(`${API_URL}/auth.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'register',
      ...credentials,
    }),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }
};