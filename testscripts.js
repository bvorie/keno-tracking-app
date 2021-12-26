window.onload = myCode();

function myCode() {

    var displayValues;
    // check whether the 'name' data item is stored in web Storage
    if (localStorage.getItem('testValues') != null) {
        // if yes, loads saved into displayValues obj 
        displayValues = JSON.parse(localStorage.getItem('testValues'));
        //loops through obj and sets html text
        Object.keys(displayValues).forEach(function(dispID) {
            document.getElementById(dispID).innerText = displayValues[dispID];           
        })
        // if not saved, runs loadZeroDisplay function to create display value obj and set html text
    } else {
        loadZeroDisplay();
        console.log("false" + displayValues);
    } // end if localstorage

    document.hitInput.inputA.focus();
    //initialize global variables
    var A;
    var B;
    var C;
    var AB;
    var AC;
    var BC;
    var ABC;
    const log = [];
    //load constants
    const permutations = ['A', 'B', 'C', 'AB', 'AC', 'BC', 'ABC'];
    const winTable3 = [0, 0, 2, 48];
    const winTable6 = [0, 0, 0, 3, 4, 75, 1600];
    const winTable9 = [0, 0, 0, 0, 1, 6, 44, 340, 4700, 10000];

    // better way to do this?
    const combo = {
        'A': ['sinceLastA', winTable3, 3, 'totalA', 'coinsA'],
        'B': ['sinceLastB', winTable3, 3, 'totalB', 'coinsB'],
        'C': ['sinceLastC', winTable3, 3, 'totalC', 'coinsC'],
        'AB': ['sinceLastAB', winTable6, 6, 'totalAB', 'coinsAB'],
        'AC': ['sinceLastAC', winTable6, 6, 'totalAC', 'coinsAC'],
        'BC': ['sinceLastBC', winTable6, 6, 'totalBC', 'coinsBC'],
        'ABC': ['sinceLastABC', winTable9, 9, 'totalABC', 'coinsABC']
    };
    // event listener for update  
    document.getElementById("inputA").oninput = inputCheck;
    document.getElementById("inputB").oninput = inputCheck;
    document.getElementById("inputC").oninput = inputCheck;

    function inputCheck() {
        if (document.getElementById("inputA").validity.valid && document.getElementById("inputB").validity.valid && document.getElementById("inputC").validity.valid) {
            document.hitInput.inputButton.disabled = false;
        } else {
            document.hitInput.inputButton.disabled = true;
        }
    };

    document.getElementById("udButton").addEventListener("click", update);
    document.getElementById("udButton").addEventListener("click", clickAnim);
    document.getElementById("reset").addEventListener("click", reset);
    // click event function
    function update() {

        //get input data and calculate ways
        A = +document.getElementById('inputA').value;
        B = +document.getElementById('inputB').value;
        C = +document.getElementById('inputC').value;
        AB = A + B;
        AC = A + C;
        BC = B + C;
        ABC = A + B + C;
        let coinsMade = 0;
        let hits = 0;

        var permValues = [A, B, C, AB, AC, BC, ABC];

        let date=Date.now();
        let entry = {[date]: [displayValues.totalDraws,A,B,C]};
        log.push(entry);
        console.table(log);
        //step through each permutation with udSinceLast function
        permutations.forEach(udSinceLast);

        function udSinceLast(value, index) {

            let sinceLast = combo[value][0];
            hits = permValues[index];
            let winTable = combo[value][1];
            let totalTimes = combo[value][3];
            let coinsWay = combo[value][4];          
            displayValues[value] = hits;

            //check for 3/3,6/6,9/9; reset or increase sinceLast counters; increase way totals
            if (hits == combo[value][2]) {             
                displayValues[sinceLast] = 0;
                displayValues[totalTimes] += 1;
            } else {            
                displayValues[sinceLast] += 1;
            }
            //add way winning to draw total won; display way winnings
            coinsMade += winTable[hits];
          
            displayValues[coinsWay] = winTable[hits];

            let list = "list" + value + hits;
            displayValues[list]++;
        }

        //reset or increast any 3/3,6/6,7/9 8/9 9/9 sinceLastcounters
        if (A == 3 || B == 3 || C == 3) {
            displayValues.sinceLast3 = 0;
        } else {
            displayValues.sinceLast3++;
        }

        if (AB == 6 || AC == 6 || BC == 6) {
            displayValues.sinceLast6 = 0;
        } else {
            displayValues.sinceLast6++;
        }

        if (hits == 7) {
            displayValues.sinceLast7 = 0;
        } else {
            displayValues.sinceLast7++;
        }

        if (hits == 8) {
            displayValues.sinceLast8 = 0;
        } else {
            displayValues.sinceLast8++;
        }

        displayValues.coinsPlayed += 7;

        displayValues.totalDraws += 1;

        displayValues.coinsMade = coinsMade;

        displayValues.won += coinsMade;

        //save displayValues 
        Object.keys(displayValues).forEach(function(dispID) {         
            document.getElementById(dispID).innerText = displayValues[dispID];
        });

        localStorage.setItem("testValues", JSON.stringify(displayValues));
       
        oddsFormatting();

        document.getElementById('inputA').value = "";
        document.getElementById('inputB').value = "";
        document.getElementById('inputC').value = "";
        document.hitInput.inputA.focus();
    } // end function update

    //sets displayValues obj to all zeros sets html text 
    function loadZeroDisplay() {

        displayValues = {
            "totalDraws": 0, //addOne x142
            "won": 0, //=won+coinsMade  x147
            "coinsPlayed": 0, //=coinsPlayed+7 x139
            "totalAB": 0, //addOne x85
            "totalAC": 0, //addOne x85
            "totalBC": 0, //addOne x85
            "totalA": 0, //addOne x85
            "totalB": 0, //addOne x85
            "totalC": 0, //addOne x85

            "coinsMade": 0, // +=  x144
            "ABC": 0, //=A+B+C x58
            "AB": 0, //=A+B x55
            "AC": 0, //=A+C x56
            "BC": 0, //=B+C x57
            "A": 0, //input x52
            "B": 0, //input x53
            "C": 0, //input x54
            "coinsABC": 0, //wayCoins x91
            "coinsAB": 0, //wayCoins x91
            "coinsAC": 0, //wayCoins x91
            "coinsBC": 0, //wayCoins xx91
            "coinsA": 0, //wayCoins xx91
            "coinsB": 0, //wayCoins xx91
            "coinsC": 0, //wayCoins xx91


            "sinceLastABC": 0, //sinceLast x88
            "sinceLastAB": 0, //sinceLast x88
            "sinceLastAC": 0, //sinceLast x88
            "sinceLastBC": 0, //sinceLast x88
            "sinceLastA": 0, //sinceLast x88
            "sinceLastB": 0, //sinceLast x88
            "sinceLastC": 0, //sinceLast x88

            "sinceLast8": 0, //anyAll x129
            "sinceLast7": 0, //anyAll  x122  
            "sinceLast6": 0, //anyAll  x115
            "sinceLast3": 0, //anyAll x110


            "listABC0": 0, //addOne x102
            "listABC1": 0, //addOne x102
            "listABC2": 0, //addOne x102
            "listABC3": 0, //addOne x102
            "listABC4": 0, //addOne x102
            "listABC5": 0, //addOne x102
            "listABC6": 0, //addOne x102
            "listABC7": 0, //addOne x102
            "listABC8": 0, //addOne x102
            "listABC9": 0, //addOne x102
            "totalABC": 0, //addOne x85

            "listA0": 0, //addOne x94
            "listA1": 0, //addOne x94
            "listA2": 0, //addOne x94
            "listA3": 0, //addOne x94
            "listB0": 0, //addOne x94
            "listB1": 0, //addOne x94
            "listB2": 0, //addOne x94
            "listB3": 0, //addOne x94
            "listC0": 0, //addOne x94
            "listC1": 0, //addOne x94
            "listC2": 0, //addOne x94
            "listC3": 0, //addOne x94

            "listAB0": 0, //addOne x94
            "listAB1": 0, //addOne x94
            "listAB2": 0, //addOne x94
            "listAB3": 0, //addOne x94
            "listAB4": 0, //addOne x94
            "listAB5": 0, //addOne x94
            "listAB6": 0, //addOne x94
            "listAC0": 0, //addOne x94
            "listAC1": 0, //addOne x94
            "listAC2": 0, //addOne x94
            "listAC3": 0, //addOne x94
            "listAC4": 0, //addOne x94
            "listAC5": 0, //addOne x94
            "listAC6": 0, //addOne x94

            "listBC0": 0, //addOne x94
            "listBC1": 0, //addOne x94
            "listBC2": 0, //addOne x94
            "listBC3": 0, //addOne x94
            "listBC4": 0, //addOne x94
            "listBC5": 0, //addOne x94
            "listBC6": 0 //addOne x94
        }
        //loops through obj and sets text to 0 for each id#
        Object.keys(displayValues).forEach(function(dispID) {
            document.getElementById(dispID).innerText = 0
        }) //end forEach

    } //end function loadZeroDisplay

    function reset() {
        if (confirm("Do you want to delete saved data?")) {
             localStorage.clear();
             loadZeroDisplay();
        } else {
            return
        }
    }; //end function reset

    function clickAnim() {
        var opacity = 0;
        var intervalID = 0;
        animElems = document.querySelectorAll('p[id]');
 
        animElems.forEach(function(element) {           
            element.style.opacity = opacity;          
            intervalID = setInterval(opacityAnim, 70);

            function opacityAnim() {
                opacity = Number(window.getComputedStyle(element).getPropertyValue("opacity"));

                if (opacity < 1) {
                    opacity = opacity + 0.05;
                    element.style.opacity = opacity;
                } else {
                    clearInterval(intervalID);
                }
            }
        })
    } //end function clickAnim

    // Catch	Combinations    
    // 3    	1140    72.07
    // 2    	11400   7.21
    // 1	    35400   2.32
    // 0    	34220   2.40
    // Total	82160

    // Catch 	Combinations	
    // 6    	38760   	7752.84
    // 5	    930240  	323.04
    // 4    	8575650	    35.04
    // 3	    39010800	7.70
    // 2	    92650650	3.24
    // 1	    109230240	2.75
    // 0	    50063860	6.00
    // Total 	300500200	

    // Catch 	Combinations	
    // 9    	167960  	1380687.65
    // 8	    7558200 	30681.95
    // 7    	137210400	1690.11
    // 6    	1326367200	174.84
    // 5	    7560293040	30.67
    // 4    	26461025640	8.76
    // 3    	57072800400	4.06
    // 2    	73379314800	3.16
    // 1    	51172416900	4.53
    // 0    	14783142660	15.69
    // Total 	231900297200	


    function oddsFormatting() {
        var hitFrequency = {

            "won": 1.0638, //=won+coinsMade  x147

            "listABC0": 15.69, //addOne x102
            "listABC1": 4.53, //addOne x102
            "listABC2": 3.16, //addOne x102
            "listABC3": 4.06, //addOne x102
            "listABC4": 8.76, //addOne x102
            "listABC5": 30.67, //addOne x102
            "listABC6": 174.84, //addOne x102
            "listABC7": 1690.11, //addOne x102
            "listABC8": 30681.95, //addOne x102
            "listABC9": 1380687.65, //addOne x102
            "totalABC": 1380687.65, //addOne x85

            "listA0": 2.40, //addOne x94
            "listA1": 2.32, //addOne x94
            "listA2": 7.21, //addOne x94
            "listA3": 7.21, //addOne x94

            "listB0": 2.40, //addOne x94
            "listB1": 2.32, //addOne x94
            "listB2": 7.21, //addOne x94
            "listB3": 72.07, //addOne x94

            "listC0": 2.40, //addOne x94
            "listC1": 2.32, //addOne x94
            "listC2": 7.21, //addOne x94
            "listC3": 72.07, //addOne x94

            "listAB0": 6.00, //addOne x94
            "listAB1": 2.75, //addOne x94
            "listAB2": 3.24, //addOne x94
            "listAB3": 7.70, //addOne x94
            "listAB4": 35.04, //addOne x94
            "listAB5": 323.04, //addOne x94
            "listAB6": 7752.84, //addOne x94

            "listAC0": 6.00, //addOne x94
            "listAC1": 2.75, //addOne x94
            "listAC2": 3.24, //addOne x94
            "listAC3": 7.70, //addOne x94
            "listAC4": 35.04, //addOne x94
            "listAC5": 323.04, //addOne x94
            "listAC6": 7752.84, //addOne x94

            "listBC0": 6.00, //addOne x94
            "listBC1": 2.75, //addOne x94
            "listBC2": 3.24, //addOne x94
            "listBC3": 7.70, //addOne x94
            "listBC4": 35.04, //addOne x94
            "listBC5": 323.04, //addOne x94
            "listBC6": 7752.84, //addOne x94

            "totalAB": 7752.84, //addOne x85 XX
            "totalAC": 7752.84, //addOne x85 XX
            "totalBC": 7752.84, //addOne x85 XX

            "totalA": 72.07, //addOne x85 XX
            "totalB": 72.07, //addOne x85 XX
            "totalC": 72.07, //addOne x85 XX
        };

        var sinceLastFreq = {
            "sinceLastABC": 1380687.65, //sinceLast x88 XX
            "sinceLastAB": 7752.84, //sinceLast x88 XX
            "sinceLastAC": 7752.84, //sinceLast x88 XX
            "sinceLastBC": 7752.84, //sinceLast x88 XX
            "sinceLastA": 72.07, //sinceLast x88 XX
            "sinceLastB": 72.07, //sinceLast x88 XX
            "sinceLastC": 72.07, //sinceLast x88 XX

            "sinceLast8": 30681.95, //anyAll x129 XX
            "sinceLast7": 1690.11, //anyAll  x122  XX
            "sinceLast6": 2583.98, //anyAll  x115 XX
            "sinceLast3": 24.37, //anyAll x110 XX
        };

        Object.keys(hitFrequency).forEach(function(dispID) {
            if (displayValues[dispID] != 0) {
                let expectedTotal = displayValues.totalDraws / hitFrequency[dispID];

                let parentID = dispID + "card";

                let container = document.getElementById(parentID);

                if (displayValues[dispID] < (.5 * expectedTotal)) {
                    container.style.backgroundColor = '#ff66ff';
                } else if (displayValues[dispID] < (.75 * expectedTotal)) {
                    container.style.backgroundColor = '#ffccff';
                } else if (displayValues[dispID] > (1.5 * expectedTotal)) {
                    container.style.backgroundColor = '#c6ffb380';
                } else if (displayValues[dispID] > (2 * expectedTotal)) {
                    container.style.backgroundColor = '#79ff4d80';
                } else {
                    container.style.backgroundColor = '#ffffffcc';
                }
            }
        });

        Object.keys(sinceLastFreq).forEach(function(dispID) {
            if (displayValues[dispID] != 0) {
                let expectedValue = sinceLastFreq[dispID];

                let parentID = dispID + "card";

                let container = document.getElementById(parentID);

                if (displayValues[dispID] > (2 * expectedValue)) {
                    container.style.backgroundColor = '#ff666680';
                } else if (displayValues[dispID] > (1.5 * expectedValue)) {
                    container.style.backgroundColor = '#ff999980';
                } else if (displayValues[dispID] > (expectedValue)) {
                    container.style.backgroundColor = '#ffe6e680';
                } else {
                    container.style.backgroundColor = '#ffffffcc';
                }

            }
        });
    } //end function oddsFormatting

} //end myCode