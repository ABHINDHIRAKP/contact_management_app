pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/ABHINDHIRAKP/contact_management_app.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Run Containers') {
            steps {
                sh 'docker-compose down || true'   // stop old containers if running
                sh 'docker-compose up -d'          // run in background
            }
        }
    }
}
