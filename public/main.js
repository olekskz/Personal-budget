const bodyDiv = document.getElementById('category-list');
const updateContainer = document.querySelector('.update-container');
const cancelButton = document.querySelector('.cancel-update');
const overlay = document.createElement('div');

// Додаємо клас для затемнення
overlay.classList.add('overlay-dark');
document.body.appendChild(overlay);
overlay.style.display = 'none';

const updateCategory = async () => {
    const categoryId = document.getElementById('update-name').dataset.categoryId; // або отримуєте ID з відповідного поля
    const categoryName = document.getElementById('update-name').value;
    const categoryValue = document.getElementById('update-value').value;

    if (!categoryName || !categoryValue) {
        console.error('Name and value must be provided');
        return;
    }

    try {
        const response = await fetch(`/update-category`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: categoryId,
                category_name: categoryName,
                category_value: categoryValue
            })
        });

        if (!response.ok) {
            throw new Error('Failed to update category');
        }

        const updatedCategory = await response.json();
        console.log('Updated category:', updatedCategory);

        // Оновлення категорії на сторінці або закриття форми
        loadCategories(); // Оновлення списку категорій
        updateContainer.style.display = 'none'; // Закриваємо форму
        overlay.style.display = 'none'; // Сховуємо затемнення
    } catch (error) {
        console.error('Error updating category:', error);
    }
};

const loadCategories = async () => {
    try {
        const response = await fetch('/get-categories');
        if (!response.ok) {
            throw new Error('HTTP error while fetching categories');
        }
        const categories = await response.json();
        console.log('Categories:', categories);

        // Очищення списку перед завантаженням нових категорій
        bodyDiv.innerHTML = '';

        if (categories.length === 0) {
            console.error('No categories found!');
        }

        categories.forEach(category => {
            console.log('Category ID:', category.id);

            const categoryForm = document.createElement('form');
            categoryForm.classList.add('category');

            const nameLabel = document.createElement('label');
            nameLabel.classList.add('category-name');
            nameLabel.textContent = `${category.category_name}`;
            categoryForm.appendChild(nameLabel);

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
            dollarLabel.textContent = '$';

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            const deleteImage = document.createElement('img');
            deleteImage.src = 'imgs/trash-solid.svg';
            deleteImage.alt = 'Icon';
            deleteButton.appendChild(deleteImage);

            rightElementsDiv.append(editButton, valueLabel, dollarLabel, deleteButton);
            bodyDiv.append(categoryForm);

            // Додаємо обробник на кнопку "Edit"
            editButton.addEventListener('click', async (event) => {
                event.preventDefault();

                const categoryId = category.id;
                console.log('Category ID for Edit:', categoryId);

                if (!categoryId) {
                    console.error('Category ID is undefined or missing!');
                    return;
                }

                overlay.style.display = 'block';

                try {
                    const response = await fetch(`/get-categoryById/${categoryId}`);
                    if (!response.ok) {
                        throw new Error('HTTP error while fetching category by ID');
                    }

                    const categoryData = await response.json();
                    console.log('Fetched category data:', categoryData);

                    const nameUpdateInput = document.getElementById('update-name');
                    const valueUpdateInput = document.getElementById('update-value');

                    if (nameUpdateInput && valueUpdateInput) {
                        nameUpdateInput.value = categoryData.category_name || '';
                        valueUpdateInput.value = categoryData.category_value || '';
                        nameUpdateInput.dataset.categoryId = categoryId; // Прив'язуємо ID до input
                        updateContainer.style.display = 'block';
                    } else {
                        console.error('Update form elements not found');
                    }
                } catch (error) {
                    console.error('Error fetching category by ID:', error);
                }
            });
        });
    } catch (error) {
        console.error('Error loading categories:', error);
    }
};

document.addEventListener('DOMContentLoaded', loadCategories);

// Оновлений обробник кнопки "Save"
document.querySelector('.save-update').addEventListener('click', (event) => {
    event.preventDefault();
    updateCategory();
});

// Обробник для кнопки "Cancel"
cancelButton.addEventListener('click', (event) => {
    event.preventDefault();
    updateContainer.style.display = 'none';
    overlay.style.display = 'none';
});
