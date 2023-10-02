// api.js
const token = localStorage.getItem('authToken');

export async function fetchWorks() {
  const res = await fetch('http://localhost:5678/api/works');
  return await res.json();
}

export async function fetchCategories() {
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

export async function fetchDeleteWork(workId) {
  try {
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    const jsonResponse =  await response.json();
    console.log('===> jsonResponse', jsonResponse);
  } catch (error) {
    console.log('===> jsonResponse', error);
  }
}
   

  
