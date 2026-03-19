let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteAllBtn = document.getElementById("deleteAll-btn");
const tabBtn = document.getElementById("tab-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(tabs);
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

deleteAllBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener("click", function () {
  if (inputEl.value) {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  }
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]} 
                </a> 
                <button class="delete-single" data-index="${i}">🗑️</button>
            </li>   
        `;
  }
  ulEl.innerHTML = listItems;

  const deleteSingleButtons = document.querySelectorAll(".delete-single");
  deleteSingleButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const index = e.currentTarget.dataset.index;
      deleteLead(index);
    });
  });
}

function deleteLead(index) {
  myLeads.splice(index, 1);
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
}
