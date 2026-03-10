'use client'

import Link from 'next/link'
import { useLanguage, getIndustryTranslationKey } from '@/lib/i18n'

export function PostTypeLabel({ isCase }: { isCase: boolean }) {
  const { t } = useLanguage()
  return <>{isCase ? t('caseStudy') : t('sceneSolution')}</>
}

export function IndustryLabel({ industry }: { industry: string }) {
  const { t } = useLanguage()
  const key = getIndustryTranslationKey(industry)
  return <>{t(key)}</>
}

export function ReadingTimeLabel({ minutes }: { minutes: number }) {
  const { lang } = useLanguage()
  return <>{lang === 'zh' ? `${minutes} \u5206\u949f\u9605\u8bfb` : `${minutes} min read`}</>
}

export function MoreFromIndustry({ industry }: { industry: string }) {
  const { lang, t } = useLanguage()
  const key = getIndustryTranslationKey(industry)
  const name = t(key)
  return <>{lang === 'zh' ? `${name}\u7684\u66f4\u591a\u5185\u5bb9` : `More from ${name}`}</>
}

export function RelatedPostCard({ slug, title, titleZh, type, income }: { slug: string; title: string; titleZh: string; type: string; income?: number }) {
  const { lang, t } = useLanguage()
  const isCase = type === 'case'
  const displayTitle = lang === 'zh' && titleZh ? titleZh : title

  return (
    <Link
      href={`/posts/${slug}`}
      className="block bg-white rounded-lg p-4 border border-gray-100 hover:border-teal hover:shadow-sm transition-all"
    >
      <span
        className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2 ${
          isCase ? 'bg-accent/10 text-accent' : 'bg-teal/10 text-teal'
        }`}
      >
        {isCase ? t('caseStudy') : t('sceneSolution')}
      </span>
      <h3 className="text-sm font-semibold text-primary leading-snug line-clamp-2">
        {displayTitle}
      </h3>
      {income && income > 0 && (
        <p className="text-xs text-accent font-semibold mt-1">
          ${income.toLocaleString()}{t('perMonth')}
        </p>
      )}
    </Link>
  )
}

export function PostTitleDisplay({ title, titleZh }: { title: string; titleZh?: string }) {
  const { lang } = useLanguage()

  if (lang === 'zh' && titleZh) {
    return (
      <>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-2 leading-tight">
          {titleZh}
        </h1>
        <p className="text-lg text-gray-500 mb-6">{title}</p>
      </>
    )
  }

  return (
    <>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-2 leading-tight">
        {title}
      </h1>
      {titleZh && (
        <p className="text-lg text-gray-500 mb-6">{titleZh}</p>
      )}
    </>
  )
}

export function PostMetaBar({ income, person, replicability }: { income?: number; person?: string; replicability?: number }) {
  const { t } = useLanguage()

  return (
    <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-gray-200">
      {income && income > 0 && (
        <div>
          <span className="text-3xl font-extrabold text-accent">
            ${income.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500 ml-1">{t('perMonth')}</span>
        </div>
      )}
      {person && (
        <span className="text-sm text-gray-600">{t('by')} {person}</span>
      )}
      {replicability && (
        <span className="text-sm text-gray-500">
          {t('replicability')}: {replicability}/5
        </span>
      )}
    </div>
  )
}

export function PostSourceLink({ source }: { source: string }) {
  const { t } = useLanguage()

  return (
    <a
      href={source}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-teal hover:underline"
    >
      {t('viewSource')}
    </a>
  )
}

export function BackToAllLink() {
  const { t } = useLanguage()

  return (
    <>
      {t('backToAll')}
    </>
  )
}

export function RelatedPostLabel({ isCase }: { isCase: boolean }) {
  const { t } = useLanguage()
  return <>{isCase ? t('caseStudy') : t('sceneSolution')}</>
}

export function PostContent({ htmlEn, htmlZh }: { htmlEn: string; htmlZh: string }) {
  const { lang } = useLanguage()
  const html = lang === 'zh' && htmlZh ? htmlZh : htmlEn
  return <article className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
}

// --- New components ---

interface StructuredInfoBoxProps {
  model?: string
  difficulty?: 'low' | 'medium' | 'high'
  teamSize?: string
  timeframe?: string
  targetAudience?: string
  sourceType?: string
  verified?: boolean
}

function getModelLabel(model: string, t: (key: string) => string): string {
  const map: Record<string, string> = {
    service: t('modelService'),
    saas: t('modelSaas'),
    content: t('modelContent'),
    agency: t('modelAgency'),
    automation: t('modelAutomation'),
  }
  return map[model] || model
}

function getDifficultyLabel(difficulty: string, t: (key: string) => string): { label: string; emoji: string } {
  const map: Record<string, { label: string; emoji: string }> = {
    low: { label: t('difficultyBadgeLow'), emoji: '\ud83d\udfe2' },
    medium: { label: t('difficultyBadgeMedium'), emoji: '\ud83d\udfe1' },
    high: { label: t('difficultyBadgeHigh'), emoji: '\ud83d\udd34' },
  }
  return map[difficulty] || { label: difficulty, emoji: '' }
}

function getSourceTypeLabel(sourceType: string, t: (key: string) => string): string {
  const map: Record<string, string> = {
    interview: t('sourceInterview'),
    'user-submitted': t('sourceUserSubmitted'),
    'public-post': t('sourcePublicCase'),
    blog: t('sourceBlog'),
    video: t('sourceVideo'),
  }
  return map[sourceType] || sourceType
}

function getTargetLabel(target: string, t: (key: string) => string): string {
  const map: Record<string, string> = {
    solo: t('targetSolo'),
    'small-team': t('targetSmallTeam'),
    enterprise: t('targetEnterprise'),
  }
  return map[target] || target
}

export function StructuredInfoBox({
  model,
  difficulty,
  teamSize,
  timeframe,
  targetAudience,
  sourceType,
  verified,
}: StructuredInfoBoxProps) {
  const { t } = useLanguage()

  const hasAnyField = model || difficulty || teamSize || timeframe || targetAudience || sourceType || verified !== undefined
  if (!hasAnyField) return null

  const items: { label: string; value: string }[] = []

  if (model) {
    items.push({ label: t('infoModel'), value: getModelLabel(model, t) })
  }
  if (difficulty) {
    const d = getDifficultyLabel(difficulty, t)
    items.push({ label: t('infoDifficulty'), value: `${d.emoji} ${d.label}` })
  }
  if (teamSize) {
    items.push({ label: t('infoTeamSize'), value: teamSize })
  }
  if (timeframe) {
    items.push({ label: t('infoTimeframe'), value: timeframe })
  }
  if (targetAudience) {
    items.push({ label: t('infoTargetAudience'), value: getTargetLabel(targetAudience, t) })
  }
  if (sourceType) {
    items.push({ label: t('infoSourceType'), value: getSourceTypeLabel(sourceType, t) })
  }
  if (verified !== undefined) {
    items.push({
      label: t('infoVerified'),
      value: verified ? `\u2705 ${t('infoVerifiedYes')}` : t('infoVerifiedNo'),
    })
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
        {items.map((item) => (
          <div key={item.label}>
            <span className="text-xs text-gray-400 block">{item.label}</span>
            <span className="text-sm font-semibold text-primary">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

interface ReplicateSectionProps {
  targetAudience?: string
  tool?: string
  difficulty?: 'low' | 'medium' | 'high'
  timeframe?: string
}

export function ReplicateSection({ targetAudience, tool, difficulty, timeframe }: ReplicateSectionProps) {
  const { t } = useLanguage()

  const hasAnyField = targetAudience || tool || difficulty || timeframe
  if (!hasAnyField) return null

  return (
    <div className="mt-10 pt-8 border-t border-gray-200">
      <h2 className="text-xl font-bold text-primary mb-4">{t('howToReplicate')}</h2>
      <div className="bg-teal/5 border border-teal/20 rounded-xl p-6 space-y-4">
        {targetAudience && (
          <div>
            <h3 className="text-sm font-semibold text-primary mb-1">{t('replicateSuitableFor')}</h3>
            <p className="text-sm text-gray-600">{getTargetLabel(targetAudience, t)}</p>
          </div>
        )}
        <div>
          <h3 className="text-sm font-semibold text-primary mb-1">{t('replicateSteps')}</h3>
          <p className="text-sm text-gray-500 italic">{t('replicateHint')}</p>
        </div>
        {tool && (
          <div>
            <h3 className="text-sm font-semibold text-primary mb-1">{t('replicateTools')}</h3>
            <p className="text-sm text-gray-600">{tool}</p>
          </div>
        )}
        {timeframe && (
          <div>
            <h3 className="text-sm font-semibold text-primary mb-1">{t('replicateCost')}</h3>
            <p className="text-sm text-gray-600">{timeframe}</p>
          </div>
        )}
      </div>
    </div>
  )
}
