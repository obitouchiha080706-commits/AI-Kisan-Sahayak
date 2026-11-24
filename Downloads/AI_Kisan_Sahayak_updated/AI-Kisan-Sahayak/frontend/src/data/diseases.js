/* Sample disease library. Used for demo results until a real model is connected
   and as plain-language reference text. Advice is deliberately general:
   it never gives chemical doses and always points to the local officer. */

export const CROPS = [
  { id: "tomato", name: { en: "Tomato", hi: "टमाटर" } },
  { id: "potato", name: { en: "Potato", hi: "आलू" } },
  { id: "rice", name: { en: "Rice", hi: "धान" } },
  { id: "wheat", name: { en: "Wheat", hi: "गेहूं" } },
  { id: "cotton", name: { en: "Cotton", hi: "कपास" } },
  { id: "maize", name: { en: "Maize", hi: "मक्का" } },
  { id: "chilli", name: { en: "Chilli", hi: "मिर्च" } },
  { id: "other", name: { en: "Not sure", hi: "पता नहीं" } },
];

const ASK_OFFICER = {
  en: "Ask your agriculture officer or Krishi Vigyan Kendra which fungicide or pesticide to use, and follow the label for dose and safety.",
  hi: "कौन सा फफूंदनाशक या कीटनाशक इस्तेमाल करना है, यह अपने कृषि अधिकारी या कृषि विज्ञान केंद्र से पूछिए, और मात्रा व सुरक्षा के लिए लेबल का पालन कीजिए।",
};

export const HEALTHY = {
  id: "healthy",
  crop: "any",
  name: { en: "Healthy leaf", hi: "स्वस्थ पत्ता" },
  severity: "none",
  health: 94,
  symptoms: {
    en: ["No clear spots, holes or colour change found", "Leaf colour looks even and normal", "No visible insects on the leaf"],
    hi: ["कोई साफ़ धब्बा, छेद या रंग बदलाव नहीं मिला", "पत्ते का रंग एक सा और सामान्य दिखता है", "पत्ते पर कोई कीट नहीं दिखा"],
  },
  actions: {
    en: ["Keep up your regular watering and care", "Check a few other plants in the field to be sure"],
    hi: ["नियमित सिंचाई और देखभाल जारी रखिए", "पक्का करने के लिए खेत के कुछ और पौधे भी देखिए"],
  },
  prevention: {
    en: ["Walk the field once a week and look under the leaves", "Keep the field free of weeds"],
    hi: ["हफ्ते में एक बार खेत में घूमकर पत्तों के नीचे देखिए", "खेत को खरपतवार से मुक्त रखिए"],
  },
};

export const DISEASES = [
  {
    id: "tomato-early-blight",
    crop: "tomato",
    name: { en: "Early blight", hi: "अगेती झुलसा (अर्ली ब्लाइट)" },
    severity: "moderate",
    health: 62,
    symptoms: {
      en: ["Dark brown spots with ring-like marks, usually on older lower leaves", "Yellow patches around the spots", "Badly hit leaves dry up and fall"],
      hi: ["गहरे भूरे धब्बे जिन पर छल्ले जैसे निशान होते हैं, आमतौर पर नीचे के पुराने पत्तों पर", "धब्बों के चारों ओर पीलापन", "ज़्यादा प्रभावित पत्ते सूखकर गिर जाते हैं"],
    },
    actions: {
      en: ["Pick off and destroy the affected leaves. Do not compost them", "Water at the base of the plant and avoid wetting the leaves", ASK_OFFICER.en],
      hi: ["प्रभावित पत्ते तोड़कर नष्ट कर दीजिए। उनसे खाद मत बनाइए", "पौधे की जड़ के पास पानी दीजिए, पत्ते भिगोने से बचिए", ASK_OFFICER.hi],
    },
    prevention: {
      en: ["Rotate with non-tomato crops for two to three years", "Stake the plants and give them space for air to flow"],
      hi: ["दो से तीन साल टमाटर की जगह दूसरी फसलें बदल-बदलकर लगाइए", "पौधों को सहारा दीजिए और हवा चलने के लिए दूरी रखिए"],
    },
  },
  {
    id: "tomato-leaf-curl",
    crop: "tomato",
    name: { en: "Leaf curl virus", hi: "पत्ता मरोड़ विषाणु (लीफ कर्ल वायरस)" },
    severity: "severe",
    health: 45,
    symptoms: {
      en: ["Leaves curl upward and look small and crinkled", "Plant stays stunted with yellowing leaf edges", "Few flowers and fruits"],
      hi: ["पत्ते ऊपर की ओर मुड़ जाते हैं और छोटे व सिकुड़े दिखते हैं", "पौधा बौना रहता है और पत्तों के किनारे पीले पड़ते हैं", "फूल और फल कम आते हैं"],
    },
    actions: {
      en: ["Remove and destroy infected plants early. A virus cannot be cured", "Control whiteflies, which spread it: use yellow sticky traps and neem-based spray", ASK_OFFICER.en],
      hi: ["संक्रमित पौधों को जल्दी उखाड़कर नष्ट कर दीजिए। विषाणु का इलाज नहीं होता", "सफ़ेद मक्खी को रोकिए, यही इसे फैलाती है: पीले चिपचिपे जाल और नीम आधारित छिड़काव इस्तेमाल कीजिए", ASK_OFFICER.hi],
    },
    prevention: {
      en: ["Raise seedlings under insect-proof net", "Use tolerant varieties and keep weeds down"],
      hi: ["पौध कीट-रोधी जाली के नीचे तैयार कीजिए", "सहनशील किस्में लगाइए और खरपतवार कम रखिए"],
    },
  },
  {
    id: "potato-late-blight",
    crop: "potato",
    name: { en: "Late blight", hi: "पछेती झुलसा (लेट ब्लाइट)" },
    severity: "severe",
    health: 40,
    symptoms: {
      en: ["Water-soaked dark patches that spread fast on leaves", "White fuzzy growth under the leaf in humid weather", "Stems may turn dark and the plant collapses"],
      hi: ["पत्तों पर पानी भरे गहरे धब्बे जो तेज़ी से फैलते हैं", "नमी वाले मौसम में पत्ते के नीचे सफ़ेद रोएँदार परत", "तने काले पड़ सकते हैं और पौधा गिर जाता है"],
    },
    actions: {
      en: ["Act quickly: this disease spreads fast in cool, humid weather", "Remove and destroy badly affected plants", ASK_OFFICER.en],
      hi: ["जल्दी कदम उठाइए: ठंडे और नम मौसम में यह रोग तेज़ी से फैलता है", "बुरी तरह प्रभावित पौधों को उखाड़कर नष्ट कर दीजिए", ASK_OFFICER.hi],
    },
    prevention: {
      en: ["Plant certified, disease-free seed tubers", "Earth up the rows and avoid watering late in the evening"],
      hi: ["प्रमाणित, रोग-मुक्त बीज कंद लगाइए", "मेड़ों पर मिट्टी चढ़ाइए और शाम देर से सिंचाई मत कीजिए"],
    },
  },
  {
    id: "rice-blast",
    crop: "rice",
    name: { en: "Rice blast", hi: "धान का झोंका रोग (ब्लास्ट)" },
    severity: "moderate",
    health: 58,
    symptoms: {
      en: ["Diamond-shaped spots with a grey centre and brown edge on leaves", "Spots join and the leaf dries", "In bad cases the neck of the panicle breaks"],
      hi: ["पत्तों पर आँख जैसे धब्बे, बीच में भूरा-स्लेटी और किनारे भूरे", "धब्बे मिलकर पत्ता सुखा देते हैं", "गंभीर मामलों में बाली की गर्दन टूट जाती है"],
    },
    actions: {
      en: ["Avoid extra nitrogen fertiliser, it makes the disease worse", "Keep a steady water level in the field", ASK_OFFICER.en],
      hi: ["अतिरिक्त नाइट्रोजन खाद न डालिए, इससे रोग बढ़ता है", "खेत में पानी का स्तर स्थिर रखिए", ASK_OFFICER.hi],
    },
    prevention: {
      en: ["Choose resistant varieties and treat seed before sowing", "Use balanced fertiliser based on a soil test"],
      hi: ["रोग-रोधी किस्में चुनिए और बुवाई से पहले बीज का उपचार कीजिए", "मिट्टी जाँच के आधार पर संतुलित खाद डालिए"],
    },
  },
  {
    id: "wheat-yellow-rust",
    crop: "wheat",
    name: { en: "Yellow rust", hi: "पीला रतुआ (येलो रस्ट)" },
    severity: "moderate",
    health: 60,
    symptoms: {
      en: ["Yellow to orange powdery stripes along the leaf veins", "Yellow powder rubs off on your fingers", "Leaves dry early if it is not stopped"],
      hi: ["पत्ते की नसों के साथ पीली से नारंगी पाउडर जैसी धारियाँ", "पीला पाउडर उँगलियों पर लग जाता है", "न रोकने पर पत्ते जल्दी सूख जाते हैं"],
    },
    actions: {
      en: ["Report it to your Krishi Vigyan Kendra early, because it spreads on the wind", "Check nearby fields for the same stripes", ASK_OFFICER.en],
      hi: ["इसकी सूचना जल्दी कृषि विज्ञान केंद्र को दीजिए, क्योंकि यह हवा से फैलता है", "आस-पास के खेतों में भी ऐसी धारियाँ देखिए", ASK_OFFICER.hi],
    },
    prevention: {
      en: ["Grow resistant varieties and sow on time", "Check the crop often in cool, humid weather"],
      hi: ["रोग-रोधी किस्में उगाइए और समय पर बुवाई कीजिए", "ठंडे और नम मौसम में फसल को बार-बार देखिए"],
    },
  },
  {
    id: "cotton-leaf-curl",
    crop: "cotton",
    name: { en: "Cotton leaf curl virus", hi: "कपास पत्ता मरोड़ विषाणु" },
    severity: "severe",
    health: 48,
    symptoms: {
      en: ["Leaves curl and the veins look thick and dark", "Small leaf-like outgrowths under the leaf", "Plant stays short with few bolls"],
      hi: ["पत्ते मुड़ जाते हैं और नसें मोटी व गहरी दिखती हैं", "पत्ते के नीचे छोटे पत्ते जैसे उभार", "पौधा छोटा रहता है और टिंडे कम लगते हैं"],
    },
    actions: {
      en: ["Remove infected plants early", "Control whiteflies, which carry the virus", ASK_OFFICER.en],
      hi: ["संक्रमित पौधों को जल्दी हटा दीजिए", "सफ़ेद मक्खी को रोकिए, यही विषाणु फैलाती है", ASK_OFFICER.hi],
    },
    prevention: {
      en: ["Use tolerant hybrids recommended for your area", "Keep the field and bunds free of weeds"],
      hi: ["अपने इलाके के लिए सुझाई गई सहनशील किस्में लगाइए", "खेत और मेड़ों को खरपतवार से मुक्त रखिए"],
    },
  },
  {
    id: "maize-fall-armyworm",
    crop: "maize",
    name: { en: "Fall armyworm", hi: "फॉल आर्मीवर्म (सैनिक कीट)" },
    severity: "moderate",
    health: 55,
    symptoms: {
      en: ["Ragged holes and see-through patches on young leaves", "Sawdust-like droppings inside the whorl", "Caterpillars hiding in the centre of the plant"],
      hi: ["नई पत्तियों में फटे छेद और पारदर्शी पैच", "पौधे के गुच्छे (व्होर्ल) के भीतर बुरादे जैसी बीट", "पौधे के बीच में छिपी इल्लियाँ"],
    },
    actions: {
      en: ["Check plants early in the morning and remove egg masses and larvae by hand in small plots", "Use neem-based sprays on young plants", ASK_OFFICER.en],
      hi: ["सुबह जल्दी पौधे देखिए और छोटे खेत में अंडे के गुच्छे व इल्लियाँ हाथ से हटाइए", "छोटे पौधों पर नीम आधारित छिड़काव कीजिए", ASK_OFFICER.hi],
    },
    prevention: {
      en: ["Sow early and at the same time as your neighbours", "Install pheromone traps to watch for moths"],
      hi: ["जल्दी बुवाई कीजिए और पड़ोसी किसानों के साथ एक ही समय पर बोइए", "पतंगों पर नज़र रखने के लिए फेरोमोन ट्रैप लगाइए"],
    },
  },
  {
    id: "chilli-anthracnose",
    crop: "chilli",
    name: { en: "Anthracnose (fruit rot)", hi: "एन्थ्रेक्नोज़ (फल सड़न)" },
    severity: "mild",
    health: 72,
    symptoms: {
      en: ["Sunken dark round spots on ripe fruits", "Brown spots on leaves and drying twigs", "Fruits turn pale and shrivel"],
      hi: ["पके फलों पर दबे हुए गहरे गोल धब्बे", "पत्तों पर भूरे धब्बे और टहनियों का सूखना", "फल पीले पड़कर सिकुड़ जाते हैं"],
    },
    actions: {
      en: ["Remove and destroy infected fruits and dry twigs", "Avoid watering from above", ASK_OFFICER.en],
      hi: ["संक्रमित फल और सूखी टहनियाँ तोड़कर नष्ट कीजिए", "ऊपर से पानी देने से बचिए", ASK_OFFICER.hi],
    },
    prevention: {
      en: ["Use treated, healthy seed and rotate crops", "Plant in well-drained soil"],
      hi: ["उपचारित, स्वस्थ बीज इस्तेमाल कीजिए और फसल चक्र अपनाइए", "अच्छी जल निकासी वाली मिट्टी में लगाइए"],
    },
  },
];
