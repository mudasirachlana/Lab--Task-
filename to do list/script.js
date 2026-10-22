const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");
const clearBtn = document.getElementById("clearBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render(){
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        if(task.done) li.classList.add("completed");

        li.innerHTML = `
            <div class="task-left" onclick="toggleTask(${index})">
                <input type="checkbox" ${task.done ? "checked" : ""}>
                <span>${task.text}</span>
            </div>
            <button class="deleteBtn" onclick="deleteTask(${index})">X</button>
        `;
        taskList.appendChild(li);
    });
    counter.textContent = `${tasks.filter(t => !t.done).length} tasks pending`;
}

function addTask(){
    let text = taskInput.value.trim();
    if(text === ""){
        alert("Task likho pehle!");
        return;
    }
    tasks.push({ text: text, done: false });
    taskInput.value = "";
    save();
    render();
}

function toggleTask(index){
    tasks[index].done = !tasks[index].done;
    save();
    render();
}

function deleteTask(index){
    tasks.splice(index, 1);
    save();
    render();
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e)=>{
    if(e.key === "Enter") addTask();
});
clearBtn.addEventListener("click", ()=>{
    tasks = [];
    save();
    render();
});

render();