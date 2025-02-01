import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary to-primary/90 text-white pt-16">
      <div className="container mx-auto px-4 py-32 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Inovasi untuk Keluarga Indonesia
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto"
        >
          Sejak 1976, Cosmos telah menjadi bagian dari keluarga Indonesia dengan produk elektronik rumah tangga berkualitas
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            variant="secondary"
            size="lg"
            className="text-lg"
            onClick={() => window.open("https://store.cosmos.id", "_blank")}
          >
            Official Store
            <ArrowRight className="ml-2" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-lg text-white border-white hover:bg-white hover:text-primary"
            onClick={() => window.location.href = '/products'}
          >
            Lihat Produk
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;