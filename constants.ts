

import { Course, GeneratedContent, Language } from './types';

export const UI_STRINGS: Record<Language, Record<string, string>> = {
  tr: {
    settingsTitle: "Ayarlar ve Araçlar",
    settingsBtn: "Ayarlar & Araçlar",
    regenerateCat: "Kategoriyi Yenile",
    regenerateCatDesc: "Aktif kategoriyi sıraya alır.",
    regenerateAll: "Tüm Kursu Yeniden Araştır",
    regenerateAllDesc: "Tüm konuları seçilen dilde sıfırdan oluşturur.",
    resetProgress: "İlerleme Sıfırlandı",
    resetProgressDesc: "Okundu işaretlerini kaldırır.",
    factoryReset: "Fabrika Ayarlarına Dön",
    factoryResetDesc: "İçerikleri ve müfredatı sıfırlar.",
    close: "Kapat",
    processing: "İşleniyor",
    queue: "Sırada",
    searchPlaceholder: "içinde ara...",
    missingTopics: "Eksikleri Tamamla",
    deepDive: "DERİNLEMESİNE ARAŞTIR",
    refresh: "YENİLE",
    downloadPdf: "PDF İNDİR",
    downloadOffline: "TÜM KURSU İNDİR (e-Kitap)",
    downloadOfflineDesc: "Tüm müfredatı tek bir HTML dosyası olarak indir. Çevrimdışı çalışır.",
    offlineReady: "Kurs Paketleniyor...",
    completed: "TAMAMLANDI",
    complete: "TAMAMLA",
    selectKey: "API Anahtarı Seç",
    assistantTitle: "AI Asistanı",
    askPlaceholder: "Bir soru sorun...",
    quoteSelection: "+ Seçimi Alıntıla",
    tip: "İpucu: Müfredat kategorilerinin yanındaki sihirli değneğe tıklayarak eksik konuları tamamlayabilirsiniz.",
    error: "Hata",
    success: "Başarılı",
    info: "Bilgi",
    backToHome: "Ana Sayfaya Dön",
    createCourse: "Yeni Kurs Oluştur",
    createCourseDesc: "Kendi müfredatınızı yapay zeka ile tasarlayın.",
    createModalTitle: "Yapay Zeka Kurs Mimarı",
    createPlaceholder: "Ne öğrenmek istiyorsunuz? (örn: 'Advanced Rust', 'İtalyan Mutfağı', 'Kuantum Fiziği')",
    createBtn: "Müfredatı Tasarla & Oluştur",
    creating: "Müfredat Hazırlanıyor..."
  },
  en: {
    settingsTitle: "Settings & Tools",
    settingsBtn: "Settings & Tools",
    regenerateCat: "Regenerate Category",
    regenerateCatDesc: "Queues the active category for update.",
    regenerateAll: "Research & Regenerate Course",
    regenerateAllDesc: "Re-researches all topics in the selected language.",
    resetProgress: "Reset Progress",
    resetProgressDesc: "Clears all read markers.",
    factoryReset: "Factory Reset",
    factoryResetDesc: "Resets all content and curriculum.",
    close: "Close",
    processing: "Processing",
    queue: "Queued",
    searchPlaceholder: "search in...",
    missingTopics: "Complete Missing Topics",
    deepDive: "DEEP DIVE RESEARCH",
    refresh: "REFRESH",
    downloadPdf: "DOWNLOAD PDF",
    downloadOffline: "DOWNLOAD FULL COURSE (e-Book)",
    downloadOfflineDesc: "Download entire curriculum as a single HTML file. Works offline.",
    offlineReady: "Packaging Course...",
    completed: "COMPLETED",
    complete: "COMPLETE",
    selectKey: "Select API Key",
    assistantTitle: "AI Assistant",
    askPlaceholder: "Ask a question...",
    quoteSelection: "+ Quote Selection",
    tip: "Tip: Click the magic wand icon next to curriculum categories to find and add missing topics.",
    error: "Error",
    success: "Success",
    info: "Info",
    backToHome: "Back to Home",
    createCourse: "Create New Course",
    createCourseDesc: "Design your own curriculum with AI.",
    createModalTitle: "AI Course Architect",
    createPlaceholder: "What do you want to learn? (e.g., 'Advanced Rust', 'Italian Cuisine', 'Quantum Physics')",
    createBtn: "Design & Build Curriculum",
    creating: "Architecting Curriculum..."
  }
};

export const LANDING_STRINGS: Record<Language, any> = {
    tr: {
        heroBadge: "Yeni Nesil Yapay Zeka Öğrenme Platformu",
        heroTitle: "Teknolojiyi Sınırların Ötesinde Öğrenin",
        heroSub: "Statik kurslardan sıkıldınız mı? Sizinle birlikte gelişen, eksik parçaları tamamlayan ve derinlemesine inen canlı bir ekosistem.",
        startBtn: "Keşfetmeye Başla",
        features: [
            { title: "Dinamik Müfredat", desc: "Siz ilerledikçe eksik konuları analiz edip ekleyen AI motoru." },
            { title: "Derinlemesine Analiz", desc: "Yüzeysel tanımlar yerine üretim ortamı (production) senaryoları." },
            { title: "Uzman Eğitmen Modu", desc: "Her konu için özelleşmiş 'Senior Engineer' yapay zeka kişiliği." }
        ],
        availableCourses: "Mevcut Uzmanlık Programları",
        startLearning: "Eğitime Başla",
        courseCount: "Konu Başlığı"
    },
    en: {
        heroBadge: "Next Generation AI Learning Platform",
        heroTitle: "Master Technology Beyond Limits",
        heroSub: "Bored of static courses? Meet a living ecosystem that evolves with you, fills in the gaps, and dives deep.",
        startBtn: "Start Exploring",
        features: [
            { title: "Dynamic Curriculum", desc: "AI engine that analyzes and adds missing topics as you progress." },
            { title: "Deep Dive Analysis", desc: "Production scenarios instead of superficial definitions." },
            { title: "Expert Instructor Mode", desc: "Specialized 'Senior Engineer' AI persona for each topic." }
        ],
        availableCourses: "Available MasterClasses",
        startLearning: "Start Learning",
        courseCount: "Topics"
    }
};

// Translations for Course Titles and Descriptions
export const COURSE_TRANSLATIONS: Record<string, { tr: { title: string, desc: string }, en: { title: string, desc: string } }> = {
    'cloudflare': { tr: { title: 'Cloudflare', desc: 'Edge network, WAF, Workers ve Serverless.' }, en: { title: 'Cloudflare', desc: 'Edge network, WAF, Workers and Serverless.' } },
    'ai-strategy': { tr: { title: 'AI & Kurumsal Strateji', desc: 'B2B değer üretimi, ROI ve Stratejik Dönüşüm.' }, en: { title: 'AI & Enterprise Strategy', desc: 'B2B value creation, ROI and Strategic Transformation.' } },
    'ai-engineering': { tr: { title: 'AI Mühendisliği', desc: 'Uygulamalı projeler ve sektörel çözümler.' }, en: { title: 'AI Engineering', desc: 'Applied projects and industrial solutions.' } },
    'gen-ai-llm': { tr: { title: 'Generative AI & LLMs', desc: 'Büyük Dil Modelleri, Prompt Engineering ve RAG.' }, en: { title: 'Generative AI & LLMs', desc: 'Large Language Models, Prompt Engineering and RAG.' } },
    'ai-ethics': { tr: { title: 'Etik & Regülasyonlar', desc: 'Güvenlik, uyumluluk, EU AI Act ve Şeffaflık.' }, en: { title: 'Ethics & Regulations', desc: 'Security, compliance, EU AI Act and Transparency.' } },
    'ml-ops': { tr: { title: 'Uygulamalı DS & MLOps', desc: 'ML Pipeline, Model Dağıtımı ve Ölçekleme.' }, en: { title: 'Applied DS & MLOps', desc: 'ML Pipelines, Model Deployment and Scaling.' } },
    'ai-scraping': { tr: { title: 'Full-Stack AI Web Scraping', desc: 'Anti-bot sistemleri, headless mimari ve büyük ölçekli veri toplama.' }, en: { title: 'Full-Stack AI Web Scraping', desc: 'Anti-bot systems, headless architecture and large scale data collection.' } },
    'llm-automation': { tr: { title: 'LLM Otomasyon Mühendisliği', desc: 'Akıllı boru hatları, veri temizleme ve karar mekanizmaları.' }, en: { title: 'LLM Automation Engineering', desc: 'Intelligent pipelines, data cleaning and decision mechanisms.' } },
    'gcp-cost': { tr: { title: 'Google Cloud Maliyet Mimarisi', desc: 'Free Tier optimizasyonu ve düşük maliyetli ölçekleme.' }, en: { title: 'GCP Cost-Aware Architecture', desc: 'Free Tier optimization and low-cost scaling.' } },
    'high-perf-python': { tr: { title: 'High-Performance Python', desc: 'GPU hızlandırma, async IO ve bellek optimizasyonu.' }, en: { title: 'High-Performance Python', desc: 'GPU acceleration, async IO and memory optimization.' } },
    'data-engineering': { tr: { title: 'AI İçin Veri Mühendisliği', desc: 'ETL/ELT, dbt, Airflow ve modern veri yığınları.' }, en: { title: 'Data Engineering for AI', desc: 'ETL/ELT, dbt, Airflow and modern data stacks.' } },
    'global-payments': { tr: { title: 'Global Ödeme Altyapıları', desc: 'Sınır ötesi ödemeler, KYC/AML ve Fintech uyumluluğu.' }, en: { title: 'Global Payments Infrastructure', desc: 'Cross-border payments, KYC/AML and Fintech compliance.' } },
    'b2b-ai-sales': { tr: { title: 'AI Destekli B2B Satış', desc: 'Değer önerisi, ROI hesaplama ve kurumsal güven inşası.' }, en: { title: 'AI-Driven B2B Sales', desc: 'Value proposition, ROI calculation and enterprise trust building.' } },
    'api-productization': { tr: { title: 'API Ürünleştirme & Gelir', desc: 'Veri servislerini paraya çevirme, rate limiting ve DX.' }, en: { title: 'API Productization & Monetization', desc: 'Monetizing data services, rate limiting and DX.' } },
    'behavioral-ai': { tr: { title: 'Davranışsal AI & Karar Mimarisi', desc: 'Psikoloji, dürtme (nudge) teorisi ve karar sistemleri.' }, en: { title: 'Behavioral AI & Decision Arch', desc: 'Psychology, nudge theory and decision systems.' } },
    'info-theory': { tr: { title: 'Pratik Bilgi Kuramı (Information Theory)', desc: 'Shannon entropisi, Fourier analizi ve anomali tespiti.' }, en: { title: 'Practical Information Theory', desc: 'Shannon entropy, Fourier analysis and anomaly detection.' } },
    'personal-agents': { tr: { title: 'Kişisel AI Ajanları', desc: 'Otonom iş akışları, multi-agent sistemler ve araç kullanımı.' }, en: { title: 'Personal AI Agents', desc: 'Autonomous workflows, multi-agent systems and tool use.' } },
    'consultant-branding': { tr: { title: 'AI Danışman Markalaması', desc: 'Otorite inşası, içerik stratejisi ve pazar konumlandırma.' }, en: { title: 'AI Consultant Branding', desc: 'Authority building, content strategy and market positioning.' } },
    'learning-learning': { tr: { title: 'Öğrenmeyi Öğrenmek', desc: 'Nörobilimsel temeller, hafıza teknikleri ve mental modeller.' }, en: { title: 'Learning How to Learn', desc: 'Neuroscientific foundations, memory techniques and mental models.' } },
    'hugging-face': { tr: { title: 'Hugging Face: Zero to Hero', desc: 'Transformers, PEFT/LoRA, TGI ve Spaces ile uçtan uca LLM.' }, en: { title: 'Hugging Face: Zero to Hero', desc: 'End-to-end LLM with Transformers, PEFT/LoRA, TGI and Spaces.' } }
};


export const COURSES: Course[] = [
  {
    id: 'learning-learning',
    title: 'Öğrenmeyi Öğrenmek',
    description: 'Nörobilim, hafıza teknikleri, odaklanma ve ileri seviye zihinsel modeller.',
    icon: 'LightbulbIcon',
    themeColor: '#FFC107', // Amber
    curriculum: [
      {
        id: 'foundations',
        title: 'Bilişsel Temeller',
        topics: [
          { id: 'neuroscience', title: 'Öğrenmenin Nörobilimi', description: 'Sinaptik plastisite, miyelinleşme ve uzun süreli güçlenme (LTP).', level: 'Beginner' },
          { id: 'modes', title: 'Odaklanmış vs Dağınık Mod', description: 'Barbara Oakley\'nin problem çözme modları ve geçiş stratejileri.', level: 'Intermediate' },
          { id: 'memory-systems', title: 'Hafıza Mimarisi', description: 'Çalışma belleği, uzun süreli bellek ve bilişsel yük teorisi.', level: 'Advanced' }
        ]
      },
      {
        id: 'techniques',
        title: 'Teknikler & Araçlar',
        topics: [
          { id: 'active-recall', title: 'Aktif Geri Çağırma', description: 'Pasif okuma yerine aktif test etme stratejileri.', level: 'Intermediate' },
          { id: 'spaced-repetition', title: 'Aralıklı Tekrar (SRS)', description: 'Unutma eğrisini kırmak için Anki/SuperMemo algoritmaları.', level: 'Advanced' },
          { id: 'memory-palace', title: 'Hafıza Sarayı (Loci Metodu)', description: 'Uzamsal hafıza ile büyük veri setlerini ezberleme.', level: 'Expert' }
        ]
      },
      {
        id: 'productivity',
        title: 'Verimlilik & Psikoloji',
        topics: [
          { id: 'procrastination', title: 'Erteleme Psikolojisi', description: 'Limbik sistem vs Prefrontal korteks savaşı ve çözüm yolları.', level: 'Intermediate' },
          { id: 'pomodoro-flow', title: 'Pomodoro ve Akış (Flow)', description: 'Dikkat yönetimi ve derinlemesine çalışma (Deep Work).', level: 'Intermediate' },
          { id: 'habit-formation', title: 'Alışkanlık Bilimi', description: 'Atomik alışkanlıklar, tetikleyiciler ve ödül döngüleri.', level: 'Advanced' }
        ]
      },
      {
        id: 'mental-models',
        title: 'Mental Modeller',
        topics: [
          { id: 'first-principles', title: 'İlk İlkeler (First Principles)', description: 'Problemleri en temel gerçeklerine indirgeyerek çözme.', level: 'Expert' },
          { id: 'feynman-tech', title: 'Feynman Tekniği', description: 'Basitleştirerek öğrenme ve boşlukları tespit etme.', level: 'Advanced' },
          { id: 'transfer-learning', title: 'Transfer Learning', description: 'Bir alandaki yetkinliği başka bir alana taşıma.', level: 'Expert' }
        ]
      }
    ]
  },
  {
    id: 'hugging-face',
    title: 'Hugging Face: Zero to Hero',
    description: 'Transformers, PEFT/LoRA, TGI ve Spaces ile modern NLP ekosistemi.',
    icon: 'HuggingFaceIcon',
    themeColor: '#FFD21E', // HF Yellow
    curriculum: [
      {
        id: 'hf-hub',
        title: 'The Hub & Ecosystem',
        topics: [
          { id: 'hub-intro', title: 'Model Hub & Cards', description: 'Model kartları, versiyonlama ve lisanslama (Apache 2.0 vs Llama).', level: 'Beginner' },
          { id: 'datasets-lib', title: 'Datasets Library', description: 'Büyük veri setlerini stream etme, map/filter işlemleri ve parquet formatı.', level: 'Intermediate' },
          { id: 'hf-cli', title: 'Hugging Face CLI & API', description: 'Komut satırı araçları ve HfApi ile programatik yönetim.', level: 'Advanced' }
        ]
      },
      {
        id: 'transformers-core',
        title: 'Transformers Library',
        topics: [
          { id: 'pipelines', title: 'Pipelines & Inference', description: 'Tek satırda NLP görevleri (Sentiment, NER, Translation).', level: 'Beginner' },
          { id: 'tokenizers', title: 'Tokenizers Deep Dive', description: 'BPE, WordPiece, SentencePiece ve vocabulary yönetimi.', level: 'Advanced' },
          { id: 'models-config', title: 'Models & Configs', description: 'AutoModel, AutoConfig ve mimari detayları yükleme.', level: 'Intermediate' }
        ]
      },
      {
        id: 'fine-tuning',
        title: 'Training & Fine-Tuning',
        topics: [
          { id: 'trainer-api', title: 'Trainer API', description: 'TrainingArguments, callbackler ve eğitim döngüsü.', level: 'Intermediate' },
          { id: 'peft-lora', title: 'PEFT & LoRA', description: 'Düşük kaynakla büyük modelleri eğitme (Low-Rank Adaptation).', level: 'Expert' },
          { id: 'qlora', title: 'QLoRA & Quantization', description: '4-bit quantization ile GPU belleğini optimize etme (BitsAndBytes).', level: 'Expert' }
        ]
      },
      {
        id: 'deployment',
        title: 'Deployment & Spaces',
        topics: [
          { id: 'gradio', title: 'Gradio ile Demo', description: 'Python ile hızlı web arayüzleri oluşturma ve paylaşma.', level: 'Intermediate' },
          { id: 'spaces-docker', title: 'HF Spaces & Docker', description: 'Özel Docker containerları ile Spaces üzerinde uygulama dağıtımı.', level: 'Advanced' },
          { id: 'tgi', title: 'TGI (Text Gen Inference)', description: 'Production-ready, yüksek performanslı model sunumu (Rust tabanlı).', level: 'Expert' }
        ]
      }
    ]
  },
  {
    id: 'cloudflare',
    title: 'Cloudflare',
    description: 'Edge network, WAF, Workers ve Serverless mimarisi.',
    icon: 'CloudflareIcon',
    themeColor: '#F38020',
    curriculum: [
        {
            id: 'fundamentals',
            title: 'Core & Networking',
            topics: [
              { id: 'dns-setup', title: 'DNS Mimarisi ve Yönetimi', description: 'NS kayıtları, DNSSEC, CNAME Flattening ve Proxy modları.', level: 'Beginner' },
              { id: 'cdn-cache', title: 'CDN ve Advanced Caching', description: 'Cache Rules, Tiered Cache, Cache Reserve ve Purge stratejileri.', level: 'Intermediate' },
              { id: 'ssl-tls', title: 'SSL/TLS ve Edge Certificates', description: 'Strict SSL, Custom Certificates, mTLS ve Keyless SSL.', level: 'Intermediate' },
              { id: 'load-balancing', title: 'Load Balancing', description: 'Global trafik dağıtımı, Health Checks ve Failover senaryoları.', level: 'Advanced' },
            ]
          },
          {
            id: 'security',
            title: 'Application Security (WAF)',
            topics: [
              { id: 'waf-rules', title: 'WAF Custom Rules', description: 'Karmaşık güvenlik duvarı kuralları ve RegEx kullanımı.', level: 'Intermediate' },
              { id: 'ddos-protection', title: 'Advanced DDoS Protection', description: 'L7 saldırı analizi, Rate Limiting kuralları.', level: 'Advanced' },
              { id: 'bot-management', title: 'Super Bot Fight Mode', description: 'Bot skorlama, Machine Learning tabanlı analiz.', level: 'Expert' },
              { id: 'turnstile', title: 'Turnstile (CAPTCHA Alternative)', description: 'Kullanıcı dostu doğrulama entegrasyonu.', level: 'Intermediate' },
              { id: 'page-shield', title: 'Page Shield', description: 'İstemci tarafı (Client-side) güvenlik ve script izleme.', level: 'Expert' },
            ]
          },
          {
            id: 'developer-platform',
            title: 'Developer Platform (Workers)',
            topics: [
              { id: 'workers-intro', title: 'Workers Temelleri', description: 'V8 Isolate yapısı, Fetch API ve Wrangler CLI.', level: 'Intermediate' },
              { id: 'workers-advanced', title: 'Advanced Workers Patterns', description: 'Service Bindings, Cron Triggers ve Modüler yapı.', level: 'Expert' },
              { id: 'durable-objects', title: 'Durable Objects & Websockets', description: 'Stateful serverless ve gerçek zamanlı uygulamalar.', level: 'Expert' },
              { id: 'workers-queues', title: 'Queues & Asynchronous Processing', description: 'Arka plan işleri ve mesaj kuyrukları.', level: 'Advanced' },
              { id: 'pages-functions', title: 'Cloudflare Pages & Functions', description: 'Full-stack Jamstack uygulamaları dağıtımı.', level: 'Intermediate' },
            ]
          },
          {
            id: 'data-storage',
            title: 'Data & Storage',
            topics: [
              { id: 'r2-storage', title: 'R2 Object Storage', description: 'S3 uyumlu depolama, presigned URLler ve eventler.', level: 'Advanced' },
              { id: 'd1-sql', title: 'D1 SQL Database', description: 'Edge SQL veritabanı, transactionlar ve Time Travel.', level: 'Expert' },
              { id: 'kv-storage', title: 'Workers KV', description: 'Düşük gecikmeli, yüksek okuma hızlı Key-Value deposu.', level: 'Intermediate' },
              { id: 'hyperdrive', title: 'Hyperdrive', description: 'Mevcut veritabanlarını global hale getirme.', level: 'Expert' },
            ]
          },
          {
            id: 'ai-ml',
            title: 'AI & Vectorize',
            topics: [
              { id: 'workers-ai', title: 'Workers AI', description: 'Edge üzerinde LLM (Llama, Mistral) çalıştırma.', level: 'Advanced' },
              { id: 'vectorize', title: 'Vectorize (Vector DB)', description: 'Embeddings saklama ve semantik arama yapma.', level: 'Expert' },
              { id: 'ai-gateway', title: 'AI Gateway', description: 'OpenAI/Anthropic proxy, caching ve loglama.', level: 'Intermediate' },
            ]
          },
          {
            id: 'zero-trust',
            title: 'Zero Trust & SASE',
            topics: [
              { id: 'ztna-access', title: 'Access & IdP Integration', description: 'Google/Okta/Azure AD ile kimlik doğrulama.', level: 'Advanced' },
              { id: 'gateway-dns', title: 'Gateway DNS & HTTP Policies', description: 'Kurumsal internet trafiği filtreleme.', level: 'Expert' },
              { id: 'cloudflared', title: 'Cloudflare Tunnel (cloudflared)', description: 'Public IP olmadan özel ağları dışarı açma.', level: 'Advanced' },
              { id: 'warp', title: 'WARP Client & Device Posture', description: 'Cihaz güvenliği kontrolü ve VPN entegrasyonu.', level: 'Expert' },
            ]
          }
    ]
  },
  {
      id: 'ai-scraping',
      title: 'Full-Stack AI Web Scraping',
      description: 'Konseptten prodüksiyona kadar büyük ölçekli veri toplama mimarisi.',
      icon: 'ScraperIcon',
      themeColor: '#E65100', // Deep Orange
      curriculum: [
          {
              id: 'scraping-arch',
              title: 'Modern Scraping Mimarisi',
              topics: [
                  { id: 'api-vs-browser', title: 'API-first vs Browser-first', description: 'Ne zaman tersine mühendislik, ne zaman headless browser kullanılmalı?', level: 'Advanced' },
                  { id: 'anti-bot-systems', title: 'Anti-Bot & Fingerprinting', description: 'TLS parmak izi, Canvas fingerprinting ve bypass teknikleri.', level: 'Expert' },
                  { id: 'multi-region-infra', title: 'Multi-Region & Proxy', description: 'Global IP rotasyonu ve veri merkezi/konut proxy yönetimi.', level: 'Advanced' }
              ]
          },
          {
              id: 'scraping-data',
              title: 'Veri Çıkarma & Pipeline',
              topics: [
                  { id: 'schema-extraction', title: 'Structured Data Extraction', description: 'HTML -> JSON-LD, schema.org ve rel=me analizi.', level: 'Intermediate' },
                  { id: 'google-maps-scraping', title: 'Google Maps & Places Strategy', description: 'Konum tabanlı veri toplama ve doğruluk optimizasyonu.', level: 'Expert' },
                  { id: 'request-pipeline', title: 'High-Scale Pipeline (500k+)', description: 'Kuyruk mimarisi, throttling, retry ve backoff stratejileri.', level: 'Expert' }
              ]
          }
      ]
  },
  {
      id: 'llm-automation',
      title: 'LLM Otomasyon Mühendisliği',
      description: 'LLM\'leri veri akışlarında hızlandırıcı ve karar verici olarak kullanmak.',
      icon: 'BotIcon',
      themeColor: '#00ACC1', // Cyan
      curriculum: [
          {
              id: 'llm-data-flow',
              title: 'Intelligent Data Flow',
              topics: [
                  { id: 'prompt-task-eng', title: 'Task-Based Prompt Engineering', description: 'Görevi yapılandırma, doğrulama ve çıktı formatlama.', level: 'Advanced' },
                  { id: 'llm-cleaning', title: 'Aggressive Data Cleaning', description: 'Şirket isimleri, adresler ve karmaşık metinlerin normalizasyonu.', level: 'Intermediate' },
                  { id: 'domain-inference', title: 'Domain & Brand Inference', description: 'Eksik veriden (sosyal hesap, web sitesi) marka tespiti.', level: 'Advanced' }
              ]
          },
          {
              id: 'llm-quality',
              title: 'Quality & Evaluation',
              topics: [
                  { id: 'hallucination-guard', title: 'Quality Gates & Guardrails', description: 'Halüsinasyon engelleme ve yapısal çıktı (JSON/XML) zorlama.', level: 'Expert' },
                  { id: 'eval-frameworks', title: 'Automated Evaluation', description: 'BLEU, BERTScore ve Self-Check mekanizmaları.', level: 'Expert' }
              ]
          }
      ]
  },
  {
      id: 'gcp-cost',
      title: 'Google Cloud Cost-Aware Arch',
      description: 'Tamamen Free Tier + low-cost optimizasyon odaklı GCP senaryoları.',
      icon: 'CloudCostIcon',
      themeColor: '#43A047', // Green
      curriculum: [
          {
              id: 'gcp-core-opt',
              title: 'Core Services Optimization',
              topics: [
                  { id: 'iam-security', title: 'IAM & Service Accounts', description: 'Minimal yetkilendirme ve güvenli erişim yönetimi.', level: 'Intermediate' },
                  { id: 'serverless-chain', title: 'Functions-Workflows-Firestore', description: 'Olay tabanlı, düşük maliyetli zincirleme mimariler.', level: 'Advanced' },
                  { id: 'cold-start', title: 'Cold-Start Optimization', description: 'Fonksiyonların ısınma stratejileri ve gecikme yönetimi.', level: 'Advanced' }
              ]
          },
          {
              id: 'gcp-cost-control',
              title: 'Billing & Data',
              topics: [
                  { id: 'billing-alert', title: 'Early-Warning Systems', description: 'Bütçe aşımlarını anlık tespit eden alarmlar.', level: 'Beginner' },
                  { id: 'maps-cost', title: 'Maps API Cost Modeling', description: 'Harita ve yer API\'lerinin maliyetini düşürme stratejileri.', level: 'Expert' },
                  { id: 'cache-first', title: 'Cache-First API Design', description: 'Redis/Memorystore kullanarak API çağrı maliyetlerini düşürme.', level: 'Expert' }
              ]
          }
      ]
  },
  {
      id: 'high-perf-python',
      title: 'High-Performance Python',
      description: 'CPU/RAM bottleneck kıran, büyük veri için optimize edilmiş mimari.',
      icon: 'SpeedIcon',
      themeColor: '#FFD600', // Yellow
      curriculum: [
          {
              id: 'python-concurrency',
              title: 'Concurrency & Parallelism',
              topics: [
                  { id: 'async-decision', title: 'AsyncIO vs Multi-processing', description: 'IO-bound vs CPU-bound işlemler için karar matrisi.', level: 'Advanced' },
                  { id: 'gpu-acceleration', title: 'GPU Acceleration (RAPIDS/CuPy)', description: 'Metin ve veri işlemeyi GPU üzerinde hızlandırma.', level: 'Expert' }
              ]
          },
          {
              id: 'python-data-opt',
              title: 'Data Optimization',
              topics: [
                  { id: 'polars-numpy', title: 'Polars & NumExpr', description: 'Pandas alternatifleri ile 10x+ hız artışı.', level: 'Advanced' },
                  { id: 'memory-mapping', title: 'Zero-Copy & Memory Mapping', description: 'RAM sınırlarını aşan büyük verilerle çalışma.', level: 'Expert' },
                  { id: 'profiling', title: 'Performance Profiling', description: 'cProfile ve line_profiler ile darboğaz analizi.', level: 'Intermediate' }
              ]
          }
      ]
  },
  {
      id: 'data-engineering',
      title: 'Data Engineering for AI',
      description: 'AI destekli veri ürünleri için modern veri mühendisliği altyapısı.',
      icon: 'DataScienceIcon', // Reusing appropriate icon
      themeColor: '#7B1FA2', // Purple
      curriculum: [
          {
              id: 'data-pipeline',
              title: 'Modern Pipelines',
              topics: [
                  { id: 'etl-elt', title: 'ETL vs ELT Architectures', description: 'Modern veri ambarı yükleme stratejileri.', level: 'Intermediate' },
                  { id: 'orchestration', title: 'Task Orchestration', description: 'Airflow veya Dagster ile karmaşık iş akışları.', level: 'Advanced' },
                  { id: 'dbt-models', title: 'dbt (Data Build Tool)', description: 'Veri transformasyonlarını ve modellerini standartlaştırma.', level: 'Advanced' }
              ]
          },
          {
              id: 'data-gov',
              title: 'Quality & Governance',
              topics: [
                  { id: 'hybrid-analytics', title: 'DuckDB + BigQuery', description: 'Lokal ve bulut analitik motorlarının hibrit kullanımı.', level: 'Expert' },
                  { id: 'data-validation', title: 'Data Quality (Great Expectations)', description: 'Otomatik veri doğrulama ve kalite kontrol.', level: 'Advanced' },
                  { id: 'lineage', title: 'Data Lineage & Governance', description: 'Verinin yolculuğunu takip etme ve uyumluluk.', level: 'Expert' }
              ]
          }
      ]
  },
  {
      id: 'global-payments',
      title: 'Global Payments & Compliance',
      description: 'Freelance, çoklu vatandaşlık ve uluslararası ödeme tasarımları.',
      icon: 'GlobalPaymentIcon',
      themeColor: '#2E7D32', // Dark Green
      curriculum: [
          {
              id: 'payment-infra',
              title: 'Ödeme Altyapıları',
              topics: [
                  { id: 'provider-comparison', title: 'Stripe vs Wise vs Revolut', description: 'Teknik yetenekler, komisyonlar ve yasal farklar.', level: 'Intermediate' },
                  { id: 'payment-flow', title: 'Money Flow Architecture', description: 'Onramp -> Settlement -> Payout döngüsü.', level: 'Advanced' },
                  { id: 'api-payments', title: 'API-Based Payment Flows', description: 'Ödeme akışlarının kod ile yönetimi.', level: 'Advanced' }
              ]
          },
          {
              id: 'compliance',
              title: 'Risk & Compliance',
              topics: [
                  { id: 'kyc-aml', title: 'KYC/AML & MASAK/EU', description: 'Kara para aklama önleme ve kimlik doğrulama standartları.', level: 'Expert' },
                  { id: 'kyb-risk', title: 'KYB (Know Your Business)', description: 'İşletme doğrulama ve risk skorlama mantığı.', level: 'Expert' },
                  { id: 'fraud-detection', title: 'Fraud Detection Basics', description: 'Şüpheli işlemleri tespit etme temelleri.', level: 'Advanced' }
              ]
          }
      ]
  },
  {
      id: 'b2b-ai-sales',
      title: 'AI-Driven B2B Sales',
      description: 'Kurumsal müşteri tarafında güven, ROI ve teknik yeterlilik oluşturma.',
      icon: 'B2BSalesIcon',
      themeColor: '#FBC02D', // Gold
      curriculum: [
          {
              id: 'value-prop',
              title: 'Value Proposition',
              topics: [
                  { id: 'b2b-needs', title: 'B2B İhtiyaç Haritalama', description: 'Kurumsal acı noktalarını (pain points) teknik çözüme çevirme.', level: 'Intermediate' },
                  { id: 'ai-canvas', title: 'AI Değer Önerisi Kanvası', description: 'Yapay zeka projeleri için özel iş modeli tasarımı.', level: 'Advanced' },
                  { id: 'roi-calc', title: 'ROI Hesaplama', description: 'Tasarruf, hız ve doğruluk metriklerinin finansallaştırılması.', level: 'Expert' }
              ]
          },
          {
              id: 'enterprise-trust',
              title: 'Trust & Documentation',
              topics: [
                  { id: 'exec-pres', title: 'Executive-Level Sunum', description: 'Teknik detaya boğulmadan C-Level ikna dili.', level: 'Advanced' },
                  { id: 'case-studies', title: 'Technical Case Studies', description: 'Başarı hikayelerinin teknik dokümantasyonu.', level: 'Intermediate' },
                  { id: 'risk-mgmt-sales', title: 'Risk Yönetimi & Şeffaflık', description: 'Kurumsal güven inşası için risklerin açıkça yönetimi.', level: 'Expert' }
              ]
          }
      ]
  },
  {
      id: 'api-productization',
      title: 'API Productization',
      description: 'Veriyi veya otomasyon akışlarını satılabilir API ürününe dönüştürme.',
      icon: 'ApiProductIcon',
      themeColor: '#3949AB', // Indigo
      curriculum: [
          {
              id: 'api-business',
              title: 'Monetization Models',
              topics: [
                  { id: 'usage-pricing', title: 'Usage-Based Pricing', description: 'Kullanıma dayalı fiyatlandırma modelleri.', level: 'Advanced' },
                  { id: 'metering-billing', title: 'Metering & Billing Hooks', description: 'API kullanımını ölçme ve faturalandırma entegrasyonu.', level: 'Expert' },
                  { id: 'tiering-limits', title: 'Rate Limits & Quotas', description: 'Farklı paketler için limit yönetimi stratejileri.', level: 'Intermediate' }
              ]
          },
          {
              id: 'api-tech',
              title: 'Technical Implementation',
              topics: [
                  { id: 'api-auth', title: 'Authentication (OAuth2/JWT)', description: 'Güvenli API erişimi ve anahtar yönetimi.', level: 'Advanced' },
                  { id: 'dx-design', title: 'Developer Experience (DX)', description: 'SDK, dokümantasyon ve sandbox tasarımı.', level: 'Advanced' },
                  { id: 'sla-incident', title: 'SLA & Incident Management', description: 'Hizmet seviyesi taahhütleri ve kesinti yönetimi.', level: 'Expert' }
              ]
          }
      ]
  },
  {
      id: 'behavioral-ai',
      title: 'Behavioural AI',
      description: 'Psikoloji + veri + AI içgörüsüyle karar sistemleri tasarlamak.',
      icon: 'BrainIcon',
      themeColor: '#D81B60', // Pink
      curriculum: [
          {
              id: 'behavioral-science',
              title: 'Decision Science',
              topics: [
                  { id: 'cognitive-bias', title: 'Bilişsel Önyargılar', description: 'Karar akışlarına önyargı yönetimi entegrasyonu.', level: 'Intermediate' },
                  { id: 'nudging', title: 'Nudging Mekanizmaları', description: 'Varsayılanlar, sınırlı seçenekler ve yönlendirme.', level: 'Advanced' },
                  { id: 'friction-modeling', title: 'Behavioural Scoring', description: 'Kullanıcı sürtünme noktalarının modellenmesi.', level: 'Advanced' }
              ]
          },
          {
              id: 'decision-arch',
              title: 'Architecture',
              topics: [
                  { id: 'bottleneck-opp', title: 'Decision Bottlenecks', description: 'Karar darboğazlarını otomasyon fırsatına çevirme.', level: 'Expert' },
                  { id: 'hybrid-decision', title: 'Human + AI Models', description: 'İnsan ve yapay zeka ortak karar mekanizmaları.', level: 'Expert' },
                  { id: 'ent-design', title: 'Enterprise Behaviour Design', description: 'Kurumsal davranış tasarımı.', level: 'Expert' }
              ]
          }
      ]
  },
  {
      id: 'info-theory',
      title: 'Information Theory & AI',
      description: 'Shannon + normal dağılım + Fourier’in gerçek data projelerine uygulanması.',
      icon: 'MathIcon',
      themeColor: '#00897B', // Teal
      curriculum: [
          {
              id: 'theory-foundations',
              title: 'Theoretical Foundations',
              topics: [
                  { id: 'shannon-entropy', title: 'Entropy & Mutual Information', description: 'Web arama sonuçlarının güvenilirlik ve bilgi değeri ölçümü.', level: 'Advanced' },
                  { id: 'normal-dist', title: 'Normal Distribution Applications', description: 'İstatistiksel anomali tespiti.', level: 'Intermediate' },
                  { id: 'logistic-map', title: 'Logistic Map & Chaos', description: 'Kaotik veri davranışlarının analizi.', level: 'Expert' }
              ]
          },
          {
              id: 'applied-math',
              title: 'Applied Computation',
              topics: [
                  { id: 'fourier-transform', title: 'Fourier Transform', description: 'Gürültü/sinyal ayrımı ve scraping hatalarını temizleme.', level: 'Expert' },
                  { id: 'comm-efficiency', title: 'Communication Efficiency', description: 'Shannon limiti ve API throughput optimizasyonu.', level: 'Expert' },
                  { id: 'model-uncertainty', title: 'Model Uncertainty', description: 'AI modellerinin belirsizlik ölçümü.', level: 'Advanced' }
              ]
          }
      ]
  },
  {
      id: 'personal-agents',
      title: 'Personal AI Agents',
      description: 'Senin tarzına uygun kişisel ajanlar ile otomasyon orkestrasyonu.',
      icon: 'AgentIcon',
      themeColor: '#5E35B1', // Deep Purple
      curriculum: [
          {
              id: 'agent-patterns',
              title: 'Agent Architectures',
              topics: [
                  { id: 'multi-agent', title: 'Multi-Agent Patterns', description: 'Planner -> Worker -> Reviewer mimarisi.', level: 'Advanced' },
                  { id: 'self-healing', title: 'Self-Healing Pipelines', description: 'Hata durumunda kendini düzelten ajanlar.', level: 'Expert' },
                  { id: 'hybrid-agents', title: 'Decision Agents', description: 'Kural tabanlı ve LLM hibrit mimariler.', level: 'Advanced' }
              ]
          },
          {
              id: 'agent-impl',
              title: 'Implementation',
              topics: [
                  { id: 'data-cleaner-agent', title: 'Data Cleaner Agent', description: 'Yapısal veri çıkarma ve doğrulama ajanı.', level: 'Intermediate' },
                  { id: 'pipeline-agent', title: 'Web -> DB Pipeline Agent', description: 'Uçtan uca veri taşıma ajanı.', level: 'Advanced' },
                  { id: 'tool-use', title: 'Tool-Use Frameworks', description: 'Arama, tarama, çalıştırma ve doğrulama araçları.', level: 'Expert' }
              ]
          }
      ]
  },
  {
      id: 'consultant-branding',
      title: 'AI Consultant Branding',
      description: 'Yüksek değerli danışman profili oluşturma ve pazar konumlaması.',
      icon: 'BrandIcon',
      themeColor: '#C2185B', // Magenta
      curriculum: [
          {
              id: 'positioning',
              title: 'Strategic Positioning',
              topics: [
                  { id: 'value-prop-brand', title: 'Tek Cümle Değer Önerisi', description: 'Karmaşık yetenekleri net bir faydaya indirgeme.', level: 'Intermediate' },
                  { id: 'market-position', title: 'Güvenli & Teknik Konumlanma', description: '"Expert" algısı oluşturma stratejileri.', level: 'Advanced' },
                  { id: 'portfolio-arch', title: 'Portfolio Architecture', description: 'Güvenilirlik kanıtı (credibility assets) oluşturma.', level: 'Advanced' }
              ]
          },
          {
              id: 'content-sys',
              title: 'Content System',
              topics: [
                  { id: 'linkedin-sys', title: 'LinkedIn Content System', description: 'Sürdürülebilir, AI destekli içerik üretimi.', level: 'Intermediate' },
                  { id: 'medium-auth', title: 'Medium Authority', description: 'Uzun format yazılarla uzmanlık alanı inşası.', level: 'Advanced' },
                  { id: 'visual-identity', title: 'Brand Language & Identity', description: 'Marka dili, tonu ve görsel kimliği.', level: 'Intermediate' }
              ]
          }
      ]
  },
  {
      id: 'ai-strategy',
      title: 'AI & Kurumsal Strateji',
      description: 'B2B müşteriler için değer üretimi, ROI analizi ve stratejik dönüşüm.',
      icon: 'StrategyIcon',
      themeColor: '#8E44AD',
      curriculum: [
          {
              id: 'strat-business',
              title: 'İş Değeri & ROI',
              topics: [
                  { id: 'ai-value-creation', title: 'Yapay Zeka ile Değer Yaratımı', description: 'Teknolojiden iş sonuçlarına geçiş stratejileri.', level: 'Advanced' },
                  { id: 'ai-cost-benefit', title: 'Maliyet/Fayda Analizi (ROI)', description: 'AI yatırımlarının geri dönüşünü hesaplama ve ölçme.', level: 'Expert' }
              ]
          },
          {
              id: 'strat-decision',
              title: 'Karar Alma & Liderlik',
              topics: [
                  { id: 'data-driven-decision', title: 'Veri Odaklı Karar Alma', description: 'Sezgisel yönetimden analitik yönetime geçiş.', level: 'Intermediate' },
                  { id: 'ai-adoption', title: 'Kurumsal AI Adaptasyonu', description: 'Kültürel direnç ve değişim yönetimi.', level: 'Expert' }
              ]
          }
      ]
  },
  {
      id: 'ai-engineering',
      title: 'Yapay Zekâ Mühendisliği',
      description: 'Lojistikten finansa, farklı sektörler için uygulamalı mühendislik çözümleri.',
      icon: 'EngineeringIcon',
      themeColor: '#1ABC9C',
      curriculum: [
          {
              id: 'eng-architecture',
              title: 'AI Sistem Mimarisi',
              topics: [
                  { id: 'scalable-ai', title: 'Ölçeklenebilir AI Mimarileri', description: 'Milyonlarca isteği karşılayabilen sistem tasarımı.', level: 'Advanced' },
                  { id: 'clean-code-ai', title: 'AI için Temiz Kod & Refactoring', description: 'Sürdürülebilir model geliştirme pratikleri.', level: 'Intermediate' }
              ]
          },
          {
              id: 'eng-industry',
              title: 'Sektörel Uygulamalar',
              topics: [
                  { id: 'predictive-maintenance', title: 'Kestirimci Bakım (Lojistik/Üretim)', description: 'IoT verileriyle arıza tahmini modelleri.', level: 'Expert' },
                  { id: 'fintech-fraud', title: 'FinTech & Fraud Detection', description: 'Gerçek zamanlı dolandırıcılık tespit sistemleri.', level: 'Expert' }
              ]
          }
      ]
  },
  {
      id: 'gen-ai-llm',
      title: 'Generative AI & LLMs',
      description: 'Büyük Dil Modelleri, Prompt Engineering ve Modern RAG Mimarileri.',
      icon: 'GenAIIcon',
      themeColor: '#FF0080',
      curriculum: [
          {
              id: 'llm-foundations',
              title: 'LLM Temelleri',
              topics: [
                  { id: 'transformer-arch', title: 'Transformer Mimarisi', description: 'Attention mekanizması ve model iç yapıları.', level: 'Advanced' },
                  { id: 'prompt-engineering', title: 'Advanced Prompt Engineering', description: 'Chain-of-Thought, ReAct ve Few-Shot teknikleri.', level: 'Intermediate' }
              ]
          },
          {
              id: 'llm-advanced',
              title: 'İleri Seviye Uygulamalar',
              topics: [
                  { id: 'rag-architecture', title: 'RAG (Retrieval Augmented Generation)', description: 'Vektör veritabanları ile kurumsal bilgi entegrasyonu.', level: 'Expert' },
                  { id: 'llm-agents', title: 'Autonomous Agents & Tools', description: 'LangChain ve AutoGPT ile otonom ajanlar.', level: 'Expert' }
              ]
          }
      ]
  },
  {
      id: 'ai-ethics',
      title: 'Etik & Güvenlik',
      description: 'Güvenilir AI, Regülasyon Uyumluluğu (Compliance) ve Güvenlik.',
      icon: 'EthicsIcon',
      themeColor: '#E74C3C',
      curriculum: [
          {
              id: 'ethics-trust',
              title: 'Güven & Şeffaflık',
              topics: [
                  { id: 'explainable-ai', title: 'XAI (Açıklanabilir Yapay Zeka)', description: 'Model kararlarının şeffaflığı ve SHAP analizi.', level: 'Advanced' },
                  { id: 'bias-fairness', title: 'Algoritmik Önyargı ve Adalet', description: 'Veri setlerindeki bias tespiti ve giderme.', level: 'Intermediate' }
              ]
          },
          {
              id: 'ethics-security',
              title: 'Güvenlik & Regülasyon',
              topics: [
                  { id: 'ai-security', title: 'Adversarial Attacks & Security', description: 'Prompt Injection ve Data Poisoning saldırıları.', level: 'Expert' },
                  { id: 'ai-compliance', title: 'EU AI Act & GDPR Compliance', description: 'Yasal düzenlemelere uyumlu AI geliştirme.', level: 'Advanced' }
              ]
          }
      ]
  },
  {
      id: 'ml-ops',
      title: 'Uygulamalı DS & MLOps',
      description: 'Model dağıtımı, ML Pipeline yönetimi ve üretim ortamı (Production).',
      icon: 'PipelineIcon',
      themeColor: '#3498DB',
      curriculum: [
          {
              id: 'mlops-foundation',
              title: 'MLOps Temelleri',
              topics: [
                  { id: 'model-tracking', title: 'Experiment Tracking (MLflow)', description: 'Model versiyonlama ve deney takibi.', level: 'Intermediate' },
                  { id: 'cicd-ml', title: 'CI/CD for Machine Learning', description: 'Otomatik test ve dağıtım boru hatları.', level: 'Advanced' }
              ]
          },
          {
              id: 'mlops-prod',
              title: 'Production & Serving',
              topics: [
                  { id: 'model-serving', title: 'Model Serving Architectures', description: 'TensorFlow Serving, TorchServe ve ONNX.', level: 'Expert' },
                  { id: 'data-validation', title: 'Data Validation & Drift Detection', description: 'Veri kalitesi ve model başarım takibi.', level: 'Expert' }
              ]
          }
      ]
  },
  {
      id: 'typescript',
      title: 'TypeScript',
      description: 'Tip güvenli JavaScript, Generics ve İleri Seviye Kalıplar.',
      icon: 'TypeScriptIcon',
      themeColor: '#3178C6',
      curriculum: [
          {
              id: 'ts-foundations',
              title: 'TypeScript Temelleri',
              topics: [
                  { id: 'ts-types', title: 'Gelişmiş Tip Sistemi', description: 'Interface vs Type, Union, Intersection ve Enums.', level: 'Beginner' },
                  { id: 'ts-functions', title: 'Fonksiyonlar ve Overloading', description: 'Tip güvenli fonksiyonlar ve imza aşırı yükleme.', level: 'Intermediate' }
              ]
          },
          {
              id: 'ts-advanced',
              title: 'Advanced Types',
              topics: [
                  { id: 'ts-generics', title: 'Generics & Constraints', description: 'Yeniden kullanılabilir kod blokları ve kısıtlamalar.', level: 'Advanced' },
                  { id: 'ts-utility', title: 'Utility Types', description: 'Partial, Pick, Omit, Record ve kendi utility tipleriniz.', level: 'Expert' },
                  { id: 'ts-guards', title: 'Type Guards & Narrowing', description: 'Çalışma zamanı tip kontrolleri ve güvenli daraltma.', level: 'Expert' }
              ]
          }
      ]
  },
  {
      id: 'datascience',
      title: 'Data Science',
      description: 'Python, Pandas, Veri Analizi ve Modelleme.',
      icon: 'DataScienceIcon',
      themeColor: '#4CAF50',
      curriculum: [
          {
              id: 'ds-python',
              title: 'Python for Data',
              topics: [
                  { id: 'ds-numpy', title: 'NumPy & Vectorization', description: 'Yüksek performanslı sayısal hesaplama ve diziler.', level: 'Intermediate' },
                  { id: 'ds-pandas', title: 'Pandas ile Veri Manipülasyonu', description: 'DataFrame, Series, GroupBy ve Merge işlemleri.', level: 'Advanced' }
              ]
          },
          {
              id: 'ds-ml',
              title: 'Machine Learning',
              topics: [
                  { id: 'ds-scikit', title: 'Scikit-Learn Giriş', description: 'Model eğitimi, fit/predict yapısı ve pipeline.', level: 'Beginner' },
                  { id: 'ds-eda', title: 'Exploratory Data Analysis (EDA)', description: 'Veriyi anlama, görselleştirme (Matplotlib/Seaborn).', level: 'Intermediate' }
              ]
          }
      ]
  },
  {
      id: 'search-engine',
      title: 'Search Engine',
      description: 'Full-text Search, Indexing ve Elasticsearch Mimarisi.',
      icon: 'SearchIcon',
      themeColor: '#FFD700',
      curriculum: [
          {
              id: 'se-basics',
              title: 'Arama Temelleri',
              topics: [
                  { id: 'se-inverted', title: 'Inverted Index Nedir?', description: 'Arama motorlarının kalbi: Tersine indeksleme.', level: 'Beginner' },
                  { id: 'se-tfidf', title: 'TF-IDF & BM25', description: 'Kelime ağırlıklandırma ve alaka düzeyi algoritmaları.', level: 'Advanced' }
              ]
          },
          {
              id: 'se-arch',
              title: 'Modern Arama Mimarisi',
              topics: [
                  { id: 'se-vector', title: 'Vector Search & Embeddings', description: 'Semantik arama ve KNN algoritmaları.', level: 'Expert' },
                  { id: 'se-shard', title: 'Sharding & Replication', description: 'Büyük ölçekli veri dağıtımı ve yüksek erişilebilirlik.', level: 'Expert' }
              ]
          }
      ]
  },
  {
      id: 'recsys',
      title: 'Tavsiye Motoru',
      description: 'Kişiselleştirme algoritmaları ve Matrix Factorization.',
      icon: 'RecommendationIcon',
      themeColor: '#E91E63',
      curriculum: [
          {
              id: 'rec-basics',
              title: 'Filtreleme Yöntemleri',
              topics: [
                  { id: 'rec-collab', title: 'Collaborative Filtering', description: 'User-User ve Item-Item tabanlı öneriler.', level: 'Intermediate' },
                  { id: 'rec-content', title: 'Content-Based Filtering', description: 'İçerik benzerliğine dayalı öneri sistemleri.', level: 'Intermediate' }
              ]
          },
          {
              id: 'rec-advanced',
              title: 'İleri Seviye Algoritmalar',
              topics: [
                  { id: 'rec-matrix', title: 'Matrix Factorization (SVD)', description: 'Boyut indirgeme ve gizli öznitelik çıkarma.', level: 'Expert' },
                  { id: 'rec-hybrid', title: 'Hybrid Recommender Systems', description: 'Farklı yöntemleri birleştirerek başarıyı artırma.', level: 'Expert' }
              ]
          }
      ]
  }
];

// Pre-baked static content for instant loading (Simulated Cache)
export const STATIC_TUTORIALS: Record<string, GeneratedContent> = {
  // --- CLOUDFLARE ---
  'dns-setup': {
    title: "DNS Mimarisi ve Yönetimi",
    content: `
# Cloudflare DNS Mimarisi

Cloudflare, dünyanın en hızlı ve en güvenilir yönetilen DNS hizmetlerinden birini sunar. Geleneksel DNS'in aksine, Cloudflare bir "Reverse Proxy" olarak çalışır.

### Yönetici Özeti
DNS (Domain Name System), internetin telefon rehberidir. Cloudflare DNS, sitenizin IP adresini gizleyerek (Masking) hem hız hem de güvenlik (DDoS koruması) sağlar.

## Nasıl Çalışır? (Teknik Detay)

Cloudflare DNS iki modda çalışır:
1.  **DNS-Only (Gri Bulut):** Cloudflare sadece DNS çözümler. Trafik doğrudan sunucunuza gider. Koruma veya CDN yok.
2.  **Proxied (Turuncu Bulut):** Trafik Cloudflare Edge sunucularına yönlendirilir. WAF, CDN ve SSL burada devreye girer.

\`\`\`bash
# Örnek bir Dig sorgusu
dig +short site.com
# Proxied IP'ler döner (Cloudflare IP'leri)
104.21.x.x
172.67.x.x
\`\`\`

## CNAME Flattening

Normalde bir Root domain (ornek.com), CNAME kaydı olamaz (RFC standartları gereği). Cloudflare, **CNAME Flattening** teknolojisi ile Root domaininize bir CNAME eklemenize izin verir ve bunu arka planda A kayıtlarına "düzleştirir" (flatten).
    `,
    relatedTopics: ["CNAME Flattening vs Partial Setup", "DNSSEC Konfigürasyonu", "Secondary DNS nedir?"]
  },
  'cdn-cache': {
    title: "CDN ve Advanced Caching",
    content: `
# CDN ve Önbellekleme Stratejileri

Cloudflare'in kalbi, global Anycast ağıdır. İçeriğinizi statik olarak kenar (Edge) sunucularda tutarak kaynak sunucu yükünü azaltır.

## Cache Rules (Cache Kuralları)

Page Rules artık "Legacy" kabul edilmektedir. Modern yaklaşım **Cache Rules** kullanmaktır.

### Yapılandırma Örneği
Eğer dinamik bir API'niz varsa ama yanıtlar sık değişmiyorsa:

1.  **Field:** \`Hostname\` eq \`api.mysite.com\` AND \`URL Path\` starts with \`/public/v1\`
2.  **Cache Eligibility:** Eligible for cache
3.  **Edge TTL:** Ignore origin cache control, Override to 1 Hour.

## Tiered Cache ve Cache Reserve

*   **Tiered Cache:** Cloudflare veri merkezleri arasında bir hiyerarşi oluşturur. İstek, kaynak sunucuya gitmeden önce üst katman (Upper Tier) veri merkezlerine sorulur.
*   **Cache Reserve:** İçeriğinizi R2 (Object Storage) üzerinde süresiz olarak saklar. "Long-tail" (seyrek erişilen) içerikler için cache'den silinmeyi (eviction) engeller.
    `,
    relatedTopics: ["Cache-Control Headers", "Purge by Tag", "Origin Cache Control"]
  },
  'ssl-tls': {
    title: "SSL/TLS ve Edge Certificates",
    content: `# SSL/TLS ve Edge Sertifikaları\n\nCloudflare trafiği şifrelemek için esnek SSL seçenekleri sunar. Yanlış yapılandırma "Redirect Loop" hatalarına neden olabilir.\n\n## SSL Modları\n1. **Off:** Önerilmez.\n2. **Flexible:** Ziyaretçi <-> Cloudflare şifreli, Cloudflare <-> Sunucu şifresiz.\n3. **Full (Strict):** **Önerilen.** Uçtan uca şifreleme.\n\n## Edge Certificates\nCloudflare otomatik sertifika üretir. Ayrıca **Keyless SSL** gibi kurumsal çözümler sunar.`,
    relatedTopics: ["HSTS", "TLS 1.3", "Mutual TLS"]
  },
  'load-balancing': {
      title: "Load Balancing",
      content: `# Cloudflare Load Balancer\n\nTrafiği birden fazla sunucu veya veri merkezi arasında dağıtır.\n\n## Algoritmalar\n* **Geo-steering:** En yakın sunucuya yönlendirme.\n* **Least Connections:** En az yükü olana gönderme.\n* **Random:** Rastgele dağıtım.\n\n> **Pro Tip:** Health Check'ler ile sunucunun gerçekten 200 OK verip vermediğini kontrol edin.`,
      relatedTopics: ["Geo-steering", "Health Checks", "Failover"]
  },
  'waf-rules': {
      title: "WAF Custom Rules",
      content: `# Web Application Firewall (WAF)\n\nKatman 7 saldırılarını engeller.\n\n## Kural Örneği\n\`\`\`text\n(http.request.uri.path contains "/admin") and (ip.geoip.country ne "TR")\nAction: Block\n\`\`\`\n\nBu kural, Türkiye dışından admin paneline erişimi engeller.`,
      relatedTopics: ["Managed Rules", "Firewall Events", "Rate Limiting"]
  },
  'ddos-protection': {
    title: "Advanced DDoS Protection",
    content: `# DDoS Koruması\n\nCloudflare, L3, L4 ve L7 katmanlarında koruma sağlar.\n\n## L7 (Uygulama Katmanı)\nHTTP Flood saldırıları, gerçek kullanıcı trafiğine çok benzer. Cloudflare **Machine Learning** ile bunları ayırt eder.`,
    relatedTopics: ["L7 Attacks", "Rate Limiting", "Spectrum"]
  },
  'bot-management': {
      title: "Super Bot Fight Mode",
      content: `# Bot Yönetimi\n\nİnternet trafiğinin büyük kısmı botlardır.\n\n## Bot Score\nCloudflare her isteğe 1-99 arası bir skor verir. 1 kesinlikle bot, 99 kesinlikle insandır. Skora göre aksiyon alabilirsiniz.`,
      relatedTopics: ["Bot Score", "Verified Bots", "JS Challenge"]
  },
  'turnstile': {
      title: "Turnstile (Smart CAPTCHA)",
      content: `# Turnstile\n\nKullanıcıları trafik lambası seçmeye zorlamayan akıllı doğrulama.\n\n\`\`\`html\n<div class="cf-turnstile" data-sitekey="KEY"></div>\n\`\`\`\n\nGizlilik odaklıdır ve çerez (cookie) kullanmadan çalışabilir.`,
      relatedTopics: ["Invisible Challenge", "Privacy Pass", "Captcha Alternatives"]
  },
  'page-shield': {
      title: "Page Shield",
      content: `# Page Shield\n\nKullanıcının tarayıcısında çalışan 3. parti scriptleri izler. Magecart saldırılarını (kredi kartı çalma) tespit etmek için kullanılır.`,
      relatedTopics: ["Magecart", "CSP", "Script Monitor"]
  },
  'workers-intro': {
      title: "Workers Temelleri",
      content: `# Cloudflare Workers\n\nV8 Isolate tabanlı serverless platform.\n\n\`\`\`javascript\nexport default {\n  async fetch(request) {\n    return new Response("Hello World");\n  }\n}\n\`\`\`\n\nCold start süresi 0ms'dir.`,
      relatedTopics: ["V8 Isolates", "Wrangler", "Edge Computing"]
  },
  'workers-advanced': {
      title: "Advanced Workers",
      content: `# Service Bindings\n\nWorker'ların birbirini HTTP gecikmesi olmadan çağırmasını sağlar. Mikroservis mimarisi için idealdir.`,
      relatedTopics: ["Service Bindings", "Cron Triggers", "Durable Objects"]
  },
  'durable-objects': {
      title: "Durable Objects",
      content: `# Durable Objects\n\nWorkers'a durum (State) kazandırır. Tutarlılık (Consistency) garantisi verir. WebSocket sunucuları için mükemmeldir.`,
      relatedTopics: ["WebSockets", "Stateful Serverless", "Consistency"]
  },
  'workers-queues': {
      title: "Queues",
      content: `# Workers Queues\n\nAsenkron mesaj kuyruğu. Ağır işlemleri (mail atma, veritabanı yazma) arka plana atarak API yanıt süresini düşürür.`,
      relatedTopics: ["Async Processing", "Batching", "Producer-Consumer"]
  },
  'pages-functions': {
      title: "Pages Functions",
      content: `# Pages Functions\n\nStatik sitelerinizin içine \`/functions\` klasörü koyarak full-stack uygulama geliştirin. Otomatik deploy edilir.`,
      relatedTopics: ["Jamstack", "Server Side Rendering", "Git Integration"]
  },
  'r2-storage': {
      title: "R2 Object Storage",
      content: `# R2 Storage\n\nAWS S3 uyumlu, **Egress ücreti olmayan** depolama.\n\n\`\`\`javascript\nawait env.BUCKET.put("key", "value");\n\`\`\`\n\nBandwidth ücreti ödemeden dilediğiniz kadar veri indirin.`,
      relatedTopics: ["S3 API", "Zero Egress", "Presigned URL"]
  },
  'd1-sql': {
      title: "D1 SQL Database",
      content: `# D1 Database\n\nEdge üzerinde çalışan, global SQLite veritabanı.\n\n* Worker'lardan doğrudan SQL sorgusu atılabilir.\n* Time Travel özelliği ile veritabanını geçmişe döndürebilirsiniz.`,
      relatedTopics: ["SQLite", "Edge SQL", "Time Travel"]
  },
  'kv-storage': {
      title: "Workers KV",
      content: `# Workers KV\n\nKey-Value deposu. Yazma yavaş (sn), okuma çok hızlıdır (ms). Konfigürasyon ve önbellek için idealdir.`,
      relatedTopics: ["Eventual Consistency", "Edge Cache", "Global Store"]
  },
  'hyperdrive': {
      title: "Hyperdrive",
      content: `# Hyperdrive\n\nMevcut PostgreSQL veritabanlarınızı global hale getiren bağlantı havuzu. Sorguları önbellekleyerek veritabanı erişimini hızlandırır.`,
      relatedTopics: ["PostgreSQL", "Connection Pooling", "Database Latency"]
  },
  'workers-ai': {
      title: "Workers AI",
      content: `# Workers AI\n\nTek satır kodla Llama, Stable Diffusion gibi modelleri çalıştırın.\n\n\`\`\`javascript\nconst response = await ai.run('@cf/meta/llama-3', { prompt: 'Hello' });\n\`\`\`\n\nGPU yönetimi gerekmez.`,
      relatedTopics: ["Inference", "LLM", "Generative AI"]
  },
  'vectorize': {
      title: "Vectorize",
      content: `# Vectorize\n\nVektör veritabanı. Semantik arama ve RAG (Retrieval Augmented Generation) uygulamaları için kullanılır.`,
      relatedTopics: ["Vector Search", "Embeddings", "RAG"]
  },
  'ai-gateway': {
      title: "AI Gateway",
      content: `# AI Gateway\n\nYapay zeka API'lerinizi (OpenAI, Anthropic) yönetin. Cache, Rate Limit ve Loglama özellikleri sunar.`,
      relatedTopics: ["AI Proxy", "Prompt Caching", "Cost Control"]
  },
  'stream': {
      title: "Cloudflare Stream",
      content: `# Stream\n\nServerless video platformu. Yükleme, kodlama ve oynatma tek pakette. Adaptive Bitrate (ABR) destekler.`,
      relatedTopics: ["Video Hosting", "HLS/DASH", "Signed URLs"]
  },
  'images': {
      title: "Cloudflare Images",
      content: `# Images\n\nGörsel depolama ve optimizasyon. Tek bir görsel yükleyip URL parametreleri ile boyutlandırabilirsiniz.`,
      relatedTopics: ["Image Resizing", "WebP/AVIF", "BlurHash"]
  },
  'ztna-access': {
      title: "Access (ZTNA)",
      content: `# Cloudflare Access\n\nVPN yerine geçen Zero Trust erişimi. Google, Okta, Azure AD ile entegre çalışır.`,
      relatedTopics: ["Zero Trust", "VPN Replacement", "IdP"]
  },
  'gateway-dns': {
      title: "Gateway DNS",
      content: `# Gateway\n\nKurumsal internet trafiğini filtreler. Zararlı siteleri engeller ve veri sızıntısını önler (DLP).`,
      relatedTopics: ["DNS Filtering", "Secure Web Gateway", "DLP"]
  },
  'cloudflared': {
      title: "Cloudflare Tunnel",
      content: `# Cloudflare Tunnel\n\nPort açmadan iç ağdaki sunucuları dışarı açar. Güvenlik duvarında Inbound kuralı gerekmez.`,
      relatedTopics: ["Tunneling", "No Port Forwarding", "Private Network"]
  },
  'warp': {
      title: "WARP Client",
      content: `# WARP\n\nSon kullanıcı VPN uygulaması. Cihaz güvenliğini (Posture Check) kontrol eder.`,
      relatedTopics: ["Device Posture", "VPN Client", "Split Tunnel"]
  },
  'terraform': {
      title: "Terraform",
      content: `# Terraform & IaC\n\nCloudflare altyapısını kod olarak yönetin (Infrastructure as Code). Değişiklikleri versiyonlayın.`,
      relatedTopics: ["IaC", "HCL", "GitOps"]
  },
  'api-management': {
      title: "API Management",
      content: `# Cloudflare API\n\nHer işlemi API ile otomatize edebilirsiniz. Global API Key yerine kısıtlı **API Token** kullanın.`,
      relatedTopics: ["API Tokens", "Automation", "Rate Limits"]
  },
};