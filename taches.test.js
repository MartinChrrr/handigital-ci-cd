import { test, expect } from 'vitest'
import { ajouterTache, supprimerTache, compterTaches } from './taches.js'

test('ajoute une tâche à la liste', () => {
  const liste = ajouterTache([], 'Lire')
  expect(liste.length).toBe(1)
  expect(liste[0].titre).toBe('Lire')
})

test('supprime une tâche', () => {
  const liste = ajouterTache([], 'Lire')
  const vide = supprimerTache(liste, 'Lire')
  expect(vide.length).toBe(0)
})

test('compte les tâches', () => {
  const liste = ajouterTache([], 'Lire')
  expect(compterTaches(liste)).toBe(1)
})