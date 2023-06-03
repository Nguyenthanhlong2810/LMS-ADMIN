pipeline {
    agent master

    stages {
        stage('Build') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}