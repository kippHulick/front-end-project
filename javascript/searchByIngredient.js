
class DrinkInfo{
    constructor(name, ingredients){
        
        this.name = name
        this.ingredients = ingredients
        
    }
    
}

const drinkArr = []
const modal = document.querySelector('.md')
let input = document.querySelector('input')


const getDrinks = async () => {
    
    // From this line to 232, alls that is being done is arrays are being made in order to fetch all of the avalible drinks from the api, a straightforward way to get every avalible drink was the API's 'list all cokctails by first letter', which was why I opted to loop through the alphabet. 
    let drinkArr = [];
    let resultsArr = [];
    let drinkInfoArr = [];
    let alphabet = '1234567890abcdefghijklmnopqrstuvwxyz';
    
    
    for(let i = 0; i < alphabet.length; i++){
        
        let drinks = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${alphabet[i]}`);
        resultsArr = await drinks.json();
        
        drinkArr.push(resultsArr)
    }
    
    console.log(drinkArr);
    
    for(let i = 0; i < drinkArr.length; i++){
        
        try{
            
            for(let j = 0; j < drinkArr[i].drinks.length; j++){
                
                
                let drinks = drinkArr[i].drinks[j]
                let ingArr = []
                
                for(let x = 1; x < 16; x++){
                    
                    ingredient = `strIngredient${x}`
                    
                    if(drinks[ingredient] != null){
                        
                        ingArr.push(drinks[ingredient])
                    }
                }
                
                let newDrink = new DrinkInfo(drinks.strDrink, ingArr)
                
                drinkInfoArr.push(newDrink)
            }
            
        }
        
        catch(error){
            
            console.log(error);
        }
    }
    
    document.addEventListener('submit', (e)=>{
        
        const randomDrinks = () => {
            
            e.preventDefault()
            let drinkSearch = (input.value)
            let promArr = []
            
            
            for(let i = 0; i < drinkInfoArr.length; i++){
                
                for(let j = 0; j < drinkInfoArr[i].ingredients.length; j++){
                    
                    if(drinkInfoArr[i].ingredients[j] == drinkSearch){
                        let randDrink =  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkInfoArr[i].name}`).then(resp => resp.json())
                        promArr.push(randDrink)
                    }
                }
            }
            //   let randDrink =  fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=${drinkSearch}`).then(resp => resp.json())
            //   promArr.push(randDrink)
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
    
}

getDrinks()


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