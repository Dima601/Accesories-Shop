document.addEventListener("DOMContentLoaded", async () => {
    // Гарантія що все завантажено
    const searchInput = document.getElementById("searchInput");
    const contentDiv = document.getElementById("content");
    const errorDiv = document.getElementById("error");
  
    // Завантаження даних із JSON-файлу
    const loadProducts = async () => {
      try {
        const response = await fetch("products.json");
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        return await response.json();
      } catch (error) {
        errorDiv.textContent = `Data loading error: ${error.message}`;
        console.error("Upload error:", error);
        return [];
      }
    };
  
    // Створення картки
    const renderProducts = (products) => {
      contentDiv.innerHTML = "";
      products.forEach(product => {
        const card = document.createElement("div");
        card.className = "card";
        card.addEventListener("click", () => {
          window.location.href = `detailsTest.html?id=${product.id}`;
        });
  
        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;
        img.onerror = () => {
          img.src = "placeholder.jpg";
          img.alt = "Image unavailable";
        };
  
        const name = document.createElement("div"); //Назва
        name.className = "name";
        name.textContent = product.name;
  
        const description = document.createElement("div"); //Опис
        description.textContent = product.description;
  
        const price = document.createElement("div"); //Ціна
        price.className = "price";
        price.textContent = `Ціна: ${product.price}`;
  
        const category = document.createElement("div"); //Категорія
        category.className = "category";
        category.textContent = `Category: ${product.category}`;
  
        const addToCartButton = document.createElement("button"); // Кнопка додати в кошик
        addToCartButton.className = "add-to-cart";
        addToCartButton.textContent = "Add to Cart";
        addToCartButton.addEventListener("click", (event) => {
          event.stopPropagation(); // Зупинити перехід при натисканні на кнопку
          alert(`${product.name} added to cart!`);
        });
  
        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(category);
        card.appendChild(description);
        card.appendChild(price);
        card.appendChild(addToCartButton);
  
        contentDiv.appendChild(card);
      });
    };
  
    // Пошук
    const filterProducts = (query, products) => {
      // Функція фільтрації
      const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query)
      );
  
      if (filteredProducts.length > 0) {
        renderProducts(filteredProducts);
        errorDiv.textContent = "";
      } else {
        contentDiv.innerHTML = "";
        errorDiv.textContent = "There are no products matching the search.";
      }
    };
  
    const products = await loadProducts();
    if (products.length > 0) {
      renderProducts(products);
  
      searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase().trim();
        filterProducts(query, products);
      });
    } else {
      errorDiv.textContent = "There are no available products to display.";
    }
  });
  