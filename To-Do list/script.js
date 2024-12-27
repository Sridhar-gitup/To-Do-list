class Todo {
    constructor() {
        this.taskInput = document.getElementById("input");
        this.taskList = document.getElementById("taskList");

        this.loadTasks();

        document.getElementById("add_button").addEventListener("click", () => this.addTask());
        document.querySelector(".complete").addEventListener("click", () => this.filterElements('complete'));
        document.querySelector(".pending").addEventListener("click", () => this.filterElements('pending'));
        document.querySelector(".all").addEventListener("click", () => this.filterElements('all'));
    }

    saveToLocalStorage() {
        const tasks = [];
        document.querySelectorAll(".div_box").forEach((item) => {
            const taskText = item.querySelector("span").textContent;
            const isChecked = item.querySelector(".checkBox").checked;
            tasks.push({ text: taskText, completed: isChecked });
        });
        localStorage.setItem("tasksList", JSON.stringify(tasks));
    }

    loadTasks() {
        const tasksStore = JSON.parse(localStorage.getItem("tasksList")) || [];
        tasksStore.forEach(task => {
            const listItemStore = this.createTaskElement(task.text, task.completed);
            this.taskList.appendChild(listItemStore);
        });
    }

    createTaskElement(text,completed = false) {
        const listItem = document.createElement("div");
        listItem.className = 'div_box';
        listItem.innerHTML = `<input type="checkbox" class="checkBox" ${completed ? "checked" : ""}>
            <span>${text}</span> 
            <button class="ed"><i class="fa-solid fa-pen"></i></button>
            <button class="del"><i class="fa-solid fa-trash-can"></i></button>`;

        listItem.querySelector(".ed").addEventListener("click", (event) => this.editElement(event));
        listItem.querySelector(".del").addEventListener("click", (event) => this.deleteElement(event));
        listItem.querySelector(".checkBox").addEventListener("change", () => this.saveToLocalStorage());

        return listItem;
    }

    addTask() {
        if (this.taskInput.value === "") 
            {return alert("Add Some Task");}
        else{
        const list = this.createTaskElement(this.taskInput.value);
        this.taskList.appendChild(list);
        this.taskInput.value = '';
        this.saveToLocalStorage();
        }
    }

    deleteElement(event) {
        event.target.parentElement.parentElement.remove();
        this.saveToLocalStorage();
    }

    editElement(event) {
        const edit = event.target.parentElement;
        const edited = edit.querySelector("span").textContent;
        this.taskInput.value = edited;
        edit.remove();
        this.saveToLocalStorage();
    }

    filterElements(filter) {
        const items = document.querySelectorAll(".div_box");
        items.forEach((item) => {
            const checkBox = item.querySelector(".checkBox");
            if (filter === "complete" && !checkBox.checked) {
                item.style.display = "none";
            } 
            else if (filter === "pending" && checkBox.checked) {
                item.style.display = "none";
            } 
            else {
                item.style.display = "flex";
            }
        });
    }
}

const todo = new Todo();
