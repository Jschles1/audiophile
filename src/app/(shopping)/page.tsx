import Hero from "../home/hero";
import AboutAudiofile from "./about-audiofile";
import Categories from "./categories";
import Banners from "../home/banners";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/public/assets/home/desktop/image-hero.jpg"
          as="image"
        />
        <link
          rel="preload"
          href="/public/assets/home/mobile/image-header.jpg"
          as="image"
        />
        <link
          rel="preload"
          href="/public/assets/home/tablet/image-header.jpg"
          as="image"
        />
      </Head>
      <div className="w-full bg-alabaster">
        <Hero />
        <Categories />
        <Banners />
        <AboutAudiofile />
      </div>
    </>
  );
}
