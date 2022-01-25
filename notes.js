const fs = require('fs')
const chalk = require('chalk')

// const getNotes = () => {
//     return "Your notes..."
// }

const addNote = (title, body) => {
    const notes = loadNotes()
    
    // block duplicateNotes, filter is going to return a subset of the notes array. the function is called one time for each note
    // const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)

    debugger

    if(!duplicateNote){ //No duplicate note 
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else{
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesTokeep = notes.filter((note) => note.title !== title)
    
    if(notesTokeep.length !== notes.length){
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesTokeep)
    }else{
        console.log(chalk.red.inverse('No node found!'))
    }   
}

/**
 * The first thing we have to do is load in the existing notes. We don't want to add note to overide any data.
 * We want to load the existing ones stored as JSON, we're going to parse them. We're going to add something new
 * onto the array and then save them back to file system.
 */
const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJsON)
}

const listNotes = ()=>{
    const notes = loadNotes()
    console.log(chalk.yellow.inverse("Your Notes: "))
    notes.forEach(note => {
        console.log(chalk.inverse(note.title))
    });
}

const readNote = (title) => {
    const notes = loadNotes()
    const match = notes.find((note)=>{
        return title === note.title;
    })

    if(match){
        console.log(chalk.green.inverse(match.title)+'\n'+chalk.inverse(match.body))
    }else{
        console.log(chalk.red.inverse('No such Note'))
    }
}

// module.exports = getNotes;

// Export more than two function
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
}