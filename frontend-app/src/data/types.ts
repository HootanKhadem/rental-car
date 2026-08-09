export type MenuItem = { label: string; href: string };

export type HeroStat = { value: string; label: string };

export type HeroImageData = {
  src: string;
  alt?: string;
  title?: string;
  price?: string;
};

export type Feature = { title: string; description: string; icon?: string };

export type Car = {
  id: string;
  make: string;
  model: string;
  pricePerDayKwd: number;
  image?: string;
};
