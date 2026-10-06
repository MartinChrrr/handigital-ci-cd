# Liste de tâches

Application d'exemple du module « CI/CD avec Jenkins ».

## Commandes utiles

| Commande | Ce qu'elle fait |
|----------|-----------------|
| `npm ci` | Installe les dépendances |
| `npm test` | Lance les tests |
| `npm run dev` | Affiche le site sur votre poste |
| `npm run build` | Crée le dossier `dist` |

---

## 1. Le site

Adresse du site en ligne : https://profound-sundae-c99c33.netlify.app

## 2. Démarrer Jenkins

```bash
docker run -d --name jenkins -p 8080:8080 -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts
```

Adresse de Jenkins : http://localhost:8080

Au premier démarrage, le mot de passe administrateur initial s'obtient avec :

```bash
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

Si le conteneur existe déjà : `docker start jenkins`.

## 3. Configuration

| Élément | Valeur |
|---------|--------|
| Outil Node.js (Manage Jenkins > Tools) | `node22` |
| Credential du jeton Netlify (Secret text) | `netlify-token` |
| Credential de l'ID du site Netlify (Secret text) | `netlify-site` |

## 4. Le pipeline

1. **Installer** : installe les dépendances avec `npm ci`.
2. **Tester** : lance les tests et produit le rapport `rapport.xml` lu par Jenkins.
3. **Construire** : crée le dossier `dist` et l'archive dans Jenkins.
4. **Prévisualiser** : publie `dist` sur une adresse de prévisualisation Netlify.
5. **Valider** : met le pipeline en pause jusqu'à ce qu'une personne clique sur « Mettre en ligne ».
6. **Déployer** : publie `dist` sur le site en ligne.

## 5. Mettre en ligne

1. Faire ses modifications et vérifier en local avec `npm test`.
2. Commiter et pousser sur `main` :
   ```bash
   git add .
   git commit -m "description du changement"
   git push
   ```
3. Jenkins détecte le commit (vérification toutes les 2 minutes) et lance le pipeline.
4. Ouvrir l'adresse de prévisualisation affichée dans les logs de l'étape **Prévisualiser** et vérifier le site.
5. Dans Jenkins, à l'étape **Valider**, cliquer sur « Mettre en ligne » (ou « Abort » pour refuser).
6. Vérifier le site en ligne une fois l'étape **Déployer** terminée.

## 6. Revenir en arrière

Annuler le dernier commit sans réécrire l'historique, puis pousser :

```bash
git log --oneline
git revert HEAD
git push
```

Pour annuler un commit plus ancien : `git revert <id-du-commit>`.

Le pipeline se relance alors automatiquement : valider à l'étape **Valider** pour remettre en ligne la version précédente.
