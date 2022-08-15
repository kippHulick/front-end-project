// Converts all ridiculous units of measurement used in the API to one standard unit, which is an oz.

let convertToOz ={
    'oz': 1,
    'shot': 1.5,
    'tsp': 0.174,
    'cl': 0.352,
    'qt': 33.31,
    'twist': 0,
    'spoon': 0.5204,
    'juice': 2,
    'crushed': 0.5,
    'to': 1,
    'fill': 1,
    'tblsp': 0.5204,
    'tbsp': 0.5204,
    'pinch':0.021,
    'dash': 0.0264,
    'aboutdrops': 0.0022,
    'drop': 0.0022,
    'chunk':1,
    'cube': 1,
    'wedge': 1,
    'small bottle':3,
    'pint': 16.65,
    'slice': 1,
    'squeeze': .5,
    'cup': 8,
    'bottle': 25.4,
    'milkeybottle': 25.4,
    'largebottle': 34,
    'dl':3.52,
    'gr': 0.002286,
    'l': 35.2,
    'ml': 0.035,
    'addml': 0.035,
    'sprig': 0.071,
    'largesprig': 0.9,
    'stick': 4,
    'can': 12,
    'glass': 12,
    'fullglass': 12,
    'garnish': 0.2,
    'inchstrips': 0.5,
    'strip': .5,
    'jigger': 1.5,
    'package': 1,
    'gal': 133.23,
    'lb': 16,
    'piece': 0.5,
    'splash': 0.5,
    'handful': 3,
    'scoop': 0.5,
    'fifth':25.4, 
    'top': 1, 
    'filltotopwith': 1,
    'part': 1.5
}

//Used to determine weather a character in a string is a number, this is necessary to split up the values in a single string
let isNumber = {'1': true,'2':true,'3':true,'4':true,'5':true,'6':true,'7':true,'8':true,'9':true,'0':true, '/':true, '.':true, ' ':true}

//Used to determine whether a character is a letter, you get the picture.
let isLetter = {'a':true,'b':true,'c':true,'d':true,'e':true,'f':true,'g':true,'h':true,'i':true,'j':true,'k':true,'l':true,'m':true,'n':true,'o':true,'p':true,'q':true,'r':true,'s':true,'t':true,'u':true,'v':true,'w':true,'x':true,'y':true,'z':true,}

//This is a fraction converter, it handles mixed and standard fractions and returns a float value for that combination, it even handles speical character "½". Syntax for this function is ("1 1/4") ("20/100") ("½") etc.
let fractionConverter = (fraction) =>{
    
    let whole = 0
    
    let decimal = 0
    if(fraction == "½"){
        return 0.5
    }

    for(let i = 0; i < fraction.length; i++){
    
        if(fraction[i + 1] == ' '){
            
            whole = fraction.slice(0, i + 1)
            whole = parseFloat(whole)
            
            fraction = fraction.slice(i + 2, fraction.length)
            
        }
    }

    for(let i = 0; i < fraction.length; i++){
        
        if(fraction[i] == '/'){
            
            let numerator = fraction.slice(0, i)
            let denomenator = fraction.slice(i + 1, fraction.length)
            
            decimal = numerator / denomenator
            decimal = parseFloat(decimal)
            
        }        
    }

    return whole + decimal

}

let measurementConverter = (string) => {
    
    string = string.toLowerCase()
    
    let quantity = ''
    
    let unitType = ''
    
    //This will loop through the measurement (labled 'string') it will assign to quantity is the numerical value associated with the measurement. i.e if ('5 oz') is passed to the function '5' will be assigned to quantity
    for(let i = 0; i < string.length; i++){
        
        if(isNumber[string[i]]){
            
            quantity += string[i]
            
        }
        else{
            
            break
        }
    }

    //This if statement ensures that measurements like "full glass" are still done correctly even if no numerical value is associated.
    if(quantity == ''){
        quantity = '1'
    }
    
    //This if statement removes a space being added to the end of a quantity, the reason this is being done becasuse the fraction converter does not like the space at the end of this string
    if(quantity[quantity.length -1] == ' '){
        
        quantity = quantity.slice(0, quantity.length -1)
        
    }
    
    // This loop does the same as the other one except this one handles assigns the measurement type to unitType variable.
    // Both of these loops stop execution once a match is found, meaning for some measurements that have multiple types, it will only utilize the first match.
    for(let i = 0; i < string.length; i++){
        
        if(isLetter[string[i]]){
            
            unitType += string[i]
            
            if(convertToOz[unitType] > 0){
                
                break;
            }
        }
        //This else if takes care of the fact that small bottle has a space inbetween it and would not be handled in the regular assignment above
        else if(unitType == "small"){
            
            unitType += " bottle"
            break;
        }
    }
    
    //quantityArr and the if statement below it are to ensure that if there is a fraction in the measurement, that it is converted to a decimal so the necessary caclculations can be made later.
    let quantityArr = quantity.split('')
    
    if(quantityArr.indexOf('/') > 0 || quantity == "½"){
        
        quantity = fractionConverter(quantity)
    }
    
    //This handles the edge case when there is a quantity like 'ingredient: cherrries' 'measurement: 2', if there's no unit type associated, then no transition to oz can be made. 
    if(unitType == '' || unitType == 'fresh'){
        
        return quantity + ' '
    }
    
    //passes the unit type to the dictionary which will convert 1 of that unit to oz. 
    let inOz = convertToOz[unitType]
    
    let final = quantity * inOz

    final += ' oz '

    return final

}

const nutritionalApi = (ingredientObj) => {
    let promArr = []
    for(var ingredient in ingredientObj){
        let measurement = ingredientObj[ingredient]
        let nutritionData = fetch(`https://api.edamam.com/api/nutrition-data?app_id=95d963af&app_key=b2f4825985da4db9f37accc1c6db55cd&nutrition-type=cooking&ingr=${measurement}%20${ingredient}`).then(resp => resp.json())
        promArr.push(nutritionData)
    }
    return Promise.all(promArr)
}

const fetchNutrition = async (drinkObj) => {
    let ingredients = {}
    for(let i = 0; i <15; i++){
        let ingredient = `strIngredient${i}`
        let measurement = `strMeasure${i}`
        if(drinkObj[ingredient] != null){
            let encodedIngredient = encodeURIComponent(drinkObj[ingredient])
            if(drinkObj[measurement] != null){
                let encodedMeasurement = encodeURIComponent(measurementConverter(drinkObj[measurement]))
                ingredients[encodedIngredient] = encodedMeasurement
            }
            else{
                ingredients[encodedIngredient] = 0
            }
        }
    }
    try{
        return  nutritionalApi(ingredients).then(data => data)
    }
    catch{
        console.log("can't get the nutritional data");
    }
}


const appearModal = async (web) =>{

    let drink = await fetch(web).then(resp => resp.json())

    drink = drink.drinks[0]

    console.log(drink);

    
    let calories = 0
    let instructions = ''
    let ingredientString = ''

    await fetchNutrition(drink).then((result) => {
        for(let i = 0; i < result.length; i++){
            calories += result[i].calories
        }
    })
    
    console.log(calories);

    for(let i = 0; i <15; i++){
        let ingredient = `strIngredient${i}`
        let measurement = `strMeasure${i}`
        if(drink[ingredient] != null){
            
          ingredientString += `${drink[measurement]} ${drink[ingredient]}, \n`
        }
    }
    
    instructions = drink['strInstructions']
    
    return  `                 
    
    <div class="modal-container" id="${drink.idDrink}">
    <div class="modal">
      <h1 class="modal__title">${drink.strDrink}</h1>
      <p class="modal__text"> Calories: ${calories}</p>
      <p class="modal__text"> Ingredients: ${ingredientString} </p>
      <p class="modal__text"> Instructions: ${instructions}</p>
      <button class="modal__btn">Button &rarr;</button>
      <a href="#" class="link-2" id="x" title='x'></a>
    </div>
  </div>`

}




