// login.js
import { fetchLogin } from './api.js';
const boutonlogin = document.querySelector(".boutonlogin");
const loginSubmit = document.getElementById('loginSubmit');

if (localStorage.getItem("authToken")) {
  window.location.href = "index.html";
}

loginSubmit.addEventListener('click', async function (event) {
  event.preventDefault();
  const loginFormulaire = document.getElementById('loginForm');
  const loginIdSent = loginFormulaire.querySelector('input[name="emailId"]').value;
  const pwdIdSent = loginFormulaire.querySelector('input[name="pwdId"]').value;
  
  const jsonLogin = {
    email: loginIdSent,
    password: pwdIdSent,
  };

  const loginInfos = await fetchLogin(jsonLogin);
  
  const token = loginInfos.token;
  if (!loginInfos.token){
    const erreur = document.querySelector('.erreur');
    const userNotFound = document.createElement('p');
    userNotFound.classList.add("erreurcss")
    userNotFound.innerText = "erreur"
    erreur.appendChild(userNotFound);
  } else {
    localStorage.setItem("authToken",`${token}`);
    boutonlogin.innerText = 'logout';
    window.location.href = "index.html";
    
  }
  
});


