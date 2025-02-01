import { motion } from "framer-motion";
import { Refrigerator, Waves, Coffee, Fan, Smartphone, Tv } from "lucide-react";

const services = [
  {
    icon: <Refrigerator className="w-12 h-12 mb-4" />,
    title: "Kitchen Appliances",
    description: "Smart refrigerators, dishwashers, and cooking solutions",
  },
  {
    icon: <Waves className="w-12 h-12 mb-4" />,
    title: "Laundry Solutions",
    description: "Advanced washers and dryers for your home",
  },
  {
    icon: <Coffee className="w-12 h-12 mb-4" />,
    title: "Small Appliances",
    description: "Coffee makers, toasters, and kitchen essentials",
  },
  {
    icon: <Fan className="w-12 h-12 mb-4" />,
    title: "Climate Control",
    description: "Air conditioners and heating solutions",
  },
  {
    icon: <Smartphone className="w-12 h-12 mb-4" />,
    title: "Smart Integration",
    description: "Connected appliances for the modern home",
  },
  {
    icon: <Tv className="w-12 h-12 mb-4" />,
    title: "Home Entertainment",
    description: "Premium audio and visual solutions",
  },
];

const Services = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Our Product Categories
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="text-secondary">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;