'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'en' | 'zh'

interface LanguageContextType {
  lang: Language
  t: (key: string) => string
  toggleLanguage: () => void
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    heroTitle: 'Discover How People',
    heroTitleHighlight: 'Make Money',
    heroTitleWith: 'with',
    heroSubtitle: 'Real cases, proven solutions, updated daily',
    cases: 'Cases',
    solutions: 'Solutions',
    industries: 'Industries',
    browseCTA: 'Browse Cases & Solutions',
    searchPlaceholder: 'Search cases & solutions...',
    tags: 'Tags',
    about: 'About',
    all: 'All',
    filterCases: 'Cases',
    filterSolutions: 'Solutions',
    posts: 'posts',
    post: 'post',
    noResults: 'No posts found for this filter.',
    searchResults: 'Search results for',
    clear: 'Clear',
    backToAll: '\u2190 Back to all posts',
    replicability: 'Replicability',
    viewSource: 'View original source \u2192',
    perMonth: '/mo',
    by: 'by',
    // Industries
    ecommerce: 'E-commerce',
    saas: 'SaaS',
    content: 'Content',
    marketing: 'Marketing',
    education: 'Education',
    realEstate: 'Real Estate',
    legal: 'Legal',
    hr: 'HR',
    finance: 'Finance',
    dataAnalysis: 'Data Analysis',
    developerTools: 'Developer Tools',
    foodService: 'Food Service',
    healthcare: 'Healthcare',
    // Footer
    explore: 'Explore',
    allCases: 'All Cases',
    browseTags: 'Browse Tags',
    community: 'Community',
    submitCase: 'Submit a Case',
    footerDesc: 'Real-world cases and scene solutions for building with OpenClaw AI agents.',
    copyright: 'OpenClaw How. All rights reserved.',
    // About
    aboutTitle: 'About OpenClaw How',
    byTheNumbers: 'By the Numbers',
    whatYouFind: 'What You Will Find Here',
    howWeSource: 'How We Source Content',
    submitYourStory: 'Submit Your Story',
    caseStudy: 'Case Study',
    sceneSolution: 'Scene Solution',
    // About page content
    aboutIntro: 'OpenClaw How is a community-driven platform that collects and showcases real-world cases and ready-to-use scene solutions built with OpenClaw AI agents. We believe the best way to learn is from real examples with real numbers.',
    caseStudies: 'Case Studies',
    aboutCaseDesc: 'Real stories from makers who used OpenClaw to automate workflows, build SaaS products, grow social media, and generate revenue. Each case includes income data, replicability ratings, and the tools used.',
    sceneSolutions: 'Scene Solutions',
    aboutSceneDesc: 'Ready-to-deploy blueprints for common business scenarios like customer service automation, content creation workflows, and developer tool integrations.',
    discovery: 'Discovery',
    discoveryDesc: 'We scan community forums, social media, indie hacker platforms, and open-source projects for real-world OpenClaw success stories.',
    verification: 'Verification',
    verificationDesc: 'Every case is verified for accuracy. We cross-reference income claims, check tool usage, and confirm the workflow is real and reproducible.',
    writeUp: 'Write-Up',
    writeUpDesc: 'Cases are written up with clear structure: the business model, automation pipeline, tools used, results, and a replicability rating so you know what to expect.',
    communityReview: 'Community Review',
    communityReviewDesc: 'Published cases are open for community feedback. Readers can suggest corrections, share their own results, or add follow-up context.',
    submitYourStoryDesc: 'Have a success story or a useful workflow? We would love to feature it. Help the community learn from your experience.',
    submitViaGithub: 'Submit via GitHub',
    contact: 'Contact',
    contactText: 'Reach out on',
    contactOr: 'or open an issue on',
    topics: 'Topics',
    allTags: 'All Tags',
    browseTagsCount: 'tags across all cases and solutions.',
    noTags: 'No tags found.',
    postsTaggedWith: 'posts tagged with',
    postTaggedWith: 'post tagged with',
    noPostsTag: 'No posts found with this tag.',
    allPosts: 'All Posts',
    noPostsIndustry: 'No posts found for this industry yet.',
    case_singular: 'Case',
    cases_plural: 'Cases',
    solution_singular: 'Solution',
    solutions_plural: 'Solutions',
  },
  zh: {
    heroTitle: '\u53d1\u73b0\u4eba\u4eec\u5982\u4f55\u7528',
    heroTitleHighlight: 'AI\u8d5a\u94b1',
    heroTitleWith: '\u901a\u8fc7',
    heroSubtitle: '\u771f\u5b9e\u6848\u4f8b\uff0c\u5b9e\u7528\u65b9\u6848\uff0c\u6bcf\u65e5\u66f4\u65b0',
    cases: '\u6848\u4f8b',
    solutions: '\u65b9\u6848',
    industries: '\u884c\u4e1a',
    browseCTA: '\u6d4f\u89c8\u6848\u4f8b\u548c\u65b9\u6848',
    searchPlaceholder: '\u641c\u7d22\u6848\u4f8b\u548c\u65b9\u6848...',
    tags: '\u6807\u7b7e',
    about: '\u5173\u4e8e',
    all: '\u5168\u90e8',
    filterCases: '\u6848\u4f8b',
    filterSolutions: '\u65b9\u6848',
    posts: '\u7bc7',
    post: '\u7bc7',
    noResults: '\u6ca1\u6709\u627e\u5230\u5339\u914d\u7684\u5185\u5bb9\u3002',
    searchResults: '\u641c\u7d22\u7ed3\u679c\uff1a',
    clear: '\u6e05\u9664',
    backToAll: '\u2190 \u8fd4\u56de\u5168\u90e8',
    replicability: '\u53ef\u590d\u5236\u6307\u6570',
    viewSource: '\u67e5\u770b\u539f\u6587 \u2192',
    perMonth: '/\u6708',
    by: '\u4f5c\u8005\uff1a',
    ecommerce: '\u7535\u5546',
    saas: 'SaaS',
    content: '\u5185\u5bb9\u521b\u4f5c',
    marketing: '\u8425\u9500',
    education: '\u6559\u80b2',
    realEstate: '\u623f\u5730\u4ea7',
    legal: '\u6cd5\u5f8b',
    hr: '\u4eba\u529b\u8d44\u6e90',
    finance: '\u91d1\u878d',
    dataAnalysis: '\u6570\u636e\u5206\u6790',
    developerTools: '\u5f00\u53d1\u5de5\u5177',
    foodService: '\u9910\u996e',
    healthcare: '\u533b\u7597',
    explore: '\u63a2\u7d22',
    allCases: '\u5168\u90e8\u6848\u4f8b',
    browseTags: '\u6d4f\u89c8\u6807\u7b7e',
    community: '\u793e\u533a',
    submitCase: '\u63d0\u4ea4\u6848\u4f8b',
    footerDesc: 'OpenClaw AI\u667a\u80fd\u4f53\u7684\u771f\u5b9e\u6848\u4f8b\u548c\u573a\u666f\u5316\u89e3\u51b3\u65b9\u6848\u5e73\u53f0\u3002',
    copyright: 'OpenClaw How \u7248\u6743\u6240\u6709',
    aboutTitle: '\u5173\u4e8e OpenClaw How',
    byTheNumbers: '\u6570\u636e\u6982\u89c8',
    whatYouFind: '\u4f60\u80fd\u5728\u8fd9\u91cc\u627e\u5230\u4ec0\u4e48',
    howWeSource: '\u5185\u5bb9\u6765\u6e90',
    submitYourStory: '\u63d0\u4ea4\u4f60\u7684\u6545\u4e8b',
    caseStudy: '\u5b9e\u6218\u6848\u4f8b',
    sceneSolution: '\u573a\u666f\u65b9\u6848',
    // About page content
    aboutIntro: 'OpenClaw How \u662f\u4e00\u4e2a\u793e\u533a\u9a71\u52a8\u7684\u5e73\u53f0\uff0c\u6536\u96c6\u548c\u5c55\u793a\u4f7f\u7528 OpenClaw AI \u667a\u80fd\u4f53\u6784\u5efa\u7684\u771f\u5b9e\u6848\u4f8b\u548c\u5f00\u7bb1\u5373\u7528\u7684\u573a\u666f\u89e3\u51b3\u65b9\u6848\u3002\u6211\u4eec\u76f8\u4fe1\uff0c\u5b66\u4e60\u7684\u6700\u4f73\u65b9\u5f0f\u662f\u4ece\u771f\u5b9e\u7684\u6848\u4f8b\u548c\u771f\u5b9e\u7684\u6570\u636e\u4e2d\u5b66\u4e60\u3002',
    caseStudies: '\u5b9e\u6218\u6848\u4f8b',
    aboutCaseDesc: '\u6765\u81ea\u521b\u4f5c\u8005\u7684\u771f\u5b9e\u6545\u4e8b\uff0c\u4ed6\u4eec\u4f7f\u7528 OpenClaw \u81ea\u52a8\u5316\u5de5\u4f5c\u6d41\u3001\u6784\u5efa SaaS \u4ea7\u54c1\u3001\u589e\u957f\u793e\u4ea4\u5a92\u4f53\u5e76\u521b\u9020\u6536\u5165\u3002\u6bcf\u4e2a\u6848\u4f8b\u90fd\u5305\u542b\u6536\u5165\u6570\u636e\u3001\u53ef\u590d\u5236\u6307\u6570\u548c\u4f7f\u7528\u7684\u5de5\u5177\u3002',
    sceneSolutions: '\u573a\u666f\u65b9\u6848',
    aboutSceneDesc: '\u9488\u5bf9\u5ba2\u6237\u670d\u52a1\u81ea\u52a8\u5316\u3001\u5185\u5bb9\u521b\u4f5c\u5de5\u4f5c\u6d41\u548c\u5f00\u53d1\u5de5\u5177\u96c6\u6210\u7b49\u5e38\u89c1\u4e1a\u52a1\u573a\u666f\u7684\u5f00\u7bb1\u5373\u7528\u84dd\u56fe\u3002',
    discovery: '\u53d1\u73b0',
    discoveryDesc: '\u6211\u4eec\u626b\u63cf\u793e\u533a\u8bba\u575b\u3001\u793e\u4ea4\u5a92\u4f53\u3001\u72ec\u7acb\u5f00\u53d1\u8005\u5e73\u53f0\u548c\u5f00\u6e90\u9879\u76ee\uff0c\u5bfb\u627e\u771f\u5b9e\u7684 OpenClaw \u6210\u529f\u6848\u4f8b\u3002',
    verification: '\u9a8c\u8bc1',
    verificationDesc: '\u6bcf\u4e2a\u6848\u4f8b\u90fd\u7ecf\u8fc7\u51c6\u786e\u6027\u9a8c\u8bc1\u3002\u6211\u4eec\u4ea4\u53c9\u6838\u5b9e\u6536\u5165\u58f0\u660e\uff0c\u68c0\u67e5\u5de5\u5177\u4f7f\u7528\u60c5\u51b5\uff0c\u5e76\u786e\u8ba4\u5de5\u4f5c\u6d41\u662f\u771f\u5b9e\u4e14\u53ef\u590d\u5236\u7684\u3002',
    writeUp: '\u64b0\u5199',
    writeUpDesc: '\u6848\u4f8b\u4ee5\u6e05\u6670\u7684\u7ed3\u6784\u64b0\u5199\uff1a\u5546\u4e1a\u6a21\u5f0f\u3001\u81ea\u52a8\u5316\u6d41\u7a0b\u3001\u4f7f\u7528\u5de5\u5177\u3001\u7ed3\u679c\u4ee5\u53ca\u53ef\u590d\u5236\u6307\u6570\uff0c\u8ba9\u4f60\u77e5\u9053\u53ef\u4ee5\u671f\u5f85\u4ec0\u4e48\u3002',
    communityReview: '\u793e\u533a\u8bc4\u5ba1',
    communityReviewDesc: '\u53d1\u5e03\u7684\u6848\u4f8b\u63a5\u53d7\u793e\u533a\u53cd\u9988\u3002\u8bfb\u8005\u53ef\u4ee5\u63d0\u51fa\u4fee\u6b63\u5efa\u8bae\u3001\u5206\u4eab\u81ea\u5df1\u7684\u7ed3\u679c\u6216\u6dfb\u52a0\u540e\u7eed\u4e0a\u4e0b\u6587\u3002',
    submitYourStoryDesc: '\u6709\u6210\u529f\u6848\u4f8b\u6216\u5b9e\u7528\u7684\u5de5\u4f5c\u6d41\uff1f\u6211\u4eec\u5f88\u4e50\u610f\u5c55\u793a\u5b83\u3002\u5e2e\u52a9\u793e\u533a\u4ece\u4f60\u7684\u7ecf\u9a8c\u4e2d\u5b66\u4e60\u3002',
    submitViaGithub: '\u901a\u8fc7 GitHub \u63d0\u4ea4',
    contact: '\u8054\u7cfb\u6211\u4eec',
    contactText: '\u5728',
    contactOr: '\u4e0a\u8054\u7cfb\u6211\u4eec\uff0c\u6216\u5728',
    topics: '\u4e3b\u9898',
    allTags: '\u5168\u90e8\u6807\u7b7e',
    browseTagsCount: '\u4e2a\u6807\u7b7e\u6db5\u76d6\u6240\u6709\u6848\u4f8b\u548c\u65b9\u6848\u3002',
    noTags: '\u6682\u65e0\u6807\u7b7e\u3002',
    postsTaggedWith: '\u7bc7\u5185\u5bb9\u6807\u8bb0\u4e3a',
    postTaggedWith: '\u7bc7\u5185\u5bb9\u6807\u8bb0\u4e3a',
    noPostsTag: '\u6682\u65e0\u6b64\u6807\u7b7e\u7684\u5185\u5bb9\u3002',
    allPosts: '\u5168\u90e8\u5185\u5bb9',
    noPostsIndustry: '\u8be5\u884c\u4e1a\u6682\u65e0\u5185\u5bb9\u3002',
    case_singular: 'Case',
    cases_plural: '\u6848\u4f8b',
    solution_singular: 'Solution',
    solutions_plural: '\u65b9\u6848',
  },
}

// Map industry slugs to translation keys
const industryKeyMap: Record<string, string> = {
  'all': 'all',
  'ecommerce': 'ecommerce',
  'saas': 'saas',
  'content': 'content',
  'marketing': 'marketing',
  'education': 'education',
  'real-estate': 'realEstate',
  'legal': 'legal',
  'hr': 'hr',
  'finance': 'finance',
  'data-analysis': 'dataAnalysis',
  'developer-tools': 'developerTools',
  'food-service': 'foodService',
  'healthcare': 'healthcare',
  'human-resources': 'hr',
  'social-media': 'marketing',
  'developer': 'developerTools',
}

export function getIndustryTranslationKey(slug: string): string {
  return industryKeyMap[slug] || slug
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'zh',
  t: (key: string) => key,
  toggleLanguage: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('zh')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('openclaw-lang') as Language | null
    if (stored && (stored === 'en' || stored === 'zh')) {
      setLang(stored)
    }
    setMounted(true)
  }, [])

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'zh' : 'en'
    setLang(newLang)
    localStorage.setItem('openclaw-lang', newLang)
  }

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations['en']?.[key] || key
  }

  // Avoid hydration mismatch by rendering with default until mounted
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ lang: 'zh', t: (key) => translations['zh']?.[key] || translations['en']?.[key] || key, toggleLanguage }}>
        {children}
      </LanguageContext.Provider>
    )
  }

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
