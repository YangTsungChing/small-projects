document.querySelector('#getDrink').addEventListener('click',getDrink)
let drinkData

function getDrink(){
    stopCarousel();
    drinkIndex=1

    let url ='https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
    const cocktail = document.querySelector('input').value.trim().split(" ").filter(char => char!=="").join(" ")
    
    fetch(url+cocktail)
            .then(res => res.json())
            .then(data =>{ console.log(data)
            drinkData=data;
            const firstDrink = data.drinks[0]
            document.querySelector('h2').innerText = firstDrink.strDrink;
            document.querySelector('img').src = firstDrink.strDrinkThumb;
            document.querySelector('h3').innerText = firstDrink.strInstructions
            
            })
            
        }

// creat two function to start / stop the carousel

let intervalId
let drinkIndex=1
function startCarousel(){
    if(!intervalId){
        intervalId = setInterval(changeToNextDrink,3000)
    }
}

function changeToNextDrink(){
    if(drinkIndex < drinkData.drinks.length){
        replace();
        drinkIndex++
    }else{
        drinkIndex = 0;
        replace();
        drinkIndex++
    }
    function replace(){
        const drinkObj = drinkData.drinks[drinkIndex]
        document.querySelector('h2').innerText = drinkObj .strDrink;
        document.querySelector('img').src = drinkObj .strDrinkThumb;
        document.querySelector('h3').innerText = drinkObj .strInstructions
    }

}
function stopCarousel(){
    clearInterval(intervalId);
    intervalId = null
  
}

document.querySelector('#stop').addEventListener('click',stopCarousel)
document.querySelector('#start').addEventListener('click',startCarousel)

