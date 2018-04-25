window.addEventListener('load', event => {
  console.log("Passive Aggressive App UPPP in da house");
  const baseURL = 'http://localhost:3004/roommates/';
  const frontPage = document.querySelector(".frontPage");
  const secondPg = document.querySelector(".secondPage");
  const getWorkBtn = document.querySelector(".getTheWork");
  const listOfTasks = document.querySelector(".listOfTasks");
  const leftSide = document.querySelector(".leftSide");
  const rightSide = document.querySelector(".rightSide");
  const uniqueID = document.querySelector(".iD");
  let sessionID;
  let createTaskTable;

  const randomNumber = () => {
    let number = Math.random().toString(36).slice(2, 8);
    return number;
  }

  getWorkBtn.addEventListener("click", (event) => {
    event.preventDefault();
    getWorkBtn.disabled = true;
    secondPg.setAttribute("id", "second");
    rightSide.innerHTML = `Create New Task Table<button class="newTaskTableBtn">Create</button> or Enter Code to edit existing Task Table <input id="code" type="integer"><button class="editExistingTableCode">Submit</button>`
    secondPg.scrollIntoView();
    const createNewTaskTable = document.querySelector(".newTaskTableBtn");

    createNewTaskTable.addEventListener("click", (event) => {
      event.preventDefault();

      const choreForm = document.createElement("form");
      choreForm.innerHTML = `
        <h6>Create Your Task Table<h6>
        <label>Name</label>
        <br>
        <input type="text" id="personName"/>
        <br><br>
        <label>Task<label>
        <br>
        <input type="text" id="taskName" />
        <br><br>
        <label>Frequency<label>
        <br>
        <input type="text" id="frequency" />
        <br><br>
        <label>Due Date<label>
        <br>
        <input type="text" id="date" />
        <br><br>
        <button id="createTaskTable">Submit</button>
        `
        rightSide.innerHTML = "";
        rightSide.appendChild(choreForm);
        leftSide.appendChild(uniqueID);
        sessionID = randomNumber();
        createTaskTable = document.querySelector("#createTaskTable");
        on("click", createTaskTable, (event) => {
          event.preventDefault();
          createTask(sessionID);
        })
        uniqueID.innerHTML = `Code to access your session again: ${sessionID}`;
        getAllTasks();
    })
  })
  console.log(uniqueID.innerHTML);

  const getAllTasks = (id) => {
    axios.get(baseURL)
      .then (response => {
        listOfTasks.innerHTML = "";
        response.data.forEach(elem => {
         if(elem.unique_id === id){
          let taskItem = document.createElement('li');
          taskItem.innerHTML = `${elem.task_name} (${elem.due_date})<input id="checkBox" type="checkbox">`;
          listOfTasks.appendChild(taskItem);
          }
          let finishedButton = document.createElement("button");
          finishedButton.innerHTML = "Finished a task?";
          listOfTasks.appendChild(finishedButton);
        })
      })
      .catch(error => {console.error(error);});
  }

 const createTask = (id) => {
    console.log("is this being called?")
    const name = document.getElementById("personName").value;
    const task_name = document.getElementById("taskName").value;
    const frequency = document.getElementById("frequency").value;
    const due_date = document.getElementById("date").value;
    let unique_id = id;
    axios.post(`${baseURL}`, {name, task_name, frequency, due_date, unique_id})
      .then(response => {
        getAllTasks(unique_id);
         document.getElementById("personName").value = "";
         document.getElementById("taskName").value = "";
         document.getElementById("frequency").value = "";
         document.getElementById("date").value = "";
      })
      .catch(error => {console.error(error);});
  }

  const editTasks = () => {

  }

  const on = (evt, item, cb) => {
    item.addEventListener(evt, cb);
  }

})
