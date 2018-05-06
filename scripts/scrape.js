const scrapeIt = require("scrape-it");

function allRecipes(link) {
  return scrapeIt(link, {
    name: "section h1",
    image: {
      selector: "section .summary-background img",
      attr: "src"
    },
    steps: {
      listItem: ".step"
    },
    time: {
      listItem: ".prepTime__item"
    },
    ingredients: {
      listItem: ".list-ingredients-1"
    },
    ingredients2: {
      listItem: ".list-ingredients-2"
    }
  }).then(({ data, response }) => {
    console.log(`Status Code: ${response.statusCode}`);
    const recipe = {
      name: data.name,
      image: data.image,
      time: data.time.filter(item => typeof item === "string"),
      ingredients: [
        ...data.ingredients[0]
          .split("\r\n")
          .map(recipe => recipe.trim())
          .filter(e => e.length > 0),
        ...data.ingredients2[0]
          .split("\r\n")
          .map(recipe => recipe.trim())
          .filter(e => e.length > 0)
      ],
      directions: data.steps.filter(item => typeof item === "string")
    };
    return recipe;
  });
}

function foodNetwork(link) {
  return new Promise(function(res, rej) {
    scrapeIt(link, {
      name: ".recipe-lead section .o-AssetTitle__a-HeadlineText",
      image: {
        selector: "section .o-AssetMultiMedia__m-MediaWrap img",
        attr: "src"
      },
      steps: {
        selector: "section header .o-Method__m-Body"
      },
      time: {
        selector: "section .o-Time"
      },
      ingredients: {
        listItem: ".o-Ingredients__m-Body"
      }
    }).then(({ data, response }) => {
      const recipe = {
        name: data.name,
        image: "https:" + data.image,
        ingredients: data.ingredients[0]
          .split("\n")
          .map(item => item.trim())
          .filter(item => item.length > 0)
      };
      console.log(
        data.time
          .split("\n")
          .map(item => item.trim())
          .filter(item => item.length > 0)
      );
    });
  });
}

function Scrape(url) {
  const addr = url.split(".")[1];
  if (addr === "allrecipes") {
    const rec = allRecipes(url);
    return rec;
  }
  if (addr === "foodnetwork") {
    const rec = foodNetwork(url);
    return rec;
  } else {
    console.log("Not supported.");
  }
}

module.exports = Scrape;