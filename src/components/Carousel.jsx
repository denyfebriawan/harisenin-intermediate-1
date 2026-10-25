import { useRef } from "react";

const slides = [
  { src: "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp", alt: "Gedung-gedung pencakar langit San Francisco di hari yang cerah" },
  { src: "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp", alt: "Stadion dan gedung kota di tepi air yang menyala saat senja" },
  { src: "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp", alt: "Deretan gedung kota di balik taman hijau saat cuaca cerah" },
  { src: "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp", alt: "Kota pesisir di lereng bukit di atas teluk berwarna biru toska" },
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
    <section aria-label="Galeri foto" className="relative">
      <div ref={trackRef} className="carousel w-full">
        {slides.map((slide) => (
          <div key={slide.src} className="carousel-item w-full">
            <img src={slide.src} alt={slide.alt} className="h-48 w-full object-cover sm:h-64 lg:h-96" />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-5 top-1/2 flex -translate-y-1/2 justify-between">
        <button type="button" aria-label="Slide sebelumnya" className="btn btn-circle pointer-events-auto" onClick={() => slideBy(-1)}>
          ❮
        </button>
        <button type="button" aria-label="Slide berikutnya" className="btn btn-circle pointer-events-auto" onClick={() => slideBy(1)}>
          ❯
        </button>
      </div>
    </section>
  );
}

export default Carousel;
