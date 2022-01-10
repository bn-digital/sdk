import { FC } from 'react'
import { IntlProvider } from 'react-intl'

type I18nProps = { locale: string }

const defaultLocale = 'en' as const

const I18nProvider: FC<Partial<I18nProps>> = ({ locale = defaultLocale, children }) => (
  <IntlProvider defaultLocale={defaultLocale} locale={locale}>
    {children}
  </IntlProvider>
)

export { I18nProvider }
