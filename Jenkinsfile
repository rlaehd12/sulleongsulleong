pipeline {
    agent any
    tools {nodejs "nodejs"}

    stages {
        stage('Checkout') {
            steps {
                // Git 저장소에서 소스 코드를 가져옵니다.
                checkout scm
            }
        }

        stage('Build Back Server') {
            steps {
                // 프로젝트 디렉토리로 이동합니다.
                dir('./server/sulleong/') {
                    // Gradle 빌드를 실행합니다.
                    sh 'chmod +x gradlew'
                    sh './gradlew clean build -x test'
                }
            }
        }

        stage('Build Front Server') {
            steps {
                // 프로젝트 디렉토리로 이동합니다.
                dir('./client/') {
                    // Gradle 빌드를 실행합니다.
                    sh 'npm install'
                    sh 'CI=false npm run build'
                }
            }
        }

        /*************** TAR파일 생성******************/
        stage('make deploy file'){
            steps{
                dir('./server/sulleong/') {
                    script{
                        //baseline 커맨드를 이용해 war파일명을 가져온다
                        env.warname = sh (script: 'basename build/libs/*.jar .jar', returnStdout: true ).trim()
                        echo env.warname

                        env.deployname = "deploys"
                        echo "deployname: ${env.deployname}"

                        sh ("mkdir /var/jenkins_home/workspace/build-task/${env.deployname}")

                        //jar 파일 이동.
                        sh ("mv build/libs/*.jar ./")
                        sh ("mv *.jar /var/jenkins_home/workspace/build-task/${env.deployname}")
                    }
                }
                dir('./client/') {
                    script{
                        //프론트 서버 빌드 파일 이동
                        sh ("mv ./build/ /var/jenkins_home/workspace/build-task/${env.deployname}/build")
                    }
                }
                dir('./') {
                    sh ("tar -zcvf ${env.deployname}.tar.gz ${env.deployname}")
                    sh ("rm -rf ${env.deployname}")
                }
            }
        }

        /*************** Pulish Over SSH Plug in사용******************/
        stage('SSH transfer') {
            steps([$class: 'BapSshPromotionPublisherPlugin']) {
                sshPublisher(
                    continueOnError: false, failOnError: true,
                    publishers: [
                        sshPublisherDesc(
                            configName: "docker-server",//Jenkins 시스템 정보에 사전 입력한 서버 ID
                            verbose: true,
                            transfers: [
                                sshTransfer(
                                    sourceFiles: "${env.deployname}.tar.gz", //전송할 파일
                                    removePrefix: "", //파일에서 삭제할 경로가 있다면 작성
                                    remoteDirectory: "./", //배포할 위치
                                    execCommand: "echo 'Current Directory: $WORKSPACE/server/sulleong/' && ls -al /root" // 현재 디렉토리 위치와 원격지에서 실행할 커맨드
  )
                            ]
                        )
                    ]
                )
            }
        }
    }
}



