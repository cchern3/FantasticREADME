// Packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');

// Array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'Please enter your full name:',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('You must enter a full name to earn credit!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is your GitHub username?',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('Please provide a GitHub username!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address:',
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log('Please provide an email address to allow other to contact you if they have questions!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'title',
        message: 'Enter a title for this project:',
        validate: titleInput => {
            if (titleInput) {
                return true;
            } else {
                console.log('Please provide a title for the project!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: "Enter your project description here:",
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            } else {
                console.log('A description for this project is essential to understand what the project is about. Please provide one!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Enter intructions for installation:',
        validate: installationInput => {
            if (installationInput) {
                return true;
            } else {
                console.log('Please provide instructions for the installation of this project!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Enter instructions for usage:',
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log('Please provide instructions for usage to allow users to navigate your project appropriately.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'How can others contribute to this project?',
        validate: contributionInput => {
            if (contributionInput) {
                return true;
            } else {
                console.log('Please provide guidelines on how others can contribute to your project.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Give a description on how the tests were written for your project and how to use them:',
        validate: testsInput => {
            if (testsInput) {
                return true;
            } else {
                console.log('Please provide a description on how tests were written for the project.');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmLicenses',
        message: 'Would you like to include a license?',
        default: false
    },
    {
        type: 'list',
        name: 'licenses',
        message: 'Please select a license:',
        choices: ['MIT', 'GPL', 'CC--0'],
        when: ({ confirmLicenses }) => {
            if (confirmLicenses) {
                return true;
            } else {
                return false;
            }
        }
    },
];

// Function to write README file
const writeToFile = data => {
    return new Promise((resolve, reject) => {
        // function to make a readme file 
        fs.writeFile('README.md', data, err => {
            // if an error occurs, reject the Promise and refer the error to .catch() method
            if (err) {
                reject (err);
                return;
            }
            // resolve the Promise and refer the data to the .then() method
            resolve({
                ok: true,
                message: console.log('Success! Navigate to the file README.md to see your creation!')
            });
        })
    })
}

// Initialize application
const init = () => {
    return inquirer.prompt(questions);
}

// Function call to initialize app
init()
.then(userInput => {
    return generateMarkdown(userInput);
})
.then(readmeInfo => {
    return writeToFile(readmeInfo);
})
.catch(err => {
    console.log(err);
})