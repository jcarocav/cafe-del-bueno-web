// ============================================================
// CONFIGURACIÓN
// ============================================================
const WHATSAPP_NUMBER = "56961348234";
const CAFE_NAME = "CAFÉ DEL BUENO";

// ============================================================
// UTILIDADES
// ============================================================
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
  const t = `${item.name} ${item.description || ''}`.toLowerCase();
  if (t.includes('chai') || t.includes('té') || t.includes('infusion')) return 'leaf';
  if (t.includes('plátano') || t.includes('platano') || t.includes('amor del bueno')) return 'cup-soda';
  if (t.includes('agua mineral') || t.includes('bebidas') || t.includes('jugo') || t.includes('pulpa')) return 'cup-soda';
  if (t.includes('syrup') || t.includes('leche vegetal') || t.includes('leche sin lactosa')) return 'droplet';
  if (t.includes('tostada') || t.includes('tapadito') || t.includes('palta')) return 'sandwich';
  if (
    t.includes('torta') || t.includes('kuchen') || t.includes('pie') || t.includes('medialuna') ||
    t.includes('rollito') || t.includes('galleta')
  ) return 'cake';
  return 'coffee';
}

// ============================================================
// DATOS DEL MENÚ — Página 1 y Página 2 (carta real del local)
// ============================================================
const menuPages = {
  pagina1: {
    label: 'Página 1',
    sections: [
      {
        title: 'Bebidas Calientes',
        items: [
          { name: 'Espresso', description: 'Intenso y concentrado. 25 - 30 ml', price: '$2.000' },
          { name: 'Espresso Doble', description: 'Intenso y concentrado. 50 - 60 ml', price: '$2.500' },
          { name: 'Cappuccino', description: 'Espresso suave y cremoso, coronado con una capa de espuma de leche ligera', price: '$3.500' },
          { name: 'Flat White', description: 'Espresso fuerte con leche vaporizada y una fina capa de espuma', price: '$3.600' },
          { name: 'Latte', description: 'Espresso suave con leche vaporizada y una ligera capa de espuma, una delicia equilibrada', price: '$3.800' },
          { name: 'Latte Pistacho', description: 'Base de crema de pistacho, leche vaporizada, espresso suave, una ligera capa de espuma y finaliza con pistacho molido en superficie', price: '$4.700' },
          { name: 'Mocaccino', description: 'Espresso con chocolate y leche vaporizada', price: '$3.900' },
          { name: 'Americano', description: 'Espresso diluido con agua caliente, para un sabor suave pero robusto', price: '$3.000' },
          { name: 'Cortado', description: 'Espresso con una pequeña cantidad de leche caliente', price: '$3.200' },
          { name: 'Macchiato', description: 'Espresso con una pequeña cantidad de leche espumada', price: '$2.900' },
          { name: 'Café Bombón', description: 'Espresso endulzado con leche condensada', price: '$3.900' },
          { name: 'Chai Latte', description: '', price: '$3.800' },
          { name: 'Chocolate Caliente', description: '', price: '$4.500' },
          { name: 'Café Instantáneo', description: '', price: '$2.000' },
          { name: 'Café Instantáneo con Leche', description: '', price: '$2.500' },
          { name: 'Té Negro', description: '', price: '$2.600' },
          { name: 'Té Negro con Leche', description: '', price: '$3.200' },
          { name: 'Infusiones Artesanales', description: 'Cinnamon Apple, Green Cucumber, Green Ginger, Black Orange, Purple Winter, Black Chai', price: '$2.600' },
        ],
      },
      {
        title: 'Bebidas Frías',
        items: [
          { name: 'Affogato', description: 'Helado de vainilla con espresso de especialidad', price: '$4.500' },
          { name: 'Café Helado', description: '', price: '$5.500' },
          { name: 'Ice Chai Latte', description: '', price: '$4.200' },
          { name: 'Leche con Plátano', description: '', price: '$3.800' },
          { name: 'Amor del Bueno', description: 'Batido de frutilla, coronado con crema y salsa de chocolate', price: '$4.500' },
        ],
      },
      {
        title: 'Adicionales',
        items: [
          { name: 'Syrup Shot', description: '', price: '$600' },
          { name: 'Leche Vegetal', description: '', price: '$500' },
          { name: 'Leche sin Lactosa', description: '', price: '$300' },
        ],
      },
    ],
  },
  pagina2: {
    label: 'Página 2',
    sections: [
      {
        title: 'Dulces',
        items: [
          { name: 'Tortas "Del Bueno"', description: 'Consultar opciones del día', price: '$4.900' },
          { name: 'Kuchen o Pie "Del Bueno"', description: 'Consultar opciones del día', price: '$3.900' },
          { name: 'Medialuna', description: 'Medialuna sola o con crema pastelera', price: '$1.900' },
          { name: 'Rollitos de Canela', description: '', price: '$4.000' },
          { name: 'Surtido de Galletas', description: '', price: '$4.800' },
        ],
      },
      {
        title: 'Salados',
        items: [
          { name: 'Tostadas 1 (Palta)', description: '2 tostadas en pan de molde con palta', price: '$4.900' },
          { name: 'Tostadas 2 (Mant/Merm)', description: '2 tostadas en pan de molde con mantequilla o mermelada', price: '$3.900' },
          { name: 'Tapaditos', description: 'Sellado en pan de molde o pan pita con jamón y queso', price: '$4.200' },
          { name: 'Agregado Palta', description: '', price: '$900' },
        ],
      },
      {
        title: 'Bebidas',
        items: [
          { name: 'Agua Mineral con Gas', description: '', price: '$1.200' },
          { name: 'Agua Mineral sin Gas', description: '', price: '$1.200' },
          { name: 'Bebidas', description: '', price: '$1.500' },
          { name: 'Jugos (Botella)', description: '', price: '$1.800' },
          { name: 'Pulpa', description: '', price: '$3.900' },
        ],
      },
    ],
  },
};

// ============================================================
// DATOS DE SALAS
// ============================================================
const rooms = [
  {
    id: 'eventos',
    name: 'Salas Multi Eventos',
    tagline: 'Tu espacio, tus ideas',
    description: 'Contamos con 2 salas versátiles para reuniones, talleres, presentaciones, lanzamientos o celebraciones privadas. Perfecta para cada ocasión.',
    icon: 'users',
    capacity: 'Hasta 30 personas',
    hours: 'Disponible con reservación previa',
    features: ['Sólo con reservación', 'Servicio de café incluido', 'Configuración flexible'],
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
    accent: 'rgb(59,35,14)',
  }
];

// ============================================================
// CONSTRUCCIÓN DEL HTML PRINCIPAL
// ============================================================
function buildMainHTML() {
  // Header fijo
  const headerHtml = `
    <header role="banner" id="top" class="fixed top-0 left-0 right-0 h-16 md:h-20 bg-white border-b z-[200] flex items-center justify-between px-4 md:px-6" style="border-bottom-color: rgb(232,232,232);">
      <nav aria-label="Main Navigation" role="navigation" class="nav-desktop flex items-center gap-6">
        <a href="#menu" class="uppercase text-sm tracking-[0.4px]" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgb(59,35,20); text-decoration: none;">Menú</a>
        <a href="#reservar-sala" class="uppercase text-sm tracking-[0.4px]" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgb(59,35,20); text-decoration: none;">Reservar Sala</a>
        <a href="#nosotros" class="uppercase text-sm tracking-[0.4px]" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgb(59,35,20); text-decoration: none;">Nosotros</a>
      </nav>

      <button id="nav-toggle-btn" class="nav-toggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="mobile-nav">
        <i data-lucide="menu" size="22" style="color: rgb(59,35,20);"></i>
      </button>

      <a href="#top" class="flex items-center gap-2 md:gap-2.5" style="text-decoration: none;">
        <img src="img/logo-navbar.png" alt="CAFÉ DEL BUENO" class="w-9 h-9 md:w-11 md:h-11 rounded-full object-cover" style="border: 1.6px solid rgb(159,106,51);" />
        <span class="brand-name text-lg md:text-xl font-bold" style="font-family: 'Fraunces', georgia, serif; color: rgb(59,35,20);">CAFÉ DEL BUENO</span>
      </a>

      <div class="flex items-center gap-6">
        <a href="#contacto" class="nav-desktop uppercase text-sm tracking-[0.4px]" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgb(59,35,20); text-decoration: none;">Ubicación</a>
      </div>
    </header>

    <div id="mobile-nav" role="navigation" aria-label="Menú móvil">
      <a href="#menu" class="mobile-nav-link">Menú</a>
      <a href="#reservar-sala" class="mobile-nav-link">Reservar Sala</a>
      <a href="#nosotros" class="mobile-nav-link">Nosotros</a>
      <a href="#contacto" class="mobile-nav-link">Ubicación</a>
    </div>
    <div id="mobile-nav-overlay"></div>
  `;

  const topBarHtml = `
    <div class="bg-[rgb(40,25,14)] z-[99]">
      <div class="ml-auto mr-auto text-center text-white max-w-[1020px] py-2 px-[30px]">
        <p class="text-center text-[14px] leading-[21px]">☕ Primera cafetería en el Barrio Prat de Punta Arenas — consultas y pedidos directo por WhatsApp.</p>
      </div>
    </div>
  `;

  const heroHtml = `
    <div class="relative mb-[60px] md:mb-[100px] bg-[rgb(48,48,48)] text-white min-h-[480px] md:min-h-[600px]">
      <div class="absolute left-0 top-0 right-0 bottom-0 z-[1]" style="background-image: linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0) 68%);"></div>
      <img src="img/fondo.png" alt="CAFÉ DEL BUENO — interior del local en Punta Arenas" class="block size-full max-w-full object-cover overflow-clip absolute left-0 top-0 right-0 bottom-0 aspect-[auto_1200_/_600]" />
      <div class="relative pt-14 pr-5 pb-14 pl-5 md:pt-20 md:pr-[30px] md:pb-20 md:pl-[30px] z-[2]">
        <div class="text-left max-w-[420px]">
          <h1 class="font-bold text-left uppercase text-[30px] leading-[34px] md:text-[38px] md:leading-[42px]" style="text-shadow: rgb(0,0,0) 0px 0px 15px;">Pide del bueno.<br />Conoce el lugar.</h1>
          <div class="text-left">
            <p class="text-left mt-[16px] md:mt-[20px] text-[15px] md:text-[17px] leading-[24px] md:leading-[26px] max-w-[380px]" style="text-shadow: rgb(0,0,0) 0px 0px 15px;">Café de especialidad, pastelería casera y el rincón de barrio favorito de Punta Arenas.</p>
          </div>
          <div class="flex flex-wrap items-center gap-3 md:gap-4 mt-[20px] md:mt-[24px]">
            <a href="#menu" class="inline-block text-center uppercase align-middle whitespace-nowrap h-11 md:h-12 bg-[rgb(159,106,51)] tracking-[0.4px] leading-[42px] md:leading-[46px] min-w-[110px] md:min-w-[120px] pt-[1.6px] pr-4 pb-0 pl-4" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; text-decoration: none; color: white;">Menú</a>
            <a href="#reservar-sala" class="inline-block text-center uppercase align-middle whitespace-nowrap h-11 md:h-12 border-[1.6px] border-white text-white tracking-[0.4px] leading-[38px] md:leading-[46px] min-w-[110px] md:min-w-[120px] pt-[1.6px] pr-4 pb-0 pl-4" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; text-decoration: none;">Reservar Sala</a>
          </div>
        </div>
      </div>
    </div>
  `;

  // ===== PESTAÑAS DE PÁGINA DEL MENÚ =====
  const pageIds = Object.keys(menuPages);
  const tabsHtml = pageIds.map(pageId => `
    <button class="menu-tab ${pageId === pageIds[0] ? 'active' : ''}"
            data-tab="${pageId}"
            style="
              font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif;
              font-size: 15px;
              letter-spacing: 0.5px;
              text-transform: uppercase;
              padding: 10px 28px;
              border: none;
              border-radius: 50px;
              background-color: ${pageId === pageIds[0] ? 'rgb(59,35,20)' : '#f0ebe6'};
              color: ${pageId === pageIds[0] ? 'white' : 'rgb(80, 60, 45)'};
              cursor: pointer;
              transition: all 0.2s ease;
              font-weight: 500;
              box-shadow: ${pageId === pageIds[0] ? '0 4px 8px rgba(59,35,20,0.3)' : '0 1px 3px rgba(0,0,0,0.05)'};
            "
            onmouseover="if(!this.classList.contains('active')){this.style.backgroundColor='#e5ddd6';}"
            onmouseout="if(!this.classList.contains('active')){this.style.backgroundColor='#f0ebe6';}"
    >${menuPages[pageId].label}</button>
  `).join('');

  // Paneles: solo el primero tiene clase 'active' al inicio
  let panelsHtml = pageIds.map(pageId => `
    <div id="menu-panel-${pageId}" class="menu-panel ${pageId === pageIds[0] ? 'active' : ''}" style="display: ${pageId === pageIds[0] ? 'block' : 'none'};"></div>
  `).join('');

  const menuHtml = `
    <section id="menu" style="background-color: rgb(252,248,243);" class="py-14 px-5 md:py-20 md:px-[30px]">
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
          <a href="${buildRoomAvailabilityLink(room.name)}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-2 w-full h-11 uppercase tracking-[0.4px] text-white text-[14px] transition-opacity hover:opacity-90" style="background: #25D366; font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; text-decoration: none;">
            <i data-lucide="message-circle" size="16"></i>
            Consultar disponibilidad
          </a>
        </div>
      </div>
    `;
  }).join('');

  const reservarHtml = `
    <section id="reservar-sala" class="relative overflow-hidden py-14 px-5 md:py-20 md:px-[30px]" style="background-color: rgb(40,25,14);">
      <div class="absolute inset-0" style="background-image: url('img/background.png'); background-repeat: repeat; background-size: 480px auto; opacity: 0.14;"></div>
      <div class="relative z-[1] ml-auto mr-auto max-w-[1020px]">
        <div class="text-center mb-14">
          <p class="uppercase text-[rgb(194,151,106)] text-[13px] tracking-[2px] mb-3" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif;">Espacio Privado</p>
          <h2 class="text-white text-[36px] mb-4" style="font-family: 'Fraunces', georgia, serif; font-weight: 700;">Reservar una Sala</h2>
          <p class="text-[rgb(194,151,106)] max-w-[500px] mx-auto leading-[26px] text-[15px]">Un espacio versátil para vivir el café de otra manera, rodeado de personas que comparten tus ideas. Escríbenos por WhatsApp y te contamos la disponibilidad al instante.</p>
        </div>
        <div class="grid grid-cols-1 max-w-[440px] mx-auto">
          ${roomsHtml}
        </div>
      </div>
    </section>
  `;

  const nosotrosHtml = `
    <section id="nosotros" style="background-color: rgb(252,248,243);" class="py-14 px-5 md:py-20 md:px-[30px]">
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
          <img src="img/cafe.jpg" alt="Interior de CAFÉ DEL BUENO" class="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  `;

  const reseñasHtml = `
    <section id="resenas" class="relative overflow-hidden py-14 px-5 md:py-20 md:px-[30px]" style="background-color: rgb(40,25,14);">
      <img src="img/cafetera3.jpg" alt="" aria-hidden="true" class="absolute inset-0 w-full h-full object-cover" style="filter: blur(6px); transform: scale(1.1);" />
      <div class="absolute inset-0" style="background: rgba(20,13,7,0.72);"></div>
      <div class="relative z-[1] ml-auto mr-auto max-w-[1020px]">
        <div class="text-center mb-3">
          <p class="uppercase text-[rgb(230,210,180)] text-[13px] tracking-[2px] mb-3" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif;">Lo Que Dicen Nuestros Clientes</p>
          <h2 class="text-white text-[32px] mb-3" style="font-family: 'Fraunces', georgia, serif; font-weight: 700;">Reseñas</h2>
        </div>
        <p class="text-center text-[rgb(225,210,195)] text-[13px] italic mb-10 max-w-[520px] mx-auto">Esto es lo que dicen quienes ya probaron un CAFÉ DEL BUENO.</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${[
            { name: 'Claudia Leiva', text: 'Es un Café muy tranquilo en el centro de un barrio antiguo de la ciudad , si vienes en auto encuentras estacionamiento cerca, sin costo extra.' },
            { name: 'Eduardo Velasquez', text: 'Disfrutamos mucho del lugar, tiene un espacio para leer que está muy cómodo, su café está exquisito, tienen té artesanales y la pastelería recomiendo la tortas de casa, ubicado en bello e historico Barrio Prat! Volveremos Cafe del bueno' },
            { name: 'Tamara Puente Pérez', text: 'Le hace honor a su nombre, probamos muchos cafés en Punta Arenas, nada como este, pan de masa madre, pasteles excelentes, se nota que todo está realizado con amor, por eso dejo mi reseña.' },
          ].map(r => `
            <div class="review-card bg-white rounded-sm p-6 border border-[rgb(230,220,205)]">
              <div class="flex gap-0.5 mb-3" style="color: rgb(159,106,51);">
                ${Array(5).fill('<i data-lucide="star" size="14" fill="currentColor"></i>').join('')}
              </div>
              <p class="text-[rgb(80,60,45)] text-[14px] leading-[22px] mb-4">"${r.text}"</p>
              <p class="text-[rgb(59,35,20)] text-[13px]" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 500;">${r.name}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;

  const footerHtml = `
    <footer role="contentinfo" id="contacto" class="shrink-0" style="background-color: rgb(40,25,14);">
      <div class="ml-auto mr-auto max-w-[1020px] grid gap-x-12 gap-y-10 md:gap-y-12 pt-14 pr-5 pb-10 pl-5 md:pt-20 md:pr-[30px] md:pb-14 md:pl-[30px]" style="grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));">
        <div>
          <h3 class="mb-1 text-[28px]" style="font-family: 'Fraunces', georgia, serif; font-weight: 700; color: white;">CAFÉ DEL BUENO</h3>
          <p class="uppercase mb-6 text-[11px] tracking-[2px]" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgb(159,106,51);">Café de Barrio</p>
          <div class="flex items-start gap-2 mb-3 text-[14px]" style="color: rgb(194,151,106);">
            <i data-lucide="map-pin" size="14" class="shrink-0 mt-0.5" style="color: rgb(159,106,51);"></i>
            <span>Carlos Condell 0109<br />Punta Arenas, Chile</span>
          </div>
          <div class="flex items-center gap-2 mb-6 text-[14px]" style="color: rgb(194,151,106);">
            <i data-lucide="mail" size="14" class="shrink-0" style="color: rgb(159,106,51);"></i>
            <a href="mailto:cafedelbueno.cl@gmail.com" class="hover:text-white transition-colors duration-300">cafedelbueno.cl@gmail.com</a>
          </div>
          <div class="flex gap-3">
            <a href="https://www.instagram.com/cafedelbueno.cl" target="_blank" rel="noopener noreferrer" aria-label="Instagram de CAFÉ DEL BUENO" class="social-btn w-8 h-8 flex items-center justify-center border-[1.6px]" style="border-color: rgba(194,151,106,0.35); color: rgb(159,106,51);">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://www.facebook.com/p/Caf%C3%A9-Del-Bueno-61581862460295/" target="_blank" rel="noopener noreferrer" aria-label="Facebook de CAFÉ DEL BUENO" class="social-btn w-8 h-8 flex items-center justify-center border-[1.6px]" style="border-color: rgba(194,151,106,0.35); color: rgb(159,106,51);">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
          </div>
        </div>
        <div>
          <p class="uppercase mb-6 flex items-center gap-2 text-[11px] tracking-[3px]" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgb(159,106,51);">
            <i data-lucide="clock" size="12"></i> Horarios
          </p>
          <div class="flex flex-col gap-3 text-[14px]">
            ${[['Lunes – Sábado','14:30 – 20:30'],['Domingo y feriados','Cerrado']].map(([day, time]) => `
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
          <a href="tel:+56961348234" class="block mb-2 text-[14px] hover:text-[rgb(159,106,51)] transition-colors duration-300" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: white; text-decoration: none;">+56 9 6134 8234</a>
          <a href="mailto:cafedelbueno.cl@gmail.com" class="text-[14px] underline underline-offset-4 hover:text-white transition-colors duration-300" style="color: rgb(194,151,106);">cafedelbueno.cl@gmail.com</a>
        </div>
      </div>
      <div class="border-t" style="border-color: rgba(194,151,106,0.15);">
        <div class="ml-auto mr-auto flex flex-col md:flex-row justify-between items-center gap-3 max-w-[1020px] pt-5 pr-[30px] pb-5 pl-[30px]">
          <p class="uppercase text-center text-[10px] tracking-[2px]" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgba(194,151,106,0.5);">© 2026 CAFÉ DEL BUENO · Punta Arenas - Magallanes, Chile. Todos los derechos reservados.</p>
          <p class="uppercase text-center text-[10px] tracking-[2px]" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgba(194,151,106,0.35);">Hecho del bueno.</p>
        </div>
      </div>
    </footer>
  `;

  const floatingHtml = `
    <div class="fixed bottom-5 right-5 z-[250] flex flex-col items-end gap-3">
      <a href="${buildInquiryLink()}" target="_blank" rel="noopener noreferrer" class="w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105" style="background-color: #25D366; color: white; text-decoration: none;" aria-label="Consultas por WhatsApp">
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
        ${reseñasHtml}
      </main>
      ${footerHtml}
      ${floatingHtml}
    </div>
  `;
}

// ============================================================
// RENDERIZA UN PANEL DEL MENÚ (una página completa, con secciones)
// ============================================================
function renderMenuPanel(pageId) {
  const panel = document.getElementById(`menu-panel-${pageId}`);
  if (!panel) return;
  // Si ya tiene contenido, no lo re-renderizamos para evitar parpadeos
  if (panel.children.length > 0) return;

  const page = menuPages[pageId];
  if (!page) return;

  let html = '';
  page.sections.forEach(section => {
    if (section.title) {
      html += `<h3 class="text-[rgb(159,106,51)] text-[20px] mb-4 mt-2" style="font-family: 'Fraunces', georgia, serif; font-weight: 700;">${section.title}</h3>`;
    }
    html += `<div class="grid grid-cols-1 gap-4 mb-8" style="grid-template-columns: repeat(auto-fill, minmax(min(440px, 100%), 1fr));">`;
    section.items.forEach(item => {
      const iconName = getMenuItemIcon(item);
      html += `
        <div class="flex items-start justify-between gap-4 bg-white rounded-sm p-5 shadow-sm border border-[rgb(235,220,200)] hover:shadow-md transition-shadow duration-200">
          <div class="flex items-start gap-3 flex-1 min-w-0">
            <span class="shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style="background: rgb(159,106,51);">
              <i data-lucide="${iconName}" size="18" style="color: white;"></i>
            </span>
            <div class="flex-1 min-w-0">
              <h4 class="text-[rgb(59,35,20)] text-[17px]" style="font-family: 'Fraunces', georgia, serif; font-weight: 700;">${item.name}</h4>
              ${item.description ? `<p class="text-[rgb(140,100,60)] text-[14px] leading-[22px] mt-0.5">${item.description}</p>` : ''}
            </div>
          </div>
          <span class="text-[rgb(159,106,51)] text-[18px] mt-0.5 shrink-0" style="font-family: 'Fraunces', georgia, serif; font-weight: 700;">${item.price}</span>
        </div>
      `;
    });
    html += `</div>`;
  });

  panel.innerHTML = html;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// ============================================================
// INICIALIZACIÓN Y EVENTOS
// ============================================================
function init() {
  const root = document.getElementById('root');
  if (!root) return;

  root.innerHTML = buildMainHTML();

  // Renderizar todas las páginas del menú
  Object.keys(menuPages).forEach(pageId => {
    renderMenuPanel(pageId);
  });

  // Inicializar Lucide
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ========== MANEJO DE PESTAÑAS DEL MENÚ ==========
  document.querySelectorAll('.menu-tab').forEach(btn => {
    btn.addEventListener('click', function() {
      const tabId = this.dataset.tab;

      document.querySelectorAll('.menu-tab').forEach(b => {
        b.classList.remove('active');
        b.style.backgroundColor = '#f0ebe6';
        b.style.color = 'rgb(80, 60, 45)';
        b.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
      });

      this.classList.add('active');
      this.style.backgroundColor = 'rgb(59,35,20)';
      this.style.color = 'white';
      this.style.boxShadow = '0 4px 8px rgba(59,35,20,0.3)';

      document.querySelectorAll('.menu-panel').forEach(p => {
        p.classList.remove('active');
        p.style.display = 'none';
      });
      const panel = document.getElementById(`menu-panel-${tabId}`);
      if (panel) {
        panel.classList.add('active');
        panel.style.display = 'block';
        renderMenuPanel(tabId);
      }
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
  });

  // ========== MENÚ MÓVIL (HAMBURGUESA) ==========
  const navToggleBtn = document.getElementById('nav-toggle-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');

  function openMobileNav() {
    mobileNav?.classList.add('open');
    mobileNavOverlay?.classList.add('open');
    navToggleBtn?.setAttribute('aria-expanded', 'true');
  }
  function closeMobileNav() {
    mobileNav?.classList.remove('open');
    mobileNavOverlay?.classList.remove('open');
    navToggleBtn?.setAttribute('aria-expanded', 'false');
  }

  navToggleBtn?.addEventListener('click', function(e) {
    e.preventDefault();
    if (mobileNav?.classList.contains('open')) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });
  mobileNavOverlay?.addEventListener('click', closeMobileNav);
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // ========== CERRAR MENÚ MÓVIL CON ESCAPE ==========
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeMobileNav();
    }
  });
}

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);
