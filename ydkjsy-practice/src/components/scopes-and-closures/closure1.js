import React from 'react'

let isPrime = isPrimeCache();
let factorize = factorizeCache();

function isPrimeCache() {

  var primes = [];
  var nonPrimes = [];

  return function isPrime(v) {
    
    if(primes.includes(v)) return true;
    if(nonPrimes.includes(v)) return false;

    if (v <= 3) {
      return v > 1;
    }
    if (v % 2 === 0 || v % 3 === 0) {
      nonPrimes = [...nonPrimes, v]
      return false;
    }
    var vSqrt = Math.sqrt(v);
    for (let i = 5; i <= vSqrt; i += 6) {
      if(v % i === 0 || v % (i + 2) === 0) {
        nonPrimes = [...nonPrimes, v]
        return false;
      }
    }
    primes = [...primes, v]
    return true;
  }
}

function factorizeCache() {

  var factors = {};

  return function factorize(v) {

    if (!isPrime(v)) {

      if(factors[v] !== undefined) {
        return factors[v];
      }

      let i = Math.floor(Math.sqrt(v));
      while (v % i !== 0) {
        i--;
      }
      factors = {...factors, [v]:[
        ...factorize(i),
        ...factorize(v / i)
      ]}
      return [
        ...factorize(i),
        ...factorize(v / i)
      ];
    }
    
    factors = {...factors, [v]:v}
    return [v];
  } 
}

const closure1 = () => {
  return (
    <>
      <h3>Closure1</h3>
      <p>11 isPrime: {JSON.stringify(isPrime(11))} | factors: {JSON.stringify(factorize(11))}</p>
      <p>11 isPrime: {JSON.stringify(isPrime(11))} | factors: {JSON.stringify(factorize(11))}</p>
      <p>11 isPrime: {JSON.stringify(isPrime(11))} | factors: {JSON.stringify(factorize(11))}</p>
      <p>12 isPrime: {JSON.stringify(isPrime(12))} | factors: {JSON.stringify(factorize(12))}</p>
      <p>12 isPrime: {JSON.stringify(isPrime(12))} | factors: {JSON.stringify(factorize(12))}</p>
      <p>44433739 isPrime: {JSON.stringify(isPrime(44433739))} | factors: {JSON.stringify(factorize(44433739))}</p>
    </>
  )
}

export default closure1