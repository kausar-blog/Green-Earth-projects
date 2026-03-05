const CategoriesListEl = document.getElementById("Categories-list");
const allPlantsBtn = document.getElementById("all-plants-btn");
const allCardItems = document.getElementById("all-card-items");
const modal = document.getElementById("my_modal_1");
const modalContent = document.getElementById("modal-content");
const cardItemBusiness = document.getElementById("card-item-business");
const cart = {};

const allCategories = async () => {
  const url = "https://openapi.programming-hero.com/api/categories";

  try {
    const res = await fetch(url);
    const data = await res.json();

    categoriesItems(data.categories);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
};

const categoriesItems = (items) => {
  CategoriesListEl.innerHTML = "";

  items.forEach((item) => {
    // console.log(item.id);
    const li = document.createElement("li");

    const button = document.createElement("button");

    button.innerText = item.category_name;
    button.id = `button-${item.id}`;

    button.className =
      "category-btn px-4 m-1 py-2.5 rounded-full bg-white border border-green-200 text-green-800 font-medium shadow-sm hover:bg-green-700 hover:text-white hover:shadow-lg active:scale-95 transition-all duration-300";

    button.addEventListener("click", () => {
      removeActiveFromCategories();

      button.classList.add("bg-green-700", "text-white");
      button.classList.remove("bg-white", "text-green-800");

      loadCategoryPlants(item.id);
    });

    li.appendChild(button);
    CategoriesListEl.appendChild(li);
  });
};

const loadCategoryPlants = async (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  try {
    const res = await fetch(url);
    const data = await res.json();

    plantsItems(data.plants);
  } catch (error) {
    console.log("Failed to fetch categories:", error);
  }
};

const loadAllPlants = async () => {
  const url = "https://openapi.programming-hero.com/api/plants";
  try {
    const res = await fetch(url);
    const data = await res.json();

    plantsItems(data.plants);
  } catch (error) {
    console.log("Failed to fetch categories:", error);
  }
};

const plantsItems = (cards) => {
  allCardItems.innerHTML = "";

  if (!cards || cards.length === 0) {
    allCardItems.innerHTML = `
     <p class="col-span-12 text-center text-gray-500 text-lg">
        No plants found.
      </p>`;
    return;
  }

  // console.log(cards);
  cards.forEach((card) => {
    const cardItem = document.createElement("div");

    cardItem.className =
      "plant-card group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-green-100";

    cardItem.innerHTML = `
        <figure class="aspect-[4/3] bg-green-50 overflow-hidden">
                <img
                  src="${card.image}"
                  alt="${card.name}}"
                  id="plant-img-${card.id}"
                  class="cursor-pointer w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </figure>

              <div class="p-5">
                <h3 class="text-xl font-semibold text-green-800 mb-2">
                  ${card.name}
                </h3>

                <p class="text-sm text-slate-600 mb-4 leading-relaxed line-clamp-2">
                  ${card.description}
                </p>

                <div class="flex justify-between items-center mb-5">
                  <span
                    class="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800"
                  >
                    ${card.category}
                  </span>
                  <span class="text-xl font-bold text-green-900">৳${card.price}</span>
                </div>

                <button
                  id="item-business-${card.id}"
                  class="w-full py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white font-medium hover:from-green-700 hover:to-green-800 active:scale-95 transition-all duration-300"
                >
                  Add to Cart
                </button>
              </div>
    `;

    const img = cardItem.querySelector(`#plant-img-${card.id}`);

    img.addEventListener("click", () => {
      loadPlantDetails(card.id);
    });

    const itemBusinessCard = cardItem.querySelector(
      `#item-business-${card.id}`,
    );

    itemBusinessCard.addEventListener("click", () => {
      businessFun(card);
    });

    allCardItems.appendChild(cardItem);
  });
};

const loadPlantDetails = async (plantId) => {
  const url = `https://openapi.programming-hero.com/api/plant/${plantId}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.plants);

    renderPlantDetails(data.plants);
  } catch (error) {
    console.log("Failed to fetch categories:", error);
  }
};

const renderPlantDetails = (plant) => {
  // console.log(plant);
  modalContent.innerHTML = `
    <div class="space-y-4">
      <img 
        src="${plant.image}" 
        class="w-full h-80 object-cover rounded-xl"
      />

      <h2 class="text-3xl font-bold text-green-800">
        ${plant.name}
      </h2>

      <p class="text-gray-600 text-base leading-relaxed">
        ${plant.description}
      </p>

      <div class="flex justify-between items-center">
        <span class="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
          ${plant.category}
        </span>

        <span class="text-2xl font-bold text-green-900">
          ৳${plant.price}
        </span>
      </div>
    </div>
  `;
  modal.showModal();
};

// remove active state from all button color
const removeActiveFromCategories = () => {
  const allButtons = document.querySelectorAll(
    "#Categories-list button, #all-plants-btn",
  );

  allButtons.forEach((btn) => {
    btn.classList.remove("bg-green-700", "text-white");
    btn.classList.add("bg-white", "text-green-800");
  });
};

allPlantsBtn.addEventListener("click", () => {
  removeActiveFromCategories();

  allPlantsBtn.classList.add("bg-green-700", "text-white");
  allPlantsBtn.classList.remove("bg-white", "text-green-800");

  loadAllPlants();
});

const businessFun = (card) => {
  if (cart[card.id]) {
    cart[card.id].quantity += 1;
  } else {
    cart[card.id] = {
      id: card.id,
      name: card.name,
      price: card.price,
      quantity: 1,
    };
    renderCart();
  }
};

const renderCart = () => {
  cardItemBusiness.innerHTML = "";

  let total = 0;

  Object.values(cart).forEach((item) => {
    total += item.price * item.quantity;

    const cardDetailsBusiness = document.createElement("div");

    cardDetailsBusiness.className =
      "flex justify-between items-center border-b border-green-100 pb-3";

    cardDetailsBusiness.innerHTML = `
        <div>
          <p class="text-slate-800 font-medium text-sm">
            ${item.name}
          </p>
          <p class="text-xs text-slate-500">
            ৳${item.price} × ${item.quantity}
          </p>
        </div>

        <button
          class="w-7 h-7 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-600 hover:text-white transition"
        >
          ✕
        </button>
    `;

    cardItemBusiness.append(cardDetailsBusiness);
  });

  const totalDiv = document.createElement("div");

  totalDiv.className =
    "flex justify-between items-center pt-4 text-lg font-bold text-green-900";

  totalDiv.innerHTML = `
      <span>Total</span>
      <span>৳${total}</span>
  `;

  cardItemBusiness.append(totalDiv);
};

loadAllPlants();

allCategories();
