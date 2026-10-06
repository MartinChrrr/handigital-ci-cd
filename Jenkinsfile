pipeline {
    agent any
    tools { nodejs 'node22' }
    environment {
        NETLIFY_AUTH_TOKEN = credentials('netlify-token')
        NETLIFY_SITE_ID = credentials('netlify-site')
    }
    triggers { pollSCM('H/2 * * * *') }
    stages {
        stage('Installer') { steps { sh 'npm ci' } }
        stage('Tester') { steps { sh 'npm test' } }
        stage('Construire') { steps { sh 'npm run build'; archiveArtifacts 'dist/**' } }
        stage('Déployer') { steps { sh 'npm run deploy' } }
    }
}
