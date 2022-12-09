module.exports = {
  debug: process.env.NODE_ENV === 'development',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'nb'],
    domains: [
      {
        domain: 'tekblogg.dev',
        defaultLocale: 'nb'
      },
      {
        domain: 'tekblog.dev',
        defaultLocale: 'en'
      }
    ]
  }
}
