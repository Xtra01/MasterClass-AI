
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedContent, ChatMessage, Topic, Language } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
    const response = await ai.models.generateContent({
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
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return { ...JSON.parse(text), language } as GeneratedContent;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      title: language === 'tr' ? "Hata" : "Error",
      content: language === 'tr' ? "İçerik oluşturulurken bir hata meydana geldi." : "An error occurred while generating content.",
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
    const response = await ai.models.generateContent({
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
    });

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
