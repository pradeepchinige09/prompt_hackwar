/**
 * ShikshaSetu AI — Adaptive Learning, Analytics & Gamification Engine
 * 
 * Features:
 * 1. Topic Mastery & Performance Tracking (Optics, Friction, Photosynthesis, Fractions)
 * 2. Deterministic Mastery Calculation (Mastered, Strong, Developing, Needs Practice)
 * 3. Personalized Adaptive Recommendation Engine
 * 4. Anti-duplication Gamification (XP, Levels, and Badges)
 * 5. Safe LocalStorage persistence without external database dependency
 */

import { CURRICULUM_TOPICS } from '../data/curriculumData.js';

const STORAGE_KEY = 'SHIKSHA_LEARNER_PROGRESS_V2';

// 6 Core Achievement Badges
export const BADGE_DEFINITIONS = [
  {
    id: 'first_step',
    name: {
      en: 'First Step',
      hi: 'पहला कदम',
      hinglish: 'First Step',
      te: 'మొదటి అడుగు',
      ta: 'முதல் படி',
      mr: 'पहिले पाऊल'
    },
    icon: '🌱',
    description: {
      en: 'Completed your first diagnostic quiz or learning interaction',
      hi: 'अपनी पहली क्विज या शिक्षण बातचीत पूरी की',
      hinglish: 'First quiz ya learning interaction complete kiya',
      te: 'మీ మొదటి క్విజ్ లేదా అభ్యాస పరస్పర చర్యను పూర్తి చేసారు',
      ta: 'உங்கள் முதல் வினாடி வினா அல்லது கற்றல் தொடர்பை முடித்துள்ளீர்கள்',
      mr: 'तुमची पहिली क्विझ किंवा शिक्षण संवाद पूर्ण केला'
    }
  },
  {
    id: 'curious_learner',
    name: {
      en: 'Curious Learner',
      hi: 'जिज्ञासु शिक्षार्थी',
      hinglish: 'Curious Learner',
      te: 'ఆసక్తిగల అభ్యాసకుడు',
      ta: 'ஆர்வமுள்ள கற்பவர்',
      mr: 'जिज्ञासू विद्यार्थी'
    },
    icon: '🔍',
    description: {
      en: 'Explored 3 or more Socratic hints from the AI Guru',
      hi: 'एआई गुरु से 3 या अधिक सुकराती संकेतों का उपयोग किया',
      hinglish: 'AI Guru se 3 ya zyada Socratic hints explore kiye',
      te: 'AI గురువు నుండి 3 లేదా అంతకంటే ఎక్కువ ఆధారాలను అన్వేషించారు',
      ta: 'AI குருவிடமிருந்து 3 அல்லது அதற்கு மேற்பட்ட குறிப்புகளை ஆராய்ந்துள்ளார்',
      mr: 'AI गुरूंकडून ३ किंवा अधिक संकेत शोधून काढले'
    }
  },
  {
    id: 'physics_explorer',
    name: {
      en: 'Physics Explorer',
      hi: 'भौतिकी अन्वेषक',
      hinglish: 'Physics Explorer',
      te: 'భౌతికశాస్త్ర అన్వేషకుడు',
      ta: 'இயற்பியல் ஆய்வாளர்',
      mr: 'भौतिकशास्त्र संशोधक'
    },
    icon: '⚡',
    description: {
      en: 'Mastered Optics or Newton’s Friction with 75%+ score',
      hi: 'ऑप्टिक्स या घर्षण में 75%+ स्कोर प्राप्त किया',
      hinglish: 'Optics ya Friction mein 75%+ score score kiya',
      te: 'ఆప్టిక్స్ లేదా ఘర్షణలో 75%+ స్కోర్ సాధించారు',
      ta: 'ஒளியியல் அல்லது உராய்வில் 75%+ மதிப்பெண் பெற்றுள்ளார்',
      mr: 'ऑप्टिक्स किंवा घर्षण विषयामध्ये ७५%+ गुण मिळवले'
    }
  },
  {
    id: 'concept_builder',
    name: {
      en: 'Concept Builder',
      hi: 'अवधारणा निर्माता',
      hinglish: 'Concept Builder',
      te: 'భావనల నిర్మాత',
      ta: 'கருத்து உருவாக்குநர்',
      mr: 'संकल्पना निर्माता'
    },
    icon: '🧪',
    description: {
      en: 'Interacted with real-time SVG mental models & simulations',
      hi: 'रियल-टाइम मानसिक मॉडल और सिमुलेशन के साथ प्रयोग किया',
      hinglish: 'Real-time mental model simulation ke sath experiment kiya',
      te: 'రియల్-టైమ్ మానసిక నమూనాలు & అనుకరణలతో పరస్పర చర్య చేసారు',
      ta: 'நிகழ்நேர காட்சி மன மாதிரிகள் மற்றும் உருவகப்படுத்துதல்களுடன் தொடர்புகொண்டார்',
      mr: 'रिअल-टाइम मानसिक मॉडेल्स आणि सिम्युलेशनसह प्रयोग केले'
    }
  },
  {
    id: 'quiz_champion',
    name: {
      en: 'Quiz Champion',
      hi: 'क्विज चैंपियन',
      hinglish: 'Quiz Champion',
      te: 'క్విజ్ ఛాంపియన్',
      ta: 'வினாடி வினா வெற்றியாளர்',
      mr: 'क्विझ चॅम्पियन'
    },
    icon: '🏆',
    description: {
      en: 'Achieved 100% perfect accuracy on any curriculum quiz',
      hi: 'किसी भी पाठ्यक्रम क्विज में 100% सही उत्तर दिए',
      hinglish: 'Kisi bhi quiz mein 100% perfect accuracy score ki',
      te: 'ఏదైనా క్విజ్‌లో 100% ఖచ్చితమైన స్కోర్ సాధించారు',
      ta: 'எந்தவொரு வினாடி வினாவிலும் 100% துல்லியமான மதிப்பெண் பெற்றுள்ளார்',
      mr: 'कोणत्याही क्विझमध्ये १००% अचूक गुण मिळवले'
    }
  },
  {
    id: 'mastery_achieved',
    name: {
      en: 'Mastery Achieved',
      hi: 'महारत हासिल',
      hinglish: 'Mastery Achieved',
      te: 'ప్రావీణ్యం సాధించబడింది',
      ta: 'தேர்ச்சி பெறப்பட்டது',
      mr: 'प्रभुत्व प्राप्त'
    },
    icon: '👑',
    description: {
      en: 'Reached 90%+ overall conceptual mastery across subjects',
      hi: 'सभी विषयों में 90%+ समग्र वैचारिक महारत हासिल की',
      hinglish: 'Sabhi subjects mein 90%+ overall mastery reach ki',
      te: 'అన్ని సబ్జెక్టులలో 90%+ మొత్తం ప్రావీణ్యాన్ని చేరుకున్నారు',
      ta: 'அனைத்து பாடங்களிலும் 90%+ ஒட்டுமொத்த கருத்தியல் தேர்ச்சியை அடைந்துள்ளார்',
      mr: 'सर्व विषयांमध्ये ९०%+ संकल्पनात्मक प्रभुत्व गाठले'
    }
  }
];

export class AdaptiveLearningEngine {
  constructor() {
    this.state = this.loadState();
  }

  loadState() {
    const defaultState = {
      xp: 150,
      streakDays: 5,
      completedQuizzesCount: 1,
      totalQuestionsAttempted: 3,
      totalQuestionsCorrect: 2,
      lastActiveTimestamp: Date.now(),
      topicAnalytics: {
        'optics-prism': {
          attempts: 3,
          correct: 2,
          incorrect: 1,
          mastery: 67,
          tier: 'Developing', // Mastered, Strong, Developing, Needs Practice
          misconceptionsIdentified: ['Belief that prism paints light'],
          lastAttempted: Date.now() - 3600000
        },
        'mechanics-friction': {
          attempts: 0,
          correct: 0,
          incorrect: 0,
          mastery: 40,
          tier: 'Needs Practice',
          misconceptionsIdentified: [],
          lastAttempted: null
        },
        'biology-photosynthesis': {
          attempts: 0,
          correct: 0,
          incorrect: 0,
          mastery: 50,
          tier: 'Developing',
          misconceptionsIdentified: [],
          lastAttempted: null
        },
        'math-fractions': {
          attempts: 0,
          correct: 0,
          incorrect: 0,
          mastery: 45,
          tier: 'Needs Practice',
          misconceptionsIdentified: [],
          lastAttempted: null
        }
      },
      unlockedBadges: ['first_step'],
      awardedActionIds: {} // for de-duplication
    };

    try {
      const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          return {
            ...defaultState,
            ...parsed,
            topicAnalytics: {
              ...defaultState.topicAnalytics,
              ...(parsed.topicAnalytics || {})
            },
            unlockedBadges: Array.isArray(parsed.unlockedBadges) ? parsed.unlockedBadges : defaultState.unlockedBadges,
            awardedActionIds: (parsed.awardedActionIds && typeof parsed.awardedActionIds === 'object') ? parsed.awardedActionIds : {}
          };
        }
      }
    } catch {
      // ignore
    }

    return defaultState;
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch {
      // ignore localstorage errors
    }
  }

  getMasteryTier(mastery) {
    if (mastery >= 90) return 'Mastered';
    if (mastery >= 75) return 'Strong';
    if (mastery >= 50) return 'Developing';
    return 'Needs Practice';
  }

  /**
   * Records a quiz attempt with anti-duplication guards
   */
  recordQuizResult({ attemptId, topicId, score, totalQuestions, incorrectAnswers = [], misconceptions = [] }) {
    if (!attemptId) attemptId = `${topicId}_${Date.now()}`;
    
    // Prevent duplicate processing
    if (this.state.awardedActionIds[attemptId]) {
      return { duplicate: true, progress: this.getProgress() };
    }

    const topicData = this.state.topicAnalytics[topicId] || {
      attempts: 0,
      correct: 0,
      incorrect: 0,
      mastery: 0,
      tier: 'Needs Practice',
      misconceptionsIdentified: [],
      lastAttempted: null
    };

    const newAttempts = topicData.attempts + totalQuestions;
    const newCorrect = topicData.correct + score;
    const newIncorrect = topicData.incorrect + (totalQuestions - score);
    const newMastery = Math.min(100, Math.max(0, Math.round((newCorrect / Math.max(1, newAttempts)) * 100)));

    topicData.attempts = newAttempts;
    topicData.correct = newCorrect;
    topicData.incorrect = newIncorrect;
    topicData.mastery = newMastery;
    topicData.tier = this.getMasteryTier(newMastery);
    topicData.lastAttempted = Date.now();

    // Append new misconceptions
    if (misconceptions && misconceptions.length > 0) {
      misconceptions.forEach(m => {
        if (!topicData.misconceptionsIdentified.includes(m)) {
          topicData.misconceptionsIdentified.push(m);
        }
      });
    }

    this.state.topicAnalytics[topicId] = topicData;
    this.state.completedQuizzesCount += 1;
    this.state.totalQuestionsAttempted += totalQuestions;
    this.state.totalQuestionsCorrect += score;

    // Calculate XP
    const earnedXP = 50 + (score * 20); // 50 base for quiz + 20 per correct answer
    this.state.xp += earnedXP;
    this.state.awardedActionIds[attemptId] = { earnedXP, timestamp: Date.now() };

    // Check Badges
    const newlyUnlocked = [];
    if (!this.state.unlockedBadges.includes('first_step')) {
      this.state.unlockedBadges.push('first_step');
      newlyUnlocked.push('first_step');
    }

    if (score === totalQuestions && !this.state.unlockedBadges.includes('quiz_champion')) {
      this.state.unlockedBadges.push('quiz_champion');
      newlyUnlocked.push('quiz_champion');
    }

    if ((topicId === 'optics-prism' || topicId === 'mechanics-friction') && newMastery >= 75) {
      if (!this.state.unlockedBadges.includes('physics_explorer')) {
        this.state.unlockedBadges.push('physics_explorer');
        newlyUnlocked.push('physics_explorer');
      }
    }

    const overallMastery = this.getOverallMastery();
    if (overallMastery >= 90 && !this.state.unlockedBadges.includes('mastery_achieved')) {
      this.state.unlockedBadges.push('mastery_achieved');
      newlyUnlocked.push('mastery_achieved');
    }

    this.saveState();

    return {
      duplicate: false,
      earnedXP,
      newlyUnlockedBadges: newlyUnlocked,
      topicMastery: newMastery,
      topicTier: topicData.tier,
      progress: this.getProgress()
    };
  }

  /**
   * Records tutor interactions (hints, simulation explorations)
   */
  recordTutorInteraction({ interactionId, topicId, type }) {
    if (!interactionId) interactionId = `${topicId}_${type}_${Date.now()}`;
    if (this.state.awardedActionIds[interactionId]) return;

    let xpBonus = 15;
    if (type === 'simulation') xpBonus = 25;

    this.state.xp += xpBonus;
    this.state.awardedActionIds[interactionId] = { earnedXP: xpBonus, timestamp: Date.now() };

    // Badge triggers
    if (type === 'hint' && !this.state.unlockedBadges.includes('curious_learner')) {
      this.state.unlockedBadges.push('curious_learner');
    }
    if (type === 'simulation' && !this.state.unlockedBadges.includes('concept_builder')) {
      this.state.unlockedBadges.push('concept_builder');
    }

    this.saveState();
  }

  getOverallMastery() {
    const topics = Object.values(this.state.topicAnalytics);
    if (!topics.length) return 60;
    const sum = topics.reduce((acc, t) => acc + (t.mastery || 0), 0);
    return Math.round(sum / topics.length);
  }

  /**
   * Generates dynamic adaptive learning recommendation based on lowest mastery and misconceptions
   */
  getAdaptiveRecommendation(lang = 'en') {
    // Rank topics by lowest mastery
    const topicKeys = ['mechanics-friction', 'optics-prism', 'biology-photosynthesis', 'math-fractions'];
    
    let weakestId = 'mechanics-friction';
    let minMastery = 101;

    for (const key of topicKeys) {
      const data = this.state.topicAnalytics[key] || { mastery: 0 };
      if (data.mastery < minMastery) {
        minMastery = data.mastery;
        weakestId = key;
      }
    }

    const matchedTopic = CURRICULUM_TOPICS.find(t => t.id === weakestId) || CURRICULUM_TOPICS[1];
    const data = this.state.topicAnalytics[weakestId] || { mastery: 40, tier: 'Needs Practice', misconceptionsIdentified: [] };

    // Recommendation templates per language
    const recs = {
      'optics-prism': {
        title: {
          en: 'Optics: Strengthen Dispersion Concepts',
          hi: 'ऑप्टिक्स: प्रकाश विक्षेपण की अवधारणा मजबूत करें',
          hinglish: 'Optics: Prism Dispersion concepts ko strong karein',
          te: 'ఆప్టిక్స్: కాంతి విక్షేపణ భావనలను బలోపేతం చేసుకోండి',
          ta: 'ஒளியியல்: நிறப்பிரிகைக் கருத்துக்களை வலுப்படுத்துங்கள்',
          mr: 'ऑप्टिक्स: प्रकाश अपस्करण संकल्पना बळकट करा'
        },
        description: {
          en: 'You scored under 75% on refraction. Test the Prism Angle Slider to observe how wavelength affects bending.',
          hi: 'अपवर्तन में आपका स्कोर 75% से कम है। प्रिज्म एंगल स्लाइडर से देखें कि तरंग दैर्ध्य कैसे मुड़ती है।',
          hinglish: 'Refraction mein score 75% se kam hai. Prism slider se observe karein ki colors kaise separate hote hain.',
          te: 'వక్రీభవనంలో మీ స్కోరు 75% కంటే తక్కువగా ఉంది. ప్రిజం స్లైడర్‌తో తరంగదైర్ఘ్యం ఎలా వంగుతుందో గమనించండి.',
          ta: 'ஒளிவிலகலில் உங்கள் மதிப்பெண் 75%க்கு கீழ் உள்ளது. முப்பட்டகக் கோண ஸ்லைடரைப் பயன்படுத்தி சோதிக்கவும்.',
          mr: 'अपवर्तनात आपले गुण ७५% पेक्षा कमी आहेत. प्रिझम अँगल स्लाइडर वापरून निरीक्षण करा.'
        },
        reason: {
          en: 'Low score on wavelength dispersion and prism behavior',
          hi: 'तरंग दैर्ध्य विक्षेपण और प्रिज्म पर कम स्कोर',
          hinglish: 'Prism wavelength dispersion par low score',
          te: 'తరంగదైర్ఘ్య విక్షేపణపై తక్కువ స్కోరు',
          ta: 'அலைநீள நிறப்பிரிகையில் குறைவான மதிப்பெண்',
          mr: 'तरंगलांबी अपस्करणावर कमी गुण'
        },
        ctaText: {
          en: 'Practice with Prism Simulation →',
          hi: 'प्रिज्म सिमुलेशन का अभ्यास करें →',
          hinglish: 'Prism Simulation Practice Karein →',
          te: 'ప్రిజం అనుకరణతో సాధన చేయండి →',
          ta: 'முப்பட்டக உருவகப்படுத்துதலுடன் பயிற்சி செய்க →',
          mr: 'प्रिझम सिम्युलेशनचा सराव करा →'
        },
        action: 'tutor',
        difficulty: 'Intermediate'
      },
      'mechanics-friction': {
        title: {
          en: 'Friction: Explore Stopping Distances',
          hi: 'घर्षण: क्रिकेट गेंद और रुकने की दूरी का विश्लेषण करें',
          hinglish: 'Friction: Cricket ball rolling simulation test karein',
          te: 'ఘర్షణ: ఆగే దూరాన్ని క్రికెట్ బంతి అనుకరణతో అర్థం చేసుకోండి',
          ta: 'உராய்வு: நிற்கும் தூரத்தை கிரிக்கெட் பந்து மூலம் ஆராயுங்கள்',
          mr: 'घर्षण: क्रिकेट चेंडू आणि थांबण्याचे अंतर तपासा'
        },
        description: {
          en: 'Friction needs reinforcement. Roll the cricket ball on grass vs marble to intuitively see μ * N resistance.',
          hi: 'घर्षण के नियम समझने के लिए क्रिकेट गेंद को घास और संगमरमर पर रोल करके μ * N प्रतिरोध देखें।',
          hinglish: 'Friction concept ko build karne ke liye cricket ball ko grass vs marble par roll karke μ * N resistance observe karein.',
          te: 'ఘర్షణ భావనను మెరుగుపరచుకోవడానికి క్రికెట్ బంతిని గడ్డి మరియు పాలరాతిపై రోల్ చేసి చూడండి.',
          ta: 'உராய்வு கருத்தை வலுப்படுத்த புல் மற்றும் பளிங்குத் தரையில் கிரிக்கெட் பந்தை உருட்டிப் பாருங்கள்.',
          mr: 'घर्षणाचा नियम समजण्यासाठी क्रिकेट चेंडू गवत आणि संगमरवरावर फिरवून μ * N विरोध अनुभवा.'
        },
        reason: {
          en: 'Weak mastery in Newton’s 1st Law and frictional surfaces',
          hi: 'न्यूटन के पहले नियम और घर्षण सतहों में कमजोर पकड़',
          hinglish: 'Newton 1st Law aur friction surface concepts mein low score',
          te: 'న్యూటన్ మొదటి నియమం మరియు ఘర్షణ తలాలపై తక్కువ పట్టు',
          ta: 'நியூட்டனின் முதல் விதி மற்றும் உராய்வுப் பரப்புகளில் குறைவான தேர்ச்சி',
          mr: 'न्यूटनचा पहिला नियम आणि घर्षण पृष्ठभागांमध्ये कमी प्रभुत्व'
        },
        ctaText: {
          en: 'Launch Cricket Ball Simulation →',
          hi: 'क्रिकेट बॉल सिमुलेशन शुरू करें →',
          hinglish: 'Cricket Ball Simulation Launch Karein →',
          te: 'క్రికెట్ బంతి అనుకరణను ప్రారంభించండి →',
          ta: 'கிரிக்கெட் பந்து உருவகப்படுத்துதலைத் தொடங்குங்கள் →',
          mr: 'क्रिकेट बॉल सिम्युलेशन सुरू करा →'
        },
        action: 'tutor',
        difficulty: 'Foundational'
      },
      'biology-photosynthesis': {
        title: {
          en: 'Photosynthesis: Understand Stomata & Sunlight',
          hi: 'प्रकाश संश्लेषण: रंध्र (स्टोमाटा) और सौर ऊर्जा को समझें',
          hinglish: 'Photosynthesis: Stomata aur Sunlight reaction samjhein',
          te: 'కిరణజన్య సంయోగక్రియ: పత్రరంధ్రాలు & సూర్యకాంతిని అర్థం చేసుకోండి',
          ta: 'ஒளிச்சேர்க்கை: இலைத்துளைகள் மற்றும் சூரிய ஒளியைப் புரிந்து கொள்ளுங்கள்',
          mr: 'प्रकाशसंश्लेषण: पर्णरंध्रे आणि सूर्यप्रकाश समजून घ्या'
        },
        description: {
          en: 'Explore the Leaf Factory simulation to observe how oxygen bubbles release as sunlight intensity increases.',
          hi: 'लीफ फैक्ट्री सिमुलेशन में देखें कि धूप बढ़ने पर ऑक्सीजन के बुलबुले कैसे निकलते हैं।',
          hinglish: 'Leaf Factory simulation mein dekhein ki sunlight badhne se oxygen bubbles kaise generate hote hain.',
          te: 'సూర్యకాంతి తీవ్రత పెరిగేకొద్దీ ఆక్సిజన్ బుడగలు ఎలా విడుదలవుతాయో లీఫ్ ఫ్యాక్టరీ అనుకరణలో చూడండి.',
          ta: 'சூரிய ஒளி தீவிரமடையும் போது ஆக்ஸிஜன் குமிழ்கள் எவ்வாறு வெளியேறுகின்றன என்பதை உருவகப்படுத்துதலில் காண்க.',
          mr: 'सूर्यप्रकाशाची तीव्रता वाढल्यावर ऑक्सिजनचे बुडबुडे कसे बाहेर पडतात ते सिम्युलेशनमध्ये पहा.'
        },
        reason: {
          en: 'Common misconception detected: attributing tree mass to soil absorption',
          hi: 'सामान्य भ्रम: पेड़ का वजन मिट्टी से आने की गलत धारणा',
          hinglish: 'Tree mass soil se aata hai - is misconception ko address karein',
          te: 'చెట్ల బరువు మట్టి నుండి వస్తుందనే అపోహను సరిదిద్దాలి',
          ta: 'மரத்தின் நிறை மண்ணிலிருந்து வருகிறது என்ற தவறான கருத்து கண்டறியப்பட்டது',
          mr: 'झाडाचे वजन मातीतून येते हा सामान्य गैरसमज आढळला'
        },
        ctaText: {
          en: 'Explore Leaf Reactor →',
          hi: 'लीफ रिएक्टर सिमुलेशन देखें →',
          hinglish: 'Leaf Reactor Explore Karein →',
          te: 'ఆకు రియాక్టర్ అనుకరణను అన్వేషించండి →',
          ta: 'இலை உலை உருவகப்படுத்துதலை ஆராயுங்கள் →',
          mr: 'लीफ रिअॅक्टर सिम्युलेशन एक्सप्लोर करा →'
        },
        action: 'tutor',
        difficulty: 'Intermediate'
      },
      'math-fractions': {
        title: {
          en: 'Fractions: Visual Proportion & Sharing',
          hi: 'भिन्न (Fractions): रोटी बंटवारे से अनुपात समझें',
          hinglish: 'Fractions: Roti sharing visualizer se proportions samjhein',
          te: 'భిన్నాలు: రొట్టె పంపకాలతో భాగాలు & నిష్పత్తులను అర్థం చేసుకోండి',
          ta: 'பின்னங்கள்: ரொட்டி பகிர்வு மூலம் விகிதாச்சாரங்களைப் புரிந்து கொள்ளுங்கள்',
          mr: 'अपूर्णांक: चपाती वाटपावरून प्रमाण आणि गुणोत्तर समजून घ्या'
        },
        description: {
          en: 'Adjust the roti and friend sliders to see how slices distribute equally among people.',
          hi: 'रोटी और दोस्तों के स्लाइडर को बदलकर देखें कि हर हिस्सेदार को कितना भाग मिलता है।',
          hinglish: 'Roti aur friends sliders ko adjust karke equal distribution visually observe karein.',
          te: 'రొట్టెలు మరియు స్నేహితుల స్లైడర్‌లను సర్దుబాటు చేసి సమాన పంపకాన్ని చూడండి.',
          ta: 'ரொட்டி மற்றும் நண்பர்கள் ஸ்லைடர்களை மாற்றி சமமாக எவ்வாறு பிரிகிறது என்பதைப் பார்க்கவும்.',
          mr: 'चपाती आणि मित्रांचे स्लाइडर बदलून प्रत्येकाला किती भाग मिळतो ते पहा.'
        },
        reason: {
          en: 'Foundational concept: converting division into fractional parts',
          hi: 'बुनियादी अवधारणा: भाग को भिन्न भागों में बदलना',
          hinglish: 'Division ko fractions mein visually convert karne ka foundation',
          te: 'ప్రాథమిక భావన: భాగహారాన్ని భిన్నాలుగా మార్చడం',
          ta: 'அடிப்படை கருத்து: வகுத்தலை பின்ன பகுதிகளாக மாற்றுதல்',
          mr: 'पायाभूत संकल्पना: भागाकाराचे अपूर्णांकात रूपांतर करणे'
        },
        ctaText: {
          en: 'Practice Roti Fractions →',
          hi: 'रोटी भिन्न का अभ्यास करें →',
          hinglish: 'Roti Fractions Practice Karein →',
          te: 'రొట్టె భిన్నాల సాధన చేయండి →',
          ta: 'ரொட்டி பின்னங்களைப் பயிற்சி செய்க →',
          mr: 'चपाती अपूर्णांकांचा सराव करा →'
        },
        action: 'tutor',
        difficulty: 'Foundational'
      }
    };

    const targetRec = recs[weakestId] || recs['mechanics-friction'];
    const safeLang = recs[weakestId]?.title[lang] ? lang : 'en';

    return {
      topicId: weakestId,
      topic: matchedTopic,
      mastery: data.mastery,
      tier: data.tier,
      title: targetRec.title[safeLang],
      description: targetRec.description[safeLang],
      reason: targetRec.reason[safeLang],
      ctaText: targetRec.ctaText[safeLang],
      action: targetRec.action,
      difficulty: targetRec.difficulty
    };
  }

  getProgress() {
    const overallMastery = this.getOverallMastery();
    const allBadges = BADGE_DEFINITIONS.map(b => ({
      ...b,
      unlocked: this.state.unlockedBadges.includes(b.id)
    }));

    return {
      xp: this.state.xp,
      level: Math.floor(this.state.xp / 100) + 1,
      streakDays: this.state.streakDays,
      completedQuizzesCount: this.state.completedQuizzesCount,
      totalQuestionsAttempted: this.state.totalQuestionsAttempted,
      totalQuestionsCorrect: this.state.totalQuestionsCorrect,
      accuracyRate: Math.round((this.state.totalQuestionsCorrect / Math.max(1, this.state.totalQuestionsAttempted)) * 100),
      overallMastery,
      overallTier: this.getMasteryTier(overallMastery),
      topicAnalytics: this.state.topicAnalytics,
      badges: allBadges,
      unlockedCount: this.state.unlockedBadges.length
    };
  }

  resetProgress() {
    localStorage.removeItem(STORAGE_KEY);
    this.state = this.loadState();
    this.saveState();
  }
}

export const learningEngine = new AdaptiveLearningEngine();
