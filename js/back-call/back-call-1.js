const backdrop = document.querySelector(".backdrop59783");
const btnOpen = document.querySelector(".fixed-btn75839");
const btnClose = document.querySelector(".close-popup-btn34982");

const toggleModal = () => {
  backdrop.classList.toggle("is-hidden59783");
};

btnOpen.addEventListener("click", () => {
  toggleModal();
});

btnClose.addEventListener("click", () => {
  toggleModal();
});

backdrop.addEventListener("click", (e) => {
  if (e.target === backdrop) {
    toggleModal();
  }
});
