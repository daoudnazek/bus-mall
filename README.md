# Bus-Mall-project


**Synopsis**
 This is interacted website, it is web page of bus mall catalogue , that show the user three different images of available products , and let the users choose their favourite products. After multiple rounds it calculates the number of each products clicks and time shown in a bar chart. 


**Code Example**
 This is code example of a fuction that used to handle the number of clicks and calculte it.

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


**Motivation** 
This my third simple project in web developement and I am really excited to see what I can add for it in the future.


**License** MIT License

Copyright (c) 2020 DaoudNazek

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.