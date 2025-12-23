import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: "Is it safe to drink Serenitea during pregnancy or breastfeeding?",
    answer: "Our herbal teas are caffeine-free and generally considered safe during pregnancy and breastfeeding since they are made from 100% natural ingredients and contain no artificial additives. However, we always recommend consulting with your healthcare provider."
  },
  {
    question: "Can children drink Serenitea?",
    answer: "Yes, children can drink our caffeine-free herbal teas as they are natural beverages with no added sugars or artificial ingredients."
  },
  {
    question: "When is the best time to drink herbal tea – morning, afternoon, or evening?",
    answer: "Our herbal teas can be consumed at any time because they are caffeine-free, so you can even drink them in the evening without disturbing your sleep. They're perfect as a refreshing drink in the morning or as a light beverage during the day."
  },
  {
    question: "How much tea is recommended per day?",
    answer: "There is no specific limit, but 2-3 cups per day is ideal. However, be mindful of excessive fluid intake to avoid overloading the kidneys."
  },
  {
    question: "Can it be consumed on an empty stomach?",
    answer: "Yes, our herbal teas can be consumed on an empty stomach as they are gentle on the digestive system. If you have a sensitive stomach, try it out to see if you tolerate it well."
  },
  {
    question: "Can people with allergies (e.g., gluten intolerance) drink Serenitea?",
    answer: "Our herbal teas are naturally gluten-free and suitable for people with gluten intolerance. Please check individual product ingredients for specific allergen information."
  },
  {
    question: "Can Serenitea be included in special diets (e.g., keto, vegan)?",
    answer: "Yes, our teas are vegan, gluten-free, and contain no carbohydrates, so they fit into a ketogenic diet as well."
  },
  {
    question: "Does Serenitea have any side effects?",
    answer: "Our herbal teas are generally safe, but people with specific plant allergies should check ingredients before consuming. Very rarely, certain herbs can cause allergic reactions in sensitive individuals."
  },
  {
    question: "How long does brewed tea last?",
    answer: "Brewed tea is best consumed within 24 hours if stored in the refrigerator."
  },
  {
    question: "Can Serenitea be consumed cold?",
    answer: "Yes, our teas are also very delicious cold! Simply let your brewed tea cool, then place it in the fridge or add ice for a refreshing iced tea experience."
  }
];

export const FAQSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about our herbal teas
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-border/50 rounded-lg px-6 bg-card/50 data-[state=open]:bg-card data-[state=open]:shadow-soft transition-all duration-300"
            >
              <AccordionTrigger className="text-left font-serif text-lg text-foreground hover:text-primary hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
