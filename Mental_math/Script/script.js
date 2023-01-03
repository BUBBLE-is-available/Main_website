// Elements
const button = document.querySelector("#test-button");

// Calculation
let calculationQuestion = document.querySelector("#math-question");
const Calculation = {
    question : {
        // Constants
        MAX_VALUES : [25,100,20,100],
        OPERATORS : ["*","-","/","+"], 

        // Variables
        element : calculationQuestion,
        components : calculationQuestion.children,
        firstOperand : calculationQuestion.children[0],
        operator : {
            index : 1,
            element : calculationQuestion.children[1]
        },
        secondOperand : calculationQuestion.children[2],
        equals : calculationQuestion.children[3],
        answer : 0,
        
        // Methods
        generateRandomOperator: function() {
            this.operator.index = Math.round(Math.random() * (this.OPERATORS.length - 1));
            this.operator.element.innerText = this.OPERATORS[this.operator.index];
        },
        generateValidOperands : function() {
            let firstOperand;
            let secondOperand;
            let iOperator = this.operator.index;
            switch (iOperator)
            {
                case 0: // Multiply
                    firstOperand = Math.round(Math.random() * (this.MAX_VALUES[iOperator] -2)) +2;
                    secondOperand = Math.round(Math.random() * (this.MAX_VALUES[iOperator] -2)) +2;
                    this.answer = firstOperand * secondOperand;
                    break;
                case 1: // Substraction
                    firstOperand = Math.round(Math.random() * (this.MAX_VALUES[iOperator] -2)) +2;
                    secondOperand = Math.round(Math.random() * (this.MAX_VALUES[iOperator] -2)) +2;
                    this.answer = firstOperand - secondOperand;
                    break;
                case 2: // Division
                    secondOperand = Math.round(Math.random() * (this.MAX_VALUES[iOperator] -2)) +2;
                    firstOperand = secondOperand * (Math.round(Math.random() * (this.MAX_VALUES[iOperator] -2)) +2);
                    this.answer = firstOperand / secondOperand;
                    break;
                case 3: // Addition
                    secondOperand = Math.round(Math.random() * (this.MAX_VALUES[iOperator] -2)) +2;
                    firstOperand = Math.round(Math.random() * (this.MAX_VALUES[iOperator] -2)) +2;
                    this.answer = firstOperand + secondOperand;
                    break;
            }
            // Put on display
            this.firstOperand.innerText = firstOperand.toString();
            this.secondOperand.innerText = secondOperand.toString();
        },

        generateItsel : function() {
            this.generateRandomOperator();
            this.generateValidOperands();
        }
    },
    userAnswer : {
        // Variables
        element : document.querySelector("#math-answer"),
        // Methods
        clearInputValue : function() {
            this.element.value = "";
        }
    }
};

// Test
const Test = {
    // Variables
    isRunning : false,
    
    // Methods
    start : function() {
        Calculation.question.generateItsel();
        Calculation.userAnswer.clearInputValue();
        this.isRunning = true;
        button.innerText = "NEXT";
    },
    nextQuestion : function() {
        Calculation.question.generateItsel();
        Calculation.userAnswer.clearInputValue();
    },
    checkAnswer : function() {
        return Calculation.question.answer == parseInt(Calculation.userAnswer.element.value);
    },
    run : function(){
        if(!Test.isRunning)
            Test.start();
        else
            Test.nextQuestion();
    }
}

// Document
document.addEventListener("keydown", event => {
    if(event.repeat) return;
    if(event.key != "Enter") return;
    Test.run();
});

button.addEventListener("click", () => {
    Test.run();
});


