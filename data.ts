export type EventItem = {
  id: number;
  month: string;
  day: string;
  title: string;
  venue: string;
  city: string;
  category: string;
  status: string;
  time: string;
  description: string;
  highlights: string[];
};

export const events: EventItem[] = [
  {
    id: 1,
    month: "MAR",
    day: "14",
    title: "12th Sindh Provincial Swimming Championship",
    venue: "Karachi Aquatic Centre",
    city: "Karachi",
    category: "Elite • Boys & Girls",
    status: "Registration Open",
    time: "09:00 AM onwards",
    description:
      "The flagship provincial meet brings together the region's strongest swimmers across all age groups for two days of heats and finals.",
    highlights: ["25m indoor pool", "Age groups U-12 to U-18", "Individual & relay events", "Live medal tally coverage"],
  },
  {
    id: 2,
    month: "MAR",
    day: "28",
    title: "Inter-District Junior Splash",
    venue: "Hyderabad Municipal Pool",
    city: "Hyderabad",
    category: "Junior • U-12 / U-14",
    status: "Entries Closing Soon",
    time: "10:00 AM onwards",
    description:
      "A development-focused meet designed to give emerging swimmers from every district their first taste of championship racing.",
    highlights: ["Talent identification program", "Short-course sprints", "District teams", "Participation certificates"],
  },
  {
    id: 3,
    month: "APR",
    day: "12",
    title: "Sindh Schools Aquatics Meet",
    venue: "Sukkur Sports Complex Pool",
    city: "Sukkur",
    category: "School • Boys & Girls",
    status: "Schedule Announced",
    time: "08:30 AM onwards",
    description:
      "School and academy teams compete for the inter-school shield, with dedicated relays and beginner-friendly sprint events.",
    highlights: ["School team entries", "Mixed relay finale", "U-10 to U-18 divisions", "Team shield & medals"],
  },
  {
    id: 4,
    month: "MAY",
    day: "03",
    title: "Sindh Club Relay Cup",
    venue: "Karachi Gymkhana Pool",
    city: "Karachi",
    category: "Club • Relay Format",
    status: "Save the Date",
    time: "04:00 PM onwards",
    description:
      "A fast-paced, team-only relay championship closing the season with freestyle, medley and mixed squad races.",
    highlights: ["4 × 50m freestyle", "4 × 50m medley", "Mixed club relays", "Season-ending awards"],
  },
];

export type ResultRow = {
  id: number;
  year: number;
  championship: string;
  club: string;
  gold: number;
  silver: number;
  bronze: number;
};

export const results: ResultRow[] = [
  { id: 1, year: 2026, championship: "Sindh Provincial Championship", club: "Karachi Dolphins", gold: 6, silver: 4, bronze: 3 },
  { id: 2, year: 2026, championship: "Sindh Provincial Championship", club: "Hyderabad Waves", gold: 4, silver: 5, bronze: 4 },
  { id: 3, year: 2026, championship: "Sindh Provincial Championship", club: "Sukkur Sharks", gold: 3, silver: 2, bronze: 5 },
  { id: 4, year: 2026, championship: "Sindh Provincial Championship", club: "Larkana Bluefins", gold: 2, silver: 3, bronze: 2 },
  { id: 5, year: 2026, championship: "Inter-District Junior Splash", club: "Karachi Dolphins", gold: 5, silver: 3, bronze: 2 },
  { id: 6, year: 2026, championship: "Inter-District Junior Splash", club: "Hyderabad Waves", gold: 3, silver: 4, bronze: 4 },
  { id: 7, year: 2026, championship: "Inter-District Junior Splash", club: "Sukkur Sharks", gold: 2, silver: 2, bronze: 3 },
  { id: 8, year: 2025, championship: "Sindh Provincial Championship", club: "Karachi Dolphins", gold: 7, silver: 5, bronze: 4 },
  { id: 9, year: 2025, championship: "Sindh Provincial Championship", club: "Hyderabad Waves", gold: 5, silver: 4, bronze: 3 },
  { id: 10, year: 2025, championship: "Sindh Provincial Championship", club: "Sukkur Sharks", gold: 2, silver: 3, bronze: 4 },
  { id: 11, year: 2025, championship: "Sindh Provincial Championship", club: "Larkana Bluefins", gold: 1, silver: 2, bronze: 3 },
  { id: 12, year: 2025, championship: "Sindh Schools Aquatics Meet", club: "Karachi Dolphins", gold: 4, silver: 4, bronze: 2 },
  { id: 13, year: 2025, championship: "Sindh Schools Aquatics Meet", club: "Hyderabad Waves", gold: 3, silver: 3, bronze: 5 },
  { id: 14, year: 2025, championship: "Sindh Schools Aquatics Meet", club: "Larkana Bluefins", gold: 2, silver: 2, bronze: 3 },
  { id: 15, year: 2024, championship: "Sindh Provincial Championship", club: "Karachi Dolphins", gold: 5, silver: 6, bronze: 4 },
  { id: 16, year: 2024, championship: "Sindh Provincial Championship", club: "Hyderabad Waves", gold: 4, silver: 3, bronze: 5 },
  { id: 17, year: 2024, championship: "Sindh Provincial Championship", club: "Sukkur Sharks", gold: 3, silver: 4, bronze: 2 },
  { id: 18, year: 2024, championship: "Sindh Club Relay Cup", club: "Karachi Dolphins", gold: 3, silver: 2, bronze: 1 },
  { id: 19, year: 2024, championship: "Sindh Club Relay Cup", club: "Hyderabad Waves", gold: 2, silver: 3, bronze: 2 },
  { id: 20, year: 2024, championship: "Sindh Club Relay Cup", club: "Larkana Bluefins", gold: 1, silver: 1, bronze: 3 },
];

export type Athlete = {
  id: number;
  name: string;
  club: string;
  ageGroup: string;
  specialty: string;
  medals: { gold: number; silver: number; bronze: number };
};

export const athletes: Athlete[] = [
  { id: 1, name: "Ayesha Khan", club: "Karachi Dolphins", ageGroup: "U-16", specialty: "50m Freestyle", medals: { gold: 5, silver: 2, bronze: 1 } },
  { id: 2, name: "Bilal Ahmed", club: "Hyderabad Waves", ageGroup: "U-18", specialty: "100m Butterfly", medals: { gold: 4, silver: 3, bronze: 2 } },
  { id: 3, name: "Sana Memon", club: "Sukkur Sharks", ageGroup: "U-14", specialty: "200m Freestyle", medals: { gold: 3, silver: 2, bronze: 4 } },
  { id: 4, name: "Hassan Ali", club: "Larkana Bluefins", ageGroup: "U-16", specialty: "100m Breaststroke", medals: { gold: 2, silver: 4, bronze: 1 } },
  { id: 5, name: "Zoya Baloch", club: "Karachi Dolphins", ageGroup: "U-12", specialty: "50m Backstroke", medals: { gold: 6, silver: 1, bronze: 0 } },
  { id: 6, name: "Daniyal Rajput", club: "Hyderabad Waves", ageGroup: "U-14", specialty: "100m Freestyle", medals: { gold: 3, silver: 3, bronze: 3 } },
  { id: 7, name: "Mehak Soomro", club: "Sukkur Sharks", ageGroup: "U-18", specialty: "200m Individual Medley", medals: { gold: 2, silver: 5, bronze: 2 } },
  { id: 8, name: "Rehan Brohi", club: "Larkana Bluefins", ageGroup: "U-12", specialty: "50m Butterfly", medals: { gold: 1, silver: 2, bronze: 3 } },
];

export type SwimRecord = {
  id: number;
  event: string;
  category: string;
  holder: string;
  time: string;
  year: number;
  scope: "Provincial" | "Championship";
};

export const records: SwimRecord[] = [
  { id: 1, event: "50m Freestyle", category: "Girls U-16", holder: "Ayesha Khan", time: "27.92", year: 2026, scope: "Provincial" },
  { id: 2, event: "100m Freestyle", category: "Boys U-18", holder: "Bilal Ahmed", time: "53.84", year: 2025, scope: "Provincial" },
  { id: 3, event: "50m Backstroke", category: "Girls U-12", holder: "Zoya Baloch", time: "32.18", year: 2026, scope: "Championship" },
  { id: 4, event: "100m Breaststroke", category: "Boys U-16", holder: "Hassan Ali", time: "1:09.45", year: 2025, scope: "Provincial" },
  { id: 5, event: "100m Butterfly", category: "Boys U-18", holder: "Daniyal Rajput", time: "58.36", year: 2026, scope: "Championship" },
  { id: 6, event: "200m Freestyle", category: "Girls U-14", holder: "Sana Memon", time: "2:12.74", year: 2025, scope: "Provincial" },
  { id: 7, event: "200m Individual Medley", category: "Girls U-18", holder: "Mehak Soomro", time: "2:31.06", year: 2024, scope: "Provincial" },
  { id: 8, event: "4 × 50m Medley Relay", category: "Open Club", holder: "Karachi Dolphins", time: "1:58.20", year: 2026, scope: "Championship" },
];

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "Events", href: "#events" },
  { label: "Results", href: "#results" },
  { label: "Athletes", href: "#athletes" },
  { label: "Records", href: "#records" },
  { label: "Contact", href: "#contact" },
];
