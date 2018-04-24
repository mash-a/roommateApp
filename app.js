window.addEventListener('load', event => {
  console.log("Passive Aggressive App UPPP in da house");
  const baseURL = 'http://localhost:3004/roommates/';
  const frontPage = document.querySelector(".frontPage");
  let getWorkBtn = document.querySelector(".getTheWork");
  const secondPg = document.querySelector(".secondPage");
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
      let createTaskBtn = document.querySelector("#createTaskForm");
      createTaskBtn.addEventListener("click", () => {
        event.preventDefault();
        let numOfPPL = document.querySelector("#numberOfPeople").value;
        let numOfTasks = document.querySelector("#numberOfTasks").value;
        choreForm.innerHTML = "";
        createForm(numOfPPL, numOfTasks);
      })
  })

  const createForm = (numPPL, numTasks) => {
    frontPage.removeChild(getWorkBtn);
    let finalForm = document.createElement("form");
    finalForm.innerHTML = `<class="finalForm"><h4>Enter Names<h4>`
    for(let i = 0; i < numPPL; i++) {
      let pplNames = document.createElement("input");
      pplNames.innerHTML = `<class="pplNames">`
      finalForm.appendChild(pplNames);
      finalForm.appendChild(document.createElement('BR'));
      finalForm.appendChild(document.createElement('BR'));
    }
    finalForm.appendChild(document.createElement('BR'));
    finalForm.innerHTML += `<h4>Enter Tasks</h4>`
    for(let j = 0; j < numTasks; j++){
      let taskNames = document.createElement("input");
      taskNames.innerHTML = `<class="taskNames">`
      finalForm.appendChild(taskNames);
      finalForm.appendChild(document.createElement('BR'));
      finalForm.appendChild(document.createElement('BR'));
    }
    let submitFinalFormBtn = document.createElement("button");
    submitFinalFormBtn.innerHTML = `<class="submitFinalFormBtn"> Submit`
    finalForm.appendChild(submitFinalFormBtn);
    secondPg.appendChild(finalForm);
  }
})
