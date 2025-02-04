interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  id: number;
  email: string;
  role: 'superuser' | 'admin' | 'operator' | 'user';
}

// Update API_URL to use the correct path
const API_URL = '/src/server'; // Remove http://localhost since we're using relative path

export const login = async (credentials: LoginCredentials): Promise<User> => {
  console.log("Making login request to:", `${API_URL}/auth.php`);
  console.log("With credentials:", { email: credentials.email });
  
  try {
    const response = await fetch(`${API_URL}/auth.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'login',
        ...credentials,
      }),
      credentials: 'include',
    });

    console.log("Login response status:", response.status);
    
    const data = await response.json();
    console.log("Login response data:", data);

    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    if (!data.success || !data.user) {
      throw new Error('Invalid response format');
    }

    return data.user;
  } catch (error: any) {
    console.error("Login error in service:", error);
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error("Connection error - Unable to reach the server");
    }
    if (error.message === "Invalid credentials") {
      throw new Error("Invalid email or password");
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
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