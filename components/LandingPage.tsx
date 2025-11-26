

import React from 'react';
import { Course, Language } from '../types';
import { COURSES, LANDING_STRINGS, COURSE_TRANSLATIONS } from '../constants';
import { 
  CloudflareIcon, TypeScriptIcon, DataScienceIcon, SearchIcon, RecommendationIcon,
  StrategyIcon, EngineeringIcon, GenAIIcon, EthicsIcon, PipelineIcon, ScraperIcon,
  CloudCostIcon, BotIcon, SpeedIcon, GlobalPaymentIcon, B2BSalesIcon, ApiProductIcon,
  BrainIcon, MathIcon, AgentIcon, BrandIcon, BookOpen, Shield, Terminal, Database, Sparkles, Zap, ArrowRight, Star, Globe, LayoutGrid, Cpu, Layers, Plus
} from './Icons';

interface Props {
  onSelectCourse: (courseId: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onCreateCourse: () => void;
}

const LandingPage: React.FC<Props> = ({ onSelectCourse, language, setLanguage, onCreateCourse }) => {
  const t = LANDING_STRINGS[language];
  const ui = language === 'tr' 
    ? { createTitle: "Yeni Kurs Oluştur", createDesc: "Kendi müfredatınızı yapay zeka ile tasarlayın." }
    : { createTitle: "Create New Course", createDesc: "Design your own curriculum with AI." };

  const renderIcon = (iconName: string) => {
    const props = { className: "w-8 h-8" };
    switch(iconName) {
        case 'CloudflareIcon': return <CloudflareIcon {...props} />;
        case 'TypeScriptIcon': return <TypeScriptIcon {...props} />;
        case 'DataScienceIcon': return <DataScienceIcon {...props} />;
        case 'SearchIcon': return <SearchIcon {...props} />;
        case 'RecommendationIcon': return <RecommendationIcon {...props} />;
        case 'StrategyIcon': return <StrategyIcon {...props} />;
        case 'EngineeringIcon': return <EngineeringIcon {...props} />;
        case 'GenAIIcon': return <GenAIIcon {...props} />;
        case 'EthicsIcon': return <EthicsIcon {...props} />;
        case 'PipelineIcon': return <PipelineIcon {...props} />;
        case 'ScraperIcon': return <ScraperIcon {...props} />;
        case 'CloudCostIcon': return <CloudCostIcon {...props} />;
        case 'BotIcon': return <BotIcon {...props} />;
        case 'SpeedIcon': return <SpeedIcon {...props} />;
        case 'GlobalPaymentIcon': return <GlobalPaymentIcon {...props} />;
        case 'B2BSalesIcon': return <B2BSalesIcon {...props} />;
        case 'ApiProductIcon': return <ApiProductIcon {...props} />;
        case 'BrainIcon': return <BrainIcon {...props} />;
        case 'MathIcon': return <MathIcon {...props} />;
        case 'AgentIcon': return <AgentIcon {...props} />;
        case 'BrandIcon': return <BrandIcon {...props} />;
        default: return <BookOpen {...props} />;
    }
  };

  const getTranslatedTitle = (originalTitle: string, id: string) => {
      if (language === 'tr') return originalTitle;
      if (COURSE_TRANSLATIONS[id]?.en?.title) return COURSE_TRANSLATIONS[id].en.title;
      return originalTitle;
  };
  
  const getTranslatedDesc = (originalDesc: string, id: string) => {
       if (language === 'tr') return originalDesc;
       if (COURSE_TRANSLATIONS[id]?.en?.desc) return COURSE_TRANSLATIONS[id].en.desc;
       return originalDesc;
  };

  const features = [
    { icon: <LayoutGrid className="w-6 h-6 text-purple-400" />, ...t.features[0] },
    { icon: <Cpu className="w-6 h-6 text-blue-400" />, ...t.features[1] },
    { icon: <Layers className="w-6 h-6 text-orange-400" />, ...t.features[2] },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white overflow-y-auto overflow-x-hidden relative selection:bg-orange-500/30">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d0d0d]/50 to-[#0d0d0d] pointer-events-none z-0"></div>

        {/* Header */}
        <header className="relative z-10 w-full max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-900/20">
                    <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-xl tracking-tight leading-none">MasterClass AI</span>
                    <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">Universal Platform</span>
                </div>
            </div>
            
            <div className="flex items-center gap-4">
                 <button 
                    onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1a1a1a] border border-[#333] hover:bg-[#252525] transition-all text-xs font-bold text-gray-400 hover:text-white"
                 >
                    <Globe className="w-3 h-3" /> {language.toUpperCase()}
                 </button>
            </div>
        </header>

        {/* Hero Section */}
        <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col items-center text-center">
            {/* Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-orange-600/20 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-8 animate-fadeIn">
                <Star className="w-3 h-3" /> {t.heroBadge}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 max-w-4xl leading-[1.1]">
                {t.heroTitle}
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed">
                {t.heroSub}
            </p>

            <button 
                onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-8 py-4 bg-white text-black font-bold rounded-full transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
                {t.startBtn}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
        </section>

        {/* Features Grid */}
        <section className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, idx) => (
                    <div key={idx} className="bg-[#161616]/50 backdrop-blur-sm border border-[#2c2c2c] p-6 rounded-2xl hover:border-gray-600 transition-colors">
                        <div className="mb-4 p-3 bg-[#1f1f1f] rounded-lg w-fit">
                            {feature.icon}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* Course Catalog */}
        <section id="courses" className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-32">
            <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-bold text-white">{t.availableCourses}</h2>
                <div className="text-sm text-gray-500 font-mono">{COURSES.length} {t.courseCount}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                
                {/* Create New Course Card */}
                <div 
                    onClick={onCreateCourse}
                    className="group relative bg-[#161616] border border-dashed border-gray-600 hover:border-white rounded-2xl p-6 cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col items-center justify-center text-center min-h-[300px]"
                >
                    <div className="w-16 h-16 rounded-full bg-[#1f1f1f] flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-black transition-colors text-gray-400">
                        <Plus className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-current transition-colors">
                        {ui.createTitle}
                    </h3>
                    <p className="text-sm text-gray-400">
                        {ui.createDesc}
                    </p>
                </div>

                {COURSES.map((course) => (
                    <div 
                        key={course.id}
                        onClick={() => onSelectCourse(course.id)}
                        className="group relative bg-[#161616] border border-[#2c2c2c] rounded-2xl p-6 cursor-pointer overflow-hidden transition-all duration-300 hover:border-gray-500 hover:-translate-y-1 hover:shadow-2xl"
                    >
                        {/* Hover Gradient Border Effect */}
                        <div 
                            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                            style={{ color: course.themeColor }}
                        ></div>

                        <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                            style={{ backgroundColor: `${course.themeColor}15`, color: course.themeColor }}
                        >
                            {renderIcon(course.icon)}
                        </div>

                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-current transition-colors" style={{ '--tw-text-opacity': 1 } as any}>
                            {getTranslatedTitle(course.title, course.id)}
                        </h3>
                        
                        <p className="text-sm text-gray-400 mb-6 line-clamp-2 h-10">
                            {getTranslatedDesc(course.description, course.id)}
                        </p>

                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#2c2c2c]">
                             <div className="flex -space-x-2">
                                <div className="w-6 h-6 rounded-full bg-gray-700 border-2 border-[#161616]"></div>
                                <div className="w-6 h-6 rounded-full bg-gray-600 border-2 border-[#161616]"></div>
                                <div className="w-6 h-6 rounded-full bg-gray-500 border-2 border-[#161616] flex items-center justify-center text-[8px] font-bold text-black">+</div>
                             </div>
                             <span className="text-xs font-bold flex items-center gap-1 transition-colors group-hover:text-white text-gray-500">
                                {t.startLearning} <ArrowRight className="w-3 h-3" />
                             </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Footer */}
        <footer className="w-full border-t border-[#2c2c2c] bg-[#0d0d0d] py-12 text-center text-gray-500 text-sm">
            <p>&copy; 2024 Universal AI MasterClass Platform. All rights reserved.</p>
        </footer>
    </div>
  );
};

export default LandingPage;