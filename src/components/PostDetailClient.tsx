'use client'

import { useLanguage } from '@/lib/i18n'

export function PostTypeLabel({ isCase }: { isCase: boolean }) {
  const { t } = useLanguage()
  return <>{isCase ? t('caseStudy') : t('sceneSolution')}</>
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
      {income && (
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
