// Use DOM manipulation to select each of the elements for the API calls
const fetchButton = document.getElementById("fetch");
const XHRButton = document.getElementById("XHR");
const deleteButton = document.getElementById("delete-button");
const deletionIndex = document.getElementById("deletion-index");
const dataDisplay = document.getElementById("data-display");
const dataHeader = document.getElementById("data-header");
const dataForm = document.getElementById("data-form");
const userID = document.getElementById("user-id");
const userTitle = document.getElementById("user-title");
const userBody = document.getElementById("user-body");
const submitForm = document.getElementById("submit-form");

//Function to fetch data using GET requests and display in the data-display div
async function getData() {
    const target = "https://jsonplaceholder.typicode.com/posts/1";
    try {
        // Try to GET with fetch from the target API
        const response = await fetch(target);
        // Handle any errors we might get after fetching
        if(!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        // Receive the response as a JSON and parse for the title and body; display it
        const json = await response.json();
        console.log(json.title);
        console.log(json.body);
        dataHeader.innerText = json.title;
        dataDisplay.innerText = json.body;
    // Display error messages if they happen
    } catch (error) {
        console.error(error.message);
        dataHeader.innerText = "Error!";
        dataDisplay.innerText = error.message;
    }
}

// Retrieve data from an API using XMLHTTPRequests
function getXHRData() {
    const target = "https://jsonplaceholder.typicode.com/posts/2";
    // Initialize a GET request with a XHR object
    const request = new XMLHttpRequest();
    request.open("GET", target);
    // Handle abort, error, or timeouts
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
    // On load, parse response as a JSON object for title and body; display it
    request.addEventListener('load', () => {
        let json = JSON.parse(request.responseText);
        console.log(json.title);
        console.log(json.body);
        dataHeader.innerText = json.title;
        dataDisplay.innerText = json.body;
    });
    // Initiate the GET request
    request.send();
}

//Function to delete data using DELETE requests and display if we are successful
function deleteXHRData() {
    let target = "https://jsonplaceholder.typicode.com/posts";
    if (deletionIndex.value) {
        target = target + `/${deletionIndex.value}`;
        // Initialize a DELETE request with a XHR object
        const request = new XMLHttpRequest();
        request.open("DELETE", target);
        // Handle abort, error, or timeouts
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
        // Alert user the post has been deleted
        alert(`Post ${deletionIndex.value} was updated!`);
    } else {
        alert("Cannot delete post without specified ID!");
    }
}

//Function to post data using PUT/POST requests and display if we are successful
async function postData() {
    let target = "https://jsonplaceholder.typicode.com/posts";
    // If user provides an ID to replace, perform a PUT request with XMLHTTPRequests instead
    if (userID.value) {
        target = target + `/${userID.value}`;
        // Initialize a GET request with a XHR object
        const request = new XMLHttpRequest();
        request.open("PUT", target);
        // Handle abort, error, or timeouts
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
        // On load, parse response as a JSON object for title and body; display it
        request.addEventListener('load', () => {
            alert(`Post ${userID.value} was updated!`);
        });
        // Initiate the PUT request with the content from the user
        request.send(JSON.stringify({id: userID.value, title: userTitle, body: userBody}));
    // If there is no ID provided, do a POST request with fetch()
    } else {
        try {
            // Try to POST with fetch to the target API
            const response = await fetch(target, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({title: userTitle, body: userBody})
            });
            // Handle any errors we might get after fetching
            if(!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            // Receive the response as a JSON and let the user know it worked
            const json = await response.json();
            alert("Successfully sent data using POST");
            console.log(json);
        // Display error messages if they happen
        } catch (error) {
            console.error(error.message);
            dataHeader.innerText = "Error!";
            dataDisplay.innerText = error.message;
        }
    }
}

fetchButton.addEventListener('click', getData);
XHRButton.addEventListener('click', getXHRData);
deleteButton.addEventListener('click', deleteXHRData);
submitForm.addEventListener('click', postData);