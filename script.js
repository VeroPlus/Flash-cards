const flashcardsContainer = document.querySelector(".flashcards");
const question = document.getElementById("question");
const answer = document.getElementById("answer");

let contanteArray;
!localStorage.contanteArray ? contanteArray = [] : contanteArray = JSON.parse(localStorage.getItem("contanteArray"));

function updateLocalStorege() {
    localStorage.setItem("contanteArray", JSON.stringify(contanteArray));
}

function activeWindow() {
    document.getElementById("creat-card").classList.toggle("active");
}

function saveCard() {
    if(question.value != "" && answer.value != ""){
        let flashcardInfo = {
            "question":question.value,
            "answer": answer.value
        }     
        contanteArray.push(flashcardInfo);
        updateLocalStorege();
        question.value = "";
        answer.value = "";
    } else {
        alert("Input fields cannot be blank")
    }
}

function createHTMLElements(text){
    //Create "Flashcard" element
    let divFlashcard = document.createElement("div");
    divFlashcard.className ="flashcard";
    //Create front side of flashcard
    let divFrontSide = document.createElement("div");
    divFrontSide.className = "front-side";
    let deleteButtonFrontSide = document.createElement("button");
    deleteButtonFrontSide.className = "delete-button";
    deleteButtonFrontSide.innerHTML = "&times;"; 
    deleteButtonFrontSide.addEventListener("click", function() {
        contanteArray.splice(contanteArray.indexOf(text), 1);
        updateLocalStorege();
        divFlashcard.remove(); 
    });
    let questionElement = document.createElement("p");
    questionElement.className = "card-text";
    questionElement.innerHTML = text.question;
    divFrontSide.appendChild(deleteButtonFrontSide)
    divFrontSide.appendChild(questionElement);
    //Create back side of flashcsrd
    let divBackSide = document.createElement("div");
    divBackSide.className = "back-side";
    let deleteButtonBackSide = document.createElement("button");
    deleteButtonBackSide.className = "delete-button";
    deleteButtonBackSide.innerHTML = "&times;"; 
    deleteButtonBackSide.addEventListener("click", function() {
        contanteArray.splice(contanteArray.indexOf(text), 1);
        updateLocalStorege();
        divFlashcard.remove(); 
    });
    let answerElement = document.createElement("p");
    answerElement.className = "card-text";
    answerElement.innerHTML = text.answer;
    divBackSide.appendChild(answerElement);
    divBackSide.appendChild(deleteButtonBackSide);

    divFlashcard.appendChild(divFrontSide);
    divFlashcard.appendChild(divBackSide);
    divFlashcard.addEventListener("click", function(){
        divFlashcard.classList.toggle("active");
    });
    
    flashcardsContainer.appendChild(divFlashcard);
}

function showCards(){
    contanteArray.forEach(createHTMLElements);
}
function fillHTMLList() {
    if(contanteArray.length > 0){
        contanteArray.forEach(createHTMLElements);
    }
}

fillHTMLList();