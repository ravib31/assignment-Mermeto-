function fetchData() {
  fetch(
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448"
  )
    .then((response) => response.json())
    .then((data) => {
      const product = data.product;
      // console.log("product", product);
      const productName = product.title;
      const productDescription = product.description;
      const productPrice = product.price;

      document.getElementById("product-name").textContent = productName;
      document.getElementById("product-description").innerHTML =
        productDescription;
      document.getElementById("product-price").textContent =
        productPrice + ".00";
      document.getElementById("discount-price").textContent =
        "$" + eval(Number(productPrice.replace(/\$/g, "")) * 0.65) + ".00";
    })
    .catch((error) => console.error("Error fetching product data:", error));
}

window.onload = fetchData();

const incrementCount = document.getElementById("increment-count");
const decrementCount = document.getElementById("decrement-count");

const totalCount = document.getElementById("total-count");

var count = 1;

totalCount.innerHTML = count;

const handleIncrement = () => {
  count++;
  totalCount.innerHTML = count;
  decrementCount.disabled = false;
};

const handleDecrement = () => {
  if (count > 0) {
    count--;
    totalCount.innerHTML = count;
  }

  if (count === 0) {
    decrementCount.disabled = true;
  }
};

if (count === 0) {
  decrementCount.disabled = true;
}

incrementCount.addEventListener("click", handleIncrement);
decrementCount.addEventListener("click", handleDecrement);

let obj = {
  selectedColor: "",
  selectedSize: "",
};
document.addEventListener("DOMContentLoaded", function () {
  let selectedColor = null;
  let selectedSize = null;

  function selectColor(color) {
    const activeColor = document.querySelector(".color-plate.active");
    if (activeColor) {
      activeColor.classList.remove("active");
      activeColor.innerHTML = "";
    }

    selectedColor = color;

    color.classList.add("active");

    color.innerHTML = '<i class="fa fa-check"></i>';

    color.style.border = "2px solid white";
  }

  function selectSize(size) {
    console.log("Suze", size);
    obj.selectedSize = size;
    selectedSize = size;
  }

  const colorPlates = document.querySelectorAll(".color-plate");
  colorPlates.forEach((colorPlate) => {
    colorPlate.addEventListener("click", function () {
      const activeColor = document.querySelector(".color-plate.active");
      if (activeColor) {
        activeColor.classList.remove("active");
        activeColor.innerHTML = "";
      }

      selectedColor = colorPlate;
      selectedColor.classList.add("active");
      selectedColor.innerHTML = '<i class="fa fa-check"></i>';
      selectedColor.style.border = "2px solid white";

      let colorValue = window
        .getComputedStyle(colorPlate)
        .getPropertyValue("background-color");

      if (colorValue === "rgb(236, 222, 204)") {
        obj.selectedColor = "Light Grey";
      } else if (colorValue === "rgb(187, 210, 120)") {
        obj.selectedColor = "Mint Green";
      } else if (colorValue === "rgb(187, 193, 248)") {
        obj.selectedColor = "Light blue color";
      } else {
        obj.selectedColor = "Light pink";
      }
    });
  });

  // Event listener for size options
  const sizeOptions = document.querySelectorAll(".choose-size span");
  sizeOptions.forEach((sizeOption) => {
    sizeOption.addEventListener("click", function () {
      selectSize(sizeOption.textContent.trim());
    });
  });

  document
    .getElementById("add-to-cart-btn")
    .addEventListener("click", function () {
      if (obj.selectedColor !== "" && obj.selectedSize !== "") {
        alert(
          `Embrace Sideboard added to cart! Color: ${obj.selectedColor} Size: ${obj.selectedSize}`
        );

        selectedColor = null;
        selectedSize = null;

        colorPlates.forEach((colorPlate) => {
          colorPlate.classList.remove("active");
        });
      } else {
        alert("Please select color and size before adding to cart!");
      }
    });
});
