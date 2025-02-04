import { useState } from "react";
import Navbar from "../../components/Navbar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQ = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const faqs = [
    {
      id: "1",
      question: "How do I register my product warranty?",
      answer:
        "You can register your product warranty by visiting our warranty registration page and filling out the form with your product details.",
    },
    {
      id: "2",
      question: "What is the standard warranty period?",
      answer:
        "Our standard warranty period is 12 months from the date of purchase for most products.",
    },
    // Add more FAQs here
  ];

  const toggleItem = (id: string) => {
    setOpenItems((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h1>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <Collapsible
                key={faq.id}
                open={openItems.includes(faq.id)}
                onOpenChange={() => toggleItem(faq.id)}
                className="border rounded-lg"
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
                  <span className="font-medium">{faq.question}</span>
                  {openItems.includes(faq.id) ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 pt-0 text-gray-600">
                  {faq.answer}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;