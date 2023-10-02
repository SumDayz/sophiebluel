// index.js
import { fetchWorks, fetchCategories, fetchDeleteWork } from './api.js';

const boutonmodale = document.querySelector(".boutonmodale");
const fermermodale = document.querySelector(".closeModale");
const boutonlogout = document.querySelector(".boutonlogout");
const catalogue = document.querySelector('#portfolio');
const login = document.querySelector(".login");
const boutonlogin = document.querySelector(".boutonlogin");
const displaynone = document.querySelector("#displaynone");
const boutonprojets = document.querySelector(".boutonprojets")
const edition = document.querySelector(".edition");
const galleryElement = document.querySelector('#gallery');
const filtersElement = document.querySelector('#filters');
const isLogged = !!localStorage.getItem('authToken');
const modalElement = document.querySelector(".modaleSection")
const addBtn = document.querySelector("#picAddBtn");
const modale1 = document.querySelector(".modale1");
const modale2 = document.querySelector(".modale2");
const token = localStorage.getItem('authToken');


function checkLogin() {
  if (isLogged) {
    boutonlogin.style.display = 'none';
    boutonlogout.style.display = 'flex';
    boutonprojets.style.display = 'flex';
    edition.style.display = 'flex';
    boutonmodale.style.display = 'flex';
  } else {
    boutonlogin.style.display = 'flex';
    boutonlogout.style.display = 'none';
    boutonprojets.style.display = 'none';
    edition.style.display = 'none';
    boutonmodale.style.display = 'none';
  }
}


// une fois les grandes parties créées, il faut créer une image et un titre pour chaque élément du catalogue, genererWorks accomplit cette tâche en retrouvant chaque élément de la variable works.
function genererWorks(works) {
  galleryElement.innerHTML = '';
  works.forEach(function (work) {
    const workElement = document.createElement('figure');
    workElement.setAttribute('id', `galleryFigureNumber${work.id}`);

    const imageWork = document.createElement('img');
    imageWork.src = work.imageUrl;
    imageWork.crossOrigin = 'anonymous';

    const titleWork = document.createElement('figcaption');
    titleWork.innerText = work.title;

    galleryElement.appendChild(workElement);
    workElement.appendChild(imageWork);
    workElement.appendChild(titleWork);
  });
}

function genererFiltres(categories, works) {
  const noFilterBtn = document.createElement('button');
  noFilterBtn.className = `filterButton`;
  noFilterBtn.id = 'noFilter';
  noFilterBtn.innerText = 'Tous';
  filtersElement.appendChild(noFilterBtn);

  noFilterBtn.addEventListener('click', function (event) {
    console.log('===> event', event.target.id);
    genererWorks(works);
  });

  // on utilise l'Array créé précédemment pour créer les boutons des catégories

  categories.forEach(function (category) {
    // création des boutons et attributions de classes et ID pour ces boutons
    const filterElement = document.createElement('button');
    filterElement.className = `filterButton`;
    filterElement.id = category.id;
    filterElement.innerText = category.name;
    filtersElement.appendChild(filterElement);

    filterElement.addEventListener('click', function (event) {
      console.log('===> event', event.target.id);
      const worksFiltered = works.filter(function (work) {
        return work.categoryId !== category.id;
      });
      genererWorks(worksFiltered);
    });
  });
}

function displayModaleWorks(works) {
  works.forEach(function (work) {
    const cataModale = document.querySelector('.modaleContentCatalogue');
    const workModElement = document.createElement("figure");
    workModElement.classList.add('workModFigure');
    workModElement.id = `workModNumber workModIdNumber${work.id}`;

    const imageWorkMod = document.createElement('img');
    imageWorkMod.src = work.imageUrl;
    imageWorkMod.crossOrigin = 'anonymous'
    imageWorkMod.className = 'workModImage'
    const button = document.createElement('button');
    button.className = 'deleteButton';
    button.innerText = 'Supprimer';
    button.addEventListener('click', async function (event) {
      event.preventDefault();
      await fetchDeleteWork(work.id);
    });

    cataModale.appendChild(workModElement);
    workModElement.appendChild(imageWorkMod);
    workModElement.appendChild(button);
  })
}

async function main() {
  checkLogin();

  const works = await fetchWorks();
  genererWorks(works);

  const categories = await fetchCategories();
  genererFiltres(categories, works);

  boutonlogin.addEventListener('click', function(){
    window.location.href = "login.html";
  });
  
  boutonlogout.addEventListener('click', function(){
    localStorage.removeItem("authToken");
    location.reload();
  });

  boutonmodale.addEventListener("click", function() {
    modalElement.classList.remove("displaynone");
    modalElement.classList.add("modale");
    displayModaleWorks(works);
  });

  fermermodale.addEventListener("click",function(){
    modalElement.classList.add("displaynone");
    modalElement.classList.remove("modale");
  });
}

addBtn.addEventListener("click",function(){
  modale1.classList.add("displaynone");
  modale2.classList.remove("displaynone");
})



  const addWorkForm = document.querySelector('.addWorkForm');
  addWorkForm.addEventListener('submit', postwork());

 async function postwork(event,token){
    event.preventDefault();
    const addWorkForm = document.querySelector(".addWorkForm");
    const FormData = new FormData(addWorkForm)
    
    fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      body: FormData,
    })
      .then((res) => res.json())
      .then((res) => createElementAfterAdding(res))
      .then((res) => updateWorks())
    
  }


main();