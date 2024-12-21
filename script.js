async function getProducts() {
    // Виконуємо запит до файлу "accesoires.json" та очікуємо на відповідь
    let response = await fetch("accesories.json");
    // Очікуємо на отримання та розпакування JSON-даних з відповіді
    let products = await response.json();
  
    // Повертаємо отримані продукти
    return products;
  }


function card_html(product) {
    return ` <div class="card">
        <img src="images/${product.image}">
        <div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>${product.price}</p>
            <a href="">Add to Cart</a>
        </div>`
}

  getProducts().then(function(products){
    let products_list = document.querySelector(".products-list")
    if(products_list){
        products.forEach(function(product){

        })
            products_list.innerHTML += card_html(product)
        }});