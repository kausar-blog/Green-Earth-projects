let categoriesList = [];

const createElements = (arr) => {
  return arr
    .map(
      (el) => `
       <li>
        <button
          class="category-btn px-5 py-2.5 rounded-full bg-white border border-green-200 text-green-800 font-medium shadow-sm
                 hover:bg-green-700 hover:text-white hover:shadow-lg
                 active:scale-95 transition-all duration-300"
        >
          ${el}
        </button>
      </li>
      `,
    )
    .join("");
};
