const establishments = [
    {
      id: 1,
      name: "McDonald's",
      logo: "https://www.press-agrum.com/wp-content/uploads/2024/02/logo-mcdonalds-1024x640.jpg",
      description: "Le midi ou en soirée, la célèbre chaîne de restauration rapide t'ouvre les portes de ses 4 restaurants rochelais.",
      offers: [
        {
          id: 1,
          type: "ponctuelle",
          title: "1 MENU ACHETÉ = 1 MENU OFFERT",
          description: "Sur toutes les gammes hors menu Happy Meal et McSmart",
          used: false
        },
        {
          id: 2,
          type: "permanente",
          title: "-20% sur l'addition OU un sandwich offert pour l'achat d'un menu best-of (ou Maxi)",
          description: "Hors offres spéciales",
          used: false
        }
      ]
    },
    {
      id: 2,
      name: "Terasse's",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKggU0PmNc5CxbNNTfJWNBuDMtHKkNSYRfVw&s",
      description: "L'institution du centre ville. L'abus d'alcool est dangereux pour la santé. À consommer avec modération.",
      offers: [
        {
          id: 1,
          type: "ponctuelle",
          title: "UN VERRE ACHETÉ = UN VERRE OFFERT",
          used: false
        },
        {
          id: 2,
          type: "permanente",
          title: "Un verre acheté = Un shooter colors offert",
          used: false
        }
      ]
    }
  ];
  
  const establishmentList = document.getElementById('establishment-list');
  const detailsModal = document.getElementById('details-modal');
  const detailsContent = document.getElementById('details-content');
  const closeDetails = document.getElementById('close-details');
  
  // Function to open the details modal
  function openDetails(estName) {
    const establishment = establishments.find(est => est.name === estName);
    detailsModal.classList.add('active');
    
    let offersHTML = '';
    establishment.offers.forEach(offer => {
      offersHTML += `
        <div class="offer ${offer.type}">
          <h3>${offer.title}</h3>
          <p>${offer.description || ''}</p>
          <button class="${offer.used ? 'used' : ''}" onclick="useOffer(${establishment.id}, ${offer.id})">
            ${offer.used ? 'OFFRE DÉJÀ UTILISÉE' : 'UTILISER'}
          </button>
        </div>
      `;
    });
  
    detailsContent.innerHTML = `
      <h2>${establishment.name}</h2>
      <p>${establishment.description}</p>
      ${offersHTML}
      <button class="show-card">MONTRER MA CARTE</button>
    `;
  }
  
  // Function to close the details modal
  closeDetails.onclick = () => {
    detailsModal.classList.remove('active');
  };
  
  // Function to use an offer
  function useOffer(estId, offerId) {
    const establishment = establishments.find(est => est.id === estId);
    const offer = establishment.offers.find(off => off.id === offerId);
    if (!offer.used) {
      offer.used = true;
      alert('Offre utilisée !');
      openDetails(establishment.name); // Refresh the modal content
    }
  }
  
  // Initialize page
  function init() {
    establishmentList.innerHTML = '';
    establishments.forEach(est => {
      const card = document.createElement('div');
      card.className = 'establishment-card';
      card.innerHTML = `<img src="${est.logo}" alt="${est.name}"><div class="heart-icon">❤️</div>`;
      card.onclick = () => openDetails(est.name);
      establishmentList.appendChild(card);
    });
  }
  
  // Run the init function
  init();
  
