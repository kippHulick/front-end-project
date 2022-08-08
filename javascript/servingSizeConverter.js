//get all possible serving sizes

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

//             for(let j = 0; j < drinkArr[i]['drinks'].length; j++){
    
//                 console.log(drinkArr[i]['drinks'].length);

//                 let i1 = drinkArr[i]['drinks'][j].strMeasure1
//                 let i2 = drinkArr[i]['drinks'][j].strMeasure2
//                 let i3 = drinkArr[i]['drinks'][j].strMeasure3
//                 let i4 = drinkArr[i]['drinks'][j].strMeasure4
//                 let i5 = drinkArr[i]['drinks'][j].strMeasure5
//                 let i6 = drinkArr[i]['drinks'][j].strMeasure6
//                 let i7 = drinkArr[i]['drinks'][j].strMeasure7
//                 let i8 = drinkArr[i]['drinks'][j].strMeasure8
//                 let i9 = drinkArr[i]['drinks'][j].strMeasure9
//                 let i10 = drinkArr[i]['drinks'][j].strMeasure10
//                 let i11 = drinkArr[i]['drinks'][j].strMeasure11
//                 let i12 = drinkArr[i]['drinks'][j].strMeasure12
//                 let i13 = drinkArr[i]['drinks'][j].strMeasure13
//                 let i14 = drinkArr[i]['drinks'][j].strMeasure14
//                 let i15 = drinkArr[i]['drinks'][j].strMeasure15
                
                
//                 MeasureArr.push(i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11, i12, i13, i14, i15)
                
//             }
//         }
//         catch(error){
//             console.error(error);
//         }
            
//             console.log(MeasureArr);
//         }
    

//         for(let j = 0; j <= MeasureArr.length; j++){
            
//             if(cache[MeasureArr[j]] == true ){

//             }
//             else{
//                 cache[MeasureArr[j]] = true
//                 unitTypes.push(MeasureArr[j])
//                 console.log(unitTypes);
//             }

//         }


// }

getSizes()


const unitConverter = async () =>{

    let drinkArr = [];
    let resultsArr = [];
    let unitTypes = [];
    let cache = {};
    

    let alphabet = 'abcdefghijklmnopqrstuvwxyz'

    for(let i = 0; i < alphabet.length; i++){

        let drinks = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${alphabet[i]}`);
        resultsArr = await drinks.json();
        
        drinkArr.push(resultsArr)
        
    }
    
    let MeasureArr = []

}
