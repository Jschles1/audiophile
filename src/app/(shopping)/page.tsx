import Image from "next/image";
import Hero from "../home/hero";
import AboutAudiofile from "./about-audiofile";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <AboutAudiofile />
    </div>
  );
}
