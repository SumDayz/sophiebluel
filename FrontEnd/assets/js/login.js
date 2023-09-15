import { fetchLogin } from './api.js';

const boutonprojets = document.querySelector(".boutonprojets")

async function getFormInfo() {
    console.log("base");
    const loginFormulaire = document.getElementById('loginForm');
    const loginIdSent = loginFormulaire.querySelector('input[name="emailId"]').value;
    const pwdIdSent = loginFormulaire.querySelector('input[name="pwdId"]').value;
    const jsonLogin = {
    email: loginIdSent,
    password: pwdIdSent,
    };
    const awaitfetchlogin = await fetchLogin(jsonLogin);
    console.log(awaitfetchlogin);
    }
  
    
    
    boutonprojets.addEventListener('click', function(){
        mainhtml();
      })
  
    function mainhtml () {
        window.location.href = "index.html";
    }
  
  
  const loginFormulaire = document.getElementById('loginForm');
    loginFormulaire.addEventListener('submit', async function (event) {
      event.preventDefault();
      await getFormInfo();
      });