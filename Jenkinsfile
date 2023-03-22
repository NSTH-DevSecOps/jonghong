// Declarative //
pipeline {
    // Use Linux Docker host as default agent for this pipeline
    agent {
        label 'slave-linux'
    }
    environment {
        // SCM: Git URL
        APP_REPOSITORY = 'https://github.com/bankierubybank/nsth-room-reservation.git'
        BRANCH_NAME = 'main'

        // Sonatype Nexus RM Docker Registry Configuration
        DEV_DOCKER_REPOSITORY_HOST = credentials('DOCKER_DEV_NEXUS_HOST')
        DOCKER_USER = credentials('NEXUS_JENKINS_USER')
        DOCKER_PASS = credentials('NEXUS_JENKINS_PASS')

        // Environment variables for CD
        RHOCP_CREDENTIALS = credentials('aqua-demo-sa-token')
        RHOCP_CLUSTER = credentials('RHOCP_PROD-01_API')
        RHOCP_REGISTRY = credentials('RHOCP_PROD-01_REGISTRY')
        RHOCP_PROJECT = 'jonghong'
        APP_NAME = 'jonghong'

        // Environment variables for deployment information
        BACK_END_DEPLOYMENT_DIR = 'deployment/ocp/backend'
        FRONT_END_DEPLOYMENT_DIR = 'deployment/ocp/frontend'
    }
    tools {
        //Configured OpenShift Client Tools on Jenkins Global Tool Configuration
        oc 'oc-latest' //Configured OpenShift Client Tools name
    }
    stages {
        stage('CI') {
            steps {
                sh "git clone --branch ${BRANCH_NAME} ${APP_REPOSITORY} ${APP_NAME} && cd ${APP_NAME}"
                sh "docker build --no-cache --tag ${DEV_DOCKER_REPOSITORY_HOST}/jonghong/frontend:$BUILD_NUMBER -f Dockerfile.reactUI ."
                sh "cd server && docker build --no-cache --tag ${DEV_DOCKER_REPOSITORY_HOST}/jonghong/backend:$BUILD_NUMBER -f Dockerfile.node ."
            }
        }
        stage('JENKINS: PUSH IMAGE') {
            steps {
                sh 'docker login -u ${DOCKER_USER} -p ${DOCKER_PASS} ${DEV_DOCKER_REPOSITORY_HOST}'
                sh "docker push ${DEV_DOCKER_REPOSITORY_HOST}/jonghong/frontend:$BUILD_NUMBER"
                sh "docker push ${DEV_DOCKER_REPOSITORY_HOST}/jonghong/backend:$BUILD_NUMBER"
            }
        }
        stage('CD') {
            stages {
                stage('CD PREPARATION') {
                    steps {
                        sh 'oc login --server=${RHOCP_CLUSTER} --insecure-skip-tls-verify --token=${RHOCP_CREDENTIALS}'
                        sh 'oc project ${RHOCP_PROJECT}'
                    }
                }
                stage('DEPLOY') {
                    steps {
                        script {
                            sh "sed -i \"s/:tag/:$BUILD_NUMBER/\" ${BACK_END_DEPLOYMENT_DIR}/01-deployment.yaml"
                            sh 'oc apply -f ${BACK_END_DEPLOYMENT_DIR}'

                            sh "sed -i \"s/:tag/:$BUILD_NUMBER/\" ${FRONT_END_DEPLOYMENT_DIR}/01-deployment.yaml"
                            sh 'oc apply -f ${FRONT_END_DEPLOYMENT_DIR}'
                        }
                    }
                }
            }
        }
    }
    post { 
        always {
            cleanWs()
            sh "for i in \$(docker image ls | grep ${APP_NAME} | gerp $BUILD_NUMBER | awk '{print \$1\":\"\$2}'); do docker rmi \$i; done"
            sh 'docker system prune --force'
        }
    }
}
