import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is CS Mastery?",
    answer:
      "CS Mastery is an innovative platform designed to help students master computer science concepts through interactive learning, expert guidance, and AI-powered assistance. We provide comprehensive resources for various CS subjects and topics.",
  },
  {
    question: "How do I get started?",
    answer:
      "Getting started is easy! Simply browse our subject catalog, choose a topic you're interested in, and begin learning. You can access our resources 24/7 and track your progress as you go.",
  },
  {
    question: "Are the resources free?",
    answer:
      "We offer both free and premium content. Basic access to our learning materials is free, while premium features like one-on-one expert sessions and advanced AI assistance require a subscription.",
  },
  {
    question: "How does the AI assistance work?",
    answer:
      "Our AI system provides personalized learning assistance by analyzing your questions and providing detailed explanations, examples, and practice problems. It adapts to your learning style and helps you understand complex concepts better.",
  },
  {
    question: "Can I request specific subjects or topics?",
    answer:
      "Yes! We're constantly expanding our content library based on user requests. You can submit requests for specific subjects or topics through our platform, and we'll prioritize adding them based on demand.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach our support team through multiple channels: email (support@csmastery.com), our contact form, or through the chat feature on our platform. We typically respond within 24 hours.",
  },
];

export function FAQ() {
  return (
    <section id="faq-section" className="w-full pt-12 pb-40">
      <div className="container px-4 md:px-8 lg:px-12">
        <div className="flex flex-col items-start md:items-center justify-between space-y-8 md:space-y-0">
          <div className="text-left mb-12 flex-none">
            <div className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Frequently Asked Questions
            </div>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2">
              Find answers to common questions about our platform and services.
            </p>
          </div>
          <div className="md:w-2/3">
            <Accordion
              type="single"
              collapsible
              className="w-full border rounded-xl  dark:bg-gray-800 shadow-md"
            >
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b last:border-none"
                >
                  <AccordionTrigger className="text-sm md:text-base font-medium text-left py-3 px-5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-3 text-gray-600 dark:text-gray-300 text-sm md:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
