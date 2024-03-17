document.addEventListener("DOMContentLoaded", () => {
  const categorySelect = document.getElementById("category");
  const newCategoryInput = document.getElementById("newCategory");

  categorySelect.addEventListener("change", (e) => {
    const isNewCategory = e.currentTarget.value === "addNewCategory";

    if (isNewCategory) {
      newCategoryInput.style.display = "block";
    } else {
      newCategoryInput.style.display = "none";
    }
  });
});
