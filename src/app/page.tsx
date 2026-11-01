import HeroSlider from "@/components/home/HeroSlider";
import CategoryCards from "@/components/home/CategoryCards";
import FeaturedStudios from "@/components/home/FeaturedStudios";
import HowItWorks from "@/components/home/HowItWorks";
import HostGuarantee from "@/components/home/HostGuarantee";

export default function HomePage() {
  return (
    <div className="space-y-12 pb-16">

      <HeroSlider />

      <CategoryCards />

      <FeaturedStudios />

      <HowItWorks />

      <HostGuarantee />
    </div>
  );
}
