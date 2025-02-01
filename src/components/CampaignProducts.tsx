import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Rice Cooker Digital 2L",
    description: "Rice cooker digital dengan 10 menu preset dan teknologi 3D heating untuk hasil nasi yang sempurna",
    image: "/lovable-uploads/42c7ecd0-4323-444c-a0d5-374d9404a16e.png",
    price: "Rp 799.000",
  },
  {
    id: 2,
    name: "Stand Fan 16 inch",
    description: "Kipas angin berdiri 16 inch dengan 3 kecepatan dan swing otomatis untuk sirkulasi udara optimal",
    image: "/lovable-uploads/21dbcc70-f063-4b4d-868f-91688ac39e18.png",
    price: "Rp 299.000",
  },
  {
    id: 3,
    name: "Air Cooler 15L",
    description: "Pendingin udara dengan kapasitas 15L, 3 kecepatan, dan mode sleep untuk kenyamanan maksimal",
    image: "/lovable-uploads/43efd89a-bcf3-41f9-b9d1-5a305bfd1e07.png",
    price: "Rp 1.299.000",
  },
];

const CampaignProducts = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Produk Unggulan</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan produk-produk terbaik kami untuk memenuhi kebutuhan rumah tangga Anda
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative h-64">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-primary">{product.price}</span>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="text-sm"
                    onClick={() => window.open("https://store.cosmos.id", "_blank")}
                  >
                    Beli Sekarang
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampaignProducts;