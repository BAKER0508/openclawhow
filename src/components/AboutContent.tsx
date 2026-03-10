'use client'

import { useLanguage } from '@/lib/i18n'

interface AboutContentProps {
  caseCount: number
  sceneCount: number
  industryCount: number
  tagCount: number
}

export default function AboutContent({ caseCount, sceneCount, industryCount, tagCount }: AboutContentProps) {
  const { t } = useLanguage()

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-6">
        {t('aboutTitle')}
      </h1>

      <div className="prose max-w-none mb-12">
        <p>
          <strong>OpenClaw How</strong> {t('aboutIntro').replace('OpenClaw How ', '')}
        </p>
      </div>

      {/* By the Numbers */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-primary mb-6">{t('byTheNumbers')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
            <span className="text-3xl font-extrabold text-accent">{caseCount}</span>
            <p className="text-sm text-gray-500 mt-1">{t('caseStudies')}</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
            <span className="text-3xl font-extrabold text-teal">{sceneCount}</span>
            <p className="text-sm text-gray-500 mt-1">{t('solutions')}</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
            <span className="text-3xl font-extrabold text-primary">{industryCount}</span>
            <p className="text-sm text-gray-500 mt-1">{t('industries')}</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
            <span className="text-3xl font-extrabold text-primary">{tagCount}</span>
            <p className="text-sm text-gray-500 mt-1">{t('topics')}</p>
          </div>
        </div>
      </section>

      {/* What You Will Find */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-primary mb-6">{t('whatYouFind')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
              <span className="text-accent font-bold text-lg">C</span>
            </div>
            <h3 className="font-bold text-primary mb-2">{t('caseStudies')}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t('aboutCaseDesc')}
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center mb-3">
              <span className="text-teal font-bold text-lg">S</span>
            </div>
            <h3 className="font-bold text-primary mb-2">{t('sceneSolutions')}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {t('aboutSceneDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* How We Source Content */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-primary mb-6">{t('howWeSource')}</h2>
        <div className="bg-white rounded-xl p-8 border border-gray-100">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-primary mb-1">{t('discovery')}</h3>
                <p className="text-sm text-gray-600">
                  {t('discoveryDesc')}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-primary mb-1">{t('verification')}</h3>
                <p className="text-sm text-gray-600">
                  {t('verificationDesc')}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-primary mb-1">{t('writeUp')}</h3>
                <p className="text-sm text-gray-600">
                  {t('writeUpDesc')}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold shrink-0">
                4
              </div>
              <div>
                <h3 className="font-bold text-primary mb-1">{t('communityReview')}</h3>
                <p className="text-sm text-gray-600">
                  {t('communityReviewDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Submit Your Story */}
      <section className="mb-12">
        <div className="bg-primary rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">{t('submitYourStory')}</h2>
          <p className="text-white/70 max-w-lg mx-auto mb-6">
            {t('submitYourStoryDesc')}
          </p>
          <a
            href="https://github.com/openclaw/openclawhow/issues/new?template=submit-case.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-accent text-white font-semibold rounded-full hover:bg-accent/90 transition-colors"
          >
            {t('submitViaGithub')}
          </a>
        </div>
      </section>

      {/* Contact */}
      <section>
        <h2 className="text-2xl font-bold text-primary mb-4">{t('contact')}</h2>
        <div className="prose max-w-none">
          <p>
            {t('contactText')}{' '}
            <a
              href="https://x.com/openclaw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal hover:underline"
            >
              Twitter / X
            </a>{' '}
            {t('contactOr')}{' '}
            <a
              href="https://github.com/openclaw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal hover:underline"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  )
}
