/* =============================
   GALERÍA DE IMÁGENES
   ============================= */
document.querySelectorAll('.thumb').forEach(t => {
  t.addEventListener('click', () => {
    document.getElementById('mainImg').src = t.src.replace('w=200', 'w=1400');
    document.querySelectorAll('.thumb').forEach(img => img.classList.remove('border-[var(--brand)]'));
    t.classList.add('border-[var(--brand)]');
  });
});

/* =============================
   MENÚ MÓVIL
   ============================= */
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
  });
  // Cerrar al hacer clic en un enlace
  mobileNav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') mobileNav.classList.add('hidden');
  });
}

/* =============================
   SISTEMA DE IDIOMA (i18n)
   ============================= */
const translations = {
  es: {
    "details.title": "Detalles del servicio",
    "details.pageTitle": "Título de la página:",
    "details.serviceName": "Nombre del servicio:",
    "details.industry": "Industria:",
    "details.category": "Categoría:",
    "details.delivery": "El tiempo de entrega:",
    "details.seller": "Detalles del vendedor",
    "details.descriptionTitle": "Descripción del servicio:",
    "details.description": "Este servicio ofrece soluciones profesionales en tecnología y software...",
    "details.suggested": "Servicios sugeridos",
    "btn.favorite": "Marcar como favorito",
    "btn.buyNow": "Comprar ahora"
  },
  en: {
    "details.title": "Service details",
    "details.pageTitle": "Page title:",
    "details.serviceName": "Service name:",
    "details.industry": "Industry:",
    "details.category": "Category:",
    "details.delivery": "Delivery time:",
    "details.seller": "Seller details",
    "details.descriptionTitle": "Service description:",
    "details.description": "This service offers professional solutions in technology and software...",
    "details.suggested": "Suggested services",
    "btn.favorite": "Add to favorites",
    "btn.buyNow": "Buy now"
  },
  fr: {
    "details.title": "Détails du service",
    "details.pageTitle": "Titre de la page:",
    "details.serviceName": "Nom du service:",
    "details.industry": "Industrie:",
    "details.category": "Catégorie:",
    "details.delivery": "Délai de livraison:",
    "details.seller": "Détails du vendeur",
    "details.descriptionTitle": "Description du service:",
    "details.description": "Ce service offre des solutions professionnelles en technologie et en logiciel...",
    "details.suggested": "Services suggérés",
    "btn.favorite": "Ajouter aux favoris",
    "btn.buyNow": "Acheter maintenant"
  }
};

let currentLang = localStorage.getItem('lang') || 'es';
function applyTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}
applyTranslations(currentLang);

// Botón de idioma flotante
const langBtn = document.getElementById('langBtn');
if (langBtn) {
  langBtn.addEventListener('click', () => {
    const langs = Object.keys(translations);
    const nextIndex = (langs.indexOf(currentLang) + 1) % langs.length;
    currentLang = langs[nextIndex];
    localStorage.setItem('lang', currentLang);
    applyTranslations(currentLang);
  });
}

/* =============================
   CARRITO DE COMPRAS
   ============================= */
const cartBtn = document.getElementById('cartBtn');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
  console.clear();
  console.table(cart);
  localStorage.setItem('cart', JSON.stringify(cart));
}

if (cartBtn) {
  cartBtn.addEventListener('click', () => {
    alert(`🛒 Carrito actual: ${cart.length} producto(s). (ver consola)`);
    renderCart();
  });
}

const buyNowBtn = document.getElementById('buyNow');
if (buyNowBtn) {
  buyNowBtn.addEventListener('click', () => {
    const product = {
      id: Date.now(),
      name: "Servicio de desarrollo web",
      price: "100–200",
      qty: 1
    };
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("✅ Producto añadido al carrito");
  });
}

/* =============================
   SERVICIOS SUGERIDOS (DINÁMICOS)
   ============================= */
const suggested = document.getElementById('suggestedServices');
if (suggested) {
  const data = [
    {
      img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
      name: "James Anderson",
      city: "New York, NY",
      rating: "5.0 (40)",
      industry: "Empresa",
      category: "Tecnología y Software / Desarrollo web",
      price: "$100–200"
    },
    {
      img: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=1200&auto=format&fit=crop",
      name: "Sarah Miller",
      city: "Los Angeles, CA",
      rating: "4.9 (32)",
      industry: "Comercio",
      category: "Marketing Digital / Diseño",
      price: "$90–150"
    },
    {
      img: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=1200&auto=format&fit=crop",
      name: "David Thompson",
      city: "Chicago, IL",
      rating: "5.0 (27)",
      industry: "Educación",
      category: "Consultoría / Mentoría",
      price: "$120–250"
    }
  ];

  data.forEach(item => {
    const card = document.createElement('article');
    card.className = "relative soft-card overflow-hidden min-w-[300px]";
    card.innerHTML = `
      <div class="heart"><i class="ri-heart-3-line text-rose-500"></i></div>
      <div class="aspect-video">
        <img src="${item.img}" class="w-full h-full object-cover" alt="service"/>
      </div>
      <div class="absolute right-4 bottom-24 price-chip">${item.price}</div>
      <div class="p-5 space-y-2 bg-white">
        <div class="flex items-center gap-3">
          <img src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=200&auto=format&fit=crop"
               class="w-9 h-9 rounded-full" alt="avatar"/>
          <div class="text-sm">
            <p class="font-semibold">${item.name}</p>
            <p class="text-[12px] text-slate-500">
              <i class="ri-map-pin-2-line"></i> ${item.city} •
              <i class="ri-star-fill text-yellow-500"></i> ${item.rating}
            </p>
          </div>
        </div>
        <div class="text-[12px] text-slate-500">
          <p><span class="font-semibold text-slate-700">Industria:</span> ${item.industry}</p>
          <p><span class="font-semibold text-slate-700">Categoría:</span> ${item.category}</p>
        </div>
      </div>
    `;
    suggested.appendChild(card);
  });
}

/* =============================
   AJUSTES RESPONSIVE EXTRAS
   ============================= */
// Scroll suave en móvil
document.querySelectorAll('#thumbs, #suggestedServices').forEach(el => {
  el.addEventListener('wheel', e => {
    if (e.deltaY !== 0 && window.innerWidth < 768) {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    }
  });
});
