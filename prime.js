process.on("message", message => {
    let isPrime = checkIfPrime(message)
    process.send(isPrime)
    process.exit()
})

function checkIfPrime(number){
    let isPrime = true
    for(let i =2; i < number; i++){
        if(number % i === 0){
            isPrime = false
        }
    }
    return isPrime && number > 1
}


// console.log(checkIfPrime(1))

// function to concat array

// function concatArray(){
//     const array = []; //semicolon dipakai agar forEach tidak error
//     [...arguments].forEach(arg => {
//         array.push(...arg)
//     })
//     return array
// }
// console.log(concatArray([1],[2,3]))


