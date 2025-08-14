

const data = [
  {
    id: 1,
    name: "Invicta Men's Pro Diver",
    img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
    price: 74,
    cat: "Dress",
  },
  {
    id: 11,
    name: "Invicta Men's Pro Diver 2",
    img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
    price: 74,
    cat: "Dress",
  },
  {
    id: 2,
    name: "Timex Men's Expedition Scout ",
    img: "https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UY879_.jpg",
    price: 40,
    cat: "Sport",
  },
  {
    id: 3,
    name: "Breitling Superocean Heritage",
    img: "https://m.media-amazon.com/images/I/61hGDiWBU8L._AC_UY879_.jpg",
    price: 200,
    cat: "Luxury",
  },
  {
    id: 4,
    name: "Casio Classic Resin Strap ",
    img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
    price: 16,
    cat: "Sport",
  },
  {
    id: 5,
    name: "Garmin Venu Smartwatch ",
    img: "https://m.media-amazon.com/images/I/51kyjYuOZhL._AC_SL1000_.jpg",
    price: 74,
    cat: "Casual"
  },
];



//Select key DOM nodes from filter.html

//we want to select a place where the product cards will be inserted
//lay out some css that we created with each card CSS tie-in

const productsContainer = document.querySelector(".products");

//Select: <input type="text" class="search"> - search box
//CSS tie in
const searchInput = document.querySelector(".search");

//Select: <div class="cats"> 
const categoriesContainer = document.querySelector(".cats");

//Select: <input type="range" class="priceRange"> - the price slider control
const priceRange = document.querySelector(".priceRange");

//Select: <div class="span priceValue"></div> - shows max price

const priceValue = document.querySelector(".priceValue");






//Render or create product coards into .products
//Purpose: turn an array of product objects into  a HTML card and inject into <div class="products">
//Replace the inner content of <div class="products"> with .product cards

const displayProducts = (filteredProducts) => {
    productsContainer.innerHTML = filteredProducts.map((product) => 
    `
    <div class = "product">
        <img src="${product.img}" alt="${product.name}">
        <span class="name">${product.name}</span>
        <span class="priceText">$${product.price}</span>
    </div>
    `
    ).join("");//join all cards into one HTML string for better performance
};

displayProducts(data);


//Filter as the user types in .search
//Source: <input class="search"> trigger on every keyup.
//Effect: re-render .products with only items or cards whose name includes the typed text

searchInput.addEventListener("keyup", (e) => {
    const value = e.target.value.toLowerCase();//case insensitive search

    if(value){

        displayProducts(data.filter((item) => item.name.toLowerCase().indexOf(value) !== -1))
    }else{
        //if its clear or no value in the input box (value) return the whole array
        displayProducts(data);
    };

});


//Purpose: Dynamically list unique categories from data(array) and also add "All" option

const setCategories = () => {
    const allCats = data.map((item) => item.cat);

    //build a unique set with "All" at the front for reset behavior
    const categories = [
        "All",
        ...allCats.filter((item, i) => allCats.indexOf(item) === i)
    ];



    //render category spans into the container
    //affect: populate <div class="cats"> with clickable spans

    categoriesContainer.innerHTML = categories.map((cat) => 
        `<span class="cat">${cat}</span>`
    ).join("");

    //Delecgated click handler on the container
    //effect: clicking a .cat span filters the product list; "All" will reset it
    categoriesContainer.addEventListener("click", (e) => {
        //create code to ignore clicks that arent on the span.cat
        if(!e.target.classList.contains("cat"))return;

        const selectedCat = e.target.textContent;

        if(selectedCat === "All"){
            displayProducts(data);
        }else {
            displayProducts(data.filter((item) => item.cat === selectedCat))
        }
    })

}

[]

//Price slider: limit by max price in .priceRange
//Purpose: initialize slider min/max from data, show current value in .pricevalue and re-render when the slide moves

const setPrices = () => {
    //collect prices to compute min/max for the slider limits
     const priceList = data.map((item) => item.price);
     const minPrice = Math.min(...priceList);//[1,2,4,5] --> Math.min(1,2,3,4,5)
     const maxPrice = Math.max(...priceList);

     //configure the slider element
     //input the min/max <input type="range" class="priceRange">
     priceRange.min = minPrice;
     priceRange.max = maxPrice;
     priceRange.value = maxPrice;

     //show the default max value right away, so the user knows how expensive they can go
     priceValue.textContent = "$" + maxPrice;

     //When the slider moves: effect: updating the label and show only the products with price <= slider value
     priceRange.addEventListener("input", (e) => {
        const current = Number(e.target.value);
        priceValue.textContent = "$" + current;

        //re-render the product cards as they change the value
        displayProducts(data.filter((item) => item.price <= current));
     });

};


setPrices();


setCategories();