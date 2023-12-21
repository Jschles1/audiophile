import Image from "next/image";
import Hero from "../home/hero";
import AboutAudiofile from "./about-audiofile";
import Categories from "./categories";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Categories />
      <AboutAudiofile />
    </div>
  );
}
