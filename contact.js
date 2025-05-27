// Questionnaire de contact
const questionnaire = [
  {
    qlabel: "Quel est le langage de programmation principal utilisé pour le développement web frontend?",
    qid: 1,
    reponses: [
      { rlabel: "Python", rid: 1 },
      { rlabel: "JavaScript", rid: 2 },
      { rlabel: "Java", rid: 3 }
    ],
    correct: 2
  },
  {
    qlabel: "Quel framework CSS est utilisé dans ce portfolio?",
    qid: 2,
    reponses: [
      { rlabel: "Bootstrap", rid: 1 },
      { rlabel: "Tailwind CSS", rid: 2 },
      { rlabel: "Bulma", rid: 3 }
    ],
    correct: 2
  },
  {
    qlabel: "Quelle est la bibliothèque UI utilisée avec Tailwind dans ce portfolio?",
    qid: 3,
    reponses: [
      { rlabel: "DaisyUI", rid: 1 },
      { rlabel: "Flowbite", rid: 2 },
      { rlabel: "HeadlessUI", rid: 3 }
    ],
    correct: 1
  }
];

// Variable pour stocker les réponses
let reponses = '';
let currentQuestionIndex = 0;

// Fonction pour afficher une question
function displayQuestion() {
  const container = document.getElementById('questionnaire-container');
  if (currentQuestionIndex >= questionnaire.length) {
    checkAnswers();
    return;
  }

  const question = questionnaire[currentQuestionIndex];
  const html = `
    <div class="card bg-base-100 shadow-xl mb-4">
      <div class="card-body">
        <h3 class="card-title text-lg mb-4">Question ${currentQuestionIndex + 1}</h3>
        <p class="mb-4">${question.qlabel}</p>
        <div class="space-y-2">
          ${question.reponses.map((reponse, index) => `
            <button 
              class="btn btn-outline btn-wide w-full justify-start" 
              onclick="submitAnswer(${question.qid}, ${reponse.rid})"
            >
              ${reponse.rlabel}
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  
  container.innerHTML = html;
}

// Fonction pour soumettre une réponse
function submitAnswer(qid, rid) {
  reponses += `A${qid}${rid}`;
  currentQuestionIndex++;
  displayQuestion();
}

// Fonction pour vérifier les réponses
function checkAnswers() {
  const correctAnswers = questionnaire.map(q => `A${q.qid}${q.reponses[q.correct - 1].rid}`).join('');
  const container = document.getElementById('questionnaire-container');
  const contactForm = document.getElementById('contact-form');
  
  if (reponses === correctAnswers) {
    container.innerHTML = `
      <div class="alert alert-success shadow-lg mb-8">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Félicitations! Vous pouvez maintenant me contacter.</span>
        </div>
      </div>
    `;
    contactForm.classList.remove('hidden');
  } else {
    container.innerHTML = `
      <div class="alert alert-error shadow-lg mb-8">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Désolé, vos réponses ne sont pas correctes. Veuillez réessayer.</span>
        </div>
      </div>
      <button class="btn btn-primary" onclick="resetQuestionnaire()">Réessayer</button>
    `;
  }
}

// Fonction pour réinitialiser le questionnaire
function resetQuestionnaire() {
  reponses = '';
  currentQuestionIndex = 0;
  displayQuestion();
}

// Gestionnaire du formulaire de contact
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-email-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('contact-name').value;
      const firstname = document.getElementById('contact-firstname').value;
      const email = document.getElementById('contact-email').value;
      const message = document.getElementById('contact-message').value;
      
      const mailtoLink = `mailto:hamza.douich@email.com?subject=Contact depuis le portfolio&body=De : ${firstname} ${name}%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0AEmail : ${email}`;
      
      window.location.href = mailtoLink;
    });
  }
  
  // Initialisation du questionnaire
  displayQuestion();
});

// Fonction pour le "brute force" des réponses
function bruteForceAnswers() {
  const correctAnswers = questionnaire.map(q => `A${q.qid}${q.reponses[q.correct - 1].rid}`).join('');
  reponses = correctAnswers;
  checkAnswers();
}

// Ajout du bouton brute force quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    const sectionBg = contactSection.querySelector('.section-bg');
    if (sectionBg) {
      sectionBg.insertAdjacentHTML(
        'beforeend',
        `
        <div class="text-center mt-8">
          <button 
            class="btn btn-ghost btn-sm" 
            onclick="bruteForceAnswers()"
            title="Répondre automatiquement aux questions"
          >
            <i class="fas fa-terminal"></i>
          </button>
        </div>
        `
      );
    }
  }
});