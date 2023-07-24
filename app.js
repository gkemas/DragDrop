const productList = document.getElementById("productList");
const dragArea = document.getElementById("dragArea");

async function fetchProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then("res", console.log);
    const firstTenProducts = response.products.slice(0, 15);
    firstTenProducts.forEach((product) => {
      const li = document.createElement("li");
      li.innerText = product.brand;
      li.draggable = true;
      li.addEventListener("dragstart", dragStart);
      li.addEventListener("dragend", dragEnd);
      productList.appendChild(li);
    });
  } catch (error) {
    console.error("Hata oluştu:", error);
  }
}
let draggedItem = null;

function dragStart() {
  draggedItem = this;
  this.classList.add("dragged");
}

function dragEnd() {
  this.classList.remove("dragged");
}

dragArea.addEventListener("dragover", (e) => {
  e.preventDefault();
});

dragArea.addEventListener("drop", (e) => {
  e.preventDefault();
  if (draggedItem) {
    dragArea.appendChild(draggedItem);
    draggedItem = null;
  }
});

fetchProducts();
