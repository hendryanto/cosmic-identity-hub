import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Cosmos</h2>
            <p className="text-gray-600 mb-4">
              We are a leading digital solutions provider, specializing in creating innovative
              technology solutions that help businesses thrive in the digital age.
            </p>
            <p className="text-gray-600 mb-6">
              With years of experience and a passionate team of experts, we deliver
              cutting-edge solutions tailored to your specific needs.
            </p>
            <button className="bg-secondary hover:bg-secondary/90 text-white px-6 py-2 rounded-lg transition-colors">
              Learn More
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-[400px] rounded-lg overflow-hidden"
          >
            <img
              src="/placeholder.svg"
              alt="About Cosmos"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;