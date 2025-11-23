# MasterClass AI - Comprehensive Curriculum Report

This document outlines the complete syllabus for the Universal AI MasterClass Platform.

## 1. Cloudflare
**Description:** Edge network, WAF, Workers ve Serverless mimarisi.
**Level:** Expert

### Core & Networking
- **DNS Mimarisi ve Yönetimi** (Beginner): NS kayıtları, DNSSEC, CNAME Flattening ve Proxy modları.
- **CDN ve Advanced Caching** (Intermediate): Cache Rules, Tiered Cache, Cache Reserve ve Purge stratejileri.
- **SSL/TLS ve Edge Certificates** (Intermediate): Strict SSL, Custom Certificates, mTLS ve Keyless SSL.
- **Load Balancing** (Advanced): Global trafik dağıtımı, Health Checks ve Failover senaryoları.

### Application Security (WAF)
- **WAF Custom Rules** (Intermediate): Karmaşık güvenlik duvarı kuralları ve RegEx kullanımı.
- **Advanced DDoS Protection** (Advanced): L7 saldırı analizi, Rate Limiting kuralları.
- **Bot Management** (Expert): Bot skorlama, Machine Learning tabanlı analiz.
- **Turnstile (CAPTCHA Alternative)** (Intermediate): Kullanıcı dostu doğrulama entegrasyonu.
- **Page Shield** (Expert): İstemci tarafı (Client-side) güvenlik ve script izleme.

### Developer Platform (Workers)
- **Workers Temelleri** (Intermediate): V8 Isolate yapısı, Fetch API ve Wrangler CLI.
- **Advanced Workers Patterns** (Expert): Service Bindings, Cron Triggers ve Modüler yapı.
- **Durable Objects & Websockets** (Expert): Stateful serverless ve gerçek zamanlı uygulamalar.
- **Queues & Asynchronous Processing** (Advanced): Arka plan işleri ve mesaj kuyrukları.
- **Cloudflare Pages & Functions** (Intermediate): Full-stack Jamstack uygulamaları dağıtımı.

### Data & Storage
- **R2 Object Storage** (Advanced): S3 uyumlu depolama, presigned URLler ve eventler.
- **D1 SQL Database** (Expert): Edge SQL veritabanı, transactionlar ve Time Travel.
- **Workers KV** (Intermediate): Düşük gecikmeli, yüksek okuma hızlı Key-Value deposu.
- **Hyperdrive** (Expert): Mevcut veritabanlarını global hale getirme.

### AI & Vectorize
- **Workers AI** (Advanced): Edge üzerinde LLM (Llama, Mistral) çalıştırma.
- **Vectorize (Vector DB)** (Expert): Embeddings saklama ve semantik arama yapma.
- **AI Gateway** (Intermediate): OpenAI/Anthropic proxy, caching ve loglama.

### Zero Trust & SASE
- **Access & IdP Integration** (Advanced): Google/Okta/Azure AD ile kimlik doğrulama.
- **Gateway DNS & HTTP Policies** (Expert): Kurumsal internet trafiği filtreleme.
- **Cloudflare Tunnel (cloudflared)** (Advanced): Public IP olmadan özel ağları dışarı açma.
- **WARP Client & Device Posture** (Expert): Cihaz güvenliği kontrolü ve VPN entegrasyonu.

---

## 2. Full-Stack AI Web Scraping
**Description:** Konseptten prodüksiyona kadar büyük ölçekli veri toplama mimarisi.

### Modern Scraping Mimarisi
- **API-first vs Browser-first** (Advanced)
- **Anti-Bot & Fingerprinting** (Expert)
- **Multi-Region & Proxy** (Advanced)

### Veri Çıkarma & Pipeline
- **Structured Data Extraction** (Intermediate)
- **Google Maps & Places Strategy** (Expert)
- **High-Scale Pipeline (500k+)** (Expert)

---

## 3. LLM Otomasyon Mühendisliği
**Description:** LLM'leri veri akışlarında hızlandırıcı ve karar verici olarak kullanmak.

### Intelligent Data Flow
- **Task-Based Prompt Engineering** (Advanced)
- **Aggressive Data Cleaning** (Intermediate)
- **Domain & Brand Inference** (Advanced)

### Quality & Evaluation
- **Quality Gates & Guardrails** (Expert)
- **Automated Evaluation** (Expert)

---

## 4. Google Cloud Cost-Aware Arch
**Description:** Tamamen Free Tier + low-cost optimizasyon odaklı GCP senaryoları.

### Core Services Optimization
- **IAM & Service Accounts** (Intermediate)
- **Functions-Workflows-Firestore** (Advanced)
- **Cold-Start Optimization** (Advanced)

### Billing & Data
- **Early-Warning Systems** (Beginner)
- **Maps API Cost Modeling** (Expert)
- **Cache-First API Design** (Expert)

---

## 5. High-Performance Python
**Description:** CPU/RAM bottleneck kıran, büyük veri için optimize edilmiş mimari.

### Concurrency & Parallelism
- **AsyncIO vs Multi-processing** (Advanced)
- **GPU Acceleration (RAPIDS/CuPy)** (Expert)

### Data Optimization
- **Polars & NumExpr** (Advanced)
- **Zero-Copy & Memory Mapping** (Expert)
- **Performance Profiling** (Intermediate)

---

## 6. Data Engineering for AI
**Description:** AI destekli veri ürünleri için modern veri mühendisliği altyapısı.

### Modern Pipelines
- **ETL vs ELT Architectures** (Intermediate)
- **Task Orchestration** (Advanced)
- **dbt (Data Build Tool)** (Advanced)

### Quality & Governance
- **DuckDB + BigQuery** (Expert)
- **Data Quality (Great Expectations)** (Advanced)
- **Data Lineage & Governance** (Expert)

---

## 7. Global Payments & Compliance
**Description:** Freelance, çoklu vatandaşlık ve uluslararası ödeme tasarımları.

### Ödeme Altyapıları
- **Stripe vs Wise vs Revolut** (Intermediate)
- **Money Flow Architecture** (Advanced)
- **API-Based Payment Flows** (Advanced)

### Risk & Compliance
- **KYC/AML & MASAK/EU** (Expert)
- **KYB (Know Your Business)** (Expert)
- **Fraud Detection Basics** (Advanced)

---

## 8. AI-Driven B2B Sales
**Description:** Kurumsal müşteri tarafında güven, ROI ve teknik yeterlilik oluşturma.

### Value Proposition
- **B2B İhtiyaç Haritalama** (Intermediate)
- **AI Değer Önerisi Kanvası** (Advanced)
- **ROI Hesaplama** (Expert)

### Trust & Documentation
- **Executive-Level Sunum** (Advanced)
- **Technical Case Studies** (Intermediate)
- **Risk Yönetimi & Şeffaflık** (Expert)

---

## 9. API Productization
**Description:** Veriyi veya otomasyon akışlarını satılabilir API ürününe dönüştürme.

### Monetization Models
- **Usage-Based Pricing** (Advanced)
- **Metering & Billing Hooks** (Expert)
- **Rate Limits & Quotas** (Intermediate)

### Technical Implementation
- **Authentication (OAuth2/JWT)** (Advanced)
- **Developer Experience (DX)** (Advanced)
- **SLA & Incident Management** (Expert)

---

## 10. Behavioural AI
**Description:** Psikoloji + veri + AI içgörüsüyle karar sistemleri tasarlamak.

### Decision Science
- **Bilişsel Önyargılar** (Intermediate)
- **Nudging Mekanizmaları** (Advanced)
- **Behavioural Scoring** (Advanced)

### Architecture
- **Decision Bottlenecks** (Expert)
- **Human + AI Models** (Expert)
- **Enterprise Behaviour Design** (Expert)

---

## 11. Information Theory & AI
**Description:** Shannon + normal dağılım + Fourier’in gerçek data projelerine uygulanması.

### Theoretical Foundations
- **Entropy & Mutual Information** (Advanced)
- **Normal Distribution Applications** (Intermediate)
- **Logistic Map & Chaos** (Expert)

### Applied Computation
- **Fourier Transform** (Expert)
- **Communication Efficiency** (Expert)
- **Model Uncertainty** (Advanced)

---

## 12. Personal AI Agents
**Description:** Senin tarzına uygun kişisel ajanlar ile otomasyon orkestrasyonu.

### Agent Architectures
- **Multi-Agent Patterns** (Advanced)
- **Self-Healing Pipelines** (Expert)
- **Decision Agents** (Advanced)

### Implementation
- **Data Cleaner Agent** (Intermediate)
- **Web -> DB Pipeline Agent** (Advanced)
- **Tool-Use Frameworks** (Expert)

---

## 13. AI Consultant Branding
**Description:** Yüksek değerli danışman profili oluşturma ve pazar konumlaması.

### Strategic Positioning
- **Tek Cümle Değer Önerisi** (Intermediate)
- **Güvenli & Teknik Konumlanma** (Advanced)
- **Portfolio Architecture** (Advanced)

### Content System
- **LinkedIn Content System** (Intermediate)
- **Medium Authority** (Advanced)
- **Brand Language & Identity** (Intermediate)

---

## 14. AI & Kurumsal Strateji
**Description:** B2B müşteriler için değer üretimi, ROI analizi ve stratejik dönüşüm.

### İş Değeri & ROI
- **Yapay Zeka ile Değer Yaratımı** (Advanced)
- **Maliyet/Fayda Analizi (ROI)** (Expert)

### Karar Alma & Liderlik
- **Veri Odaklı Karar Alma** (Intermediate)
- **Kurumsal AI Adaptasyonu** (Expert)

---

## 15. Yapay Zekâ Mühendisliği
**Description:** Lojistikten finansa, farklı sektörler için uygulamalı mühendislik çözümleri.

### AI Sistem Mimarisi
- **Ölçeklenebilir AI Mimarileri** (Advanced)
- **AI için Temiz Kod & Refactoring** (Intermediate)

### Sektörel Uygulamalar
- **Kestirimci Bakım (Lojistik/Üretim)** (Expert)
- **FinTech & Fraud Detection** (Expert)

---

## 16. Generative AI & LLMs
**Description:** Büyük Dil Modelleri, Prompt Engineering ve Modern RAG Mimarileri.

### LLM Temelleri
- **Transformer Mimarisi** (Advanced)
- **Advanced Prompt Engineering** (Intermediate)

### İleri Seviye Uygulamalar
- **RAG (Retrieval Augmented Generation)** (Expert)
- **Autonomous Agents & Tools** (Expert)

---

## 17. Etik & Güvenlik
**Description:** Güvenilir AI, Regülasyon Uyumluluğu (Compliance) ve Güvenlik.

### Güven & Şeffaflık
- **XAI (Açıklanabilir Yapay Zeka)** (Advanced)
- **Algoritmik Önyargı ve Adalet** (Intermediate)

### Güvenlik & Regülasyon
- **Adversarial Attacks & Security** (Expert)
- **EU AI Act & GDPR Compliance** (Advanced)

---

## 18. Uygulamalı DS & MLOps
**Description:** Model dağıtımı, ML Pipeline yönetimi ve üretim ortamı (Production).

### MLOps Temelleri
- **Experiment Tracking (MLflow)** (Intermediate)
- **CI/CD for Machine Learning** (Advanced)

### Production & Serving
- **Model Serving Architectures** (Expert)
- **Data Validation & Drift Detection** (Expert)

---

## 19. TypeScript
**Description:** Tip güvenli JavaScript, Generics ve İleri Seviye Kalıplar.

### TypeScript Temelleri
- **Gelişmiş Tip Sistemi** (Beginner)
- **Fonksiyonlar ve Overloading** (Intermediate)

### Advanced Types
- **Generics & Constraints** (Advanced)
- **Utility Types** (Expert)
- **Type Guards & Narrowing** (Expert)

---

## 20. Data Science
**Description:** Python, Pandas, Veri Analizi ve Modelleme.

### Python for Data
- **NumPy & Vectorization** (Intermediate)
- **Pandas ile Veri Manipülasyonu** (Advanced)

### Machine Learning
- **Scikit-Learn Giriş** (Beginner)
- **Exploratory Data Analysis (EDA)** (Intermediate)

---

## 21. Search Engine
**Description:** Full-text Search, Indexing ve Elasticsearch Mimarisi.

### Arama Temelleri
- **Inverted Index Nedir?** (Beginner)
- **TF-IDF & BM25** (Advanced)

### Modern Arama Mimarisi
- **Vector Search & Embeddings** (Expert)
- **Sharding & Replication** (Expert)

---

## 22. Tavsiye Motoru
**Description:** Kişiselleştirme algoritmaları ve Matrix Factorization.

### Filtreleme Yöntemleri
- **Collaborative Filtering** (Intermediate)
- **Content-Based Filtering** (Intermediate)

### İleri Seviye Algoritmalar
- **Matrix Factorization (SVD)** (Expert)
- **Hybrid Recommender Systems** (Expert)
