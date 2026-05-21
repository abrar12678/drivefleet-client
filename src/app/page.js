import AvailableCars from "@/components/AvailableCars";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AvailableCars />
      <HowItWorks />
      <WhyChooseUs />
    </div>
  );
}
