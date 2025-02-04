import Navbar from "../components/Navbar";
import VideoSlider from "../components/VideoSlider";
import CampaignProducts from "../components/CampaignProducts";
import Contact from "../components/Contact";

const Index = () => {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <VideoSlider />
      <CampaignProducts />
      <Contact />
    </main>
  );
};

export default Index;