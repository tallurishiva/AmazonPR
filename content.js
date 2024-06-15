function insertSidebar(products) {
  console.log(products);
  
  const sidebar = document.createElement('div');
  sidebar.classList.add('sidebar-container');
  sidebar.style.overflowY = 'scroll'; 
  document.body.appendChild(sidebar);

  const title = document.createElement('h2');
  title.textContent = 'Related Products';
  title.classList.add('sidebar-title'); 
  sidebar.appendChild(title);

  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product-item'); 
    const productTitle = document.createElement('a');
    productTitle.href = `https://www.amazon.in${product.url}`;
    productTitle.textContent = product.title;
    productTitle.target = '_blank';
    productTitle.classList.add('product-title');
    productDiv.appendChild(productTitle);
    const productImage = document.createElement('img');
    productImage.src = product.url_image;
    productImage.alt = product.title;
    productImage.classList.add('product-image');
    productDiv.appendChild(productImage);
    const productPrice = document.createElement('p');
    productPrice.textContent = `Price: ₹${product.price}`;
    productPrice.classList.add('product-price'); // Price styling
    productDiv.appendChild(productPrice);
    const productRating = document.createElement('p');
    productRating.textContent = `Rating: ${product.rating}`;
    productRating.classList.add('product-rating'); 
    productDiv.appendChild(productRating);

    sidebar.appendChild(productDiv);
  });
}

const styles = `
  .sidebar-container {
    position: fixed;
    top: 10px;
    right: 10px;
    width: 300px;
    background-color: white;
    border: 1px solid #ccc;
    padding: 10px;
    z-index: 1000;
    height:100vh;
    overflow: scroll; /* Enable scrolling */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .sidebar-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
  }

  .product-item {
    margin-bottom: 20px;
    padding: 10px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  .product-title {
    font-size: 16px;
    font-weight: bold;
    color: black;
    text-decoration: none;
    display: block;
    margin-bottom: 5px;
  }

  .product-title:hover {
    text-decoration: underline;
  }

  .product-image {
    width: 100px;
    height: 100px;
    border-radius: 5px;
    object-fit: cover;
    margin-right: 10px;
    float: left;
  }

  .product-price,
  .product-rating {
    margin-top: 5px;
    color: #555;
  }
`;

const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);


function getProductDetailsFromPage() {
  const titleElement = document.getElementsByClassName("Nx9bqj CxhGGd")[0];
  const priceElement = document.getElementsByClassName("VU-ZEz")[0];

  const productTitle = titleElement ? titleElement.textContent.trim() : null;
  const productPrice = priceElement ? priceElement.textContent.trim() : null;

  return { productTitle, productPrice };
}

const flipkartProductPageRegex = /^https:\/\/www\.flipkart\.com\/[a-zA-Z0-9-]+\/p\/[a-zA-Z0-9-]+\?pid=[A-Z0-9]+&lid=[A-Z0-9]+&marketplace=FLIPKART.*$/;
if (flipkartProductPageRegex.test(window.location.href)) {
  const { productTitle, productPrice } = getProductDetailsFromPage();
  if (productTitle && productPrice) {
    chrome.runtime.sendMessage({ 
      action: 'fetchRelatedProducts', 
      productTitle: productTitle,
      productPrice: productPrice 
    }, response => {
      if (response && response.products) {
        console.log('Received products:', response.products);
        insertSidebar(response.products);
      } else {
        console.log('No products found or error in response:', response);
      }
    });
  } else {
    console.log('Unable to fetch product details from the page.');
  }
}
