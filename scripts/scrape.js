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
    // console.log(`Status Code: ${response.statusCode}`);
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
    console.log(recipe);
    return recipe;
  });
}

function foodNetwork(link) {
  return scrapeIt(link, {
    name: ".recipe-lead section .o-AssetTitle__a-HeadlineText",
    image: {
      selector: "section .o-AssetMultiMedia__m-MediaWrap img",
      attr: "src"
    },
    steps: {
      selector: ".o-Method .o-Method__m-Body"
    },
    time: {
      selector: "section .o-Time"
    },
    ingredients: {
      listItem: ".o-Ingredients__m-Body"
    }
  }).then(({ data, response }) => {
    console.log(typeof(data.ingredients))
    const recipe = {
      name: data.name,
      image: "https:" + data.image,
      time: Array.from(
        new Set(
          data.time
            .split("\n")
            .map(item => item.trim())
            .filter(item => item.length > 0)
        )
      ),
      ingredients: checkContent(data.ingredients[0]),
      directions: data.steps
        .split("\n")
        .map(item => item.trim())
        .filter(item => item.length > 0)
    };
    const {ingredients: recipeIngredients = "No listed ingredients."} = recipe;
    return recipe;
  });
}

function tasteOfHome(link) {
  return scrapeIt(link, {
    name: {
      selector: ".rd_zone_top_left .visible-phone h1"
    },
    image: {
      selector: "section .rd_recipe_img_container .photo",
      attr: "src"
    },
    steps: {
      selector: "section .numbered-list"
    },
    time: {
      selector: "section .visible-desktop .rec-CTime "
    },
    ingredients: {
      listItem: ".rd_ingredients"
    }
  }).then(({ data, response }) => {
    const recipe = {
      name: data.name,
      image: data.image,
      time: data.time
        .split("\n")
        .map(item => item.trim())
        .filter(item => item.length > 0),
      ingredients: checkContent(data.ingredients[0]),
      directions: data.steps
        .split("\n")
        .map(item => item.trim())
        .filter(item => item.length > 0)
    };
    return recipe;
  });
}

function Scrape(url) {
  const addr = url.split(".")[1];
  if (addr === "allrecipes") {
    const rec = allRecipes(url);
    return rec;
  } else if (addr === "foodnetwork") {
    const rec = foodNetwork(url);
    return rec;
  } else if (addr === "tasteofhome") {
    const rec = tasteOfHome(url);
    return rec;
  } else {
    console.log("Not supported.");
    return Promise.reject("Not supported.");
  }
}

function checkContent(e) {
  if (typeof e == "undefined") {
    const msg = "No available ingredients";
    return msg;
  }
    return e.split("\n")
    .map(item => item.trim())
    .filter(item => item.length > 0)
}


module.exports = Scrape;
