class Task {
    isDone = false;
    _date = new Date();
    task;
    
    constructor(task) {
        this.task=task;
    }
    changeDone() {
        isDone ? isDone = false : isDone = true;
    }
    updateDate() {
       this._date = new Date();
    }
    updateTask(newTask) {
        this.task = newTask;
        this._date = new Date();
    }
}

getNumbers = () => {
    const numbers = prompt("Type in numbers of task(separated by space), which you want to modify");
    return numbers.split(' ');
}

checkTask = () => {
    let decisions = getNumbers();
    decisions.sort((a,b) => a-b);
    let allCorrect = true;
    let shift = 0;
    for (let i=0; i<decisions.length; i++) {
        if(((parseInt(decisions[i]), 10) !== NaN) && decisions[i]-1<tasks.length && decisions[i]>0) {
            if (tasks[decisions[i]-1-shift].isDone === false) { 
                tasks[decisions[i]-1-shift].isDone = true;
                tasks = tasks.concat(tasks.splice(decisions[i]-1-shift, 1));
                shift++;
                checkedCounter++;
            }
            else allCorrect = false;
        }
        else allCorrect = false;
    }
    if (allCorrect === false) alert('Some of your arguments were invalid, thus they were omitted.');
}

uncheckTask = () => {
    let decisions = getNumbers();
    decisions.sort((a,b) => a-b);
    let allCorrect = true;
    let shift = 0;
    let tempArray = [];
    for (let i=0; i<decisions.length; i++) {
        if(((parseInt(decisions[i]), 10) !== NaN) && decisions[i]-1-shift<tasks.length && decisions[i]>0) {
            if (tasks[decisions[i]-1-shift].isDone === true) { 
                tasks[decisions[i]-1-shift].isDone = false;
                tempArray = tempArray.concat(tasks.splice(decisions[i]-1-shift, 1));
                checkedCounter--;
                shift++;
            }
            else allCorrect = false;
        }
        else allCorrect = false;
    }
    if (allCorrect === false) alert('Some of your arguments were invalid, thus they were omitted.');
    tasks.splice(tasks.length-checkedCounter, 0, ...tempArray);
}

deleteTask = () => {
    let decisions = getNumbers();
    let allCorrect = true;
    decisions.sort((a,b) => a-b);
    let shift = 0;
    for (let i=0; i<decisions.length; i++) {
        if(((parseInt(decisions[i]), 10) !== NaN) && decisions[i]-1-shift<tasks.length && decisions[i]>0) {
            let done = tasks[decisions[i]-1-shift].isDone;
            tasks.splice(decisions[i]-1-shift, 1);
            shift++;
            if(done) checkedCounter--;
        }
        else allCorrect = false;
    }
    if (allCorrect === false) alert('Some of your arguments were invalid, thus they were omitted.');
}

modifyTask = () => {
    let decisions = getNumbers();
    let allCorrect = true;
    decisions.sort((a,b) => a-b);
    for (let i=0; i<decisions.length; i++) {
        if(((parseInt(decisions[i]), 10) !== NaN) && decisions[i]-1<tasks.length && decisions[i]>0) {
            let modifiedTask = prompt(`Type in a new content of ${decisions[i]}. task`);
            tasks[decisions[i]-1].updateTask(modifiedTask);
        }
        else allCorrect = false;
    }
    if (allCorrect === false) alert('Some of your arguments were invalid, thus they were omitted.');
}

moveTask = ()  => {
    const numbers = prompt("Type in number of task that you want to move and position to move at(separated by space)");
    const decision = numbers.split(' ')[0];
    const destination = numbers.split(' ')[1];
    let allCorrect = true;
    if(((parseInt(decision), 10) !== NaN) && decision-1<tasks.length && decision>0 && ((parseInt(destination), 10) !== NaN) && destination-1<tasks.length && ((tasks[decision-1].isDone==true && destination-1>=tasks.length-checkedCounter && destination-1<tasks.length) || (tasks[decision-1].isDone==false && destination-1>=0 && destination-1<tasks.length-checkedCounter))) {
        
        tasks.splice(destination-1, 0, tasks.splice(decision-1, 1)[0]);
    }
    else allCorrect = false;
    if (allCorrect === false) alert('Some of your arguments were invalid, thus operation is impossible to do.');
}

start = () => {
    console.log('%cYour current task lisk:', "color: #085293; text-decoration: underline");
    if (tasks.length===0) console.log('%cNo active tasks.', "color: #1F9AD7");
    else {
        for(let i=0; i<tasks.length; i++)
        {
            if (tasks[i].isDone===false) console.log(`%c${i+1}. ${tasks[i].task}`, "color: #1F9AD7");
            else console.log(`%c${i+1}. ${tasks[i].task}`, "color: gray; text-decoration: line-through");
        }
    }
    let decision = prompt("Type in(without apostrophes):\n'a' to add a new task\n'e' to edit some tasks\n'm' to move a task\n'd' to delete some tasks\n'c' to check some tasks\n'u' to uncheck some tasks\n'r' to reset(delete all tasks)\nany other to exit");
    switch (decision) {
        case 'a':
            const add = prompt('Type in the task.');
            tasks.splice(tasks.length-checkedCounter, 0, new Task(add));
            console.clear();
            localStorage.setItem('tasks', JSON.stringify(tasks));
            break;
        case 'c':
            checkTask();
            console.clear();
            localStorage.setItem('tasks', JSON.stringify(tasks));
            localStorage.setItem('checkedCounter', JSON.stringify(checkedCounter));
            break;
        case 'u':
            uncheckTask();
            console.clear();
            localStorage.setItem('tasks', JSON.stringify(tasks));
            localStorage.setItem('checkedCounter', JSON.stringify(checkedCounter));
            break;
        case 'e':
            modifyTask();
            console.clear();
            localStorage.setItem('tasks', JSON.stringify(tasks));
            break;
        case 'd':
            deleteTask();
            console.clear();
            localStorage.setItem('tasks', JSON.stringify(tasks));
            localStorage.setItem('checkedCounter', JSON.stringify(checkedCounter));
            break;
        case 'm':
            moveTask();
            console.clear();
            localStorage.setItem('tasks', JSON.stringify(tasks));
            break;
        case 'r':
            tasks = [];
            checkedCounter = 0;
            console.clear();
            localStorage.setItem('tasks', JSON.stringify(tasks));
            localStorage.setItem('checkedCounter', JSON.stringify(checkedCounter));
            break;
        default: 
            return;
    }
    start();
}

//MAIN

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let checkedCounter = JSON.parse(localStorage.getItem('checkedCounter')) || 0;
start();