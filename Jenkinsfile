pipeline {
  agent any

  environment {
    IMAGE = "mano0603/order-app"
  }

  stages {

    stage('Clone') {
      steps {
        git '<your-github-repo-url>'
      }
    }

    stage('Build Docker') {
      steps {
        sh 'docker build -t $IMAGE:latest .'
      }
    }

    stage('Push Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
          sh 'echo $PASS | docker login -u $USER --password-stdin'
          sh 'docker push $IMAGE:latest'
        }
      }
    }

    stage('Deploy Kubernetes') {
      steps {
        sh 'kubectl apply -f k8s/'
      }
    }
  }
}