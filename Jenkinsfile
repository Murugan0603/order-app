pipeline {
  agent any

  environment {
    IMAGE = "mano0603/order-app:latest"
  }

  stages {

    stage('Clone') {
      steps {
        git branch: 'main', url: 'https://github.com/Murugan0603/order-app.git'
      }
    }

    stage('Build Docker') {
      steps {
        bat "docker build -t %IMAGE% ."
      }
    }

    stage('Login Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
          bat '''
          echo %PASS% | docker login -u %USER% --password-stdin
          '''
        }
      }
    }

    stage('Push Docker Hub') {
      steps {
        bat "docker push %IMAGE%"
      }
    }

    stage('Deploy Kubernetes') {
      steps {
        bat "kubectl apply -f k8s/"
      }
    }
  }
}
