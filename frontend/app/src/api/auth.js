// API client connecting to backend auth routes

export async function loginUser({ identifier, password }) {
  // Backend checks: username OR email
  const payload = {
    username: identifier,
    email: identifier,
    password,
  };

  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMsg = data?.message || (typeof data === 'string' ? data : 'Authentication failed');
    throw new Error(errorMsg);
  }

  return data;
}

export async function registerUser({ username, email, password }) {
  const payload = { username, email, password };

  const response = await fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMsg = typeof data === 'string' ? data : data?.message || 'Registration failed';
    throw new Error(errorMsg);
  }

  return data;
}

export async function getMe() {
  const response = await fetch('/get-me', {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user profile (${response.status})`);
  }

  const data = await response.json();
  return data;
}
