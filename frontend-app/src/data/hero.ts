import type { HeroStat, HeroImageData } from "./types";

export const heroBadge = "KUWAIT IS FIRST AI CAR-DELIVERY SYSTEM";
export const heroTitle = "Your car comes to you,";
export const heroDescription =
  "A curated fleet of the finest and newest cars, delivered to your door in 60 minutes. A smart assistant guides you, with notifications built around your interests. No queues, no counters.";

export const heroImage: HeroImageData = {
  src: "/pictures/ford-mustang-692.jpg",
  alt: "Ford Mustang 1969",
  title: "Ford Mustang 1969",
  price: "45",
};

export const heroStats: HeroStat[] = [
  { value: "120+", label: "stats.cars" },
  { value: "60min", label: "stats.delivery" },
  { value: "4.96", label: "stats.satisfaction" },
];

// eslint-disable-next-line import/no-anonymous-default-export
export default { heroBadge, heroTitle, heroDescription, heroImage, heroStats };
