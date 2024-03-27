import chalk from 'chalk';
import inquirer from 'inquirer';
const apiLink = "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple";
let fetchData = async (apiLink) => {
    let fetchQuiz = await fetch(apiLink);
    let res = await fetchQuiz.json();
    return res.results;
};
let data = await fetchData(apiLink);
let startQuiz = async () => {
    let score = 0; // for user name
    let name = await inquirer.prompt({
        type: "input",
        name: "fname",
        message: "what is your name?",
    });
    for (let i = 1; i < 5; i++) {
        let answer = [...data[i].incorrect_answers, data[i].correct_answer];
        let ans = await inquirer.prompt({
            type: "list",
            name: "Quiz",
            message: data[i].question,
            choices: answer.map((val) => val),
        });
        if (ans.Quiz == data[i].correct_answer) {
            ++score;
            console.log(chalk.bold.italic.green("correct"));
        }
        else {
            console.log(`correct answer is ${chalk.bold.italic.red(data[i].correct_answer)}`);
        }
        console.log(`Dear ${chalk.blue.bold(name.fname)}, your score is ${chalk.yellow.bold(score)} out of ${chalk.yellow.bold("5")}`);
    }
    ;
};
startQuiz();
