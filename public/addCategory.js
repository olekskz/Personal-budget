const { response } = require("express");
const addCategory = document.getElementById('new-category')
const createCategoryButton = document.querySelector('.create-button');


createCategoryButton.addEventListener('click', () => {

    const name = document.getElementById('name').value;
    const money = document.getElementById('money').value;

    fetch(`/api/create?name=${name}&money=${money}`, {
        method: 'POST',
    })
    .then(response.json())
    .then(({data}) => {
        addCategory.innerHTML += `<p>Ім'я "${data.name}" і кількість грошей"${data.money}" були успішно додані в базу даних.</p>`
    })
})