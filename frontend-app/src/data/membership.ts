// import type { Car } from "./types";

export type Tier = {
  id: string;
  title: string;
  sub?: string;
  highlights: string[];
};

export const tiers: Tier[] = [
  {
    id: "silver",
    title: "Silver",
    sub: "0+",
    highlights: ["Free delivery", "10 pts / KWD"],
  },
  {
    id: "gold",
    title: "Gold",
    sub: "10K+",
    highlights: ["Priority fleet", "15 pts / KWD"],
  },
  {
    id: "platinum",
    title: "Platinum",
    sub: "16K+",
    highlights: ["Guaranteed cars", "20 pts / KWD"],
  },
  {
    id: "elite",
    title: "Elite",
    sub: "By invitation",
    highlights: ["Dedicated concierge"],
  },
];

export const tierData: Record<
  string,
  { points: number; memberNo?: string; year?: number }
> = {
  silver: { points: 1250, memberNo: "CD-10001", year: 2023 },
  gold: { points: 12450, memberNo: "CD-04417", year: 2023 },
  platinum: { points: 20000, memberNo: "CD-20002", year: 2023 },
  elite: { points: 40000, memberNo: "CD-90009", year: 2023 },
};

//eslint-disable-next-line import/no-anonymous-default-export
export default { tiers, tierData };
