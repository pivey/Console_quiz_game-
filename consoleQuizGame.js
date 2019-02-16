/////////////////////////////
// CODING CHALLENGE


/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/

	(function () {

// Build the function constructor from which we will assign the various questions. 

	function Question(question, answer, correctAnswer) {
	this.question = question; 
	this.answer = answer; 
	this.correctAnswer = correctAnswer;  
	}

	// Create a method to display the possible answers for the selected question

     Question.prototype.postAnswers = function() { 
		
		// Log random question to the console
		console.log(this.question);

		for (var i = 0; i < this.answer.length; i++) {
            console.log(i + ': ' + this.answer[i]);
        }

	}

	var score = 0;

		Question.prototype.rightAnswer = function(el, callback) {

			// Check that the answer selected is correct 
			// Print to the console whether rthe answer is correct or not 

			var score; 

			if (this.correctAnswer === el) {
				console.log("That's the correct answer"); 
				score = callback(true);
		}
			else {
				console.log("that's not correct, try again");
				score = callback(false);
		}

		 	this.displayScore(score);

	}

		
    Question.prototype.displayScore = function(trackScore) {
        console.log('Your current score is: ' + trackScore);
        console.log('----------------------------');
    }

    var question_1 = new Question("what bus goes to the main station?", ["2A", "350S", "45", "5C"], 3 ); 
	var question_2 = new Question("what is the viewpoint on stroget called?", ["rundtarnet", "radhustarnet", "bellasky hotel", "vor fredelsers kirke"], 0 ); 
	var question_3 = new Question("what currency does Denmark use?", ["rupee", "kroner", "euro", "koruna"], 1 ); 


	// Grab the questions from the question function constructor
	var questionArray = [question_1, question_2, question_3];

	// Keep track of the players score

	function trackScore() {
        var score = 0;
        return function(correct) {
            if (correct) {
                score++;
            }
            return score;
        }
    }
    var keepScore = trackScore();

	// Make a function to repeat a questions after a question has been asked
	// Done by putting the previous question elements into their own function, running that outside of the function and then running it again
	// if the user doesn't enter exit to stop the game. 
	
	function nextQuestion (){
		// Selects a random rumber and logs the question to the console according to that number
		var random = Math.floor(Math.random()*questionArray.length); 
		// console.log(questionArray[random]);
		questionArray[random].postAnswers(); 
		// Prompt the user to select the right answer
		// The prompt function converts everything into a string and so the answer you input must be parsed as an integer to get the right value. 
		var answerSelect = prompt("pick the answer to the question from the box below - type 'exit' to stop the game");
		// Write a method to check if the prompt input is correct in line with the input. 

		if (answerSelect !== "exit") {
			questionArray[random].rightAnswer(parseInt(answerSelect), keepScore);
			nextQuestion(); 
		}		

	}

	nextQuestion();

	console.log(question_1, question_2, question_3);

	})();




/*
--- Expert level ---

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/
