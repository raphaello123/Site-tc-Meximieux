// =============================================
// FONCTIONS DE GESTION DES DONNÉES
// =============================================

// Charger toutes les données du site
function loadAllData() {
    const savedData = localStorage.getItem('tc_meximieux_data');
    
    // Données par défaut si rien n'existe
    const defaultData = {
        events: [
            {
                id: 1,
                title: "Tournoi Open d'Été",
                date: "2024-06-15",
                location: "TC Meximieux",
                time: "9h00 - 18h00",
                description: "Tournoi ouvert à tous les membres. Inscriptions jusqu'au 10 juin. Catégories simples et doubles.",
                image: "default",
                category: "tournoi"
            }
        ],
        team: [
            {
                id: 1,
                name: "Jean Dupont",
                role: "Président",
                description: "Fondateur du club en 1985",
                photo: "default"
            },
            {
                id: 2,
                name: "Marie Martin",
                role: "Trésorière",
                description: "Gestionnaire du club depuis 10 ans",
                photo: "default"
            }
        ],
        offers: [
            {
                id: 1,
                title: "Enfants",
                price: "180€/an",
                features: ["Baby tennis (4-6 ans)", "2h par semaine", "Encadrement qualifié", "Matériel fourni"],
                featured: false
            },
            {
                id: 2,
                title: "Adultes",
                price: "220€/an",
                features: ["Cours tous niveaux", "Accès illimité aux courts", "Participations aux tournois", "Soirées club"],
                featured: true
            },
            {
                id: 3,
                title: "Compétition",
                price: "280€/an",
                features: ["Entraînement intensif", "Préparation aux tournois", "3h par semaine", "Suivi personnalisé"],
                featured: false
            }
        ],
        history: {
            title: "Notre Histoire",
            content: "Fondé en 1985, le Tennis Club de Meximieux n'a cessé de grandir et d'évoluer au fil des années. Notre club s'est construit autour de valeurs fortes : convivialité, partage et passion du tennis. Aujourd'hui, avec plus de 300 membres et 4 courts couverts, nous accueillons les joueurs de tous niveaux et de tous âges dans une ambiance familiale et sportive.",
            images: []
        },
        partners: [
            {
                id: 1,
                name: "Boulangerie du Centre",
                website: "#",
                description: "Notre fournisseur officiel depuis 2018",
                logo: "default"
            },
            {
                id: 2,
                name: "Garage Auto Meximieux",
                website: "#",
                description: "Partenaire mécanique du club",
                logo: "default"
            },
            {
                id: 3,
                name: "Pharmacie de la Dombes",
                website: "#", 
                description: "Conseils santé et bien-être",
                logo: "default"
            }
        ]
    };
    
    return savedData ? JSON.parse(savedData) : defaultData;
}

// Sauvegarder toutes les données
function saveAllData(data) {
    localStorage.setItem('tc_meximieux_data', JSON.stringify(data));
}

// =============================================
// FONCTIONS D'AFFICHAGE (RENDU)
// =============================================

// Afficher les événements
function renderEvents(events) {
    const container = document.getElementById('events-container');
    if (!container) return;

    // Trier les événements par date
    const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    container.innerHTML = sortedEvents.map(event => `
        <div class="event-card">
            <div class="event-image">
                <i class="fas fa-calendar-alt"></i>
            </div>
            <div class="event-content">
                <div class="event-date">
                    ${new Date(event.date).toLocaleDateString('fr-FR', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}
                </div>
                <h3>${event.title}</h3>
                <div class="event-info">
                    <span class="location">📍 ${event.location}</span>
                    <span class="time">⏰ ${event.time}</span>
                </div>
                <p class="event-description">${event.description}</p>
                <button class="btn-primary" onclick="showEventDetails(${event.id})">
                    En savoir plus
                </button>
            </div>
        </div>
    `).join('');
}

// Afficher l'équipe
function renderTeam(team) {
    const container = document.getElementById('team-container');
    if (!container) return;

    container.innerHTML = team.map(member => `
        <div class="team-member">
            <div class="member-photo">
                <i class="fas fa-user"></i>
            </div>
            <h3>${member.name}</h3>
            <div class="member-role">${member.role}</div>
            <p>${member.description || 'Membre dévoué du TC Meximieux'}</p>
        </div>
    `).join('');
}

// Afficher les offres
function renderOffers(offers) {
    const container = document.getElementById('offers-container');
    if (!container) return;

    container.innerHTML = offers.map(offer => `
        <div class="offer-card ${offer.featured ? 'featured' : ''}">
            <div class="offer-icon">
                <i class="fas fa-tennis-ball"></i>
            </div>
            <h3>${offer.title}</h3>
            <div class="offer-price">${offer.price}</div>
            <ul class="offer-features">
                ${offer.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <button class="btn-primary" onclick="showOfferDetails('${offer.title}')">
                S'inscrire
            </button>
        </div>
    `).join('');
}

// Afficher l'histoire
function renderHistory(history) {
    const container = document.getElementById('history-container');
    if (!container) return;

    container.innerHTML = `
        <div class="history-content">
            <h3>${history.title}</h3>
            <p>${history.content}</p>
            <div class="history-image">
                <i class="fas fa-history"></i>
                <p>Photos historiques du club</p>
            </div>
            <div class="history-stats">
                <div class="stat">
                    <strong>1985</strong>
                    <span>Année de création</span>
                </div>
                <div class="stat">
                    <strong>300+</strong>
                    <span>Membres actuels</span>
                </div>
                <div class="stat">
                    <strong>4</strong>
                    <span>Courts couverts</span>
                </div>
            </div>
        </div>
    `;
}

// AFFICHER LES PARTENAIRES - FONCTION CORRIGÉE
function renderPartners(partners) {
    console.log("🔄 Chargement des partenaires:", partners);
    
    const gridContainer = document.getElementById('partners-container');
    const bannerContainer = document.getElementById('partners-track');
    
    console.log("📦 Conteneurs trouvés:", {
        grid: !!gridContainer,
        banner: !!bannerContainer
    });
    
    // Grille des partenaires
    if (gridContainer) {
        if (partners.length === 0) {
            gridContainer.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #6b7280;">
                    <i class="fas fa-handshake" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>Aucun partenaire pour le moment</p>
                    <p style="font-size: 0.875rem;">Les partenaires apparaîtront ici</p>
                </div>
            `;
        } else {
            gridContainer.innerHTML = partners.map(partner => `
                <div class="partner-card">
                    ${partner.logo && partner.logo !== 'default' ? 
                        `<img src="${partner.logo}" class="partner-logo" alt="${partner.name}" style="width: 120px; height: 120px; object-fit: contain; border-radius: 50%; background: white; padding: 1rem; margin-bottom: 1rem;">` :
                        `<div class="partner-logo" style="width: 120px; height: 120px; background: #f1f5f9; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: #6b7280; font-size: 2rem;">
                            <i class="fas fa-building"></i>
                        </div>`
                    }
                    <h4>${partner.name}</h4>
                    ${partner.description ? `<p style="color: #6b7280; font-size: 0.875rem; margin: 0.5rem 0;">${partner.description}</p>` : ''}
                    ${partner.website && partner.website !== '#' ? 
                        `<a href="${partner.website}" target="_blank" class="btn-secondary" style="margin-top: 1rem; font-size: 0.875rem;">Visiter le site</a>` : 
                        ''}
                </div>
            `).join('');
        }
    }
    
    // Banderole défilante
    if (bannerContainer && partners.length > 0) {
        const partnersHTML = partners.map(partner => `
            <div class="partner-banner-item">
                ${partner.logo && partner.logo !== 'default' ? 
                    `<img src="${partner.logo}" alt="${partner.name}" style="height: 30px; margin-right: 1rem; vertical-align: middle;">` :
                    '<i class="fas fa-building" style="margin-right: 0.5rem;"></i>'
                }
                ${partner.name} • 
            </div>
        `).join('');
        
        // Dupliquer pour l'effet de défilement infini
        bannerContainer.innerHTML = partnersHTML + partnersHTML;
    }
}

// =============================================
// FONCTIONS D'INTERACTION
// =============================================

// Détails d'un événement
function showEventDetails(eventId) {
    const data = loadAllData();
    const event = data.events.find(e => e.id === eventId);
    
    if (event) {
        alert(`🎾 ${event.title}\n\n📅 ${new Date(event.date).toLocaleDateString('fr-FR')}\n📍 ${event.location}\n⏰ ${event.time}\n\n${event.description}\n\nPour plus d'informations, contactez-nous !`);
    }
}

// Détails d'une offre
function showOfferDetails(offerTitle) {
    alert(`🎯 ${offerTitle}\n\nPour vous inscrire à cette offre :\n\n1. Rendez-vous au club\n2. Contactez-nous au 04 74 00 00 00\n3. Ou envoyez un email à tcmeximieux@gmail.com\n\nÀ bientôt au TC Meximieux !`);
}

// Scroll vers une section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// =============================================
// GESTION DES ÉVÉNEMENTS ET INITIALISATION
// =============================================

// Configurer tous les événements
function setupAllEventListeners() {
    // Menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('.navigation');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navigation.classList.toggle('active');
        });
    }

    // Fermer le menu en cliquant sur un lien
    document.querySelectorAll('.navigation a').forEach(link => {
        link.addEventListener('click', function() {
            navigation.classList.remove('active');
        });
    });

    // Scroll smooth pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Effet de scroll sur le header
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(30, 58, 138, 0.98)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'rgba(30, 58, 138, 0.95)';
            header.style.backdropFilter = 'none';
        }
    });

    // Clic en dehors du menu pour le fermer
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navigation') && !e.target.closest('.menu-toggle')) {
            if (navigation) navigation.classList.remove('active');
        }
    });
}

// Initialisation complète du site
function initializeWebsite() {
    console.log("🚀 Initialisation du site TC Meximieux...");
    
    // Charger toutes les données
    const data = loadAllData();
    console.log("📊 Données chargées:", data);
    
    // Afficher tout le contenu
    renderEvents(data.events);
    renderTeam(data.team);
    renderOffers(data.offers);
    renderHistory(data.history);
    renderPartners(data.partners);
    
    // Configurer les interactions
    setupAllEventListeners();
    
    console.log('✅ Site TC Meximieux initialisé avec succès !');
}

// =============================================
// DÉMARRAGE DU SITE
// =============================================

// Lancer le site quand la page est chargée
document.addEventListener('DOMContentLoaded', function() {
    console.log("📄 Page chargée, démarrage de l'initialisation...");
    initializeWebsite();
});