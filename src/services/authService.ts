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
  console.log("Attempting login with:", { email: credentials.email });
  
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
    
    // First try to get the response as text
    const responseText = await response.text();
    console.log("Raw response:", responseText);
    
    // Try to parse it as JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error("JSON parse error:", e);
      throw new Error(`Invalid server response: ${responseText}`);
    }

    if (!response.ok) {
      console.error("Server error response:", data);
      throw new Error(data.error || 'Invalid credentials');
    }

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