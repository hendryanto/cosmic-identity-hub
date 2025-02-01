import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CampaignProducts from "../components/CampaignProducts";
import Contact from "../components/Contact";

const Index = () => {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <CampaignProducts />
      <Contact />
    </main>
  );
};

export default Index;