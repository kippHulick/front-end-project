
let cardGrid = document.querySelector('.card-grid')

//! fetching top ten drinks
const getTopTen = async () => {
    let drinkArr = []
    let resultArr = []
    let index = 0
    
    do {let drinks = await fetch('https://www.thecocktaildb.com/api/json/v2/9973533/popular.php')
    resultArr = await drinks.json();

    drinkArr = [...drinkArr,...resultArr];

    console.log(drinkArr);}
    
    while (index<10){
        for (let i=0; i<10;i++){
        // console.log(data[0].length);
        //! loops through drink results
            //! sets variable for drink index
            let drink = data['drinks'][i]
            console.log(drink);
            let container = document.createElement('div')
            container.setAttribute('class', 'drink')
            container.innerHTML = `<a class="card" id="card" href="#">
            <div id="card" class="card__background" style="background-image: url(${drink.strDrinkThumb})"></div>
            <div id="card" class="card__content">
            <p id="card" class="card__category">${drink.strCategory}</p>
            <h3 id="card" class="card__heading">${drink.strDrink}</h3>
            </div>
        </a>`
            cardGrid.append(container);

        }
        index ++
    }   
    const modal = document.querySelector('#modal');
    const openModal = document.querySelector('.card')
    const closeModal = document.querySelector('.close-button')
    openModal.addEventListener('click', ()=>{
        modal.showModal();
       
    }) 
}


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


