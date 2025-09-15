const style = document.createElement("style");
    style.textContent = `
      body { font-family: Arial, sans-serif; margin:0; padding:0; background:#fff8f0; }
      
      header { background: linear-gradient(90deg, #ff8a65, #ff5722); padding: 15px 30px; color:#fff; display:flex; justify-content:space-between; align-items:center; box-shadow:0 2px 6px rgba(0,0,0,0.15); }
      header h2 { margin:0; font-size:24px; letter-spacing:1px; }
      header p { margin:0; font-size:14px; }

      nav { background:#fff; padding:15px 40px; display:flex; justify-content:flex-end; gap:40px; box-shadow:0 2px 8px rgba(0,0,0,0.1); position:sticky; top:0; z-index:10; }
      nav button { background:none; border:0; font-size:16px; cursor:pointer; padding:8px 12px; position:relative; color:#333; transition:color 0.3s ease; }
      nav button:hover { color:#ff5722; }
     
      

      footer { background:#333; color:#fff; padding:30px; text-align:center; margin-top:40px; }
      footer .links { margin-bottom:15px; }
      footer a { color:#ff8a65; margin:0 15px; text-decoration:none; transition:color 0.3s; }
      footer a:hover { color:#fff; }

      .page { padding:40px; animation: fadeIn 0.8s ease; }
      .hero { text-align:center; padding:60px 20px; background:#fff3e0; border-radius:12px; margin-bottom:40px; }
      .hero h1 { font-size:36px; margin-bottom:20px; color:#d84315; }
      .grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); gap:20px; }
      .card { background:#fff; border-radius:12px; padding:20px; box-shadow:0 4px 10px rgba(0,0,0,0.1); transition:transform 0.3s, box-shadow 0.3s; }
      .card:hover { transform:translateY(-5px); box-shadow:0 6px 14px rgba(0,0,0,0.15); }
      .card img { width:100%; border-radius:12px; height:180px;object-fit:cover; }
      .search-bar { text-align:center; margin-bottom:20px; }
      .search-bar{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:10px;}
      .search-bar input { width:30%; padding:10px; border-radius:8px; border:1px solid #ccc; }
      .search-bar button { padding:10px 20px; border:none; border-radius:8px; background:#ff5722; color:#fff; cursor:pointer; transition:background 0.3s; }
      .search-bar button:hover { background:#e64a19; }

      /* Forms */
      .form-container { max-width:600px; margin:auto; display:flex; flex-direction:column; gap:15px; }
      .form-container input, .form-container textarea, .form-container select { padding:12px; border-radius:8px; border:1px solid #ccc; width:100%; }
      .form-container button { padding:12px 20px; border:none; border-radius:8px; background:#ff5722; color:#fff; cursor:pointer; transition:0.3s; }
      .form-container button:hover { background:#e64a19; }
      .form-section { background:#fff3e0; padding:30px; border-radius:12px; box-shadow:0 4px 10px rgba(0,0,0,0.1); }

      @keyframes fadeIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
      /* ===== Media Queries ===== */
@media (max-width: 1024px) {
  nav { flex-direction: row; gap:3px; padding: 15px 2px; }
  .search-bar input { width: 80%; }
  .grid { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
  .hero h1 { font-size: 28px; }
}

@media (max-width: 768px) {
  header { flex-direction: column; text-align: center; gap: 10px; }
  nav { justify-content: center; }
  .search-bar input { width: 90%; }
  .hero h1 { font-size: 24px; }
  .hero p { font-size: 14px; }
  .card { padding: 15px; }
}

@media (max-width: 480px) {
  nav { gap: 2px; padding:2px; }
  .hero { padding: 40px 15px; }
  .hero h1 { font-size: 20px; }
  .hero p { font-size: 12px; }
  .grid { grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); }
  .card img {  border-radius:12px; height:120px; }
  
  .search-bar {
    flex-direction: column;
    gap: 20px;
  }
  .search-bar input { width: 30%; font-size: 14px; }
  .search-bar button { padding: 8px 15px; font-size: 14px; }

  
  
  .form-container input,
  .form-container textarea,
  .form-container select,
  .form-container button { font-size: 14px; padding: 10px; }
}

    `;
    document.head.appendChild(style);

    // ---------- Pages ----------
    let cartItems = [];

function addToCart(name, image) {
  let price = Math.floor(Math.random() * 200) + 200;
  let existing = cartItems.find(item => item.name === name);
  if (existing) {
    existing.quantity++;
  } else {
    cartItems.push({ name, image, price, quantity: 1 });
  }
  alert(name + " added to cart!");
}

    
    const pages = {
      home: async () => {
        const div = document.createElement("div");
        div.className = "page";
        let meals = [];
        try {
          meals = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef")
            .then(r => r.json())
            .then(d => d.meals.slice(0,20));
        } catch(e){ console.error(e); }

        div.innerHTML = `
          <div class="hero">
            <h1>Welcome to Recipe Finder</h1>
            <p>Discover, save and cook your favorite recipes!</p>
          </div>
          <h2>Featured Recipes</h2>
          <div class="grid">
            ${meals.map(m => `<div class="card"><img src="${m.strMealThumb}" alt="${m.strMeal}"><h3>${m.strMeal}</h3><button onclick="addToCart('${m.strMeal}','${m.strMealThumb}')">Add to Cart</button>

             </div>`).join('')}
          </div>
          <h2>Cooking Tips</h2>
          <p>✔ Always taste as you cook<br>✔ Use fresh ingredients<br>✔ Balance spices well<br>✔ Keep knives sharp</p>
        `;
        return div;
      },
      search: () => {
        const div = document.createElement("div");
        div.className = "page";
        div.innerHTML = `
          <div class="hero"><h1>Search Recipes</h1><p>Find recipes by name</p></div>
          <div class="search-bar">
            <input type="text" id="search-input" placeholder="Search by name...">
            <button id="search-btn">Search</button>
          </div>
          <div id="meal-list" class="grid">
          
          </div>
        `;
        setTimeout(() => {
          document.getElementById("search-btn").addEventListener("click", getMealList);
        }, 0);
        return div;
      },
      categories: async () => {
        const div = document.createElement("div");
        div.className = "page";
        let list = [];
        try { list = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php").then(r=>r.json()).then(d=>d.categories); }
        catch(e){ console.error(e); }
        div.innerHTML = `
          <div class="hero"><h1>Categories</h1><p>Explore meals by type</p></div>
          <div class="grid">
            ${list.map(l => `<div class="card"><img src="${l.strCategoryThumb}" alt="${l.strCategory}"><h3>${l.strCategory}</h3></div>`).join('')}
          </div>
        `;
        return div;
      },
      
      contact: () => {
        const div = document.createElement("div");
        div.className = "page";
        div.innerHTML = `
          <div class="hero"><h1>Contact Us</h1><p>We'd love to hear from you!</p></div>
          <div class="form-section">
            <form class="form-container">
              <input type="text" placeholder="Your Name" required>
              <input type="email" placeholder="Your Email" required>
              <textarea placeholder="Your Message" required rows="5"></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        `;
        return div;
      },
      reservation: () => {
        const div = document.createElement("div");
        div.className = "page";
        div.innerHTML = `
          <div class="hero"><h1>Reserve a Table</h1><p>Book your table quickly and easily</p></div>
          <div class="form-section">
            <form class="form-container">
              <input type="text" placeholder="Full Name" required>
              <input type="email" placeholder="Email" required>
              <input type="tel" placeholder="Phone Number" required>
              <input type="date" required>
              <input type="time" required>
              <select required>
                <option value="">Select Party Size</option>
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
                <option value="5+">5+ People</option>
              </select>
              <button type="submit">Reserve Table</button>
            </form>
          </div>
        `;
        return div;
      },
      cart: () => {
  const div = document.createElement("div");
  div.className = "page";
  let total = 0;

  if (cartItems.length === 0) {
    div.innerHTML = `
      <div class="hero"><h1>Your Cart</h1><p>No items added yet.</p></div>
    `;
  } else {
    div.innerHTML = `
      <div class="hero"><h1>Your Cart</h1><p>Items you’ve added</p></div>
      <table style="width:100%; border-collapse:collapse;">
        <tr>
          <th style="border:1px solid #ccc; padding:8px;">Item</th>
          <th style="border:1px solid #ccc; padding:8px;">Price</th>
          <th style="border:1px solid #ccc; padding:8px;">Quantity</th>
          <th style="border:1px solid #ccc; padding:8px;">Subtotal</th>
        </tr>
        ${cartItems.map(item => {
          let sub = item.price * item.quantity;
          total += sub;
          return `
            <tr>
              <td style="border:1px solid #ccc; padding:8px;">${item.name}</td>
              <td style="border:1px solid #ccc; padding:8px;">$${item.price}</td>
              <td style="border:1px solid #ccc; padding:8px;">${item.quantity}</td>
              <td style="border:1px solid #ccc; padding:8px;">$${sub}</td>
            </tr>`;
        }).join('')}
      </table>
      <h2>Total: $${total}</h2>
    `;
  }
  return div;
}

  
    };

    // ---------- Navigation ----------
    function renderHeader() {
      const header = document.createElement("header");
      header.innerHTML = `<h2>🍲 Recipe Finder</h2><p>Your food buddy</p>`;
      return header;
    }

    function renderNav() {
      const nav = document.createElement("nav");
      ["home","search","categories","reservation","contact","cart"].forEach(p=>{
        const btn = document.createElement("button");
        btn.textContent = p[0].toUpperCase()+p.slice(1);
        btn.onclick = ()=> loadPage(p);
        nav.appendChild(btn);
      });
      return nav;
    }

    function renderFooter() {
      const footer = document.createElement("footer");
      footer.innerHTML = `
        <div class="links">
          <a href="#">Privacy</a> | 
          <a href="#">Terms</a> | 
          <a href="#">Contact</a>
        </div>
        <p>© 2025 Recipe Finder. All Rights Reserved.</p>
      `;
      return footer;
    }

    // ---------- Search API ----------
    function getMealList(){
      let searchInputTxt=document.getElementById("search-input").value.trim();
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
      .then(response=>response.json())
      .then(data=>{
        let html="";
        if(data.meals){
          data.meals.forEach(meal=>{
            html+=`<div class="card">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
              <h3>${meal.strMeal}</h3>
               <button onclick="addToCart('${meal.strMeal}','${meal.strMealThumb}')">Add to Cart</button>

              </div>`;
          });
        } else { html="<p>No meals found</p>"; }
        document.getElementById("meal-list").innerHTML=html;
      })
      .catch(()=>{ document.getElementById("meal-list").innerHTML="<p>Error fetching data</p>"; });
    }

    // ---------- Main Renderer ----------
    async function loadPage(page){
      const app = document.getElementById("app");
      app.innerHTML="";
      app.appendChild(renderHeader());
      app.appendChild(renderNav());
      const pageContent = await pages[page]();
      app.appendChild(pageContent);
      app.appendChild(renderFooter());
      const contactForm = document.querySelector(".form-container");
  if (contactForm && page === "contact") {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault(); 
      alert("Thank you! Your message has been sent.");
      contactForm.reset();
    });
  }

  const reservationForm = document.querySelector(".form-container");
  if (reservationForm && page === "reservation") {
    reservationForm.addEventListener("submit", (e) => {
      e.preventDefault(); // prevent page reload
      alert("Your table has been reserved!");
      reservationForm.reset();
    });
  }
    }

    // Initial load
    loadPage("home");