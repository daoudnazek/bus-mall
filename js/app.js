'use strict';

var productsArr = [];
var productNames = [];
var totalClicks = 0;
var productsDiv = document.getElementById('products');

var currentLeft;
var currentmiddle;
var currentRight;

var previousLeftIndex;
var previousMiddleIndex;
var previousRightIndex;

var leftImage = document.getElementById('left');
var middleImage = document.getElementById('middle');
var rightImage = document.getElementById('right');

var totalClicksArr = [];
var timesShownArr = [];

function ProductImage(name, filePath) {
    this.name = name;
    this.filePath = filePath;
    this.numberOfClicks = 0;
    this.timesShown = 0;
    productsArr.push(this);
    productNames.push(this.name);
}

new ProductImage('Bag', 'img/bag.jpg');
new ProductImage('Banana', 'img/banana.jpg');
new ProductImage('Bathroom', 'img/bathroom.jpg');
new ProductImage('Boots', 'img/boots.jpg');
new ProductImage('Breakfast', 'img/breakfast.jpg');
new ProductImage('Bubblegum', 'img/bubblegum.jpg');
new ProductImage('Chair', 'img/chair.jpg');
new ProductImage('Cthulhu', 'img/cthulhu.jpg');
new ProductImage('Dog-Duck', 'img/dog-duck.jpg');
new ProductImage('Dragon', 'img/dragon.jpg');
new ProductImage('Pen', 'img/pen.jpg');
new ProductImage('Pet-Sweep', 'img/pet-sweep.jpg');
new ProductImage('Scissors', 'img/scissors.jpg');
new ProductImage('Shark', 'img/shark.jpg');
new ProductImage('Sweep', 'img/sweep.png');
new ProductImage('Tauntaun', 'img/tauntaun.jpg');
new ProductImage('Unicorn', 'img/unicorn.jpg');
new ProductImage('Usb', 'img/usb.gif');
new ProductImage('Water-Can', 'img/water-can.jpg');
new ProductImage('Wine-Glass', 'img/wine-glass.jpg');



function printThreeImages() {

    var forbiddenIndex = [];

    if (totalClicks > 0) {
        forbiddenIndex = [previousLeftIndex, previousMiddleIndex, previousRightIndex];
    }

    var leftIndex = generateRandomNumber(forbiddenIndex);
    forbiddenIndex.push(leftIndex);
    var middleIndex = generateRandomNumber(forbiddenIndex);
    forbiddenIndex.push(middleIndex);
    var rightIndex = generateRandomNumber(forbiddenIndex);

    previousLeftIndex = leftIndex;
    previousMiddleIndex = middleIndex;
    previousRightIndex = rightIndex;

    currentLeft = productsArr[leftIndex];
    currentmiddle = productsArr[middleIndex];
    currentRight = productsArr[rightIndex];

    leftImage.setAttribute('src', currentLeft.filePath);
    middleImage.setAttribute('src', currentmiddle.filePath);
    rightImage.setAttribute('src', currentRight.filePath);

    currentLeft.timesShown = Number(localStorage.getItem(currentLeft.name));
    currentLeft.timesShown += 1;
    localStorage.setItem(currentLeft.name,currentLeft.timesShown);
    currentmiddle.timesShown = Number(localStorage.getItem(currentmiddle.name));
    currentmiddle.timesShown += 1;
    localStorage.setItem(currentmiddle.name,currentmiddle.timesShown)
    currentRight.timesShown = Number(localStorage.getItem(currentRight.name));
    currentRight.timesShown += 1;
    localStorage.setItem(currentRight.name,currentRight.timesShown)


}

console.log(timesShownArr);
function generateRandomNumber(forbiddenIndex) {

    var allowed;
    var randomNumber;

    do {
        randomNumber = Math.floor(Math.random() * productsArr.length);
        allowed = true;
        for (var i = 0; i < forbiddenIndex.length; i++) {
            if (forbiddenIndex[i] === randomNumber) {
                allowed = false;
            }
        }
    } while (!allowed);

    return randomNumber;
}


printThreeImages();


productsDiv.addEventListener('click', handleClick);

function handleClick(event) {
    if (totalClicks < 25) {
        var clickedElement = event.target;
        var clickedElementId = clickedElement.id;

        if (clickedElementId === 'left' || clickedElementId === 'middle' || clickedElementId === 'right') {
            totalClicks++;


            if (clickedElementId === 'left') {
                currentLeft.numberOfClicks = Number(localStorage.getItem(currentLeft.name));
                currentLeft.numberOfClicks += 1;
                localStorage.setItem(currentLeft.name,currentLeft.numberOfClicks);
            }

            if (clickedElementId === 'middle') {
                currentmiddle.numberOfClicks = Number(localStorage.getItem(currentmiddle.name));
                currentmiddle.numberOfClicks += 1;
                localStorage.setItem(currentmiddle.name,currentmiddle.numberOfClicks );
            }

            if (clickedElementId === 'right') {
                currentRight.numberOfClicks = Number (localStorage.getItem(currentRight.name));
                currentRight.numberOfClicks += 1;
                localStorage.setItem(currentRight.name,currentRight.numberOfClicks);
            }
            printThreeImages();
            
        }

        
    } else {
        
        insertChart();
        productsDiv.removeEventListener('click', handleClick);
        
    }
}


function insertChart() {
    for (var i = 0; i < productsArr.length; i++) {
        totalClicksArr.push(productsArr[i].numberOfClicks);
    }

    for (var i = 0; i < productsArr.length; i++) {
        timesShownArr.push(productsArr[i].timesShown);
    }
    var ctx = document.getElementById('voteChart').getContext('2d');
    var voteChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: productNames,
            datasets: [{
                label: '# of Votes',
                data: totalClicksArr,
                backgroundColor:  'rgba(255, 255, 0, 1)',
                borderColor: 'rgba(255, 255, 0, 1)',
                borderWidth: 1
            },{
                label: '# of Times shown',
                data: timesShownArr,
                backgroundColor: 'rgba(0, 0, 35, 1)' , 
                borderColor:  'rgba(0, 0, 35, 1)',
                borderWidth: 1
            }], 
            
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    })
}




// function storeInLocalStorage(){
//     var numOfClicksTotal = 0;
//     var timesshowntotal = 0;
//     for (var i = 0; i< productsArr.length; i++){
//         var jasonString = productNames[i];
//          numOfClicksTotal = Number(productsArr.numberOfClicks);
//          timesshowntotal = Number (productsArr.timesShown);
//         localStorage.setItem(jasonString,Number(numOfClicksTotal));
//     }
   

// }
