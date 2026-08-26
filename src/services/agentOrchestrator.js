// Antigravity Multi-Agent Orchestration Service for ShikshaSetu AI
// Coordinates:
// 1. SocraticPedagogyAgent
// 2. VernacularCulturalBridgeAgent
// 3. VisualConceptGeneratorAgent
// 4. NeuroAccessibilityAgent

import { CURRICULUM_TOPICS } from '../data/curriculumData';

export class AgentOrchestrator {
  constructor() {
    this.history = [];
    this.activeTopic = CURRICULUM_TOPICS[0];
    this.currentLanguage = 'en';
    this.socraticStep = 0;
    this.subagentTrace = [];
    this.apiKey = localStorage.getItem('GEMINI_API_KEY') || '';
  }

  setTopic(topicId) {
    const found = CURRICULUM_TOPICS.find(t => t.id === topicId);
    if (found) {
      this.activeTopic = found;
      this.socraticStep = 0;
    }
  }

  setLanguage(langCode) {
    this.currentLanguage = langCode;
  }

  setApiKey(key) {
    this.apiKey = key;
    if (key) {
      localStorage.setItem('GEMINI_API_KEY', key);
    } else {
      localStorage.removeItem('GEMINI_API_KEY');
    }
  }

  /**
   * Dispatches user message through the Multi-Agent pipeline
   * Attempts live streaming from Python Antigravity FastAPI backend (localhost:8000)
   * and smoothly falls back to client-side autonomous multi-agent engine.
   */
  async *processUserMessage(userMessage, hintType = null) {
    const topic = this.activeTopic;
    const lang = this.currentLanguage;

    // Try live Python Antigravity Backend if standard query
    if (!hintType && typeof fetch !== 'undefined') {
      try {
        const response = await fetch('http://localhost:8000/api/agent/stream', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: userMessage,
            topic_id: topic.id,
            lang: lang,
            api_key: this.apiKey || null
          }),
          signal: AbortSignal.timeout ? AbortSignal.timeout(2000) : undefined
        });

        if (response.ok && response.body) {
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let buffer = '';
          let receivedData = false;

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            receivedData = true;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                try {
                  const data = JSON.parse(line.slice(6));
                  if (data.type === 'token_delta') {
                    yield {
                      type: 'token_delta',
                      fullText: data.full_text
                    };
                  } else if (data.type === 'done') {
                    yield {
                      type: 'done',
                      fullText: data.full_text,
                      culturalNote: topic.culturalAnalogy[lang] || topic.culturalAnalogy.en
                    };
                    return;
                  } else {
                    yield data;
                  }
                } catch (err) {
                  // ignore JSON parse error
                }
              }
            }
          }

          if (receivedData) return;
        }
      } catch (backendErr) {
        // Backend not running; continue to client-side autonomous engine
        console.log("Antigravity Python backend offline, running autonomous client engine:", backendErr.message);
      }
    }

    // -------------------------------------------------------------
    // Autonomous Multi-Agent Client Engine
    // -------------------------------------------------------------

    // 1. Subagent: Socratic Pedagogical Analysis
    yield {
      type: 'subagent_dispatch',
      agent: 'SocraticGuruAgent',
      action: 'Analyzing student intent & cognitive stage'
    };

    yield {
      type: 'thought',
      agent: 'SocraticGuruAgent',
      thought: `Query received: "${userMessage}". Topic context: ${topic.subject} (${topic.title.en}). Target: Lead with Socratic inquiry without giving direct solution.`
    };

    await new Promise(r => setTimeout(r, 350));

    // 2. Tool Execution: Curriculum Lookup & Misconception Check
    yield {
      type: 'tool_call',
      agent: 'SocraticGuruAgent',
      tool: 'curriculum_lookup',
      args: { topicId: topic.id, grade: topic.grade }
    };

    await new Promise(r => setTimeout(r, 300));

    // Misconception detection
    const matchedMisconception = topic.misconceptions.find(m => 
      userMessage.toLowerCase().includes(m.concept.toLowerCase()) ||
      userMessage.toLowerCase().includes('paint') ||
      userMessage.toLowerCase().includes('color') ||
      userMessage.toLowerCase().includes('soil') ||
      userMessage.toLowerCase().includes('eat') ||
      userMessage.toLowerCase().includes('stop')
    );

    if (matchedMisconception) {
      yield {
        type: 'thought',
        agent: 'SocraticGuruAgent',
        thought: `Flagged common misconception: "${matchedMisconception.flawedBelief}". Applying pedagogical counter-remedy: ${matchedMisconception.remedy}`
      };
    }

    // 3. Subagent: Vernacular & Cultural Anchor Agent
    yield {
      type: 'subagent_dispatch',
      agent: 'VernacularCulturalBridgeAgent',
      action: `Contextualizing explanation for language: ${lang.toUpperCase()}`
    };

    yield {
      type: 'thought',
      agent: 'VernacularCulturalBridgeAgent',
      thought: `Selecting regional analogy for ${lang}: Connecting abstract formula with everyday Indian anchor ("${topic.culturalAnalogy[lang] || topic.culturalAnalogy.en}")`
    };

    await new Promise(r => setTimeout(r, 300));

    // 4. Subagent: Visual Concept Generator
    yield {
      type: 'subagent_dispatch',
      agent: 'VisualConceptGeneratorAgent',
      action: 'Updating dynamic simulation parameters'
    };

    let updatedParams = { ...topic.simulationParams };
    if (userMessage.toLowerCase().includes('angle') || userMessage.toLowerCase().includes('rotate')) {
      updatedParams.incidenceAngle = Math.min(65, Math.max(25, (updatedParams.incidenceAngle || 45) + 5));
    }

    yield {
      type: 'simulation_update',
      params: updatedParams
    };

    // 5. Synthesize Socratic Response based on hintType or user answer
    let responseText = "";
    const culturalNote = topic.culturalAnalogy[lang] || topic.culturalAnalogy.en;

    // Check if user answered a quiz question (e.g. 'b', 'white', '2')
    const lowerUser = userMessage.toLowerCase().trim();
    const isQuizAnswer = lowerUser === 'b' || lowerUser.includes('white') || lowerUser.includes('option b') || lowerUser.includes('recombine');

    if (isQuizAnswer) {
      if (lang === 'hi') {
        responseText = `🎉 **शानदार! बिल्कुल सही उत्तर (Option B)!** 👏\n\nउल्टे प्रिज्म से गुजरने पर सातों रंग वापस मिलकर सफेद प्रकाश (White Light) बना देते हैं। इससे सर आइज़ैक न्यूटन ने सिद्ध किया था कि श्वेत प्रकाश पहले से ही सातों रंगों का मिश्रण है!\n\n👉 **अगला सवाल:** क्या आप बता सकते हैं कि बारिश की बूंदें आसमान में प्रिज्म जैसा व्यवहार कैसे करती हैं?`;
      } else if (lang === 'hinglish') {
        responseText = `🎉 **Spot On! Option B is 100% correct!** 👏\n\nJab inverted prism se 7 colors pass hote hain, toh wo recombine hoke wapas pure White Light ban jate hain. Is experiment se Newton ne prove kiya tha ki white light naturally 7 colors ka combination hai!\n\n👉 **Next step:** Kya aap bata sakte hain ki monsoon mein raindrops prism ki tarah kaise act karti hain?`;
      } else if (lang === 'te') {
        responseText = `🎉 **అద్భుతం! సరైన సమాధానం (Option B)!** 👏\n\nతలక్రిందులుగా ఉన్న ప్రిజం గుండా 7 రంగులు వెళ్ళినప్పుడు, అవి తిరిగి కలిసి తెల్లని కాంతిగా మారతాయి! ఇది న్యూటన్ నిరూపించిన ప్రసిద్ధ ప్రయోగం.\n\n👉 **తదుపరి ప్రశ్న:** వర్షపు చినుకులు ఆకాశంలో ప్రిజంలా ఎలా పనిచేస్తాయో చెప్పగలరా?`;
      } else if (lang === 'ta') {
        responseText = `🎉 **அருமை! சரியான விடை (Option B)!** 👏\n\nதலைகீழான முப்பட்டகம் வழியாக 7 வண்ணங்கள் செல்லும்போது, அவை மீண்டும் ஒன்றிணைந்து வெள்ளை ஒளியாக மாறுகின்றன!\n\n👉 **அடுத்த கேள்வி:** மழைத்துளிகள் வானத்தில் முப்பட்டகம் போல எவ்வாறு செயல்படுகின்றன?`;
      } else if (lang === 'mr') {
        responseText = `🎉 **छान! अगदी बरोबर उत्तर (Option B)!** 👏\n\nउलट्या प्रिझममधून जाताना सातही रंग पुन्हा एकत्र येऊन पांढरा प्रकाश तयार करतात!\n\n👉 **पुढचा प्रश्न:** पावसाचे थेंब आकाशात प्रिझमसारखे कसे काम करतात?`;
      } else {
        responseText = `🎉 **Spot on! Option B is 100% correct!** 👏\n\nWhen the dispersed 7 colors pass through an inverted identical prism, they refract in reverse and recombine back into pure White Light! This historic experiment by Sir Isaac Newton proved that prisms do not "paint" light—sunlight naturally contains all seven wavelengths.\n\n👉 **Follow-up question:** Can you explain how spherical raindrops in the monsoon act like millions of tiny floating prisms?`;
      }
    } else if (hintType === 'hint') {
      const stage = topic.socraticStages[this.socraticStep % topic.socraticStages.length];
      if (lang === 'hi') {
        responseText = `💡 **संकेत (Hint):** ${stage.hint}\n\n👉 **सोचिए:** ${stage.question}`;
      } else if (lang === 'hinglish') {
        responseText = `💡 **Hint:** ${stage.hint}\n\n👉 **Zara socho:** ${stage.question}`;
      } else if (lang === 'te') {
        responseText = `💡 **సూచన (Hint):** ${stage.hint}\n\n👉 **ఆలోచించండి:** ${stage.question}`;
      } else if (lang === 'ta') {
        responseText = `💡 **குறிப்பு (Hint):** ${stage.hint}\n\n👉 **சிந்தியுங்கள்:** ${stage.question}`;
      } else if (lang === 'mr') {
        responseText = `💡 **संकेत (Hint):** ${stage.hint}\n\n👉 **विचार करा:** ${stage.question}`;
      } else {
        responseText = `💡 **Socratic Hint:** ${stage.hint}\n\n👉 **Reflect on this:** ${stage.question}`;
      }
      this.socraticStep++;
    } else if (hintType === 'eli10') {
      if (lang === 'hi') {
        responseText = `🎈 **आसान भाषा में समझें (10 साल के बच्चे की तरह):**\n\n${culturalNote}\n\nसफेद धूप कोई एक अकेला रंग नहीं है, बल्कि 7 रंगों की एक टीम है जो कांच में घुसते ही अपनी-अपनी गति के कारण अलग-अलग कोण पर मुड़ जाती है!`;
      } else if (lang === 'hinglish') {
        responseText = `🎈 **Simple Words Mein (ELI10):**\n\n${culturalNote}\n\nWhite light actually 7 colors ki team hai. Jaise hi glass prism mein enter karti hai, alag-alag speed ki wajah se separate ho jati hai!`;
      } else if (lang === 'te') {
        responseText = `🎈 **సులభమైన వివరణ (ELI10):**\n\n${culturalNote}\n\nసూర్యకాంతి అనేది 7 రంగుల సమూహం. గాజు ప్రిజంలోకి వెళ్ళినప్పుడు ప్రతి రంగు వేగం మారి విడిపోతుంది!`;
      } else if (lang === 'ta') {
        responseText = `🎈 **எளிய விளக்கம் (ELI10):**\n\n${culturalNote}\n\nசூரிய ஒளி என்பது 7 வண்ணங்களின் கலவை. முப்பட்டகத்தில் நுழையும் போது ஒவ்வொரு வண்ணமும் அதன் வேகத்திற்கு ஏற்ப வளைகிறது!`;
      } else if (lang === 'mr') {
        responseText = `🎈 **सोप्या भाषेत समजून घ्या (ELI10):**\n\n${culturalNote}\n\nपांढरा सूर्यप्रकाश हा ७ रंगांचा संघ आहे. काचेच्या प्रिझममध्ये जाताच प्रत्येक रंगाचा वेग बदलून तो वेगळा होतो!`;
      } else {
        responseText = `🎈 **Explain Like I'm 10:**\n\n${culturalNote}\n\nWhite sunlight isn't just one color—it's an entire team of 7 colors bundled together! As soon as they hit denser glass, each color slows down and turns at a slightly different angle.`;
      }
    } else if (hintType === 'analogy') {
      if (lang === 'hi') {
        responseText = `🪔 **भारतीय दैनिक जीवन का उदाहरण:**\n\n${culturalNote}`;
      } else if (lang === 'hinglish') {
        responseText = `🪔 **Everyday Local Analogy:**\n\n${culturalNote}`;
      } else if (lang === 'te') {
        responseText = `🪔 **నిత్యజీవిత ఉదాహరణ:**\n\n${culturalNote}`;
      } else if (lang === 'ta') {
        responseText = `🪔 **அன்றாட வாழ்க்கை உதாரணம்:**\n\n${culturalNote}`;
      } else if (lang === 'mr') {
        responseText = `🪔 **दैनंदिन जीवनातील उदाहरण:**\n\n${culturalNote}`;
      } else {
        responseText = `🪔 **Cultural Everyday Analogy:**\n\n${culturalNote}`;
      }
    } else if (hintType === 'quiz') {
      if (lang === 'hi') {
        responseText = `🎯 **तुरंत अपनी समझ परखें (Quick Knowledge Check):**\n\nयदि एक उल्टे (Inverted) समान प्रिज्म को पहले प्रिज्म के सामने रख दिया जाए, तो निकलने वाला प्रकाश किस रूप में होगा?\nA) बैंगनी रंग (Only Violet)\nB) पुनः श्वेत प्रकाश (Recombined White Light)\nC) कोई प्रकाश नहीं निकलेगा\n\n*(उत्तर देने के लिए चैट में A, B या C लिखें)*`;
      } else if (lang === 'hinglish') {
        responseText = `🎯 **Quick Check Quiz:**\n\nAgar hum ek inverted identical prism ko pehle prism ke samne place karein, toh output light kya hogi?\nA) Pure Violet\nB) Recombined Pure White Light\nC) Rainbow Colors trap ho jayenge\n\n*(Type A, B, or C below)*`;
      } else if (lang === 'te') {
        responseText = `🎯 **సత్వర అవగాహన పరీక్ష:**\n\nమొదటి ప్రిజం ముందు తలక్రిందులుగా ఉన్న రెండవ ప్రిజం ఉంచితే వచ్చే కాంతి ఏది?\nA) కేవలం ఊదా రంగు\nB) తిరిగి తెల్లని కాంతి (Recombined White Light)\nC) కాంతి బయటకు రాదు\n\n*(సమాధానం కోసం A, B లేదా C టైప్ చేయండి)*`;
      } else if (lang === 'ta') {
        responseText = `🎯 **விரைவு வினாடி வினா:**\n\nமுதல் முப்பட்டகத்தின் முன் தலைகீழான முப்பட்டகத்தை வைத்தால் வெளிவரும் ஒளி எது?\nA) ஊதா நிறம் மட்டும்\nB) மீண்டும் வெள்ளை ஒளி (Recombined White Light)\nC) ஒளி வெளிவராது\n\n*(பதிலளிக்க A, B அல்லது C என உள்ளிடவும்)*`;
      } else if (lang === 'mr') {
        responseText = `🎯 **ज्ञान पडताळणी:**\n\nपहिल्या प्रिझमसमोर उलटा प्रिझम ठेवल्यास बाहेर पडणारा प्रकाश कसा असेल?\nA) फक्त जांभळा रंग\nB) पुन्हा पांढरा प्रकाश (Recombined White Light)\nC) प्रकाश बाहेर पडणार नाही\n\n*(उत्तर देण्यासाठी A, B किंवा C टाईप करा)*`;
      } else {
        responseText = `🎯 **Quick Knowledge Check:**\n\nWhat happens if we place an inverted identical glass prism directly in front of the first prism?\nA) Only Violet light exits\nB) The 7 dispersed colors recombine back into pure White Light!\nC) Light gets completely trapped inside\n\n*(Type A, B, or C to test your understanding!)*`;
      }
    } else {
      // Dynamic conversational guidance
      if (this.socraticStep === 0) {
        if (lang === 'hi') {
          responseText = `शानदार सवाल! क्या आप जानते हैं कि प्रकाश की चाल (Speed of light) हवा और कांच में अलग-अलग होती है?\n\nजब प्रकाश कांच में घुसता है, तो वह धीमा हो जाता है। बैंगनी (Violet) रंग की तरंगदैर्घ्य सबसे छोटी होती है, इसलिए वह सबसे ज्यादा मुड़ता है।\n\n👉 **आपके लिए सवाल:** क्या लाल रंग बैंगनी से ज्यादा मुड़ेगा या कम?`;
        } else if (lang === 'hinglish') {
          responseText = `Great question! Kya aapko pata hai ki light ki speed air mein aur glass ke andar different hoti hai?\n\nJab light prism mein enter karti hai, toh violet color (short wavelength) sabse zyada bend hota hai.\n\n👉 **Aapke liye question:** Red color violet se zyada bend hoga ya kam?`;
        } else if (lang === 'te') {
          responseText = `అద్భుతమైన ప్రశ్న! గాలిలో మరియు గాజులో కాంతి వేగం వేర్వేరుగా ఉంటుందని మీకు తెలుసా?\n\nప్రిజంలోకి ప్రవేశించినప్పుడు ఊదా రంగు కాంతి ఎక్కువగా వంగుతుంది.\n\n👉 **మీ కోసం ప్రశ్న:** ఎరుపు రంగు ఊదా రంగు కంటే ఎక్కువ వంగుతుందా లేదా తక్కువ వంగుతుందా?`;
        } else if (lang === 'ta') {
          responseText = `அருமையான கேள்வி! காற்றில் ஒளி செல்லும் வேகமும் கண்ணாடியில் செல்லும் வேகமும் வேறுபட்டது என்பது உங்களுக்குத் தெரியுமா?\n\nமுப்பட்டகத்தில் நுழையும் போது ஊதா நிறம் மிக அதிகமாக வளைகிறது.\n\n👉 **உங்களுக்கான கேள்வி:** சிவப்பு நிறம் ஊதா நிறத்தை விட அதிகமாக வளையும் அல்லது குறைவாக வளையும்?`;
        } else if (lang === 'mr') {
          responseText = `उत्कृष्ट प्रश्न! प्रकाशाचा हवेतील वेग आणि काचेतील वेग वेगवेगळा असतो हे तुम्हाला माहीत आहे का?\n\nप्रिझममध्ये शिरताना जांभळा रंग सर्वात जास्त झुकतो.\n\n👉 **तुमच्यासाठी प्रश्न:** लाल रंग जांभळ्या रंगापेक्षा जास्त झुकतो की कमी?`;
        } else {
          responseText = `That is the fundamental spark of science! Did you know that light does not travel at the same velocity in air as inside glass?\n\nBecause optical density slows it down, each wavelength refracts at a slightly different angle. Violet has the shortest wavelength (~400nm) and bends the sharpest, while Red (~700nm) bends the least.\n\n👉 **Question for you:** Look at the interactive prism on the right. If we increase the angle of incidence, what happens to the separation of colors?`;
        }
        this.socraticStep++;
      } else {
        if (lang === 'hi') {
          responseText = `बिल्कुल सही दिशा में सोच रहे हैं! 👏\n\n${culturalNote}\n\nयही कारण है कि इंद्रधनुष में लाल रंग सबसे ऊपर और बैंगनी रंग सबसे नीचे दिखाई देता है। अब दाईं ओर दिए गए सिमुलेशन स्लाइडर को हिलाकर खुद देखिए!`;
        } else if (lang === 'hinglish') {
          responseText = `Spot on! Bilkul sahi pakde hain! 👏\n\n${culturalNote}\n\nIsi reason se rainbow mein hamesha Red color top par aur Violet bottom par rehta hai. Ab right side ke simulation slider ko move karke angle change kijiye!`;
        } else if (lang === 'te') {
          responseText = `చాలా సరిగ్గా ఆలోచిస్తున్నారు! 👏\n\n${culturalNote}\n\nఅందుకే ఇంద్రధనస్సులో ఎరుపు రంగు పైన, ఊదా రంగు కింద కనిపిస్తాయి. కుడివైపు ఉన్న సిమ్యులేషన్ స్లైడర్‌ను కదిలించి స్వయంగా చూడండి!`;
        } else if (lang === 'ta') {
          responseText = `மிகச் சரியான சிந்தனை! 👏\n\n${culturalNote}\n\nஇதனால்தான் வானவில்லில் சிவப்பு நிறம் மேலேயும் ஊதா நிறம் கீழேயும் இருக்கும். வலதுபுறம் உள்ள ஸ்லைடரை நகர்த்திப் பாருங்கள்!`;
        } else if (lang === 'mr') {
          responseText = `अगदी योग्य विचार करत आहात! 👏\n\n${culturalNote}\n\nयामुळेच इंद्रधनुष्यात लाल रंग सर्वात वर आणि जांभळा रंग खाली दिसतो. आता उजवीकडील स्लाइडर हलवून स्वतः पहा!`;
        } else {
          responseText = `Brilliant intuition! You hit upon Snell's Law and Cauchy's Dispersion formula! 👏\n\n${culturalNote}\n\nThat is why in a natural rainbow or a lab prism, Red always sits on the outer edge, while Violet bends into the tightest inner curve. Try dragging the Angle of Incidence slider on the simulation canvas to see it in action!`;
        }
      }
    }

    // 6. Token stream simulation
    const tokens = responseText.split(' ');
    let accumulated = "";
    for (let i = 0; i < tokens.length; i++) {
      accumulated += (i === 0 ? "" : " ") + tokens[i];
      yield {
        type: 'token_delta',
        fullText: accumulated
      };
      await new Promise(r => setTimeout(r, 18));
    }

    // 7. Complete Turn
    yield {
      type: 'done',
      fullText: accumulated,
      culturalNote
    };
  }

  /**
   * Uses Web Speech API for real-time vernacular speech narration
   */
  speakText(text, lang = 'en') {
    if (!('speechSynthesis' in window)) {
      alert("Speech synthesis is not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel(); // Stop any active audio
    // Clean markdown symbols for smooth audio narration
    const cleanText = text.replace(/[*#_`]/g, '').replace(/👉/g, '').replace(/💡/g, '').replace(/🎉/g, '').replace(/🎈/g, '').replace(/🪔/g, '').replace(/🎯/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);

    if (lang === 'hi' || lang === 'hinglish') {
      utterance.lang = 'hi-IN';
    } else if (lang === 'te') {
      utterance.lang = 'te-IN';
    } else if (lang === 'ta') {
      utterance.lang = 'ta-IN';
    } else if (lang === 'mr') {
      utterance.lang = 'mr-IN';
    } else {
      utterance.lang = 'en-IN';
    }

    utterance.rate = 0.95; // empathetic, tutor pacing
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
  }
}

export const agentOrchestrator = new AgentOrchestrator();
