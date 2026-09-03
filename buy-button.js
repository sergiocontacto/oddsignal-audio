/* Shopify Buy Button: incrusta el checkout de Shopify (bdf1pk-21.myshopify.com)
   en los productos de esta web estática (EvoraVerb y ODDDIST). La web sigue
   siendo estática; Shopify solo actúa de carrito + cobro + entrega del
   archivo digital. Colores ajustados a la marca ODDSIGNAL (--color-accent
   de styles.css). */
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

  // Las dos tarjetas de producto comparten el mismo estilo de boton; solo
  // cambian el id de producto, el nodo destino y el texto del boton.
  function productOptions(buttonText) {
    return {
      product: {
            styles: {
              product: {
                '@media (min-width: 601px)': {
                  'max-width': '100%',
                  'margin-left': '0',
                  'margin-bottom': '0',
                },
                'text-align': 'center',
                'display': 'flex',
                'justify-content': 'center',
                'background-color': 'transparent',
                'box-shadow': 'none',
                padding: '0',
                margin: '0',
              },
              wrapper: {
                'margin-bottom': '0',
                'background-color': 'transparent',
                'box-shadow': 'none',
              },
              title: { display: 'none' },
              price: { display: 'none' },
              compareAt: { display: 'none' },
              unitPrice: { display: 'none' },
              buttonWrapper: { margin: '0' },
              button: {
                'font-family': "'Clash Display', 'Inter', system-ui, sans-serif",
                'font-size': '11px',
                'font-weight': '700',
                'letter-spacing': '0.08em',
                'text-transform': 'uppercase',
                'line-height': '1.6',
                'padding-top': '9px',
                'padding-bottom': '9px',
                'padding-left': '20px',
                'padding-right': '20px',
                'border-radius': '4px',
                'background-color': '#1923fd',
                'box-shadow': '0 0 20px rgba(25, 35, 253, 0.3), 0 0 40px rgba(25, 35, 253, 0.1)',
                'transition': 'all 0.2s ease',
                ':hover': {
                  'background-color': '#474ffd',
                  'box-shadow': '0 0 50px rgba(25, 35, 253, 0.6), 0 20px 40px rgba(25, 35, 253, 0.3)',
                  'transform': 'translateY(-4px) scale(1.05)',
                },
                ':focus': {
                  'background-color': '#474ffd',
                  'box-shadow': '0 0 50px rgba(25, 35, 253, 0.6), 0 20px 40px rgba(25, 35, 253, 0.3)',
                },
              },
            },
            layout: 'horizontal',
            contents: { img: false, imgWithCarousel: false, description: false },
            width: 'auto',
            text: { button: buttonText },
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
                'background-color': '#1923fd',
                ':hover': { 'background-color': '#474ffd' },
                ':focus': { 'background-color': '#474ffd' },
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
                'background-color': '#1923fd',
                ':hover': { 'background-color': '#474ffd' },
                ':focus': { 'background-color': '#474ffd' },
              },
            },
            text: { total: 'Subtotal', button: 'Checkout' },
          },
          toggle: {
            styles: {
              toggle: {
                'background-color': '#1923fd',
                ':hover': { 'background-color': '#474ffd' },
                ':focus': { 'background-color': '#474ffd' },
              },
            },
          },
    };
  }

  function ShopifyBuyInit() {
    var client = ShopifyBuy.buildClient({
      domain: 'bdf1pk-21.myshopify.com',
      storefrontAccessToken: 'fcaf24b787ace57d9e12da81b1a3aaaf',
    });
    ShopifyBuy.UI.onReady(client).then(function (ui) {
      var products = [
        { id: '15647380701508', nodeId: 'product-component-evoraverb', buttonText: 'Buy Now' },
        { id: '15651571532100', nodeId: 'product-component-odddist', buttonText: 'Download' },
        { id: '15656714142020', nodeId: 'product-component-evoraverb-demo', buttonText: 'Download Free' },
      ];
      products.forEach(function (p) {
        var node = document.getElementById(p.nodeId);
        if (!node) return;
        // El HOME quiere un texto distinto ("Download Free") al del resto
        // de sitios donde vive el mismo producto; se marca con un atributo
        // en vez de duplicar la config por pagina.
        var buttonText = node.getAttribute('data-button-text') || p.buttonText;
        ui.createComponent('product', {
          id: p.id,
          node: node,
          moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
          options: productOptions(buttonText),
        });
      });
    });
  }
})();
