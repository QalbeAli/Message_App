import Hero from "@/components/HomePageComponents/Hero";
import Results from "@/components/HomePageComponents/Results";
import AIVideo from "@/components/HomePageComponents/AIVideo";
import Stats from "@/components/HomePageComponents/Stats";
import Captions from "@/components/HomePageComponents/Captions";
import CreateVideos from "@/components/HomePageComponents/CreateVideos";
import FAQ from "@/components/HomePageComponents/FAQ";
import ZVideoAIPricing from "@/components/HomePageComponents/pricing";

export default function Home() {
  return (
    <div>
      <Hero />
      {/* <Stats /> */}
      {/* <AIVideo /> */}
      {/* <Captions /> */}
      {/* <CreateVideos /> */}
      <ZVideoAIPricing />
      {/* <PricingSection /> */}
      {/* <FAQ /> */}
    </div>
  );
}
