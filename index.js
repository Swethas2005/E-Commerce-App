const root = document.getElementById("root");
const userInfoContainer = document.getElementById("user-info");
const totalPriceContainer = document.getElementById("total-price");

let currentUser = null;
let cart = [];


function getCurrentUser(users) {
   
    return users[0];
}

async function getUserInfo() {
    try {
        const response = await fetch("http://localhost:3000/users");
        const users = await response.json();
        currentUser = getCurrentUser(users);
        if (currentUser) {
            userInfoContainer.textContent = `Logged In: ${currentUser.name}`;
            displayProducts();
        } else {
            window.location.href = "login.html"; 
        }
    } catch (error) {
        console.error("Error fetching user info:", error);
    }
}

getUserInfo();

async function displayProducts() {
    try {
        const response = await fetch("http://localhost:3000/products");
        const products = await response.json();
        products.forEach(product => {
            const productElement = createProductElement(product);
            root.appendChild(productElement);
        });
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

function createProductElement(product) {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.title;
    productElement.appendChild(image);

    const title = document.createElement("h3");
    title.textContent = product.title;
    productElement.appendChild(title);

    const price = document.createElement("p");
    price.textContent = `Price: $${product.price}`;
    productElement.appendChild(price);

   
    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.addEventListener("click", () => addToCart(product));
    productElement.appendChild(addToCartButton);

    return productElement;
}

function addToCart(product) {
    cart.push(product);
    updateCart();
}

function deleteFromCart(product) {
    cart = cart.filter(item => item !== product);
    updateCart();
}

function calculateTotalPrice(cart) {
    return cart.reduce((total, product) => total + product.price, 0);
}

function updateCart() {

    totalPriceContainer.innerHTML = "";

    
    cart.forEach(product => {
        const cartItem = document.createElement("div");
        cartItem.textContent = product.title;
        totalPriceContainer.appendChild(cartItem);

       
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteFromCart(product));
        cartItem.appendChild(deleteButton);
    });

    
    const totalPrice = document.createElement("div");
    totalPrice.textContent = `Total: $${calculateTotalPrice(cart)}`;
    totalPriceContainer.appendChild(totalPrice);
}
