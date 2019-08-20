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
                if(decisions[i]+1===decisions[i+1]) i--;
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
                shift++;
            }
            else allCorrect = false;
        }
        else allCorrect = false;
    }
    if (allCorrect === false) alert('Some of your arguments were invalid, thus they were omitted.');
    for (let i=0; i<=tasks.length; i++) {
        if(i===tasks.length) {
            tasks=tasks.concat(tempArray);
            break;
        }
        else if(tasks[i].isDone===true) {
                tasks.splice(i, 0, ...tempArray);
                break;
        }
    }
}

deleteTask = () => {
    let decisions = getNumbers();
    let allCorrect = true;
    decisions.sort((a,b) => a-b);
    let shift = 0;
    for (let i=0; i<decisions.length; i++) {
        if(((parseInt(decisions[i]), 10) !== NaN) && decisions[i]-1-shift<tasks.length && decisions[i]>0) {
            tasks.splice(decisions[i]-1-shift, 1);
            shift++;
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
    let decision = prompt("Type in 'x'(without apostrophes) to exit, 'a' to add a new task, 'm' to move a task, 'e' to edit, 'd' to delete, 'c' to check and 'u' to uncheck some tasks");
    if (decision=='x') return;
    if (decision=='a') {
        const add = prompt('Type in the task.');
        for (let i=0; i<=tasks.length; i++) {
            if (i===tasks.length) {
                tasks.push(new Task(add));
                break;
            }
            if(tasks[i].isDone === true) {
                tasks.splice(i, 0, new Task(add));
                break;
            }
        }
        console.clear();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        start();
    }
    if (decision=='c') {
        checkTask();
        console.clear();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        start();
    }
    if (decision=='u') {
        uncheckTask();
        console.clear();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        start();
    }
    if (decision=='e') {
        modifyTask();
        console.clear();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        start();
    }
    if (decision=='d') {
        deleteTask();
        console.clear();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        start();
    }
}

//MAIN

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
start();