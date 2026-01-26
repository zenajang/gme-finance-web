import type { MetadataRoute } from "next";

const baseUrl = "https://gmefinance.com";

const routes = [
  "/",
  "/countries",
  "/about/blog",
  "/notices",
  "/careers",
  "/usage",
  "/privacy",
  "/marketing",
  "/personal-info",
  "/credit-info",
  "/guidelines",
  "/restrictions",
  "/manual",
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
