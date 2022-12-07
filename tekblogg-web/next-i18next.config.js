module.exports = {
  debug: process.env.NODE_ENV === 'development',
  i18n: {
    defaultLocale: 'nb',
    locales: ['nb', 'en'],
    localeDetection: false
  }
}
