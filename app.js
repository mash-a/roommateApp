window.addEventListener('load', event => {
  const baseURL = 'http://localhost:3004/roommates/';
  const frontPage = document.querySelector(".frontPage");
  const secondPg = document.querySelector(".secondPage");
  const getWorkBtn = document.querySelector(".getTheWork");
  const listOfTasks = document.querySelector(".listOfTasks");
  const leftSide = document.querySelector(".leftSide");
  const rightSide = document.querySelector(".rightSide");
  const uniqueID = document.querySelector(".iD");
  const bottomRow = document.querySelector(".bottomRow");
  const thirdPg = document.querySelector(".thirdPage");
  const visualize = document.createElement("button");
  visualize.innerHTML = `<class="visualizeData btn btn-dark">Visualize`;
  let createTaskTable;
  let codeEditButton;
  const create = document.querySelector(".create");
  const home = document.querySelector("#home")

  const randomNumber = () => {
    let number = Math.random().toString(36).slice(2, 8);
    return number;
  }
  const on = (evt, item, cb) => {
    item.addEventListener(evt, cb);
  }

  getWorkBtn.addEventListener("click", (event) => {
    event.preventDefault();
    getWorkBtn.disabled = true;
    secondPg.setAttribute("id", "secondPg");
    secondPg.scrollIntoView();
    create.innerHTML = `Create New Task Table</div><div class="row"><button class="newTaskTableBtn btn btn-dark">Create</button>`
    rightSide.innerHTML = `Enter Code to edit existing Task Table <input id="code" type="integer"><button class="editExistingTableCode btn btn-dark">Submit</button>`
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
      <h6>Add a task</h6>
      <div class="form-group row">
      <label class="col-sm-3 col-form-label">Name</label>
      <div class="col-sm-6">
      <input type="text" id="personName" class="form-control">
      </div>
      </div>
      <div class="form-group row">
      <label class="col-sm-3 col-form-label">Task</label>
      <div class="col-sm-6">
      <input type="text" id="taskName" class="form-control">
      </div>
      </div>
      <div class="form-group row">
      <label class="col-sm-3 col-form-label">Frequency</label>
      <div class="col-sm-6">
      <input type="text" id="frequency" class="form-control">
      </div>
      </div>
      <div class="form-group row">
      <label class="col-sm-3 col-form-label">Due Date</label>
      <div class="col-sm-6">
      <input type="text" id="date" class="form-control">
      </div>
      </div>
      <div class="form-group row">
      <button id="createTaskTable" class="btn btn-dark">Submit</button>
      </div>
      </div>
        `
        create.innerHTML = "";
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
    let editElem;
    bottomRow.appendChild(visualize);
    on("click", visualize, (event) => {
      event.preventDefault();
      let newID = id;
      createTable(newID);
    })
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
            editElem = elem;
          })
          listOfTasks.appendChild(taskItem);

          }
        })
        let finishedButton = document.createElement("button");
        let editButton = document.createElement("button");
        finishedButton.innerHTML = `<class="delete btn btn-dark">Finished a task?`;
        editButton.innerHTML = `<class="edit btn btn-dark">Edit`;
        listOfTasks.appendChild(finishedButton);
        listOfTasks.appendChild(editButton);
        on("click", finishedButton, (event) => {
          event.preventDefault();
          deleteTasks(individualID, id);
        })
        on("click", editButton, (event) => {
          event.preventDefault();
          editTask(editElem, individualID, id);
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
    uniqueID.innerHTML = `Your code: ${id}`;
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
    <h6>Add a task</h6>
    <div class="form-group row">
    <label class="col-sm-3 col-form-label">Name</label>
    <div class="col-sm-6">
    <input type="text" id="personName" class="form-control">
    </div>
    </div>
    <div class="form-group row">
    <label class="col-sm-3 col-form-label">Task</label>
    <div class="col-sm-6">
    <input type="text" id="taskName" class="form-control">
    </div>
    </div>
    <div class="form-group row">
    <label class="col-sm-3 col-form-label">Frequency</label>
    <div class="col-sm-6">
    <input type="text" id="frequency" class="form-control">
    </div>
    </div>
    <div class="form-group row">
    <label class="col-sm-3 col-form-label">Due Date</label>
    <div class="col-sm-6">
    <input type="text" id="date" class="form-control">
    </div>
    </div>
    <div class="form-group row">
    <button id="createTaskTable" class="btn btn-dark">Submit</button>
    </div>
    </div>
      `
      create.innerHTML = "";
      rightSide.innerHTML = "";
      rightSide.appendChild(choreForm);
      createTaskTable = document.querySelector("#createTaskTable");
      on("click", createTaskTable, (event) => {
        event.preventDefault();
        createTask(id);
      });
  }

  const editTask = (task, id) => {
    const editChoreForm = document.createElement("form");
    editChoreForm.innerHTML = `
    <h6>Add a task</h6>
    <div class="form-group row">
    <label class="col-sm-3 col-form-label">Name</label>
    <div class="col-sm-6">
    <input type="text" id="personName" class="form-control"  value="${task.name}">
    </div>
    </div>
    <div class="form-group row">
    <label class="col-sm-3 col-form-label">Task</label>
    <div class="col-sm-6">
    <input type="text" id="taskName" class="form-control" value="${task.task_name}">
    </div>
    </div>
    <div class="form-group row">
    <label class="col-sm-3 col-form-label">Frequency</label>
    <div class="col-sm-6">
    <input type="text" id="frequency" class="form-control" value="${task.frequency}">
    </div>
    </div>
    <div class="form-group row">
    <label class="col-sm-3 col-form-label">Due Date</label>
    <div class="col-sm-6">
    <input type="text" id="date" class="form-control" value="${task.due_date}">
    </div>
    </div>
    <div class="form-group row">
    <button id="editTaskTable" class="">Donezo</button>
    </div>
    </div>
    `
      rightSide.innerHTML = "";
      rightSide.appendChild(editChoreForm);
      let submitBtn = document.querySelector("#editTaskTable");
      on("click", submitBtn, (event) => {
        event.preventDefault();
        const newName = document.querySelector("#personName").value;
        const newTask = document.querySelector("#taskName").value;
        const newFrequency = document.querySelector("#frequency").value;
        const newDate = document.querySelector("#date").value;
        const newData = {name: newName, task_name: newTask, frequency:newFrequency, due_date: newDate};
        axios.put(`${baseURL}${id}`, newData)
          .then(result => {
            let allID = result.data.unique_id;
            addTaskToExisting(allID);
            getAllTasks(allID);
          })
          .catch(error => {console.error(error);});
      })
  }



  const createTable = (unique_iD) => {
   let visualTable = document.querySelector("table");
    visualTable.innerHTML = `
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Task</th>
          <th scope="col">Frequency</th>
          <th scope="col">Due Date</th>
        </tr>
      </thead>
    `
    let tableBody = document.createElement("tbody");
    visualTable.appendChild(tableBody)
    axios.get(baseURL)
      .then(response => {
        response.data.forEach(elem => {
          if(elem.unique_id === unique_iD){
            let tableRow = document.createElement("tr");
            tableRow.innerHTML = `
              <th scope="row">${elem.name}</th>
              <td>${elem.task_name}</td>
              <td>${elem.frequency}</td>
              <td>${elem.due_date}</td>
              `
            tableBody.appendChild(tableRow)
          }
          thirdPg.setAttribute("id", "pageThree")
          thirdPg.scrollIntoView();
        })
      })
    .catch(error => {console.error(error)});
  }

})
