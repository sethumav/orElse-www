pipeline {
    agent any


    currentBuild.result = "SUCCESS"

    try {

       stage('Checkout'){

          checkout scm
       }

       stage('Test'){

         env.NODE_ENV = "test"

         print "Environment will be : ${env.NODE_ENV}"

         sh 'node -v'
         sh 'npm install'
         sh 'npm test'

       }  
} catch (err) {

        currentBuild.result = "FAILURE"

            mail body: "project build error is here:" ,
            from: 'vijay_sethumadavan@wsib.on.ca',
            replyTo: 'sethumadavan@gmail.com',
            subject: 'project build failed',
            to: 'sethumadavan@gmail.com'

        throw err
    }     

}