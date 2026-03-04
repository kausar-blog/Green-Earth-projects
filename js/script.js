let categoriesList = [];

const createElements = (arr) => {
  return arr
    .map(
      (el) => `
        <a href="#" 
          class="block px-4 py-2 rounded-lg text-slate-700 hover:text-white hover:bg-green-700 transition duration-300">
          ${el}
        </a>
      `,
    )
    .join("");
};

// Fetch all categories from API
const allCategories = () => {
  const url = "https://openapi.programming-hero.com/api/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => categoriesItems(data.categories));
};

const categoriesItems = (items) => {
  // console.log(items);

  items.forEach((item) => {
    categoriesList.push(item.category_name);
  });

  const CategoriesListEl = document.getElementById("Categories-list");

  CategoriesListEl.innerHTML = "";

  CategoriesListEl.innerHTML = createElements(categoriesList);
};

allCategories();

/* const allPlants = () => {
  const url = "https://openapi.programming-hero.com/api/plants";
  fetch(url)
    .then((res) => res.json())
    .then((data) => PlantsWords(data.plants));
}; */

/* const PlantsWords = (users) => {
  // console.log(users);
  // category: "Fruit Tree";
  // description: "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.";
  // id: 1;
  // image: "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg";
  // name: "Mango Tree";
  // price: 500;
  users.forEach((user) => {
    console.log(user);
    // console.log(user.category);
    // console.log(user.description);
    // console.log(user.image);
    // console.log(user.name);
    // console.log(user.price);
  });
};

allPlants();
 */
