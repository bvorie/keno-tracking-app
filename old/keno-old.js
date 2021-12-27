window.onload = myCode();

function myCode() {
    var displayValues;
    // check whether the 'name' data item is stored in web Storage
    if (localStorage.getItem('savedValues') != null) {
        // if yes, loads saved into displayValues obj 
        displayValues = JSON.parse(localStorage.getItem('savedValues'));
        //loops through obj and sets html text
        Object.keys(displayValues).forEach(function(dispID) {
            document.getElementById(dispID).innerText = displayValues[dispID];
        })
        console.log("true" + displayValues);
        // if not saved, runs loadZeroDisplay function to create display value obj and set html text
    } else {
        loadZeroDisplay();
        console.log("false" + displayValues);
    } // end if localstorage


    //initialize global variables
    var A;
    var B;
    var C;
    var AB;
    var AC;
    var BC;
    var ABC;
    var won; // = +document.getElementById("won").innerText; //needed?
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
    document.getElementById("udButton").addEventListener("click", update);
    document.getElementById("udButton").addEventListener("click", clickAnim);
    document.getElementById("reset").addEventListener("click", reset);
    // click event function
    function update() {
       // animElems = document.querySelectorAll('p[class]');
       // animElems.forEach(function(element){this.classList.toggle('animated')});
        //onclick="this.classList.toggle('animated')"
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

        //step through each permutation with udSinceLast function
        permutations.forEach(udSinceLast);

        function udSinceLast(value, index) {

            let sinceLast = combo[value][0];
            hits = permValues[index];
            //  let sLA = +document.getElementById(sinceLast).innerText;
            //let sLA = displayValues[sinceLast];
            let winTable = combo[value][1];
            let totalTimes = combo[value][3];
            let coinsWay = combo[value][4];
            //    let spots=combo[value][2];
            displayValues[value] = hits;

            //check for 3/3,6/6,9/9; reset or increase sinceLast counters; increase way totals
            if (hits == combo[value][2]) {
                // if (hits == spots) {
                //  document.getElementById(sinceLast).innerText = 0;
                //   document.getElementById(totalTimes).innerText++;
                displayValues[sinceLast] = 0;
                displayValues[totalTimes] += 1;
            } else {
                //      document.getElementById(sinceLast).innerText = ++sLA;
                displayValues[sinceLast] += 1;
            }
            //add way winning to draw total won; display way winnings
            coinsMade += winTable[hits];
            //    document.getElementById(coinsWay).innerText = winTable[hits];
            displayValues[coinsWay] = winTable[hits];
       if (value != "ABC") {
            let list="list"+value+hits;
        console.log(list);
            displayValues[list]++;
       }
        }
        console.log("hits end value: " + hits);
        //increase hits table
        if (hits < 9) {
           let hitList = "list" + hits;
            //     document.getElementById(hitList).innerText++;
           displayValues[hitList]++;
        }
        //reset or increast any 3/3,6/6,7/9 8/9 9/9 sinceLastcounters
        if (A == 3 || B == 3 || C == 3) {
            //    document.getElementById("sinceLast3").innerText = 0;
            displayValues.sinceLast3 = 0;
        } else {
            //  document.getElementById("sinceLast3").innerText++;
            displayValues.sinceLast3++;
        }
        if (AB == 6 || AC == 6 || BC == 6) {
            //   document.getElementById("sinceLast6").innerText = 0;
            displayValues.sinceLast6 = 0;
        } else {
            //     document.getElementById("sinceLast6").innerText++;
            displayValues.sinceLast6++;
        }
        if (hits == 7) {
            //  document.getElementById("sinceLast7").innerText = 0;
            displayValues.sinceLast7 = 0;
        } else {
            //   document.getElementById("sinceLast7").innerText++;
            displayValues.sinceLast7++;
        }
        if (hits == 8) {
            //  document.getElementById("sinceLast8").innerText = 0;
            displayValues.sinceLast8 = 0;
        } else {
            //    document.getElementById("sinceLast8").innerText++;
            displayValues.sinceLast8++;
        }
        //increase/display coins played, total draws, total won, draw win
        // let coins = +document.getElementById("coinsPlayed").innerText;
        //   coins += 7;
        displayValues.coinsPlayed += 7;
        //  document.getElementById("coinsPlayed").innerText = coins;      
        // document.getElementById("totalDraws").innerText++;
        displayValues.totalDraws += 1;
        //  document.getElementById("coinsMade").innerText = coinsMade;
        displayValues.coinsMade = coinsMade;
        //add draw win to total win
        //      document.getElementById("won").innerText = won;
        displayValues.won += coinsMade;

        //save displayValues 
        console.log(displayValues);
        Object.keys(displayValues).forEach(function(dispID) {
            document.getElementById(dispID).innerText = displayValues[dispID];
        });
        localStorage.setItem("savedValues", JSON.stringify(displayValues));
        console.log(displayValues)
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


            "list0": 0, //addOne x102
            "list1": 0, //addOne x102
            "list2": 0, //addOne x102
            "list3": 0, //addOne x102
            "list4": 0, //addOne x102
            "list5": 0, //addOne x102
            "list6": 0, //addOne x102
            "list7": 0, //addOne x102
            "list8": 0, //addOne x102
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
           // localStorage.clear();
           // loadZeroDisplay();
          } else {
            return
          }
       
    }; //end function reset

    function clickAnim() {
      // console.log("click");
        var opacity = 0;
        var intervalID = 0;
        animElems = document.querySelectorAll('p[id]');
     //   console.log("animElements1" + animElems);

        animElems.forEach(function(element) {
        //    console.log("forEach " + element);

        //    console.log("opacity1 " + opacity);
            element.style.opacity = opacity;
        //    console.log("opacity2 " + element.style.opacity);
            intervalID = setInterval(opacityAnim, 70);

            function opacityAnim() {
                opacity = Number(window.getComputedStyle(element).getPropertyValue("opacity"));

                if (opacity < 1) {

                    opacity = opacity + 0.05;
                    element.style.opacity = opacity;
      //              console.log("opacity3 " + opacity);
                } else {
                    clearInterval(intervalID);
                }
            }
        })
    } //end function clickAnim

} //myCode


//function addOne (variable, spots, hits) {if (hits==spots) variable ++ }
//function sinceLast (variable, spots, hits) {if (hits==spots) {variable=0 else variable++}}
//NEEDS WORK! function anyAll (variable, spots, hits) {if (A==3 || B==3 || C==3) sinceLast3=0 else sinceLast3 ++; if (AB == 6 || AC == 6 || BC == 6) sinceLast 6 = 0 else sinceLast6++; if (ABC==8) sinceLast8 = 0 else sinceLast8++; if (ABC==7) sinceLast7=0 else sinceLast7++}
//function wayCoins (variable,payTable,hits) {variable=payTable[hits]; coinsMade+=wayCoins }

//input focus

//odd alerts
//%
//total win/loss
//fix errors?
//record progress over time (win/loss amt every x games?)

//3   .0139 72
//2   .1387  7.2
//1   .4309  2.3
//0   .4165  2.4

//6     .0001  7753
//5     .0031   323
//4     .0285   35
//3     .1298   7.7
//2     .3083   3.2
//1     .3635   2.8
//0     .1666   6

//9     7.2e7        1380687
//8      3.3e5       30682
//7      5.9e4       1690
//6      .0057       175
//5       .0326      30.7
//4       .1141      8.8
//3        .2461     4
//2        .3164     3
//1        .2207     4.5
//0        .0637     15.7

//if(sinceLast > hitFrequency) background-color:orange else if (sinceLast > 2* hitFrequency) background-color:pink

//USE CASE WHERE expectedTotal=totalDraws*hitProb if (total < .75*expectedTotal) {background-color:orange} else if (total < .5*expectedTotal) {background-color:pink} else if (total > 1.5*expectedTotal) {background-color:light green} else if (total > 2*expectedTotal) {background-color: green} 

//CHG list0 to listABC0 etc
//REMOVE != ABC from line 94
//REMOVE 102

//ADD TOOLTIPS

//ADD ODDS QUIRK FORMATTING
//  MAKE ARRAY FOR ID, %, FREQUENCY

