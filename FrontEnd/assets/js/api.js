export async function fetchWorks() {
    const res = await fetch('http://localhost:5678/api/works');
    return await res.json();
  }

  export async function fetchCategory() {
    const response = await fetch('http://localhost:5678/api/categories');
    return await response.json();
  }

  
  