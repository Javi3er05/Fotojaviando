const carousel = document.querySelector(".featured");

if (carousel) {
    const slides = Array.from(carousel.querySelectorAll(".featured-slide"));
    const dots = Array.from(carousel.querySelectorAll(".featured-dots button"));
    const count = carousel.querySelector(".featured-count");
    const previousButton = carousel.querySelector(".featured-prev");
    const nextButton = carousel.querySelector(".featured-next");
    let activeIndex = 0;
    let touchStartX = null;

    function showSlide(index) {
        activeIndex = (index + slides.length) % slides.length;

        slides.forEach((slide, slideIndex) => {
            const isActive = slideIndex === activeIndex;
            slide.classList.toggle("is-active", isActive);
            slide.setAttribute("aria-hidden", String(!isActive));
            slide.querySelector("a").tabIndex = isActive ? 0 : -1;
        });

        dots.forEach((dot, dotIndex) => {
            const isActive = dotIndex === activeIndex;
            dot.classList.toggle("is-active", isActive);
            dot.setAttribute("aria-current", String(isActive));
        });

        count.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    }

    previousButton.addEventListener("click", () => showSlide(activeIndex - 1));
    nextButton.addEventListener("click", () => showSlide(activeIndex + 1));

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => showSlide(index));
    });

    carousel.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            showSlide(activeIndex - 1);
        } else if (event.key === "ArrowRight") {
            showSlide(activeIndex + 1);
        }
    });

    carousel.addEventListener("touchstart", (event) => {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener("touchend", (event) => {
        if (touchStartX === null) return;

        const distance = touchStartX - event.changedTouches[0].screenX;
        touchStartX = null;

        if (Math.abs(distance) < 50) return;
        showSlide(activeIndex + (distance > 0 ? 1 : -1));
    }, { passive: true });
}
