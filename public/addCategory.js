const categoryForm = document.getElementById('add-category');
const returnButton = document.querySelector('.return-button');

categoryForm.addEventListener('submit', async function(event) { 
    event.preventDefault();

    const category_value = document.getElementById('money').value;
    const category_name = document.getElementById('name').value;

    const data = { category_name, category_value };

    try {
        
        console.log('Submitting category:', data);

        const response = await fetch(`/create-category`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Server Response:', result);
        } else {
            alert(`Error: ${response.statusText}`);
        }

        categoryForm.reset(); 

    } catch (error) {
        console.error('Error: ', error);
        alert('Cannot connect to server');
    }
});


returnButton.addEventListener('click', () => {
    window.location.href = "index.html"
});
