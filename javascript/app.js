let trivia = {
    currentQuestion: "",
    currentQuestionId: 0,
    currentRightAnswer: "",
    rightAnswers: 0,
    wrongAnswers: 0,
    counter: 10,
    progress: 0,
    intervalId: "",
    timeoutInterval: "",
    isAnswerChosen: false,
    createQuestion: function(question, answer1, answer2, answer3, answer4) {
        let thisQuestion = {
            question: question,
            //image:
            answers: [answer1, answer2, answer3, answer4],
            correctAnswer: answer1
        }
        this.questions.push(thisQuestion);


    },

    questions: [],

    playedQuestions: [],

    setUpQuestions: function() {
        this.createQuestion('With over 35 million residents, what is the most populous city in the world?', "Tokyo", "Hong-Kong", "New York", "London");
        this.createQuestion("Which scientist sailed the HMS Beagle to South America, including a stop in the Galapagos Islands?", "Charles Darwin", "Neil DeGrass Tyson", "Stephen Hawkins", "Albert Einstein");
        this.createQuestion("Which U.S. state has the longest coastline?", "Alaska", "California", "Florida", "Hawaii");
        this.createQuestion("What is the only sea without any coasts?", "Sargasso Sea", "Mediterranean Sea", "Black Sea", "Adriatic Sea");
        this.createQuestion("In what country can you visit Machu Picchu?", "Peru", "Chile", "Ecuador", "Colombia");
        this.createQuestion("What is the oldest city in the world?", "Damascus", "Jerusalem", "Athens", "Jericho");
        this.createQuestion("Which country does the island of Tasmania belong to?", "Australia", "New Zealand", "Fiji", "Tahiti");
        this.createQuestion("Which U.S. state has the most active volcanoes?", "Alaska", "Hawaii", "California", "Washington");
        this.createQuestion("Which country does the dish Feijoada come from?", "Brazil", "Italy", "Spain", "Colombia");
        this.createQuestion("What city is the capital of Australia?", "Melbourne", "Sydney", "Perth", "Brisbane")

    },

    initQuestions: function() {

        if (this.isGameFinished() === false) {
            clearInterval(trivia.intervalId);
            clearInterval(this.timeoutInterval);
            this.isAnswerChosen = false;
            this.counter = 10;
            $("#counter").text(this.counter);
            $("#gameplay").text("");
            this.setCurrentQuestion();
            this.runCounter();
            this.checkAnswer();

        } else {


            $("#question").text("Thanks for playing!")
            $("#gameplay").text(`Correct Answers: ${this.rightAnswers} | Incorrect Answers: ${this.wrongAnswers}`)


        }

    },

    newGame: function() {

        clearInterval(this.timeoutInterval);
        this.rightAnswers = 0;
        this.wrongAnswers = 0;
        this.progress = 0;
        this.questions = [];
        this.playedQuestions = [];
        trivia.setUpQuestions();
        trivia.initQuestions();
        $(".new-game").css("display", "none");
        $("#progress-bar").css("width", `${trivia.progress}%`)


    },

    fillProgressBar: function() {

        trivia.progress = trivia.progress + 10;
        $("#progress-bar").css("width", `${trivia.progress}%`)
        $(".new-game").css("display", "block");


    },

    setCurrentQuestion: function() {

        if (this.isGameFinished() === false) {

            do {
                this.currentQuestionId = Math.floor(Math.random() * this.questions.length)

            } while (this.playedQuestions.indexOf(this.questions[this.currentQuestionId]) !== -1)

            this.currentQuestion = this.questions[this.currentQuestionId].question;
            this.currentRightAnswer = this.questions[this.currentQuestionId].correctAnswer;
            this.shuffleAnswers(this.questions[this.currentQuestionId].answers);

            //Front end
            $("#question").text(this.questions[this.currentQuestionId].question)
                //$("#image").attr("src", this.questions[this.currentQuestionId].image)
            $("#answer-1").text(this.questions[this.currentQuestionId].answers[0])
            $("#answer-2").text(this.questions[this.currentQuestionId].answers[1])
            $("#answer-3").text(this.questions[this.currentQuestionId].answers[2])
            $("#answer-4").text(this.questions[this.currentQuestionId].answers[3])



        }

    },

    isGameFinished: function() {

        if (this.questions.length === this.playedQuestions.length) {

            return true;
        } else {

            return false;
        }

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


            if (trivia.isAnswerChosen === false && trivia.isGameFinished() === false) {


                if ($(this).text() === trivia.currentRightAnswer && trivia.counter > 0) {

                    trivia.isAnswerChosen = true;
                    $("#question").text("That's right!");
                    trivia.playedQuestions.push(trivia.questions[trivia.currentQuestionId])
                    trivia.rightAnswers++;
                    trivia.nextQuestion();

                } else {
                    trivia.isAnswerChosen = true;
                    $("#question").text(`Sorry, the answer is: ${trivia.currentRightAnswer}`);
                    trivia.playedQuestions.push(trivia.questions[trivia.currentQuestionId])
                    trivia.wrongAnswers++;
                    trivia.nextQuestion();



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

        $("#question").text(`Time's up! Answer: ${trivia.currentRightAnswer}`)
        this.wrongAnswers++;
        trivia.playedQuestions.push(trivia.questions[trivia.currentQuestionId]);
        this.nextQuestion();
    },


    nextQuestion: function() {
        trivia.fillProgressBar();
        trivia.timeoutInterval = setTimeout(trivia.reset, 3000);
        trivia.timeoutInterval();
    },

    reset: function() {

        trivia.initQuestions();
    }

}


$(".new-game").on("click", function() {

    trivia.newGame();
    $("#instructions").css("display", "none")
    $("#game").css("display", "block")

});