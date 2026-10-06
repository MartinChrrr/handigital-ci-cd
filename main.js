import { ajouterTache, supprimerTache, compterTaches } from './taches.js'

// La liste des tâches. Elle est vide au chargement de la page.
let taches = []

const formulaire = document.querySelector('#formulaire')
const champTitre = document.querySelector('#titre')
const elementListe = document.querySelector('#liste')
const compteur = document.querySelector('#compteur')

// Affiche la liste des tâches sur la page.
function afficher() {
  elementListe.innerHTML = ''

  for (const tache of taches) {
    const ligne = document.createElement('li')

    const texte = document.createElement('span')
    texte.textContent = tache.titre
    ligne.appendChild(texte)

    const boutonSupprimer = document.createElement('button')
    boutonSupprimer.textContent = 'Supprimer'
    boutonSupprimer.addEventListener('click', () => {
      taches = supprimerTache(taches, tache.titre)
      afficher()
    })
    ligne.appendChild(boutonSupprimer)

    elementListe.appendChild(ligne)
  }

  compteur.textContent = 'Nombre de tâches : ' + compterTaches(taches)
}

// Quand le formulaire est envoyé, on ajoute une tâche.
formulaire.addEventListener('submit', (evenement) => {
  evenement.preventDefault()
  taches = ajouterTache(taches, champTitre.value)
  champTitre.value = ''
  afficher()
})

afficher()
