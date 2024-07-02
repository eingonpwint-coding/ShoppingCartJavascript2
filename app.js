let productDiv = document.querySelector("#product-div");
let cartsDiv = document.querySelector(".carts-table");
let showDiv = document.querySelector(".show");

// Render Products
function renderProducts() {
  products.forEach((product) => {
    productDiv.innerHTML += `
    <div class="col-12 col-lg-6 mb-4">
        <div class="card">
            <div class="card-body">
                <img src="${product.src}" class="w-100" />
                <hr />
                <p class="fs-5 fw-bold">${product.name}</p>
                <p>
                    Price - <span class="text-primary fs-5 fw-bold">$ ${product.price}</span>
                </p>
                <div class="btn btn-primary w-100 cart-btn fs-6 fw-bold" onclick="addtoCarts(${product.id})">
                    Add to cart
                </div>
            </div>
        </div>
    </div>`;
  });
}
renderProducts();
//when the cart is clicked , the cart is added to the array
// cart array
//if the local storage has no data , use [] option 
let carts = JSON.parse(localStorage.getItem("productCarts")) || [];

// add to carts array
function addtoCarts(id) {
  //avoid same product shows in the cart list 
  if (carts.some((cart) => cart.id === id)) {
    //add quantity to the list 
    changeQuantity("plus", id);
  } else {
    let cart = products.find((product) => product.id === id);
    carts.push({
      //sent as object and add quantity ...means it spreads
      ...cart,
      quantity: 1,
    });
  }
  //when click add to cart, need to run renderProducts in the addtocart lists, call function 
  updateCarts();
}

// render product carts
function renderProductsCarts() {
  showDiv.innerHTML = "";
  cartsDiv.innerHTML = ""; // to avoid repeat cart show because of  using +=, when the loop is run, the cart list in the carts show 
  carts.forEach((cart) => {
    cartsDiv.innerHTML += `
    <tr>
      <td>
        <img src="${cart.src}" id="img-cart" title="${cart.name}" />
      </td>
      <td><p class="fs-5 pt-2">$ ${cart.price}</p></td>
      <td>
        <i
          class="fa-solid fa-circle-minus fs-5 text-primary pt-3" onclick="changeQuantity('minus',${cart.id})"
        ></i
        ><span class="mx-2 fs-5 pt-3">${cart.quantity}</span
        ><i
          class="fa-solid fa-circle-plus fs-5 text-primary pt-3" onclick="changeQuantity('plus',${cart.id})"
          
        ></i>
      </td>
      <td>
        <i
          class="fa-solid fa-trash text-danger fs-5 pt-3" onclick="removeCart(${cart.id})"
          title="Remove"
        ></i>
      </td>
    </tr>
    `;
    //change '' instead of ""
  });
  // for div if the cart list doesn't have , add no item to cast sentences
  show_hide();
}

// change quantity
function changeQuantity(codition, id) {
  //loop cart 
  carts = carts.map((cart) => {
    let quantity = cart.quantity;

    if (cart.id === id) {
      if (codition == "plus") {
        quantity++;
      } else if (codition == "minus" && quantity > 1) {
        quantity--;
      }
    }

    return {
      ...cart,
      quantity,
    };
  });

  updateCarts();
}

// total price and cart number
function renderNumber() {
  let totalprice = 0,
    totalcart = 0;
  carts.forEach((cart) => {
    totalprice += cart.price * cart.quantity;
    totalcart += cart.quantity;
  });

  document.querySelector("#totalPrice").innerText = `$ ${totalprice}`;
  document.querySelector("#totalCart").innerText = `${totalcart}`;
}

// remove carts
function removeCart(id) {
  carts = carts.filter((cart) => cart.id !== id);
  updateCarts();
}

// show hide
function show_hide() {
  if (!cartsDiv.innerHTML) {
    showDiv.innerHTML = `<h5 class="my-3 text-center text-primary">No item in cart.</h5>
              <hr />`;
  }
}

// update on everything
function updateCarts() {
  renderProductsCarts();
  renderNumber();

  //save dato into local storage
  localStorage.setItem("productCarts", JSON.stringify(carts));//change to json (for store in local storge)
}

updateCarts();