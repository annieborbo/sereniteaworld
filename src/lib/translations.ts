export type Language = 'en' | 'nl';

export const translations = {
  en: {
    // Header
    header: {
      announcement: 'Free shipping on orders over €50 | Use code SERENITY10 for 10% off',
      nav: {
        shop: 'Shop Now',
        reviews: 'Customer Reviews',
        aboutTea: 'About',
        faq: 'FAQ',
      },
    },
    // Hero
    hero: {
      badge: '100% Natural • Caffeine Free',
      title1: 'Tartary',
      title2: 'Buckwheat',
      title3: 'Tea',
      description: 'Experience the ancient tradition of Soba tea. Pure, naturally caffeine-free, and packed with antioxidants for your wellness journey.',
      shopNow: 'Shop Now',
      learnMore: 'Learn More',
      glutenFree: 'Gluten Free',
      vegan: 'Vegan',
      natural: '100% Natural',
      discover: 'Discover',
    },
    // Featured Products
    products: {
      subtitle: 'Our Collection',
      title: 'Featured Products',
      description: 'Discover our carefully curated selection of premium Tartary Buckwheat teas, crafted for moments of pure tranquility.',
      addToCart: 'Add to Cart',
      viewAll: 'View All Products',
      items: {
        box: {
          name: 'Tartary Buckwheat Tea Box',
          description: '15 individually wrapped tea bags. Convenient, mess-free',
        },
        pouch: {
          name: 'Tartary Buckwheat Tea Pouch',
          description: '100g of loose buckwheat seeds. Less packaging waste, more control over brewing',
        },
        set: {
          name: 'Tea Discovery Set',
          description: 'Box + Pouch bundle',
        },
      },
      badges: {
        bestseller: 'Bestseller',
        sale: 'Sale',
        bundle: 'Bundle',
        save16: 'Save 16%',
      },
    },
    // Benefits
    benefits: {
      subtitle: 'Why Choose Us',
      title: 'Health Benefits',
      description: 'Tartary Buckwheat has been treasured for centuries in Asian cultures for its remarkable health-promoting properties.',
      items: {
        caffeineFree: {
          title: 'Caffeine Free',
          description: 'Enjoy anytime without worrying about sleep disruption or jitters.',
        },
        heartHealthy: {
          title: 'Heart Healthy',
          description: 'Rich in rutin, supporting cardiovascular health and circulation.',
        },
        antioxidant: {
          title: 'Antioxidant Rich',
          description: 'Packed with flavonoids that help protect your cells from damage.',
        },
        relaxation: {
          title: 'Promotes Relaxation',
          description: 'Natural compounds help calm the mind and reduce stress.',
        },
        natural: {
          title: '100% Natural',
          description: 'No artificial additives, preservatives, or flavoring agents.',
        },
        digestion: {
          title: 'Supports Digestion',
          description: 'Gentle on the stomach and aids in healthy digestion.',
        },
      },
    },
    // About
    about: {
      subtitle: 'What is Tartary Buckwheat Tea?',
      title1: 'Ancient Wisdom,',
      title2: 'Modern Wellness',
      p1: 'Serenitea brings you the treasured tradition of Tartary Buckwheat tea, known in Asia as "Soba Cha." For centuries, this remarkable grain has been celebrated for its nutty, toasted flavor and exceptional health benefits.',
      p2: 'Our tea is made from 100% pure Tartary Buckwheat, carefully roasted to perfection using time-honored techniques. Each sip delivers a warm, earthy taste with subtle hints of honey and nuts – a truly unique tea experience.',
      p3: "Whether you're seeking a caffeine-free alternative or exploring natural wellness solutions, Serenitea offers a moment of calm in your busy day.",
      stats: {
        natural: 'Natural',
        caffeine: 'Caffeine',
        customers: 'Happy Customers',
      },
    },
    // Testimonials
    testimonials: {
      subtitle: 'Testimonials',
      title: 'What Our Customers Say',
      description: 'Join thousands of tea lovers who have discovered the serenity of Tartary Buckwheat tea.',
      verifiedBuyer: 'Verified Buyer',
      items: [
        {
          name: 'Sarah M.',
          text: "I've been searching for a caffeine-free tea that actually tastes good, and Serenitea is it! The nutty, toasted flavor is absolutely delicious. It's become my evening ritual.",
        },
        {
          name: 'Michael T.',
          text: "As someone who's sensitive to caffeine, this tea has been a game-changer. I can enjoy it any time of day without worrying about sleep. Plus, the packaging is beautiful!",
        },
        {
          name: 'Emily R.',
          text: "The quality is exceptional. I love knowing that it's 100% natural and gluten-free. The taste is unique and comforting – like a warm hug in a cup.",
        },
      ],
    },
    // FAQ
    faq: {
      title: 'Frequently Asked Questions',
      description: 'Everything you need to know about our herbal teas',
      items: [
        {
          question: 'Is it safe to drink Serenitea during pregnancy or breastfeeding?',
          answer: 'Our herbal teas are caffeine-free and generally considered safe during pregnancy and breastfeeding since they are made from 100% natural ingredients and contain no artificial additives. However, we always recommend consulting with your healthcare provider.',
        },
        {
          question: 'Can children drink Serenitea?',
          answer: 'Yes, children can drink our caffeine-free herbal teas as they are natural beverages with no added sugars or artificial ingredients.',
        },
        {
          question: 'When is the best time to drink herbal tea – morning, afternoon, or evening?',
          answer: "Our herbal teas can be consumed at any time because they are caffeine-free, so you can even drink them in the evening without disturbing your sleep. They're perfect as a refreshing drink in the morning or as a light beverage during the day.",
        },
        {
          question: 'How much tea is recommended per day?',
          answer: 'There is no specific limit, but 2-3 cups per day is ideal. However, be mindful of excessive fluid intake to avoid overloading the kidneys.',
        },
        {
          question: 'Can it be consumed on an empty stomach?',
          answer: 'Yes, our herbal teas can be consumed on an empty stomach as they are gentle on the digestive system. If you have a sensitive stomach, try it out to see if you tolerate it well.',
        },
        {
          question: 'Can people with allergies (e.g., gluten intolerance) drink Serenitea?',
          answer: 'Our herbal teas are naturally gluten-free and suitable for people with gluten intolerance. Please check individual product ingredients for specific allergen information.',
        },
        {
          question: 'Can Serenitea be included in special diets (e.g., keto, vegan)?',
          answer: 'Yes, our teas are vegan, gluten-free, and contain no carbohydrates, so they fit into a ketogenic diet as well.',
        },
        {
          question: 'Does Serenitea have any side effects?',
          answer: 'Our herbal teas are generally safe, but people with specific plant allergies should check ingredients before consuming. Very rarely, certain herbs can cause allergic reactions in sensitive individuals.',
        },
        {
          question: 'How long does brewed tea last?',
          answer: 'Brewed tea is best consumed within 24 hours if stored in the refrigerator.',
        },
        {
          question: 'Can Serenitea be consumed cold?',
          answer: 'Yes, our teas are also very delicious cold! Simply let your brewed tea cool, then place it in the fridge or add ice for a refreshing iced tea experience.',
        },
      ],
    },
    // Newsletter
    newsletter: {
      subtitle: 'Stay Connected',
      title: 'Join the Serenitea Family',
      description: 'Subscribe to our newsletter for exclusive offers, brewing tips, and wellness inspiration. Get 10% off your first order!',
      placeholder: 'Enter your email',
      subscribe: 'Subscribe',
      privacy: 'By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.',
      success: 'Thank you for subscribing!',
      successDesc: "You'll receive our newsletter and 10% off your first order.",
    },
    // Footer
    footer: {
      brand: 'Bringing you the finest Tartary Buckwheat tea for moments of pure serenity and wellness.',
      quickLinks: 'Quick Links',
      links: {
        shopAll: 'Shop All',
        aboutUs: 'About Us',
        healthBenefits: 'Health Benefits',
        brewingGuide: 'Brewing Guide',
        faq: 'FAQ',
      },
      customerService: 'Customer Service',
      serviceLinks: {
        contactUs: 'Contact Us',
        shippingPolicy: 'Shipping Policy',
        returns: 'Returns & Exchanges',
        trackOrder: 'Track Order',
        privacyPolicy: 'Privacy Policy',
      },
      getInTouch: 'Get in Touch',
      copyright: '© 2024 Serenitea. All rights reserved.',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      cookies: 'Cookie Policy',
    },
  },
  nl: {
    // Header
    header: {
      announcement: 'Gratis verzending bij bestellingen boven €50 | Gebruik code SERENITY10 voor 10% korting',
      nav: {
        shop: 'Shop Nu',
        reviews: 'Klantbeoordelingen',
        aboutTea: 'Over',
        faq: 'FAQ',
      },
    },
    // Hero
    hero: {
      badge: '100% Natuurlijk • Cafeïnevrij',
      title1: 'Tartaarse',
      title2: 'Boekweit',
      title3: 'Thee',
      description: 'Ervaar de oude traditie van Soba-thee. Puur, van nature cafeïnevrij en boordevol antioxidanten voor jouw welzijnsreis.',
      shopNow: 'Shop Nu',
      learnMore: 'Meer Leren',
      glutenFree: 'Glutenvrij',
      vegan: 'Veganistisch',
      natural: '100% Natuurlijk',
      discover: 'Ontdek',
    },
    // Featured Products
    products: {
      subtitle: 'Onze Collectie',
      title: 'Uitgelichte Producten',
      description: 'Ontdek onze zorgvuldig samengestelde selectie van premium Tartaarse Boekweitthee, gemaakt voor momenten van pure rust.',
      addToCart: 'In Winkelwagen',
      viewAll: 'Bekijk Alle Producten',
      items: {
        box: {
          name: 'Tartaarse Boekweitthee Doos',
          description: '15 individueel verpakte theezakjes. Handig, geen rommel',
        },
        pouch: {
          name: 'Tartaarse Boekweitthee Zak',
          description: '100g losse boekweitzaden. Minder verpakkingsafval, meer controle over het zetten',
        },
        set: {
          name: 'Thee Ontdekkingsset',
          description: 'Doos + Zak bundel',
        },
      },
      badges: {
        bestseller: 'Bestseller',
        sale: 'Aanbieding',
        bundle: 'Bundel',
        save16: 'Bespaar 16%',
      },
    },
    // Benefits
    benefits: {
      subtitle: 'Waarom Wij',
      title: 'Gezondheidsvoordelen',
      description: 'Tartaarse Boekweit wordt al eeuwenlang gekoesterd in Aziatische culturen vanwege zijn opmerkelijke gezondheidsbevorderende eigenschappen.',
      items: {
        caffeineFree: {
          title: 'Cafeïnevrij',
          description: 'Geniet op elk moment zonder zorgen over slaapverstoring of nervositeit.',
        },
        heartHealthy: {
          title: 'Hartgezond',
          description: 'Rijk aan rutine, ondersteunt de cardiovasculaire gezondheid en bloedsomloop.',
        },
        antioxidant: {
          title: 'Rijk aan Antioxidanten',
          description: 'Boordevol flavonoïden die helpen je cellen te beschermen tegen schade.',
        },
        relaxation: {
          title: 'Bevordert Ontspanning',
          description: 'Natuurlijke verbindingen helpen de geest te kalmeren en stress te verminderen.',
        },
        natural: {
          title: '100% Natuurlijk',
          description: 'Geen kunstmatige toevoegingen, conserveermiddelen of smaakstoffen.',
        },
        digestion: {
          title: 'Ondersteunt Spijsvertering',
          description: 'Zacht voor de maag en bevordert een gezonde spijsvertering.',
        },
      },
    },
    // About
    about: {
      subtitle: 'Wat is Tartaarse Boekweitthee?',
      title1: 'Oude Wijsheid,',
      title2: 'Modern Welzijn',
      p1: 'Serenitea brengt u de gekoesterde traditie van Tartaarse Boekweitthee, in Azië bekend als "Soba Cha." Eeuwenlang wordt deze opmerkelijke graansoort gevierd om zijn nootachtige, geroosterde smaak en uitzonderlijke gezondheidsvoordelen.',
      p2: 'Onze thee wordt gemaakt van 100% pure Tartaarse Boekweit, zorgvuldig geroosterd tot perfectie met behulp van eeuwenoude technieken. Elke slok levert een warme, aardse smaak met subtiele hints van honing en noten – een werkelijk unieke thee-ervaring.',
      p3: 'Of u nu op zoek bent naar een cafeïnevrij alternatief of natuurlijke welzijnsoplossingen verkent, Serenitea biedt een moment van rust in uw drukke dag.',
      stats: {
        natural: 'Natuurlijk',
        caffeine: 'Cafeïne',
        customers: 'Tevreden Klanten',
      },
    },
    // Testimonials
    testimonials: {
      subtitle: 'Getuigenissen',
      title: 'Wat Onze Klanten Zeggen',
      description: 'Sluit u aan bij duizenden theeliefhebbers die de sereniteit van Tartaarse Boekweitthee hebben ontdekt.',
      verifiedBuyer: 'Geverifieerde Koper',
      items: [
        {
          name: 'Sarah M.',
          text: 'Ik zocht naar een cafeïnevrije thee die echt lekker smaakt, en Serenitea is het! De nootachtige, geroosterde smaak is absoluut heerlijk. Het is mijn avondritueel geworden.',
        },
        {
          name: 'Michael T.',
          text: 'Als iemand die gevoelig is voor cafeïne, is deze thee een echte game-changer. Ik kan er op elk moment van de dag van genieten zonder me zorgen te maken over slaap. Plus, de verpakking is prachtig!',
        },
        {
          name: 'Emily R.',
          text: 'De kwaliteit is uitzonderlijk. Ik vind het heerlijk te weten dat het 100% natuurlijk en glutenvrij is. De smaak is uniek en troostend – als een warme knuffel in een kopje.',
        },
      ],
    },
    // FAQ
    faq: {
      title: 'Veelgestelde Vragen',
      description: 'Alles wat u moet weten over onze kruidenthee',
      items: [
        {
          question: 'Is het veilig om Serenitea te drinken tijdens zwangerschap of borstvoeding?',
          answer: 'Onze kruidenthee is cafeïnevrij en wordt over het algemeen als veilig beschouwd tijdens zwangerschap en borstvoeding, aangezien deze is gemaakt van 100% natuurlijke ingrediënten zonder kunstmatige toevoegingen. We raden echter altijd aan om uw zorgverlener te raadplegen.',
        },
        {
          question: 'Kunnen kinderen Serenitea drinken?',
          answer: 'Ja, kinderen kunnen onze cafeïnevrije kruidenthee drinken, aangezien het natuurlijke dranken zijn zonder toegevoegde suikers of kunstmatige ingrediënten.',
        },
        {
          question: "Wat is het beste moment om kruidenthee te drinken – 's ochtends, 's middags of 's avonds?",
          answer: "Onze kruidenthee kan op elk moment worden gedronken omdat deze cafeïnevrij is, dus u kunt deze zelfs 's avonds drinken zonder uw slaap te verstoren. Perfect als verfrissend drankje in de ochtend of als licht drankje overdag.",
        },
        {
          question: 'Hoeveel thee wordt aanbevolen per dag?',
          answer: 'Er is geen specifieke limiet, maar 2-3 kopjes per dag is ideaal. Let wel op overmatige vochtinname om de nieren niet te overbelasten.',
        },
        {
          question: 'Kan het op een lege maag worden gedronken?',
          answer: 'Ja, onze kruidenthee kan op een lege maag worden gedronken omdat deze zacht is voor het spijsverteringsstelsel. Als u een gevoelige maag heeft, probeer het uit om te zien of u het goed verdraagt.',
        },
        {
          question: 'Kunnen mensen met allergieën (bijv. glutenintolerantie) Serenitea drinken?',
          answer: 'Onze kruidenthee is van nature glutenvrij en geschikt voor mensen met glutenintolerantie. Controleer de individuele productingrediënten voor specifieke allergeneninformatie.',
        },
        {
          question: 'Kan Serenitea worden opgenomen in speciale diëten (bijv. keto, veganistisch)?',
          answer: 'Ja, onze thee is veganistisch, glutenvrij en bevat geen koolhydraten, dus past in een ketogeen dieet.',
        },
        {
          question: 'Heeft Serenitea bijwerkingen?',
          answer: 'Onze kruidenthee is over het algemeen veilig, maar mensen met specifieke plantenallergieën moeten de ingrediënten controleren voor consumptie. Zeer zelden kunnen bepaalde kruiden allergische reacties veroorzaken bij gevoelige personen.',
        },
        {
          question: 'Hoe lang blijft gezette thee goed?',
          answer: 'Gezette thee wordt het beste binnen 24 uur geconsumeerd als deze in de koelkast wordt bewaard.',
        },
        {
          question: 'Kan Serenitea koud worden gedronken?',
          answer: 'Ja, onze thee is ook erg lekker koud! Laat uw gezette thee gewoon afkoelen, zet deze in de koelkast of voeg ijs toe voor een verfrissende ijsthee-ervaring.',
        },
      ],
    },
    // Newsletter
    newsletter: {
      subtitle: 'Blijf Verbonden',
      title: 'Word Lid van de Serenitea Familie',
      description: 'Schrijf u in voor onze nieuwsbrief voor exclusieve aanbiedingen, zettippen en welzijnsinspiratie. Krijg 10% korting op uw eerste bestelling!',
      placeholder: 'Voer uw e-mail in',
      subscribe: 'Inschrijven',
      privacy: 'Door u in te schrijven, gaat u akkoord met ons Privacybeleid. U kunt zich op elk moment afmelden.',
      success: 'Bedankt voor uw inschrijving!',
      successDesc: 'U ontvangt onze nieuwsbrief en 10% korting op uw eerste bestelling.',
    },
    // Footer
    footer: {
      brand: 'Wij brengen u de beste Tartaarse Boekweitthee voor momenten van pure sereniteit en welzijn.',
      quickLinks: 'Snelle Links',
      links: {
        shopAll: 'Alle Producten',
        aboutUs: 'Over Ons',
        healthBenefits: 'Gezondheidsvoordelen',
        brewingGuide: 'Zetgids',
        faq: 'FAQ',
      },
      customerService: 'Klantenservice',
      serviceLinks: {
        contactUs: 'Contact',
        shippingPolicy: 'Verzendbeleid',
        returns: 'Retourneren & Ruilen',
        trackOrder: 'Bestelling Volgen',
        privacyPolicy: 'Privacybeleid',
      },
      getInTouch: 'Neem Contact Op',
      copyright: '© 2024 Serenitea. Alle rechten voorbehouden.',
      terms: 'Algemene Voorwaarden',
      privacy: 'Privacybeleid',
      cookies: 'Cookiebeleid',
    },
  },
};

export type Translations = typeof translations.en;
