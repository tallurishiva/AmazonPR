// Utility function to extract text content from an element based on a CSS selector
function getTextContent(selector) {
    const element = document.querySelector(selector);
    return element ? element.textContent.trim() : null;
  }
  
  // Utility function to create and insert a sidebar into the DOM
  function insertSidebar(products) {
    const sidebar = document.createElement('div');
    sidebar.style.position = 'fixed';
    sidebar.style.top = '10px';
    sidebar.style.right = '10px';
    sidebar.style.width = '300px';
    sidebar.style.backgroundColor = 'white';
    sidebar.style.border = '1px solid #ccc';
    sidebar.style.padding = '10px';
    sidebar.style.zIndex = '1000';
  
    const title = document.createElement('h2');
    title.textContent = 'Related Products';
    sidebar.appendChild(title);
  
    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.style.marginBottom = '10px';
  
      const productTitle = document.createElement('a');
      productTitle.href = product.link;
      productTitle.textContent = product.title;
      productTitle.target = '_blank';
      productDiv.appendChild(productTitle);
  
      const productImage = document.createElement('img');
      productImage.src = product.image;
      productImage.style.width = '100px';
      productImage.style.height = '100px';
      productDiv.appendChild(productImage);
  
      sidebar.appendChild(productDiv);
    });
  
    document.body.appendChild(sidebar);
  }
  
  // Utility function to send a message to the background script and return a Promise
  function sendMessageToBackground(message) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(message, response => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(response);
        }
      });
    });
  }
  
  // Utility function to extract product details from the Flipkart product page
  function getProductDetailsFromPage() {
    const productTitle = getTextContent('span.B_NuCI');
    const productPrice = getTextContent('div._30jeq3._16Jk6d');
    return { productTitle, productPrice };
  }
  