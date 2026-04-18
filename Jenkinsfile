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
        bat '''
        echo %PASS% | docker login -u mano0603 -p dckr_pat_vkAKueCqZjYdZpSqdhNf47mYV0k
        '''
      }
    }

    stage('Push Docker Hub') {
      steps {
        bat "docker push %IMAGE%"
      }
    }
    stage('Check Kubernetes') {
      steps {
        bat 'kubectl config current-context'
        bat 'kubectl get nodes'
      }
    }
    stage('Deploy Kubernetes') {
      steps {
        bat "kubectl apply -f k8s/"
      }
    }
  }
}

final jenkins file?
