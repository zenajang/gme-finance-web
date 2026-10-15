import type { MetadataRoute } from "next";

const baseUrl = "https://gmefinance.com";

const routes = [
  "/",
  "/countries",
  "/about/blog",
  "/notices/debt-adjustment-guide",
  "/careers",
  "/terms/use",
  "/terms/company",
  "/terms/product-changes",
  "/privacy-policy",
  "/credit-info",
  "/customer-rights",
  "/third-party-disclosure",
  "/loan-product-info",
  "/bangladesh",
  "/cambodia",
  "/india",
  "/indonesia",
  "/mongolia",
  "/myanmar",
  "/nepal",
  "/pakistan",
  "/philippines",
  "/russia",
  "/srilanka",
  "/thailand",
  "/uzbekistan",
  "/vietnam",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
