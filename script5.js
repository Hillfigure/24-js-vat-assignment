const checkAge = (age) => age >= 18;


const greeting = function(age) {
    if (checkAge(age)) {
        console.log("Hello there")
    } else {
        console.log("Hello kiddo")
    }
}

greeting(7);
greeting(18);

console.log("");

const productType = {
    standard: 0.21,
    food: 0.09,
    vatFree: 0
}

const amount = {
    inclVat: true,
    exclVat: false
}

// You must do the calculation of the VAT amount in a separate function.
const calculateVatAmount = (base, vat) => base*(vat);
const roundTwoDecimals = (result) => Math.round((result + Number.EPSILON)*100)/100;

// First let's write a function that takes the base price and the VAT percentage 
// and returns the price including VAT
const calculateTotalInclVat= function(base, vat) {
    let result = base + calculateVatAmount(base, vat);
    return roundTwoDecimals(result);
}

console.log(calculateTotalInclVat(150, productType.food));
console.log(calculateTotalInclVat(100, productType.vatFree));
console.log(calculateTotalInclVat(101, productType.standard));

console.log("");

// The main function you make should take the amount including VAT and the VAT percentage. 
// The return value should be an array with two elements: base price and VAT amount. 
// Again: make sure you use two functions, where the main one calls another 
// function to do part of the calculation.

const splitAmounts = function(base, vat) {
    let baseExlVat = base / (vat+1);
    let vatRemainder = base - baseExlVat;
    return [baseExlVat, vatRemainder];
}

const calculateTotalExclVat= function(base, vat) {
    return splitAmounts(base, vat);
}

let splitResult = calculateTotalExclVat(100, productType.standard);
let splitBaseAmount = roundTwoDecimals(splitResult[0]);
let splitVatAmount = roundTwoDecimals(splitResult[1]);

console.log(splitBaseAmount + " and " + splitVatAmount);
console.log("");

// This is a more combined approach.
// The first method checks for calculating with or without vat.
// Since we must make two methods, one returns an array, one just a number,
// I have added an extra method to check for this and log out the results.
// Of course we want to log out rounded numbers, so a method added.

const inclVat = (value, vatType) => value * (vatType+1);

const exclVat = function(value, vatType) {
    return splitAmounts(value, vatType);
}

const logResults = function(result) {
    if (result instanceof Array) {
        console.log("Original amount: " + roundTwoDecimals(result[0]));
        console.log("VAT: " + roundTwoDecimals(result[1]));
    } else {
        console.log("Total value, including VAT: " + result);
    }
}

const calculateResult = function(calculateType, vatType, value) {
    if (calculateType) {
        return inclVat(value, vatType);
    } else {
        return exclVat(value, vatType); 
    }
}

logResults(calculateResult(amount.inclVat, productType.standard, 100));
logResults(calculateResult(amount.exclVat, productType.standard, 100));