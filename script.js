// Use DOM manipulation to select each of the elements for the API calls
const fetchButton = document.getElementById("fetch");
const XHRButton = document.getElementById("XHR");
const dataDisplay = document.getElementById("data-display");
const dataHeader = document.getElementById("data-header");
const dataForm = document.getElementById("data-form");
const userTitle = document.getElementById("user-title");
const userBody = document.getElementById("user-body");
const submitForm = document.getElementById("submit-form");

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

// Retrieve data from an API using XMLHTTPRequests
function getXHRData() {
    const target = "https://jsonplaceholder.typicode.com/posts/2";
    const request = new XMLHttpRequest();
    request.open("GET", target);
    request.addEventListener('abort', () => {
        dataHeader.innerText = "Request Aborted!";
        dataDisplay.innerText = "XMLHTTPRequest was aborted!";
    });
    request.addEventListener('error', () => {
        dataHeader.innerText = "Error!";
        dataDisplay.innerText = "XMLHTTPRequest not completed!";
    });
    request.addEventListener('timeout', () => {
        dataHeader.innerText = "Request Timed Out!";
        dataDisplay.innerText = "XMLHTTPRequest was timed out!";
    });
    request.addEventListener('load', () => {
        let json = JSON.parse(request.responseText);
        console.log(json.title);
        console.log(json.body);
        dataHeader.innerText = json.title;
        dataDisplay.innerText = json.body;
    });
    request.send();
}

//Function to post data using POST requests and display if we are successful
async function postData() {
    const target = "https://jsonplaceholder.typicode.com/posts";
    try {
        const response = await fetch(target, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({title: userTitle, body: userBody})
        });
        if(!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const json = await response.json();
        alert("Successfully sent data using POST");
        console.log(json);
    } catch (error) {
        console.error(error.message);
        dataHeader.innerText = "Error!";
        dataDisplay.innerText = error.message;
    }
}

fetchButton.addEventListener('click', getData);
XHRButton.addEventListener('click', getXHRData);
submitForm.addEventListener('click', postData);