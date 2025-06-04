import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
});
// would use this if tranlating into Arabic

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};
