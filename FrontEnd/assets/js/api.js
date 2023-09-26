// api.js
export async function fetchWorks() {
  const res = await fetch('http://localhost:5678/api/works');
  return await res.json();
}

export async function fetchCategory() {
  const response = await fetch('http://localhost:5678/api/categories');
  return await response.json();
}

export async function fetchLogin(data) {
  const response = await fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return await response.json();
}