const products = [
  {
    id: 'cpu1',
    cat: 'CPU',
    name: 'AMD Ryzen 5 7600',
    price: 12950,
    spec: '6 cores • up to 5.1 GHz • AM5',
    symbol: 'R5',
    badge: 'Best value',
    image: 'images/RYZEN.png'
  },
  {
    id: 'cpu2',
    cat: 'CPU',
    name: 'AMD Ryzen 9600X',
    price: 16995,
    spec: '8 cores • up to 5.3 GHz • AM5',
    symbol: 'R7',
    image: 'images/RYZEN1.png'
  },

  {
    id: 'gpu1',
    cat: 'GPU',
    name: 'GeForce RTX 4060 8GB',
    price: 19495,
    spec: '8GB GDDR6 • DLSS 3 • 115W',
    symbol: 'RTX',
    badge: 'Popular',
    image: 'images/4060.png'
  },
  {
    id: 'gpu2',
    cat: 'GPU',
    name: 'GeForce RTX 4060 Ti 8GB',
    price: 22995,
    spec: '8GB GDDR6 • DLSS 3 • 160W',
    symbol: 'RTX',
    image: 'images/rtx40608gb.png'
  },

  {
    id: 'ram1',
    cat: 'RAM',
    name: 'T-Force Delta 16GB DDR5',
    price: 3795,
    spec: '2×8GB • 5600MHz • RGB',
    symbol: '16G',
    image: 'images/TFORCE.png'
  },
  {
    id: 'ram2',
    cat: 'RAM',
    name: 'T-Force Delta 32GB DDR5',
    price: 6495,
    spec: '2×16GB • 6000MHz • RGB',
    symbol: '32G',
    image: 'images/TFORCE32.png'
  },

  {
    id: 'ssd1',
    cat: 'Storage',
    name: 'Kingston NV3 1TB NVMe',
    price: 3495,
    spec: 'PCIe 4.0 • 6000MB/s',
    symbol: '1TB',
    image: 'images/KINGSTON.png'
  },
  {
    id: 'ssd2',
    cat: 'Storage',
    name: 'Samsung 990 EVO 1TB',
    price: 5495,
    spec: 'PCIe 4.0 • 5000MB/s • NVMe',
    symbol: '1TB',
    image: 'images/SAMSUNG990.png'
  },

  {
    id: 'mb1',
    cat: 'Motherboard',
    name: 'MSI B650M Gaming WiFi',
    price: 8495,
    spec: 'AM5 • DDR5 • Wi-Fi 6E',
    symbol: 'B65',
    image: 'images/MSI B650M.png'
  },
  {
    id: 'mb2',
    cat: 'Motherboard',
    name: 'ASUS TUF Gaming B650M-Plus',
    price: 9995,
    spec: 'AM5 • DDR5 • Wi-Fi',
    symbol: 'B65',
    image: 'images/ASUS B650M.png'
  },

  {
    id: 'psu1',
    cat: 'Power Supply',
    name: 'Corsair CX650 Bronze',
    price: 3895,
    spec: '650W • 80+ Bronze • ATX',
    symbol: '650',
    image: 'images/CORSAIR.png'
  },
  {
    id: 'psu2',
    cat: 'Power Supply',
    name: 'Cooler Master MWE 750 Bronze',
    price: 4495,
    spec: '750W • 80+ Bronze • ATX',
    symbol: '750',
    image: 'images/COOLERMASTER750.png'
  },

  {
    id: 'case1',
    cat: 'PC Case',
    name: 'Tecware Forge M2',
    price: 2895,
    spec: 'mATX • mesh • 3 fans',
    symbol: 'M2',
    image: 'images/FORGE M2.png'
  },
  {
    id: 'case2',
    cat: 'PC Case',
    name: 'Montech Air 100',
    price: 3495,
    spec: 'mATX • mesh • tempered glass',
    symbol: 'A100',
    image: 'images/MONTECH AIR100.png'
  },

  {
    id: 'cool1',
    cat: 'CPU Cooler',
    name: 'DeepCool AG400',
    price: 1495,
    spec: '120mm • 220W TDP • PWM',
    symbol: 'AG',
    image: 'images/DEEPCOOL.png'
  },
  {
    id: 'cool2',
    cat: 'CPU Cooler',
    name: 'DeepCool AK400',
    price: 1995,
    spec: '120mm • 220W TDP • PWM',
    symbol: 'AK',
    image: 'images/DEEPCOOLAK400.png'
  }
];

let cart = JSON.parse(localStorage.getItem('bw-cart') || '[]');
let selectedQty = 1;

const peso = n => '₱' + n.toLocaleString('en-PH');
const byId = id => products.find(p => p.id === id);

function saveCart() {
  localStorage.setItem('bw-cart', JSON.stringify(cart));

  const cartCount = document.querySelector('#cartCount');

  if (cartCount) {
    cartCount.textContent =
      cart.reduce((a, i) => a + i.qty, 0);
  }
}

function toast(msg) {
  const t = document.querySelector('#toast');

  if (!t) return;

  t.textContent = msg;
  t.classList.add('show');

  setTimeout(() => t.classList.remove('show'), 2200);
}

function add(id, qty = 1) {
  const found = cart.find(i => i.id === id);

  found
    ? found.qty += qty
    : cart.push({ id, qty });

  saveCart();
  toast('Added to your cart');
}

function productCard(p) {
  return `
    <article class="product-card">
      <a
        href="#product/${p.id}"
        class="product-visual"
        data-symbol="${p.symbol}"
        style="background-image: url('${p.image}')"
      >
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
      </a>

      <div class="product-body">
        <span class="product-category">${p.cat}</span>

        <h3>
          <a href="#product/${p.id}">${p.name}</a>
        </h3>

        <p class="spec">${p.spec}</p>

        <div class="product-bottom">
          <span class="price">${peso(p.price)}</span>

          <button
            class="mini-add"
            data-add="${p.id}"
            aria-label="Add ${p.name}"
          >
            +
          </button>
        </div>
      </div>
    </article>
  `;
}

function home() {
  return `
    <section class="hero">
      <div class="hero-content">
        <span class="eyebrow">Smart PC shopping starts here</span>

        <h1 class="display">
          Your budget.<br>
          <span>Your best build.</span>
        </h1>

        <p class="lede">
          Choose compatible components with confidence or let our Smart Build
          Finder recommend a complete PC for the way you work and play.
        </p>

        <div class="hero-actions">
          <a class="btn btn-green" href="#builder">Find My Build</a>
          <a class="btn btn-secondary" href="#shop">Shop Components</a>
        </div>

        <div class="trust-row">
          <span>Compatibility focused</span>
          <span>Philippine pricing</span>
          <span>Beginner friendly</span>
        </div>
      </div>

      <div class="hero-art" aria-hidden="true"></div>
    </section>

    <div class="page">
      <section class="section">
        <div class="section-head">
          <div>
            <span class="eyebrow">Shop by component</span>

            <h2 class="section-title">
              Everything for your <span>next build</span>
            </h2>
          </div>

          <a href="#shop">View all →</a>
        </div>

        <div class="category-grid">
          ${[
            'CPU',
            'GPU',
            'RAM',
            'Storage',
            'Motherboard',
            'Power Supply',
            'PC Case',
            'CPU Cooler'
          ].map((c, i) => `
            <a
              class="category-card"
              href="#shop"
              data-category="${c}"
            >
              <span class="category-icon">
                ${['CPU', 'GPU', 'RAM', 'SSD', 'MB', 'PSU', 'CASE', 'FAN'][i]}
              </span>

              <h3>${c}</h3>

              <p>
                ${products.filter(p => p.cat === c).length || 6}+ products
              </p>
            </a>
          `).join('')}
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <div>
            <span class="eyebrow">Recommended</span>

            <h2 class="section-title">
              Popular <span>picks</span>
            </h2>
          </div>
        </div>

        <div class="product-grid">
          ${products.slice(0, 4).map(productCard).join('')}
        </div>
      </section>

      <section class="promo">
        <div>
          <span class="eyebrow">BuildWise exclusive</span>

          <h2>Stop guessing. Start building.</h2>

          <p class="muted">
            Tell us your budget and purpose. We’ll balance the parts and show
            where every peso goes.
          </p>

          <a class="btn" href="#builder">
            Try Smart Build Finder
          </a>
        </div>

        <div class="promo-meter">
          <b>Gaming performance balance</b>

          <div class="meter">
            <span></span>
          </div>

          <small class="muted">
            Optimized around your chosen budget
          </small>
        </div>
      </section>
    </div>
  `;
}

function shop() {
  return `
    <div class="page">
      <div class="section-head">
        <div>
          <span class="eyebrow">Component catalog</span>

          <h1 class="section-title">
            Build it <span>your way</span>
          </h1>

          <p class="muted">
            Compare trusted parts with clear specifications and compatibility details.
          </p>
        </div>
      </div>

      <div class="shop-layout">
        <aside class="filters">
          <div class="filter-group">
            <h3>Category</h3>

            ${[
              'All',
              'CPU',
              'GPU',
              'RAM',
              'Storage',
              'Motherboard',
              'Power Supply',
              'PC Case',
              'CPU Cooler'
            ].map(c => `
              <label>
                <input
                  type="radio"
                  name="cat"
                  value="${c}"
                  ${c === 'All' ? 'checked' : ''}
                >
                ${c}
              </label>
            `).join('')}
          </div>

          <div class="filter-group">
            <h3>Price</h3>

            <label>
              <input type="checkbox">
              Under ₱5,000
            </label>

            <label>
              <input type="checkbox">
              ₱5,000–₱15,000
            </label>

            <label>
              <input type="checkbox">
              Above ₱15,000
            </label>
          </div>
        </aside>

        <section>
          <div class="toolbar">
            <span id="resultCount">
              ${products.length} products
            </span>

            <select aria-label="Sort products">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          <div class="product-grid" id="catalog">
            ${products.map(productCard).join('')}
          </div>
        </section>
      </div>
    </div>
  `;
}

function detail(id) {
  const p = byId(id) || products[0];

  return `
    <div class="page">
      <a class="muted" href="#shop">
        ← Back to products
      </a>

      <section class="detail section">
        <div
          class="detail-visual"
          style="background-image: url('${p.image}')"
        >
          <div class="detail-object">
            ${p.symbol}
          </div>
        </div>

        <div>
          <span class="product-category">${p.cat}</span>

          <h1>${p.name}</h1>

          <p class="detail-price">
            ${peso(p.price)}
          </p>

          <p class="stock">
            ● In stock and ready to ship
          </p>

          <p class="muted">
            A dependable component selected for strong value, modern performance,
            and straightforward compatibility.
          </p>

          <div class="chips">
            ${p.spec.split(' • ').map(x => `
              <span class="chip">${x}</span>
            `).join('')}
          </div>

          <h3>Compatibility notes</h3>

          <p class="muted">
            Check your motherboard socket, case clearance, and power requirement
            before purchase. Smart Build Finder automatically considers these basics.
          </p>

          <div class="qty-row">
            <div class="qty">
              <button id="qtyMinus">−</button>
              <span id="qtyValue">1</span>
              <button id="qtyPlus">+</button>
            </div>

            <button
              class="btn btn-green"
              id="detailAdd"
              data-id="${p.id}"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    </div>
  `;
}

function cartPage() {
  if (!cart.length) {
    return `
      <div class="page">
        <div class="empty">
          <span class="eyebrow">Your cart</span>

          <h2>Nothing here yet</h2>

          <p class="muted">
            Explore components or generate a recommended build.
          </p>

          <div
            class="row-actions"
            style="justify-content:center"
          >
            <a class="btn" href="#shop">Browse Products</a>

            <a class="btn btn-secondary" href="#builder">
              Find My Build
            </a>
          </div>
        </div>
      </div>
    `;
  }

  const sub = cart.reduce(
    (s, i) => s + byId(i.id).price * i.qty,
    0
  );

  return `
    <div class="page">
      <span class="eyebrow">Review order</span>

      <h1 class="section-title">
        Shopping <span>cart</span>
      </h1>

      <div class="cart-layout">
        <div class="cart-items">
          ${cart.map(i => {
            const p = byId(i.id);

            return `
              <article class="cart-item">
                <div
                  class="cart-thumb"
                  style="background-image: url('${p.image}')"
                >
                  ${p.symbol}
                </div>

                <div>
                  <h3>${p.name}</h3>

                  <p>
                    ${p.cat} • Qty ${i.qty}
                  </p>

                  <button
                    class="remove"
                    data-remove="${p.id}"
                  >
                    Remove
                  </button>
                </div>

                <strong>
                  ${peso(p.price * i.qty)}
                </strong>
              </article>
            `;
          }).join('')}
        </div>

        <aside class="summary">
          <h2>Order summary</h2>

          <div class="summary-row">
            <span>Subtotal</span>
            <b>${peso(sub)}</b>
          </div>

          <div class="summary-row">
            <span>Shipping</span>
            <b>Free</b>
          </div>

          <div class="summary-row total">
            <span>Total</span>
            <span>${peso(sub)}</span>
          </div>

          <a class="btn btn-green" href="#checkout">
            Proceed to Checkout
          </a>

          <a class="btn btn-secondary" href="#shop">
            Continue Shopping
          </a>
        </aside>
      </div>
    </div>
  `;
}

function checkout() {
  const sub = cart.reduce(
    (s, i) => s + byId(i.id).price * i.qty,
    0
  );

  return `
    <div class="page">
      <span class="eyebrow">Secure checkout</span>

      <h1 class="section-title">
        Complete your <span>order</span>
      </h1>

      <form class="checkout-layout" id="checkoutForm">
        <div class="checkout-form">

          <section class="form-section">
            <h2>Contact and delivery</h2>

            <div class="form-grid">
              <div class="field">
                <label>First name</label>
                <input required placeholder="Juan">
              </div>

              <div class="field">
                <label>Last name</label>
                <input required placeholder="Dela Cruz">
              </div>

              <div class="field full">
                <label>Email address</label>

                <input
                  required
                  type="email"
                  placeholder="juan@example.com"
                >
              </div>

              <div class="field full">
                <label>Street address</label>

                <input
                  required
                  placeholder="House number and street"
                >
              </div>

              <div class="field">
                <label>City</label>
                <input required placeholder="Quezon City">
              </div>

              <div class="field">
                <label>Postal code</label>

                <input
                  required
                  inputmode="numeric"
                  placeholder="1100"
                >
              </div>
            </div>
          </section>

          <section class="form-section">
            <h2>Payment method</h2>

            <label class="payment-option">
              <input type="radio" name="pay" checked>
              Cash on Delivery
            </label>

            <label class="payment-option">
              <input type="radio" name="pay">
              GCash
            </label>

            <label class="payment-option">
              <input type="radio" name="pay">
              Debit or Credit Card
            </label>
          </section>
        </div>

        <aside class="summary">
          <h2>Your order</h2>

          ${
            cart.length
              ? cart.map(i => `
                  <div class="summary-row">
                    <span>
                      ${byId(i.id).name} × ${i.qty}
                    </span>

                    <b>
                      ${peso(byId(i.id).price * i.qty)}
                    </b>
                  </div>
                `).join('')
              : `
                  <p class="muted">
                    Your cart is empty. A sample item will be used
                    for this prototype checkout.
                  </p>
                `
          }

          <div class="summary-row total">
            <span>Total</span>
            <span>${peso(sub || 12950)}</span>
          </div>

          <button class="btn btn-green" type="submit">
            Place Order
          </button>

          <small class="muted">
            Prototype only—no payment will be processed.
          </small>
        </aside>
      </form>
    </div>
  `;
}

const builds = {
  gaming: [
    ['CPU', 'AMD Ryzen 5 7600', 12950, 'cpu1'],
    ['GPU', 'GeForce RTX 4060 8GB', 19495, 'gpu1'],
    ['Motherboard', 'MSI B650M Gaming WiFi', 8495, 'mb1'],
    ['RAM', 'T-Force Delta 16GB DDR5', 3795, 'ram1'],
    ['Storage', 'Kingston NV3 1TB NVMe', 3495, 'ssd1'],
    ['Power Supply', 'Corsair CX650 Bronze', 3895, 'psu1'],
    ['PC Case', 'Tecware Forge M2', 2895, 'case1']
  ],

  school: [
    ['CPU', 'AMD Ryzen 5 7600', 12950, 'cpu1'],
    ['Motherboard', 'MSI B650M Gaming WiFi', 8495, 'mb1'],
    ['RAM', 'T-Force Delta 16GB DDR5', 3795, 'ram1'],
    ['Storage', 'Kingston NV3 1TB NVMe', 3495, 'ssd1'],
    ['Power Supply', 'Corsair CX650 Bronze', 3895, 'psu1'],
    ['PC Case', 'Tecware Forge M2', 2895, 'case1']
  ],

  creator: [
    ['CPU', 'AMD Ryzen 5 7600', 12950, 'cpu1'],
    ['GPU', 'GeForce RTX 4060 8GB', 19495, 'gpu1'],
    ['Motherboard', 'MSI B650M Gaming WiFi', 8495, 'mb1'],
    ['RAM', 'T-Force Delta 16GB DDR5', 3795, 'ram1'],
    ['Storage', 'Kingston NV3 1TB NVMe', 3495, 'ssd1'],
    ['Power Supply', 'Corsair CX650 Bronze', 3895, 'psu1']
  ],

  work: [
    ['CPU', 'AMD Ryzen 5 7600', 12950, 'cpu1'],
    ['Motherboard', 'MSI B650M Gaming WiFi', 8495, 'mb1'],
    ['RAM', 'T-Force Delta 16GB DDR5', 3795, 'ram1'],
    ['Storage', 'Kingston NV3 1TB NVMe', 3495, 'ssd1'],
    ['PC Case', 'Tecware Forge M2', 2895, 'case1']
  ]
};

function builder() {
  return `
    <div class="page">
      <div class="builder-intro">
        <span class="eyebrow">BuildWise exclusive</span>

        <h1 class="section-title">
          Smart Build <span>Finder</span>
        </h1>

        <p class="lede">
          Answer three quick questions. We’ll recommend a balanced starting
          configuration and keep the total within your target whenever possible.
        </p>
      </div>

      <div class="builder-layout">
        <form class="builder-panel" id="builderForm">

          <h2>1. Set your budget</h2>

          <div class="range-line">
            <span>₱25,000</span>

            <output class="range-value" id="budgetValue">
              ₱55,000
            </output>

            <span>₱120,000</span>
          </div>

          <input
            id="budget"
            type="range"
            min="25000"
            max="120000"
            step="5000"
            value="55000"
          >

          <h2>2. What will you use it for?</h2>

          <div class="choice-grid">
            ${[
              ['gaming', 'Gaming', 'High frame rates'],
              ['school', 'School', 'Research and coding'],
              ['creator', 'Content Creation', 'Editing and design'],
              ['work', 'Work', 'Productivity and calls']
            ].map((x, i) => `
              <div class="choice">

                <input
                  id="${x[0]}"
                  type="radio"
                  name="use"
                  value="${x[0]}"
                  ${i === 0 ? 'checked' : ''}
                >

                <label for="${x[0]}">
                  <b>${x[1]}</b>
                  <span>${x[2]}</span>
                </label>

              </div>
            `).join('')}
          </div>

          <h2>3. Performance preference</h2>

          <div class="field">
            <select id="level">
              <option value="balanced">Balanced value</option>
              <option value="performance">Maximum performance</option>
              <option value="upgrade">Easy to upgrade</option>
            </select>
          </div>

          <button
            class="btn btn-green"
            style="width:100%;margin-top:24px"
          >
            Generate My Build
          </button>
        </form>

        <section class="result-panel" id="buildResult">
          <div class="placeholder-result">

            <div>
              <div class="success-icon">⚡</div>

              <h2>Your recommended build appears here</h2>

              <p>
                We balance component value, purpose, and compatibility.
              </p>
            </div>

          </div>
        </section>
      </div>
    </div>
  `;
}

function confirmation() {
  return `
    <div class="page">
      <section class="confirmation">

        <div class="success-icon">✓</div>

        <h1>Order confirmed</h1>

        <p class="lede">
          Thank you for choosing BuildWise PC. Your prototype order has been
          successfully recorded.
        </p>

        <span class="order-number">
          ORDER BW-${Math.floor(10000 + Math.random() * 89999)}
        </span>

        <div
          class="row-actions"
          style="justify-content:center"
        >
          <a class="btn" href="#home">
            Back to Home
          </a>

          <a class="btn btn-secondary" href="#shop">
            Keep Shopping
          </a>
        </div>

      </section>
    </div>
  `;
}

function showLogin() {
  const app = document.querySelector('#app');

  app.innerHTML = `
    <section class="auth-page">
      <div class="auth-box">

        <h1>Welcome Back</h1>

        <p>
          Log in to your BuildWise PC account.
        </p>

        <form id="loginForm">

          <input
            type="email"
            id="loginEmail"
            placeholder="Email address"
            required
          >

          <input
            type="password"
            id="loginPassword"
            placeholder="Password"
            required
          >

          <button type="submit">
            Log In
          </button>

        </form>

        <p class="auth-switch">
          Don't have an account?
          <a href="#signup">Sign Up</a>
        </p>

      </div>
    </section>
  `;

  document.querySelector('#loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email =
      document.querySelector('#loginEmail').value;

    const password =
      document.querySelector('#loginPassword').value;

    const user =
      JSON.parse(localStorage.getItem('buildwiseUser'));

    if (!user) {
      alert('No account found. Please sign up first.');
      return;
    }

    if (
      email === user.email &&
      password === user.password
    ) {
      localStorage.setItem(
        'buildwiseLoggedIn',
        'true'
      );

      alert('Login successful!');

      location.hash = 'home';
    } else {
      alert('Incorrect email or password.');
    }
  });

  app.focus();

  window.scrollTo(0, 0);
}

function showSignup() {
  const app = document.querySelector('#app');

  app.innerHTML = `
    <section class="auth-page">
      <div class="auth-box">

        <h1>Create Account</h1>

        <p>
          Sign up for your BuildWise PC account.
        </p>

        <form id="signupForm">

          <input
            type="text"
            id="signupName"
            placeholder="Full name"
            required
          >

          <input
            type="email"
            id="signupEmail"
            placeholder="Email address"
            required
          >

          <input
            type="password"
            id="signupPassword"
            placeholder="Password"
            required
          >

          <input
            type="password"
            id="signupConfirm"
            placeholder="Confirm password"
            required
          >

          <button type="submit">
            Sign Up
          </button>

        </form>

        <p class="auth-switch">
          Already have an account?
          <a href="#login">Log In</a>
        </p>

      </div>
    </section>
  `;

  document.querySelector('#signupForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name =
      document.querySelector('#signupName').value;

    const email =
      document.querySelector('#signupEmail').value;

    const password =
      document.querySelector('#signupPassword').value;

    const confirm =
      document.querySelector('#signupConfirm').value;

    if (password !== confirm) {
      alert('Passwords do not match.');
      return;
    }

    const user = {
      name: name,
      email: email,
      password: password
    };

    localStorage.setItem(
      'buildwiseUser',
      JSON.stringify(user)
    );

    alert('Account created successfully!');

    location.hash = 'login';
  });

  app.focus();

  window.scrollTo(0, 0);
}

function route() {
  const hash = location.hash.slice(1) || 'home';

  const [view, id] = hash.split('/');

  const app = document.querySelector('#app');

  if (view === 'shop') {

    app.innerHTML = shop();

  } else if (view === 'product') {

    app.innerHTML = detail(id);

  } else if (view === 'cart') {

    app.innerHTML = cartPage();

  } else if (view === 'checkout') {

    app.innerHTML = checkout();

  } else if (view === 'builder') {

    app.innerHTML = builder();

  } else if (view === 'confirmation') {

    app.innerHTML = confirmation();

  } else if (view === 'login') {

    showLogin();
    return;

  } else if (view === 'signup') {

    showSignup();
    return;

  } else {

    app.innerHTML = home();

  }

  app.focus();

  bind();

  window.scrollTo(0, 0);
}

function bind() {

  document.querySelectorAll('[data-add]').forEach(b => {

    b.onclick = () => add(b.dataset.add);

  });

  document.querySelectorAll('[data-remove]').forEach(b => {

    b.onclick = () => {

      cart = cart.filter(
        i => i.id !== b.dataset.remove
      );

      saveCart();

      route();
    };

  });

  document.querySelectorAll('[data-category]').forEach(a => {

    a.onclick = () => sessionStorage.setItem(
      'bw-category',
      a.dataset.category
    );

  });

  const dealsLink =
    document.querySelector('#dealsLink');

  if (dealsLink) {

    dealsLink.onclick = () => {

      sessionStorage.removeItem(
        'bw-category'
      );

    };

  }

  document.querySelectorAll('input[name=cat]').forEach(r => {

    r.onchange = () => {

      const list =
        r.value === 'All'
          ? products
          : products.filter(
              p => p.cat === r.value
            );

      const catalog =
        document.querySelector('#catalog');

      const resultCount =
        document.querySelector('#resultCount');

      if (catalog) {
        catalog.innerHTML =
          list.map(productCard).join('');
      }

      if (resultCount) {
        resultCount.textContent =
          list.length + ' products';
      }

      bind();
    };

  });

  const saved =
    sessionStorage.getItem('bw-category');

  if (
    saved &&
    location.hash === '#shop'
  ) {

    const radio =
      [...document.querySelectorAll('input[name=cat]')]
        .find(r => r.value === saved);

    if (radio) {

      radio.checked = true;

      radio.onchange();

    }

    sessionStorage.removeItem('bw-category');
  }

  const plus =
    document.querySelector('#qtyPlus');

  const minus =
    document.querySelector('#qtyMinus');

  if (plus) {

    plus.onclick = () => {

      selectedQty++;

      document.querySelector(
        '#qtyValue'
      ).textContent = selectedQty;

    };

  }

  if (minus) {

    minus.onclick = () => {

      selectedQty =
        Math.max(1, selectedQty - 1);

      document.querySelector(
        '#qtyValue'
      ).textContent = selectedQty;

    };

  }

  const da =
    document.querySelector('#detailAdd');

  if (da) {

    da.onclick = () =>
      add(
        da.dataset.id,
        selectedQty
      );

  }

  const budget =
    document.querySelector('#budget');

  if (budget) {

    budget.oninput = () => {

      document.querySelector(
        '#budgetValue'
      ).textContent =
        peso(+budget.value);

    };

  }

  const bf =
    document.querySelector('#builderForm');

  if (bf) {

    bf.onsubmit = e => {

      e.preventDefault();

      const use =
        new FormData(bf).get('use');

      const budget =
        +document.querySelector('#budget').value;

      const level =
        document.querySelector('#level').value;

      let parts =
        builds[use];

      const total =
        parts.reduce(
          (s, p) => s + p[2],
          0
        );

      document.querySelector(
        '#buildResult'
      ).innerHTML = `

        <span class="eyebrow">
          Recommended for ${use}
        </span>

        <h2>
          ${
            level[0].toUpperCase() +
            level.slice(1)
          } ${use} build
        </h2>

        <p class="muted">
          Target budget: ${peso(budget)} •
          ${
            total <= budget
              ? 'Within budget'
              : 'Closest available configuration'
          }
        </p>

        <div class="build-list">

          ${parts.map(p => `

            <div class="build-part">

              <div>
                <small>${p[0]}</small>
                <b>${p[1]}</b>
              </div>

              <strong>
                ${peso(p[2])}
              </strong>

            </div>

          `).join('')}

        </div>

        <div class="build-total">
          <span>Estimated total</span>
          <span>${peso(total)}</span>
        </div>

        <button
          class="btn btn-green"
          id="addBuild"
          style="width:100%;margin-top:18px"
        >
          Add Complete Build to Cart
        </button>
      `;

      document.querySelector(
        '#addBuild'
      ).onclick = () => {

        parts.forEach(
          p => add(p[3])
        );

        toast(
          'Complete build added to cart'
        );

      };

    };

  }

  const cf =
    document.querySelector('#checkoutForm');

  if (cf) {

    cf.onsubmit = e => {

      e.preventDefault();

      cart = [];

      saveCart();

      location.hash =
        'confirmation';

    };

  }

}

document.querySelector(
  '#menuButton'
).onclick = () => {

  const n =
    document.querySelector('#mainNav');

  const open =
    n.classList.toggle('open');

  document.querySelector(
    '#menuButton'
  ).setAttribute(
    'aria-expanded',
    open
  );

};

document.querySelector(
  '#mainNav'
).onclick = () => {

  document.querySelector(
    '#mainNav'
  ).classList.remove('open');

};

document.querySelector(
  '#newsletter'
).onsubmit = e => {

  e.preventDefault();

  toast(
    'You’re on the BuildWise list!'
  );

  e.target.reset();

};


/* SEARCH BUTTON */

document.querySelector(
  '#searchButton'
).onclick = () => {

  const search =
    prompt('Search for a product:');

  if (!search) return;

  const searchTerm =
    search.trim().toLowerCase();

  const results =
    products.filter(p =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.cat.toLowerCase().includes(searchTerm) ||
      p.spec.toLowerCase().includes(searchTerm)
    );

  location.hash = 'shop';

  setTimeout(() => {

    const catalog =
      document.querySelector('#catalog');

    const resultCount =
      document.querySelector('#resultCount');

    if (!catalog) return;

    catalog.innerHTML =
      results.length
        ? results.map(productCard).join('')
        : `
          <div class="empty">

            <h2>No products found</h2>

            <p class="muted">
              No products matched "${search}".
            </p>

            <a
              class="btn btn-secondary"
              href="#shop"
            >
              View All Products
            </a>

          </div>
        `;

    if (resultCount) {

      resultCount.textContent =
        results.length +
        (results.length === 1
          ? ' product'
          : ' products');

    }

    bind();

  }, 100);

};


window.addEventListener(
  'hashchange',
  route
);

saveCart();

route();