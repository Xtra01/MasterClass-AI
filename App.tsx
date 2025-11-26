
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { COURSES, STATIC_TUTORIALS, UI_STRINGS, COURSE_TRANSLATIONS } from './constants';
import { Topic, ChatMessage, ContentCache, Course, Language } from './types';
import { generateTutorialContent, chatWithContext, suggestMissingTopics, generateCourseStructure } from './services/geminiService';
import MarkdownRenderer from './components/MarkdownRenderer';
import ChatBubble from './components/ChatBubble';
import LandingPage from './components/LandingPage';
import { 
  Logo, ChevronRight, BookOpen, Terminal, Shield, Zap, Database, Lock, Sparkles, 
  Settings, RefreshCw, XCircle, Trash, ChevronDown, Microscope, Wand, Globe, Home,
  CloudflareIcon, TypeScriptIcon, DataScienceIcon, SearchIcon, RecommendationIcon,
  StrategyIcon, EngineeringIcon, GenAIIcon, EthicsIcon, PipelineIcon, ScraperIcon,
  CloudCostIcon, BotIcon, SpeedIcon, GlobalPaymentIcon, B2BSalesIcon, ApiProductIcon,
  BrainIcon, MathIcon, AgentIcon, BrandIcon, Plus, Download
} from './components/Icons';

declare global {
  interface Window {
    html2pdf: any;
  }
}

const MAX_CONCURRENT_REQUESTS = 2;

interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface QueueItem extends Topic {
  isDeepDive?: boolean;
  language: Language;
}

type AppView = 'landing' | 'course';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');
  const [language, setLanguage] = useState<Language>('tr');
  const t = (key: string) => UI_STRINGS[language][key] || key;

  // State for Mutable Curriculum
  const [coursesState, setCoursesState] = useState<Course[]>(COURSES);
  
  // State for Course Selection
  const [activeCourseId, setActiveCourseId] = useState<string>(COURSES[0].id);
  
  const activeCourse = useMemo(() => coursesState.find(c => c.id === activeCourseId) || coursesState[0], [activeCourseId, coursesState]);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCourseSelectorOpen, setIsCourseSelectorOpen] = useState(false);
  
  // Course Creator State
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [creatorPrompt, setCreatorPrompt] = useState('');
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);

  // Offline Download State
  const [isPackagingOffline, setIsPackagingOffline] = useState(false);

  // Bulk Operations Settings
  const [isBulkDeepDive, setIsBulkDeepDive] = useState(false);

  const [contentCache, setContentCache] = useState<ContentCache>(STATIC_TUTORIALS);
  
  const [processingQueue, setProcessingQueue] = useState<QueueItem[]>([]);
  const [activeRequests, setActiveRequests] = useState<string[]>([]);
  const [expandingCategories, setExpandingCategories] = useState<string[]>([]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Initialize Custom Courses from LocalStorage
  useEffect(() => {
    const savedCustomCourses = localStorage.getItem('custom_courses');
    if (savedCustomCourses) {
        try {
            const parsed = JSON.parse(savedCustomCourses) as Course[];
            // Merge custom courses avoiding duplicates
            const existingIds = new Set(COURSES.map(c => c.id));
            const uniqueCustom = parsed.filter(c => !existingIds.has(c.id));
            setCoursesState([...COURSES, ...uniqueCustom]);
        } catch (e) {
            console.error("Failed to load custom courses", e);
        }
    }
  }, []);

  // Initialize Category
  useEffect(() => {
    if (activeCourse && activeCourse.curriculum.length > 0) {
      // Don't auto-select category, let user see overview
      if (!activeTopic) {
        setActiveCategory(activeCourse.curriculum[0].id);
      }
      setSearchQuery(''); 
    }
  }, [activeCourseId]);

  useEffect(() => {
    const saved = localStorage.getItem('masterclass_progress');
    if (saved) {
      setCompletedTopics(JSON.parse(saved));
    }
  }, []);

  // Queue Processor with Throttling for Rate Limits
  useEffect(() => {
    let isMounted = true;
    const processQueue = async () => {
      if (processingQueue.length === 0 || activeRequests.length >= MAX_CONCURRENT_REQUESTS) {
        return;
      }

      // Increased delay to 4000ms to throttle requests and prevent hitting 429 error bursts
      await new Promise(resolve => setTimeout(resolve, 4000));
      if (!isMounted) return;

      const [nextTopic, ...remainingQueue] = processingQueue;
      
      setProcessingQueue(remainingQueue);
      setActiveRequests(prev => [...prev, nextTopic.id]);

      try {
        const course = coursesState.find(c => c.curriculum.some(cat => cat.topics.some(t => t.id === nextTopic.id))) || activeCourse;

        const result = await generateTutorialContent(
          nextTopic.title, 
          nextTopic.level, 
          course.title, 
          nextTopic.isDeepDive,
          nextTopic.language
        );
        
        if (!isMounted) return;

        setContentCache(prev => ({
            ...prev,
            [nextTopic.id]: result
        }));

        const typeMsg = nextTopic.isDeepDive ? (language === 'tr' ? "Analiz" : "Deep Dive") : (language === 'tr' ? "İçerik" : "Content");
        addToast(nextTopic.id, `${typeMsg} ${language === 'tr' ? 'Hazır' : 'Ready'}`, nextTopic.title, 'success');

      } catch (e) {
        console.error(e);
        addToast(nextTopic.id, t('error'), nextTopic.title, 'error');
      } finally {
        if (isMounted) {
            setActiveRequests(prev => prev.filter(id => id !== nextTopic.id));
        }
      }
    };

    processQueue();
    return () => { isMounted = false; };
  }, [processingQueue, activeRequests, activeCourse, coursesState, language]);

  const addToast = (id: string, title: string, message: string, type: 'success' | 'info' | 'error') => {
    const toastId = Date.now().toString() + Math.random();
    setToasts(prev => [...prev, { id: toastId, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== toastId));
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const toggleComplete = (topicId: string) => {
    let newCompleted;
    if (completedTopics.includes(topicId)) {
      newCompleted = completedTopics.filter(id => id !== topicId);
    } else {
      newCompleted = [...completedTopics, topicId];
    }
    setCompletedTopics(newCompleted);
    localStorage.setItem('masterclass_progress', JSON.stringify(newCompleted));
  };

  const handleTopicClick = (topic: Topic) => {
    setActiveTopic(topic);
    // Find category for this topic and set it active if needed
    const cat = activeCourse.curriculum.find(c => c.topics.some(t => t.id === topic.id));
    if (cat) setActiveCategory(cat.id);

    // If no cache, or cache is in wrong language, regenerate
    const cached = contentCache[topic.id];
    const isCached = !!cached;
    const isWrongLang = cached && cached.language && cached.language !== language;
    const isProcessing = isTopicProcessing(topic.id);
    const isQueued = isTopicQueued(topic.id);

    // Note: Simulated static content doesn't have a 'language' tag by default, we assume it's TR unless we generated it.
    const isStaticTr = isCached && !cached.language; 
    
    if ((!isCached || isWrongLang || (language === 'en' && isStaticTr)) && !isProcessing && !isQueued) {
        addToQueue(topic);
    }
  };

  const handleRegenerate = (topic: Topic, isDeepDive: boolean = false) => {
    addToQueue(topic, isDeepDive);
    const msg = isDeepDive ? t('deepDive') : t('queue');
    addToast(topic.id, t('processing'), msg, 'info');
  };

  const addToQueue = (topic: Topic, isDeepDive: boolean = false) => {
    if (isTopicQueued(topic.id) || isTopicProcessing(topic.id)) return;
    setProcessingQueue(prev => [...prev, { ...topic, isDeepDive, language }]);
  };

  const handleExpandCurriculum = async (e: React.MouseEvent, categoryId: string) => {
    e.stopPropagation();
    if (expandingCategories.includes(categoryId)) return;

    const category = activeCourse.curriculum.find(c => c.id === categoryId);
    if (!category) return;

    setExpandingCategories(prev => [...prev, categoryId]);
    addToast(categoryId, t('processing'), t('missingTopics') + "...", "info");

    try {
      const newTopics = await suggestMissingTopics(activeCourse.title, category.title, category.topics, language);
      
      if (newTopics.length > 0) {
        setCoursesState(prevCourses => {
          return prevCourses.map(course => {
            if (course.id !== activeCourse.id) return course;
            return {
              ...course,
              curriculum: course.curriculum.map(cat => {
                if (cat.id !== categoryId) return cat;
                const existingIds = new Set(cat.topics.map(t => t.id));
                const uniqueNewTopics = newTopics.filter(t => !existingIds.has(t.id));
                return {
                  ...cat,
                  topics: [...cat.topics, ...uniqueNewTopics]
                };
              })
            };
          });
        });
        addToast(categoryId + "-done", t('success'), `${newTopics.length} new topics`, "success");
      } else {
        addToast(categoryId + "-none", t('info'), "No missing topics found", "info");
      }
    } catch (err) {
      addToast(categoryId + "-err", t('error'), "Failed", "error");
    } finally {
      setExpandingCategories(prev => prev.filter(id => id !== categoryId));
    }
  };

  const handleCreateCourse = async () => {
    if (!creatorPrompt.trim()) return;
    setIsCreatingCourse(true);

    try {
        const newCourse = await generateCourseStructure(creatorPrompt, language);
        if (newCourse) {
            // Save to State
            setCoursesState(prev => [...prev, newCourse]);
            
            // Save to LocalStorage (Persist custom courses)
            const saved = localStorage.getItem('custom_courses');
            const currentCustom = saved ? JSON.parse(saved) : [];
            localStorage.setItem('custom_courses', JSON.stringify([...currentCustom, newCourse]));

            addToast("create-success", t('success'), newCourse.title, 'success');
            
            // Switch to new course
            setActiveCourseId(newCourse.id);
            setActiveTopic(null);
            setView('course');
            setIsCreatorOpen(false);
            setCreatorPrompt('');
        } else {
             addToast("create-error", t('error'), "Failed to generate course", 'error');
        }
    } catch (e) {
        addToast("create-error", t('error'), "An error occurred", 'error');
    } finally {
        setIsCreatingCourse(false);
    }
  };

  const handleDownloadOffline = async () => {
    setIsPackagingOffline(true);
    addToast("download-start", t('info'), t('offlineReady'), 'info');

    // Use a timeout to allow the UI to update and show the toast before heavy processing
    setTimeout(() => {
        try {
            // Robust Markdown to HTML Parser
            // This parser is aware of Code Blocks to avoid rendering '#' inside code as headers.
            const robustMarkdownToHtml = (md: string) => {
                if (!md) return "";
                
                const lines = md.split('\n');
                let html = "";
                let inCodeBlock = false;
                let codeLang = "";

                lines.forEach(line => {
                    // Code Block Start
                    if (line.trim().startsWith('```')) {
                        if (inCodeBlock) {
                            // End of code block
                            html += `</code></pre></div>\n`;
                            inCodeBlock = false;
                        } else {
                            // Start of code block
                            inCodeBlock = true;
                            codeLang = line.trim().replace('```', '');
                            html += `<div class="code-block"><div class="code-header">${codeLang}</div><pre><code>`;
                        }
                        return;
                    }

                    // If inside code block, escape HTML and preserve formatting
                    if (inCodeBlock) {
                        const safeLine = line
                            .replace(/&/g, "&amp;")
                            .replace(/</g, "&lt;")
                            .replace(/>/g, "&gt;");
                        html += safeLine + "\n";
                        return;
                    }

                    // Markdown Processing (Only if NOT in code block)
                    
                    // Headers
                    if (line.startsWith('### ')) {
                        html += `<h3 class="topic-h3">${line.replace('### ', '')}</h3>\n`;
                    } else if (line.startsWith('## ')) {
                        html += `<h2 class="topic-h2">${line.replace('## ', '')}</h2>\n`;
                    } else if (line.startsWith('# ')) {
                        html += `<h1 class="topic-h1">${line.replace('# ', '')}</h1>\n`;
                    } 
                    // Blockquotes / Tips
                    else if (line.startsWith('> ')) {
                        html += `<blockquote class="topic-quote">${processInlineMarkdown(line.replace('> ', ''))}</blockquote>\n`;
                    }
                    // Lists
                    else if (line.trim().startsWith('- ')) {
                        html += `<li class="topic-li">${processInlineMarkdown(line.replace('- ', ''))}</li>\n`;
                    }
                    // Empty lines (Paragraph breaks)
                    else if (line.trim() === '') {
                        html += `<br/>`;
                    }
                    // Paragraphs
                    else {
                        html += `<p class="topic-p">${processInlineMarkdown(line)}</p>\n`;
                    }
                });

                return html;
            };

            // Helper to process inline markdown (**bold**, `code`)
            const processInlineMarkdown = (text: string) => {
                return text
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
                    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>') // Inline Code
                    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>'); // Links
            };

            const courseTitle = getTranslatedTitle(activeCourse.title, activeCourse.id);
            
            // Generate TOC and Content
            let tocHtml = `
                <div class="toc-container">
                    <h2 class="toc-title">İçindekiler / Table of Contents</h2>
                    <ul class="toc-list">
            `;
            
            let contentHtml = "";

            activeCourse.curriculum.forEach((cat, catIndex) => {
                const catTitle = getTranslatedTitle(cat.title, cat.id);
                
                // TOC Category
                tocHtml += `<li class="toc-category">${catTitle}</li>`;
                
                // Content Category Header
                contentHtml += `
                    <div class="category-section">
                        <h1 class="category-title">${catTitle}</h1>
                        <div class="category-divider"></div>
                    </div>
                `;
                
                cat.topics.forEach((topic, topicIndex) => {
                     const topicTitle = getTranslatedTitle(topic.title, topic.id);
                     const cached = contentCache[topic.id];
                     
                     // TOC Topic link
                     tocHtml += `<li class="toc-topic"><a href="#topic-${topic.id}">${topicTitle}</a></li>`;
                     
                     // Content Topic Body
                     contentHtml += `<div id="topic-${topic.id}" class="topic-container">`;
                     contentHtml += `<div class="topic-header-row"><span class="topic-badge">${topic.level}</span></div>`;
                     
                     if (cached && (cached.language === language || !cached.language)) {
                         contentHtml += robustMarkdownToHtml(cached.content);
                     } else {
                         contentHtml += `<h2 class="topic-h2">${topicTitle}</h2>`;
                         contentHtml += `<div class="missing-content">⚠️ Content not generated yet.</div>`;
                     }
                     contentHtml += `</div>`;
                });
            });
            tocHtml += `</ul></div>`;

            const fullHtml = `
            <!DOCTYPE html>
            <html lang="${language}">
            <head>
                <meta charset="UTF-8">
                <title>${courseTitle} - MasterClass AI eBook</title>
                <style>
                    /* Reset & Base */
                    * { box-sizing: border-box; }
                    body { 
                        background-color: #0d0d0d; 
                        color: #e0e0e0; 
                        font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
                        line-height: 1.6; 
                        margin: 0; 
                        padding: 0; 
                    }
                    a { color: ${activeCourse.themeColor}; text-decoration: none; }
                    a:hover { text-decoration: underline; }

                    /* Container */
                    .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }

                    /* Cover Page */
                    .cover { 
                        height: 90vh; 
                        display: flex; 
                        flex-direction: column; 
                        justify-content: center; 
                        align-items: center; 
                        text-align: center; 
                        border-bottom: 1px solid #333;
                        margin-bottom: 50px;
                        background: radial-gradient(circle at center, #1a1a1a 0%, #0d0d0d 100%);
                    }
                    .cover h1 { 
                        font-size: 4rem; 
                        margin: 0; 
                        background: linear-gradient(to right, ${activeCourse.themeColor}, #fff); 
                        -webkit-background-clip: text; 
                        -webkit-text-fill-color: transparent; 
                        font-weight: 800;
                    }
                    .cover p { font-size: 1.5rem; color: #888; margin-top: 20px; }
                    .cover .meta { font-size: 0.9rem; color: #555; margin-top: 50px; font-family: monospace; }

                    /* TOC */
                    .toc-container { background: #161616; padding: 30px; border-radius: 12px; border: 1px solid #333; margin-bottom: 60px; }
                    .toc-title { border-bottom: 1px solid #444; padding-bottom: 10px; margin-top: 0; color: white; }
                    .toc-list { list-style: none; padding: 0; }
                    .toc-category { font-weight: bold; color: ${activeCourse.themeColor}; margin-top: 20px; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 1px; }
                    .toc-topic { margin-left: 20px; margin-top: 5px; color: #bbb; }
                    .toc-topic a { color: #bbb; transition: color 0.2s; }
                    .toc-topic a:hover { color: white; }

                    /* Content Styling */
                    .category-section { text-align: center; margin: 80px 0 40px 0; }
                    .category-title { font-size: 2.5rem; color: ${activeCourse.themeColor}; margin-bottom: 10px; }
                    .category-divider { height: 4px; width: 100px; background: ${activeCourse.themeColor}; margin: 0 auto; border-radius: 2px; opacity: 0.5; }

                    .topic-container { 
                        background: #161616; 
                        padding: 40px; 
                        border-radius: 12px; 
                        border: 1px solid #2a2a2a; 
                        margin-bottom: 50px; 
                        box-shadow: 0 10px 30px rgba(0,0,0,0.3); 
                    }
                    .topic-header-row { margin-bottom: 20px; }
                    .topic-badge { 
                        background: #333; 
                        color: #aaa; 
                        padding: 4px 8px; 
                        border-radius: 4px; 
                        font-size: 0.75rem; 
                        font-weight: bold; 
                        text-transform: uppercase; 
                        border: 1px solid #444;
                    }

                    /* Typography */
                    .topic-h1 { font-size: 2.2rem; color: white; border-bottom: 1px solid #333; padding-bottom: 10px; margin-top: 0; }
                    .topic-h2 { font-size: 1.8rem; color: white; margin-top: 40px; margin-bottom: 15px; }
                    .topic-h3 { font-size: 1.4rem; color: ${activeCourse.themeColor}; margin-top: 30px; margin-bottom: 10px; }
                    .topic-p { color: #ccc; margin-bottom: 16px; font-size: 1.05rem; }
                    .topic-li { margin-left: 20px; color: #ccc; margin-bottom: 8px; list-style-type: disc; }
                    .topic-quote { 
                        border-left: 4px solid ${activeCourse.themeColor}; 
                        background: rgba(255,255,255,0.03); 
                        padding: 15px 20px; 
                        margin: 20px 0; 
                        font-style: italic; 
                        color: #ddd; 
                    }

                    /* Code Blocks */
                    .code-block { 
                        background: #0a0a0a; 
                        border-radius: 8px; 
                        border: 1px solid #333; 
                        margin: 20px 0; 
                        overflow: hidden; 
                    }
                    .code-header { 
                        background: #1f1f1f; 
                        padding: 5px 15px; 
                        font-size: 0.75rem; 
                        color: #888; 
                        font-family: monospace; 
                        border-bottom: 1px solid #333; 
                        text-transform: uppercase;
                    }
                    pre { margin: 0; padding: 15px; overflow-x: auto; }
                    code { font-family: 'Consolas', 'Monaco', 'Courier New', monospace; font-size: 0.9rem; color: #a5d6ff; }
                    .inline-code { 
                        background: #2d2d2d; 
                        color: #ffab70; 
                        padding: 2px 6px; 
                        border-radius: 4px; 
                        font-family: monospace; 
                        font-size: 0.9em; 
                    }
                    
                    /* Utility */
                    .missing-content { 
                        padding: 20px; 
                        border: 1px dashed #555; 
                        color: #777; 
                        text-align: center; 
                        border-radius: 8px; 
                        background: #111;
                    }
                    .footer { text-align: center; margin-top: 80px; color: #555; font-size: 0.8rem; border-top: 1px solid #222; padding-top: 20px;}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="cover">
                        <h1>${courseTitle}</h1>
                        <p>MasterClass AI Generated eBook</p>
                        <div class="meta">
                            Generated on ${new Date().toLocaleDateString()}<br/>
                            Personal Use Only
                        </div>
                    </div>

                    ${tocHtml}
                    ${contentHtml}

                    <div class="footer">
                        &copy; ${new Date().getFullYear()} Universal AI MasterClass Platform. All Rights Reserved.<br/>
                        Generated by AI.
                    </div>
                </div>
            </body>
            </html>
            `;

            const blob = new Blob([fullHtml], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${courseTitle.replace(/\s+/g, '_')}_MasterClass.html`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            addToast("download-done", t('success'), "Download Started", 'success');
        } catch (e) {
            console.error(e);
            addToast("download-err", t('error'), "Failed to package course", 'error');
        } finally {
            setIsPackagingOffline(false);
        }
    }, 1000);
  };

  const handleRegenerateCategory = () => {
    if (!activeCategory) return;
    const cat = activeCourse.curriculum.find(c => c.id === activeCategory);
    if (!cat) return;

    const newItems = cat.topics.filter(t => !isTopicQueued(t.id) && !isTopicProcessing(t.id));
    if (newItems.length > 0) {
        setProcessingQueue(prev => [...prev, ...newItems.map(t => ({...t, language, isDeepDive: isBulkDeepDive}))]);
        addToast("bulk-cat", t('regenerateCat'), `${newItems.length} topics (${isBulkDeepDive ? 'Deep' : 'Std'})`, "info");
    }
    setIsSettingsOpen(false);
  };

  const handleRegenerateAll = () => {
    const allTopics: Topic[] = [];
    activeCourse.curriculum.forEach(cat => {
        cat.topics.forEach(t => allTopics.push(t));
    });

    const newItems = allTopics.filter(t => !isTopicQueued(t.id) && !isTopicProcessing(t.id));

    if (newItems.length > 0) {
        // Clear cache for these items to force update visuals
        const newCache = { ...contentCache };
        allTopics.forEach(t => delete newCache[t.id]);
        setContentCache(newCache);

        setProcessingQueue(prev => [...prev, ...newItems.map(t => ({...t, language, isDeepDive: isBulkDeepDive}))]);
        addToast("bulk-all", t('regenerateAll'), `${newItems.length} topics queued (${isBulkDeepDive ? 'Deep' : 'Std'})`, "info");
    } else {
        addToast("bulk-all-empty", t('queue'), "Full", "info");
    }
    setIsSettingsOpen(false);
  };

  const handleResetCache = () => {
      setProcessingQueue([]);
      setContentCache(STATIC_TUTORIALS);
      setCoursesState(COURSES); 
      localStorage.removeItem('custom_courses'); // Also clear custom courses on factory reset
      addToast("reset", t('factoryReset'), t('success'), "success");
      setIsSettingsOpen(false);
  };

  const handleResetProgress = () => {
      setCompletedTopics([]);
      localStorage.removeItem('masterclass_progress');
      addToast("reset-prog", t('resetProgress'), t('success'), "success");
      setIsSettingsOpen(false);
  };

  const handleClearQueue = () => {
      setProcessingQueue([]);
      addToast("clear-queue", t('queue'), "Cleared", "info");
  };

  const handleSelectCourse = (courseId: string) => {
    setActiveCourseId(courseId);
    setActiveTopic(null); // Reset topic to show overview
    setView('course');
  };

  const isTopicProcessing = (id: string) => activeRequests.includes(id);
  const isTopicQueued = (id: string) => processingQueue.some(t => t.id === id);

  const handleChat = async (text: string) => {
    const newUserMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text };
    setChatMessages(prev => [...prev, newUserMsg]);
    setIsChatLoading(true);

    const currentContentText = activeTopic ? contentCache[activeTopic.id]?.content : null;

    try {
        const responseText = await chatWithContext(text, currentContentText, [...chatMessages, newUserMsg], activeCourse.title, language);
        const newModelMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText };
        setChatMessages(prev => [...prev, newModelMsg]);
    } finally {
        setIsChatLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!activeTopic || !contentCache[activeTopic.id] || !window.html2pdf) return;
    setIsPdfGenerating(true);
    
    const element = document.getElementById('tutorial-content');
    const opt = {
      margin: 10,
      filename: `${activeCourse.id}-${activeTopic.id}-${language}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: '#1a1a1a' },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    window.html2pdf().set(opt).from(element).save().then(() => {
      setIsPdfGenerating(false);
    });
  };

  const renderIcon = (iconName: string) => {
      const props = { className: "w-5 h-5" };
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

  const getTopicIcon = (catId: string) => {
      if (catId.includes('fund') || catId.includes('basic')) return <BookOpen />;
      if (catId.includes('sec') || catId.includes('guard')) return <Shield />;
      if (catId.includes('dev') || catId.includes('func') || catId.includes('ts')) return <Terminal />;
      if (catId.includes('data') || catId.includes('storage') || catId.includes('db')) return <Database />;
      if (catId.includes('ai') || catId.includes('ml') || catId.includes('robot')) return <Sparkles />;
      if (catId.includes('net') || catId.includes('conn')) return <Zap />;
      return <BookOpen />;
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

  const filteredCurriculum = useMemo(() => {
    // We map the active course curriculum to language
    const langCurriculum = activeCourse.curriculum.map(cat => ({
        ...cat,
        title: getTranslatedTitle(cat.title, cat.id),
        topics: cat.topics.map(t => ({
            ...t,
            title: getTranslatedTitle(t.title, t.id),
            description: getTranslatedDesc(t.description, t.id)
        }))
    }));

    if (!searchQuery) return langCurriculum;
    const lowerQ = searchQuery.toLowerCase();
    
    return langCurriculum.map(cat => ({
        ...cat,
        topics: cat.topics.filter(t => 
            t.title.toLowerCase().includes(lowerQ) || 
            t.description.toLowerCase().includes(lowerQ)
        )
    })).filter(cat => cat.topics.length > 0);
  }, [searchQuery, activeCourse, language]);

  const activeContent = activeTopic ? contentCache[activeTopic.id] : null;

  if (view === 'landing') {
      return (
          <>
            <LandingPage 
                onSelectCourse={handleSelectCourse} 
                language={language}
                setLanguage={setLanguage}
                onCreateCourse={() => setIsCreatorOpen(true)}
            />
            {/* Creator Modal (Also available in Landing) */}
            {isCreatorOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md animate-fadeIn" onClick={() => setIsCreatorOpen(false)}>
                    <div className="bg-[#1a1a1a] border border-[#333] rounded-2xl p-8 w-[600px] shadow-2xl relative" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                                <Sparkles className="text-purple-400" /> {t('createModalTitle')}
                            </h3>
                            <button onClick={() => setIsCreatorOpen(false)} className="text-gray-500 hover:text-white"><XCircle /></button>
                        </div>
                        
                        <div className="mb-6">
                            <textarea
                                value={creatorPrompt}
                                onChange={(e) => setCreatorPrompt(e.target.value)}
                                placeholder={t('createPlaceholder')}
                                className="w-full h-32 bg-[#121212] border border-[#333] rounded-lg p-4 text-white resize-none focus:outline-none focus:border-purple-500 transition-colors"
                            />
                        </div>

                        <div className="flex justify-end gap-3">
                            <button onClick={() => setIsCreatorOpen(false)} className="px-4 py-2 text-gray-400 hover:text-white transition-colors">
                                {t('close')}
                            </button>
                            <button 
                                onClick={handleCreateCourse}
                                disabled={isCreatingCourse || !creatorPrompt.trim()}
                                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-lg transition-all disabled:opacity-50 flex items-center gap-2"
                            >
                                {isCreatingCourse ? (
                                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> {t('creating')}</>
                                ) : (
                                    <>{t('createBtn')} <ChevronRight /></>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
          </>
      );
  }

  return (
    <div className="flex h-screen bg-[#0d0d0d] text-gray-100 overflow-hidden font-sans relative">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none z-0"></div>

      {/* Creator Modal (Also available in App View if needed via sidebar) */}
      {isCreatorOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md animate-fadeIn" onClick={() => setIsCreatorOpen(false)}>
                    <div className="bg-[#1a1a1a] border border-[#333] rounded-2xl p-8 w-[600px] shadow-2xl relative" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                                <Sparkles className="text-purple-400" /> {t('createModalTitle')}
                            </h3>
                            <button onClick={() => setIsCreatorOpen(false)} className="text-gray-500 hover:text-white"><XCircle /></button>
                        </div>
                        
                        <div className="mb-6">
                            <textarea
                                value={creatorPrompt}
                                onChange={(e) => setCreatorPrompt(e.target.value)}
                                placeholder={t('createPlaceholder')}
                                className="w-full h-32 bg-[#121212] border border-[#333] rounded-lg p-4 text-white resize-none focus:outline-none focus:border-purple-500 transition-colors"
                            />
                        </div>

                        <div className="flex justify-end gap-3">
                            <button onClick={() => setIsCreatorOpen(false)} className="px-4 py-2 text-gray-400 hover:text-white transition-colors">
                                {t('close')}
                            </button>
                            <button 
                                onClick={handleCreateCourse}
                                disabled={isCreatingCourse || !creatorPrompt.trim()}
                                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-lg transition-all disabled:opacity-50 flex items-center gap-2"
                            >
                                {isCreatingCourse ? (
                                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> {t('creating')}</>
                                ) : (
                                    <>{t('createBtn')} <ChevronRight /></>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
        )}


      {/* Settings Modal */}
      {isSettingsOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={() => setIsSettingsOpen(false)}>
              <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6 w-[400px] shadow-2xl relative" onClick={e => e.stopPropagation()}>
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Settings /> {t('settingsTitle')}
                  </h3>
                  <div className="space-y-3">
                      <div className="p-3 bg-[#252525] rounded-lg mb-4 flex items-center justify-between">
                          <span className="text-sm font-semibold">Language / Dil</span>
                          <div className="flex bg-[#121212] rounded p-1">
                              <button onClick={() => setLanguage('tr')} className={`px-3 py-1 rounded text-xs font-bold transition-all ${language === 'tr' ? 'bg-[#F38020] text-white' : 'text-gray-500'}`}>TR</button>
                              <button onClick={() => setLanguage('en')} className={`px-3 py-1 rounded text-xs font-bold transition-all ${language === 'en' ? 'bg-[#F38020] text-white' : 'text-gray-500'}`}>EN</button>
                          </div>
                      </div>

                      <button onClick={handleDownloadOffline} disabled={isPackagingOffline} className="w-full flex items-center justify-between p-3 bg-[#252525] hover:bg-[#2c2c2c] rounded-lg transition-colors text-left group">
                          <div>
                              <div className="text-sm font-semibold text-white group-hover:text-cf-orange flex items-center gap-2">
                                  {isPackagingOffline ? t('processing') : t('downloadOffline')}
                              </div>
                              <div className="text-xs text-gray-500">{t('downloadOfflineDesc')}</div>
                          </div>
                          {isPackagingOffline ? <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div> : <Download className="text-gray-500 group-hover:text-cf-orange" />}
                      </button>

                      <div className="flex items-center justify-between p-3 bg-[#1f1f1f] border border-[#333] rounded-lg mb-3">
                          <span className="text-sm font-bold text-gray-300 flex items-center gap-2">
                              <Microscope className={isBulkDeepDive ? "text-purple-400" : "text-gray-500"} /> 
                              {t('deepDive')}
                          </span>
                          <button 
                              onClick={() => setIsBulkDeepDive(!isBulkDeepDive)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isBulkDeepDive ? 'bg-purple-600' : 'bg-gray-700'}`}
                          >
                              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isBulkDeepDive ? 'translate-x-6' : 'translate-x-1'}`} />
                          </button>
                      </div>

                      <button onClick={handleRegenerateCategory} className="w-full flex items-center justify-between p-3 bg-[#252525] hover:bg-[#2c2c2c] rounded-lg transition-colors text-left group">
                          <div>
                              <div className="text-sm font-semibold text-white group-hover:text-cf-orange">{t('regenerateCat')}</div>
                              <div className="text-xs text-gray-500">{t('regenerateCatDesc')}</div>
                          </div>
                          <RefreshCw className="text-gray-500 group-hover:text-cf-orange" />
                      </button>
                      
                      {/* RED Destructive Action for Deep Research */}
                      <button onClick={handleRegenerateAll} className="w-full flex items-center justify-between p-3 bg-red-900/10 border border-red-900/30 hover:bg-red-900/30 rounded-lg transition-colors text-left group">
                          <div>
                              <div className="text-sm font-semibold text-red-400 group-hover:text-red-300">{t('regenerateAll')}</div>
                              <div className="text-xs text-gray-500">{t('regenerateAllDesc')}</div>
                          </div>
                          <Microscope className="text-red-500 group-hover:text-red-300" />
                      </button>

                      <hr className="border-[#333] my-2" />
                      <button onClick={handleResetProgress} className="w-full flex items-center justify-between p-3 bg-[#252525] hover:bg-red-900/20 rounded-lg transition-colors text-left group">
                          <div>
                              <div className="text-sm font-semibold text-white group-hover:text-red-400">{t('resetProgress')}</div>
                          </div>
                          <Trash className="text-gray-500 group-hover:text-red-400" />
                      </button>
                      <button onClick={handleResetCache} className="w-full flex items-center justify-between p-3 bg-[#252525] hover:bg-red-900/20 rounded-lg transition-colors text-left group">
                          <div>
                              <div className="text-sm font-semibold text-white group-hover:text-red-400">{t('factoryReset')}</div>
                          </div>
                          <XCircle className="text-gray-500 group-hover:text-red-400" />
                      </button>
                  </div>
                  <button onClick={() => setIsSettingsOpen(false)} className="mt-6 w-full py-2 bg-[#333] hover:bg-[#404040] rounded text-sm font-semibold">{t('close')}</button>
              </div>
          </div>
      )}

      {/* Toast Notifications */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <div key={toast.id} className={`pointer-events-auto min-w-[300px] bg-[#161616] border-l-4 p-4 rounded shadow-2xl animate-slideLeft relative overflow-hidden ${toast.type === 'success' ? 'border-green-500' : toast.type === 'error' ? 'border-red-500' : 'border-blue-500'}`}>
             <div className="flex justify-between items-start">
                <div>
                   <h4 className={`font-bold text-sm ${toast.type === 'success' ? 'text-green-500' : toast.type === 'error' ? 'text-red-500' : 'text-blue-500'}`}>{toast.title}</h4>
                   <p className="text-gray-300 text-xs mt-1">{toast.message}</p>
                </div>
                <button onClick={() => removeToast(toast.id)} className="text-gray-500 hover:text-white">x</button>
             </div>
          </div>
        ))}
      </div>

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 flex-shrink-0 bg-[#121212] border-r border-[#2c2c2c] flex flex-col z-10 relative shadow-2xl`}>
        
        {/* Course Selector Header */}
        <div className="relative border-b border-[#2c2c2c] bg-[#121212]">
             {/* Header Top Row with Language Switcher */}
             <div className="flex items-center justify-between px-2 pt-2">
                 <button 
                    onClick={() => setView('landing')}
                    className="flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold text-gray-500 hover:text-white transition-colors"
                 >
                    <Home className="w-3 h-3" /> {t('backToHome')}
                 </button>
                 <button 
                    onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
                    className="flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold text-gray-500 hover:text-white transition-colors"
                 >
                    <Globe className="w-3 h-3" /> {language.toUpperCase()}
                 </button>
             </div>

            <button 
                onClick={() => setIsCourseSelectorOpen(!isCourseSelectorOpen)}
                className="w-full p-6 flex items-center justify-between hover:bg-[#1a1a1a] transition-colors"
            >
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="text-cf-orange" style={{ color: activeCourse.themeColor }}>
                        {renderIcon(activeCourse.icon)}
                    </div>
                    <div className={`text-left ${!sidebarOpen && 'hidden'}`}>
                        <h1 className="font-bold text-lg tracking-tight text-white leading-none truncate w-40">{getTranslatedTitle(activeCourse.title, activeCourse.id)}</h1>
                        <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">MasterClass AI</span>
                    </div>
                </div>
                {sidebarOpen && <ChevronDown />}
            </button>

            {/* Course Dropdown */}
            {isCourseSelectorOpen && sidebarOpen && (
                <div className="absolute top-full left-0 w-full bg-[#1a1a1a] border-b border-[#2c2c2c] shadow-2xl z-50 animate-fadeIn max-h-[400px] overflow-y-auto">
                    {/* New Course Button in Dropdown */}
                    <button
                        onClick={() => {
                            setIsCreatorOpen(true);
                            setIsCourseSelectorOpen(false);
                        }}
                        className="w-full flex items-center gap-3 p-4 bg-[#1a1a1a] hover:bg-[#252525] border-b border-[#2c2c2c] transition-colors group"
                    >
                        <div className="w-8 h-8 rounded-full border border-dashed border-gray-500 group-hover:border-white flex items-center justify-center text-gray-500 group-hover:text-white">
                            <Plus className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                            <div className="text-sm font-bold text-white group-hover:text-purple-400">{t('createCourse')}</div>
                        </div>
                    </button>

                    <div>
                        {coursesState.map(course => (
                            <button
                                key={course.id}
                                onClick={() => {
                                    setActiveCourseId(course.id);
                                    setIsCourseSelectorOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 p-4 hover:bg-[#252525] transition-colors border-l-4 ${activeCourseId === course.id ? 'bg-[#202020] border-l-current' : 'border-l-transparent'}`}
                                style={{ borderLeftColor: activeCourseId === course.id ? course.themeColor : 'transparent' }}
                            >
                                <div style={{ color: course.themeColor }}>{renderIcon(course.icon)}</div>
                                <div className="text-left">
                                    <div className="text-sm font-bold text-white">{getTranslatedTitle(course.title, course.id)}</div>
                                    <div className="text-[10px] text-gray-500 truncate w-48">{getTranslatedDesc(course.description, course.id)}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>

        {/* Search */}
        <div className={`p-4 ${!sidebarOpen && 'hidden'}`}>
            <div className="relative">
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`${getTranslatedTitle(activeCourse.title, activeCourse.id)} ${t('searchPlaceholder')}`}
                    className="w-full bg-[#1f1f1f] border border-[#333] rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:ring-1 focus:outline-none transition-all"
                    style={{ '--tw-ring-color': activeCourse.themeColor } as any}
                />
                <svg className="absolute left-3 top-2.5 text-gray-500 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
        </div>

        {/* Queue Status */}
        {(processingQueue.length > 0 || activeRequests.length > 0) && sidebarOpen && (
            <div className="px-4 py-2 bg-[#1a1a1a] border-y border-[#2c2c2c] flex items-center justify-between text-xs">
               <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: activeCourse.themeColor }}></div>
                   <span className="text-gray-400">{t('processing')}: {activeRequests.length} / {t('queue')}: {processingQueue.length}</span>
               </div>
               <button onClick={handleClearQueue} className="text-red-400 hover:text-red-300 p-1"><XCircle /></button>
            </div>
        )}

        {/* Curriculum List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {filteredCurriculum.map((category) => (
            <div key={category.id} className="mb-2">
              <div 
                className={`flex items-center gap-3 text-sm px-3 py-2 rounded-lg cursor-pointer transition-colors group ${activeCategory === category.id ? 'text-white bg-[#2c2c2c]' : 'text-gray-400 hover:text-white hover:bg-[#1f1f1f]'}`}
                onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
              >
                <span style={{ color: activeCategory === category.id ? activeCourse.themeColor : '#6b7280' }}>
                   {getTopicIcon(category.id)}
                </span>
                <span className={`font-bold uppercase tracking-wide text-xs flex-1 ${!sidebarOpen && 'hidden'}`}>{category.title}</span>
                
                {sidebarOpen && (
                    <button 
                      onClick={(e) => handleExpandCurriculum(e, category.id)}
                      disabled={expandingCategories.includes(category.id)}
                      className={`opacity-0 group-hover:opacity-100 p-1 hover:bg-[#363636] rounded transition-all text-xs flex items-center gap-1 ${expandingCategories.includes(category.id) ? 'opacity-100' : ''}`}
                      title={t('missingTopics')}
                      style={{ color: activeCourse.themeColor }}
                    >
                      {expandingCategories.includes(category.id) ? (
                        <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Wand />
                      )}
                    </button>
                )}

                {sidebarOpen && <ChevronRight />}
              </div>
              
              {activeCategory === category.id && sidebarOpen && (
                <div className="mt-2 space-y-1 ml-4 border-l border-[#2c2c2c] pl-2 animate-fadeIn">
                  {category.topics.map((topic) => {
                    const isCompleted = completedTopics.includes(topic.id);
                    const isActive = activeTopic?.id === topic.id;
                    const isProcessing = isTopicProcessing(topic.id);
                    const isQueued = isTopicQueued(topic.id);
                    
                    const cached = contentCache[topic.id];
                    const isCached = !!cached;
                    
                    // Logic to visualize if cached content matches current language
                    const isLangMatch = isCached && (cached.language === language || (!cached.language && language === 'tr'));

                    return (
                      <button
                        key={topic.id}
                        onClick={() => handleTopicClick(topic)}
                        className={`w-full text-left px-3 py-2.5 rounded-md text-sm transition-all duration-200 group relative flex items-start gap-3
                          ${isActive ? 'bg-opacity-10 border-r-2' : 'text-gray-400 hover:bg-[#1f1f1f] hover:text-white'}`}
                        style={isActive ? { backgroundColor: `${activeCourse.themeColor}1A`, color: activeCourse.themeColor, borderColor: activeCourse.themeColor } : {}}
                      >
                        <div className="mt-1 flex-shrink-0">
                           {isProcessing ? (
                               <div className="w-2 h-2 rounded-full border border-t-transparent animate-spin" style={{ borderColor: activeCourse.themeColor }}></div>
                           ) : isQueued ? (
                               <div className="w-2 h-2 rounded-full bg-gray-600 animate-pulse"></div>
                           ) : (
                                <div className={`w-2 h-2 rounded-full transition-colors duration-300
                                    ${isCompleted ? 'bg-green-500' : 
                                    (isCached && !isLangMatch) ? 'bg-yellow-500' : // Content exists but wrong language
                                    isCached ? 'bg-blue-500/50' : 'bg-[#363636]'}`}>
                                </div>
                           )}
                        </div>
                        <div className={`font-medium truncate flex-1 ${isCompleted && !isActive ? 'line-through opacity-50' : ''}`}>{topic.title}</div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Settings Footer */}
        <div className="p-4 border-t border-[#2c2c2c] bg-[#121212]">
            <button onClick={() => setIsSettingsOpen(true)} className={`flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-[#1f1f1f] rounded-lg transition-colors ${!sidebarOpen && 'justify-center'}`}>
                <Settings />
                {sidebarOpen && <span>{t('settingsBtn')}</span>}
            </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Top Bar */}
        <div className="h-16 border-b border-[#2c2c2c] flex items-center justify-between px-6 bg-[#0d0d0d]/80 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-[#2c2c2c] rounded-md text-gray-400">
               <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
            </button>
            {activeTopic && (
               <div className="flex flex-col animate-fadeIn">
                  <span className="text-xs text-gray-500 font-mono uppercase" style={{ color: activeCourse.themeColor }}>{getTranslatedTitle(activeCourse.title, activeCourse.id)}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white truncate max-w-[300px]">{getTranslatedTitle(activeTopic.title, activeTopic.id)}</span>
                    {(isTopicProcessing(activeTopic.id) || isTopicQueued(activeTopic.id)) && (
                        <span className="text-xs animate-pulse border px-1 rounded" style={{ borderColor: activeCourse.themeColor, color: activeCourse.themeColor }}>
                            {isTopicProcessing(activeTopic.id) ? t('processing') : t('queue')}
                        </span>
                    )}
                  </div>
               </div>
            )}
            {!activeTopic && (
               <div className="flex flex-col animate-fadeIn">
                   <span className="text-sm font-bold text-white">Course Overview</span>
                   <span className="text-xs text-gray-500">{getTranslatedTitle(activeCourse.title, activeCourse.id)}</span>
               </div>
            )}
          </div>
          
          <div className="flex items-center gap-3">
             {activeContent && (
                <>
                   {/* Deep Dive Button */}
                   <button 
                    onClick={() => activeTopic && handleRegenerate(activeTopic, true)}
                    disabled={activeTopic && (isTopicProcessing(activeTopic.id) || isTopicQueued(activeTopic.id))}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-purple-400 border border-purple-900 bg-purple-900/10 hover:bg-purple-900/30 rounded transition-all disabled:opacity-50"
                  >
                    <Microscope />
                    {t('deepDive')}
                  </button>

                   <button 
                    onClick={() => activeTopic && handleRegenerate(activeTopic, false)}
                    disabled={activeTopic && (isTopicProcessing(activeTopic.id) || isTopicQueued(activeTopic.id))}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-gray-400 hover:text-white hover:bg-[#2c2c2c] rounded transition-all disabled:opacity-50"
                  >
                    <RefreshCw className={`${activeTopic && isTopicProcessing(activeTopic.id) ? 'animate-spin' : ''}`} />
                    {t('refresh')}
                  </button>
                  <button onClick={downloadPDF} disabled={isPdfGenerating} className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-300 bg-[#1f1f1f] border border-[#363636] rounded hover:bg-[#2c2c2c]">
                    {isPdfGenerating ? '...' : t('downloadPdf')}
                  </button>
                  <button 
                    onClick={() => activeTopic && toggleComplete(activeTopic.id)}
                    className={`flex items-center gap-2 px-4 py-2 text-xs font-bold border rounded transition-all
                      ${activeTopic && completedTopics.includes(activeTopic.id) 
                        ? 'bg-green-900/20 text-green-400 border-green-800' 
                        : 'text-white border-transparent'}`}
                    style={!(activeTopic && completedTopics.includes(activeTopic.id)) ? { backgroundColor: activeCourse.themeColor } : {}}
                  >
                    {activeTopic && completedTopics.includes(activeTopic.id) ? t('completed') : t('complete')}
                  </button>
                </>
             )}
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto relative">
          {!activeTopic && (
             <div className="p-8 md:p-12 animate-fadeIn max-w-7xl mx-auto w-full">
                {/* Course Header Hero */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-16 border-b border-[#2c2c2c] pb-10">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-[#1a1a1a] rounded-2xl flex items-center justify-center border border-[#333] shadow-2xl flex-shrink-0" style={{ color: activeCourse.themeColor, boxShadow: `0 0 30px ${activeCourse.themeColor}10` }}>
                        {renderIcon(activeCourse.icon)}
                    </div>
                    <div className="text-center md:text-left">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
                            {getTranslatedTitle(activeCourse.title, activeCourse.id)}
                        </h2>
                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
                            {getTranslatedDesc(activeCourse.description, activeCourse.id)}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                             <div className="px-3 py-1 bg-[#1a1a1a] border border-[#333] rounded-full text-xs text-gray-500 font-bold uppercase tracking-wider">
                                {filteredCurriculum.reduce((acc, cat) => acc + cat.topics.length, 0)} {t('completed').replace('TAMAMLANDI', 'TOPICS').replace('COMPLETED', 'TOPICS')}
                             </div>
                             <div className="px-3 py-1 bg-[#1a1a1a] border border-[#333] rounded-full text-xs text-gray-500 font-bold uppercase tracking-wider">
                                {filteredCurriculum.length} MODULES
                             </div>
                        </div>
                    </div>
                </div>

                {/* Grid Curriculum Display */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCurriculum.map((cat, idx) => (
                        <div key={cat.id} className="group flex flex-col h-full bg-[#161616] border border-[#2c2c2c] rounded-xl overflow-hidden hover:border-gray-500 transition-colors">
                            <div className="p-4 border-b border-[#2c2c2c] bg-[#1a1a1a] flex items-center gap-3">
                                <span style={{ color: activeCourse.themeColor }}>{getTopicIcon(cat.id)}</span>
                                <h3 className="font-bold text-white text-sm uppercase tracking-wide">{cat.title}</h3>
                            </div>
                            <div className="p-4 flex-1 flex flex-col gap-2">
                                {cat.topics.map((t) => (
                                    <button 
                                        key={t.id}
                                        onClick={() => handleTopicClick(t)}
                                        className="w-full text-left p-3 rounded hover:bg-[#252525] transition-colors flex items-start gap-3 group/topic"
                                    >
                                        <div className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${completedTopics.includes(t.id) ? 'bg-green-500' : 'bg-gray-600 group-hover/topic:bg-white'}`}></div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-300 group-hover/topic:text-white transition-colors">
                                                {t.title}
                                            </div>
                                            <div className="text-[10px] text-gray-500 line-clamp-1 mt-0.5">
                                                {t.description}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                            <div className="p-3 bg-[#131313] border-t border-[#2c2c2c] text-center">
                                <button 
                                    onClick={(e) => handleExpandCurriculum(e, cat.id)}
                                    className="text-xs font-bold flex items-center justify-center gap-2 hover:opacity-80 transition-opacity w-full py-1"
                                    style={{ color: activeCourse.themeColor }}
                                >
                                    <Wand className="w-3 h-3" /> {t('missingTopics')}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
          )}

          {activeTopic && !activeContent && (isTopicProcessing(activeTopic.id) || isTopicQueued(activeTopic.id)) && (
            <div className="max-w-4xl mx-auto p-12 space-y-8 animate-fadeIn flex flex-col items-center justify-center h-full">
              <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-[#333] border-t-transparent animate-spin" style={{ borderTopColor: activeCourse.themeColor }}></div>
              </div>
              <div className="text-center">
                  <span className="text-xl font-mono block mb-2" style={{ color: activeCourse.themeColor }}>{isTopicProcessing(activeTopic.id) ? t('processing') + '...' : t('queue') + '...'}</span>
              </div>
            </div>
          )}

          {activeContent && (
            <div className="p-8 md:p-12 pb-32 animate-slideUp">
              <div id="tutorial-content" className="max-w-4xl mx-auto bg-[#161616] p-10 rounded-2xl border border-[#2c2c2c] shadow-2xl relative pdf-content">
                 <div className="absolute top-0 right-0 p-6 opacity-20" style={{ color: activeCourse.themeColor }}>
                    {renderIcon(activeCourse.icon)}
                 </div>
                 <div className="mb-6 flex items-center gap-3">
                    <span className="px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-gray-800 text-gray-300 border border-gray-700">
                      {activeTopic?.level}
                    </span>
                    {activeContent.language && (
                         <span className="px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-gray-800 text-gray-300 border border-gray-700">
                            {activeContent.language}
                        </span>
                    )}
                 </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 pb-6 border-b border-[#2c2c2c] leading-tight">
                  {activeContent.title}
                </h1>
                <div className="prose prose-invert prose-headings:text-white prose-p:text-gray-300 max-w-none">
                   <MarkdownRenderer content={activeContent.content} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <ChatBubble 
        messages={chatMessages}
        onSendMessage={handleChat}
        isLoading={isChatLoading}
        language={language}
        t={t}
      />
    </div>
  );
};

export default App;
