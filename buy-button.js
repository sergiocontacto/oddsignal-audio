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
  var ACCENT = '#ecd0b3';
  var ACCENT_HOVER = '#f7e4d1';
  var INK = '#17120e'; // texto sobre el dorado

  // Mismo boton dorado que el resto de la web; en la portada, mas grande.
  function goldButton(large) {
    return {
      'font-family': "'Inter', system-ui, sans-serif",
      'font-size': large ? '17px' : '14px',
      'font-weight': '600',
      'line-height': '1.4',
      'white-space': 'nowrap',
      'padding-top': large ? '15px' : '12px',
      'padding-bottom': large ? '15px' : '12px',
      'padding-left': large ? '36px' : '28px',
      'padding-right': large ? '36px' : '28px',
      'border-radius': '9px',
      'background-color': ACCENT,
      'color': INK,
      ':hover': { 'background-color': ACCENT_HOVER, 'color': INK },
      ':focus': { 'background-color': ACCENT_HOVER, 'color': INK },
    };
  }

  function productOptions(buttonText, large) {
    var options = {
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
                'background-color': ACCENT,
                'color': INK,
                ':hover': { 'background-color': ACCENT_HOVER, 'color': INK },
                ':focus': { 'background-color': ACCENT_HOVER, 'color': INK },
              },
              title: { 'font-family': "'Inter', system-ui, sans-serif", 'font-weight': 'bold', 'font-size': '26px', color: INK },
              price: { 'font-family': "'Inter', system-ui, sans-serif", 'font-size': '18px', color: INK },
              compareAt: { 'font-family': "'Inter', system-ui, sans-serif", 'font-size': '15px', color: INK },
              unitPrice: { 'font-family': "'Inter', system-ui, sans-serif", 'font-size': '15px', color: INK },
            },
            text: { button: 'Buy Now' },
          },
          option: {},
          cart: {
            styles: {
              button: {
                'background-color': ACCENT,
                'color': INK,
                ':hover': { 'background-color': ACCENT_HOVER, 'color': INK },
                ':focus': { 'background-color': ACCENT_HOVER, 'color': INK },
              },
            },
            text: { total: 'Subtotal', button: 'Checkout' },
          },
          toggle: {
            styles: {
              toggle: {
                'background-color': ACCENT,
                ':hover': { 'background-color': ACCENT_HOVER },
                ':focus': { 'background-color': ACCENT_HOVER },
              },
              count: { color: INK, ':hover': { color: INK } },
              iconPath: { fill: INK },
            },
          },
    };
    options.product.styles.button = goldButton(large);
    return options;
  }

  var MONEY_FORMAT = '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D';

  // Para los botones propios de la web («Obtener infinityKits», ik/site.js):
  // meten el producto en el mismo carrito y lo abren a la derecha.
  var shopResolve;
  var shop = new Promise(function (resolve) { shopResolve = resolve; });
  window.ikAddToCart = function (productId) {
    return shop.then(function (s) {
      return Promise.all([s.cart, s.client.product.fetch('gid://shopify/Product/' + productId)]);
    }).then(function (ready) {
      var cart = ready[0];
      var variant = ready[1] && ready[1].variants[0];
      if (!variant || variant.available === false) throw new Error('Producto no disponible');
      // Es una descarga: si ya esta en el carrito no se suma otra unidad.
      var inCart = cart.lineItems.some(function (line) {
        return line.variant && line.variant.id === variant.id;
      });
      return inCart ? cart.open() : cart.addVariantToCart(variant, 1, true);
    });
  };

  function ShopifyBuyInit() {
    var client = ShopifyBuy.buildClient({
      domain: 'bdf1pk-21.myshopify.com',
      storefrontAccessToken: 'fcaf24b787ace57d9e12da81b1a3aaaf',
    });
    ShopifyBuy.UI.onReady(client).then(function (ui) {
      // Un solo carrito, creado antes que los productos para saber cuando esta listo.
      var cart = ui.createCart({ moneyFormat: MONEY_FORMAT, options: productOptions('', false) });
      shopResolve({ client: client, cart: cart });
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
        // El texto va dentro del iframe de Shopify, donde i18n.js no llega.
        if (typeof translations !== 'undefined') {
          buttonText = translations[currentLang][buttonText] || buttonText;
        }
        ui.createComponent('product', {
          id: p.id,
          node: node,
          moneyFormat: MONEY_FORMAT,
          options: productOptions(buttonText, node.getAttribute('data-style') === 'solid'),
        });
      });
    });
  }
})();
