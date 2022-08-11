
let cardGrid = document.querySelector('.card-grid')
let hero = document.querySelector('.hero-section')

//! fetching top ten drinks
fetch('https://www.thecocktaildb.com/api/json/v2/9973533/popular.php')
.then(results => results.json())
.then(data => {
    // console.log(data[0].length);
    //! loops through drink results
    for(let i = 0; i < 10; i ++){
        //! sets variable for drink index
        let modalContainer = document.createElement('div')
        let drink = data['drinks'][i]
        console.log(drink);
        let container = document.createElement('div')
        container.setAttribute('class', 'drink')
        container.innerHTML = `<a  class="card" href="#">
        <div class="card__background" style="background-image: url(${drink.strDrinkThumb})"></div>
        <div class="card__content">
          <p class="card__category">${drink.strCategory}</p>
          <h3 class="card__heading">${drink.strDrink}</h3>
          
        </div>
      </a>`
        cardGrid.append(container);
        modalContainer.innerHTML = `<div class="modal" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${drink.strDrink}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>`

      hero.append(modalContainer)
        

    }

    // const modal = document.querySelector('#modal');
    // const openModal = document.querySelector('.open-button')
    // const closeModal = document.querySelector('.close-button')
    // openModal.addEventListener('click', ()=>{
    //     modal.showModal();
    //     console.log('open');
       
    // })  
    // closeModal.addEventListener('click', () =>{
    //   modal.close();
    // })  
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


