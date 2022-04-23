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
				<div class="banner"></div>
        		<h3> ${success.data[i].title}</h3>
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
	let numberQuestions = document.querySelector(".questionsQuizz .inputQuizz");
	let numberLevels = document.querySelector(".nivelQuizz .inputQuizz");
	numberQuestions.innerHTML = "";
	numberLevels.innerHTML = "";
	for (let j = 1; j <= responseUm; j++) {
		numberQuestions.innerHTML += `
		<div class="question">
            <p>Pergunta ${j}</p>
            <input type="text" placeholder="Texto da pergunta">
            <input type="text" placeholder="Cor de fundo da pergunta">
        </div>    
        <div class="correctAnswer">
            <p>Resposta correta</p>
            <input type="text" placeholder="Resposta correta">
            <input type="url" placeholder="URL da imagem">
        </div>    
        <div class="incorrectAnswer">
            <p>Respostas incorretas</p>
                    
            <input type="text" placeholder="Resposta incorreta 1">
            <input type="url" placeholder="URL da imagem 1">
                
            <input type="text" placeholder="Resposta incorreta 2">
            <input type="url" placeholder="URL da imagem 2">
                    
            <input type="text" placeholder="Resposta incorreta 3">
            <input type="url" placeholder="URL da imagem 3">
        </div>                
		`;
	}
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
	let levelTitle = document.querySelectorAll(".nivelQuizz input:nth-child(2)").value;
	console.log(levelTitle);
	let levelPercentage = document.querySelectorAll(".nivelQuizz input:nth-child(3)").value;
	console.log(levelPercentage);
	let levelURL = document.querySelectorAll(".nivelQuizz input:nth-child(4)").value;
	console.log(levelURL);
	let levelDescription = document.querySelectorAll(".nivelQuizz input:nth-child(5)").value;
	console.log(levelDescription);

	if (levelTitle === "" || levelTitle.length < 10 || levelPercentage === "" || levelPercentage < 0 || levelPercentage > 100 || levelURL === "" || levelURL.startsWith("http") === false || levelDescription.length < 30 ) {
		alert("Preencha os dados corretamente");
	} else {
		console.log("Finalizou");
	}
}
