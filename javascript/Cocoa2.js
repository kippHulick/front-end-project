const drinkArr = []
const modal = document.querySelector('.md')

const ordDrink = () => {
    let promArr = []
        let randDrink =  fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa').then(resp => resp.json())

    return Promise.all(promArr)
}

try{

    randomDrinks().then(data => {
        let htmlStr = ''
        
        data.forEach(drinkObj => {
            let drink = drinkObj.drinks[0]
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
        })

        modal.style.display = 'flex';
    }

    if(e.target.title == 'x'){

        modal.style.display = 'none';
    }

})

