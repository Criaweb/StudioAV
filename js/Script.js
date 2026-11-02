/* Studio AV Beauty — pequenos aprimoramentos interativos */

(function () {
    const bgImage = document.querySelector(".bg-image");

    // Efeito sutil de parallax no fundo ao mover o mouse (desktop)
    if (window.matchMedia("(pointer: fine)").matches && bgImage) {
        let rafId = null;
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;

        document.addEventListener("mousemove", (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            targetX = x * 8; // max 8px
            targetY = y * 8;
        });

        function animate() {
            currentX += (targetX - currentX) * 0.06;
            currentY += (targetY - currentY) * 0.06;
            bgImage.style.transform = `scale(1.05) translate(${currentX}px, ${currentY}px)`;
            rafId = requestAnimationFrame(animate);
        }

        animate();

        // Pausa quando a aba não está visível para economizar bateria
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                cancelAnimationFrame(rafId);
            } else {
                animate();
            }
        });
    }

    // Feedback visual ao tocar nos links (mobile)
    document.querySelectorAll(".link-card").forEach((card) => {
        card.addEventListener("touchstart", () => card.classList.add("active"));
        card.addEventListener("touchend", () => card.classList.remove("active"));
    });
})();
