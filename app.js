window.addEventListener('load', event => {
  console.log("Passive Aggressive App UPPP in da house");
  const baseURL = 'http://localhost:3004/roommates/';
  let getWorkBtn = document.querySelector(".getTheWork")
  const secondPg = document.querySelector(".secondPage")
  getWorkBtn.addEventListener("click", () => {
    event.preventDefault();
    secondPg.setAttribute("id", "second");
    const choreForm = document.createElement("form");
    choreForm.innerHTML = `
      <h6>Create Your Task Table<h6>
      <label>No. of Folx</label>
      <br>
      <input type="text" id="numberOfPeople"/>
      <br><br>
      <label>No. of Tasks<label>
      <br>
      <input type="text" id="numberOfTasks" />
      <br><br>
      <button id="createTaskForm">Submit</button>`
      secondPg.appendChild(choreForm);
      choreForm.scrollIntoView();
      let createTaskBtn = form.querySelector("#createTaskForm");
      createTaskBtn.addEventListener("click", () => {
        
      })
  })
})
