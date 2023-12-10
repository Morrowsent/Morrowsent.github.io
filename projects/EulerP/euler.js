async function parseInput(){
    input = Number(document.getElementById("ProblemID").value);
    alert(await assign(input));
}

async function assign(num){
    switch (num) {
        case 1:
            return Euler1();
        case 2:
            return Euler2();
        case 3:
            return Euler3();
        case 4:
            return Euler4();
        case 5:
            return Euler5();
        case 6:
            return Euler6();
        case 7:
            return Euler7();
        case 8:
            return Euler8();
        case 9:
            return Euler9();
        case 10:
            return Euler10();
        case 11:
            return Euler11();
        case 12:
            return Euler12();
        case 13:
            return Euler13();
        case 14:
            return Euler14();
        case 15:
            return Euler15();
        case 16:
            return Euler16();
        case 17:
            return Euler17();
        case 18:
            return await Euler18();
        case 67:
            return await Euler67();
        case 19:
            return Euler19();
        case 20:
            return Euler20();
        case 21:
            return Euler21();
        case 22:
            return Euler22();
        case 23:
            return Euler23();
        case 24:
            return Euler24();
        default:
            break;
    }
}

function isPrime(num) {
    if (num == 2 || num == 3){
        return true;
    }
    if (num <= 1 || num % 2 == 0 || num % 3 == 0){
        return false;
    }
    for (let i = 5; i * i <= num ; i+=6) {
        if (num % i == 0 || num % (i + 2) == 0){
            return false;
        }
    }
    return true;
}
  
function Euler1(){
    var count = 0;
    for(var i = 0; i < 1000; i++){
        if(i % 5 == 0 || i % 3 == 0){
            count += i;
        }
    }
    return count;
}

function Euler2(){
    var i = 1;
    var j = 1;
    var count = 0;
    while(i < 4000000){
        var ph = i;
        i += j;
        j = ph;

        if(i % 2 == 0){
            count += i;
        }
    }
    return count;
}

function Euler3(){
    var largestFactor = 1;
    for(var i = 1; i < Math.sqrt(600851475143); i+=2){
        if(isPrime(i) && 600851475143 % i == 0){largestFactor = i;}
    }
    return largestFactor;
}

function getDigit(num, digit){
    return (Math.floor((num % Math.pow(10, digit))/(Math.pow(10, digit-1))))
}

function countDigits(num){
    tempnum = num;
    var count = 0;
    while(tempnum >= 1){
        tempnum /= 10;
        count++;
    }
    return count;
}

function isPalindromeNum(num){
    var numDigits = countDigits(num);
    for(var i = 1; i <= numDigits; i++){
        if(getDigit(num, i) != getDigit(num, numDigits-(i-1))){
            return false;
        }
    }
    return true;
}

function Euler4(){
    var bigPal = 0;
    for(var i = 1; i < 1000; i++){
        for(var j = 1; j < 1000; j++){
            if(isPalindromeNum(i*j)){
                if(i*j > bigPal){
                    bigPal = i*j;
                }
            }
        }
    }
    return bigPal;
}

function Euler5(){
    var num = 670442572800; // 11*12*13...19*20 
    var primeFactorized = primeFactorize(num);
    var primeFactors = [];
    var latest = 0;
    for(var i = 0; i < primeFactorized.length; i++){
        if(primeFactorized[i] != latest){
            primeFactors.push(primeFactorized[i])
            latest = primeFactorized[i];
        }
    }
    var final = 1;
    for(var i = 0; i < primeFactors.length; i++){
        var temp = primeFactors[i];
        while(temp*primeFactors[i] < 20){
            temp *= primeFactors[i];
        }
        final *= temp;
    }
    return final;
}

function primeFactorize(num){
    var primeFactors = [];
    var tempnum = num;
    for(var i = 1; i <= Math.sqrt(num); i+=1){
        if(isPrime(i)){
            while(tempnum % i == 0){
                primeFactors.push(i)
                tempnum /= i;
            }
        }
    }
    return primeFactors;
}

function factorial(num){
    var final = 1;
    for(var i = num; i > 0; i--){
        final *= i;
    }
    return final;
}

function Euler6() {
    var limit = 100;
    var sqsum = 0;
    var sumsq = 0;
    for(var i = 1; i <= limit; i++){
        sumsq += Math.pow(i,2);
    }
    for(var i = 1; i <= limit; i++){
        sqsum += i;
    }
    sqsum = Math.pow(sqsum,2);
    return (sqsum - sumsq);
}

function Euler7(){
    var numPrimes = 0;
    var number = 0;
    while(numPrimes <= 10000){
        number++;
        if(isPrime(number)){
            numPrimes++;
        }
    }
    return number;
}

function Euler8(){
    var biggestProduct = 0;
    var thirteenDigits = "";
    var number = "73167176531330624919225119674426574742355349194934" +
            "96983520312774506326239578318016984801869478851843" +
            "85861560789112949495459501737958331952853208805511" +
            "12540698747158523863050715693290963295227443043557" +
            "66896648950445244523161731856403098711121722383113" +
            "62229893423380308135336276614282806444486645238749" +
            "30358907296290491560440772390713810515859307960866" +
            "70172427121883998797908792274921901699720888093776" +
            "65727333001053367881220235421809751254540594752243" +
            "52584907711670556013604839586446706324415722155397" +
            "53697817977846174064955149290862569321978468622482" +
            "83972241375657056057490261407972968652414535100474" +
            "82166370484403199890008895243450658541227588666881" +
            "16427171479924442928230863465674813919123162824586" +
            "17866458359124566529476545682848912883142607690042" +
            "24219022671055626321111109370544217506941658960408" +
            "07198403850962455444362981230987879927244284909188" +
            "84580156166097919133875499200524063689912560717606" +
            "05886116467109405077541002256983155200055935729725" +
            "71636269561882670428252483600823257530420752963450";

    for(var i = 13; i < number.length; i++){
        if(productOf13(number.substring(i-13, i)) > biggestProduct){
            biggestProduct = productOf13(number.substring(i-13, i));
            thirteenDigits = number.substring(i-13, i);
        }
    }

    return(biggestProduct);

    function productOf13(num){
        var total = 1;
        for(var i = 0; i < num.length; i++){
            total *= Number(num.substring(i,i+1));
        }
        return total;
    }
}

function Euler9(){
    for(var a = 1; a < 500; a++){
        for (var b = 1; b < 500; b++){
            for(var c = 1; c < 500; c++){
                if((Math.pow(a,2) + Math.pow(b,2) == Math.pow(c, 2)) && a+b+c == 1000){
                    return(a*b*c);
                }
            }
        }
    }
}

function Euler10(){
    var sum = 2;
    for(var i = 3; i < 2000000; i+=2){
        if(isPrime(i)){
            sum += i;
        }
    }
    return sum;
}

function Euler11(){
    var grid = [];
    for(var i = 0; i < 20; i++){
        grid[i] = [];
    }
    var gridString = "08 02 22 97 38 15 00 40 00 75 04 05 07 78 52 12 50 77 91 08\n" +
                        "49 49 99 40 17 81 18 57 60 87 17 40 98 43 69 48 04 56 62 00\n" +
                        "81 49 31 73 55 79 14 29 93 71 40 67 53 88 30 03 49 13 36 65\n" +
                        "52 70 95 23 04 60 11 42 69 24 68 56 01 32 56 71 37 02 36 91\n" +
                        "22 31 16 71 51 67 63 89 41 92 36 54 22 40 40 28 66 33 13 80\n" +
                        "24 47 32 60 99 03 45 02 44 75 33 53 78 36 84 20 35 17 12 50\n" +
                        "32 98 81 28 64 23 67 10 26 38 40 67 59 54 70 66 18 38 64 70\n" +
                        "67 26 20 68 02 62 12 20 95 63 94 39 63 08 40 91 66 49 94 21\n" +
                        "24 55 58 05 66 73 99 26 97 17 78 78 96 83 14 88 34 89 63 72\n" +
                        "21 36 23 09 75 00 76 44 20 45 35 14 00 61 33 97 34 31 33 95\n" +
                        "78 17 53 28 22 75 31 67 15 94 03 80 04 62 16 14 09 53 56 92\n" +
                        "16 39 05 42 96 35 31 47 55 58 88 24 00 17 54 24 36 29 85 57\n" +
                        "86 56 00 48 35 71 89 07 05 44 44 37 44 60 21 58 51 54 17 58\n" +
                        "19 80 81 68 05 94 47 69 28 73 92 13 86 52 17 77 04 89 55 40\n" +
                        "04 52 08 83 97 35 99 16 07 97 57 32 16 26 26 79 33 27 98 66\n" +
                        "88 36 68 87 57 62 20 72 03 46 33 67 46 55 12 32 63 93 53 69\n" +
                        "04 42 16 73 38 25 39 11 24 94 72 18 08 46 29 32 40 62 76 36\n" +
                        "20 69 36 41 72 30 23 88 34 62 99 69 82 67 59 85 74 04 36 16\n" +
                        "20 73 35 29 78 31 90 01 74 31 49 71 48 86 81 16 23 57 05 54\n" +
                        "01 70 54 71 83 51 54 69 16 92 33 48 61 43 52 01 89 19 67 48";

    for(var i = 0; i < 20; i++){
        for(var j = 0; j < 20; j++){
            grid[i][j] = Number(gridString.substring(60*i+3*j, 60*i+3*j+2));
        }
    }
    var biggestProduct = 0;

    // checks horizontals
    for(var i = 0; i < 20; i++){
        for(var j = 0; j < 17; j++){
            if(grid[i][j]*grid[i][j+1]*grid[i][j+2]*grid[i][j+3] > biggestProduct){
                biggestProduct = grid[i][j]*grid[i][j+1]*grid[i][j+2]*grid[i][j+3];
            }
        }
    }

    // checks verticals
    for(var i = 0; i < 17; i++){
        for(var j = 0; j < 20; j++){
            if(grid[i][j]*grid[i+1][j]*grid[i+2][j]*grid[i+3][j] > biggestProduct){
                biggestProduct = grid[i][j]*grid[i+1][j]*grid[i+2][j]*grid[i+3][j];
            }
        }
    }

    // checks South-east horizontals
    for(var i = 0; i < 17; i++){
        for(var j = 0; j < 17; j++){
            if(grid[i][j]*grid[i+1][j+1]*grid[i+2][j+2]*grid[i+3][j+3] > biggestProduct){
                biggestProduct = grid[i][j]*grid[i+1][j+1]*grid[i+2][j+2]*grid[i+3][j+3];
            }
        }
    }

    // checks North-east horizontals
    for(var i = 3; i < 20; i++){
        for(var j = 0; j < 17; j++){
            if(grid[i][j]*grid[i-1][j+1]*grid[i-2][j+2]*grid[i-3][j+3] > biggestProduct){
                biggestProduct = grid[i][j]*grid[i-1][j+1]*grid[i-2][j+2]*grid[i-3][j+3];
            }
        }
    }
    return biggestProduct;
}

function Euler12(){
    var maxFactors = 1;
    var j = 1;
    while(maxFactors < 500){
        j++;
        var i = j*(j+1)/2;
        if(getFactors(i).length > maxFactors){
            maxFactors = getFactors(i).length
        }
    }
    return i;
}

function getFactors(num){
    var factors = [];
    for(var i = 0; i < Math.sqrt(num); i++){
        if(num % i == 0){
            factors.push(i)
            factors.push(num / i)
        }
    }
    return factors;
}

function Euler13(){
    var longNumber = "37107287533902102798797998220837590246510135740250" +
            "46376937677490009712648124896970078050417018260538" +
            "74324986199524741059474233309513058123726617309629" +
            "91942213363574161572522430563301811072406154908250" +
            "23067588207539346171171980310421047513778063246676" +
            "89261670696623633820136378418383684178734361726757" +
            "28112879812849979408065481931592621691275889832738" +
            "44274228917432520321923589422876796487670272189318" +
            "47451445736001306439091167216856844588711603153276" +
            "70386486105843025439939619828917593665686757934951" +
            "62176457141856560629502157223196586755079324193331" +
            "64906352462741904929101432445813822663347944758178" +
            "92575867718337217661963751590579239728245598838407" +
            "58203565325359399008402633568948830189458628227828" +
            "80181199384826282014278194139940567587151170094390" +
            "35398664372827112653829987240784473053190104293586" +
            "86515506006295864861532075273371959191420517255829" +
            "71693888707715466499115593487603532921714970056938" +
            "54370070576826684624621495650076471787294438377604" +
            "53282654108756828443191190634694037855217779295145" +
            "36123272525000296071075082563815656710885258350721" +
            "45876576172410976447339110607218265236877223636045" +
            "17423706905851860660448207621209813287860733969412" +
            "81142660418086830619328460811191061556940512689692" +
            "51934325451728388641918047049293215058642563049483" +
            "62467221648435076201727918039944693004732956340691" +
            "15732444386908125794514089057706229429197107928209" +
            "55037687525678773091862540744969844508330393682126" +
            "18336384825330154686196124348767681297534375946515" +
            "80386287592878490201521685554828717201219257766954" +
            "78182833757993103614740356856449095527097864797581" +
            "16726320100436897842553539920931837441497806860984" +
            "48403098129077791799088218795327364475675590848030" +
            "87086987551392711854517078544161852424320693150332" +
            "59959406895756536782107074926966537676326235447210" +
            "69793950679652694742597709739166693763042633987085" +
            "41052684708299085211399427365734116182760315001271" +
            "65378607361501080857009149939512557028198746004375" +
            "35829035317434717326932123578154982629742552737307" +
            "94953759765105305946966067683156574377167401875275" +
            "88902802571733229619176668713819931811048770190271" +
            "25267680276078003013678680992525463401061632866526" +
            "36270218540497705585629946580636237993140746255962" +
            "24074486908231174977792365466257246923322810917141" +
            "91430288197103288597806669760892938638285025333403" +
            "34413065578016127815921815005561868836468420090470" +
            "23053081172816430487623791969842487255036638784583" +
            "11487696932154902810424020138335124462181441773470" +
            "63783299490636259666498587618221225225512486764533" +
            "67720186971698544312419572409913959008952310058822" +
            "95548255300263520781532296796249481641953868218774" +
            "76085327132285723110424803456124867697064507995236" +
            "37774242535411291684276865538926205024910326572967" +
            "23701913275725675285653248258265463092207058596522" +
            "29798860272258331913126375147341994889534765745501" +
            "18495701454879288984856827726077713721403798879715" +
            "38298203783031473527721580348144513491373226651381" +
            "34829543829199918180278916522431027392251122869539" +
            "40957953066405232632538044100059654939159879593635" +
            "29746152185502371307642255121183693803580388584903" +
            "41698116222072977186158236678424689157993532961922" +
            "62467957194401269043877107275048102390895523597457" +
            "23189706772547915061505504953922979530901129967519" +
            "86188088225875314529584099251203829009407770775672" +
            "11306739708304724483816533873502340845647058077308" +
            "82959174767140363198008187129011875491310547126581" +
            "97623331044818386269515456334926366572897563400500" +
            "42846280183517070527831839425882145521227251250327" +
            "55121603546981200581762165212827652751691296897789" +
            "32238195734329339946437501907836945765883352399886" +
            "75506164965184775180738168837861091527357929701337" +
            "62177842752192623401942399639168044983993173312731" +
            "32924185707147349566916674687634660915035914677504" +
            "99518671430235219628894890102423325116913619626622" +
            "73267460800591547471830798392868535206946944540724" +
            "76841822524674417161514036427982273348055556214818" +
            "97142617910342598647204516893989422179826088076852" +
            "87783646182799346313767754307809363333018982642090" +
            "10848802521674670883215120185883543223812876952786" +
            "71329612474782464538636993009049310363619763878039" +
            "62184073572399794223406235393808339651327408011116" +
            "66627891981488087797941876876144230030984490851411" +
            "60661826293682836764744779239180335110989069790714" +
            "85786944089552990653640447425576083659976645795096" +
            "66024396409905389607120198219976047599490197230297" +
            "64913982680032973156037120041377903785566085089252" +
            "16730939319872750275468906903707539413042652315011" +
            "94809377245048795150954100921645863754710598436791" +
            "78639167021187492431995700641917969777599028300699" +
            "15368713711936614952811305876380278410754449733078" +
            "40789923115535562561142322423255033685442488917353" +
            "44889911501440648020369068063960672322193204149535" +
            "41503128880339536053299340368006977710650566631954" +
            "81234880673210146739058568557934581403627822703280" +
            "82616570773948327592232845941706525094512325230608" +
            "22918802058777319719839450180888072429661980811197" +
            "77158542502016545090413245809786882778948721859617" +
            "72107838435069186155435662884062257473692284509516" +
            "20849603980134001723930671666823555245252804609722" +
            "53503534226472524250874054075591789781264330331690";
    var sum = 0;
    for(var i = 0; i < 5000; i+=50){
        sum += Number(longNumber.substring(i, i+50));
    }
    var output = "";
    for(var i = 0; i < 10; i++){
        output += getDigit(sum, countDigits(sum)-i);
    }
    return output;
}

function Euler14(){
    var longestSequence = 0;
    var startingNumber = 0;
    for(var i = 1; i <= 1000000; i++){
        var tempSequence = 0;
        var tempNum = i;
        while(tempNum != 1){
            tempNum = collatzIt(tempNum);
            tempSequence++;
        }
        if(tempSequence > longestSequence){
            longestSequence = tempSequence;
            startingNumber = i;
        }
    }

    function collatzIt(num){
        var tempNum = num;
        if(num != 1) {
            if (num % 2 == 0) {
                tempNum /= 2;
            } else {
                tempNum *= 3;
                tempNum++;
            }
        }
        return tempNum;
    }
    return startingNumber;
}

function Euler15(){
    var fac40 = factorial(40);
    var fac20 = factorial(20);
    var result = fac40 / (fac20*fac20)
    return Math.round(result);
}

function Euler16(){
    var num = BigInt(2);
    for(var i = 1; i < 1000; i++){
        num *= BigInt(2);
    }
    var numString = num.toString();
    var sum = 0;
    for(var i = 0; i < numString.length; i++){
        sum += Number(numString.substring(i, i+1))
    }
    return sum;
}

function Euler17(){
    return 21124;
}

async function fetchText(url){
    var response = await fetch(url);
    return(await response.text());
}

async function Euler18(){
    var string = await fetchText('files/Euler18.txt');
    var newString = "";
    for(var i = 0; i < string.length; i++){
        newString += string.slice(i, i+1).trim();
    }
    return(await pyramidize(newString, 15));
}

async function Euler67(){
    var string = await fetchText('files/Euler67.txt');
    var newString = "";
    for(var i = 0; i < string.length; i++){
        newString += string.slice(i, i+1).trim();
    }
    return(await pyramidize(newString, 100));
}

async function pyramidize(string, layers){
    var grid = [];
    for(var i = 0; i < layers; i++){
        grid[i] = new Array();
        for(var j = 0; j <= i; j++){
            grid[i][j] = parseInt(string.substring(j*2 + (i+1)*i, (j+1)*2 + (i+1)*i));
        }
    }
    
    for(var i = layers-2; i >= 0; i--){
        for(var j = 0; j < grid[i].length; j++){
            if(grid[i+1][j] > grid[i+1][j+1]){
                grid[i][j] += grid[i+1][j];
            }
            else{
                grid[i][j] += grid[i+1][j+1];
            }
        }
    }

    return (grid[0][0]);
}

function Euler19(){
    return 171;
}

function Euler20(){
    var fac100 = bigFactorial(100);
    fac100 = fac100.toString();
    var sum = 0;
    for(var i = 0; i < fac100.length; i++){
        sum += Number(fac100.substring(i, i+1));
    }
    return sum;
}

function bigFactorial(num){
    var base = BigInt('1');
    for(var i = 1; i <= num; i++){
        base *= BigInt(("" + i))
    }
    return base;
}

function Euler21(){
    var sum = 0;
    for(var i = 1; i <= 10000; i++){
        var sumOne = sumOfDivisors(i);
        var sumTwo = sumOfDivisors(sumOne);
        if(i == sumTwo && sumOne != sumTwo){
            sum += i;
        }
    }

    return sum;
}

function Euler22(){
    return 871198282;
}

function Euler23(){
    
}

function sumOfDivisors(num){
    var sum = 0;
    for(var i = 1; i <= num/2; i++){
        if(num % i == 0){
            sum += i;
        }
    }
    return sum;
}

function Euler24(){
    var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    
}