// let input = document.querySelector('input')
// let search = document.querySelector('#icon')
// let cardGrid = document.querySelector('.card-grid')

// addEventListener('submit', (e)=>{
//     e.preventDefault();
//     console.log(input.value);
//     let contStr = ''
//     let drinkSearch = input.value
//     fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=${drinkSearch}`)
//     .then(result => result.json())
//     .then(data =>{
//         for(let i = 0; i < data['drinks'].length; i ++){
//             //! sets variable for drink index
//             // let modalContainer = document.createElement('div')
//             let drink = data['drinks'][i]
//             console.log(drink);
//             console.log(drink.strDrinkThumb)
//             // let container = document.createElement('div')
//             // container.setAttribute('class', 'drink')
//             contStr += `<a class="card" href="#${drink.idDrink}" id="${drink.strDrink}">
//             <div class="card__background" style="background-image: url(${drink.strDrinkThumb})"></div>
//             <div class="card__content">
//               <p class="card__category">${drink.strCategory}</p>
//               <h3 class="card__heading">${drink.strDrink}</h3>
//             </div>
//           </a>
//       `
//       // document.querySelector('.card-grid').innerHTML = conStr  
//         }
//         document.querySelector('.card-grid').innerHTML = contStr
//     })

    
// })

const drinkArr = []
const modal = document.querySelector('.md')
let input = document.querySelector('input')

document.addEventListener('submit', (e)=>{

  const randomDrinks = () => {
    e.preventDefault()
    let drinkSearch = (input.value)
    let promArr = []
    let randDrink =  fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=${drinkSearch}`).then(resp => resp.json())
    promArr.push(randDrink)
    return Promise.all(promArr)
}

// try{

    randomDrinks().then(data => {
        let htmlStr = ''
        console.log(data);
        data.forEach(drinkObj => {
            for(let i = 0; i < drinkObj.drinks.length; i++){
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
//}
// catch{
//     console.log(error);
// }

})

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

