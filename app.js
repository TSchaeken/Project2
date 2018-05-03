const scrapeIt = require("scrape-it");

// Promise interface
scrapeIt(
  "https://www.allrecipes.com/recipe/92462/slow-cooker-texas-pulled-pork/?clickId=right%20rail0&internalSource=rr_feed_recipe_sb&referringId=141678%20referringContentType%3Drecipe",
  {
    Steps: {
      listItem: ".step"
    },
    Time: {
      listItem: ".prepTime__item"
    },
    Ingredients: {
      listItem: ".list-ingredients-1"
    }
  }
).then(({ data, response }) => {
  console.log(`Status Code: ${response.statusCode}`);
  console.log(data);
  console.log("---------------------------------");
});
