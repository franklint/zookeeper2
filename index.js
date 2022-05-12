const inquirer = require ("inquirer"); 
const fs = require("fs"); 
const teamProfile = require("./src/page-template.js"); 

const Engineer = require("./lib/Engineer"); 
const Intern = require("./lib/Intern"); 
const Manager = require("./lib/Manager"); 

//going to setup an array for answers to Q&A 
const teamRoster = []; 

const questions = async() => {
    const answers = await inquirer
    .prompt([
       
        {
            type: "input", 
            message: "what is your name?", 
            name: "name", 
        }, 
        {
            type: "input", 
            message: "what is your ID?", 
            name: "id", 
        }, 
        {
            type: "input", 
            message: "What is your email?", 
            name: "email", 
        },
        {   
            type: "list",  
            message: "What is your role?", 
            name: "role", 
            choices: ["Engineer", "Intern", "Manager"], 
        },        
    ])

    //conditional statements for answers on roll see below here 

    if(answers.role === "Manager"){
        const managerAnswer = await inquirer 
        .prompt ([
            {
                type: "input", 
                message: "What is your office number", 
                name: "officeNumber"
            }, 
        ])
        const newManager = new Manager(
            answers.name, 
            answers.id, 
            answers.email,
            managerAnswer.officeNumber
        ); 
        teamRoster.push(newManager); 
    } else if (answers.role === "Engineer") {
        const githubAnswer = await inquirer 
        .prompt([
            {
                type: "input", 
                message: "What is your Github user name?", 
                name: "github"
            }
        ])
            const newEngineer = new Engineer (
                answers.name, 
                answers.id, 
                answers.email, 
                githubAnswer.github 
            );
            teamRoster.push(newEngineer); 
    } else if (answers.role === "Intern") {
        const internAnswer = await inquirer 
        .prompt([
            {
                type: "input",
                message: "what school did you attend?", 
                name: "school", 
            } 
        ]);

        const newIntern = new Intern(
            answers.name, 
            answers.id, 
            answers.email,
            internAnswer.school
        ); 
        teamRoster.push(newIntern); 
    }
}; 

async function promptQuestion(){
    await questions() 

    const addMemberAns = await inquirer 
    .prompt([
        {
            name: 'addMember', 
            type: 'list', 
            choices: ['Add another member', 'Create team'], 
            message: "what woudl you like to do next?"
        }
    ])

    if(addMemberAns.addMember === 'Add another member') {
        return promptQuestion()
    }
    return newTeam(); 
}

promptQuestion(); 

function newTeam() {
    fs.writeFileSync("./dist/index.html", teamProfile(teamRoster), "utf-8"); 
}

