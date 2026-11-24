/* Built-in farming guide used by the chat when no backend is connected.
   Answers are intentionally general: no chemical doses, always point to the
   local officer for anything that needs a local decision. */

const tr = (en, hi) => ({ en, hi });

export const TOPICS = [
  {
    id: "pmkisan",
    keywords: ["pm-kisan", "pm kisan", "pmkisan", "samman nidhi", "kisan samman", "सम्मान निधि", "पीएम किसान", "पीएम-किसान", "kist", "किस्त", "instalment", "installment"],
    answer: tr(
      "PM-KISAN gives eligible landholding farmer families ₹6,000 a year in three instalments of ₹2,000, sent to the bank account.\n• Register on the PM-KISAN website or at your nearest CSC\n• Keep Aadhaar, bank passbook, land record and mobile number ready\n• Complete e-KYC, and link your bank account to Aadhaar\n• Check payments with Beneficiary Status on the website",
      "पीएम-किसान में पात्र भूमिधारक किसान परिवारों को साल में ₹6,000, ₹2,000 की तीन किस्तों में, बैंक खाते में मिलते हैं।\n• पीएम-किसान वेबसाइट या नज़दीकी CSC पर रजिस्टर कीजिए\n• आधार, बैंक पासबुक, ज़मीन का रिकॉर्ड और मोबाइल नंबर तैयार रखिए\n• e-KYC पूरा कीजिए और बैंक खाता आधार से जोड़िए\n• भुगतान की जाँच वेबसाइट पर Beneficiary Status से कीजिए",
    ),
    link: { label: tr("PM-KISAN website", "पीएम-किसान वेबसाइट"), url: "https://pmkisan.gov.in" },
  },
  {
    id: "insurance",
    keywords: ["fasal bima", "pmfby", "insurance", "bima", "claim", "बीमा", "फसल बीमा", "क्लेम", "crop loss", "नुकसान"],
    answer: tr(
      "PM Fasal Bima Yojana insures your crop against loss from drought, flood, pests, disease and other natural causes.\n• You pay at most 2% (kharif), 1.5% (rabi) or 5% (commercial and horticultural crops) of the sum insured\n• Enrol through your bank, CSC or the PMFBY website before the cut-off date\n• If a local calamity damages your crop, report it within 72 hours using the Crop Insurance app, your bank, or helpline 14447",
      "प्रधानमंत्री फसल बीमा योजना सूखा, बाढ़, कीट, रोग और अन्य प्राकृतिक कारणों से फसल नुकसान से सुरक्षा देती है।\n• आप बीमित राशि का ज़्यादा से ज़्यादा 2% (खरीफ), 1.5% (रबी) या 5% (व्यावसायिक व बागवानी फसलें) देते हैं\n• आखिरी तारीख से पहले अपने बैंक, CSC या PMFBY वेबसाइट से नामांकन कीजिए\n• स्थानीय आपदा से फसल खराब हो तो 72 घंटे के भीतर क्रॉप इंश्योरेंस ऐप, बैंक या हेल्पलाइन 14447 पर बताइए",
    ),
    link: { label: tr("PMFBY website", "PMFBY वेबसाइट"), url: "https://pmfby.gov.in" },
  },
  {
    id: "kcc",
    keywords: ["kcc", "kisan credit", "credit card", "किसान क्रेडिट", "क्रेडिट कार्ड", "loan", "कर्ज", "कर्ज़", "ऋण", "rin", "interest", "ब्याज"],
    answer: tr(
      "The Kisan Credit Card gives farmers short-term crop loans at low interest.\n• Loans up to ₹3 lakh at 7%, and the effective rate can fall to 4% if you repay on time\n• Loans up to ₹2 lakh need no collateral\n• Tenant farmers, sharecroppers and self-help groups can apply too\n• Apply at your bank branch, cooperative society or CSC with Aadhaar, land record and a photo",
      "किसान क्रेडिट कार्ड किसानों को कम ब्याज पर अल्पकालिक फसल ऋण देता है।\n• ₹3 लाख तक का ऋण 7% पर, और समय पर चुकाने पर प्रभावी दर 4% तक आ सकती है\n• ₹2 लाख तक के ऋण में गारंटी (कोलैटरल) नहीं लगती\n• काश्तकार, बटाईदार और स्वयं सहायता समूह भी आवेदन कर सकते हैं\n• आधार, ज़मीन का रिकॉर्ड और फोटो के साथ बैंक शाखा, सहकारी समिति या CSC में आवेदन कीजिए",
    ),
    link: { label: tr("Scheme finder", "योजना खोजें"), url: "https://www.myscheme.gov.in" },
  },
  {
    id: "yellow",
    keywords: ["yellow", "yellowing", "peela", "peele", "पीले", "पीला", "पीलापन", "पीली"],
    answer: tr(
      "Yellow leaves can have several causes. Look at where the yellowing starts:\n• Older, lower leaves turning yellow first: often low nitrogen\n• Yellow leaves with soggy soil: too much water or poor drainage\n• Yellow between green veins on new leaves: iron or zinc shortage\n• Yellow spots, curling or tiny insects underneath: disease, virus or sap-sucking pests\nA soil test will confirm nutrient problems. For a leaf problem, use the Crop Scanner with a close photo.",
      "पत्ते पीले पड़ने के कई कारण हो सकते हैं। देखिए पीलापन कहाँ से शुरू होता है:\n• पहले नीचे के पुराने पत्ते पीले हों: अक्सर नाइट्रोजन की कमी\n• पीले पत्ते और गीली मिट्टी: ज़्यादा पानी या खराब जल निकासी\n• नए पत्तों में हरी नसों के बीच पीलापन: लोहे या ज़िंक की कमी\n• पीले धब्बे, मुड़ना या नीचे छोटे कीट: रोग, विषाणु या रस चूसने वाले कीट\nपोषक तत्वों की समस्या मिट्टी जाँच से पक्की होगी। पत्ते की समस्या के लिए पास से फोटो लेकर फसल जाँच इस्तेमाल कीजिए।",
    ),
    link: null,
  },
  {
    id: "spots",
    keywords: ["spot", "spots", "daag", "dhabbe", "धब्बे", "धब्बा", "blight", "jhulsa", "झुलसा", "fungus", "fungal", "फफूंद", "leaf spot", "रोग", "disease", "bimari", "बीमारी", "rust", "रतुआ"],
    answer: tr(
      "Spots on leaves are often a fungal disease. What helps in most cases:\n• Remove and destroy the affected leaves\n• Water at the base of the plant, not over the leaves\n• Give plants space so air can move through\n• Avoid working in the field when leaves are wet\n• Ask your agriculture officer which fungicide fits your crop, and follow the label\nFor a closer look, upload a clear leaf photo in the Crop Scanner.",
      "पत्तों पर धब्बे अक्सर फफूंद रोग के होते हैं। ज़्यादातर मामलों में ये उपाय काम आते हैं:\n• प्रभावित पत्तों को तोड़कर नष्ट कर दीजिए\n• पौधे की जड़ के पास पानी दीजिए, पत्तों पर नहीं\n• पौधों के बीच दूरी रखिए ताकि हवा चल सके\n• पत्ते गीले हों तब खेत में काम करने से बचिए\n• अपनी फसल के लिए सही फफूंदनाशक कृषि अधिकारी से पूछिए और लेबल का पालन कीजिए\nपास से देखने के लिए फसल जाँच में पत्ते की साफ़ फोटो डालिए।",
    ),
    link: null,
  },
  {
    id: "pests",
    keywords: ["pest", "pests", "keet", "kida", "कीट", "कीड़ा", "कीड़े", "insect", "aphid", "whitefly", "सफेद मक्खी", "सफ़ेद मक्खी", "इल्ली", "caterpillar", "sundi", "सुंडी", "tidda", "टिड्डी", "mite"],
    answer: tr(
      "A safe way to handle pests (integrated pest management):\n• Check the crop every week, including under the leaves\n• Use yellow sticky traps for whiteflies and aphids, and pheromone traps for moths\n• Hand-pick caterpillars and egg masses in small plots\n• Try neem-based sprays on young infestations\n• Spray chemicals only if the officer recommends them, in the evening, with gloves, mask and full sleeves, and follow the label\nSpraying more than needed harms useful insects and costs you more.",
      "कीटों से निपटने का सुरक्षित तरीका (समेकित कीट प्रबंधन):\n• हर हफ्ते फसल देखिए, पत्तों के नीचे भी\n• सफ़ेद मक्खी और माहू के लिए पीले चिपचिपे जाल, और पतंगों के लिए फेरोमोन ट्रैप लगाइए\n• छोटे खेत में इल्लियाँ और अंडे के गुच्छे हाथ से हटाइए\n• शुरुआती हमले पर नीम आधारित छिड़काव आज़माइए\n• रसायन तभी छिड़किए जब अधिकारी सुझाएं, शाम को, दस्ताने, मास्क और पूरी बाँह के कपड़े पहनकर, और लेबल का पालन कीजिए\nज़रूरत से ज़्यादा छिड़काव मित्र कीटों को नुकसान पहुँचाता है और खर्च बढ़ाता है।",
    ),
    link: null,
  },
  {
    id: "fertilizer",
    keywords: ["fertilizer", "fertiliser", "khad", "khaad", "खाद", "urea", "यूरिया", "dap", "डीएपी", "npk", "उर्वरक", "nutrient", "पोषक"],
    answer: tr(
      "Fertiliser works best when it matches what your soil lacks.\n• Get your soil tested first. Soil testing under the Soil Health Card scheme is free\n• Use the amount your card or agriculture officer recommends, split across crop stages\n• Too much urea gives soft, leafy growth that attracts pests and disease\n• Add compost or farmyard manure to improve soil over the years",
      "खाद तब सबसे अच्छा काम करती है जब वह मिट्टी की कमी के हिसाब से हो।\n• पहले मिट्टी की जाँच कराइए। मृदा स्वास्थ्य कार्ड योजना में जाँच मुफ़्त है\n• कार्ड या कृषि अधिकारी की बताई मात्रा ही डालिए, फसल की अवस्थाओं में बाँटकर\n• ज़्यादा यूरिया से पौधा नरम और पत्तेदार हो जाता है, जिस पर कीट और रोग ज़्यादा आते हैं\n• सालों में मिट्टी सुधारने के लिए कम्पोस्ट या गोबर की खाद मिलाइए",
    ),
    link: { label: tr("Soil Health Card portal", "मृदा स्वास्थ्य कार्ड पोर्टल"), url: "https://soilhealth.dac.gov.in" },
  },
  {
    id: "soil",
    keywords: ["soil", "mitti", "mitti jaanch", "मिट्टी", "मृदा", "soil test", "health card", "ph"],
    answer: tr(
      "A Soil Health Card tells you which nutrients your soil needs and how much fertiliser to use for each crop. Testing is free.\n• Contact your local agriculture office, Krishi Vigyan Kendra or soil testing lab\n• Collect the sample from several spots in the field, from plough depth\n• Test every couple of seasons, and before changing crops",
      "मृदा स्वास्थ्य कार्ड बताता है कि आपकी मिट्टी को किन पोषक तत्वों की ज़रूरत है और हर फसल में कितनी खाद डालनी है। जाँच मुफ़्त है।\n• अपने स्थानीय कृषि कार्यालय, कृषि विज्ञान केंद्र या मिट्टी जाँच प्रयोगशाला से संपर्क कीजिए\n• खेत में कई जगहों से, जुताई की गहराई तक से नमूना लीजिए\n• हर कुछ सीज़न में और फसल बदलने से पहले जाँच कराइए",
    ),
    link: { label: tr("Soil Health Card portal", "मृदा स्वास्थ्य कार्ड पोर्टल"), url: "https://soilhealth.dac.gov.in" },
  },
  {
    id: "irrigation",
    keywords: ["irrigation", "irrigate", "sinchai", "सिंचाई", "paani", "pani", "पानी", "water", "drip", "ड्रिप", "sprinkler", "स्प्रिंकलर"],
    answer: tr(
      "Irrigation timing depends on the crop, soil and weather. Some general rules:\n• Water at the stages where your crop is most sensitive, such as flowering and grain filling. Your Krishi Vigyan Kendra can give the stages for your crop\n• Check soil moisture a hand's depth down before watering\n• Water in the early morning or evening to lose less to the sun\n• Drip and sprinkler systems save water, and the Per Drop More Crop scheme offers a subsidy\n• Do not let water stand in the field",
      "सिंचाई का समय फसल, मिट्टी और मौसम पर निर्भर करता है। कुछ सामान्य नियम:\n• फसल की संवेदनशील अवस्थाओं में पानी दीजिए, जैसे फूल आना और दाना भरना। अपनी फसल की अवस्थाएं कृषि विज्ञान केंद्र से पूछिए\n• पानी देने से पहले हाथ भर नीचे तक मिट्टी की नमी जाँचिए\n• धूप से कम नुकसान के लिए सुबह जल्दी या शाम को पानी दीजिए\n• ड्रिप और स्प्रिंकलर पानी बचाते हैं, और पर ड्रॉप मोर क्रॉप योजना में सब्सिडी मिलती है\n• खेत में पानी रुकने मत दीजिए",
    ),
    link: { label: tr("Per Drop More Crop", "पर ड्रॉप मोर क्रॉप"), url: "https://pmksy.gov.in" },
  },
  {
    id: "mandi",
    keywords: ["mandi", "मंडी", "price", "prices", "bhav", "bhaav", "भाव", "रेट", "rate", "enam", "e-nam", "ई-नाम", "sell", "बेचना", "msp"],
    answer: tr(
      "To get a better price for your produce:\n• Register on eNAM to see prices from many mandis and sell to buyers beyond your local one\n• Check prices at nearby mandis before you travel\n• Grade and clean your produce, since good quality earns a better rate\n• Store it properly if you can wait for a better price",
      "अपनी उपज का बेहतर दाम पाने के लिए:\n• कई मंडियों के भाव देखने और स्थानीय मंडी से बाहर के खरीदारों को बेचने के लिए ई-नाम पर रजिस्टर कीजिए\n• जाने से पहले नज़दीकी मंडियों के भाव देख लीजिए\n• उपज की छँटाई और सफ़ाई कीजिए, अच्छी गुणवत्ता का दाम बेहतर मिलता है\n• बेहतर दाम के लिए रुक सकते हों तो उपज को ठीक से भंडारित कीजिए",
    ),
    link: { label: tr("eNAM website", "ई-नाम वेबसाइट"), url: "https://enam.gov.in" },
  },
  {
    id: "weather",
    keywords: ["rain", "barish", "baarish", "बारिश", "weather", "mausam", "मौसम", "frost", "पाला", "spray", "छिड़काव", "hail", "ओले"],
    answer: tr(
      "Weather matters for spraying and watering:\n• Do not spray just before rain, because it washes off\n• Avoid spraying in strong wind or in the heat of the day\n• Skip irrigation when rain is expected in the next day or two\n• Cold nights can bring frost, so ask your Krishi Vigyan Kendra how to protect sensitive crops\nCheck the weather forecast and farm advisories from the India Meteorological Department before planning.",
      "मौसम का असर छिड़काव और सिंचाई पर पड़ता है:\n• बारिश से ठीक पहले छिड़काव मत कीजिए, वह धुल जाता है\n• तेज़ हवा में या दिन की गर्मी में छिड़काव से बचिए\n• अगले एक-दो दिन में बारिश की संभावना हो तो सिंचाई छोड़ दीजिए\n• ठंडी रातों में पाला पड़ सकता है, संवेदनशील फसल बचाने का तरीका कृषि विज्ञान केंद्र से पूछिए\nयोजना बनाने से पहले भारत मौसम विज्ञान विभाग का पूर्वानुमान और कृषि सलाह देख लीजिए।",
    ),
    link: null,
  },
  {
    id: "organic",
    keywords: ["organic", "jaivik", "जैविक", "compost", "कम्पोस्ट", "vermicompost", "केंचुआ", "gobar", "गोबर", "natural farming", "प्राकृतिक खेती"],
    answer: tr(
      "Ways to farm with fewer chemicals:\n• Add compost, vermicompost or farmyard manure to build soil health\n• Rotate crops and grow legumes such as gram or moong to add nitrogen\n• Use neem-based products, traps and natural enemies for pests\n• Mulch the soil to keep moisture and reduce weeds\nMove step by step and keep notes of what works on your field.",
      "कम रसायन के साथ खेती के तरीके:\n• मिट्टी की सेहत बनाने के लिए कम्पोस्ट, वर्मी कम्पोस्ट या गोबर की खाद मिलाइए\n• फसल चक्र अपनाइए और चना या मूँग जैसी दलहन उगाइए, जो नाइट्रोजन बढ़ाती हैं\n• कीटों के लिए नीम आधारित उत्पाद, जाल और प्राकृतिक शत्रु कीट इस्तेमाल कीजिए\n• नमी रखने और खरपतवार घटाने के लिए मिट्टी पर मल्च बिछाइए\nकदम-दर-कदम आगे बढ़िए और अपने खेत पर क्या काम करता है, इसका हिसाब रखिए।",
    ),
    link: null,
  },
  {
    id: "seed",
    keywords: ["seed", "seeds", "beej", "बीज", "variety", "किस्म", "certified", "प्रमाणित", "sowing", "बुवाई", "sow"],
    answer: tr(
      "Good seed is the base of a good crop:\n• Buy certified seed from a licensed dealer, and keep the bill\n• Choose a variety suited to your area and season. Your Krishi Vigyan Kendra can recommend one\n• Treat the seed before sowing as advised, to protect against soil-borne disease\n• Sow at the right time and depth for your crop",
      "अच्छा बीज अच्छी फसल की नींव है:\n• लाइसेंस वाले डीलर से प्रमाणित बीज खरीदिए और बिल रखिए\n• अपने इलाके और मौसम के लिए उपयुक्त किस्म चुनिए। कृषि विज्ञान केंद्र सुझा सकता है\n• मिट्टी से फैलने वाले रोगों से बचाव के लिए सलाह के अनुसार बुवाई से पहले बीज उपचार कीजिए\n• अपनी फसल के लिए सही समय और गहराई पर बुवाई कीजिए",
    ),
    link: null,
  },
  {
    id: "help",
    keywords: ["helpline", "call", "expert", "officer", "kvk", "krishi vigyan", "कृषि विज्ञान", "मदद", "सलाह", "advice", "toll free", "number", "नंबर"],
    answer: tr(
      "For advice from a person:\n• Kisan Call Centre: 1800-180-1551 (toll free)\n• Your nearest Krishi Vigyan Kendra (KVK) and block agriculture office can look at your field and suggest what to do\n• For PM-KISAN or crop insurance problems, visit your CSC or bank",
      "किसी व्यक्ति से सलाह के लिए:\n• किसान कॉल सेंटर: 1800-180-1551 (टोल फ्री)\n• आपका नज़दीकी कृषि विज्ञान केंद्र (KVK) और ब्लॉक कृषि कार्यालय खेत देखकर सलाह दे सकते हैं\n• पीएम-किसान या फसल बीमा की दिक्कत के लिए अपने CSC या बैंक जाइए",
    ),
    link: null,
  },
];

export const GREETING_KEYWORDS = ["hello", "hi", "hey", "namaste", "namaskar", "नमस्ते", "नमस्कार", "हेलो", "हैलो", "राम राम", "pranam"];

export const GREETING = tr(
  "Namaste! I can help with crop problems, fertiliser, irrigation and government schemes. What would you like to know?",
  "नमस्ते! मैं फसल की समस्याओं, खाद, सिंचाई और सरकारी योजनाओं में मदद कर सकता हूँ। आप क्या जानना चाहते हैं?",
);

export const FALLBACK = tr(
  "I do not have a confident answer to that in my built-in guide. You can:\n• Describe the problem with the crop name and what you see on the leaves\n• Use the Crop Scanner with a photo\n• Call the Kisan Call Centre on 1800-180-1551 (toll free)",
  "इस सवाल का पक्का जवाब मेरे गाइड में नहीं है। आप ये कर सकते हैं:\n• फसल का नाम और पत्तों पर जो दिखता है, वह लिखकर समस्या बताइए\n• फोटो के साथ फसल जाँच इस्तेमाल कीजिए\n• किसान कॉल सेंटर 1800-180-1551 (टोल फ्री) पर फोन कीजिए",
);
