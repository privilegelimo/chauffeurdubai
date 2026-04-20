/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://chauffeurdubai.ae",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.8,
  sitemapSize: 5000,
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
