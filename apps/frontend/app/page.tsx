
import { Features } from "@/components/features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Pricing } from "@/components/Pricing";


export default function Home() {
  return (
    <div>
      <Hero/>
      <Pricing/>
      <Features/>
      <Footer/>
    </div>
  );
}
