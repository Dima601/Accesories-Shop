const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.navbar ul');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

const cartButtons = document.querySelectorAll('.add-to-cart');

cartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        alert('Item added to cart!');
    });
});