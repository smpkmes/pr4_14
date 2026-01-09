import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
import { push } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

document.addEventListener('DOMContentLoaded', function () {
    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    const burgerBtn = document.getElementById('burger');
    const nextButton = document.querySelector('#next');
    const prevButton = document.querySelector('#prev');
    const sendButton = document.querySelector('#send');
    
    const firebaseConfig = {
        apiKey: "AIzaSyB0BoiLc6P9KDzxjydKRORfpEX1D4oECAM",
        authDomain: "pr44-7ba18.firebaseapp.com",
        databaseURL: "https://pr44-7ba18-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "pr44-7ba18",
        storageBucket: "pr44-7ba18.firebasestorage.app",
        messagingSenderId: "270009826166",
        appId: "1:270009826166:web:7c5a0bda891f9f5941d857",
        measurementId: "G-Q02EDLEWWL"
    };
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const db = getDatabase(app);
    const questionsRef = ref(db, 'questions');

    const getData = () => {
        formAnswers.textContent = 'LOAD';

        setTimeout(() => {
            get(questionsRef)
                .then(snapshot => {
                    if (snapshot.exists()) {
                        playTest(snapshot.val());
                    } else {
                        formAnswers.textContent = 'No data on the questions';
                    }
                })
                .catch(error => {
                    formAnswers.textContent = 'Error receiving data!';
                    console.error(error);
                });
        }, 1000);
    }


    btnOpenModal.addEventListener('click', () => {
        modalBlock.classList.add('d-block');
        getData();
    });

    
    closeModal.addEventListener('click', () => {
        modalBlock.classList.remove('d-block');
    });

    const playTest = (questions) => {
        
        const finalAnswers = [];
        let numberQuestion = 0;

        const renderAnswers = (index) => {          
            questions[index].answers.forEach((answer) => {
                const answerItem = document.createElement('div');
                
                answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');

                answerItem.innerHTML = `
                <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
                <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                <img class="answerImg" src="${ answer.url }" alt="burger">
                <span>${ answer.title }</span>
                </label>
                `;

                formAnswers.appendChild(answerItem);
            })
        }

    const renderQuestions = (indexQuestion) => {
        formAnswers.innerHTML = '';

        switch (true) {
            case (numberQuestion >= 0 && numberQuestion < questions.length):
                questionTitle.textContent = questions[indexQuestion].question;
                renderAnswers(indexQuestion);

                nextButton.classList.remove('d-none');
                prevButton.classList.remove('d-none');
                sendButton.classList.add('d-none');

                if (numberQuestion === 0) {
                    prevButton.classList.add('d-none');
                }
                break;

            case (numberQuestion === questions.length):
                questionTitle.textContent = "Enter your phone number";

                nextButton.classList.add('d-none');
                prevButton.classList.add('d-none');
                sendButton.classList.remove('d-none');

                formAnswers.innerHTML = `
                    <div class="form-group">
                        <label for="numberPhone">Enter your number</label>
                        <input type="phone" class="form-control" id="numberPhone">
                    </div>
                `;
                break;

            case (numberQuestion === questions.length + 1):
                questionTitle.textContent = "";
                formAnswers.textContent = 'Thank you for passing the test!';

                setTimeout(() => {
                    modalBlock.classList.remove('d-block');
                }, 2000);
                break;

            default:
                console.warn("Incorrect question number:", numberQuestion);
        }
    };

        renderQuestions(numberQuestion);

        const checkAnswer = () => {
            const obj = {};
            const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone')
            console.log(inputs);

            inputs.forEach((input, index) => {    
                if(numberQuestion >= 0 && numberQuestion <= questions.length - 1){
                    obj[`${index}_${questions[numberQuestion].question}`] = input.value
                }

                if(numberQuestion === questions.length){
                    obj[`Phone Number`] = input.value
                }
            })

            finalAnswers.push(obj)
            console.log(finalAnswers);
            
        }

        nextButton.onclick = () => {
            checkAnswer();
            numberQuestion++;
            renderQuestions(numberQuestion);
        }

        prevButton.onclick = () => {
            numberQuestion--;
            renderQuestions(numberQuestion);
        }

        sendButton.onclick = () => {
            checkAnswer();
            numberQuestion++;
            renderQuestions(numberQuestion);

            const contactsRef = ref(db, 'contacts');
            push(contactsRef, finalAnswers)
                .then(() => console.log('Data sent:', finalAnswers))
                .catch(err => console.error('Sending error:', err));
        }
    };
});