let dishes =
    [
        {
            'title': 'Hühnerfleisch',
            'description': 'gebackene Hühnerfleischstücke mit Süß-Sauer-Sauce',
            'price': 8.50,
            'amount': 0,
            'id': 0
        },
        {
            'title': 'Knusprige Ente mit Acht Schätzen',
            'description': '',
            'price': 14.90,
            'amount': 0,
            'id': 1
        },
        {
            'title': 'Gebackenes Hühnerfleisch',
            'description': 'mit Knoblauchsauce',
            'price': 8.90,
            'amount': 0,
            'id': 2
        },
        {
            'title': 'Sushi - Sashimi klein',
            'description': '5 Sushi, 10 Sashimi gemischt',
            'price': 15.50,
            'amount': 0,
            'id': 3
        },
        {
            'title': 'Sushi - Sashimi groß',
            'description': '7 Sushi, 15 Sashimi gemischt',
            'price': 22.50,
            'amount': 0,
            'id': 4
        }
    ];

let viewportWidth = ''; // window width
let deliveryCost = 10;
let deliveryText = 'Kostenlos';
let dishesCart = [];
let price = [];


/**
 * Show all dishes
 */

function renderDishes() {
    pushPrice();
    for (let i = 0; i < dishes.length; i++) {
        document.getElementById('dishes').innerHTML +=
            `<div onclick="addCart(${i})" class="dish-item">
            <div class="dish-item__container">
                <h3 class="heading-s">${dishes[i].title}</h3>
                <span class="dish-description">${dishes[i].description}</span>
                <span class="dish-price">${dishes[i].price.toFixed(2)} €</span>
            </div>
            <span class="add-dish__icon"><img src="img/icons/add_black_24dp.svg" alt=""></span>
        </div>
        `;
    }
}


/**
 * Insert the price into the array.
 */

function pushPrice() {
    let priceJson;
    for (let i = 0; i < dishes.length; i++) {
        priceJson = { 'price': dishes[i].price, 'id': dishes[i].id };
        price.push(priceJson);
    }
}


/**
 * Show empty cart or show dishes in cart
 * 
 * @returns When the shopping cart is empty, an empty HTML template is displayed.
 */

function isCartEmpy() {
    if (dishesCart.length == 0) {
        let showCartTpl = document.getElementById('cart-item').innerHTML =
            `<div class="cart__empty">
                <img class="cart__empty-icon" src="img/icons/shopping_bag_black_24dp.svg" alt="">
                <h3 class="heading-m">Fülle Deinen Warenkorb</h3>
                <span class="cart__empty-description">
                    Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle Dein Essen.
                </span>
            </div>`;
        return showCartTpl;
    } else {
        document.getElementById('cart-item').innerHTML = '';
    }
}


/**
 *  Add Items to cart
 * 
 * @param {number} index - The index to push the correct dish into the array.
 */

function addCart(index) {
    if (!dishesCart.includes(dishes[index])) {
        addDishToCart(index);
    } else {
        updatePrice(index);
    }
    amountDishes();
    updateSum();
    renderCart();
}


/**
 * Add dish to the shopping cart.
 * 
 * @param {number} index - The index to push the correct dish into the array.
 */

function addDishToCart(index) {
    dishesCart.push(dishes[index]);
    for (let i = 0; i < dishesCart.length; i++) {
        if (dishes[index].id == dishesCart[i].id) {
            dishesCart[i].amount++;
        }
    }
}


/**
 * Update the price in the shopping cart 
 * 
 * @param {number} index - The index to update the correct price in the array.
 */

function updatePrice(index) {
    let a = dishesCart.indexOf(dishes[index]);
    if (dishesCart.includes(dishes[index])) {
        dishesCart[a].amount++;
        dishesCart[a].price += price[index].price;
    }
}


/**
 * Update the sum in the shopping cart.
 */

function updateSum() {
    let sum = 0;
    let finalSum = 0;
    for (let i = 0; i < dishes.length; i++) {
        sum += price[i].price * dishes[i].amount;
    }
    if (sum > deliveryCost) {
        finalSum = sum;
        deliveryText = 'Kostenlos';
    } else {
        deliveryText = '10 €';
        finalSum = sum + deliveryCost;
    }
    renderSum(finalSum, sum);
}


/**
 * Render the sum in the shopping cart.
 * 
 * @param {number} finalSum - The final sum.
 * @param {number} subTotal  - The subtotal.
 */

function renderSum(finalSum, subTotal) {
    if (dishesCart.length > 0) {
        createSumHTML(subTotal, finalSum);
        cartButton(finalSum);
    } else {
        document.getElementById('summery').innerHTML = '';
        cartButton(finalSum);
    }
}


/**
 * Show the final sum in the "Shopping cart" button. Only in the mobile version.
 * 
 * @param {number} finalsum - The final sum.
 */

function cartButton(finalsum) {
    if (dishesCart.length == 0) {
        document.getElementById('cart-btn').style.display = 'none';
    } else {
        document.getElementById('btn-blue').innerHTML =
            `<button class="btn-blue">
                Bezahlen <span>(${finalsum.toFixed(2)} €)</span>
            </button>
        `;
        document.getElementById('cart-btn').style.display = 'flex';
    }
}


/**
 * Update the sum in the shopping cart and get the HTML
 * 
 * @param {number} subTotal - The subtotal of the dishes.
 * @param {number} finalSum  - The final sum of the dishes.
 */

function createSumHTML(subTotal, finalSum) {
    document.getElementById('summery').innerHTML =
        `<div class="summery-container-inner">
            <div class="summery__container">
                <span class="summery__text">Zwischensumme</span>
                <span id="sub-sum" class="summery__total">${subTotal.toFixed(2)} €</span>
            </div>
            <div class="summery__container">
                <span class="summery__text">Lieferkosten</span>
                <span class="summery__total">${deliveryText}</span>
            </div>
            <div class="summery__container">
                <span class="summery__text"><strong>Gesamt</strong></span>
                <span class="summery__total"><strong id="summery-total">${finalSum.toFixed(2)} €</strong></span>
            </div>
        </div>`;
}


/**
 *  Amount dishes in the shopping cart.
 *  Only in the mobile version.
 */

function amountDishes() {
    let sum = 0;
    for (let i = 0; i < dishes.length; i++) {
        sum += dishes[i].amount;
        if (dishesCart.length > 0) {
            document.getElementById('mobile-btn').classList.add('bag');
            document.getElementById('mobile-btn').innerHTML = `<span><span>${sum}</span></span><span>Warenkorb</span>`;
        } else {
            document.getElementById('mobile-btn').innerHTML = 'Warenkorb';
            document.getElementById('mobile-btn').classList.remove('bag');
        }
    }
}


/**
 * Decrement dish in the shopping cart 
 *  
 * @param {number} index 
 */

function decrementDish(index) {
    if (dishesCart[index].amount > 1) {
        dishesCart[index].amount--;
        dishesCart[index].price -= price[dishesCart[index].id].price;
    } else {
        dishesCart[index].amount--;
        dishesCart.splice(index, 1);
    }
    amountDishes();
    updateSum();
    renderCart();
}


/**
 * Increment dish in the shopping cart
 * 
 * @param {number} index - The index to increment the right price in the shopping cart
 */

function incrementDish(index) {
    dishesCart[index].amount++;
    dishesCart[index].price += price[dishesCart[index].id].price;
    amountDishes();
    updateSum();
    renderCart();
}


/**
 * Delete dish in the shopping cart
 * 
 * @param {number} index - The index to delete the right dish in the shopping cart
 */

function deleteDish(index) {
    dishes[dishesCart[index].id].amount = 0;
    dishes[dishesCart[index].id].price = price[dishesCart[index].id].price;
    dishesCart.splice(index, 1);
    amountDishes();
    updateSum();
    renderCart();
}


/**
 * Render all dishes in the shopping cart
 */

function renderCart() {
    document.getElementById('cart-item').innerHTML = '';
    isCartEmpy();
    for (let i = 0; i < dishesCart.length; i++) {
        document.getElementById('cart-item').innerHTML +=
            `<div class="cart__item-container">
            <div class="cart__item-container-inner">
                <span class="cart__quantity"><strong>${dishesCart[i].amount}</strong></span>
                <div class="cart__item-inner">
                    <span class="cart__dish"><strong>${dishesCart[i].title}</strong></span>
                    <span class="cart__price">${dishesCart[i].price.toFixed(2)} €</span>
                </div>
                <div class="cart__add">
                    <span onclick="deleteDish(${i})" class="delete-dish"></span>
                    <div class="cart__amount">
                    <button onclick="decrementDish(${i})" class="decrement"><img src="img/icons/remove_black_24dp.svg"
                                alt=""></button>
                    <button onclick="incrementDish(${i})" class="increment"><img src="img/icons/add_black_24dp.svg" alt=""></button>
                </div>
            </div>
        <div>
        `;
    }
}


/**
 * Open the shopping cart in the mobile version
 */

function openCart() {
    document.querySelector('.sidebar').classList.add('fade-in');
    document.getElementById('mobile-btn').style.display = 'none';
    document.body.style.overflow = 'hidden';
}


/**
 * Close the shopping cart in the mobile version
 */

function closeCart() {
    document.querySelector('.sidebar').classList.remove('fade-in');
    document.getElementById('mobile-btn').style.display = 'block';
    document.body.style.overflow = 'auto';
}


/**
 * Correct the position of the sidebar when moving or resizing the browser window
 */
function fixSroll() {
    let height = document.querySelector('.header').offsetHeight;
    if (viewportWidth > 1000) {
        if (window.scrollY > height && viewportWidth > 1000) {
            document.querySelector('.sidebar').style = 'position: fixed; top: 0; right: 0;';
        } else {
            document.body.style = 'overflow: auto';
            document.querySelector('.sidebar').style = 'position: relative ';
        }
    }
}


/**
 * When the breakpoint is reached, the property is changed to fixed or relative
 */

function breakPoint() {
    let width = window.innerWidth;
    viewportWidth = width;
    if (viewportWidth < 1000) {
        document.querySelector('.sidebar').style = 'position: fixed';
    } else {
        document.body.style = 'overflow: auto';
        document.querySelector('.sidebar').style = 'position: relative';
    }
    pageYoff();
}


/**
 * When scrolling, the correct position is changed
 */

function pageYoff() {
    let height = document.querySelector('.header').offsetHeight;
    if (window.pageYOffset > height) {
        document.querySelector('.sidebar').style = 'position: fixed; top: 0; right: 0;';
    }
}


/**
 * Get the window width
 */

function getWindowWidth() {
    let width = window.innerWidth;
    viewportWidth = width;
    fixSroll();
    breakPoint();
}


/**
 * Eventlistener
 */

window.addEventListener('load', getWindowWidth)
window.addEventListener('scroll', fixSroll)
window.addEventListener('resize', breakPoint)

