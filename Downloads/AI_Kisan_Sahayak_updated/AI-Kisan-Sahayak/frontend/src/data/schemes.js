/* Central-government schemes. Amounts for PM-KISAN, PMFBY and KCC were checked
   against official/PIB sources in November 2026. Other entries are described
   without figures that change often. Every entry links to the official site. */

export const SCHEME_CATEGORIES = ["income", "insurance", "credit", "soil", "water", "market"];

export const SCHEMES = [
  {
    id: "pm-kisan",
    category: "income",
    name: { en: "PM-KISAN Samman Nidhi", hi: "पीएम-किसान सम्मान निधि" },
    short: { en: "₹6,000 a year, paid straight to your bank", hi: "साल में ₹6,000, सीधे बैंक खाते में" },
    benefit: {
      en: "₹6,000 a year in three instalments of ₹2,000, sent directly to your bank account.",
      hi: "साल में ₹6,000, ₹2,000 की तीन किस्तों में, सीधे आपके बैंक खाते में।",
    },
    who: {
      en: "Landholding farmer families, subject to scheme rules. Your bank account must be linked to Aadhaar and e-KYC must be done.",
      hi: "योजना के नियमों के अनुसार भूमिधारक किसान परिवार। बैंक खाता आधार से जुड़ा होना और e-KYC पूरा होना ज़रूरी है।",
    },
    docs: {
      en: ["Aadhaar card", "Bank passbook (linked to Aadhaar)", "Land ownership record", "Mobile number"],
      hi: ["आधार कार्ड", "बैंक पासबुक (आधार से जुड़ी)", "ज़मीन का रिकॉर्ड", "मोबाइल नंबर"],
    },
    how: {
      en: "Register on the PM-KISAN website or at your nearest CSC, then complete e-KYC. Use Beneficiary Status on the website to check your payments.",
      hi: "पीएम-किसान वेबसाइट या नज़दीकी CSC पर रजिस्टर कीजिए, फिर e-KYC पूरा कीजिए। भुगतान देखने के लिए वेबसाइट पर Beneficiary Status इस्तेमाल कीजिए।",
    },
    url: "https://pmkisan.gov.in",
  },
  {
    id: "pmfby",
    category: "insurance",
    name: { en: "PM Fasal Bima Yojana (PMFBY)", hi: "प्रधानमंत्री फसल बीमा योजना (PMFBY)" },
    short: { en: "Crop insurance for a small premium", hi: "थोड़े प्रीमियम में फसल बीमा" },
    benefit: {
      en: "Cover for crop loss from drought, flood, pests, disease and other natural causes. You pay at most 2% of the sum insured for kharif foodgrain and oilseeds, 1.5% for rabi, and 5% for commercial and horticultural crops. The government pays the rest.",
      hi: "सूखा, बाढ़, कीट, रोग और अन्य प्राकृतिक कारणों से फसल नुकसान पर सुरक्षा। आप बीमित राशि का ज़्यादा से ज़्यादा 2% (खरीफ अनाज और तिलहन), 1.5% (रबी) और 5% (व्यावसायिक व बागवानी फसलें) देते हैं। बाकी सरकार देती है।",
    },
    who: {
      en: "Farmers growing notified crops in notified areas, including tenant and sharecropper farmers. Available in the states that run the scheme.",
      hi: "अधिसूचित क्षेत्रों में अधिसूचित फसल उगाने वाले किसान, बटाईदार और काश्तकार भी। यह उन राज्यों में उपलब्ध है जहाँ योजना लागू है।",
    },
    docs: {
      en: ["Aadhaar card", "Bank account details", "Land record, or tenancy / sowing certificate", "Sowing declaration"],
      hi: ["आधार कार्ड", "बैंक खाते का विवरण", "ज़मीन का रिकॉर्ड, या काश्तकारी / बुवाई प्रमाण", "बुवाई की घोषणा"],
    },
    how: {
      en: "Apply through your bank, CSC or the PMFBY website before the cut-off date for the season. If your crop is damaged by a local calamity, report it within 72 hours through the Crop Insurance app, your bank or the helpline 14447.",
      hi: "सीज़न की आखिरी तारीख से पहले अपने बैंक, CSC या PMFBY वेबसाइट से आवेदन कीजिए। स्थानीय आपदा से फसल खराब हो तो 72 घंटे के भीतर क्रॉप इंश्योरेंस ऐप, बैंक या हेल्पलाइन 14447 पर सूचना दीजिए।",
    },
    url: "https://pmfby.gov.in",
  },
  {
    id: "kcc",
    category: "credit",
    name: { en: "Kisan Credit Card (KCC)", hi: "किसान क्रेडिट कार्ड (KCC)" },
    short: { en: "Crop loans at low interest", hi: "कम ब्याज पर फसल ऋण" },
    benefit: {
      en: "Short-term crop loans up to ₹3 lakh at 7% interest. If you repay on time, the effective rate can come down to 4%. Loans up to ₹2 lakh do not need collateral.",
      hi: "₹3 लाख तक के अल्पकालिक फसल ऋण 7% ब्याज पर। समय पर चुकाने पर प्रभावी दर 4% तक आ सकती है। ₹2 लाख तक के ऋण के लिए गारंटी (कोलैटरल) नहीं लगती।",
    },
    who: {
      en: "Farmers who own land, tenant farmers, sharecroppers and self-help groups. Also available for animal husbandry and fisheries.",
      hi: "ज़मीन के मालिक किसान, काश्तकार, बटाईदार और स्वयं सहायता समूह। पशुपालन और मछली पालन के लिए भी उपलब्ध।",
    },
    docs: {
      en: ["Aadhaar card", "Land record or tenancy proof", "Passport-size photo", "Bank application form"],
      hi: ["आधार कार्ड", "ज़मीन का रिकॉर्ड या काश्तकारी का प्रमाण", "पासपोर्ट साइज़ फोटो", "बैंक का आवेदन फॉर्म"],
    },
    how: {
      en: "Apply at your bank branch, cooperative society or CSC. Ask the bank which crops and limit your card will cover, and repay before the due date to get the lower rate.",
      hi: "अपनी बैंक शाखा, सहकारी समिति या CSC में आवेदन कीजिए। बैंक से पूछिए कि कार्ड में कौन सी फसलें और कितनी सीमा होगी, और कम दर के लिए देय तारीख से पहले चुकाइए।",
    },
    url: "https://www.myscheme.gov.in",
  },
  {
    id: "soil-health-card",
    category: "soil",
    name: { en: "Soil Health Card", hi: "मृदा स्वास्थ्य कार्ड" },
    short: { en: "Free soil test and fertiliser advice", hi: "मुफ़्त मिट्टी जाँच और खाद की सलाह" },
    benefit: {
      en: "Free soil testing, and a card that tells you which nutrients your soil needs and how much fertiliser to use for each crop. It helps you spend less on fertiliser.",
      hi: "मुफ़्त मिट्टी जाँच, और एक कार्ड जो बताता है कि आपकी मिट्टी को किन पोषक तत्वों की ज़रूरत है और हर फसल में कितनी खाद डालनी है। इससे खाद पर खर्च घट सकता है।",
    },
    who: { en: "All farmers.", hi: "सभी किसान।" },
    docs: {
      en: ["Land details (survey number)", "Mobile number"],
      hi: ["ज़मीन का विवरण (खसरा / सर्वे नंबर)", "मोबाइल नंबर"],
    },
    how: {
      en: "Contact your local agriculture office, Krishi Vigyan Kendra or soil testing lab to get a sample collected from your field. Your card can be viewed on the Soil Health Card portal.",
      hi: "अपने स्थानीय कृषि कार्यालय, कृषि विज्ञान केंद्र या मिट्टी जाँच प्रयोगशाला से संपर्क करके खेत से नमूना लिवाइए। आपका कार्ड मृदा स्वास्थ्य कार्ड पोर्टल पर देखा जा सकता है।",
    },
    url: "https://soilhealth.dac.gov.in",
  },
  {
    id: "pm-kusum",
    category: "water",
    name: { en: "PM-KUSUM (solar pumps)", hi: "पीएम-कुसुम (सोलर पंप)" },
    short: { en: "Solar pumps to cut diesel and power bills", hi: "डीज़ल और बिजली का खर्च घटाने के लिए सोलर पंप" },
    benefit: {
      en: "Support to install solar pumps or small solar power plants on farmland, or to convert existing grid pumps to solar. This lowers diesel and electricity costs. The subsidy share differs from state to state.",
      hi: "खेत में सोलर पंप या छोटे सोलर बिजली संयंत्र लगाने, या मौजूदा ग्रिड पंप को सोलर में बदलने में सहायता। इससे डीज़ल और बिजली का खर्च घटता है। सब्सिडी का हिस्सा राज्य के अनुसार अलग होता है।",
    },
    who: {
      en: "Farmers with land and a water source, through the state nodal agency. Availability depends on your state.",
      hi: "ज़मीन और पानी के स्रोत वाले किसान, राज्य की नोडल एजेंसी के ज़रिए। उपलब्धता आपके राज्य पर निर्भर है।",
    },
    docs: {
      en: ["Aadhaar card", "Land record", "Bank account details", "Electricity connection details (to convert a grid pump)"],
      hi: ["आधार कार्ड", "ज़मीन का रिकॉर्ड", "बैंक खाते का विवरण", "बिजली कनेक्शन का विवरण (ग्रिड पंप बदलने के लिए)"],
    },
    how: {
      en: "Applications go through your state's nodal agency. Open the PM-KUSUM website and look for your state's portal or contact details.",
      hi: "आवेदन आपके राज्य की नोडल एजेंसी के ज़रिए होते हैं। पीएम-कुसुम वेबसाइट पर अपने राज्य का पोर्टल या संपर्क देखिए।",
    },
    url: "https://pmkusum.mnre.gov.in",
  },
  {
    id: "pmksy",
    category: "water",
    name: { en: "Per Drop More Crop (micro-irrigation)", hi: "पर ड्रॉप मोर क्रॉप (सूक्ष्म सिंचाई)" },
    short: { en: "Subsidy on drip and sprinkler systems", hi: "ड्रिप और स्प्रिंकलर सिस्टम पर सब्सिडी" },
    benefit: {
      en: "Subsidy on drip and sprinkler irrigation, so you can grow more with less water. The subsidy rate depends on your state and farmer category.",
      hi: "ड्रिप और स्प्रिंकलर सिंचाई पर सब्सिडी, ताकि कम पानी में ज़्यादा उपज ली जा सके। सब्सिडी की दर राज्य और किसान की श्रेणी पर निर्भर है।",
    },
    who: {
      en: "Farmers with their own land and an irrigation source. Small and marginal farmers usually get a higher share.",
      hi: "अपनी ज़मीन और सिंचाई स्रोत वाले किसान। छोटे और सीमांत किसानों को आमतौर पर ज़्यादा हिस्सा मिलता है।",
    },
    docs: {
      en: ["Aadhaar card", "Land record", "Bank account details", "Quotation from an approved supplier"],
      hi: ["आधार कार्ड", "ज़मीन का रिकॉर्ड", "बैंक खाते का विवरण", "मान्य आपूर्तिकर्ता का कोटेशन"],
    },
    how: {
      en: "Apply through your state's horticulture or agriculture department. Ask the district office which suppliers are approved before you buy.",
      hi: "अपने राज्य के बागवानी या कृषि विभाग के ज़रिए आवेदन कीजिए। खरीदने से पहले ज़िला कार्यालय से पूछिए कि कौन से आपूर्तिकर्ता मान्य हैं।",
    },
    url: "https://pmksy.gov.in",
  },
  {
    id: "enam",
    category: "market",
    name: { en: "eNAM (online mandi)", hi: "ई-नाम (ऑनलाइन मंडी)" },
    short: { en: "See prices and sell beyond your local mandi", hi: "भाव देखिए और स्थानीय मंडी से आगे बेचिए" },
    benefit: {
      en: "An online trading platform that links mandis across India. You can see prices, and sell to buyers beyond your local mandi.",
      hi: "देश भर की मंडियों को जोड़ने वाला ऑनलाइन ट्रेडिंग प्लेटफ़ॉर्म। आप भाव देख सकते हैं और स्थानीय मंडी से बाहर के खरीदारों को बेच सकते हैं।",
    },
    who: {
      en: "Farmers who sell at an eNAM-linked mandi.",
      hi: "वे किसान जो ई-नाम से जुड़ी मंडी में बेचते हैं।",
    },
    docs: {
      en: ["Aadhaar card", "Bank passbook", "Mobile number"],
      hi: ["आधार कार्ड", "बैंक पासबुक", "मोबाइल नंबर"],
    },
    how: {
      en: "Register on the eNAM website or at your nearest eNAM mandi office.",
      hi: "ई-नाम वेबसाइट पर या नज़दीकी ई-नाम मंडी कार्यालय में रजिस्टर कीजिए।",
    },
    url: "https://enam.gov.in",
  },
  {
    id: "aif",
    category: "credit",
    name: { en: "Agriculture Infrastructure Fund", hi: "कृषि अवसंरचना कोष" },
    short: { en: "Loans for storage and processing", hi: "भंडारण और प्रसंस्करण के लिए ऋण" },
    benefit: {
      en: "Loans up to ₹2 crore with 3% interest subvention for up to 7 years, for cold storage, warehouses, processing and other post-harvest projects.",
      hi: "कोल्ड स्टोरेज, गोदाम, प्रसंस्करण और कटाई के बाद की अन्य परियोजनाओं के लिए ₹2 करोड़ तक का ऋण, 7 साल तक 3% ब्याज छूट के साथ।",
    },
    who: {
      en: "Farmers, farmer producer organisations (FPOs), cooperatives and agri-entrepreneurs.",
      hi: "किसान, किसान उत्पादक संगठन (FPO), सहकारी समितियाँ और कृषि उद्यमी।",
    },
    docs: {
      en: ["Project report", "KYC documents", "Land or lease papers"],
      hi: ["परियोजना रिपोर्ट", "KYC दस्तावेज़", "ज़मीन या लीज़ के कागज़"],
    },
    how: {
      en: "Prepare a project report and apply through the Agri Infra Fund portal with a participating bank.",
      hi: "परियोजना रिपोर्ट तैयार कीजिए और भाग लेने वाले बैंक के साथ कृषि अवसंरचना कोष पोर्टल से आवेदन कीजिए।",
    },
    url: "https://agriinfra.dac.gov.in",
  },
];
