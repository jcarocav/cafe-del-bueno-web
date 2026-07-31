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

// ============================================================
// DATOS DEL MENÚ — carta real del local (referencia interna con precios,
// ya no se muestra en la web; se usa el PDF + fotos destacadas en su lugar)
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
// MENÚ EN LA WEB — solo fotos + nombre, sin precios (el detalle
// completo con precios va en el PDF descargable)
// ============================================================
const MENU_PDF_URL = 'menu-cafe-del-bueno.pdf'; // TODO: reemplazar por el archivo/link real del menú en PDF

const menuHighlights = [
  { name: 'Latte Pistacho', image: 'img/menu/pistachos.jpg' },
  { name: 'Cappuccino', image: 'img/menu/cafe3.jpg' },
  { name: 'Affogato', image: 'img/menu/cafe4.jpg' },
  { name: 'Amor del Bueno', image: 'img/menu/cafecrema.jpg' },
  { name: 'Tortas "Del Bueno"', image: 'img/menu/cappuccino.jpg' },
  { name: 'Tapaditos', image: 'img/menu/chocolate-caliente.jpeg' },
  { name: 'Affogato', image: 'img/menu/galletas.jpg' },
  { name: 'Amor del Bueno', image: 'img/menu/pistacho.jpeg' },
  { name: 'Tortas "Del Bueno"', image: 'img/menu/torta1.jpg' },
  { name: 'Tapaditos', image: 'img/menu/amor-del-bueno.jpeg' },
]; // TODO: reemplazar cada "image" por la foto real de la preparación

// ============================================================
// FOTOS EN LOOP (cuadros que van rotando fotos automáticamente,
// usados en Nosotros y en Reservar Sala)
// ============================================================
const nosotrosGalleryImages = [
  'img/nosotros/nosotros-1.jpg',
  'img/nosotros/nosotros-2.jpg',
  'img/nosotros/nosotros-3.png',
]; // TODO: agregar las 2 fotos que faltan (dejé cafe.jpg como la primera)

const salaReunionesGalleryImages = [
  'img/s.reu/reu1.jpg',
  'img/s.reu/reu2.jpg',
  'img/s.reu/reu3.jpg',
]; // TODO: reemplazar por los nombres reales de las fotos de la Sala de Reuniones

const salaEnsayoGalleryImages = [
  'img/reserva/sala-reuniones-8.jpg',
  'img/reserva/sala-reuniones-2.jpg',
  'img/reserva/sala-reuniones-3.jpg',
  'img/reserva/sala-reuniones-4.jpg',
  'img/reserva/sala-reuniones-5.jpg',
  'img/reserva/sala-reuniones-6.jpg',,
  'img/reserva/sala-reuniones-1.jpg',
]; // TODO: reemplazar por los nombres reales de las fotos de la Sala de Ensayo

const salaLecturaGalleryImages = [
  'img/lectura/lectura-1.jpg',
  'img/lectura/lectura-2.jpg',
  'img/lectura/lectura-3.jpg',
  'img/lectura/lectura-4.jpg',
]; // TODO: reemplazar por los nombres reales de las 2 fotos de la Sala de Lectura

// Arma un cuadro de foto (mismo tamaño/estilo que Nosotros y Sala de Lectura)
// que va rotando entre varias imágenes automáticamente
function buildPhotoLoopHtml(id, images, altBase) {
  const imgsHtml = images.map((src, i) => `
    <img src="${src}" alt="${altBase}" class="photo-loop-img${i === 0 ? ' active' : ''}" />
  `).join('');
  return `
    <div id="${id}" class="photo-loop relative rounded-sm overflow-hidden" style="aspect-ratio: 4 / 3;">
      ${imgsHtml}
    </div>
  `;
}

// ============================================================
// DATOS DE SALAS
// ============================================================
const rooms = [
  {
    id: 'reuniones',
    name: 'Sala de Reuniones',
    tagline: 'Tu espacio, tus ideas',
    description: 'Un espacio ideal para reuniones, cumpleaños, baby shower, talleres, etc. con la comodidad de un buen café.',
    icon: 'users',
    capacity: 'Hasta 15 personas', // TODO: confirmar capacidad real con la dueña
    hours: 'Disponible con reservación previa',
    features: ['Sólo con reservación', 'Servicio de café incluido'],
    gallery: salaReunionesGalleryImages,
    accent: 'rgb(59,35,14)',
  },
  {
    id: 'ensayo',
    name: 'Sala de Ensayo',
    tagline: 'Espacio para crear',
    description: 'Un espacio ideal para actividades artísticas-culturales, como baile, canto, obras de teatro,exposiciones, talleres, etc. Contáctanos y coordinamos tu horario.',
    icon: 'music',
    capacity: '30 - 40 personas', // TODO: confirmar capacidad real con la dueña
    hours: 'Disponible con reservación previa',
    features: ['Sólo con reservación', 'Configuración flexible'],
    gallery: salaEnsayoGalleryImages,
    accent: 'rgb(59,35,14)',
  },
];

// ============================================================
// CONSTRUCCIÓN DEL HTML PRINCIPAL
// ============================================================
function buildMainHTML() {
  // Header fijo
  const headerHtml = `
    <header role="banner" id="top" class="fixed top-0 left-0 right-0 h-20 bg-white border-b z-[200] flex items-center justify-between px-4 md:px-6" style="border-bottom-color: rgb(232,232,232);">
      <nav aria-label="Main Navigation" role="navigation" class="nav-desktop flex items-center gap-6">
        <a href="#menu" class="uppercase text-sm tracking-[0.4px]" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgb(59,35,20); text-decoration: none;">Menú</a>
        <a href="#reservar-sala" class="uppercase text-sm tracking-[0.4px]" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgb(59,35,20); text-decoration: none;">Reservar Sala</a>
        <a href="#nosotros" class="uppercase text-sm tracking-[0.4px]" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgb(59,35,20); text-decoration: none;">Nosotros</a>
        <a href="#sala-lectura" class="uppercase text-sm tracking-[0.4px]" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgb(59,35,20); text-decoration: none;">Sala de Lectura</a>
      </nav>

      <button id="nav-toggle-btn" class="nav-toggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="mobile-nav">
        <i data-lucide="menu" size="22" style="color: rgb(59,35,20);"></i>
      </button>

      <a href="#top" class="flex items-center gap-2 md:gap-2.5" style="text-decoration: none; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);">
        <img src="img/logo.svg" alt="CAFÉ DEL BUENO" class="navbar-logo object-contain" />
      </a>

      <div class="flex items-center gap-6">
        <a href="#contacto" class="nav-desktop uppercase text-sm tracking-[0.4px]" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgb(59,35,20); text-decoration: none;">Ubicación</a>
      </div>
    </header>

    <div id="mobile-nav" role="navigation" aria-label="Menú móvil">
      <a href="#menu" class="mobile-nav-link">Menú</a>
      <a href="#reservar-sala" class="mobile-nav-link">Reservar Sala</a>
      <a href="#nosotros" class="mobile-nav-link">Nosotros</a>
      <a href="#sala-lectura" class="mobile-nav-link">Sala de Lectura</a>
      <a href="#contacto" class="mobile-nav-link">Ubicación</a>
    </div>
    <div id="mobile-nav-overlay"></div>
  `;

  const topBarHtml = `
    <div class="bg-[rgb(40,25,14)] z-[99]">
      <div class="ml-auto mr-auto text-center text-white max-w-[1020px] py-2 px-[30px]">
        <p class="text-center text-[17px] md:text-[18px] leading-[24px]">Primera cafetería en Barrio Prat - Punta Arenas.</p>
      </div>
    </div>
  `;

  const heroHtml = `
    <div class="relative mb-[60px] md:mb-[100px] bg-[rgb(48,48,48)] text-white min-h-[480px] md:min-h-[600px]">
      <div class="absolute left-0 top-0 right-0 bottom-0 z-[1]" style="background-image: linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.72) 28%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0) 58%);"></div>
      <img src="img/frontis.jpg" alt="CAFÉ DEL BUENO — interior del local en Punta Arenas" class="block size-full max-w-full object-cover overflow-clip absolute left-0 top-0 right-0 bottom-0 aspect-[auto_1200_/_600]" />
      <div class="relative pt-14 pr-5 pb-14 pl-5 md:pt-20 md:pr-[30px] md:pb-20 md:pl-[30px] z-[2]">
        <div class="text-left max-w-[460px]">
          <h1 class="font-bold text-left uppercase text-[30px] leading-[34px] md:text-[38px] md:leading-[42px]" style="text-shadow: rgb(0,0,0) 0px 0px 15px;">El arte del café,<br />servido con calidez.</h1>
          <div class="text-left">
            <p class="text-left mt-[16px] md:mt-[20px] text-[16px] md:text-[18px] leading-[24px] md:leading-[26px] max-w-[420px]" style="text-shadow: rgb(0,0,0) 0px 0px 15px;">En Café del Bueno creemos que un buen café tiene el poder de transformar un momento cotidiano en una experiencia memorable. Te invitamos a disfrutar de café de especialidad, sabores cuidadosamente seleccionados y un ambiente pensado para hacerte sentir como en casa. Bienvenido a tu nuevo lugar favorito.</p>
          </div>
          <div class="flex flex-wrap items-center gap-3 md:gap-4 mt-[20px] md:mt-[24px]">
            <a href="#menu" class="inline-block text-center uppercase align-middle whitespace-nowrap h-11 md:h-12 bg-[rgb(159,106,51)] tracking-[0.4px] leading-[42px] md:leading-[46px] min-w-[110px] md:min-w-[120px] pt-[1.6px] pr-4 pb-0 pl-4" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; text-decoration: none; color: white;">Menú</a>
            <a href="#reservar-sala" class="inline-block text-center uppercase align-middle whitespace-nowrap h-11 md:h-12 border-[1.6px] border-white text-white tracking-[0.4px] leading-[38px] md:leading-[46px] min-w-[110px] md:min-w-[120px] pt-[1.6px] pr-4 pb-0 pl-4" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; text-decoration: none;">Reservar Sala</a>
          </div>
        </div>
      </div>
    </div>
  `;

  // ===== MENÚ: link a PDF + fotos destacadas (sin precios) =====
  const menuGalleryImages = menuHighlights.map(item => item.image);

  const menuHtml = `
    <section id="menu" style="background-color: rgb(252,248,243);" class="py-14 px-5 md:py-20 md:px-[30px]">
      <div class="ml-auto mr-auto max-w-[1020px]">
        <div class="text-center mb-8">
          <h2 class="text-center mb-3 text-[36px] md:text-[40px]" style="font-family: 'Cormorant Garamond', georgia, serif; color: rgb(59,35,20); font-weight: 700;">Nuestro Menú</h2>
          <p class="text-center text-[rgb(120,80,40)] text-[18px] max-w-[520px] mx-auto leading-[28px]">Ingredientes seleccionados, preparaciones artesanales y el mejor café de origen único para cada momento del día.</p>
        </div>
        <div class="text-center mb-12">
          <a href="${MENU_PDF_URL}" target="_blank" rel="noopener noreferrer" class="menu-download-btn rounded-full shadow-lg inline-flex items-center gap-3 uppercase text-white text-[16px] tracking-[0.4px]" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: rgb(159,106,51); text-decoration: none; height: 58px; padding: 0 32px;">
            <i data-lucide="download" size="19"></i>
            Descargar Menú Completo (PDF)
          </a>
        </div>
        <div class="max-w-[480px] ml-auto mr-auto shadow-lg" style="border-radius: 4px; overflow: hidden;">
          ${buildPhotoLoopHtml('menu-photo-loop', menuGalleryImages, 'Preparaciones de CAFÉ DEL BUENO')}
        </div>
      </div>
    </section>
  `;

  // Reservar Sala
  let roomsHtml = rooms.map((room, idx) => {
    const photoFirst = idx % 2 === 1; // sala 1 (Ensayo): foto a la izquierda; sala 0 (Reuniones): foto a la derecha
    const photoOrder = photoFirst ? '' : 'order-1 md:order-2';
    const textOrder = photoFirst ? '' : 'order-2 md:order-1';
    return `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center" style="${idx > 0 ? 'margin-top: 88px;' : ''}">
        <div class="${photoOrder}">
          ${buildPhotoLoopHtml(`room-photo-${room.id}`, room.gallery, room.name)}
        </div>
        <div class="text-left ${textOrder}">
          <div class="flex items-center gap-2 mb-3">
            <i data-lucide="${room.icon}" size="17" style="color: ${room.accent}; stroke-width: 1.5;"></i>
            <span class="uppercase text-[13px] tracking-[1.5px]" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgb(194,151,106);">${room.tagline}</span>
          </div>
          <h3 class="text-white text-[32px] mb-4" style="font-family: 'Cormorant Garamond', georgia, serif; font-weight: 700;">${room.name}</h3>
          <p class="text-[rgb(228,214,196)] text-[18px] leading-[27px] mb-5">${room.description}</p>
          <div class="flex flex-col gap-2 mb-4">
            <div class="flex items-center gap-2 text-[rgb(235,222,205)] text-[17px]">
              <i data-lucide="users" size="16" stroke-width="1.5"></i>
              <span>${room.capacity}</span>
            </div>
            <div class="flex items-center gap-2 text-[rgb(235,222,205)] text-[17px]">
              <i data-lucide="clock" size="16" stroke-width="1.5"></i>
              <span>${room.hours}</span>
            </div>
          </div>
          <ul class="flex flex-wrap gap-2 mb-6">
            ${room.features.map(f => `<li class="text-[13px] px-2 py-0.5 rounded-sm" style="background: rgba(194,151,106,0.22); color: rgb(248,240,228); font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; letter-spacing: 0.3px;">${f}</li>`).join('')}
          </ul>
          <a href="${buildRoomAvailabilityLink(room.name)}" target="_blank" rel="noopener noreferrer" class="whatsapp-btn rounded-full shadow-lg inline-flex items-center gap-3 uppercase tracking-[0.4px] text-white text-[16px]" style="background: #25D366; font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; text-decoration: none; height: 58px; padding: 0 32px;">
            <i data-lucide="message-circle" size="19"></i>
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
          <h2 class="text-white text-[36px] mb-4" style="font-family: 'Cormorant Garamond', georgia, serif; font-weight: 700;">Reservar una Sala</h2>
          <p class="text-[rgb(194,151,106)] max-w-[540px] mx-auto leading-[28px] text-[18px]">Un espacio versátil para vivir el café de otra manera, rodeado de personas que comparten tus ideas. Escríbenos por WhatsApp y te contamos la disponibilidad al instante.</p>
        </div>
        <div>
          ${roomsHtml}
        </div>
      </div>
    </section>
  `;

  const nosotrosHtml = `
    <section id="nosotros" style="background-color: rgb(252,248,243);" class="py-14 px-5 md:py-20 md:px-[30px]">
      <div class="ml-auto mr-auto max-w-[1020px] grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div class="order-2 md:order-1">
          <p class="uppercase text-[rgb(159,106,51)] text-[14px] tracking-[2px] mb-3" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif;">Sobre Nosotros</p>
          <h2 class="text-[rgb(59,35,20)] text-[36px] mb-5" style="font-family: 'Cormorant Garamond', georgia, serif; font-weight: 700;">Un café que se siente como en casa</h2>
          <p class="text-[rgb(90,65,45)] text-[18px] leading-[28px] mb-4">En Café del Bueno creemos que un gran café comienza mucho antes de llegar a la taza. Nace en la cuidadosa selección de granos de especialidad, continúa en una preparación realizada con dedicación y se completa en un ambiente pensado para disfrutar sin prisa.</p>
          <p class="text-[rgb(90,65,45)] text-[18px] leading-[28px] mb-4">Creamos este espacio con un propósito simple: ofrecer una experiencia que invite a hacer una pausa, compartir una conversación, leer un buen libro o simplemente disfrutar de un café excepcional.</p>
          <p class="text-[rgb(90,65,45)] text-[18px] leading-[28px] mb-4">Cada bebida y cada preparación reflejan nuestro compromiso con la calidad, la calidez y la atención a los detalles. Queremos que cada visita sea un momento para recordar y una razón para volver.</p>
          <p class="text-[rgb(90,65,45)] text-[18px] leading-[28px] mb-6">Bienvenido a Café del Bueno, donde el buen café y los buenos momentos siempre encuentran un lugar.</p>
          <a href="#contacto" class="inline-flex items-center gap-2 uppercase text-[14px] tracking-[0.4px] pb-1 border-b-[1.6px]" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgb(59,35,20); border-color: rgb(159,106,51); text-decoration: none;">
            Visítanos
            <i data-lucide="arrow-right" size="14"></i>
          </a>
        </div>
        <div class="order-1 md:order-2">
          ${buildPhotoLoopHtml('nosotros-photo', nosotrosGalleryImages, 'Interior de CAFÉ DEL BUENO')}
        </div>
      </div>
    </section>
  `;

  const salaLecturaHtml = `
    <section id="sala-lectura" class="py-14 px-5 md:py-20 md:px-[30px] border-t" style="background-color: rgb(252,248,243); border-color: rgb(240,232,220);">
      <div class="ml-auto mr-auto max-w-[1020px] grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        ${buildPhotoLoopHtml('sala-lectura-photo', salaLecturaGalleryImages, 'Sala de Lectura de CAFÉ DEL BUENO')}
        <div>
          <p class="uppercase text-[rgb(159,106,51)] text-[14px] tracking-[2px] mb-3" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif;">Un Rincón Para Leer</p>
          <h2 class="text-[rgb(59,35,20)] text-[36px] mb-5" style="font-family: 'Cormorant Garamond', georgia, serif; font-weight: 700;">Sala de Lectura</h2>
          <p class="text-[rgb(90,65,45)] text-[18px] leading-[28px] mb-4">Tenemos un rincón pensado para disfrutar de un buen libro con calma. Puedes venir simplemente a leer, o traer un libro propio e intercambiarlo por otro de nuestra sala — una forma más de compartir entre quienes aman la lectura tanto como el café.</p>
          <p class="italic text-[rgb(120,80,40)] text-[18px] leading-[29px]">"Aspiramos a ser un punto de encuentro para quienes disfrutan del buen café, la cultura y las conversaciones que nacen alrededor de una mesa."</p>
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
          <h2 class="text-white text-[32px] mb-3" style="font-family: 'Cormorant Garamond', georgia, serif; font-weight: 700;">Reseñas</h2>
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
              <p class="text-[rgb(80,60,45)] text-[15px] leading-[22px] mb-4">"${r.text}"</p>
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
          <img src="img/logo-footer.svg" alt="CAFÉ DEL BUENO" style="width: 168px; height: auto; margin-bottom: 1.25rem;" />
          <div class="flex items-start gap-2 mb-3 text-[17px]" style="color: rgb(194,151,106);">
            <i data-lucide="map-pin" size="15" class="shrink-0 mt-0.5" style="color: rgb(159,106,51);"></i>
            <a href="https://www.google.com/maps/search/?api=1&query=Carlos+Condell+0109%2C+Punta+Arenas%2C+Chile" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors duration-300" style="color: rgb(194,151,106); text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(159,106,51,0.6);">Carlos Condell 0109<br />Punta Arenas, Chile</a>
          </div>
          <div class="flex items-center gap-2 mb-6 text-[17px]" style="color: rgb(194,151,106);">
            <i data-lucide="mail" size="15" class="shrink-0" style="color: rgb(159,106,51);"></i>
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
          <p class="uppercase mb-6 flex items-center gap-2 text-[13px] tracking-[3px]" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgb(159,106,51);">
            <i data-lucide="clock" size="14"></i> Horarios
          </p>
          <div class="flex flex-col gap-3 text-[17px]">
            ${[['Lunes – Sábado','14:30 – 20:30'],['Domingo y feriados','Cerrado']].map(([day, time]) => `
              <div class="flex justify-between items-center gap-8 pb-2 border-b" style="border-color: rgba(194,151,106,0.2);">
                <span style="color: rgb(194,151,106);">${day}</span>
                <span style="color: white; font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif;">${time}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div>
          <p class="uppercase mb-6 text-[13px] tracking-[3px]" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgb(159,106,51);">Grupos &amp; Pedidos Especiales</p>
          <p class="mb-5 text-[17px] leading-[24px]" style="color: rgb(194,151,106);">¿Vienes con un grupo grande o quieres coordinar algo para tu empresa o evento? Escríbenos directo y lo conversamos.</p>
          <a href="tel:+56961348234" class="block mb-2 text-[17px] hover:text-[rgb(159,106,51)] transition-colors duration-300" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: white; text-decoration: none;">+56 9 6134 8234</a>
          <a href="mailto:cafedelbueno.cl@gmail.com" class="text-[17px] underline underline-offset-4 hover:text-white transition-colors duration-300" style="color: rgb(194,151,106);">cafedelbueno.cl@gmail.com</a>
        </div>
      </div>
      <div class="border-t" style="border-color: rgba(194,151,106,0.15);">
        <div class="ml-auto mr-auto flex flex-col md:flex-row justify-between items-center gap-3 max-w-[1020px] pt-5 pr-[30px] pb-5 pl-[30px]">
          <p class="uppercase text-center text-[12px] tracking-[2px]" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgba(194,151,106,0.5);">© 2026 CAFÉ DEL BUENO · Punta Arenas - Magallanes, Chile. Todos los derechos reservados.</p>
          <p class="uppercase text-center text-[12px] tracking-[2px]" style="font-family: 'Oswald', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: rgba(194,151,106,0.35);">Hecho del bueno.</p>
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
    <div class="flex flex-col bg-white text-[rgb(59,35,20)] leading-[24px] min-h-[679.2px]" style="font-family: 'Cormorant Garamond', georgia, serif;">
      ${headerHtml}
      ${topBarHtml}
      <main role="main" class="grow basis-0 shrink-0">
        ${heroHtml}
        ${menuHtml}
        ${reservarHtml}
        ${nosotrosHtml}
        ${salaLecturaHtml}
        ${reseñasHtml}
      </main>
      ${footerHtml}
      ${floatingHtml}
    </div>
  `;
}

// ============================================================
// INICIALIZACIÓN Y EVENTOS
// ============================================================
// ============================================================
// ROTACIÓN AUTOMÁTICA DE FOTOS (cuadros .photo-loop)
// ============================================================
function initPhotoLoops() {
  document.querySelectorAll('.photo-loop').forEach(container => {
    const imgs = container.querySelectorAll('.photo-loop-img');
    if (imgs.length <= 1) return;
    let current = 0;
    setInterval(() => {
      imgs[current].classList.remove('active');
      current = (current + 1) % imgs.length;
      imgs[current].classList.add('active');
    }, 4000);
  });
}

function init() {
  const root = document.getElementById('root');
  if (!root) return;

  root.innerHTML = buildMainHTML();

  // Inicializar Lucide
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Iniciar la rotación automática de fotos (Nosotros, Reservar Sala)
  initPhotoLoops();

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
