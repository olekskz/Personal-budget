const { response } = require("express")

const bodyDiv = document.getElementsByClassName('main-body')

const renderError = () => {
    bodyDiv.innerHTML = `<p>Your request returned an error from the server: </p>
    <p>Code: ${response.status}</p>
    <p>${response.statusText}</p>
    `
}

const resetCategory = () => {
    bodyDiv.innerHTML = '';
}