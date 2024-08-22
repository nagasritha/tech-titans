function isPrimeSync(value) {
    if (value < 2) return false;

    for (var i = 2; i < value; i++) {
        if (value % i === 0) return false;
    }

    return true;
}

function* findPrimesSync(min, max) {
    let skipCount = 0; // Number of iterations to skip
    let i = min;

    while (i < max) {
        if (isPrimeSync(i)) {
            if (skipCount > 0) {
                skipCount--; // Decrease skip count
                i++; // Move to the next number
                continue; // Skip this iteration
            }

            let result = yield i; // Yield the prime number and wait for a value
            skipCount = result; // Set skip count based on received value
            
        }
        i++;
    }
}

module.exports = {
    findPrimesSync
}