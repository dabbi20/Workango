/* ===========================
   GALLERY (thumbs -> main)
=========================== */
document.querySelectorAll('.thumb').forEach(t=>{
  t.addEventListener('click',()=>{
    document.getElementById('mainImg').src = t.src.replace('w=200','w=1400');
    document.querySelectorAll('.thumb').forEach(i=>i.style.borderColor='transparent');
    t.style.borderColor='var(--brand)';
  });
});

/* ===========================
   FAVORITE
=========================== */
const favBtn=document.getElementById('favBtn');
let fav=false;
favBtn.addEventListener('click',()=>{
  fav=!fav;
  favBtn.innerHTML = fav
   ? '<i class="ri-heart-3-fill text-rose-500"></i> <span data-i18n="btn.favorited">Favorito guardado</span>'
   : '<i class="ri-heart-3-line"></i> <span data-i18n="btn.favorite">Marcar como favorito</span>';
  applyI18n(currentLang); // re-aplica traducción al span
});

/* ===========================
   CART (state + UI)
=========================== */
const CART_KEY='wc_cart_v1';
const cartBtn=document.getElementById('cartBtn');
const cartCount=document.getElementById('cartCount');
const cartPanel=document.getElementById('cartPanel');
const cartClose=document.getElementById('cartClose');
const cartItems=document.getElementById('cartItems');
const cartSubtotal=document.getElementById('cartSubtotal');
const buyBtn=document.getElementById('buyBtn');

let cart = JSON.parse(localStorage.getItem(CART_KEY)||'[]');
function saveCart(){ localStorage.setItem(CART_KEY,JSON.stringify(cart)); }
function fmt(n){ return `$${n.toFixed(2)}`; }
function renderCart(){
  cartItems.innerHTML='';
  let subtotal=0;
  cart.forEach((p,idx)=>{
    subtotal += p.price*p.qty;
    const row=document.createElement('div');
    row.className='cart-item';
    row.innerHTML=`
      <img src="${p.img}" alt="">
      <div class="cart-meta">
        <div class="font-semibold">${p.title}</div>
        <div class="text-sm text-slate-500">${fmt(p.price)}</div>
      </div>
      <div class="qty">
        <button data-act="dec" data-i="${idx}">-</button>
        <span>${p.qty}</span>
        <button data-act="inc" data-i="${idx}">+</button>
      </div>
      <button data-act="del" data-i="${idx}" class="cart-close" title="Eliminar"><i class="ri-delete-bin-6-line"></i></button>
    `;
    cartItems.appendChild(row);
  });
  cartSubtotal.textContent=fmt(subtotal);
  const count=cart.reduce((a,b)=>a+b.qty,0);
  if(count>0){ cartCount.textContent=count; cartCount.classList.remove('hidden'); } else { cartCount.classList.add('hidden'); }
}
function openCart(){ cartPanel.classList.remove('hidden'); }
function closeCart(){ cartPanel.classList.add('hidden'); }

cartItems.addEventListener('click',(e)=>{
  const btn=e.target.closest('button'); if(!btn) return;
  const i=parseInt(btn.dataset.i,10);
  if(btn.dataset.act==='inc'){ cart[i].qty++; }
  if(btn.dataset.act==='dec'){ cart[i].qty=Math.max(1,cart[i].qty-1); }
  if(btn.dataset.act==='del'){ cart.splice(i,1); }
  saveCart(); renderCart();
});
cartBtn.addEventListener('click',openCart);
cartClose.addEventListener('click',closeCart);

buyBtn.addEventListener('click',()=>{
  // producto principal
  const p={ title: i18n[currentLang]['cart.itemMain'], price:150, qty:1,
            img: document.getElementById('mainImg').src };
  // si ya existe, suma qty
  const ix=cart.findIndex(x=>x.title===p.title);
  if(ix>-1){ cart[ix].qty++; } else { cart.push(p); }
  saveCart(); renderCart(); openCart();
});

renderCart();

/* ===========================
   LANGUAGE (i18n local)
=========================== */
const i18n={
  es:{
    "nav.atlas":"Atlas IA","nav.market":"Marketplace","nav.grow":"Let’s Grow","nav.workademy":"Workademy","nav.know":"Know us",
    "auth.login":"Acceso","auth.signup":"Inscribirse",
    "details.title":"Detalles del servicio",
    "details.pageTitleK":"Título de la página:","details.pageTitleV":"Lorem ipsum dolo",
    "details.serviceNameK":"Nombre del servicio:","details.serviceNameV":"Lorem ipsum dolor sit amet.",
    "details.industryK":"Industria:","details.industryV":"Empresa",
    "details.categoryK":"Categoría:","details.categoryV1":"Tecnología y Software","details.categoryV2":"Desarrollo web",
    "details.deliveryK":"El tiempo de entrega:","details.deliveryV":"7–9 Days",
    "btn.favorite":"Marcar como favorito","btn.favorited":"Favorito guardado","btn.buyNow":"Comprar ahora","btn.contact":"Contact Seller",
    "seller.title":"Detalles del vendedor",
    "desc.title":"Descripción del servicio:","desc.text":"Lorem ipsum dolor sit amet consectetur. Diam hac pellentesque libero tristique. Vitae adipiscing mattis nullam in eget volutpat auctor. Montes id nulla vivamus suspendisse arcu elementum facilisis nunc in. Consequat pulvinar nunc ac sed varius. Tortor gravida vulputate urna leo lorem tellus facilisis pulvinar non. Ut dictumst nibh feugiat nec mauris aliquam morbi vitae suspendisse. Nibh ornare egestas sollicitudin ac adipiscing cras vel. Adipiscing nibh id consectetur.",
    "suggested.title":"Servicios sugeridos",
    "card.industryK":"Industria:","card.industryV":"Empresa","card.categoryK":"Categoría:",
    "cart.title":"Tu carrito","cart.subtotal":"Subtotal","cart.checkout":"Proceder al pago",
    "cart.itemMain":"Servicio principal"
  },
  en:{
    "nav.atlas":"AI Atlas","nav.market":"Marketplace","nav.grow":"Let’s Grow","nav.workademy":"Workademy","nav.know":"Know us",
    "auth.login":"Log in","auth.signup":"Sign up",
    "details.title":"Service details",
    "details.pageTitleK":"Page title:","details.pageTitleV":"Lorem ipsum dolo",
    "details.serviceNameK":"Service name:","details.serviceNameV":"Lorem ipsum dolor sit amet.",
    "details.industryK":"Industry:","details.industryV":"Business",
    "details.categoryK":"Category:","details.categoryV1":"Technology & Software","details.categoryV2":"Web development",
    "details.deliveryK":"Delivery time:","details.deliveryV":"7–9 Days",
    "btn.favorite":"Add to favorites","btn.favorited":"Saved to favorites","btn.buyNow":"Buy now","btn.contact":"Contact Seller",
    "seller.title":"Seller details",
    "desc.title":"Service description:","desc.text":"Lorem ipsum dolor sit amet consectetur. Diam hac pellentesque libero tristique. Vitae adipiscing mattis nullam in eget volutpat auctor. Montes id nulla vivamus suspendisse arcu elementum facilisis nunc in...",
    "suggested.title":"Suggested services",
    "card.industryK":"Industry:","card.industryV":"Business","card.categoryK":"Category:",
    "cart.title":"Your cart","cart.subtotal":"Subtotal","cart.checkout":"Checkout",
    "cart.itemMain":"Main service"
  },
  fr:{
    "nav.atlas":"Atlas IA","nav.market":"Marketplace","nav.grow":"Let’s Grow","nav.workademy":"Workademy","nav.know":"Nous connaître",
    "auth.login":"Connexion","auth.signup":"S’inscrire",
    "details.title":"Détails du service",
    "details.pageTitleK":"Titre de la page :","details.pageTitleV":"Lorem ipsum dolo",
    "details.serviceNameK":"Nom du service :","details.serviceNameV":"Lorem ipsum dolor sit amet.",
    "details.industryK":"Secteur :","details.industryV":"Entreprise",
    "details.categoryK":"Catégorie :","details.categoryV1":"Technologie et Logiciels","details.categoryV2":"Développement web",
    "details.deliveryK":"Délai de livraison :","details.deliveryV":"7–9 jours",
    "btn.favorite":"Ajouter aux favoris","btn.favorited":"Ajouté aux favoris","btn.buyNow":"Acheter maintenant","btn.contact":"Contacter le vendeur",
    "seller.title":"Détails du vendeur",
    "desc.title":"Description du service :","desc.text":"Lorem ipsum dolor sit amet consectetur...",
    "suggested.title":"Services suggérés",
    "card.industryK":"Secteur :","card.industryV":"Entreprise","card.categoryK":"Catégorie :",
    "cart.title":"Votre panier","cart.subtotal":"Sous-total","cart.checkout":"Passer au paiement",
    "cart.itemMain":"Service principal"
  },
  pt:{
    "nav.atlas":"Atlas IA","nav.market":"Marketplace","nav.grow":"Let’s Grow","nav.workademy":"Workademy","nav.know":"Conheça-nos",
    "auth.login":"Acessar","auth.signup":"Inscrever-se",
    "details.title":"Detalhes do serviço",
    "details.pageTitleK":"Título da página:","details.pageTitleV":"Lorem ipsum dolo",
    "details.serviceNameK":"Nome do serviço:","details.serviceNameV":"Lorem ipsum dolor sit amet.",
    "details.industryK":"Indústria:","details.industryV":"Empresa",
    "details.categoryK":"Categoria:","details.categoryV1":"Tecnologia e Software","details.categoryV2":"Desenvolvimento web",
    "details.deliveryK":"Prazo de entrega:","details.deliveryV":"7–9 dias",
    "btn.favorite":"Marcar como favorito","btn.favorited":"Favorito salvo","btn.buyNow":"Comprar agora","btn.contact":"Contatar o vendedor",
    "seller.title":"Detalhes do vendedor",
    "desc.title":"Descrição do serviço:","desc.text":"Lorem ipsum dolor sit amet consectetur...",
    "suggested.title":"Serviços sugeridos",
    "card.industryK":"Indústria:","card.industryV":"Empresa","card.categoryK":"Categoria:",
    "cart.title":"Seu carrinho","cart.subtotal":"Subtotal","cart.checkout":"Finalizar compra",
    "cart.itemMain":"Serviço principal"
  },
  it:{
    "auth.login":"Accedi","auth.signup":"Iscriviti",
    "details.title":"Dettagli del servizio",
    "details.pageTitleK":"Titolo della pagina:","details.pageTitleV":"Lorem ipsum dolo",
    "details.serviceNameK":"Nome del servizio:","details.serviceNameV":"Lorem ipsum dolor sit amet.",
    "details.industryK":"Settore:","details.industryV":"Impresa",
    "details.categoryK":"Categoria:","details.categoryV1":"Tecnologia e Software","details.categoryV2":"Sviluppo web",
    "details.deliveryK":"Tempo di consegna:","details.deliveryV":"7–9 giorni",
    "btn.favorite":"Aggiungi ai preferiti","btn.favorited":"Salvato tra i preferiti","btn.buyNow":"Acquista ora","btn.contact":"Contatta il venditore",
    "seller.title":"Dettagli del venditore",
    "desc.title":"Descrizione del servizio:","desc.text":"Lorem ipsum dolor sit amet consectetur...",
    "suggested.title":"Servizi suggeriti",
    "card.industryK":"Settore:","card.industryV":"Impresa","card.categoryK":"Categoria:",
    "cart.title":"Il tuo carrello","cart.subtotal":"Subtotale","cart.checkout":"Vai al pagamento",
    "cart.itemMain":"Servizio principale"
  },
  de:{
    "auth.login":"Anmelden","auth.signup":"Registrieren",
    "details.title":"Servicedetails",
    "details.pageTitleK":"Seitentitel:","details.pageTitleV":"Lorem ipsum dolo",
    "details.serviceNameK":"Servicename:","details.serviceNameV":"Lorem ipsum dolor sit amet.",
    "details.industryK":"Branche:","details.industryV":"Unternehmen",
    "details.categoryK":"Kategorie:","details.categoryV1":"Technologie & Software","details.categoryV2":"Webentwicklung",
    "details.deliveryK":"Lieferzeit:","details.deliveryV":"7–9 Tage",
    "btn.favorite":"Zu Favoriten","btn.favorited":"Gespeichert","btn.buyNow":"Jetzt kaufen","btn.contact":"Verkäufer kontaktieren",
    "seller.title":"Verkäuferdetails",
    "desc.title":"Servicebeschreibung:","desc.text":"Lorem ipsum dolor sit amet consectetur...",
    "suggested.title":"Vorgeschlagene Services",
    "card.industryK":"Branche:","card.industryV":"Unternehmen","card.categoryK":"Kategorie:",
    "cart.title":"Dein Warenkorb","cart.subtotal":"Zwischensumme","cart.checkout":"Zur Kasse",
    "cart.itemMain":"Hauptservice"
  }
};

let currentLang = localStorage.getItem('wc_lang') || 'es';

function applyI18n(lang){
  currentLang = lang;
  localStorage.setItem('wc_lang',lang);
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key=el.getAttribute('data-i18n');
    const txt = i18n[lang]?.[key];
    if(typeof txt === 'string'){ el.textContent = txt; }
  });
}
applyI18n(currentLang);

/* Lang menu interactions */
const langBtn=document.getElementById('langBtn');
const langMenu=document.getElementById('langMenu');
const searchLang=document.getElementById('searchLang');
const langList=document.getElementById('langList');

langBtn.addEventListener('click',()=>langMenu.classList.toggle('hidden'));
searchLang.addEventListener('input',()=>{
  const v=searchLang.value.toLowerCase();
  langList.querySelectorAll('li').forEach(li=>{
    li.style.display = li.textContent.toLowerCase().includes(v)?'':'none';
  });
});
langList.querySelectorAll('li').forEach(li=>{
  li.addEventListener('click',()=>{
    applyI18n(li.dataset.lang);
    langMenu.classList.add('hidden');
  });
});

/* Checkout demo */
document.getElementById('checkoutBtn').addEventListener('click',()=>{
  alert('✅ Pago simulado. (Conecta aquí tu pasarela real cuando quieras)');
});

