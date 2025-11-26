
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { GeneratedContent, ChatMessage, Topic, Language, Course } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper function for delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Wrapper to handle Rate Limits (429) with Exponential Backoff
const generateWithRetry = async <T>(
    operation: () => Promise<T>, 
    retries = 5, 
    initialBackoff = 5000
): Promise<T> => {
    let currentBackoff = initialBackoff;
    for (let i = 0; i < retries; i++) {
        try {
            return await operation();
        } catch (error: any) {
            // Robust check for 429/Quota errors including nested objects
            const isRateLimit = 
                error?.status === 429 || 
                error?.code === 429 || 
                error?.error?.code === 429 || 
                error?.error?.status === 'RESOURCE_EXHAUSTED' ||
                (error?.message && (
                    error.message.includes('429') || 
                    error.message.toLowerCase().includes('quota') || 
                    error.message.includes('RESOURCE_EXHAUSTED')
                ));

            if (isRateLimit) {
                if (i < retries - 1) {
                    console.warn(`API Rate Limit Hit. Retrying in ${currentBackoff}ms... (Attempt ${i + 1}/${retries})`);
                    await delay(currentBackoff);
                    currentBackoff *= 2; // Exponential backoff
                    continue;
                } else {
                    console.error("Max retries exceeded for rate limit.");
                }
            }
            
            // If it's the last retry or not a rate limit error, throw it.
            throw error;
        }
    }
    throw new Error("Max retries exceeded due to rate limiting.");
};

const getInstructorPersona = (courseTitle: string, language: Language) => {
    const role = language === 'tr' 
        ? `Sen ${courseTitle} MasterClass Eğitmenisin. Tarzın: Profesyonel, teknik derinliği yüksek, "Senior Engineer" seviyesinde ama anlaşılır. DİL: TÜRKÇE`
        : `You are a ${courseTitle} MasterClass Instructor. Style: Professional, high technical depth, "Senior Engineer" level but accessible. LANGUAGE: ENGLISH`;
        
    const rules = language === 'tr'
        ? `Yanıtların Markdown formatında ve pratik çözüm odaklı olmalı. Asla yüzeysel olma, detaylara in ve "Best Practice"leri vurgula.`
        : `Answers must be in Markdown format and practical/solution-oriented. Never be superficial, dive into details and emphasize "Best Practices".`;

    return `${role}\n${rules}`;
};

const getContentInstruction = (courseTitle: string, isDeepDive: boolean, language: Language) => {
    const persona = getInstructorPersona(courseTitle, language);
    
    const task = language === 'tr'
        ? `Görevin: Kullanıcıya ${courseTitle} konusunu ${isDeepDive ? 'AKADEMİK VE EKSPERT SEVİYEDE (Deep Dive)' : 'Eksiksiz bir Dokümantasyon'} formatında sunmak.`
        : `Task: Present the ${courseTitle} topic to the user in ${isDeepDive ? 'ACADEMIC AND EXPERT LEVEL (Deep Dive)' : 'Complete Documentation'} format.`;

    const deepDiveRules = language === 'tr' 
        ? `DİKKAT: Kullanıcı "Derinlemesine Araştırma" modunu seçti.
        1. Standart tanımları hızlı geç, iç mekanizmalara (internals) odaklan.
        2. Edge Case'leri, potansiyel hataları ve production ortamındaki tuzakları anlat.
        3. Performans etkilerini ve trade-off'ları analiz et.
        4. Kod örnekleri production-ready ve gelişmiş olmalı.
        5. İçerik uzunluğu standarttan en az 2 kat daha detaylı olmalı.`
        : `ATTENTION: User selected "Deep Dive Research" mode.
        1. Skip standard definitions quickly, focus on internals.
        2. Explain edge cases, potential errors, and production pitfalls.
        3. Analyze performance impacts and trade-offs.
        4. Code examples must be production-ready and advanced.
        5. Content length must be at least 2x more detailed than standard.`;

    const standardRules = language === 'tr'
        ? `Format:
        1. Başlık ve Yönetici Özeti
        2. Teknik Mimari / Teorik Altyapı
        3. Kod Örnekleri / Konfigürasyon
        4. Pro Tip / Expert Insight`
        : `Format:
        1. Title and Executive Summary
        2. Technical Architecture / Theoretical Foundation
        3. Code Examples / Configuration
        4. Pro Tip / Expert Insight`;

    return `${persona}\n${task}\n\n${isDeepDive ? deepDiveRules : standardRules}`;
};

export const generateTutorialContent = async (topicTitle: string, level: string, courseTitle: string = "Technology", isDeepDive: boolean = false, language: Language = 'tr'): Promise<GeneratedContent> => {
  const prompt = language === 'tr' 
      ? `KURS: ${courseTitle}\nKONU: ${topicTitle}\nSEVİYE: ${level}\nMOD: ${isDeepDive ? 'DERİNLEMESİNE ARAŞTIRMA (EXPERT MODE)' : 'Standart Eğitim'}\nLütfen bu konu için Markdown formatında kapsamlı, teknik ve eğitici bir içerik oluştur.`
      : `COURSE: ${courseTitle}\nTOPIC: ${topicTitle}\nLEVEL: ${level}\nMODE: ${isDeepDive ? 'DEEP DIVE RESEARCH (EXPERT MODE)' : 'Standard Tutorial'}\nPlease create comprehensive, technical, and educational content in Markdown format for this topic.`;

  try {
    // Wrap API call with retry logic
    const response = await generateWithRetry<GenerateContentResponse>(() => ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: getContentInstruction(courseTitle, isDeepDive, language),
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING },
            relatedTopics: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
            }
          },
          required: ["title", "content", "relatedTopics"]
        }
      }
    }));

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return { ...JSON.parse(text), language } as GeneratedContent;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      title: language === 'tr' ? "Hata" : "Error",
      content: language === 'tr' 
        ? "İçerik oluşturulurken bir hata meydana geldi veya API limiti aşıldı. Lütfen biraz bekleyip tekrar deneyin.\n\nAPI Error: " + (error as any)?.message 
        : "An error occurred while generating content or API limit exceeded. Please wait and try again.\n\nAPI Error: " + (error as any)?.message,
      relatedTopics: [],
      language
    };
  }
};

export const suggestMissingTopics = async (
  courseTitle: string, 
  categoryTitle: string, 
  existingTopics: Topic[],
  language: Language = 'tr'
): Promise<Topic[]> => {
  const existingTitles = existingTopics.map(t => t.title).join(", ");
  
  const prompt = language === 'tr'
    ? `KURS: ${courseTitle}\nKATEGORİ: ${categoryTitle}\nMEVCUT BAŞLIKLAR: ${existingTitles}\nBu kategori için eğitimin "Eksiksiz" olması adına eksik kalan 2-4 adet YENİ ileri seviye konu başlığı öner. Mevcutlarla çakışmamalı.`
    : `COURSE: ${courseTitle}\nCATEGORY: ${categoryTitle}\nEXISTING TOPICS: ${existingTitles}\nSuggest 2-4 NEW advanced missing topics to make this curriculum "Complete". Must not overlap with existing ones.`;

  try {
    const response = await generateWithRetry<GenerateContentResponse>(() => ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: language === 'tr' 
            ? `Sen müfredat planlayan uzman bir eğitmensin. Verilen kategoride eksik kalan "Missing Puzzle Pieces"ları bul. JSON array döndür.`
            : `You are an expert curriculum planner. Find the "Missing Puzzle Pieces" in the given category. Return a JSON array.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              level: { type: Type.STRING, enum: ['Advanced', 'Expert'] }
            },
            required: ["title", "description", "level"]
          }
        }
      }
    }));

    const text = response.text;
    if (!text) return [];
    
    const topics = JSON.parse(text) as Topic[];
    return topics.map(t => ({
      ...t,
      id: t.id || t.title.toLowerCase().replace(/[^a-z0-9]/g, '-').substring(0, 20)
    }));

  } catch (error) {
    console.error("Curriculum Expansion Error:", error);
    return [];
  }
};

export const generateCourseStructure = async (
    userPrompt: string, 
    language: Language = 'tr'
): Promise<Course | null> => {
    const prompt = language === 'tr'
      ? `KULLANICI İSTEĞİ: "${userPrompt}"\nBu istek doğrultusunda kapsamlı bir MasterClass Kurs Müfredatı oluştur.`
      : `USER REQUEST: "${userPrompt}"\nCreate a comprehensive MasterClass Course Curriculum based on this request.`;

    const availableIcons = [
        'CloudflareIcon', 'TypeScriptIcon', 'DataScienceIcon', 'SearchIcon', 
        'RecommendationIcon', 'StrategyIcon', 'EngineeringIcon', 'GenAIIcon', 
        'EthicsIcon', 'PipelineIcon', 'ScraperIcon', 'CloudCostIcon', 'BotIcon', 
        'SpeedIcon', 'GlobalPaymentIcon', 'B2BSalesIcon', 'ApiProductIcon', 
        'BrainIcon', 'MathIcon', 'AgentIcon', 'BrandIcon', 'BookOpen', 'Shield', 
        'Terminal', 'Database', 'Sparkles', 'Zap'
    ];

    try {
        const response = await generateWithRetry<GenerateContentResponse>(() => ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: language === 'tr'
                    ? `Sen bir "Eğitim Mimarı"sın. Kullanıcının istediği konuda sıfırdan bir kurs yapısı oluştur.
                       1. 'id' benzersiz ve slug formatında olsun.
                       2. 'icon' alanı şu listeden EN UYGUN olanı seçilmeli: ${availableIcons.join(', ')}. Eğer hiçbiri uymazsa 'BookOpen' seç.
                       3. 'themeColor' o konuya uygun profesyonel bir HEX kodu olsun.
                       4. 'curriculum' en az 4 kategori ve her kategoride en az 3 konu içermeli.
                       5. Seviyeler 'Beginner', 'Intermediate', 'Advanced', 'Expert' olabilir.`
                    : `You are an "Education Architect". Create a course structure from scratch based on the user request.
                       1. 'id' must be unique and slug format.
                       2. 'icon' must be the BEST FIT from this list: ${availableIcons.join(', ')}. If none fit, use 'BookOpen'.
                       3. 'themeColor' should be a professional HEX code suitable for the topic.
                       4. 'curriculum' must have at least 4 categories with 3 topics each.
                       5. Levels can be 'Beginner', 'Intermediate', 'Advanced', 'Expert'.`,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        id: { type: Type.STRING },
                        title: { type: Type.STRING },
                        description: { type: Type.STRING },
                        icon: { type: Type.STRING },
                        themeColor: { type: Type.STRING },
                        curriculum: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    id: { type: Type.STRING },
                                    title: { type: Type.STRING },
                                    topics: {
                                        type: Type.ARRAY,
                                        items: {
                                            type: Type.OBJECT,
                                            properties: {
                                                id: { type: Type.STRING },
                                                title: { type: Type.STRING },
                                                description: { type: Type.STRING },
                                                level: { type: Type.STRING }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    required: ["id", "title", "description", "icon", "themeColor", "curriculum"]
                }
            }
        }));

        const text = response.text;
        if (!text) return null;

        return JSON.parse(text) as Course;
    } catch (e) {
        console.error("Course Generation Error:", e);
        return null;
    }
}

export const chatWithContext = async (
  message: string, 
  currentContext: string | null, 
  history: ChatMessage[],
  courseTitle: string = "Technology",
  language: Language = 'tr'
): Promise<string> => {
  
  const historyParts = history.map(h => ({
    role: h.role,
    parts: [{ text: h.text }]
  }));

  const contextPrompt = currentContext 
    ? (language === 'tr' ? `KULLANICININ ŞU AN OKUDUĞU İÇERİK:\n${currentContext.substring(0, 3000)}...\n\n` : `USER IS CURRENTLY READING:\n${currentContext.substring(0, 3000)}...\n\n`)
    : "";

  const finalPrompt = `${contextPrompt}${language === 'tr' ? 'KULLANICI SORUSU' : 'USER QUESTION'}: ${message}`;

  try {
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: getInstructorPersona(courseTitle, language) + (language === 'tr' ? " Kısa ve net cevaplar ver." : " Keep answers concise and clear."),
      },
      history: historyParts
    });

    const result = await chat.sendMessage({ message: finalPrompt });
    return result.text || (language === 'tr' ? "Cevap alınamadı." : "No response.");
  } catch (error) {
    return language === 'tr' ? "Üzgünüm, şu an bağlantı kuramıyorum." : "Sorry, I cannot connect right now.";
  }
};
