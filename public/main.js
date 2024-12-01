
const bodyDiv = document.getElementById('category-list')



const loadCategories =  async () => {
    try {
        const response = await fetch('/get-categories');
        if (!response.ok) {
            throw new Error('HTTP error')
        }
        const categories = await response.json()
        
        categories.forEach(category => {

            const categoryForm = document.createElement('form');
            categoryForm.classList.add('category')
                const nameLabel = document.createElement('label')
                nameLabel.classList.add('category-name');
                nameLabel.textContent = `${category.category_name}`;
                categoryForm.appendChild(nameLabel)
                const rightElementsDiv = document.createElement('div');
                rightElementsDiv.classList.add('right-elements');
                categoryForm.appendChild(rightElementsDiv);
                    const editButton = document.createElement('button');
                    editButton.classList.add('edit-button');
                    editButton.textContent = 'Edit';
                    const valueLabel = document.createElement('label');
                    valueLabel.classList.add('money-amount');
                    valueLabel.textContent = `${category.category_value}`;
                    const dollarLabel = document.createElement('label');
                    dollarLabel.classList.add('dollar');
                    dollarLabel.textContent = `$`;
                    const deleteButton = document.createElement('button');
                    deleteButton.classList.add('delete-button');
                            const deleteImage = document.createElement('img');
                            deleteImage.src = 'imgs/trash-solid.svg';
                            deleteImage.alt = 'Icon';
                        deleteButton.appendChild(deleteImage);
                    rightElementsDiv.append(editButton, valueLabel, dollarLabel, deleteButton);
            bodyDiv.append(categoryForm)
        });
    } catch (error) {
        console.error()
    }
}




document.addEventListener('DOMContentLoaded', loadCategories)