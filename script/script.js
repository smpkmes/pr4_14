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

    const questions = [{
        question: "What color is the burger?",
        answers: [{
            title: 'Standart',
            url: './image/burger.png'
        },
        {
            title: 'Black',
            url: './image/burgerBlack.png'
        }
        ],
        type: 'radio'
    },
    {
        question: "What kind of meat is the cutlet made from?",
        answers: [{
            title: 'Chicken',
            url: './image/chickenMeat.png'
        },
        {
            title: 'Beef',
            url: './image/beefMeat.png'
        },
        {
            title: 'Pork',
            url: './image/porkMeat.png'
        }
        ],
        type: 'radio'
    },
    {
        question: "Additional ingredients?",
        answers: [{
            title: 'Tomato',
            url: './image/tomato.png'
        },
        {
            title: 'Cucumber',
            url: './image/cucumber.png'
        },
        {
            title: 'Salad',
            url: './image/salad.png'
        },
        {
            title: 'Onion',
            url: './image/onion.png'
        }
        ],
        type: 'checkbox'
    },
    {
        question: "Add sauce?",
        answers: [{
            title: 'Garlicky',
            url: './image/sauce1.png'
        },
        {
            title: 'Tomato',
            url: './image/sauce2.png'
        },
        {
            title: 'Mustard',
            url: './image/sauce3.png'
        }
        ],
        type: 'radio'
    }
    ];

    btnOpenModal.addEventListener('click', () => {
        modalBlock.classList.add('d-block');
        playTest();
    });


    closeModal.addEventListener('click', () => {
        modalBlock.classList.remove('d-block');
    });

    const playTest = () => {

        const finalAnswers = [];
        let numberQuestion = 0;

        const renderAnswers = (index) => {
            questions[index].answers.forEach((answer) => {
                const answerItem = document.createElement('div');

                answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');

                answerItem.innerHTML = `
                <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
                <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                <img class="answerImg" src="${answer.url}" alt="burger">
                <span>${answer.title}</span>
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
                    questionTitle.textContent = "Enter your number";

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
                    formAnswers.textContent = 'mega harocsh!';

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
                if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
                    obj[`${index}_${questions[numberQuestion].question}`] = input.value
                }

                if (numberQuestion === questions.length) {
                    obj[`PhoneNumber`] = input.value
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
            console.log(finalAnswers);
        }
    };
});