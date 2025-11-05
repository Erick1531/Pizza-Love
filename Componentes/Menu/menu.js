function initMenu() {
  const cards = document.querySelectorAll(".menu-card");

  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";

    setTimeout(() => {
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 100);
  });

  cards.forEach((card) => {
    card.addEventListener("mousedown", function () {
      this.style.transform = "scale(0.98)";
    });

    card.addEventListener("mouseup", function () {
      this.style.transform = "scale(1)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  });

  const wrapper = document.querySelector(".cards-wrapper");
  wrapper.addEventListener("mousemove", function (e) {
    const rect = wrapper.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    cards.forEach((card, index) => {
      const background = card.querySelector(".card-background");
      if (background) {
        const offsetX = (x - 0.5) * 10;
        const offsetY = (y - 0.5) * 10;

        const currentTransform = card.matches(":hover")
          ? "scale(1.15)"
          : "scale(1)";
        background.style.transform = `translate(${
          offsetX * (index % 2 === 0 ? 1 : -1)
        }px, ${offsetY}px) ${currentTransform}`;
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", initMenu);
