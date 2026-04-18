pipeline {
  agent any

  environment {
    IMAGE = "mano0603/order-app"
  }

  stages {

    stage('Clone') {
      steps {
        git branch: 'main', url: 'https://github.com/Murugan0603/order-app.git'
      }
    }

    stage('Build Docker') {
      steps {
        bat 'docker build -t mano0603/order-app:latest .'
      }
    }

    stage('Login Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
          bat 'echo %PASS% | docker login -u %USER% --password-stdin'
        }
      }
    }

    stage('Push Docker Hub') {
      steps {
        bat 'docker push mano0603/order-app:latest'
      }
    }

    stage('Deploy Kubernetes') {
      steps {
        bat 'kubectl apply -f k8s/'
      }
    }
  }
}
