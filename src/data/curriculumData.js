// Curriculum data mapped to National Curriculum Framework (NCF / NEP 2020) & State Boards
export const CURRICULUM_TOPICS = [
  {
    id: "optics-prism",
    subject: "Physics",
    grade: "Grade 10",
    title: {
      en: "Light Refraction & Dispersion through a Prism",
      hi: "प्रिज्म से प्रकाश का अपवर्तन और विक्षेपण",
      hinglish: "Prism se Light Refraction aur 7 Colors ka Separation",
      te: "ప్రిజం ద్వారా కాంతి వక్రీభవనం మరియు విక్షేపణం",
      ta: "முப்பட்டகத்தின் வழியே ஒளிவிலகல் மற்றும் நிறப்பிரிகை",
      mr: "प्रिझममधून प्रकाशाचे अपवर्तन आणि अपस्करण"
    },
    initialQuestion: {
      en: "Why does sunlight split into 7 rainbow colors when it passes through a triangular glass prism?",
      hi: "जब सूर्य का श्वेत प्रकाश एक त्रिभुजाकार कांच के प्रिज्म से गुजरता है, तो वह 7 रंगों में क्यों बंट जाता है?",
      hinglish: "Jab white sunlight glass prism se gujarti hai, toh 7 rainbow colors mein kyun divide ho jati hai?",
      te: "గాజు ప్రిజం గుండా సూర్యకాంతి వెళ్ళినప్పుడు అది 7 ఇంద్రధనస్సు రంగులుగా ఎందుకు విడిపోతుంది?",
      ta: "கண்ணாடி முப்பட்டகத்தின் வழியாக சூரிய ஒளி செல்லும்போது அது ஏன் 7 வண்ணங்களாகப் பிரிகிறது?",
      mr: "काचेच्या प्रिझममधून सूर्यप्रकाश जाताना तो 7 रंगांमध्ये का विभागला जातो?"
    },
    culturalAnalogy: {
      en: "Think of runners on an athletic field entering sandy mud. Runners with shorter strides (Violet) slow down and bend more sharply than tall runners with longer strides (Red)!",
      hi: "जैसे कीचड़ में दौड़ते समय छोटे कदम वाला बच्चा (बैंगनी) जल्दी धीमा होकर मुड़ जाता है, जबकि लंबे कदम वाला तेज धावक (लाल) कम मुड़ता है!",
      hinglish: "Jaise race mein red runner (long stride) sand mein smoothly nikal jata hai, par violet runner (short steps) zyada slow hoke bend ho jata hai!",
      te: "ఇసుకలో పరిగెత్తేటప్పుడు చిన్న అడుగులు వేసేవారు (ఊదా రంగు) ఎక్కువ నెమ్మదించి మలుపు తిరుగుతారు, పెద్ద అడుగులు వేసేవారు (ఎరుపు రంగు) తక్కువ మలుపు తిరుగుతారు!",
      ta: "மணலில் ஓடும்போது சிறிய அடிகள் வைக்கும் ஓட்டப்பந்தய வீரர் (ஊதா) அதிகமாக வளைவார், நீண்ட அடிகள் வைப்பவர் (சிவப்பு) குறைவாக வளைவார்!",
      mr: "धावताना वाळूत ज्यांची पावले लहान असतात (जांभळा रंग) ते जास्त वळतात, तर मोठे पाऊल टाकणारे (लाल रंग) कमी झुकतात!"
    },
    simulationType: "prism",
    simulationParams: {
      incidenceAngle: 45,
      refractiveIndex: 1.52,
      lightType: "white" // or single wavelength
    },
    socraticStages: [
      {
        stage: 1,
        question: "Does light travel at the same speed in air as it does inside glass?",
        hint: "Air is rare (patla), glass is dense (ghana). Think about walking in air vs walking in waist-deep water.",
        concept: "Optical Density & Speed of Light"
      },
      {
        stage: 2,
        question: "Since each color has a different wavelength (Red is ~700nm, Violet is ~400nm), which one slows down more?",
        hint: "Shorter wavelength interacts more with glass atoms, slowing down more.",
        concept: "Wavelength-dependent Refractive Index (Cauchy's Principle)"
      },
      {
        stage: 3,
        question: "If violet slows down the most, will it bend towards the normal more or less than red?",
        hint: "Greater deceleration = sharper bending at the interface.",
        concept: "Snell's Law of Refraction: n1*sin(θ1) = n2*sin(θ2)"
      }
    ],
    misconceptions: [
      {
        concept: "Color Origin",
        flawedBelief: "Students think the prism 'colors' the light like paint.",
        remedy: "Demonstrate Newton's inverted second prism experiment: recombining 7 colors back into white light proves white light originally contained all 7 colors."
      },
      {
        concept: "Bending Direction",
        flawedBelief: "Light bends away from the base.",
        remedy: "Show that light ray always bends towards the thicker base when entering a denser medium."
      }
    ]
  },
  {
    id: "mechanics-friction",
    subject: "Physics",
    grade: "Grade 9",
    title: {
      en: "Newton's Laws & Friction in Daily Life",
      hi: "न्यूटन के गति के नियम और दैनिक जीवन में घर्षण",
      hinglish: "Newton's Laws of Motion aur Daily Life mein Friction",
      te: "న్యూటన్ చలన నియమాలు మరియు రోజువారీ జీవితంలో ఘర్షణ",
      ta: "நியூட்டனின் இயக்க விதிகள் மற்றும் அன்றாட வாழ்வில் உராய்வு",
      mr: "न्यूटनचे गतीचे नियम आणि दैनंदिन जीवनातील घर्षण"
    },
    initialQuestion: {
      en: "Why does a cricket ball rolling on a lush grass outfield stop on its own, but skids much further on a smooth concrete pitch?",
      hi: "गीली घास के मैदान पर लुढ़कती क्रिकेट गेंद अपने आप क्यों रुक जाती है, जबकि सीमेंट की पिच पर बहुत दूर तक फिसलती है?",
      hinglish: "Cricket ball grass outfield pe jaldi kyun rukti hai, par smooth concrete pitch pe bohot dur slide karti hai?",
      te: "పచ్చిక మైదానంలో దొర్లే క్రికెట్ బంతి ఎందుకు ఆగిపోతుంది, కానీ కాంక్రీట్ పిచ్‌పై ఎక్కువ దూరం వెళుతుంది?",
      ta: "புல்வெளியில் உருளும் கிரிக்கெட் பந்து தானாகவே நின்றுவிடுவது ஏன், ஆனால் கான்கிரீட் தளத்தில் நீண்ட தூரம் உருள்வது ஏன்?",
      mr: "गवताळ मैदानावर घरंगळणारा क्रिकेटचा चेंडू लवकर का थांबतो आणि गुळगुळीत जमिनीवर जास्त लांब का जातो?"
    },
    culturalAnalogy: {
      en: "Like pulling a heavy sack of wheat across rough village cobblestones vs. gliding across a polished marble temple floor.",
      hi: "जैसे गेहूं की भारी बोरी को खुरदरे पत्थरों पर घसीटना मुश्किल होता है, पर मंदिर के चिकने संगमरमर पर आसानी से फिसल जाती है!",
      hinglish: "Jaise gehu ki bori ko khurdare raste pe kheenchna mushkil hai, par mandir ke marble floor pe easily slide hoti hai!",
      te: "గ్రామంలోని రాతి రోడ్డుపై బియ్యం బస్తాను లాగడం కష్టం, అదే గుడిలోని నునుపైన పాలరాతి నేలపై సులభంగా జారుతుంది!",
      ta: "கரடுமுரடான கல் சாலையில் நெல் மூட்டையை இழுப்பதற்கும், பளபளப்பான பளிங்குத் தரையில் இழுப்பதற்கும் உள்ள வித்தியாசம்!",
      mr: "खडबडीत रस्त्यावरून धान्याचे पोते ओढणे कठीण जाते, पण मंदिराच्या संगमरवरी फरशीवर ते सहज घसरते!"
    },
    simulationType: "friction",
    simulationParams: {
      surface: "grass", // grass, concrete, ice
      ballMass: 0.16, // kg (cricket ball)
      initialVelocity: 15, // m/s
      frictionCoefficient: 0.35
    },
    socraticStages: [
      {
        stage: 1,
        question: "Newton's 1st Law says objects in motion stay in motion unless an external force acts. What is the invisible force stopping the ball?",
        hint: "Rub your palms together quickly. What do you feel resisting the slide?",
        concept: "Frictional Force (Microscopic Interlocking)"
      },
      {
        stage: 2,
        question: "If we look under a microscope, does 'smooth' grass actually look smooth?",
        hint: "Grass blades and leather have microscopic ridges that lock together like puzzle teeth.",
        concept: "Microscopic Surface Roughness"
      }
    ],
    misconceptions: [
      {
        concept: "Need of Continuous Force",
        flawedBelief: "Aristotelian view: A force is needed to keep an object moving.",
        remedy: "Clarify Newton's 1st Law: In outer space with zero friction, the ball travels forever without any engine."
      }
    ]
  },
  {
    id: "biology-photosynthesis",
    subject: "Biology",
    grade: "Grade 8-10",
    title: {
      en: "Photosynthesis: How Green Leaves Cook Solar Food",
      hi: "प्रकाश संश्लेषण: हरी पत्तियां कैसे बनाती हैं सौर भोजन",
      hinglish: "Photosynthesis: Green Leaves kaise banati hain Solar Energy se Food",
      te: "కిరణజన్య సంయోగక్రియ: ఆకుపచ్చని ఆకులు సౌర ఆహారాన్ని ఎలా తయారు చేస్తాయి",
      ta: "ஒளிச்சேர்க்கை: பச்சை இலைகள் எவ்வாறு சூரிய உணவை தயாரிக்கின்றன",
      mr: "प्रकाशसंश्लेषण: हिरवी पाने सौर ऊर्जा वापरून अन्न कसे तयार करतात"
    },
    initialQuestion: {
      en: "Where does the massive weight of a giant Banyan tree come from if it only drinks water from tiny soil roots?",
      hi: "एक विशाल बरगद के पेड़ का इतना भारी वजन कहां से आता है, जबकि वह मिट्टी से केवल पानी ही पीता है?",
      hinglish: "Ek giant Banyan tree ka itna heavy wood aur weight kahan se aata hai jabki wo sirf water aur mitti leta hai?",
      te: "మర్రిచెట్టు భారీ బరువు ఎక్కడి నుండి వస్తుంది? అది నేల నుండి నీటిని మాత్రమే తీసుకుంటుంది కదా?",
      ta: "ஒரு பெரிய ஆலமரத்தின் இவ்வளவு எடை எங்கிருந்து வருகிறது? அது மண்ணிலிருந்து நீரையும் மட்டுமே எடுக்கிறதே?",
      mr: "एका महाकाय वडाच्या झाडाचे एवढे वजन कुठून येते, तर ते केवळ मातीतून पाणी शोषून घेते?"
    },
    culturalAnalogy: {
      en: "A tree's leaves are like millions of miniature solar kitchens in our villages, catching carbon dioxide from thin air and solar rays to bake glucose!",
      hi: "पेड़ की पत्तियां गांव के छोटे-छोटे सोलर चूल्हे की तरह हैं, जो हवा से अदृश्य कार्बन लेकर ठोस लकड़ी और मीठा फल पकाती हैं!",
      hinglish: "Leaves nature ke mini solar kitchens hain, jo hawa se carbon dioxide capture karke glucose pakati hain!",
      te: "చెట్ల ఆకులు గ్రామంలోని సౌర వంటశాలల వంటివి, అవి గాలి నుండి కార్బన్ డయాక్సైడ్ మరియు సూర్యరశ్మిని ఉపయోగించి గ్లూకోజ్‌ను తయారు చేస్తాయి!",
      ta: "மரத்தின் இலைகள் இயற்கையின் சிறிய சூரிய அடுப்புகள் போன்றவை, அவை காற்றில் உள்ள கார்பனை எடுத்து உணவை உருவாக்குகின்றன!",
      mr: "झाडाची पाने म्हणजे निसर्गाचे लहान सौर स्वयंपाकघर, जी हवेतील कार्बन आणि सूर्यप्रकाश वापरून ग्लुकोज बनवतात!"
    },
    simulationType: "photosynthesis",
    simulationParams: {
      sunlightIntensity: 75,
      co2Level: 420,
      stomataOpen: true
    },
    socraticStages: [
      {
        stage: 1,
        question: "When humans exhale, what invisible gas do we release that plants inhale?",
        hint: "We breathe in O2 and exhale CO2. Plants do the reverse in daylight!",
        concept: "Carbon Dioxide as Building Block"
      },
      {
        stage: 2,
        question: "What is the green pigment in chloroplasts that absorbs photons of light?",
        hint: "It reflects green light and absorbs blue & red wavelengths.",
        concept: "Chlorophyll Activation"
      }
    ],
    misconceptions: [
      {
        concept: "Mass Source",
        flawedBelief: "Trees eat soil to grow heavy.",
        remedy: "Helmont's willow tree experiment: Soil mass changed by only 2 ounces over 5 years, while tree gained 160 pounds!"
      }
    ]
  },
  {
    id: "math-fractions",
    subject: "Mathematics",
    grade: "Grade 6-7",
    title: {
      en: "Fractions & Proportions in Everyday Sharing",
      hi: "दैनिक जीवन में भिन्न और समानुपात (Fractions)",
      hinglish: "Fractions aur Proportions in Daily Life (Roti aur Thali Example)",
      te: "రోజువారీ జీవితంలో భిన్నాలు మరియు నిష్పత్తులు",
      ta: "அன்றாட வாழ்வில் பின்னங்கள் மற்றும் விகிதங்கள்",
      mr: "दैनंदिन जीवनातील अपूर्णांक आणि गुणोत्तर"
    },
    initialQuestion: {
      en: "If 4 friends want to equally share 3 hot rotis, how much of a roti does each friend receive, and why is it 3/4 instead of 4/3?",
      hi: "यदि 4 दोस्तों को 3 गर्म रोटियां आपस में बराबर बांटनी हों, तो प्रत्येक को कितनी रोटी मिलेगी?",
      hinglish: "Agar 4 friends ko 3 hot rotis equally share karni ho, toh har ek ko kitni roti milegi?",
      te: "4గురు స్నేహితులు 3 వేడి రొట్టెలను సమానంగా పంచుకోవాలనుకుంటే, ప్రతి ఒక్కరికీ ఎంత రొట్టె వస్తుంది?",
      ta: "4 நண்பர்கள் 3 சூடான ரொட்டிகளை சமமாகப் பகிர்ந்து கொள்ள விரும்பினால், ஒவ்வொருவருக்கும் எவ்வளவு ரொட்டி கிடைக்கும்?",
      mr: "जर ४ मित्रांना ३ गरम चपात्या समान वाटायच्या असतील, तर प्रत्येकाला किती चपाती मिळेल?"
    },
    culturalAnalogy: {
      en: "Break each of the 3 rotis into 4 quarter pieces (chauthai). Now you have 12 quarters. 12 divided among 4 friends = 3 quarters each = 3/4!",
      hi: "तीनों रोटियों के 4-4 बराबर टुकड़े (चौथाई) कर लो। कुल 12 टुकड़े बने। 4 दोस्तों में 12 टुकड़े बांटो = हर एक को मिले 3 टुकड़े, यानी 3/4!",
      hinglish: "Har roti ke 4 pieces karo, total 12 tukde huye. 4 dosto ko barabar baanto = har ek ko 3 pieces mile (3/4th roti)!",
      te: "ప్రతి రొట్టెను 4 సమాన భాగాలుగా చేయండి. మొత్తం 12 భాగాలు అవుతాయి. 4 స్నేహితులకు 12 భాగాలు పంచిపెడితే = ఒక్కొక్కరికి 3 భాగాలు వస్తాయి (3/4)!",
      ta: "ஒவ்வொரு ரொட்டியையும் 4 சம துண்டுகளாக வெட்டுங்கள். மொத்தம் 12 துண்டுகள். 4 பேருக்கு பிரித்தால் ஆளுக்கு 3 துண்டுகள் = 3/4!",
      mr: "प्रत्येक चपातीचे ४ समान तुकडे करा, एकूण १२ तुकडे होतील. ४ जणांना वाटले तर प्रत्येकाला ३ तुकडे मिळतील = ३/४!"
    },
    simulationType: "fractions",
    simulationParams: {
      totalItems: 3,
      totalPeople: 4
    },
    socraticStages: [
      {
        stage: 1,
        question: "Can everyone get 1 whole roti?",
        hint: "We only have 3 rotis, but 4 people. So each portion must be less than 1.",
        concept: "Proper vs Improper Fractions"
      }
    ],
    misconceptions: [
      {
        concept: "Numerator vs Denominator",
        flawedBelief: "Confusing what is being divided (3 rotis) with who it is divided amongst (4 people).",
        remedy: "Numerator is the 'stuff you share', Denominator is the 'number of shares'."
      }
    ]
  }
];

export const LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "hi", name: "हिंदी (Hindi)", flag: "🇮🇳" },
  { code: "hinglish", name: "Hinglish (हिंदी + Eng)", flag: "💬" },
  { code: "te", name: "తెలుగు (Telugu)", flag: "🇮🇳" },
  { code: "ta", name: "தமிழ் (Tamil)", flag: "🇮🇳" },
  { code: "mr", name: "मराठी (Marathi)", flag: "🇮🇳" }
];

export const TEACHER_CLASSROOM_DATA = [
  {
    topicId: "optics-prism",
    topicName: "Light Dispersion & Prism",
    classAverage: 62,
    studentsAssessed: 48,
    riskLevel: "High",
    commonMisconception: "68% students believe prism paints the light rather than separating existing wavelengths.",
    recommendedRemedial: "Run hands-on inverted double-prism experiment or interactive simulation slider."
  },
  {
    topicId: "mechanics-friction",
    topicName: "Newton's 1st Law & Friction",
    classAverage: 78,
    studentsAssessed: 52,
    riskLevel: "Low",
    commonMisconception: "Aristotelian intuition: constant pushing needed to maintain velocity.",
    recommendedRemedial: "Demonstrate ice/air hockey table frictionless scenario."
  },
  {
    topicId: "biology-photosynthesis",
    topicName: "Photosynthesis Mass Origin",
    classAverage: 54,
    studentsAssessed: 46,
    riskLevel: "High",
    commonMisconception: "82% students think wood weight comes entirely from soil nutrients.",
    recommendedRemedial: "Highlight Van Helmont's 5-year willow tree soil weight experiment."
  },
  {
    topicId: "math-fractions",
    topicName: "Fractions & Proportions",
    classAverage: 71,
    studentsAssessed: 50,
    riskLevel: "Medium",
    commonMisconception: "Swapping numerator and denominator in word problems.",
    recommendedRemedial: "Use physical roti / pizza cut-out visualizer."
  }
];
