
module.exports = function (input) {
    if (typeof input !== 'number') throw new Error(' This is not number')
    if (input % 3 === 0 && input % 5 === 0)
        return 'FizzBuzz';
    if (input % 3 === 0)
        return 'Fizz'
    if (input % 5 === 0)
        return 'Buzz'
    return input

}