interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  id: number;
  email: string;
  role: 'superuser' | 'admin' | 'operator' | 'user';
}

const API_URL = '/src/server';

export const login = async (credentials: LoginCredentials): Promise<User> => {
  console.log("Making login request to:", `${API_URL}/auth.php`);
  console.log("With credentials:", { email: credentials.email });
  
  try {
    const response = await fetch(`${API_URL}/auth.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        action: 'login',
        ...credentials,
      }),
    });

    console.log("Login response status:", response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Server error response:", errorData);
      throw new Error(errorData.error || 'Invalid credentials');
    }

    const data = await response.json();
    console.log("Login response data:", data);

    if (!data.success) {
      console.error("Login unsuccessful:", data.error);
      throw new Error(data.error || 'Login failed');
    }

    return data.user;
  } catch (error: any) {
    console.error("Login error in service:", error);
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error("Connection error - Unable to reach the server");
    }
    throw error;
  }
};

export const register = async (credentials: LoginCredentials): Promise<void> => {
  const response = await fetch(`${API_URL}/auth.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      action: 'register',
      ...credentials,
    }),
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }
};