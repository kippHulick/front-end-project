// https://www.thecocktaildb.com/api/json/v2/9973533/popular.php

// https://www.thecocktaildb.com/api.php

// Api key for the EDAMAM nutritional api
//7d67cd8d38672973b94c98b7764b8ff0
//app id 947442c5
// example URL https://api.edamam.com/api/nutrition-data?app_id=947442c5&app_key=7d67cd8d38672973b94c98b7764b8ff0&nutrition-type=cooking&ingr=1%20shot%20orange%20juice
//

// import { nutritionalApi } from './nutrition';



const drinkArr = []
const modal = document.querySelector('.md')

const randomDrinks = () => {
    let promArr = []
    let randDrink =  fetch('https://www.thecocktaildb.com/api/json/v2/9973533/popular.php').then(resp => resp.json())
    promArr.push(randDrink)
    return Promise.all(promArr)
}

try{

    randomDrinks().then(data => {
        let htmlStr = ''
        console.log(data);
        data.forEach(drinkObj => {
            for(let i = 0; i < 10; i++){
            let drink = drinkObj.drinks[i]
            drinkArr.push(drink)
            let { strDrink, strDrinkThumb, strCategory, idDrink } = drink
            htmlStr += 
        `<div class="card" id="${idDrink}" title="card" href="#">
            <div class="card__background" style="background-image: url(${strDrinkThumb})" id="${idDrink}" title="card"></div>
                <div class="card__content" id="${idDrink}" title="card">
                    <p class="card__category" id="${idDrink}" title="card">${strCategory}</p>
                    <h3 class="card__heading" id="${idDrink}" title="card">${strDrink}</h3>
                </div>
        </div>`
            }
        })
        
        document.querySelector('.card-grid').innerHTML = htmlStr
    })
}
catch{
    console.log("Can't fetch the random drinks!");
}


document.addEventListener('click', e => {
        
    if(e.target.title == 'card'){

        let thisId = e.target.id

        appearModal(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${thisId}`).then((result)=>{

            modal.innerHTML = result
            modal.style.display = 'flex';
        })

    }

    if(e.target.title == 'x'){

        modal.style.display = 'none';
    }

})



