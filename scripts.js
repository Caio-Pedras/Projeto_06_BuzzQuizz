//Variaveis Globais
const API = 'https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes';
let objetoQuestions = {
		title: `Título da pergunta 1`,
		color: "#123456",
		answers: [
			{
				text: "Texto da resposta 1",
				image: "https://http.cat/411.jpg",
				isCorrectAnswer: true
			},
			{
				text: "Texto da resposta 2",
				image: "https://http.cat/412.jpg",
				isCorrectAnswer: false
			}
		]
}
let objetoLevels = {
	title: "Título do nível 1",
	image: "https://http.cat/411.jpg",
	text: "Descrição do nível 1",
	minValue: 0
}
let objetoQuizz ={
	title: "Título do quizz",
	image: "https://http.cat/411.jpg",
	questions: [
		{
			title: "Título da pergunta 1",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		},
	],
	levels: [
		{
			title: "Título do nível 1",
			image: "https://http.cat/411.jpg",
			text: "Descrição do nível 1",
			minValue: 0
		},
		{
			title: "Título do nível 2",
			image: "https://http.cat/412.jpg",
			text: "Descrição do nível 2",
			minValue: 50
		}
	]
}
   

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
    document.querySelector('.quizzes').innerHTML=quizzInnerHTML
}

function checkSuccess (success) {
    console.log(success)
}

function verifyBasicInformation() {
	let quizzTitle =  document.querySelector(".infoQuizz input:nth-child(1)").value;
	console.log(quizzTitle.length);
	let quizzURL = document.querySelector(".infoQuizz input:nth-child(2)").value;
	console.log(quizzURL);
	let quizzNumberQuestions = document.querySelector(".infoQuizz input:nth-child(3)").value;
	console.log(quizzNumberQuestions);
	let quizzNumberLevels = document.querySelector(".infoQuizz input:nth-child(4)").value;
	console.log(quizzNumberLevels);

	if (quizzTitle === "" || quizzTitle.length > 65 || quizzTitle.length < 20 || quizzURL.startsWith("http") === false || quizzURL === "" || quizzNumberQuestions === "" || quizzNumberQuestions < 3 || quizzNumberLevels === "" || quizzNumberLevels < 2) {
		alert("Preencha os dados corretamente");
	} else {
		console.log(objetoQuizz.questions);
		objetoQuizz = {title:`${quizzTitle}`, image: `${quizzURL}`, questions: `Array[${quizzNumberQuestions}]`, levels: `Array[${quizzNumberLevels}]`}
		console.log(objetoQuizz);
		toggleHidden('.section:nth-child(1)');
		toggleHidden('.section:nth-child(2)');
	}
}
