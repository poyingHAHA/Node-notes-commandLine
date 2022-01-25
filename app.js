// 1.
/**
 * The require function is how we load in other things, whether it's a core node module, 
 * another file we created or an npm module we've chosen to install and use in our project.
 */
// const fs = require('fs');

// fs.writeFileSync('notes.txt', 'This file was created by Node.js!');

/**
 * Challenge: Append a message to notes.txt
 * 
 * 1. Use appendFileSync to append to the file
 * 2. Run the script
 * 3. Check your work by opening the file and viewing the appended text
 */
// fs.appendFileSync('notes.txt', "\nI am Edwin");

//---------------------------------------------------------------
/* 2. All of your files, which you can refer to as modules have their own scope.
 *    So app.js has its own scope with its own scope, and utils has its own scope with its own variables.
 *    We need to explicity export all of the stuff this file should share with outside.
 */
// const namefromUtil = require('./utils.js')

// const name = 'Edwin';
// console.log(namefromUtil)

/**
 * Challenge: Define and use a function in a new file
 * 
 * 1. Create a new file called notes.js
 * 2. Create getNotes function that returns "Your notes..."
 * 3. Export getNotes function
 * 4. From app.js, load in and call the function printing message to console
 */
// const getNotes = require('./notes.js')

// console.log(getNotes())

//----------------------------------------------------------------
/**
 * 3. use package from npm
 *   - do npm init
 *   - npm i (package)
 */
// const validator = require('validator') 

// console.log(validator.isEmail('edwin@gmail.com'))
// console.log(validator.isURL("https://nccu.edu.tw"))

/**
 * Challenge: Use the chalk library in your project
 * 
 * 1. Install version 2.4.1 of chalk
 * 2. Load chalk into app.js
 * 3. Use it toprint the string "Success!" to the console in green
 */

// const chalk = require('chalk')
// console.log(chalk.bold.green('Success!'))
//----------------------------------------------------------------
/**
 * 4. Note App
 */
const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

// Customize yargs version
yargs.version('1.1.0')


//Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder:{
        title:{
            describle: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        // console.log('Title: '+argv.title)
        // console.log('Body : '+argv.body)
        notes.addNote(argv.title, argv.body)
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})

// Create list command
yargs.command({
    command: 'list',
    describe: 'List all the notes',
    handler(){
        notes.listNotes()
    }
})

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title:{
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})

console.log(yargs.argv)