chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'fetchRelatedProducts') {
      const { productTitle, productPrice } = message;
      console.log("message  "+JSON.stringify(message));

    const apiUrl = 'https://realtime.oxylabs.io/v1/queries';
    const auth = btoa('shivatalluri_zKcyk:iB_fq6_8kEJfVNb');

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`
      },
      body: JSON.stringify({"source": "amazon_search", "query": productPrice, "domain": "in", "geo_location": "500085", "parse": true})
    }).then(response => response.json()).then(data => {
      console.log("Organic Results:", data.results[0].content.results.organic);
      const organicResults = data.results[0].content.results.organic;
      return { products: organicResults };
    })
    .then(productsData => {
      sendResponse(productsData);
    })
        .catch(error => console.error('Error fetching related products:', error));
      
      return true;
    }
  });
  //data.results[0].content.results.organic