/* Studio AV Beauty — Serviços: efeito de entrada intercalado */
(() => {
    const items = document.querySelectorAll(".service.reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
        items.forEach((el) => el.classList.add("visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const delay = Number(el.dataset.delay || 0);
                setTimeout(() => el.classList.add("visible"), delay);
                observer.unobserve(el);
            });
        },
        { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    items.forEach((el, i) => {
        el.dataset.delay = String((i % 2) * 90);
        observer.observe(el);
    });
})();
