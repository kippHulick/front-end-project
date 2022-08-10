// https://www.thecocktaildb.com/api.php

// Api key for the EDAMAM nutritional api
//7d67cd8d38672973b94c98b7764b8ff0
//app id 947442c5
// example URL https://api.edamam.com/api/nutrition-data?app_id=947442c5&app_key=7d67cd8d38672973b94c98b7764b8ff0&nutrition-type=cooking&ingr=1%20shot%20orange%20juice

const drinkArr = []
const modal = document.querySelector('#myModal')
const closeModal = document.getElementsByClassName('closse')[0]

const randomDrinks = () => {
    let promArr = []
    for(let i =0; i < 10; i++ ){
        let randDrink =  fetch('https://www.thecocktaildb.com/api/json/v2/9973533/random.php').then(resp => resp.json())
        promArr.push(randDrink)
    }
    return Promise.all(promArr)
}

try{
    randomDrinks().then(data => {
        let htmlStr = ''
        
        data.forEach(drinkObj => {
            let drink = drinkObj.drinks[0]
            drinkArr.push(drink)
            // console.log(drinkObj.drinks[0]);
            let { strDrink, strDrinkThumb, strCategory, idDrink } = drink
            htmlStr += `<div class="card" id="${idDrink}" href="#">
            <div class="card__background" style="background-image: url(${strDrinkThumb})"></div>
            <div class="card__content">
              <p class="card__category">${strCategory}</p>
              <h3 class="card__heading">${strDrink}</h3>
            </div>
          </div>`
        })
        // console.log(drinkArr);
        document.querySelector('.card-grid').innerHTML = htmlStr
    })
}
catch{
    console.log("Can't fetch the random drinks!");
}

let cards = document.querySelector('.card-grid')
cards.addEventListener('click', event => {
    let id = event.target.parentNode.id
    // console.log(event.target.parentNode);
    let result = drinkArr.find(item => item.idDrink === id)
    if(result != undefined || null){
        modal.style.display = 'block'
        console.log({id});
        console.log(result);
    }
})
