const CategoriesListEl = document.getElementById("Categories-list");
const allPlantsBtn = document.getElementById("all-plants-btn");
const allCardItems = document.getElementById("all-card-items");
const modalBoxEl = document.getElementById("modal-box-el");

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
    // console.log(card);

    const cardItem = document.createElement("div");
    cardItem.className =
      "group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-green-100";
    cardItem.innerHTML = `
        <figure class="aspect-[4/3] bg-green-50 overflow-hidden">
                <img
                  src="${card.image}"
                  alt="${card.name}}"
                  id="plant-card-${card.id}"
                  class="w-full h-full object-cover group-hover:scale-110 transition duration-500"
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
                  class="w-full py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white font-medium hover:from-green-700 hover:to-green-800 active:scale-95 transition-all duration-300"
                >
                  Add to Cart
                </button>
              </div>
    `;
    allCardItems.appendChild(cardItem);

    loadPlantDetails(card.id);
  });
};

const loadPlantDetails = async (plantId) => {
  const url = `https://openapi.programming-hero.com/api/plant/${plantId}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    renderPlantDetails(data.plants);
  } catch (error) {
    console.log("Failed to fetch categories:", error);
  }
};

const renderPlantDetails = (modals) => {
  // console.log(modals.image);
  console.log(modals.name);
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

loadAllPlants();

allCategories();
