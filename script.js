document.addEventListener('DOMContentLoaded', iniciarApp);

let jsonData;

async function iniciarApp() {
    try {
        jsonData = await obtenerDatos('https://fakestoreapi.com/products');
        mostrarProductos(jsonData);
    } catch (error) {
        console.error('Error al iniciar la aplicación:', error);
    }
}

function obtenerDatos(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al recuperar datos');
            }
            return response.json();
        });
}

function mostrarProductos(items) {
    const listaProductos = document.getElementById('items-container');
    listaProductos.innerHTML = '';

    items.forEach(item => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `
            <h5 class="title">${item.title}</h5>
            <img class="img" src="${item.image}" alt="${item.title}">
            <p class="price">Precio: $${item.price}</p>
            <p class="description">${item.description}</p>
        `;
        listaProductos.appendChild(li);
    });
}

const minFilter = document.getElementById('minFilter');
const maxFilter = document.getElementById('maxFilter');
const filterBtn = document.getElementById('filterBtn');
const clearBtn = document.getElementById('clearBtn');

filterBtn.addEventListener('click', function () {
    const minPrice = parseFloat(minFilter.value);
    const maxPrice = parseFloat(maxFilter.value);
    const filteredItems = jsonData.filter(item => {
        const productPrice = parseFloat(item.price);
        return (!isNaN(minPrice) ? productPrice >= minPrice : true) && (!isNaN(maxPrice) ? productPrice <= maxPrice : true);
    });

    mostrarProductos(filteredItems);
});

clearBtn.addEventListener('click', function () {
    minFilter.value = '';
    maxFilter.value = '';
    filterBtn.click();
});
