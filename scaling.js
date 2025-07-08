const fs = require('fs')
const chlid_process = require('child_process')
const express = require('express')
const bodyParser = require('body-parser')
// for exec scaling
// for(var i=0 ; i<3; i++){
//     var workersProcess = chlid_process.exec('node child_scaling.js ' +i, function(error, stdout, stderr){
//         if(error){
//             console.log(error.stack)
//             console.log('error code :' + error.code)
//             console.log('signal received :' +error.signal)

//         }
//         console.log('stdout :' + stdout)
//         console.log('stderror :' + stderr)
        
//     })
//     workersProcess.on('exit', function(code){
//         console.log('child process exited with exit code ' + code)
//     })
// }

// for spawn scaling
// for(var i = 0; i < 3; i++){
//     var workersProcess = chlid_process.spawn('node', ['child_scaling.js', i])

//     workersProcess.stdout.on('data', function(data){
//         console.log('stdout: ' + data)
//     })
//     workersProcess.stderr.on('data', function(data){
//         console.log('stderr: ' + data)
//     })
//     workersProcess.on('close', function(code){
//         console.log('child process exited with code ' + code)
//     })
// }


// for fork scaling
// for(var i = 0; i < 3; i++){
//     var workersProcess = chlid_process.fork("child_scaling.js", [i])
//     workersProcess.on('close', function (code){
//         console.log('child process exited with code ' + code)
//     })
// }

// fork to check prime number
const app = express()
app.use(bodyParser.json())

app.post("/somebigprocess", (req,res) => {
    const forked_child_process = chlid_process.fork('./prime.js')
    forked_child_process.send(parseInt(req.body.number))
    forked_child_process.on("message", isTheNumberPrime => res.send(isTheNumberPrime))
})

app.listen(3000, () => {
    console.log('server is running')
})