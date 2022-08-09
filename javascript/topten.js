
let cardGrid = document.querySelector('.card-grid')

fetch('https://www.thecocktaildb.com/api/json/v2/9973533/recent.php')
.then(results => results.json())
.then(data => {
    // console.log(data[0].length);
    for(let i = 0; i < 10; i ++){
        let drink = data['drinks'][i]
        console.log(drink);
        let container = document.createElement('div')
        container.setAttribute('class', 'drink')
        container.innerHTML = `<a class="card" href="#">
        <div class="card__background" style="background-image: url(${drink.strImageSource})"></div>
        <div class="card__content">
          <p class="card__category">${drink.strCategory}</p>
          <h3 class="card__heading">${drink.strDrink}</h3>
        </div>
      </a>`
      console.log(container);
        cardGrid.append(container)
    }
})

// const topTen = async () => {
//     let drinks = []
//     for(let i =0; i < 10; i++ ){
//         let randDrink = await fetch('https://www.thecocktaildb.com/api/json/v2/9973533/random.php').then(resp => resp.json())
//         promArr = [...promArr, ...randDrink]
//     }
//     let promise = await Promise(promArr)
//     return promise
// }

// randomDrinks().then(data => {
//     console.log({data});
// })


