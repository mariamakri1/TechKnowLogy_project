const API_URL = 'http://localhost:3000/api';

export async function getCourses() {
  const res = await fetch(`${API_URL}/courses`);
  return res.json();
}

export async function getCourseById(id: string) {
  const res = await fetch(`${API_URL}/courses/${id}`);
  return res.json();
}

export async function registerUser(data: any) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function loginUser(data: any) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

