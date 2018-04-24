window.addEventListener('load', event => {
  console.log("Passive Aggressive App UPPP in da house");
  const baseURL = 'http://localhost:3004/roommates/';
  const frontPage = document.querySelector(".frontPage");
  const secondPg = document.querySelector(".secondPage");
  const leftSide = document.querySelector(".leftSide");
  const rightSide = document.querySelector(".rightSide");
  const getWorkBtn = document.querySelector(".getTheWork");
  const listOfTasks = document.querySelector(".listOfTasks");
  getWorkBtn.addEventListener("click", () => {
    event.preventDefault();
    secondPg.setAttribute("id", "second");
    getWorkBtn.disabled = true;
    const choreForm = document.createElement("form");
    getAllTasks();
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
      rightSide.appendChild(choreForm);
      choreForm.scrollIntoView();
      let createTaskTable = document.querySelector("#createTaskTable");
        createTaskTable.addEventListener("click", (event) => {
          console.log("new task?")
          event.preventDefault();
          createTask();
        })
  })
  const getAllTasks = () => {
    axios.get(baseURL)
      .then (response => {
        listOfTasks.innerHTML = "";
        response.data.forEach(elem => {
          let taskItem = document.createElement('li');
          taskItem.innerHTML = `${elem.task_name} (${elem.name})`;
          listOfTasks.appendChild(taskItem);
        })
      })
      .catch(error => {console.error(error);});
  }
  const createTask = () => {
    console.log("is this being called?")
    const name = document.getElementById("personName").value;
    const task_name = document.getElementById("taskName").value;
    const frequency = document.getElementById("frequency").value;
    const due_date = document.getElementById("date").value;
      axios.post(`${baseURL}`, {name, task_name, frequency, due_date})
      .then(response => {
        getAllTasks();
      })
      .catch(error => {console.error(error);});

  }
})
