const photoCarousel = document.querySelector(".photo-selection");

if (photoCarousel) {
    const track = photoCarousel.querySelector(".photo-selection-track");
    const previousButton = photoCarousel.querySelector(".photo-selection-prev");
    const nextButton = photoCarousel.querySelector(".photo-selection-next");

    function updateControls() {
        const maxScroll = track.scrollWidth - track.clientWidth;
        previousButton.disabled = track.scrollLeft <= 1;
        nextButton.disabled = track.scrollLeft >= maxScroll - 1;
    }

    function scrollByCard(direction) {
        const card = track.querySelector(".photo-selection-card");
        const styles = window.getComputedStyle(track);
        const gap = parseFloat(styles.columnGap) || 0;
        track.scrollBy({
            left: direction * (card.getBoundingClientRect().width + gap),
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
        });
    }

    previousButton.addEventListener("click", () => scrollByCard(-1));
    nextButton.addEventListener("click", () => scrollByCard(1));
    track.addEventListener("scroll", updateControls, { passive: true });
    window.addEventListener("resize", updateControls);
    updateControls();
}
