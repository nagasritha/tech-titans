const { expect } = require("chai");
const { findPrimesInteractive } = require("../../src/primes");

describe("Abort Testing", function () {
  it("checkng with abort function", function (done) {
    let result = [];
    const cb = (res) => {
      if (res.message === "prime") {
        result.push(res.prime);
        expect(res.message).to.been.equal("prime");
      }
      if (res.index === 5) {
        abort();
        expect(result.length).to.be.equal(res.primes.length);
      }
    };

    const { abort } = findPrimesInteractive(1, 10, cb);
    done();
  });
});
