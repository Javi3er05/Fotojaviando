document.addEventListener("DOMContentLoaded", function () {

    const gallery = document.querySelector(".gallery");

    if (!gallery) return;

    const images = gallery.querySelectorAll("img");

    images.forEach(function (img) {

        img.addEventListener("click", function () {

            const viewer = document.createElement("div");

            viewer.style.position = "fixed";
            viewer.style.top = "0";
            viewer.style.left = "0";
            viewer.style.width = "100%";
            viewer.style.height = "100%";
            viewer.style.background = "rgba(0,0,0,0.95)";
            viewer.style.display = "flex";
            viewer.style.alignItems = "center";
            viewer.style.justifyContent = "center";
            viewer.style.zIndex = "9999";
            viewer.style.cursor = "pointer";

            const bigImage = document.createElement("img");

            bigImage.src = img.src;

            bigImage.style.maxWidth = "95%";
            bigImage.style.maxHeight = "95%";
            bigImage.style.objectFit = "contain";

            viewer.appendChild(bigImage);

            document.body.appendChild(viewer);

            viewer.addEventListener("click", function () {
                viewer.remove();
            });

        });

    });

});
