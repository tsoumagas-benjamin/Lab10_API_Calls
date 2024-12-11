// Use DOM manipulation to select each of the elements for the API calls
const fetchButton = document.getElementById("fetch");
const XHRButton = document.getElementById("XHR");
const dataDisplay = document.getElementById("data-display");
const dataHeader = document.getElementById("data-header");
const dataForm = document.getElementById("data-form");

//Function to fetch data using GET requests and display in the data-display div
async function getData() {
    const target = "https://jsonplaceholder.typicode.com/posts/1";
    try {
        const response = await fetch(target);
        if(!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const json = await response.json();
        console.log(json.title);
        console.log(json.body);
        dataHeader.innerText = json.title;
        dataDisplay.innerText = json.body;
    } catch (error) {
        console.error(error.message);
        dataHeader.innerText = "Error!";
        dataDisplay.innerText = error.message;
    }
}

fetchButton.addEventListener('click', getData);