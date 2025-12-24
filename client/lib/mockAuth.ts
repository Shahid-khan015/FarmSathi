import { mockUsers, User } from "@/data/mockData";

export interface AuthCredentials {
  phone: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}

// Dummy credentials for testing
// Format: phone -> password
const DUMMY_CREDENTIALS: Record<string, string> = {
  "9876543210": "operator123", // Ramesh Kumar - Operator
  "9876543212": "farmer123", // Vijay Sharma - Farmer
  "9876543214": "owner123", // Mahesh Agarwal - Owner
};

/**
 * Mock login function - validates credentials against dummy data
 * Returns the user if login successful
 */
export function mockLogin(credentials: AuthCredentials): AuthResponse {
  const { phone, password } = credentials;

  // Validate credentials
  if (!phone || !password) {
    return {
      success: false,
      error: "Phone and password are required",
    };
  }

  // Check if credentials exist
  const validPassword = DUMMY_CREDENTIALS[phone];
  if (!validPassword) {
    return {
      success: false,
      error: "Invalid phone number or password",
    };
  }

  // Check password
  if (validPassword !== password) {
    return {
      success: false,
      error: "Invalid phone number or password",
    };
  }

  // Find and return user
  const user = mockUsers.find((u) => u.phone === phone);
  if (!user) {
    return {
      success: false,
      error: "User not found",
    };
  }

  return {
    success: true,
    user,
  };
}

/**
 * Mock register function - creates a new user with dummy credentials
 * For demo purposes, only allows registering with existing dummy accounts
 */
export function mockRegister(
  credentials: AuthCredentials & { name: string },
): AuthResponse {
  const { phone, password, name } = credentials;

  // For this demo, we'll register by matching with existing dummy accounts
  // In production, this would create a new entry in a database
  const validPassword = DUMMY_CREDENTIALS[phone];

  if (!validPassword) {
    return {
      success: false,
      error: "Registration failed. Please use a valid phone number.",
    };
  }

  // Find existing user or create a mock one
  let user = mockUsers.find((u) => u.phone === phone);

  if (!user) {
    // Create a new mock user
    user = {
      id: `user_${Date.now()}`,
      name,
      phone,
      role: "farmer", // Default role for new registrations
    };
  }

  return {
    success: true,
    user,
  };
}

/**
 * Get dummy credentials for demo purposes
 */
export function getDummyCredentials() {
  return [
    {
      role: "Farmer",
      phone: "9876543212",
      password: "farmer123",
      name: "Vijay Sharma",
    },
    {
      role: "Operator",
      phone: "9876543210",
      password: "operator123",
      name: "Ramesh Kumar",
    },
    {
      role: "Owner",
      phone: "9876543214",
      password: "owner123",
      name: "Mahesh Agarwal",
    },
  ];
}
