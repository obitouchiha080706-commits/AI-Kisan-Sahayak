/* Indian cropping seasons, worked out from the current month. */

const SEASONS = {
  kharif: {
    name: { en: "Kharif season", hi: "खरीफ का मौसम" },
    tips: {
      en: [
        "Drain extra water from fields after heavy rain. Standing water invites root rot.",
        "Scout your crop every week for pests and spots. Early action costs less.",
        "Enrol for crop insurance before the cut-off date. Ask your bank or CSC for the last date.",
      ],
      hi: [
        "भारी बारिश के बाद खेत से फालतू पानी निकाल दीजिए। रुका हुआ पानी जड़ सड़न बुलाता है।",
        "हर हफ्ते फसल में कीट और धब्बे देखिए। जल्दी कदम उठाने में खर्च कम आता है।",
        "आखिरी तारीख से पहले फसल बीमा करा लीजिए। तारीख अपने बैंक या CSC से पूछिए।",
      ],
    },
  },
  rabi: {
    name: { en: "Rabi season", hi: "रबी का मौसम" },
    tips: {
      en: [
        "Check the best sowing window for your area with your local Krishi Vigyan Kendra, and use certified seed.",
        "Get your soil tested before buying fertiliser. Soil testing under the Soil Health Card scheme is free.",
        "Ask your bank or CSC for the last date to enrol your rabi crop for insurance.",
      ],
      hi: [
        "अपने इलाके में बुवाई का सही समय स्थानीय कृषि विज्ञान केंद्र से पूछिए, और प्रमाणित बीज इस्तेमाल कीजिए।",
        "खाद खरीदने से पहले मिट्टी की जाँच कराइए। मृदा स्वास्थ्य कार्ड योजना में जाँच मुफ़्त है।",
        "रबी फसल के बीमा की आखिरी तारीख अपने बैंक या CSC से पूछ लीजिए।",
      ],
    },
  },
  zaid: {
    name: { en: "Zaid (summer) season", hi: "जायद (गर्मी) का मौसम" },
    tips: {
      en: [
        "Summer crops need regular water. Mulch the soil to keep moisture in.",
        "Water early morning or late evening to cut losses from evaporation.",
        "Watch for heat stress and mites on leaves in hot, dry weather.",
      ],
      hi: [
        "गर्मी की फसलों को नियमित पानी चाहिए। नमी बचाने के लिए मिट्टी पर मल्च बिछाइए।",
        "वाष्पीकरण से नुकसान घटाने के लिए सुबह जल्दी या शाम को सिंचाई कीजिए।",
        "गर्म और सूखे मौसम में गर्मी के तनाव और पत्तों पर माइट्स का ध्यान रखिए।",
      ],
    },
  },
};

export function getSeason(date = new Date()) {
  const m = date.getMonth(); // 0 = January
  if (m >= 5 && m <= 9) return SEASONS.kharif; // Jun to Oct
  if (m >= 3 && m <= 4) return SEASONS.zaid; // Apr to May
  return SEASONS.rabi; // Nov to Mar
}
