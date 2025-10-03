import { navigateTo, socket } from "../app.js";

export default function renderScreen1() {
  const app = document.getElementById("app");
  app.innerHTML = `
      <div id="screen1">
        <h2>Consultas (Instrucción 2)</h2>

        <div style="display:flex; gap:12px; flex-wrap:wrap; margin-bottom:12px;">
          <button id="btn-products-all">1.2 Todos los products</button>
          <button id="btn-products-cheap">2.2 Products price < 50</button>
          <button id="btn-users-basic">3.2 Users username+email</button>
          <button id="btn-orders-desc">4.2 Orders desc by created_at</button>
          <button id="btn-products-electronics">6.2 Products >30 & Electronics</button>
          <div class="input-button-group">
            <input id="input-posts-title" placeholder="title contiene... (e.g. tutorial)" />
            <button id="btn-posts-search">7.2 Buscar posts</button>
          </div>
          <button id="btn-products-page1">8.2 Primeros 10 products</button>
          <div class="input-button-group">
            <input id="input-user-id" placeholder="user_id" type="number" />
            <button id="btn-products-by-user">9.2 Products by user</button>
          </div>
        </div>

        <div>
          <h3>Resultado</h3>
          <pre id="result" style="background:#111; color:#0f0; padding:12px; border-radius:8px; overflow:auto; max-height:50vh;"></pre>
        </div>
      </div>
      `;

  socket.on("next-screen", (data) => {
    navigateTo("/screen2", { name: "Hola" });
  });

  const resultEl = document.getElementById("result");
  const setResult = (value) => {
    try {
      resultEl.textContent = typeof value === "string" ? value : JSON.stringify(value, null, 2);
    } catch (e) {
      resultEl.textContent = String(value);
    }
  };

  const handleFetch = async (url) => {
    setResult("Cargando...\n" + url);
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) {
        setResult({ status: res.status, error: data });
        return;
      }
      setResult(data);
    } catch (err) {
      setResult({ error: err?.message || String(err) });
    }
  };

  document.getElementById("btn-products-all").addEventListener("click", () => {
    handleFetch(`/products`);
  });

  document.getElementById("btn-products-cheap").addEventListener("click", () => {
    handleFetch(`/products/cheap`);
  });

  document.getElementById("btn-users-basic").addEventListener("click", () => {
    handleFetch(`/users/basic`);
  });

  document.getElementById("btn-orders-desc").addEventListener("click", () => {
    handleFetch(`/orders`);
  });

  document.getElementById("btn-products-electronics").addEventListener("click", () => {
    handleFetch(`/products/electronics`);
  });

  document.getElementById("btn-posts-search").addEventListener("click", () => {
    const title = document.getElementById("input-posts-title").value?.trim();
    const q = title ? encodeURIComponent(title) : "tutorial";
    handleFetch(`/posts/search?title=${q}`);
  });

  document.getElementById("btn-products-page1").addEventListener("click", () => {
    handleFetch(`/products/page/1`);
  });

  document.getElementById("btn-products-by-user").addEventListener("click", () => {
    const userIdStr = document.getElementById("input-user-id").value;
    const userId = parseInt(userIdStr);
    if (isNaN(userId) || userId < 1) {
      setResult({ error: "Ingrese un user_id válido" });
      return;
    }
    handleFetch(`/users/${userId}/products`);
  });
}
