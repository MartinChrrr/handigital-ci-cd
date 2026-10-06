pipeline {
    agent any
    tools { nodejs 'node22' }
    triggers { pollSCM('H/2 * * * *') }
    stages {
        stage('Installer') { steps { sh 'npm ci' } }
        stage('Tester') { steps { sh 'npm test' } }
        stage('Construire') { steps { sh 'npm run build'; archiveArtifacts 'dist/**' } }
    }
}
