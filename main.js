// get data from API 
const searchFood = searchInput => {
    if (searchInput) {
        document.getElementById("searchInput").reset();
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.meals === null) {
                    const message = `<div class="row">
                        <img src="sorry.gif" class="col-md-3 m-auto">
                    </div>
                    <div class="row">
                            <div class="col-md-12 text-center">
                            <h3>We found nothing on this name</h3>
                            </div>
                    </div> `
                    document.getElementById('row').innerHTML = message
                } else {
                    displayFoods(data.meals)
                }
            })
    }
    else {
        const message = `<div class="row">
                        <img src="nothing.gif" class="col-md-6 m-auto">
                    </div>
                    <div class="row">
                            <div class="col-md-12 text-center ">
                            <h1>You search Nothing</h1>
                            </div>
                    </div> `
        document.getElementById('row').innerHTML = message
        return false
    }
}


//function for getting search item
document.getElementById('searchInput').addEventListener('submit', function (gettingInput) {
    const hideArrow = document.getElementById('uperArrow');
    hideArrow.style.display = "none";
    gettingInput.preventDefault()
    const searchInput = document.getElementById('searchInputText').value
    searchFood(searchInput)
})



// Display food items 
const displayFoods = foods => {
    const row = document.getElementById('row')
    row.innerHTML = ""

    foods.forEach(food => {
        const column = document.createElement('div')
        column.className = "col-md-3 food-item mt-4"

        const foodContent = `
        <div onclick=getDetails('${food.idMeal}') class="items-image card w-100 overflow-hidden">
            <img src="${food.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title text-center">${food.strMeal}</h5>
            </div>
        </div>
        `
        column.innerHTML = foodContent
        row.appendChild(column)
    });
}

//  Fetch single item from API with item id
const getDetails = idMeal => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayDetails(data.meals))
}

// show clicked item details
const displayDetails = foods => {
    const modalBody = document.getElementById('modalBody')
    foods.forEach(food => {
        const foodDetails = `
        <div class="card w-100">
            <div class="row g-0">
                <div class="col-md-6">
                    <img src="${food.strMealThumb}" class="card-img-top single-item-image" alt="...">
                </div>
                <div class="col-md-6">
                    <div class="card-body">
                        <h3 class="card-title">${food.strMeal} <span><button type="button" class="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button></span></h3>
                        <h5 class="card-title">Ingredients</h5>
                        <ul class="list-unstyled">
                            ${ingredientList(food)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        `
        modalBody.innerHTML = foodDetails
        const foodBox = new bootstrap.Modal(document.getElementById('foodBox'))
        foodBox.show()
    });
}

// list of included material of meals
const ingredientList = food => {
    let li = ''

    for (let i = 1; i <= 20; i++) {
        let strIngredient = 'strIngredient' + i
        if (food[strIngredient]) {
            li = li + `<li><span><i class="fas fa-check-square text-warning"></i></span> ${food[strIngredient]}</li>`;
        }
    }
    return li
}