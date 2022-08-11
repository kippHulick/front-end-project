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
  let modalStr = ''
  data.forEach(drinkObj => {
      for(let i =0; i<100;i++){
      let drink = drinkObj.drinks[i]
      console.log(drinkObj.drinks[i]);
      let { strDrink, strDrinkThumb, strCategory, idDrink } = drink
      htmlStr += `<a class="card" href="#${idDrink}" id="${strDrink}">
      <div class="card__background" style="background-image: url(${strDrinkThumb})"></div>
      <div class="card__content">
        <p class="card__category">${strCategory}</p>
        <h3 class="card__heading">${strDrink}</h3>
      </div>
    </a>
`
      modalStr += `      <div class="modal-container" id="${idDrink}">
      <div class="modal">
        <h1 class="modal__title">${strDrink}</h1>
        <p class="modal__text"> ${strCategory}</p>
        <button class="modal__btn">Button &rarr;</button>
        <a href="#" class="link-2"></a>
      </div>
    </div>
    </div>
      </div>`
      }
  })
  document.querySelector('.card-grid').innerHTML = htmlStr
  document.querySelector('.md').innerHTML = modalStr
})
