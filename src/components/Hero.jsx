import { Link } from "react-router";

function Hero() {
  return (
    <section className="hero bg-base-200 min-h-[calc(100svh-4rem)]">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Jelajahi Kota Impianmu</h1>
          <p className="py-6">Temukan inspirasi perjalanan ke kota-kota terbaik di dalam dan luar negeri, lalu rencanakan liburanmu dengan mudah dalam satu tempat.</p>
          <Link to="/register" className="btn btn-primary">
            Mulai Jelajah
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
