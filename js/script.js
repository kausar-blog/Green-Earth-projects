const CategoriesListEl = document.getElementById("Categories-list");
const allPlantsBtn = document.getElementById("all-plants-btn");
const allCardItems = document.getElementById("all-card-items");

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
    const li = document.createElement("li");
    li.innerHTML = `
      <button class="category-btn px-4 m-1 py-2.5 rounded-full bg-white border border-green-200 text-green-800 font-medium shadow-sm hover:bg-green-700 hover:text-white hover:shadow-lg active:scale-95 transition-all duration-300">
        ${item.category_name}
      </button>
    `;
    CategoriesListEl.append(li);
  });
};

const AllPlantsCard = async () => {
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
  cards.forEach((card) => {
    console.log(card);
    // console.log(card.category);
    // console.log(card.description);
    // console.log(card.id);
    // console.log(card.image);
    // console.log(card.name);
    // console.log(card.price);

    const cardItem = document.createElement("div");
    cardItem.className =
      "group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-green-100";
    cardItem.innerHTML = `
        <figure class="aspect-[4/3] bg-green-50 overflow-hidden">
                <img
                  src="${card.image}"
                  alt="${card.name}}"
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
    allCardItems.append(cardItem);
  });
};

AllPlantsCard();

allCategories();
