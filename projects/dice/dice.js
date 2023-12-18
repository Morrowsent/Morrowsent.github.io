var numSides = 20;
var numAdvantage = 2;
//main(numSides, numAdvantage+1);

function main(){
    var numSides = Number(document.getElementById('sidecount').value);
    var numAdvantage = Number(document.getElementById('dicecount').value);

    var string = generateEquationString(numAdvantage);
    var arr = stringToOutput(string);
    var operations = getOperations(string);
    var sums = sumArray(arr, numSides);

    for(var i = 0; i < sums.length; i++){
        if(operations[i] == "-"){
            sums[i] = -(sums[i])
        }
    }

    var total = 0;
    for(var i = 0; i < sums.length; i++){
        total += sums[i];
    }

    alert(total / Math.pow(numSides, numAdvantage));
}

function getOperations(string){
    var arr = [""];
    for(var i = 0; i < string.length; i++){
        if(string.substring(i, i+1) == "+" || string.substring(i, i+1) == "-"){
            arr.push(string.substring(i, i+1));
        }
    }
    return arr;
}

function sumArray(arr, n){
    var sums = [];
    for(var i = 0; i < arr.length; i++){
        var sum = 0;
        for(var j = 0; j < arr[i].length; j++){
            if(arr[i].substring(j, j+1) == "n"){

                sum += (Number(arr[i].substring(0, j)) * faulhaber(Number(arr[i].substring(j+2)), n));
            }
        }
        sums.push(sum)
    }
    return sums;
}

function stringToOutput(input){
    var string = input + "+";
    
    var start = 0;
    var powers = [];
    for(var i = 0; i < string.length; i++){
        if(string.substring(i, i+1) == "+" || string.substring(i, i+1) == "-"){
            powers.push(string.substring(start, i));
            start = i+1;
        }
    }
    return powers;
}

var sum = 0;
for(var i = 1; i <= 10; i++){
    sum += Math.pow(i, 2);
}

function pascalTriangle(layers){
    var triangle = new Array();
    for(var i = 0; i < layers; i++){
        triangle[i] = new Array();
        triangle[i][0] = 1;
        for(var j = 1; j <= i; j++){
            if(j != i){
                triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j];
            }
            else{
                triangle[i][j] = 1;
            }
        }
    }
    return triangle;
}

function getPascalRow(row){
    var triangle = pascalTriangle(row);
    return triangle[row-1];
}


function generateEquationString(numAdv){
    var equation = "";
    var coeff = getPascalRow((numAdv+1));
    for(var i = 0; i < numAdv; i++){
        equation += coeff[i+1];
        equation += "n";
        equation += "^";
        equation += numAdv-i;
        if(i % 2 != 1){
            equation += "-";
        }
        else{
            equation += "+";
        }
    }
    return equation.substring(0, equation.length-1);
}

function getBernoulli(num){
    if(num == 0){
        return 1;
    }
    var triangle = new Array();
    for(var i = 0; i < num; i++){
        triangle[i] = new Array();
        if(i == 0){
            for(var j = 0; j < num; j++){
                triangle[i][j] = math.fraction(1, j+1)
            }
        }
        else{
            for(var j = 0; j < num-i; j++){
                triangle[i][j] = math.multiply((j+1), (math.subtract(triangle[i-1][j], triangle[i-1][j+1])));
            }
        }
    }
    return (triangle[num-1][0]).toFraction();
}

function faulhaber(p, n){
    var frac = 1 / (p+1);
    var mult = 0;
    for(var i = 0; i <= p; i++){
        var bin = getBinomial(p+1, i).toFraction();
        var ber = math.compile(getBernoulli(i+1).toString()).evaluate();
        var exp = Math.pow(n, (p-i+1));
        mult += bin*ber*exp;
    }
    return frac*mult;
}

function getFactorial(num){
    var final = 1;
    for(var i = 1; i <= num; i++){
        final *= i;
    }
    return final;
}

function getBinomial(n, k){
    return math.fraction(getFactorial(n), math.multiply(getFactorial(k), getFactorial(n-k)));
}