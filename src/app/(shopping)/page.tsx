import Hero from "../home/hero";
import AboutAudiofile from "./about-audiofile";
import Categories from "./categories";
import Banners from "../home/banners";

export default function Home() {
  return (
    <div className="w-full bg-alabaster">
      <Hero />
      <Categories />
      <Banners />
      <AboutAudiofile />
    </div>
  );
}
