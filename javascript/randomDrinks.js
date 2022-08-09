// https://www.thecocktaildb.com/api.php


// Api key for the EDAMAM nutritional api
//7d67cd8d38672973b94c98b7764b8ff0
//app id 947442c5
// example URL https://api.edamam.com/api/nutrition-data?app_id=947442c5&app_key=7d67cd8d38672973b94c98b7764b8ff0&nutrition-type=cooking&ingr=1%20shot%20orange%20juice

const randomDrinks = async () => {
    let promArr = []
    for(let i =0; i < 10; i++ ){
        let randDrink = await fetch('https://www.thecocktaildb.com/api/json/v2/9973533/random.php').then(resp => resp.json())
        //promArr = [...promArr, randDrink]
        promArr.push(randDrink)
    }
    let promise = Promise.all(promArr)
    return promise
}

// randomDrinks().then(data => {
//     console.log({data});
// })

try{
    randomDrinks().then(data => {
        let htmlStr = ''
        // console.log(data);
        data.forEach(drinkObj => {
            let drink = drinkObj.drinks[0]
            console.log(drinkObj.drinks[0]);
            let { strDrink, strDrinkThumb } = drink
            htmlStr += `<a class="card" href="#">
            <div class="card__background" style="background-image: url(${strDrinkThumb})"></div>
            <div class="card__content">
              <p class="card__category">Liquor</p>
              <h3 class="card__heading">${strDrink}</h3>
            </div>
          </a>`
        })

        document.querySelector('.card-grid').innerHTML = htmlStr

    })
}
catch{
    console.log("Can't fetch the random drinks!");
}


// fetchResults = async function(){
//     let charArr = []
//     let char = ''
//     for(let i = 0; i<=43; i++){
//         char = await fetch(`https://www.anapioficeandfire.com/api/characters?page=${i}&pageSize=50`).then(resp => resp.json())
//         charArr = [...charArr, ...char]
//     }
//     let houseArr = []
//     let house = ''
//     for(let i = 0; i<=9; i++){
//         house = await fetch(`https://www.anapioficeandfire.com/api/houses?page=${i}&pageSize=50`).then(resp => resp.json())
//         houseArr = [...houseArr, ...house]
//     }
//     let promise = await Promise.all([charArr, houseArr])
//     return promise
// }