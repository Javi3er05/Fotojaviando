const images = document.querySelectorAll(".gallery img");

let currentIndex = 0;

const lightbox = document.createElement("div");
lightbox.className = "lightbox";

lightbox.innerHTML = `
    <button class="lightbox-close">×</button>
    <button class="lightbox-prev">‹</button>
    <img class="lightbox-image" src="" alt="">
    <button class="lightbox-next">›</button>
`;

document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector(".lightbox-image");
const closeButton = lightbox.querySelector(".lightbox-close");
const prevButton = lightbox.querySelector(".lightbox-prev");
const nextButton = lightbox.querySelector(".lightbox-next");

function showImage(index) {
    currentIndex = (index + images.length) % images.length;

    lightboxImage.src = images[currentIndex].src;
    lightboxImage.alt = images[currentIndex].alt;

    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
}

function previousImage() {
    showImage(currentIndex - 1);
}

function nextImage() {
    showImage(currentIndex + 1);
}

images.forEach((image, index) => {
    image.addEventListener("click", () => {
        showImage(index);
    });
});

closeButton.addEventListener("click", closeLightbox);
prevButton.addEventListener("click", previousImage);
nextButton.addEventListener("click", nextImage);

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "ArrowLeft") previousImage();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "Escape") closeLightbox();
});


/* SWIPE EN MÓVIL */

let touchStartX = 0;
let touchEndX = 0;

lightboxImage.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

lightboxImage.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;

    const difference = touchStartX - touchEndX;

    if (Math.abs(difference) < 50) return;

    if (difference > 0) {
        nextImage();
    } else {
        previousImage();
    }
});
