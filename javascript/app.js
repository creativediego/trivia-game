let trivia = {
    currentQuestion: "",
    currentRightAnswer: "",
    rightAnswers: 0,
    wrongAnswers: 0,
    counter: 5,
    intervalId: "",
    isAnswerChosen: false,
    createQuestion: function(question, answer1, answer2, answer3, answer4, correctAnswer) {
        let thisQuestion = {
            question: question,
            answers: [answer1, answer2, answer3, answer4],
            correctAnswer: correctAnswer
        }
        this.questions.push(thisQuestion);


    },

    questions: [],

    playedQuestions: [],

    setUpQuestions: function() {
        this.createQuestion("what is the meaning of life?", "tacos", "beaches", "sunshine", "coding", "coding");
        this.createQuestion("What is 2+2?", "1", "3", "4", "12", "4")

    },

    initQuestions: function() {
        clearInterval(trivia.intervalId);
        this.isAnswerChosen = false;
        this.counter = 5;
        $("#counter").text(this.counter);
        $("#playthrough").empty()
        this.setCurrentQuestion();
        this.runCounter();
        this.checkAnswer();


    },

    setCurrentQuestion: function() {
        let currentQuestionId = Math.floor(Math.random() * this.questions.length)
        this.currentQuestion = this.questions[currentQuestionId].question;
        this.currentRightAnswer = this.questions[currentQuestionId].correctAnswer;
        this.shuffleAnswers(this.questions[currentQuestionId].answers);

        //Front end
        $("#question").text(this.questions[currentQuestionId].question)
        $("#answer-1").text(this.questions[currentQuestionId].answers[0])
        $("#answer-2").text(this.questions[currentQuestionId].answers[1])
        $("#answer-3").text(this.questions[currentQuestionId].answers[2])
        $("#answer-4").text(this.questions[currentQuestionId].answers[3])

        this.playedQuestions.push(this.questions[currentQuestionId])


    },

    shuffleAnswers: function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
    },

    checkAnswer: function() {

        $(".answer").on("click", function() {
            clearInterval(trivia.intervalId);


            if (trivia.isAnswerChosen === false) {

                if ($(this).text() === trivia.currentRightAnswer && trivia.counter > 0) {

                    $("#playthrough").text("That's right!");
                    trivia.rightAnswers++;
                    trivia.nextQuestion();
                    trivia.isAnswerChosen = true;





                } else {
                    $("#playthrough").text(`Sorry, the answer was: ${trivia.currentRightAnswer}`);
                    trivia.wrongAnswers++;
                    trivia.nextQuestion();
                    trivia.isAnswerChosen = true;

                }
            }
        })


    },

    runCounter: function() {

        trivia.intervalId = setInterval(trivia.decrementCounter, 1000);

    },

    decrementCounter: function() {

        trivia.counter--;

        $("#counter").text(trivia.counter);

        if (trivia.counter === 0) {

            trivia.stopCounter();


        }
    },

    stopCounter: function() {

        clearInterval(trivia.intervalId)
        $("#playthrough").text(`Time's up! The answer was: ${trivia.currentRightAnswer}`)
        this.wrongAnswers++
            this.nextQuestion();
    },


    nextQuestion: function() {

        setTimeout(trivia.reset, 3000);
    },

    reset: function() {

        trivia.initQuestions();
    }

}


$("#start-game").on("click", function() {

    trivia.setUpQuestions();
    trivia.initQuestions();
    $("#instructions").toggleClass("hide")
    $("#game").toggleClass("hide")

});