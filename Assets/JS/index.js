var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var mainIndex = 0;
var productContainer = [];

if (localStorage.getItem("products") != null) {
  productContainer = JSON.parse(localStorage.getItem("products"));
  displayProducts(productContainer);
}


function addProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescriptionInput.value,
  };
  productContainer.push(product);
  localStorage.setItem("products", JSON.stringify(productContainer));
  displayProducts(productContainer);
  clearInputs();
}

function displayProducts(arr) {
  var cartoona = "";
  for (var i = 0; i < arr.length; i++) {
    cartoona += `<tr>
      <td>${arr[i].name}</td>
      <td>${arr[i].price}</td>
      <td>${arr[i].category}</td>
      <td>${arr[i].description}</td>
      <td><button onclick="setFormForUpdate(${i});" class="btn btn-warning">Update</button></td>
      <td><button class="btn btn-danger" onclick="deleteProduct(${i});">Delete</button></td>
    </tr>`;
  }
  document.getElementById("bodyId").innerHTML = cartoona;
}

function clearInputs() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescriptionInput.value = "";
}

function deleteProduct(productIndex) {
  productContainer.splice(productIndex, 1);
  localStorage.setItem("products", JSON.stringify(productContainer));
  displayProducts(productContainer);
}

function searchProducts(term) {
  var matchedProducts = [];
  for (let i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].name.toLowerCase().includes(term.toLowerCase()) ===
      true
    ) {
      matchedProducts.push(productContainer[i]);
    }
  }
  displayProducts(matchedProducts);
}

function setFormForUpdate(i) {
  addBtn.classList.replace("d-block", "d-none");
  updateBtn.classList.replace("d-none", "d-block");

  productNameInput.value = productContainer[i].name;
  productPriceInput.value = productContainer[i].price;
  productCategoryInput.value = productContainer[i].category;
  productDescriptionInput.value = productContainer[i].description;

  mainIndex = i;
}

function updateProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescriptionInput.value,
  };
  productContainer.splice(mainIndex, 1, product);
  localStorage.setItem("products", JSON.stringify(productContainer));
  displayProducts(productContainer);
  clearInputs();
  updateBtn.classList.replace("d-block", "d-none");
  addBtn.classList.replace("d-none", "d-block");
}



