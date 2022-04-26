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
let idSelectedQuizz = 0;
let indexCorrect = 0;
let acertos = 0;
let arrayMinValue = [];
//Start
let test;
getAPI()

//Funções
function toggleHidden(element){
    document.querySelector(element).classList.toggle('hidden');
}
function getAPI(){
	if (localStorage.length >= 1) {
		toggleHidden(".myQuizzEmpty");
		toggleHidden(".myQuizzFull");
	}
    const promisse = axios.get(API);
    promisse.then(pullQuizz);
    promisse.catch();
}
function pullQuizz (success){
    let quizzServer = document.querySelector(".allQuizzServer .quizzes");
	let quizzUser = document.querySelector(".quizzesUser .quizzes");
	let idQuizz;
	let promisse;
	let contador;
	quizzUser.innerHTML = "";
	for(let i = 1; i <= localStorage.length; i++) {
		idQuizz = localStorage.getItem(`ID${i}`);
		promisse = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${idQuizz}`);
		promisse.then(function (response) {
			quizzUser.innerHTML += `
				<div class = "seletorQuizz" id="${response.data.id}" onclick="getSelectedQuizz(${response.data.id})">
				<div class="quizz">
					<img src="${response.data.image}">
					<div class="banner"></div>
					<h3>${response.data.title}</h3>
				</div>
				</div>
			`;
		});	
	}
	quizzServer.innerHTML = "";

	for(let k = 0; k < success.data.length; k++){
		for (let j = 1; j <= localStorage.length; j++) {
			idQuizz = Number(localStorage.getItem(`ID${j}`));
			if (idQuizz === success.data[k].id) {
				contador += 1;
			}
		}
		if (contador === 0) {
			quizzServer.innerHTML += ` 
				<div class = "seletorQuizz" id="${success.data[k].id}" onclick="getSelectedQuizz(${success.data[k].id})">
					<div class="quizz" >
						<img src="${success.data[k].image}">
						<div class="banner"></div>
						<h3>${success.data[k].title}</h3>
					</div>
				</div>
			`;
		}
		contador = 0;
	}  
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
function criarQuizz() {
	arrayQuizz = {
		title:"",
		image:"",
		questions:"",
		levels:""
	};
	toggleHidden('.createQuizz');
	toggleHidden('.container');
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
		quizzQuestion[i] = question;
	}
	arrayQuizz.questions = quizzQuestion;
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
	let ArrayLevels = [{
		title: "",
		image: "",
		text: "",
		minValue: ""
	}]
	for (let i = 1; i <= contador; i++) {
		levelTitle = document.querySelector(`.nivel:nth-child(${i}) input:nth-child(2)`).value;
		levelPercentage = Number(document.querySelector(`.nivel:nth-child(${i}) input:nth-child(3)`).value);
		levelURL = document.querySelector(`.nivel:nth-child(${i}) input:nth-child(4)`).value;
		levelDescription = document.querySelector(`.nivel:nth-child(${i}) input:nth-child(5)`).value;
		ArrayLevels[i-1]={title: levelTitle, image: levelURL, text: levelDescription, minValue: levelPercentage};
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
		arrayQuizz.levels = ArrayLevels;
		toggleHidden('.section:nth-child(4)');
		toggleHidden('.section:nth-child(3)');
		postarQuizz();
	}
}
function postarQuizz() {
	console.log('entrei')
	const requisicao = axios.post(API, arrayQuizz);	
	requisicao.then(saveID);
}
function getSelectedQuizz (id) {
	idSelectedQuizz = id
	indexCorrect = 0
	const promise = axios.get(`${API}/${id}`);
	promise.then(openQuizz)
}
function openQuizz(success){
	test = success
	printLevel(success)
	toggleHidden('.answerQuizz')
	toggleHidden('.container')
	startQuizz(success)
}
function shuffle(array) {
	let currentIndex = array.length,  randomIndex;
  
	while (currentIndex != 0) {
  
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex--;
	  [array[currentIndex], array[randomIndex]] = [
		array[randomIndex], array[currentIndex]];
	}
	return array;
}
function concatenarArray(array){
	let string = ""
	for (let i = 0; i<array.length; i++){
		string += array[i]
	}
	return string
}

function selectAnswer(clicked){
	let element = clicked.parentElement.querySelectorAll('.answer')
	let elementText= clicked.parentElement.querySelectorAll('.answer p')
	let numberOfAnswer = element.length;
	clicked.parentElement.parentElement.classList.remove('notClicked')
	for(let i = 0; i<numberOfAnswer; i++){
		elementText[i].classList.remove('coverColor')
		element[i].classList.add('alreadyClicked')
		if (element[i] !== clicked){
		element[i].innerHTML += `<div class="filter"></div>`
		}
		if (element[i] === clicked && elementText[i].classList.value === 'true'){
			acertos++
		}
		
		
	}
	let nextQuestion =document.querySelector('.notClicked')
	if (nextQuestion !== null ){
	setTimeout(()=>scrollView(nextQuestion),2000)
	}
	else{
	setTimeout(()=>lastAnswer(),2000)	
	setTimeout(()=>scrollView(document.querySelector('.result')),2000)
	}
}
function lastAnswer(){
	let numberOfQuestions = document.querySelectorAll('.question').length;
	let totalNumber = document.querySelectorAll('.answer').length;
	let clickedNumber = document.querySelectorAll('.alreadyClicked').length;
	let percentual =(acertos/numberOfQuestions)*100
	percentual = percentual.toFixed(0)
	if (percentual ===null) {
		percentual =0
	}
	if (totalNumber === clickedNumber){ 
		toggleHidden('.result')
		let result = calcResult()
		hideOtherLevels (result)
		let title =document.getElementById(`${result}Title`).parentNode.querySelector('span')
		title.innerHTML = `${percentual}%:`
	}
	
}
function printLevel (success){
	arrayMinValue = []
	for (let i = 0; i < success.data.levels.length; i++){
		arrayMinValue[i] = Number(success.data.levels[i].minValue)
	}
	arrayMinValue.sort((a,b) => b-a)	
	let numberOfLevels = success.data.levels.length;
	let resultContent = document.querySelector(".result");
	resultContent.innerHTML=''
	let resultInnerHTML =''
	for (let i = 0; i<numberOfLevels; i++){
		resultInnerHTML += `
		<div class="resultSelector" id="${success.data.levels[i].minValue}">
			<div class="resultTitle" id="${success.data.levels[i].minValue}Title">
				<div class="resultLevelText">
				<span></span><p>${success.data.levels[i].title}</p>
				</div>
			</div>
			<div class="resultContainer">
				<div class="imgResult">
				<img src="${success.data.levels[i].image}">
				</div>
				<p>${success.data.levels[i].text}</p>
			</div>
		</div>
		`
	}
	resultContent.innerHTML=resultInnerHTML
}
function calcResult (){
	let numberOfQuestions = document.querySelectorAll('.question').length;
	let numberOfLeves = arrayMinValue.length;
	let result = (acertos/numberOfQuestions) *100
	for(let i = 0; i < numberOfLeves; i++){
		if (result>+arrayMinValue[i]) {
			result = arrayMinValue[i]
			return result
		}
	}
	result = 0
	return result
}
function hideOtherLevels (result){
	
	for (let i = 0; i<arrayMinValue.length; i++){
		if (arrayMinValue[i] !== result){
			console.log(arrayMinValue[i])
			console.log(result)
		document.getElementById(`${arrayMinValue[i]}`).classList.add('hidden')
		} else{
			document.getElementById(`${arrayMinValue[i]}`).classList.remove('hidden')
		}
	} 	
}
function saveID() {
	const contadorID = localStorage.length + 1;
	const promisse = axios.get(API);
	promisse.then(function (response) {
		let id = response.data[0].id;
		localStorage.setItem(`ID${contadorID}`, id);
		console.log(contadorID);
	});
}
function startQuizz(success){
	window.scrollTo(0, 0)
	let numberOfQuestions = success.data.questions.length;
	document.querySelector(".quizzHeader").innerHTML = `<img  src="${success.data.image}">
	<div class="bannerQuizzHeader"></div>
	<h1>${success.data.title}</h1>`
	let questionsHTML = document.querySelector(".questions")
	questionsHTML.innerHTML = ""
	let HTML=''
	for(let i = 0; i<numberOfQuestions; i++){
		let HTMLHeader = ''
		let HTMLContent= ''
		HTMLHeader = `           
		<div class="question notClicked">
			<div class="questionTitle" style="background-color:${success.data.questions[i].color}">
				<p>${success.data.questions[i].title}</p>
			</div>`;
		let numberOfAnswer = success.data.questions[i].answers.length
		let arrAnswer = []
		for (let j = 0; j<numberOfAnswer; j++){
			arrAnswer[j] = `<div class="answer" onclick="selectAnswer (this)">
			<img src="${success.data.questions[i].answers[j].image}">
			<p class="${success.data.questions[i].answers[j].isCorrectAnswer} coverColor" >
			${success.data.questions[i].answers[j].text}</p>
			</div>
			`
		}
		shuffle(arrAnswer)
		HTMLContent = concatenarArray(arrAnswer)
		HTML += `${HTMLHeader}
		<div class="allAnswer">
		${HTMLContent}
		</div>
		</div>
		`		
	}
	questionsHTML.innerHTML = HTML;
}
function resetQuizz(){
	acertos=0
	toggleHidden('.result')
	startQuizz(test)
}
function scrollView (element){
	element.scrollIntoView()
}