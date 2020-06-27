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


// .... Constructor Function For Products
function ProductImage(name, filePath) {
    this.name = name;
    this.filePath = filePath;
    this.numberOfClicks = 0;
    this.timesShown = 0;
    productsArr.push(this);
    productNames.push(this.name);
}

// .... Getting The Number of Clicks From The Local Storage to Reassign The Number Of Total Click  
if(localStorage.getItem('Number Of Clicks')){
    totalClicks = JSON.parse(localStorage.getItem('Number Of Clicks'));
}

// .... If Condition to check if There is Data of Products Array in the Local Storage, if Not Create New Object 
if(localStorage.getItem('All Products')){
    productsArr = JSON.parse(localStorage.getItem('All Products'));
    for(var i = 0; i< productsArr.length;i++){
        productNames.push(productsArr[i].name);
    }

}else{

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
}

// .... Function Of Displaying Three Unique Products Images 
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

    currentLeft.timesShown += 1;
    currentmiddle.timesShown += 1;
    currentRight.timesShown += 1;
}

// .... Function Of making Random Number To create Random Images 
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

// .... Inserting Event Listener to Submit User choice of Rounds Number And Its Function
var roundsNumber = document.getElementById('roundsNumber');
roundsNumber.addEventListener('submit',submitRoundsNumber);

var numberOfRounds = 25
function submitRoundsNumber(event){
    event.preventDefault();
    numberOfRounds = event.target.randomNumber.target
    return numberOfRounds;
}


if (localStorage.getItem('Max Clicks')){
    numberOfRounds = JSON.parse(localStorage.getItem('Max Clicks'));
}

// .... Insert Event Listener For Images Clicks Handling And Its Function 
productsDiv.addEventListener('click', handleClick);

function handleClick(event) {
    if (totalClicks < numberOfRounds) {
        var clickedElement = event.target;
        var clickedElementId = clickedElement.id;

        if (clickedElementId === 'left' || clickedElementId === 'middle' || clickedElementId === 'right') {
            totalClicks++;


            if (clickedElementId === 'left') {
                currentLeft.numberOfClicks += 1;
                storeInLocalStorage();
            }

            if (clickedElementId === 'middle') {
                currentmiddle.numberOfClicks += 1;
                storeInLocalStorage();
            }

            if (clickedElementId === 'right') {
                currentRight.numberOfClicks += 1;
                storeInLocalStorage();
            }
            printThreeImages();
            
        }

        
    } else {
        
        insertChart();
        productsDiv.removeEventListener('click', handleClick);
        numberOfRounds = numberOfRounds + 25;
        localStorage.setItem("Max Clicks",JSON.stringify(numberOfRounds));
    }
}

// .... Function For Inserting Chart Of The Number of Clicks and Showntime For Each Image 
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


// .... Function Of Storing Data In The Local Storage
storeInLocalStorage();
function storeInLocalStorage(){
    localStorage.setItem('All Products',JSON.stringify(productsArr));
    localStorage.setItem('Number Of Clicks',JSON.stringify(totalClicks));
}
