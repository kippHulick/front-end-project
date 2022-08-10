

// const ordDrink = () =>{
//     let stuff = []
//     for(let i =0; i<1000;i++){
//         fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink`)
//         .then((results)=>results.json())
//         .then(data=>{
//             const grid = document.querySelector('.card-grid')
//             console.log(data.drinks[i])
//             stuff.push(data.drinks[i])
//             console.log(stuff[i].strDrink)
//             grid.innerHTML += `<a class="card" href="#" id="${stuff[i].strDrink}">
//             <div class="card__background" style="background-image: url(${stuff[i].strDrinkThumb})"></div>
//             <div class="card__content">
//               <p class="card__category"></p>
//               <h3 class="card__heading">${stuff[i].strDrink}</h3>
//             </div>
//           </a>`




//     })

// }
// }

// ordDrink()


const ordDrink = async () => {
    let promArr = []
    for(let i =0; i < 1; i++ ){
        let randDrink = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink').then(resp => resp.json())
        promArr.push(randDrink)
    }
    let promise = await Promise.all(promArr)
    return promise
}
ordDrink().then(data => {
    let htmlStr = ''
    data.forEach(drinkObj => {
        for(let i =0; i<100;i++){
        let drink = drinkObj.drinks[i]
        console.log(drinkObj.drinks[i]);
        let { strDrink, strDrinkThumb, strCategory } = drink
        htmlStr += `<a class="card" href="#" id="${strDrink}">
        <div class="card__background" style="background-image: url(${strDrinkThumb})"></div>
        <div class="card__content">
          <p class="card__category">${strCategory}</p>
          <h3 class="card__heading">${strDrink}</h3>
        </div>
      </a>`
        }
    })
    document.querySelector('.card-grid').innerHTML = htmlStr
})
