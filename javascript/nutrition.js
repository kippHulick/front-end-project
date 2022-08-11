const nutritionalApi = (ingredientObj) => {
    let promArr = []
    for(var ingredient in ingredientObj){
        let measurement = ingredientObj[ingredient]
        console.log(measurement);
        let nutritionData = fetch(`https://api.edamam.com/api/nutrition-data?app_id=947442c5&app_key=7d67cd8d38672973b94c98b7764b8ff0&nutrition-type=cooking&ingr=${measurement}%20${ingredient}`).then(resp => resp.json())
        promArr.push(nutritionData)
    }
    return Promise.all(promArr)
}