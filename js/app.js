'use strict';

var productsArr = [];
var totalClicks = 0;
var productsDiv = document.getElementById('products');
console.log(productsDiv);

var leftProductImage = document.getElementById('left');
var middleProductImage = document.getElementById('middle');
var rightProductImage = document.getElementById('right');

var currentLeft;
var currentmiddle;
var currentRight;

var leftImage = document.getElementById('left');
var middleImage = document.getElementById('middle');
var rightImage = document.getElementById('right');


function ProductImage(name, filePath) {
    this.name = name;
    this.filePath = filePath;
    this.numberOfClicks = 0;
    this.timesShown = 0;
    productsArr.push(this);
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

console.log(productsArr);

function printThreeImages() {

    var leftIndex = generateRandomNumber();
    var middleIndex = generateRandomNumber();
    var rightIndex = generateRandomNumber();

    while (leftIndex === middleIndex || leftIndex === rightIndex || middleIndex === rightIndex) {
        leftIndex = generateRandomNumber();
        middleIndex = generateRandomNumber();
    }

    currentLeft = productsArr[leftIndex];
    currentmiddle = productsArr[middleIndex];
    currentRight = productsArr[rightIndex];

    leftImage.setAttribute('src', currentLeft.filePath);
    middleImage.setAttribute('src', currentmiddle.filePath);
    rightImage.setAttribute('src', currentRight.filePath);

    productsArr[leftIndex].timesShown += 1;
    productsArr[middleIndex].timesShown += 1;
    productsArr[rightIndex].timesShown += 1;


}


function generateRandomNumber() {
    return Math.floor(Math.random() * productsArr.length);
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
                currentLeft.numberOfClicks += 1;

            }

            if (clickedElementId === 'middle') {
                currentmiddle.numberOfClicks += 1;

            }

            if (clickedElementId === 'right') {
                currentRight.numberOfClicks += 1;
            }
            printThreeImages();
        }
    }else {
        var resultList = document.getElementById('results');
        var listItemsHeader = document.createElement('h2');
        listItemsHeader.textContent = 'Results';
        resultList.appendChild(listItemsHeader);

        for(var i = 0 ; i < productsArr.length; i++){
            var listItem = document.createElement('li');
            listItem.textContent = productsArr[i].name + ' had ' + productsArr[i].numberOfClicks + ' votes and was shown ' + productsArr[i].timesShown + ' times';
            resultList.appendChild(listItem);
        }
    }

    
}

