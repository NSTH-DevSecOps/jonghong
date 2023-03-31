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
        RHOCP_CREDENTIALS = credentials('jonghong-jenkins-token')
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
        stage('Pre-built') {
            steps {
                sh "git clone --branch ${BRANCH_NAME} ${APP_REPOSITORY} ${APP_NAME}"
                
                nexusPolicyEvaluation advancedProperties: '',
                    enableDebugLogging: false,
                    failBuildOnNetworkError: false,
                    iqApplication: selectedApplication('jonghong-frontend'),
                    iqInstanceId: 'nexusiq.devops.demo',
                    iqScanPatterns: [[scanPattern: "${APP_NAME}/package-lock.json"]],
                    iqStage: 'build',
                    jobCredentialsId: ''
                
                nexusPolicyEvaluation advancedProperties: '',
                    enableDebugLogging: false,
                    failBuildOnNetworkError: false,
                    iqApplication: selectedApplication('jonghong-backend'),
                    iqInstanceId: 'nexusiq.devops.demo',
                    iqScanPatterns: [[scanPattern: "${APP_NAME}/server/package-lock.json"]],
                    iqStage: 'build',
                    jobCredentialsId: ''
            }
        }
        stage('CI') {
            steps {
                sh "sed -i \"s/http/https/\" ${APP_NAME}/src/components/scheduler.jsx" // temporarily replace http to https
                sh "sed -i \"s/127.0.0.1:8080/api.jonghong.nsth.net/\" ${APP_NAME}/src/components/scheduler.jsx" // temporarily replace api host from localhost to dev one
                sh "sed -i \"s/http/https/\" ${APP_NAME}/server/server.js" // temporarily replace http to https
                sh "sed -i \"s/127.0.0.1:5174/jonghong.nsth.net/\" ${APP_NAME}/server/server.js" // temporarily replace api host from localhost to dev one
                sh "docker build --no-cache --tag ${DEV_DOCKER_REPOSITORY_HOST}/jonghong/frontend:$BUILD_NUMBER -f ${APP_NAME}/Dockerfile.reactUI ${APP_NAME}"
                sh "docker build --no-cache --tag ${DEV_DOCKER_REPOSITORY_HOST}/jonghong/backend:$BUILD_NUMBER -f ${APP_NAME}/server/Dockerfile.node ${APP_NAME}/server"
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
                            sh "sed -i \"s/:tag/:$BUILD_NUMBER/\" ${APP_NAME}/${BACK_END_DEPLOYMENT_DIR}/deployment.yaml"
                            sh 'oc apply -f ${APP_NAME}/${BACK_END_DEPLOYMENT_DIR}'

                            sh "sed -i \"s/:tag/:$BUILD_NUMBER/\" ${APP_NAME}/${FRONT_END_DEPLOYMENT_DIR}/deployment.yaml"
                            sh 'oc apply -f ${APP_NAME}/${FRONT_END_DEPLOYMENT_DIR}'
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
