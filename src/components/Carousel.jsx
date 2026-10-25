import { useRef } from "react";

const slides = [
  { src: "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp", alt: "San Francisco skyline on a clear day" },
  { src: "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp", alt: "Waterfront stadium and city towers lit up at dusk" },
  { src: "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp", alt: "City skyline behind a green park on a sunny day" },
  { src: "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp", alt: "Hillside seaside town above a turquoise bay" },
];

function Carousel() {
  const trackRef = useRef(null);

  function slideBy(step) {
    const track = trackRef.current;
    const current = Math.round(track.scrollLeft / track.clientWidth);
    const next = (current + step + slides.length) % slides.length;
    track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
  }

  return (
    <section aria-label="Image gallery" className="relative">
      <div ref={trackRef} className="carousel w-full">
        {slides.map((slide) => (
          <div key={slide.src} className="carousel-item w-full">
            <img src={slide.src} alt={slide.alt} className="h-48 w-full object-cover sm:h-64 lg:h-96" />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-5 top-1/2 flex -translate-y-1/2 justify-between">
        <button type="button" aria-label="Previous slide" className="btn btn-circle pointer-events-auto" onClick={() => slideBy(-1)}>
          ❮
        </button>
        <button type="button" aria-label="Next slide" className="btn btn-circle pointer-events-auto" onClick={() => slideBy(1)}>
          ❯
        </button>
      </div>
    </section>
  );
}

export default Carousel;
