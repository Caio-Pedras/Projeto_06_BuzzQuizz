//Variaveis Globais
const API = 'https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes';
let arrayQuizz = [];

//Start
//getAPI()

//Funções
function toggleHidden(element){
    document.querySelector(element).classList.toggle('hidden');
}
function getAPI(){
    const promisse = axios.get(API)
    promisse.then(pullQuizz)
    promisse.catch()
}
function pullQuizz (success){
    
    let quizzInnerHTML = "";
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
    document.querySelector('.quizzes').innerHTML=quizzInnerHTML;
}

function checkSuccess (success) {
    console.log(success)
}

function verifyBasicInformation() {
	let quizzTitle =  document.querySelector(".infoQuizz input:nth-child(1)").value;
	let quizzURL = document.querySelector(".infoQuizz input:nth-child(2)").value;
	let quizzNumberQuestions = document.querySelector(".infoQuizz input:nth-child(3)").value;
	let quizzNumberLevels = document.querySelector(".infoQuizz input:nth-child(4)").value;

	if (quizzTitle === "" || quizzTitle.length > 65 || quizzTitle.length < 20 || quizzURL.startsWith("http") === false || quizzURL === "" || quizzNumberQuestions === "" || quizzNumberQuestions < 3 || quizzNumberLevels === "" || quizzNumberLevels < 2) {
		alert("Preencha os dados corretamente");
	} else {
		//createArrayObjetos();
		organizeQuestionsLevels(quizzNumberQuestions, quizzNumberLevels);
		toggleHidden('.section:nth-child(1)');
		toggleHidden('.section:nth-child(2)');
	}
}

function createArrayObjetos() {
	arrayQuizz = {title: `${quizzTitle}`, 
				  image: `${quizzURL}`,
				  questions: [],
				  levels: []
	}
}

function organizeQuestionsLevels(responseUm, responseDois) {
	let numberLevels = document.querySelector(".nivelQuizz .inputQuizz");
	numberLevels.innerHTML = "";
	for (let i = 1; i <= responseDois; i++) {
		numberLevels.innerHTML += `
		<div class="nivel">
                <p>Nivel ${i}</p>
                <input type="text" minlength="10" placeholder="Título do nível">
                <input type="number" min ="0" max="100" placeholder="% de acerto mínima">
                <input type="url" placeholder="URL da imagem do nível">
                <input type="text" placeholder="Descrição do nível">
        </div>    
		`;
	}
}

function verifyQuizzLevels() {
	let levelTitle = document.querySelector(".nivelQuizz input:nth-child(2)").value;
	console.log(levelTitle);
	let levelPercentage = document.querySelector(".nivelQuizz input:nth-child(3)").value;
	console.log(levelPercentage);
	let levelURL = document.querySelector(".nivelQuizz input:nth-child(4)").value;
	console.log(levelURL);
	let levelDescription = document.querySelector(".nivelQuizz input:nth-child(5)").value;
	console.log(levelDescription);

	if (levelTitle === "" || levelTitle.length < 10 || levelPercentage === "" || levelPercentage < 0 || levelPercentage > 100 || levelURL === "" || levelURL.startsWith("http") === false || levelDescription.length < 30 ) {
		alert("Preencha os dados corretamente");
	} else {
		console.log("Finalizou");
	}
}
