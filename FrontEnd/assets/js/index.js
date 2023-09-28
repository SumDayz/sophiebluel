import { fetchLogin } from './api.js';

let arrayMods;
let reponse = await fetch('http://localhost:5678/api/works');
let works = await reponse.json();
console.log(works);



const filterCat = [];

const boutonmodale = document.querySelector(".boutonmodale");
const fermermodale = document.querySelector(".closeModale");
const boutonlogout = document.querySelector(".boutonlogout");
const catalogue = document.querySelector('#portfolio');
const login = document.querySelector(".login");
const boutonlogin = document.querySelector(".boutonlogin");
const displaynone = document.querySelector("#displaynone");
const boutonprojets = document.querySelector(".boutonprojets")
const edition = document.querySelector(".edition");


function checkLogin() {
  const token = localStorage.getItem('authToken');
  if (token) {
    boutonlogin.style.display = 'none';
    boutonlogout.style.display = 'flex';
  } else {
    boutonlogin.style.display = 'flex';
    boutonlogout.style.display = 'none';
  }
}

checkLogin();

async function updateWorks() {
  reponse = await fetch('http://localhost:5678/api/works');
  works = await reponse.json();
}




load();



function createPortfolio() {
  const worksTitleDiv = document.createElement('div');
  worksTitleDiv.className = 'worksTitleDiv';
  const worksTitle = document.createElement('h2');
  worksTitle.innerText = 'Mes Projets';

  const filters = document.createElement('div');
  filters.className = 'filters';

  const gallery = document.createElement('div');
  gallery.className = 'gallery';

  catalogue.style.display = null;

  catalogue.appendChild(worksTitleDiv);
  worksTitleDiv.appendChild(worksTitle);
  catalogue.appendChild(filters);
  catalogue.appendChild(gallery);
  const sectionWorks = document.querySelector('.gallery');
  const divFilters = document.querySelector('.filters');

  const editWorksBtn = document.createElement('p');
  editWorksBtn.innerHTML = `<a href="#modale" class="openModale">
        <i class="fa fa-light fa-pen-to-square"></i> 
        modifier </a>
        `;
  editWorksBtn.setAttribute('id', 'editWorksBtn');
  editWorksBtn.className = 'editWorksBtn';
  editWorksBtn.style.display = 'none';

  worksTitleDiv.appendChild(editWorksBtn);

  // une fois les grandes parties créées, il faut créer une image et un titre pour chaque élément du catalogue, genererWorks accomplit cette tâche en retrouvant chaque élément de la variable works.
  function genererWorks(works) {
    for (let i = 0; i < works.length; i++) {
      const work = works[i];

      const workElement = document.createElement('figure');
      workElement.setAttribute('id', `galleryFigureNumber${work.id}`);

      const imageWork = document.createElement('img');
      const newImageUrl = work.imageUrl.replace(
        'http://localhost:5678/works',
        );
      imageWork.src = newImageUrl;
      imageWork.crossOrigin = 'anonymous';

      const titleWork = document.createElement('figcaption');
      titleWork.innerText = work.title;

      sectionWorks.appendChild(workElement);
      workElement.appendChild(imageWork);
      workElement.appendChild(titleWork);
    }
  }

  // une fois la fonction déclarée, on l'appelle.
  genererWorks(works);

  // Les fonctions suivantes servent à générer des boutons pour filtrer les travaux du Catalogue
  // Il faut aller chercher les catégories existantes, puis ne les afficher qu'une fois par occurrence
  // on crée un Array pour lister les catégories, puis on valide l'absence de la valeur dans l'Array avant d'y ajouter la valeur, pour n'avoir qu'une fois chaque catégorie
  // Pour la création des filtres, il est préférable d'utiliser cette méthode afin de n'avoir que des boutons pour des catégories qui ont bien des travaux "actifs"
  // on utilisera le Get Categories de l'API dans un autre cadre, qui a besoin d'afficher toutes les catégories possibles, même lorsqu'aucun travail correspondant n'est actuellement présent en bdd
  function genererFiltres() {
    for (let i = 0; i < works.length; i++) {
      const work = works[i];
      if (!filterCat.includes(work.category.name)) {
        filterCat.push(work.category.name);
      }
    }
    // Intégration d'un bouton affichant tous les travaux, qui va très simplement appeler la fonction "genererWorks()" en utilisant le tableau de l'ensemble des travaux
    const noFilterBtn = document.createElement('button');
    noFilterBtn.className = `filterButton`;
    noFilterBtn.id = 'noFilter';
    noFilterBtn.innerText = 'Tous';
    divFilters.appendChild(noFilterBtn);
    noFilterBtn.addEventListener('click', function () {
      document.querySelector('.gallery').innerHTML = '';
      genererWorks(works);
    });

    // on utilise l'Array créé précédemment pour créer les boutons des catégories

    for (let i = 0; i < filterCat.length; i++) {
      // création des boutons et attributions de classes et ID pour ces boutons
      const filterElement = document.createElement('button');
      filterElement.className = `filterButton`;
      filterElement.id = `${filterCat[i]}`;
      filterElement.innerText = filterCat[i];
      divFilters.appendChild(filterElement);
      filterElement.addEventListener('click', function () {
        const btnId = this.id;
        const filWork = works.filter(function (work) {
          return work.category.name == btnId;
        });

        // on supprime le contenu HTML de la gallery pour la recréer ensuite, mais avec une nouvelle variable dans notre fonction : filWork, le tableau fraichement créé pour cet usage. Toujours en utilisant la fonction genererWorks
        document.querySelector('.gallery').innerHTML = '';
        genererWorks(filWork);
      });
    }
  }

  genererFiltres(works);
}
 function load() {
  createPortfolio();
  
}

boutonlogin.addEventListener('click', function(){
  loginpage();
  

})

boutonlogout.addEventListener('click', function(){
  localStorage.removeItem("authToken");
  location.reload();

})

function loginpage () {
  window.location.href = "login.html" ;
}

if (localStorage.getItem("authToken") !=null){
  console.log("coucou");
  edition.classList.remove("displaynone");
  boutonmodale.classList.remove("displaynone");
}

const modaledisplay = document.querySelector(".modaleSection")
const main = document.querySelector('main')

boutonmodale.addEventListener("click",function(){
  modaledisplay.classList.remove("displaynone");
  modaledisplay.classList.add("modale");
  genererWorksModifiables();
})



fermermodale.addEventListener("click",function(){
  modaledisplay.classList.add("displaynone");
  modaledisplay.classList.remove("modale");
  
})

function genererWorksModifiables() {
  arrayMods = [];
  for (let i = 0; i < works.length; i++) {
    const workMod = works[i];
    const cataModale = document.querySelector('.modaleContentCatalogue');
    const workModElement = document.createElement("figure");
    workModElement.classList.add('workModFigure');
    workModElement.id = `workModNumber${i} workModIdNumber${workMod.id}` ;
    arrayMods.push(workModElement.id);

    const imageWorkMod = document.createElement('img');
    const newImageUrl = workMod.imageUrl.replace('http://localhost:5678/api/works')
    imageWorkMod.src = newImageUrl;
    imageWorkMod.crossOrigin = 'anonymous'
    imageWorkMod.className = 'workModImage'
    cataModale.appendChild(workModElement);
    workModElement.appendChild(imageWorkMod);
    console.log("coucou")
  }}