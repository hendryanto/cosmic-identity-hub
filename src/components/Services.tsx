import { motion } from "framer-motion";
import { Code, Smartphone, Globe } from "lucide-react";

const services = [
  {
    icon: <Code className="w-12 h-12 mb-4" />,
    title: "Web Development",
    description: "Custom web applications built with modern technologies",
  },
  {
    icon: <Smartphone className="w-12 h-12 mb-4" />,
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications",
  },
  {
    icon: <Globe className="w-12 h-12 mb-4" />,
    title: "Digital Solutions",
    description: "End-to-end digital transformation services",
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
          Our Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow"
            >
              {service.icon}
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