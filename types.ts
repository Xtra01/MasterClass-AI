
export enum ContentType {
  TUTORIAL = 'TUTORIAL',
  DEEP_DIVE = 'DEEP_DIVE',
  CONFIG_GENERATOR = 'CONFIG_GENERATOR'
}

export type Language = 'tr' | 'en';

export interface Topic {
  id: string;
  title: string;
  description: string;
  icon?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Category {
  id: string;
  title: string;
  topics: Topic[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string; // Icon component name
  curriculum: Category[];
  themeColor: string; // Hex color for branding
}

export interface GeneratedContent {
  title: string;
  content: string; // Markdown formatted string
  relatedTopics: string[];
  language?: Language;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export type ContentCache = Record<string, GeneratedContent>;
