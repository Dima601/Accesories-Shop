async function getProducts() {
  try {
      let response = await fetch("products.json");
      if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
      }
      let products = await response.json();
      return products;
  } catch (error) {
      console.error("Помилка завантаження JSON:", error);
  }
}

function card_html(product) {
  return `
      <div class="card">
          <img src="images/${product.image}" alt="${product.name}">
          <div>
              <h3>${product.name}</h3>
              <p class="category"><strong>Категорія:</strong> ${product.category}</p>
              <p>${product.description}</p>
              <p>${product.price}</p>
              <a href="#">Add to Cart</a>
          </div>
      </div>
  `;
}

getProducts().then(function(products) {
  if (products) {
      let products_list = document.querySelector(".products-list");
      if (products_list) {
          products.forEach(function(product) {
              products_list.innerHTML += card_html(product);
          });
      } else {
          console.error("Контейнер '.products-list' не знайдено!");
      }
  } else {
      console.error("Продукти не отримано!");
  }
});
