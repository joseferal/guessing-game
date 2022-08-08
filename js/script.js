const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word");

let correctWord, timer;

const initTimer = maxTime => {
	clearInterval(timer);
	timer = setInterval(() => {
		if(maxTime > 0) {
			maxTime--;
			return timeText.innerText = maxTime;
		}
		clearInterval(timer);
		alert(`Se te acabo el tiempo... La palabra correcta era ${correctWord}`)
	}, 1000)
}

const initGame = () => {
	initTimer(30);
	let randomObj = words[Math.floor(Math.random() * words.length)];
	let wordArray = randomObj.word.split("");
	for (let i = wordArray.length - 1; i > 0; i--){
		let j = Math.floor(Math.random() * (i + 1));
		[wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
	}
	wordText.innerText = wordArray.join("");
	hintText.innerText = randomObj.hint;
	correctWord = randomObj.word.toLowerCase();
	inputField.value = ""
	inputField.setAttribute("MaxLength", correctWord.length);
}

initGame();

const checkWord = () => {
	let userWord = inputField.value.toLocaleLowerCase();
	if(!userWord) return alert ("Introduce una palabra")
	if(userWord !== correctWord) return alert(`La palabra no es ${userWord}`);
	alert("Enhorabuena! la palabra es correcta");
	initGame();
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);