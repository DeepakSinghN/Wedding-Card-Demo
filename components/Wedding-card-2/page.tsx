import Hero from "./Hero";
import SaveTheDate from "./SaveTheDate";
import OurStory from "./OurStory";
import Timeline from "./Timeline";
import Gallery from "./Gallery";
import RSVP from "./RSVP";
import Closing from "./Closing";
import Footer from "./Footer";
import FlowerPetals from "./FlowerPetals";

export default function WeddingCardTwoPage() {
  return (
    <main className="w-full min-h-screen bg-[#2b0a10] flex flex-col items-center justify-start overflow-y-auto">
      <div className="w-full max-w-[480px] shadow-[0_0_60px_rgba(0,0,0,0.75)] relative bg-[#fbf4e6] flex flex-col min-h-screen">
        <FlowerPetals />
        <Hero />
        <SaveTheDate />
        <OurStory />
        <Timeline />
        <Gallery />
        <RSVP />
        <Closing />
        <Footer />
      </div>
    </main>
  );
}
