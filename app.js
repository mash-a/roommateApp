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

  let createTaskTable;
  let codeEditButton;

  const randomNumber = () => {
    let number = Math.random().toString(36).slice(2, 8);
    return number;
  }

  getWorkBtn.addEventListener("click", (event) => {
    event.preventDefault();
    getWorkBtn.disabled = true;
    secondPg.setAttribute("id", "secondPg");
    secondPg.scrollIntoView();
    rightSide.innerHTML = `Create New Task Table<button class="newTaskTableBtn">Create</button> or Enter Code to edit existing Task Table <input id="code" type="integer"><button class="editExistingTableCode">Submit</button>`
    codeEditButton = document.querySelector(".editExistingTableCode");

    on("click", codeEditButton, (event) => {
      let code = document.querySelector("#code").value;
      event.preventDefault;
      editTasks(code);
      rightSide.innerHTML = "";
      addTaskToExisting(code);
    })
    const createNewTaskTable = document.querySelector(".newTaskTableBtn");

    createNewTaskTable.addEventListener("click", (event) => {
      event.preventDefault();
      const choreForm = document.createElement("form");
      choreForm.innerHTML = `
        <h6>Add a task<h6>
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
        const sessionID = randomNumber();
        createTaskTable = document.querySelector("#createTaskTable");
        on("click", createTaskTable, (event) => {
          event.preventDefault();
          createTask(sessionID);
        })
        uniqueID.innerHTML = `Code to access your session again: ${sessionID}`;
    })
  })

  const getAllTasks = (id) => {
    let individualID;
    axios.get(baseURL)
      .then (response => {
        listOfTasks.innerHTML = "";
        response.data.forEach(elem => {
         if(elem.unique_id === id){
          let taskItem = document.createElement('li');
          taskItem.innerHTML = `${elem.task_name} (${elem.due_date})<input type="radio" name="task" value="completedTask">`;
          taskItem.addEventListener("click", (event)=>{
            let radioBtn = event.target.firstElementChild;
            radioBtn.checked = true;
            individualID = elem.id
            console.log(individualID)
          })
          listOfTasks.appendChild(taskItem);
          }
        })
        let finishedButton = document.createElement("button");
        let editButton = document.createElement("button");
        finishedButton.innerHTML = `<class="delete">Finished a task?`;
        editButton.innerHTML = `<class="edit">Edit`;
        listOfTasks.appendChild(finishedButton);
        listOfTasks.appendChild(editButton);
        on("click", finishedButton, () => {
          deleteTasks(individualID, id);
        })
        on("click", editButton, () => {

        })
      })
      .catch(error => {console.error(error);});
  }

 const createTask = (id) => {
    const name = document.getElementById("personName").value;
    const task_name = document.getElementById("taskName").value;
    const frequency = document.getElementById("frequency").value;
    const due_date = document.getElementById("date").value;
    const unique_id = id;
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

  const editTasks = (id) => {
    uniqueID.innerHTML = `${id}`;
    getAllTasks(id);
    addTaskToExisting(id);
  }

  const deleteTasks = (one_id, all_id) => {
    axios.delete(`${baseURL}${one_id}`)
      .then(result => {
        listOfTasks.innerHTML = "";
        getAllTasks(all_id);
      })
      .catch(error => {console.error(error);})
  };

  const addTaskToExisting = (id) => {
    const choreForm = document.createElement("form");
    choreForm.innerHTML = `
      <h6>Add a task<h6>
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
      rightSide.appendChild(choreForm);
      createTaskTable = document.querySelector("#createTaskTable");
      on("click", createTaskTable, (event) => {
        event.preventDefault();
        createTask(id);
      });
  }

  const updateTask = (id) => {
    
  }

  const on = (evt, item, cb) => {
    item.addEventListener(evt, cb);
  }



})
