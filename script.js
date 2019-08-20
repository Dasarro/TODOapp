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
}

//MAIN

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
start();