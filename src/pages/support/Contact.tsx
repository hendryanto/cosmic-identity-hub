import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <h1 className="text-3xl font-bold">Contact Us</h1>
            <img
              src="/lovable-uploads/1581090464777-f3220bbe1b8b.png"
              alt="Contact Illustration"
              className="mx-auto w-64 h-64 object-cover rounded-lg"
            />
            <p className="text-lg text-gray-600">
              Need help? Contact our customer service team through WhatsApp
            </p>
            <a
              href="https://api.whatsapp.com/send/?phone=6281806267667&text=Hi%2CCosmos.&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Chat with Us on WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;