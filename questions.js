const questions = [
    {
        question: "What color is the burger?",
        answers: [
            {
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
        answers: [
            {
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
        answers: [
            {
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
        answers: [
            {
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

const obj = {}

const getData = () => {
    formAnswers.textContent = 'LOAD';

    setTimeout(() => {
        fetch('http://localhost:81/Quiz__intens/db.json')
            .then(res => res.json())
            .then(obj => playTest(obj.questions))
    }, 2000);
}

const obj = {};

const inputs = [...formAnswers.elements]
    .filter(elem => elem.checked)

inputs.forEach((elem, index) => {
    obj[`${index}_${questions[numberQuestion].question}`] = elem.value;
})
finalAnswers.push(obj)
