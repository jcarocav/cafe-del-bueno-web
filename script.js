// ============================================================
// CONFIGURACIÓN
// ============================================================
const WHATSAPP_NUMBER = "56990896241";
const CAFE_NAME = "Café del Bueno";
const CURRENCY_SYMBOL = "$";

// ============================================================
// UTILIDADES
// ============================================================
function parsePrice(priceText) {
  const cleaned = priceText.replace(/[^0-9.,]/g, "").replace(",", ".");
  const value = parseFloat(cleaned);
  return Number.isNaN(value) ? 0 : value;
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function buildWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function buildInquiryLink() {
  return buildWhatsAppLink(`¡Hola! Tengo una consulta sobre ${CAFE_NAME}.`);
}

function buildRoomAvailabilityLink(roomName) {
  return buildWhatsAppLink(`¡Hola! Me gustaría saber la disponibilidad para reservar la ${roomName}.`);
}

// Elige un ícono de Lucide relevante según el nombre/descripción del producto
function getMenuItemIcon(item) {
  const t = `${item.name} ${item.description}`.toLowerCase();
  if (t.includes('matcha') || t.includes('té') || t.includes('te verde')) return 'leaf';
  if (t.includes('granola') || t.includes('açaí') || t.includes('acai') || t.includes('bowl')) return 'leaf';
  if (
    t.includes('cold brew') || t.includes('frappuccino') || t.includes('smoothie') ||
    t.includes('limonada') || t.includes('helado') || t.includes('iced')
  ) return 'cup-soda';
  if (t.includes('tostada') || t.includes('huevo') || t.includes('bagel') || t.includes('croissant de jamón')) return 'egg';
  if (
    t.includes('brownie') || t.includes('cheesecake') || t.includes('tiramisú') ||
    t.includes('tarta') || t.includes('muffin') || t.includes('macaron')
  ) return 'cake';
  if (t.includes('café') || t.includes('espresso') || t.includes('latte') || t.includes('cappuccino') || t.includes('cortado') || t.includes('americano') || t.includes('mocha') || t.includes('flat white')) return 'coffee';
  return 'utensils';
}

function buildOrderMessage(items, total, info) {
  const lines = [];
  lines.push(`¡Hola ${CAFE_NAME}! 👋 Quiero hacer el siguiente pedido:`);
  lines.push("");
  items.forEach(i => {
    lines.push(`• ${i.qty}x ${i.name} — ${CURRENCY_SYMBOL}${(i.price * i.qty).toFixed(2)}`);
  });
  lines.push("");
  lines.push(`*Total: ${CURRENCY_SYMBOL}${total.toFixed(2)}*`);
  lines.push("");
  lines.push(`Nombre: ${info.name}`);
  lines.push(`Teléfono: ${info.phone}`);
  lines.push(`Entrega: ${info.method === "delivery" ? "Delivery" : "Retiro en local"}`);
  if (info.method === "delivery" && info.address) {
    lines.push(`Dirección: ${info.address}`);
  }
  if (info.notes && info.notes.trim()) {
    lines.push(`Notas: ${info.notes}`);
  }
  return lines.join("\n");
}

// ============================================================
// DATOS DEL MENÚ (reordenados para mejor presentación)
// ============================================================
const menuData = {
  // Recomendación de la casa: los más destacados
  recomendacion: [
    { name: 'Signature Latte', description: 'Espresso, leche vaporizada, vainilla de Madagascar', price: '$5.50', tag: 'Favorito' },
    { name: 'Tostada Avocado', description: 'Pan artesanal, aguacate, huevo pochado, semillas de chía', price: '$12.00', tag: 'Chef' },
    { name: 'Cold Brew Reserve', description: 'Infusión en frío 18 horas, origen etíope, notas florales', price: '$6.50', tag: 'Especial' },
    { name: 'Tiramisú de Café', description: 'Bizcochos artesanales, mascarpone, espresso concentrado', price: '$8.50', tag: 'Postre' },
    { name: 'Bowl de Açaí', description: 'Açaí orgánico, granola casera, frutas frescas, miel', price: '$11.00', tag: 'Saludable' },
  ],
  // Bebidas calientes: de las más clásicas a las más elaboradas
  calientes: [
    { name: 'Espresso', description: 'Shot doble de origen único, tostado medio', price: '$3.00' },
    { name: 'Cortado', description: 'Espresso equilibrado con un toque de leche', price: '$4.00' },
    { name: 'Americano', description: 'Espresso con agua caliente filtrada', price: '$3.50' },
    { name: 'Cappuccino', description: 'Espresso, leche vaporizada y espuma densa', price: '$4.50' },
    { name: 'Flat White', description: 'Doble espresso con leche vaporizada aterciopelada', price: '$4.75' },
    { name: 'Latte', description: 'Espresso con abundante leche sedosa y microespuma', price: '$5.00' },
    { name: 'Mocha', description: 'Espresso, chocolate oscuro belga y leche vaporizada', price: '$5.50' },
    { name: 'Matcha Latte Caliente', description: 'Matcha ceremonial japonés con leche de avena', price: '$5.75' },
    { name: 'Té Earl Grey', description: 'Bergamota aromática, servido con leche o solo', price: '$3.50' },
  ],
  // Bebidas frías: refrescantes y variadas
  frias: [
    { name: 'Cold Brew', description: 'Infusión en frío 18 horas, suave y concentrado', price: '$5.00' },
    { name: 'Iced Latte', description: 'Espresso frío sobre leche con hielo', price: '$5.50' },
    { name: 'Limonada de Menta', description: 'Limón fresco, menta, agua mineral y miel', price: '$4.50' },
    { name: 'Té Helado Durazno', description: 'Té verde, durazno natural, miel de agave', price: '$4.75' },
    { name: 'Matcha Latte Frío', description: 'Matcha ceremonial, leche de almendras y hielo', price: '$5.75' },
    { name: 'Frappuccino de Caramelo', description: 'Mezcla cremosa de café, caramelo y crema batida', price: '$6.00' },
    { name: 'Smoothie de Frutos Rojos', description: 'Fresa, arándano, frambuesa y yogur natural', price: '$6.50' },
  ],
  // Platos: de los más ligeros a los más sustanciosos
  platos: [
    { name: 'Granola con Yogur', description: 'Granola artesanal con miel, yogur griego y frutas de temporada', price: '$8.50' },
    { name: 'Croissant de Jamón y Queso', description: 'Croissant francés horneado, jamón serrano y queso brie', price: '$9.50' },
    { name: 'Tostada Avocado', description: 'Pan artesanal, aguacate, huevo pochado, semillas de chía y rúcula', price: '$12.00' },
    { name: 'Bowl de Açaí', description: 'Açaí orgánico, granola casera, plátano, fresas y miel silvestre', price: '$11.00' },
    { name: 'Bagel con Salmón', description: 'Bagel tostado, queso crema, salmón ahumado y alcaparras', price: '$13.00' },
    { name: 'Huevos Benedictinos', description: 'Muffin inglés, jamón, huevo pochado y salsa holandesa', price: '$14.50' },
  ],
  // Postres: los más vendidos primero
  postres: [
    { name: 'Brownie de Chocolate', description: 'Chocolate belga 70%, nueces pecanas, bordes crujientes', price: '$6.00' },
    { name: 'Cheesecake de Berries', description: 'Base de galleta, crema de queso y coulis de frutos rojos', price: '$7.50' },
    { name: 'Tiramisú de Café', description: 'Bizcochos artesanales, mascarpone, espresso y cacao', price: '$8.50' },
    { name: 'Tarta de Limón', description: 'Masa quebrada, crema de limón y merengue italiano tostado', price: '$7.00' },
    { name: 'Muffin de Arándanos', description: 'Receta casera con arándanos frescos y azúcar de vainilla', price: '$4.50' },
    { name: 'Macaron Surtido', description: 'Cuatro macarons de sabores: vainilla, café, frambuesa y pistache', price: '$9.00' },
  ],
};

const tabs = [
  { id: 'recomendacion', label: 'Recomendación de la Casa' },
  { id: 'calientes', label: 'Bebidas Calientes' },
  { id: 'frias', label: 'Bebidas Frías' },
  { id: 'platos', label: 'Platos' },
  { id: 'postres', label: 'Postres' },
];

const tagClassMap = {
  'Favorito': 'tag-favorito',
  'Chef': 'tag-chef',
  'Especial': 'tag-especial',
  'Postre': 'tag-postre',
  'Saludable': 'tag-saludable',
};

// ============================================================
// DATOS DE SALAS
// ============================================================
const rooms = [
  {
    id: 'lectura',
    name: 'Sala de Lectura',
    tagline: 'Un refugio silencioso',
    description: 'Espacio íntimo diseñado para quienes buscan leer, estudiar o trabajar en calma. Rodeado de estanterías con cientos de títulos, luz natural tamizada y el aroma del café recién preparado.',
    icon: 'book-open',
    capacity: 'Hasta 8 personas',
    hours: 'Lun – Vie: 8am – 8pm · Sáb – Dom: 9am – 6pm',
    features: ['Wi-Fi de alta velocidad', 'Biblioteca curada', 'Iluminación ajustable', 'Cargadores en cada mesa', 'Silencio garantizado'],
    image: 'img/libreria.png',
    accent: 'rgb(159,106,51)',
  },
  {
    id: 'eventos',
    name: 'Sala de Multi Eventos',
    tagline: 'Tu espacio, tus ideas',
    description: 'Sala versátil para reuniones, talleres, presentaciones, lanzamientos o celebraciones privadas. Equipada con tecnología audiovisual y configuración adaptable a cada ocasión.',
    icon: 'users',
    capacity: 'Hasta 30 personas',
    hours: 'Disponible todos los días con reservación previa',
    features: ['Proyector y pantalla HD', 'Sistema de sonido', 'Pizarrón y rotafolios', 'Servicio de café incluido', 'Configuración flexible'],
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
    accent: 'rgb(59,35,20)',
  }
];

// ============================================================
// ESTADO DEL CARRITO
// ============================================================
let cartItems = [];
let isCartOpen = false;
let drawerStep = 'cart'; // 'cart' | 'form'

let checkoutData = {
  name: '',
  phone: '',
  method: 'retiro',
  address: '',
  notes: '',
};

// ============================================================
// FUNCIONES DEL CARRITO
// ============================================================
function addItem(item, qty = 1) {
  const existing = cartItems.find(i => i.id === item.id);
  if (existing) {
    existing.qty += qty;
  } else {
    cartItems.push({ ...item, qty });
  }
  updateBadge();
  showToast(`+ ${item.name}`);
}

function removeItem(id) {
  cartItems = cartItems.filter(i => i.id !== id);
  if (isCartOpen) {
    renderCartContent();
    updateTotal();
  }
  updateBadge();
}

function updateQty(id, qty) {
  if (qty <= 0) {
    removeItem(id);
    return;
  }
  const item = cartItems.find(i => i.id === id);
  if (item) {
    item.qty = qty;
    if (isCartOpen) {
      renderCartContent();
      updateTotal();
    }
    updateBadge();
  }
}

function clearCart() {
  cartItems = [];
  if (isCartOpen) {
    renderCartContent();
    updateTotal();
  }
  updateBadge();
}

function totalItems() {
  return cartItems.reduce((sum, i) => sum + i.qty, 0);
}

function totalPrice() {
  return cartItems.reduce((sum, i) => sum + i.qty * i.price, 0);
}

// ============================================================
// NOTIFICACIÓN TOAST
// ============================================================
let toastTimer = null;

function showToast(message) {
  const old = document.getElementById('cart-toast');
  if (old) old.remove();
  if (toastTimer) clearTimeout(toastTimer);

  const toast = document.createElement('div');
  toast.id = 'cart-toast';
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '100px',
    right: '20px',
    background: 'rgb(59,35,20)',
    color: 'white',
    padding: '10px 18px',
    borderRadius: '8px',
    fontFamily: 'Fraunces, georgia, serif',
    fontSize: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    zIndex: '9999',
    opacity: '0',
    transform: 'translateY(20px)',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
    pointerEvents: 'none',
  });
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });

  toastTimer = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 2000);
}

// ============================================================
// BADGE DEL CARRITO
// ============================================================
function updateBadge() {
  const badge = document.getElementById('navbar-cart-badge');
  if (badge) {
    const count = totalItems();
    badge.textContent = count > 0 ? count : '';
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

// ============================================================
// DRAWER
// ============================================================
function renderDrawer() {
  let drawer = document.getElementById('cart-drawer');
  if (!drawer) {
    drawer = document.createElement('div');
    drawer.id = 'cart-drawer';
    document.body.appendChild(drawer);
  }

  Object.assign(drawer.style, {
    position: 'fixed',
    inset: '0',
    zIndex: '300',
    display: 'flex',
    justifyContent: 'flex-end',
    pointerEvents: isCartOpen ? 'auto' : 'none',
  });

  let overlay = drawer.querySelector('.overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'overlay';
    drawer.appendChild(overlay);
  }
  Object.assign(overlay.style, {
    position: 'absolute',
    inset: '0',
    background: 'rgba(0,0,0,0.5)',
    opacity: isCartOpen ? '1' : '0',
    transition: 'opacity 0.25s ease',
    pointerEvents: isCartOpen ? 'auto' : 'none',
    cursor: 'pointer',
  });
  overlay.onclick = function(e) {
    e.stopPropagation();
    closeDrawer();
  };

  let panel = drawer.querySelector('.panel');
  if (!panel) {
    panel = document.createElement('div');
    panel.className = 'panel';
    drawer.appendChild(panel);
  }
  Object.assign(panel.style, {
    position: 'relative',
    width: '100%',
    maxWidth: '440px',
    height: '100%',
    backgroundColor: 'rgb(252, 248, 243)',
    transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
    display: 'flex',
    flexDirection: 'column',
    pointerEvents: isCartOpen ? 'auto' : 'none',
    boxShadow: '0 0 30px rgba(0,0,0,0.2)',
  });

  if (isCartOpen && cartItems.length === 0) {
    closeDrawer();
    return;
  }

  let html = `
    <div class="flex items-center justify-between px-6 h-16 border-b shrink-0" style="border-color: rgb(232,220,200);">
      <h2 class="text-lg" style="font-family: 'Fraunces', georgia, serif; font-weight: 700; color: rgb(59,35,20);">Tu pedido</h2>
      <button id="cart-close" class="transition-colors" style="color: rgb(140,100,60); background: none; border: none; cursor: pointer; font-size: 1.8rem; line-height: 1; padding: 0 8px;" aria-label="Cerrar carrito">✕</button>
    </div>
    <div class="flex-1 overflow-y-auto px-6 py-6 drawer-body" style="overflow-y: auto;"></div>
    <div class="border-t px-6 py-6 space-y-4 shrink-0 drawer-footer" style="border-color: rgb(232,220,200);">
      <div class="flex justify-between items-center">
        <span class="text-xs uppercase tracking-[0.3em]" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgb(140,100,60);">Total</span>
        <span class="text-lg drawer-total" style="color: rgb(59,35,20); font-weight: 700;">${CURRENCY_SYMBOL}${totalPrice().toFixed(2)}</span>
      </div>
      <div id="drawer-actions"></div>
    </div>
  `;
  panel.innerHTML = html;

  const closeBtn = panel.querySelector('#cart-close');
  if (closeBtn) {
    closeBtn.onclick = function(e) {
      e.stopPropagation();
      closeDrawer();
    };
  }

  renderCartContent();
  updateDrawerActions();
}

function renderCartContent() {
  const body = document.querySelector('#cart-drawer .drawer-body');
  if (!body) return;

  if (drawerStep === 'cart') {
    if (cartItems.length === 0) {
      body.innerHTML = `<p class="text-sm" style="color: rgb(140,100,60);">Tu pedido está vacío.</p>`;
    } else {
      let itemsHtml = cartItems.map(item => `
        <div class="flex gap-4 items-start border-b pb-4" style="border-color: rgb(235,220,200);">
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium" style="color: rgb(59,35,20);">${item.name}</p>
            <p class="text-xs mt-0.5" style="color: rgb(159,106,51);">${CURRENCY_SYMBOL}${item.price.toFixed(2)}</p>
            <div class="flex items-center gap-3 mt-2.5">
              <button class="cart-qty-minus w-6 h-6 border flex items-center justify-center transition-colors" style="border-color: rgb(220,200,175); color: rgb(59,35,20); background: none; cursor: pointer; border-radius: 4px;" data-id="${item.id}">
                <i data-lucide="minus" class="w-3 h-3"></i>
              </button>
              <span class="text-sm w-4 text-center" style="color: rgb(59,35,20);">${item.qty}</span>
              <button class="cart-qty-plus w-6 h-6 border flex items-center justify-center transition-colors" style="border-color: rgb(220,200,175); color: rgb(59,35,20); background: none; cursor: pointer; border-radius: 4px;" data-id="${item.id}">
                <i data-lucide="plus" class="w-3 h-3"></i>
              </button>
              <button class="cart-remove ml-2 transition-colors" style="color: rgb(159,106,51); background: none; border: none; cursor: pointer;" data-id="${item.id}">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>
          <p class="text-sm shrink-0" style="color: rgb(59,35,20);">${CURRENCY_SYMBOL}${(item.price * item.qty).toFixed(2)}</p>
        </div>
      `).join('');
      body.innerHTML = itemsHtml;
    }
  } else {
    // Formulario
    body.innerHTML = `
      <div class="space-y-5">
        <div>
          <label for="checkout-name" class="text-[10px] tracking-[0.3em] uppercase block mb-2" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgb(140,100,60);">Nombre</label>
          <input id="checkout-name" name="name" autocomplete="name" value="${checkoutData.name}" class="w-full border px-3 py-2.5 text-sm outline-none transition-colors" style="border-color: rgb(220,200,175); color: rgb(59,35,20); background-color: white; border-radius: 4px;" placeholder="Tu nombre" />
        </div>
        <div>
          <label for="checkout-phone" class="text-[10px] tracking-[0.3em] uppercase block mb-2" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgb(140,100,60);">Teléfono</label>
          <input id="checkout-phone" name="phone" type="tel" autocomplete="tel" value="${checkoutData.phone}" class="w-full border px-3 py-2.5 text-sm outline-none transition-colors" style="border-color: rgb(220,200,175); color: rgb(59,35,20); background-color: white; border-radius: 4px;" placeholder="+56 9 1234 5678" />
        </div>
        <fieldset>
          <legend class="text-[10px] tracking-[0.3em] uppercase block mb-2" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgb(140,100,60);">Tipo de entrega</legend>
          <div class="method-toggle-group" role="group" aria-label="Tipo de entrega" style="display: flex; gap: 0; border: 1px solid rgb(220,200,175); width: fit-content; border-radius: 4px; overflow: hidden;">
            <button type="button" class="method-toggle ${checkoutData.method === 'retiro' ? 'active' : ''}" data-method="retiro" style="padding: 0.625rem 1.25rem; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; background: ${checkoutData.method === 'retiro' ? 'rgb(59,35,20)' : 'transparent'}; color: ${checkoutData.method === 'retiro' ? 'white' : 'rgb(140,100,60)'}; border: none; cursor: pointer; transition: background 0.2s, color 0.2s;">Retiro en local</button>
            <button type="button" class="method-toggle ${checkoutData.method === 'delivery' ? 'active' : ''}" data-method="delivery" style="padding: 0.625rem 1.25rem; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; background: ${checkoutData.method === 'delivery' ? 'rgb(59,35,20)' : 'transparent'}; color: ${checkoutData.method === 'delivery' ? 'white' : 'rgb(140,100,60)'}; border: none; border-left: 1px solid rgb(220,200,175); cursor: pointer; transition: background 0.2s, color 0.2s;">Delivery</button>
          </div>
        </fieldset>
        <div id="delivery-address-group" style="${checkoutData.method === 'delivery' ? '' : 'display: none;'}">
          <label for="checkout-address" class="text-[10px] tracking-[0.3em] uppercase block mb-2" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgb(140,100,60);">Dirección</label>
          <input id="checkout-address" name="address" autocomplete="street-address" value="${checkoutData.address}" class="w-full border px-3 py-2.5 text-sm outline-none transition-colors" style="border-color: rgb(220,200,175); color: rgb(59,35,20); background-color: white; border-radius: 4px;" placeholder="Calle, número, referencia" />
        </div>
        <div>
          <label for="checkout-notes" class="text-[10px] tracking-[0.3em] uppercase block mb-2" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgb(140,100,60);">Notas (opcional)</label>
          <textarea id="checkout-notes" name="notes" rows="3" class="w-full border px-3 py-2.5 text-sm outline-none transition-colors resize-none" style="border-color: rgb(220,200,175); color: rgb(59,35,20); background-color: white; border-radius: 4px;" placeholder="Alergias, instrucciones especiales, etc.">${checkoutData.notes}</textarea>
        </div>
      </div>
    `;

    document.querySelectorAll('.method-toggle').forEach(btn => {
      btn.onclick = function(e) {
        e.stopPropagation();
        document.querySelectorAll('.method-toggle').forEach(b => {
          b.classList.remove('active');
          b.style.background = 'transparent';
          b.style.color = 'rgb(140,100,60)';
        });
        this.classList.add('active');
        this.style.background = 'rgb(59,35,20)';
        this.style.color = 'white';
        const method = this.dataset.method;
        checkoutData.method = method;
        const addrGroup = document.getElementById('delivery-address-group');
        if (addrGroup) addrGroup.style.display = method === 'delivery' ? '' : 'none';
      };
    });

    document.getElementById('checkout-name')?.addEventListener('input', function() {
      checkoutData.name = this.value;
    });
    document.getElementById('checkout-phone')?.addEventListener('input', function() {
      checkoutData.phone = this.value;
    });
    document.getElementById('checkout-address')?.addEventListener('input', function() {
      checkoutData.address = this.value;
    });
    document.getElementById('checkout-notes')?.addEventListener('input', function() {
      checkoutData.notes = this.value;
    });
  }

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

function updateDrawerActions() {
  const actions = document.getElementById('drawer-actions');
  if (!actions) return;

  if (drawerStep === 'cart') {
    actions.innerHTML = `
      <button id="drawer-continue" class="w-full py-3 text-[11px] tracking-[0.35em] uppercase font-medium transition-colors" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: rgb(59,35,20); color: white; border: none; cursor: pointer; border-radius: 4px;">Continuar</button>
    `;
  } else {
    actions.innerHTML = `
      <div class="flex gap-3">
        <button id="drawer-back" class="flex-1 py-3 border text-[11px] tracking-[0.35em] uppercase transition-colors" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; border-color: rgb(220,200,175); color: rgb(140,100,60); background: none; cursor: pointer; border-radius: 4px;">Volver</button>
        <button id="drawer-send" class="flex-1 py-3 text-[11px] tracking-[0.35em] uppercase font-medium transition-opacity disabled:opacity-40 disabled:cursor-not-allowed" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #25D366; color: white; border: none; cursor: pointer; border-radius: 4px;">Enviar por WhatsApp</button>
      </div>
    `;
  }
}

function updateTotal() {
  const totalEl = document.querySelector('#cart-drawer .drawer-total');
  if (totalEl) {
    totalEl.textContent = `${CURRENCY_SYMBOL}${totalPrice().toFixed(2)}`;
  }
}

// ============================================================
// ABRIR / CERRAR DRAWER
// ============================================================
function openDrawer() {
  if (cartItems.length === 0) {
    alert('Tu carrito está vacío.');
    return;
  }
  isCartOpen = true;
  drawerStep = 'cart';
  renderDrawer();
}

function closeDrawer() {
  isCartOpen = false;
  const drawer = document.getElementById('cart-drawer');
  if (drawer) {
    const panel = drawer.querySelector('.panel');
    const overlay = drawer.querySelector('.overlay');
    if (panel) panel.style.transform = 'translateX(100%)';
    if (overlay) {
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none';
    }
    drawer.style.pointerEvents = 'none';
  }
}

// ============================================================
// CONSTRUCCIÓN DEL HTML PRINCIPAL
// ============================================================
function buildMainHTML() {
  // Header fijo
  const headerHtml = `
    <header role="banner" id="top" class="fixed top-0 left-0 right-0 h-20 bg-white border-b z-[200] flex items-center justify-between px-6" style="border-bottom-color: rgb(232,232,232);">
      <nav aria-label="Main Navigation" role="navigation" class="flex items-center gap-6">
        <a href="#menu" class="uppercase text-sm tracking-[0.4px]" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgb(59,35,20); text-decoration: none;">Menú</a>
        <a href="#reservar-sala" class="uppercase text-sm tracking-[0.4px]" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgb(59,35,20); text-decoration: none;">Reservar Sala</a>
        <a href="#nosotros" class="uppercase text-sm tracking-[0.4px]" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgb(59,35,20); text-decoration: none;">Nosotros</a>
      </nav>
      <a href="#top" class="flex items-center gap-2.5" style="text-decoration: none;">
        <img src="img/logo-navbar.png" alt="Café del Bueno" class="w-11 h-11 rounded-full object-cover" style="border: 1.6px solid rgb(159,106,51);" />
        <span class="text-xl font-bold" style="font-family: 'Fraunces', georgia, serif; color: rgb(59,35,20);">CAFÉ DEL BUENO</span>
      </a>
      <div class="flex items-center gap-6">
        <a href="#contacto" class="uppercase text-sm tracking-[0.4px]" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgb(59,35,20); text-decoration: none;">Ubicación</a>
        <button id="navbar-cart-btn" class="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors" aria-label="Ver mi pedido">
          <i data-lucide="shopping-bag" size="20" style="color: rgb(59,35,20);"></i>
          <span id="navbar-cart-badge" class="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center text-[11px] font-bold" style="background-color: rgb(159,106,51); color: white; display: none;">0</span>
        </button>
      </div>
    </header>
  `;

  const topBarHtml = `
    <div class="bg-[rgb(40,25,14)] z-[99]">
      <div class="ml-auto mr-auto text-center text-white max-w-[1020px] py-2 px-[30px]">
        <p class="text-center text-[14px] leading-[21px]">☕ Cafetería de barrio en Punta Arenas — pedidos para retiro o coordinados directo por WhatsApp.</p>
      </div>
    </div>
  `;

  const heroHtml = `
    <div class="relative mb-[100px] bg-[rgb(48,48,48)] text-white min-h-[600px]">
      <div class="absolute left-0 top-0 right-0 bottom-0 z-[1]" style="background-image: linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0) 68%);"></div>
      <img src="img/fondo.png" alt="Café del Bueno — interior del local en Punta Arenas" class="block size-full max-w-full object-cover overflow-clip absolute left-0 top-0 right-0 bottom-0 aspect-[auto_1200_/_600]" />
      <div class="relative pt-20 pr-[30px] pb-20 pl-[30px] z-[2]">
        <div class="text-left max-w-[420px]">
          <h1 class="font-bold text-left uppercase text-[38px] leading-[42px]" style="text-shadow: rgb(0,0,0) 0px 0px 15px;">Haz una pausa.<br />Pide del BUENO.</h1>
          <div class="text-left">
            <p class="text-left mt-[20px] text-[17px] leading-[26px] max-w-[380px]" style="text-shadow: rgb(0,0,0) 0px 0px 15px;">Un refugio con Café de especialidad y pastelería casera, aquí en un rincón de Punta Arenas. ¡Ven y consigue el tuyo!</p>
          </div>
          <div class="flex items-center gap-4 mt-[24px]">
            <a href="#menu" class="inline-block text-center uppercase align-middle whitespace-nowrap h-12 bg-[rgb(159,106,51)] tracking-[0.4px] leading-[46px] min-w-[120px] pt-[1.6px] pr-4 pb-0 pl-4" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; text-decoration: none; color: white;">Menú</a>
            <a href="#reservar-sala" class="inline-block text-center uppercase align-middle whitespace-nowrap h-12 border-[1.6px] border-white text-white tracking-[0.4px] leading-[46px] min-w-[120px] pt-[1.6px] pr-4 pb-0 pl-4" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; text-decoration: none;">Reservar Sala</a>
          </div>
        </div>
      </div>
    </div>
  `;

  // ===== PESTAÑAS COMO BOTONES PILLS =====
  const tabsHtml = tabs.map(tab => `
    <button class="menu-tab ${tab.id === 'recomendacion' ? 'active' : ''}" 
            data-tab="${tab.id}"
            style="
              font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif;
              font-size: 15px;
              letter-spacing: 0.5px;
              text-transform: uppercase;
              padding: 10px 20px;
              border: none;
              border-radius: 50px;
              background-color: ${tab.id === 'recomendacion' ? 'rgb(59,35,20)' : '#f0ebe6'};
              color: ${tab.id === 'recomendacion' ? 'white' : 'rgb(80, 60, 45)'};
              cursor: pointer;
              transition: all 0.2s ease;
              font-weight: 500;
              box-shadow: ${tab.id === 'recomendacion' ? '0 4px 8px rgba(59,35,20,0.3)' : '0 1px 3px rgba(0,0,0,0.05)'};
            "
            onmouseover="if(!this.classList.contains('active')){this.style.backgroundColor='#e5ddd6';}"
            onmouseout="if(!this.classList.contains('active')){this.style.backgroundColor='#f0ebe6';}"
    >${tab.label}</button>
  `).join('');

  // Paneles: solo el de recomendacion tiene clase 'active' al inicio
  let panelsHtml = Object.keys(menuData).map(key => `
    <div id="menu-panel-${key}" class="menu-panel ${key === 'recomendacion' ? 'active' : ''}" style="display: ${key === 'recomendacion' ? 'block' : 'none'};"></div>
  `).join('');

  const menuHtml = `
    <section id="menu" style="background-color: rgb(252,248,243);" class="py-20 px-[30px]">
      <div class="ml-auto mr-auto max-w-[1020px]">
        <div class="text-center mb-12">
          <h2 class="text-center mb-3 text-[32px]" style="font-family: 'Fraunces', georgia, serif; color: rgb(59,35,20); font-weight: 700;">Nuestro Menú</h2>
          <p class="text-center text-[rgb(120,80,40)] max-w-[480px] mx-auto leading-[26px]">Ingredientes seleccionados, preparaciones artesanales y el mejor café de origen único para cada momento del día.</p>
        </div>
        <div class="menu-tabs" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-bottom: 30px;">
          ${tabsHtml}
        </div>
        <div class="menu-panels">${panelsHtml}</div>
      </div>
    </section>
  `;

  // Reservar Sala
  let roomsHtml = rooms.map(room => {
    const iconName = room.icon;
    return `
      <div class="room-card text-left rounded-sm overflow-hidden border-[1.6px]" style="border-color: rgba(194,151,106,0.25); background: rgba(255,255,255,0.03);">
        <div class="relative h-52 overflow-hidden">
          <img src="${room.image}" alt="${room.name}" class="w-full h-full object-cover" />
          <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(40,25,14,0.85) 0%, rgba(40,25,14,0.2) 60%);"></div>
          <div class="absolute bottom-0 left-0 right-0 p-5">
            <div class="flex items-center gap-2 mb-1">
              <i data-lucide="${iconName}" size="16" style="color: ${room.accent}; stroke-width: 1.5;"></i>
              <span class="text-[rgb(230,210,180)] text-[12px] uppercase tracking-[1.5px]" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif;">${room.tagline}</span>
            </div>
            <h3 class="text-white text-[24px]" style="font-family: 'Fraunces', georgia, serif; font-weight: 700;">${room.name}</h3>
          </div>
        </div>
        <div class="p-5">
          <p class="text-[rgb(228,214,196)] text-[14px] leading-[22px] mb-4">${room.description}</p>
          <div class="flex flex-col gap-2 mb-4">
            <div class="flex items-center gap-2 text-[rgb(235,222,205)] text-[13px]">
              <i data-lucide="users" size="13" stroke-width="1.5"></i>
              <span>${room.capacity}</span>
            </div>
            <div class="flex items-center gap-2 text-[rgb(235,222,205)] text-[13px]">
              <i data-lucide="clock" size="13" stroke-width="1.5"></i>
              <span>${room.hours}</span>
            </div>
          </div>
          <ul class="flex flex-wrap gap-2 mb-5">
            ${room.features.map(f => `<li class="text-[11px] px-2 py-0.5 rounded-sm" style="background: rgba(194,151,106,0.22); color: rgb(248,240,228); font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; letter-spacing: 0.3px;">${f}</li>`).join('')}
          </ul>
          <a href="${buildRoomAvailabilityLink(room.name)}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-2 w-full h-11 uppercase tracking-[0.4px] text-white text-[14px] transition-opacity hover:opacity-90" style="background: #25D366; font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; text-decoration: none; border-radius: 4px;">
            <i data-lucide="message-circle" size="16"></i>
            Consultar disponibilidad
          </a>
        </div>
      </div>
    `;
  }).join('');

  const reservarHtml = `
    <section id="reservar-sala" style="background-color: rgb(40,25,14);" class="py-20 px-[30px]">
      <div class="ml-auto mr-auto max-w-[1020px]">
        <div class="text-center mb-14">
          <p class="uppercase text-[rgb(194,151,106)] text-[13px] tracking-[2px] mb-3" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif;">Espacios Privados</p>
          <h2 class="text-white text-[36px] mb-4" style="font-family: 'Fraunces', georgia, serif; font-weight: 700;">Reservar una Sala</h2>
          <p class="text-[rgb(194,151,106)] max-w-[500px] mx-auto leading-[26px] text-[15px]">Dos espacios únicos para vivir el café de otra manera — en silencio con un buen libro o rodeado de personas que comparten tus ideas. Escríbenos por WhatsApp y te contamos la disponibilidad al instante.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">${roomsHtml}</div>
      </div>
    </section>
  `;

  const nosotrosHtml = `
    <section id="nosotros" style="background-color: rgb(252,248,243);" class="py-20 px-[30px]">
      <div class="ml-auto mr-auto max-w-[1020px] grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div class="order-2 md:order-1">
          <p class="uppercase text-[rgb(159,106,51)] text-[13px] tracking-[2px] mb-3" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif;">Sobre Nosotros</p>
          <h2 class="text-[rgb(59,35,20)] text-[32px] mb-5" style="font-family: 'Fraunces', georgia, serif; font-weight: 700;">Un café que se siente como en casa</h2>
          <p class="text-[rgb(90,65,45)] text-[15px] leading-[26px] mb-4">Nacimos en Punta Arenas con una idea simple: hacer del café de todos los días algo que realmente valga la pena. Elegimos cada grano, horneamos cada mañana y armamos un espacio donde el viento y el frío de afuera se quedan en la puerta.</p>
          <p class="text-[rgb(90,65,45)] text-[15px] leading-[26px] mb-6">Somos el lugar de barrio donde te conocen por tu nombre — aunque nos vamos a aprender tu pedido también. Ven a leer, a trabajar o simplemente a quedarte un rato.</p>
          <a href="#contacto" class="inline-flex items-center gap-2 uppercase text-[13px] tracking-[0.4px] pb-1 border-b-[1.6px]" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgb(59,35,20); border-color: rgb(159,106,51); text-decoration: none;">
            Visítanos
            <i data-lucide="arrow-right" size="14"></i>
          </a>
        </div>
        <div class="order-1 md:order-2 relative rounded-sm overflow-hidden" style="aspect-ratio: 4 / 3;">
          <img src="img/background.png" alt="Interior de Café del Bueno" class="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  `;

  const footerHtml = `
    <footer role="contentinfo" id="contacto" class="shrink-0" style="background-color: rgb(40,25,14);">
      <div class="ml-auto mr-auto max-w-[1020px] grid gap-x-12 gap-y-12 pt-20 pr-[30px] pb-14 pl-[30px]" style="grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));">
        <div>
          <h3 class="mb-1 text-[28px]" style="font-family: 'Fraunces', georgia, serif; font-weight: 700; color: white;">Café del Bueno</h3>
          <p class="uppercase mb-6 text-[11px] tracking-[2px]" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgb(159,106,51);">Café de Barrio</p>
          <div class="flex items-start gap-2 mb-3 text-[14px]" style="color: rgb(194,151,106);">
            <i data-lucide="map-pin" size="14" class="shrink-0 mt-0.5" style="color: rgb(159,106,51);"></i>
            <span>Carlos Condell 0109<br />Punta Arenas, Chile</span>
          </div>
          <div class="flex items-center gap-2 mb-6 text-[14px]" style="color: rgb(194,151,106);">
            <i data-lucide="mail" size="14" class="shrink-0" style="color: rgb(159,106,51);"></i>
            <a href="mailto:hola@cafedelbueno.cl" class="hover:text-white transition-colors duration-300">hola@cafedelbueno.cl</a>
          </div>
          <div class="flex gap-3">
            <span class="w-8 h-8 flex items-center justify-center border-[1.6px]" style="border-color: rgba(194,151,106,0.35); color: rgb(159,106,51);">
              <i data-lucide="instagram" size="14"></i>
            </span>
            <span class="w-8 h-8 flex items-center justify-center border-[1.6px]" style="border-color: rgba(194,151,106,0.35); color: rgb(159,106,51);">
              <i data-lucide="message-circle" size="14"></i>
            </span>
          </div>
        </div>
        <div>
          <p class="uppercase mb-6 flex items-center gap-2 text-[11px] tracking-[3px]" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgb(159,106,51);">
            <i data-lucide="clock" size="12"></i> Horarios
          </p>
          <div class="flex flex-col gap-3 text-[14px]">
            ${[['Lunes – Viernes','8:30 – 20:00'],['Sábado','9:00 – 20:00'],['Domingo','10:00 – 14:00'],['Festivos','Cerrado']].map(([day, time]) => `
              <div class="flex justify-between items-center gap-8 pb-2 border-b" style="border-color: rgba(194,151,106,0.2);">
                <span style="color: rgb(194,151,106);">${day}</span>
                <span style="color: white; font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif;">${time}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div>
          <p class="uppercase mb-6 text-[11px] tracking-[3px]" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgb(159,106,51);">Grupos &amp; Pedidos Especiales</p>
          <p class="mb-5 text-[14px] leading-[22px]" style="color: rgb(194,151,106);">¿Vienes con un grupo grande o quieres coordinar algo para tu empresa o evento? Escríbenos directo y lo conversamos.</p>
          <a href="tel:+56990896241" class="block mb-2 text-[14px] hover:text-[rgb(159,106,51)] transition-colors duration-300" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: white; text-decoration: none;">+56 9 9999 9999</a>
          <a href="mailto:pedidos@cafedelbueno.cl" class="text-[14px] underline underline-offset-4 hover:text-white transition-colors duration-300" style="color: rgb(194,151,106);">pedidos@cafedelbueno.cl</a>
        </div>
      </div>
      <div class="border-t" style="border-color: rgba(194,151,106,0.15);">
        <div class="ml-auto mr-auto flex flex-col md:flex-row justify-between items-center gap-3 max-w-[1020px] pt-5 pr-[30px] pb-5 pl-[30px]">
          <p class="uppercase text-center text-[10px] tracking-[2px]" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgba(194,151,106,0.5);">© 2026 Café del Bueno · Punta Arenas - Magallanes, Chile. Todos los derechos reservados.</p>
          <p class="uppercase text-center text-[10px] tracking-[2px]" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgba(194,151,106,0.35);">Hecho del bueno.</p>
        </div>
      </div>
    </footer>
  `;

  const floatingHtml = `
    <div class="fixed bottom-5 right-5 z-[250] flex flex-col items-end gap-3">
      <a href="${buildInquiryLink()}" target="_blank" rel="noopener noreferrer" class="w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105" style="background-color: #25D366; color: white; text-decoration: none;">
        <i data-lucide="message-circle" size="24"></i>
      </a>
    </div>
  `;

  return `
    <div class="flex flex-col bg-white text-[rgb(59,35,20)] leading-[24px] min-h-[679.2px]" style="font-family: 'Fraunces', georgia, serif;">
      ${headerHtml}
      ${topBarHtml}
      <main role="main" class="grow basis-0 shrink-0">
        ${heroHtml}
        ${menuHtml}
        ${reservarHtml}
        ${nosotrosHtml}
      </main>
      ${footerHtml}
      ${floatingHtml}
    </div>
  `;
}

// ============================================================
// INICIALIZACIÓN Y EVENTOS
// ============================================================
function init() {
  const root = document.getElementById('root');
  if (!root) return;

  root.innerHTML = buildMainHTML();

  // Renderizar paneles del menú (solo el activo se renderiza inicialmente)
  Object.keys(menuData).forEach(tabId => {
    renderMenuPanel(tabId);
  });

  // Crear el drawer (inicialmente oculto)
  renderDrawer();

  // Actualizar badge
  updateBadge();

  // Inicializar Lucide
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ========== MANEJO DE PESTAÑAS ==========
  document.querySelectorAll('.menu-tab').forEach(btn => {
    btn.addEventListener('click', function() {
      const tabId = this.dataset.tab;

      // Resetear todos los botones a estado inactivo
      document.querySelectorAll('.menu-tab').forEach(b => {
        b.classList.remove('active');
        b.style.backgroundColor = '#f0ebe6';
        b.style.color = 'rgb(80, 60, 45)';
        b.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
      });

      // Activar el botón clickeado
      this.classList.add('active');
      this.style.backgroundColor = 'rgb(59,35,20)';
      this.style.color = 'white';
      this.style.boxShadow = '0 4px 8px rgba(59,35,20,0.3)';

      // Ocultar todos los paneles y mostrar el correspondiente
      document.querySelectorAll('.menu-panel').forEach(p => {
        p.classList.remove('active');
        p.style.display = 'none';
      });
      const panel = document.getElementById(`menu-panel-${tabId}`);
      if (panel) {
        panel.classList.add('active');
        panel.style.display = 'block';
        renderMenuPanel(tabId); // Renderiza el contenido si no estaba renderizado
      }
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
  });

  // ========== BOTÓN DEL CARRITO EN NAVBAR ==========
  document.getElementById('navbar-cart-btn')?.addEventListener('click', function(e) {
    e.preventDefault();
    openDrawer();
  });

  // ========== EVENTOS GLOBALES PARA EL DRAWER ==========
  document.addEventListener('click', function(e) {
    const target = e.target.closest('#drawer-continue, #drawer-back, #drawer-send');
    if (!target) return;
    e.preventDefault();

    if (target.id === 'drawer-continue') {
      drawerStep = 'form';
      renderCartContent();
      updateDrawerActions();
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    if (target.id === 'drawer-back') {
      drawerStep = 'cart';
      renderCartContent();
      updateDrawerActions();
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    if (target.id === 'drawer-send') {
      const name = checkoutData.name.trim();
      const phone = checkoutData.phone.trim();
      const method = checkoutData.method;
      const address = checkoutData.address.trim();
      const notes = checkoutData.notes.trim();

      if (!name || !phone) {
        alert('Por favor, completa tu nombre y teléfono.');
        return;
      }
      if (method === 'delivery' && !address) {
        alert('Por favor, ingresa tu dirección para delivery.');
        return;
      }

      const orderInfo = { name, phone, method, address, notes };
      const message = buildOrderMessage(cartItems, totalPrice(), orderInfo);
      const url = buildWhatsAppLink(message);
      window.open(url, '_blank', 'noopener,noreferrer');
      clearCart();
      checkoutData = { name: '', phone: '', method: 'retiro', address: '', notes: '' };
      drawerStep = 'cart';
      closeDrawer();
    }
  });

  // ========== MANEJO DE AGREGAR AL CARRITO ==========
  document.addEventListener('click', function(e) {
    const target = e.target.closest('.menu-add-item');
    if (target) {
      e.preventDefault();
      const id = target.dataset.id;
      const name = target.dataset.name;
      const price = parseFloat(target.dataset.price);
      if (id && name && !isNaN(price)) {
        addItem({ id, name, price });
        // No abrir drawer, solo notificación y badge
      }
    }
  });

  // ========== MANEJO DE CANTIDADES EN EL DRAWER ==========
  document.addEventListener('click', function(e) {
    const target = e.target.closest('.cart-qty-plus, .cart-qty-minus, .cart-remove');
    if (!target) return;
    e.preventDefault();
    const id = target.dataset.id;
    if (!id) return;
    if (target.classList.contains('cart-qty-plus')) {
      const item = cartItems.find(i => i.id === id);
      if (item) updateQty(id, item.qty + 1);
    } else if (target.classList.contains('cart-qty-minus')) {
      const item = cartItems.find(i => i.id === id);
      if (item) updateQty(id, item.qty - 1);
    } else if (target.classList.contains('cart-remove')) {
      removeItem(id);
    }
    if (isCartOpen) {
      renderCartContent();
      updateTotal();
    }
    updateBadge();
  });

  // ========== CERRAR DRAWER CON ESCAPE ==========
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isCartOpen) {
      closeDrawer();
    }
  });

  // Renderizar menú inicial (recomendación)
  renderMenuPanel('recomendacion');
}

// ============================================================
// RENDERIZA UN PANEL DEL MENÚ
// ============================================================
function renderMenuPanel(tabId) {
  const panel = document.getElementById(`menu-panel-${tabId}`);
  if (!panel) return;
  // Si ya tiene contenido, no lo re-renderizamos para evitar parpadeos
  if (panel.children.length > 0) return;

  const items = menuData[tabId] || [];
  let html = `<div class="grid grid-cols-1 gap-4" style="grid-template-columns: repeat(auto-fill, minmax(440px, 1fr));">`;
  items.forEach(item => {
    const tagClass = item.tag ? tagClassMap[item.tag] || '' : '';
    const tagHtml = item.tag ? `<span class="tag ${tagClass} shrink-0" style="display: inline-block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; padding: 0.125rem 0.5rem; border-radius: 2px; font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; background: ${tagClass.includes('favorito') ? 'rgb(159,106,51)' : tagClass.includes('chef') ? 'rgb(59,35,20)' : tagClass.includes('especial') ? 'rgb(194,151,106)' : tagClass.includes('postre') ? 'rgb(232,220,200)' : 'rgb(100,140,80)'}; color: ${tagClass.includes('especial') ? 'rgb(59,35,20)' : tagClass.includes('postre') ? 'rgb(59,35,20)' : 'white'};">${item.tag}</span>` : '';
    const id = slugify(`menu-${item.name}`);
    const iconName = getMenuItemIcon(item);
    html += `
      <div class="flex items-start justify-between gap-4 bg-white rounded-sm p-5 shadow-sm border border-[rgb(235,220,200)] hover:shadow-md transition-shadow duration-200">
        <div class="flex items-start gap-3 flex-1 min-w-0">
          <span class="shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style="background: rgb(159,106,51);">
            <i data-lucide="${iconName}" size="18" style="color: white;"></i>
          </span>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <h3 class="text-[rgb(59,35,20)] text-[18px]" style="font-family: 'Fraunces', georgia, serif; font-weight: 700;">${item.name}</h3>
              ${tagHtml}
            </div>
            <p class="text-[rgb(140,100,60)] text-[14px] leading-[22px]">${item.description}</p>
          </div>
        </div>
        <div class="flex flex-col items-end gap-2 shrink-0">
          <span class="text-[rgb(159,106,51)] text-[18px] mt-0.5" style="font-family: 'Fraunces', georgia, serif; font-weight: 700;">${item.price}</span>
          <button class="menu-add-item flex items-center gap-1 text-[11px] uppercase tracking-[0.5px] text-[rgb(140,100,60)] hover:text-[rgb(159,106,51)] transition-colors duration-200" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; background: none; border: none; cursor: pointer;" data-id="${id}" data-name="${item.name}" data-price="${parsePrice(item.price)}">
            <i data-lucide="plus" class="w-3 h-3"></i>
            Agregar
          </button>
        </div>
      </div>
    `;
  });
  html += `</div>`;
  panel.innerHTML = html;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);