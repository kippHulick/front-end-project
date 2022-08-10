//get all possible serving sizes



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

//This function will convert 
let partsConverter = () =>{

}


// Converts all ridiculous units of measurement used in the API to one standard unit, which is an oz.
let convertToOz ={
    'oz': 1,
    'shot': 1.5,
    'tsp': 0.174,
    'cl': 0.352,
    'tblsp': 0.5204,
    'tbsp': 0.5204,
    'pinch':0.021,
    'dash': 0.021,
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
    'topup': 1, 
    'filltotopwith': 1,
}

//Used to determine weather a character in a string is a number, this is necessary to split up the values in a single string
let isNumber = {'1': true,'2':true,'3':true,'4':true,'5':true,'6':true,'7':true,'8':true,'9':true,'0':true, '/':true, '.':true, ' ':true}

//Used to determine whether a character is a letter, you get the picture.
let isLetter = {'a':true,'b':true,'c':true,'d':true,'e':true,'f':true,'g':true,'h':true,'i':true,'j':true,'k':true,'l':true,'m':true,'n':true,'o':true,'p':true,'q':true,'r':true,'s':true,'t':true,'u':true,'v':true,'w':true,'x':true,'y':true,'z':true,}


let measurementConverter = (string, url) => {
    
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

    if(unitType == 'part' || unitType == 'parts'){

        partsConverter(url)
    }

    let quantityArr = quantity.split('')
    
    if(quantityArr.indexOf('/') > 0){
        
        quantity = fractionConverter(quantity)
    }
    
    if(unitType == ''){

        return 'no unit type associated'
    }

    let inOz = convertToOz[unitType]

    
    return quantity * inOz
}






// const getSizes = async () => {
    
//     let drinkArr = [];
//     let resultsArr = [];
//     let unitTypes = [];
//     let cache = {};
    

//     let alphabet = 'abcdefghijklmnopqrstuvwxyz'

//     for(let i = 0; i < alphabet.length; i++){

//         let drinks = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${alphabet[i]}`);
//         resultsArr = await drinks.json();
        
//         drinkArr.push(resultsArr)
        
//     }
    
//     let MeasureArr = []

//     for(let i = 0; i < drinkArr.length; i++){

//         try{

//                 for(let j = 0; j < drinkArr[i]['drinks'].length; j++){
        

//                     let i1 = drinkArr[i]['drinks'][j].strMeasure1
//                     let i2 = drinkArr[i]['drinks'][j].strMeasure2
//                     let i3 = drinkArr[i]['drinks'][j].strMeasure3
//                     let i4 = drinkArr[i]['drinks'][j].strMeasure4
//                     let i5 = drinkArr[i]['drinks'][j].strMeasure5
//                     let i6 = drinkArr[i]['drinks'][j].strMeasure6
//                     let i7 = drinkArr[i]['drinks'][j].strMeasure7
//                     let i8 = drinkArr[i]['drinks'][j].strMeasure8
//                     let i9 = drinkArr[i]['drinks'][j].strMeasure9
//                     let i10 = drinkArr[i]['drinks'][j].strMeasure10
//                     let i11 = drinkArr[i]['drinks'][j].strMeasure11
//                     let i12 = drinkArr[i]['drinks'][j].strMeasure12
//                     let i13 = drinkArr[i]['drinks'][j].strMeasure13
//                     let i14 = drinkArr[i]['drinks'][j].strMeasure14
//                     let i15 = drinkArr[i]['drinks'][j].strMeasure15
                    
                    
//                     MeasureArr.push(i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11, i12, i13, i14, i15)
                    
//                 }
//             }

//             catch(error){
//                 console.error(error);
//             }
            
//     }
    

//     for(let j = 0; j <= MeasureArr.length; j++){
        
//         if(cache[MeasureArr[j]] == true ){

//         }
//             else{
//                     cache[MeasureArr[j]] = true
//                     unitTypes.push(MeasureArr[j])
                    
//                 }
                
//     }
            
        

//     console.log(unitTypes);

//     for(let i = 0; i < unitTypes.length; i++){
//         if(unitTypes[i] != null){

//             console.log(measurementConverter(unitTypes[i]))

//         }
//     }

// }
        
// getSizes()
