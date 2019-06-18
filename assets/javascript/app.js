var queryUrl = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=10&ingredients=" + ingredient + "+";
var queryURL=  "https://the-cocktail-db.p.rapidapi.com/random.php"
var ingredient = ["eggs+", "apples+", "rice+"];
var queryUrl = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=10&ingredients=" + ingredient + "+";
var recipeIdArray = [];
var recipeTitleArray = [];
var recipeImageArray = [];
var recipeResultArray = [];
var recipeString;

$("#submit-btn").on("click", function () {
  displayRecipe()
  $("#recipe-section").empty();
});

function displayRecipe() {


  $.ajax({
    url: queryUrl,
    headers: {
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'X-RapidAPI-Key': '98db7bca28msh8d5ab6517d13d17p17dbecjsn45b21b9d6bda'
    },
    method: "GET"
  }).then(function (response) {

    for (var i = 0; i < 10; i++) {
      var recipeTitle = response[i].title;
      var recipeImage = response[i].image;

      recipeImageArray.push(recipeImage);
      recipeTitleArray.push(recipeTitle)
      recipeIdArray.push(response[i].id);

      recipeString = recipeIdArray.join('%2C');

    }

    console.log(recipeImageArray)
    console.log(recipeTitleArray)
    console.log(recipeIdArray)

    ajaxRecipeId();

    function ajaxRecipeId() {

      $.ajax({
        url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk?ids=" + recipeString,
        headers: {
          'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
          'X-RapidAPI-Key': '98db7bca28msh8d5ab6517d13d17p17dbecjsn45b21b9d6bda'
        },
        method: "GET"
      }).then(function (response) {
        for (var i = 0; i < 10; i++) {
          var recipeList = response[i].sourceUrl;
          recipeResultArray.push(recipeList)
        }
        showRecipe();
      })
    }
  })

};
$(document).ready(function (){
    $('#chosen-ingr-list').empty();
    $('.ingr-item').on("click", function(){
        if (!userSelection){
            var userSelection= $(this).text().trim()+" "
            var ingrBtn= $("<span>")
            ingrBtn.attr("class","chosen-ingr-item tag is-medium")
            var ingrDelete= $('<button>')
            ingrDelete.attr("class","delete is-small")
                ingrBtn.append(userSelection,ingrDelete)
            $('#chosen-ingr-list').append(ingrBtn)
            console.log(userSelection)
        }
        
    //end of click function //
})}) //end .ready function//

    $.ajax({
        url: queryURL,
        headers: {
            "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
            "X-RapidAPI-Key": "147749aee4mshcd867948b97e9f7p16bdacjsn257d0be55a77"
        },
        method:"GET"
    }).then(function (response) {
        for (var i= 0; i< 1; i++){
            var drinkDisplay= response.drinks[i].idDrink
            var drinkName= response.drinks[i].strDrink
            console.log(response)
            console.log(drinkDisplay)
            console.log(drinkName)
        }}).then(function(response){
                $.ajax({
                    url: queryURL,
                    headers: {
                        "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
                        "X-RapidAPI-Key": "147749aee4mshcd867948b97e9f7p16bdacjsn257d0be55a77"
                    },
                    method:"GET",
                    i: "drinkDisplay",


                })

            })

function showRecipe() {

  for (var i = 0; i < 10; i++) {

    var recipeResult = $("<div>");
    recipeResult.attr("class", "recipe-result");

    var recipeTitle = $("<div>");
    recipeTitle.html("Title: " + recipeTitleArray[i]);
    recipeTitle.attr("class", "recipe-title")

    var recipeImage = $("<img>");
    recipeImage.attr("src", recipeImageArray[i])
    recipeImage.attr("class", "recipe-img");

    var recipeList = $("<div>");
    var thisLink = recipeResultArray[i];
    recipeList.html(recipeResultArray[i])
    recipeList.attr("class", "recipe-link");

    var recipeLink = $("<a>");
    recipeLink.attr("href", thisLink);
    recipeLink.text("Recipe Link")
    console.log(thisLink)

    recipeResult.append(recipeTitle, recipeImage, recipeLink);
    $("#recipe-section").append(recipeResult);
  }
 
}