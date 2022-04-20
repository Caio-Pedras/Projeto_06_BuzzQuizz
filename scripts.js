//Variaveis Globais
const API = 'https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes';
//Start
//getAPI()
//Funções
function toggleHidden(element){
console.log(element)
    document.querySelector(element).classList.toggle('hidden');
}
function getAPI(){
    const promisse = axios.get(API)
    promisse.then(pullQuizz)
    promisse.catch()
}
function pullQuizz (success){
    
    let quizzInnerHTML =''
    for(let i = 0; i < success.data.length; i++){
       quizzInnerHTML += ` 
       <div class = "seletorQuizz">
        <div class="quizz">
        <img src="${success.data[i].image}">
        <h3> ${success.data[i].title}</h3>
        <div class="banner"></div>
        </div>
       </div>`
    }
    console.log(quizzInnerHTML)
    document.querySelector('.quizzes').innerHTML=quizzInnerHTML
}

function checkSuccess (success) {
    console.log(success)
}
