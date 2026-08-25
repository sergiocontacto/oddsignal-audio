/* Shopify Buy Button: incrusta el checkout de Shopify (bdf1pk-21.myshopify.com)
   en el producto EvoraVerb de esta web estática. La web sigue siendo estática;
   Shopify solo actúa de carrito + cobro + entrega del archivo digital.
   Colores ajustados a la marca ODDSIGNAL (--color-accent de styles.css). */
(function () {
  var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
  if (window.ShopifyBuy) {
    if (window.ShopifyBuy.UI) {
      ShopifyBuyInit();
    } else {
      loadScript();
    }
  } else {
    loadScript();
  }
  function loadScript() {
    var script = document.createElement('script');
    script.async = true;
    script.src = scriptURL;
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
    script.onload = ShopifyBuyInit;
  }
  function ShopifyBuyInit() {
    var client = ShopifyBuy.buildClient({
      domain: 'bdf1pk-21.myshopify.com',
      storefrontAccessToken: 'fcaf24b787ace57d9e12da81b1a3aaaf',
    });
    ShopifyBuy.UI.onReady(client).then(function (ui) {
      var node = document.getElementById('product-component-evoraverb');
      if (!node) return;
      ui.createComponent('product', {
        id: '15647380701508',
        node: node,
        moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
        options: {
          product: {
            styles: {
              product: {
                '@media (min-width: 601px)': {
                  'max-width': '100%',
                  'margin-left': '0',
                  'margin-bottom': '0',
                },
                'text-align': 'left',
                padding: '0',
                margin: '0',
              },
              wrapper: {
                'margin-bottom': '0',
              },
              title: { display: 'none' },
              price: { display: 'none' },
              compareAt: { display: 'none' },
              unitPrice: { display: 'none' },
              button: {
                'font-family': "'Clash Display', 'Inter', system-ui, sans-serif",
                'font-size': '11px',
                'font-weight': '700',
                'letter-spacing': '0.08em',
                'text-transform': 'uppercase',
                'padding-top': '9px',
                'padding-bottom': '9px',
                'padding-left': '20px',
                'padding-right': '20px',
                'border-radius': '4px',
                'box-shadow': 'none',
                'background-color': '#c43216',
                ':hover': { 'background-color': '#d44427', 'box-shadow': 'none' },
                ':focus': { 'background-color': '#d44427', 'box-shadow': 'none' },
              },
            },
            layout: 'horizontal',
            contents: { img: false, imgWithCarousel: false, description: false },
            width: 'auto',
            text: { button: 'Buy Now' },
          },
          productSet: {
            styles: {
              products: { '@media (min-width: 601px)': { 'margin-left': '-20px' } },
            },
          },
          modalProduct: {
            contents: { img: false, imgWithCarousel: true, button: false, buttonWithQuantity: true },
            styles: {
              product: {
                '@media (min-width: 601px)': {
                  'max-width': '100%',
                  'margin-left': '0px',
                  'margin-bottom': '0px',
                },
              },
              button: {
                'background-color': '#c43216',
                ':hover': { 'background-color': '#d44427' },
                ':focus': { 'background-color': '#d44427' },
              },
              title: { 'font-family': "'Clash Display', 'Inter', system-ui, sans-serif", 'font-weight': 'bold', 'font-size': '26px', color: '#0a0e17' },
              price: { 'font-family': "'Clash Display', 'Inter', system-ui, sans-serif", 'font-size': '18px', color: '#0a0e17' },
              compareAt: { 'font-family': "'Clash Display', 'Inter', system-ui, sans-serif", 'font-size': '15px', color: '#0a0e17' },
              unitPrice: { 'font-family': "'Clash Display', 'Inter', system-ui, sans-serif", 'font-size': '15px', color: '#0a0e17' },
            },
            text: { button: 'Buy Now' },
          },
          option: {},
          cart: {
            styles: {
              button: {
                'background-color': '#c43216',
                ':hover': { 'background-color': '#d44427' },
                ':focus': { 'background-color': '#d44427' },
              },
            },
            text: { total: 'Subtotal', button: 'Checkout' },
          },
          toggle: {
            styles: {
              toggle: {
                'background-color': '#c43216',
                ':hover': { 'background-color': '#d44427' },
                ':focus': { 'background-color': '#d44427' },
              },
            },
          },
        },
      });
    });
  }
})();
