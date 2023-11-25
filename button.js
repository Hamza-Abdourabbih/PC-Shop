document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsList = document.getElementById('cart-items');
    const cart = {}; // Un objet pour suivre les produits dans le panier

    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // Ajoutez un événement de délétion pour les éléments du panier
    cartItemsList.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-from-cart')) {
            const productID = event.target.getAttribute('data-product');
            removeFromCart(productID);
        }
    });

    function addToCart(event) {
        const productID = event.target.getAttribute('data-product');
        const productName = event.target.parentElement.querySelector('h2').innerText;
        const productPrice = event.target.innerText;

        if (cart[productID]) {
            // Si le produit est déjà dans le panier, augmentez la quantité
            cart[productID].quantity += 1;
            cart[productID].element.innerText = `${productName} - ${productPrice} x${cart[productID].quantity}`;
        } else {
            // Si le produit n'est pas encore dans le panier, ajoutez-le
            cart[productID] = {
                quantity: 1,
                element: document.createElement('li')
            };
            cart[productID].element.innerHTML = `
                ${productName} - ${productPrice} x${cart[productID].quantity}
                <button class="remove-from-cart" data-product="${productID}">Supprimer</button>`;
            cartItemsList.appendChild(cart[productID].element);
        }
    }

    function removeFromCart(productID) {
        if (cart[productID]) {
            // Supprimez l'élément du panier et mettez à jour l'affichage
            cartItemsList.removeChild(cart[productID].element);
            delete cart[productID];
        }
    }
});
