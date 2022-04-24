//Variaveis Globais
const API = 'https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes';
let arrayQuizz = {
	title:"",
	image:"",
	questions:"",
	levels:""
};
let validInput = [];
let quizzQuestion=[{
	question:''
}];
//Start

getAPI()

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

function isValidURL(string) {
	let res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
	return (res !== null)
};
function isValidHex (string){
	let re = /[0-9A-Fa-f]{6}/g;
	if (re.test(string)){
		return true
	}
	else 
	return false
}

function verifyBasicInformation() {
	let quizzTitle =  document.querySelector(".infoQuizz input:nth-child(1)").value;
	let quizzURL = document.querySelector(".infoQuizz input:nth-child(2)").value;
	let quizzNumberQuestions = document.querySelector(".infoQuizz input:nth-child(3)").value;
	let quizzNumberLevels = document.querySelector(".infoQuizz input:nth-child(4)").value;

	if (quizzTitle === "" || quizzTitle.length > 65 || quizzTitle.length < 20 || isValidURL(quizzURL) === false || quizzURL === "" || quizzNumberQuestions === "" || quizzNumberQuestions < 3 || quizzNumberLevels === "" || quizzNumberLevels < 2) {
		alert("Preencha os dados corretamente");
	} else {
		arrayQuizz.title = quizzTitle;
		arrayQuizz.image = quizzURL;
		document.querySelector(".quizzReady img").src = quizzURL;
		organizeQuestionsLevels(quizzNumberQuestions, quizzNumberLevels);
		toggleHidden(".section:nth-child(1)");
		toggleHidden(".section:nth-child(2)");
	}
}

function organizeQuestionsLevels(responseUm, responseDois) {
	let numberQuestions = document.querySelector(".questionsQuizz .inputQuizz");
	let numberLevels = document.querySelector(".nivelQuizz .inputQuizz");
	numberQuestions.innerHTML = "";
	numberLevels.innerHTML = "";
	let cont = 0;
	for (let j = 1; j <= responseUm; j++) {
		numberQuestions.innerHTML += `
		<questionSelector>
			<div class="question">
				<p>Pergunta ${j}</p>
				<input type="text" id="question${cont}" placeholder="Texto da pergunta">
				<input type="text" id="backgroundColor${cont}" placeholder="Cor de fundo da pergunta">
			</div>    
			<div class="correctAnswer">
				<p>Resposta correta</p>
				<input type="text" id="correctAnswer${cont}" placeholder="Resposta correta">
				<input type="url" id="correctAnswerURL${cont}" placeholder="URL da imagem">
			</div>    
			<div class="incorrectAnswer">
				<p>Respostas incorretas</p>
				<input type="text" id="incorrectAnswer1${cont}" placeholder="Resposta incorreta 1">
				<input type="url" id="incorrectAnswerURL1${cont}" placeholder="URL da imagem 1">
			</div>  
			<div class="incorrectAnswer">        
				<input type="text" id="incorrectAnswer2${cont}" placeholder="Resposta incorreta 2">
				<input type="url"id="incorrectAnswerURL2${cont}" placeholder="URL da imagem 2">
			</div> 
			<div class="incorrectAnswer">     
				<input type="text" id="incorrectAnswer3${cont}" placeholder="Resposta incorreta 3">
				<input type="url"id="incorrectAnswerURL3${cont}" placeholder="URL da imagem 3">
			</div>
		</div>                    
		`;
		cont++
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

function verifyQuizzQuestions () {
	numberOfQuestions = document.querySelectorAll('questionSelector').length;
	for (let i = 0; i<numberOfQuestions; i++){
		if (document.getElementById(`question${i}`).value.length <= 20 || isValidHex(document.getElementById(`backgroundColor${i}`).value) === false ){
		alert("Preencha os dados corretamente");
		return
		}
		else if (document.getElementById(`correctAnswer${i}`).value === '' || isValidURL(document.getElementById(`correctAnswerURL${i}`).value) === false){ 
			alert("Preencha os dados corretamente");
			return
		}
		verifyIncorrectAnswer(i)
		if(validInput === []){
			alert ("Preencha os dados corretamente");
		}
		let question={
			title:document.getElementById(`question${i}`).value,
			color:document.getElementById(`backgroundColor${i}`).value,
			answers:[
				{
					text:document.getElementById(`correctAnswer${i}`).value,
					image:document.getElementById(`correctAnswerURL${i}`).value,
					isCorrectAnswer: true
				},
			]
		}
		for (let cont = 0; cont<validInput.length; cont++){
			question.answers[cont+1] = {
				text:document.getElementById(`incorrectAnswer${validInput[cont]}${i}`).value,
				image:document.getElementById(`incorrectAnswerURL${validInput[cont]}${i}`).value,
				isCorrectAnswer:false,
			}
		}
		quizzQuestion [i] =[{question:question}]
	}
	console.log(quizzQuestion);
	arrayQuizz.questions = quizzQuestion;
	console.log (arrayQuizz);
	toggleHidden('.section:nth-child(3)');
	toggleHidden('.section:nth-child(2)');
}

function verifyIncorrectAnswer (cont){
	validInput = []
	for (let i = 1; i<4; i++){
		if (document.getElementById(`incorrectAnswer${i}${cont}`).value !=='' && isValidURL(document.getElementById(`incorrectAnswerURL${i}${cont}`).value) === true ) {
			validInput += [i]
		}
	}
}

function verifyQuizzLevels() {
	let contador = document.querySelectorAll(".nivelQuizz .nivel").length;
	let respostasErradasNiveis = 0;
	let existePorcentagemZero = 0;
	let levelTitle;
	let levelPercentage;
	let levelURL;
	let levelDescription;

	for (let i = 1; i <= contador; i++) {
		levelTitle = document.querySelector(`.nivel:nth-child(${i}) input:nth-child(2)`).value;
		levelPercentage = Number(document.querySelector(`.nivel:nth-child(${i}) input:nth-child(3)`).value);
		levelURL = document.querySelector(`.nivel:nth-child(${i}) input:nth-child(4)`).value;
		levelDescription = document.querySelector(`.nivel:nth-child(${i}) input:nth-child(5)`).value;
		if (levelTitle === "" || levelTitle.length < 10 || levelPercentage === "" || levelPercentage < 0 || levelPercentage > 100 || levelURL === "" || isValidURL(levelURL) === false || levelDescription.length < 30 ) {
			respostasErradasNiveis += 1;
		}
		if (levelPercentage === 0) {
			existePorcentagemZero += 1;
		}
	}	
	if (respostasErradasNiveis !== 0 || existePorcentagemZero !== 1) {
		alert("Preencha os dados corretamente");
	} else {
		toggleHidden('.section:nth-child(4)');
		toggleHidden('.section:nth-child(3)');
	}
}