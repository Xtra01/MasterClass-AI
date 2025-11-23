
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
    completed: "TAMAMLANDI",
    complete: "TAMAMLA",
    selectKey: "API Anahtarı Seç",
    assistantTitle: "AI Asistanı",
    askPlaceholder: "Bir soru sorun...",
    quoteSelection: "+ Seçimi Alıntıla",
    tip: "İpucu: Müfredat kategorilerinin yanındaki sihirli değneğe tıklayarak eksik konuları tamamlayabilirsiniz.",
    error: "Hata",
    success: "Başarılı",
    info: "Bilgi"
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
    completed: "COMPLETED",
    complete: "COMPLETE",
    selectKey: "Select API Key",
    assistantTitle: "AI Assistant",
    askPlaceholder: "Ask a question...",
    quoteSelection: "+ Quote Selection",
    tip: "Tip: Click the magic wand icon next to curriculum categories to find and add missing topics.",
    error: "Error",
    success: "Success",
    info: "Info"
  }
};

// Simple dictionary to translate IDs to English titles (Simulated for brevity)
// In a real app, you might have separate full objects or a translation backend.
export const COURSE_TRANSLATIONS: Record<string, { tr: { title: string, desc: string }, en: { title: string, desc: string } }> = {
    // Cloudflare
    'cloudflare': { tr: { title: 'Cloudflare', desc: 'Edge network, WAF, Workers ve Serverless.' }, en: { title: 'Cloudflare', desc: 'Edge network, WAF, Workers and Serverless.' } },
    'fundamentals': { tr: { title: 'Core & Networking', desc: '' }, en: { title: 'Core & Networking', desc: '' } },
    'dns-setup': { tr: { title: 'DNS Mimarisi ve Yönetimi', desc: 'NS kayıtları, DNSSEC.' }, en: { title: 'DNS Architecture', desc: 'NS records, DNSSEC, CNAME Flattening.' } },
    'cdn-cache': { tr: { title: 'CDN ve Advanced Caching', desc: 'Cache kuralları.' }, en: { title: 'CDN & Advanced Caching', desc: 'Cache rules, Tiered Cache.' } },
    'ssl-tls': { tr: { title: 'SSL/TLS ve Edge Certificates', desc: 'SSL modları.' }, en: { title: 'SSL/TLS & Certificates', desc: 'SSL modes, Edge Certificates.' } },
    'load-balancing': { tr: { title: 'Load Balancing', desc: 'Global trafik.' }, en: { title: 'Load Balancing', desc: 'Global traffic distribution.' } },
    
    // Default fallback logic handles the rest or uses the ID as title if missing
};


export const COURSES: Course[] = [
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
            id: 'media',
            title: 'Media Services',
            topics: [
              { id: 'stream', title: 'Cloudflare Stream', description: 'Serverless video hosting ve adaptif bitrate streaming.', level: 'Advanced' },
              { id: 'images', title: 'Cloudflare Images', description: 'Görsel optimizasyonu, boyutlandırma ve depolama.', level: 'Intermediate' },
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
          },
          {
            id: 'automation',
            title: 'Automation & IaC',
            topics: [
              { id: 'terraform', title: 'Terraform ile Cloudflare', description: 'Altyapıyı kod olarak yönetme (IaC).', level: 'Expert' },
              { id: 'api-management', title: 'Cloudflare API', description: 'API token yönetimi ve otomasyon scriptleri.', level: 'Advanced' },
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
      title: "Cloudflared Tunnel",
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
