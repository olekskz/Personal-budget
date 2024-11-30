const categoryForm = document.getElementById('add-category');

categoryForm.addEventListener('submit', async function(event) { 
    event.preventDefault();

    
    const category_value = document.getElementById('money').value;
    const category_name = document.getElementById('name').value;

    
    const data = { category_name, category_value };

    try {
        
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

            const newCategoryDiv = document.getElementById('new-category');
            newCategoryDiv.innerHTML += `<p>${category_name}: ${category_value}</p>`;
        } else {
            alert(`Error: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error: ', error);
        alert('Cannot connect to server');
    }
});
