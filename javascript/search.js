let input = document.querySelector('input')
let search = document.querySelector('#icon')
let cardGrid = document.querySelector('.card-grid')

addEventListener('submit', (e)=>{
    e.preventDefault();
    console.log(input.value);
    let contStr = ''
    let drinkSearch = input.value
    fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=${drinkSearch}`)
    .then(result => result.json())
    .then(data =>{
        for(let i = 0; i < data['drinks'].length; i ++){
            //! sets variable for drink index
            // let modalContainer = document.createElement('div')
            let drink = data['drinks'][i]
            console.log(drink);
            console.log(drink.strDrinkThumb)
            // let container = document.createElement('div')
            // container.setAttribute('class', 'drink')
            contStr += `<a class="card" href="#${drink.idDrink}" id="${drink.strDrink}">
            <div class="card__background" style="background-image: url(${drink.strDrinkThumb})"></div>
            <div class="card__content">
              <p class="card__category">${drink.strCategory}</p>
              <h3 class="card__heading">${drink.strDrink}</h3>
            </div>
          </a>
      `
      // document.querySelector('.card-grid').innerHTML = conStr  
        }
        document.querySelector('.card-grid').innerHTML = contStr
    })

    
})