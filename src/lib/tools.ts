import type { LucideIcon } from "lucide-react";
import {
  Home, UtensilsCrossed, CalendarDays, Backpack, Gift, Sparkles,
  Wallet, ShoppingCart, BellRing, Plane, Lightbulb,
} from "lucide-react";

export type ToolField = {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "textarea" | "number";
  required?: boolean;
};

export type Tool = {
  slug: string;
  emoji: string;
  name: string;
  tagline: string;
  icon: LucideIcon;
  system: string;
  fields: ToolField[];
  buildPrompt: (values: Record<string, string>) => string;
};

const list = (arr: [string, string][]) =>
  arr.map(([k, v]) => `- ${k}: ${v || "(unspecified)"}`).join("\n");

export const tools: Tool[] = [
  {
    slug: "home-helper",
    emoji: "🏠",
    name: "Home Helper",
    tagline: "Cleaning schedules, chore planners, grocery lists & organization ideas.",
    icon: Home,
    system:
      "You are a friendly home organization coach. Produce clear, actionable, well-structured markdown with headings, bullet lists, and schedules.",
    fields: [
      { name: "household", label: "Household", placeholder: "2 adults, 1 kid, 1 dog", required: true },
      { name: "home", label: "Home size / rooms", placeholder: "2 bed apartment: kitchen, living, 2 baths" },
      { name: "focus", label: "What do you need help with?", placeholder: "Weekly cleaning schedule + chore split", type: "textarea", required: true },
    ],
    buildPrompt: (v) =>
      `Create a home helper plan.\n${list([
        ["Household", v.household],
        ["Home", v.home],
        ["Focus", v.focus],
      ])}\nInclude: a weekly cleaning schedule, chore assignments, a starter grocery list, and 3 organization tips.`,
  },
  {
    slug: "meal-planner",
    emoji: "🍽️",
    name: "Meal Planner",
    tagline: "Weekly meal plans from what you already have, plus a shopping list.",
    icon: UtensilsCrossed,
    system:
      "You are a practical home cook and nutritionist. Return markdown with a 7-day meal plan table (or list), healthy alternatives, and a categorized shopping list.",
    fields: [
      { name: "ingredients", label: "Ingredients you have", placeholder: "chicken, rice, spinach, eggs...", type: "textarea", required: true },
      { name: "diet", label: "Diet / restrictions", placeholder: "vegetarian, gluten-free, none" },
      { name: "people", label: "How many people?", placeholder: "2", type: "number" },
      { name: "goal", label: "Goal", placeholder: "quick weeknight dinners, high protein" },
    ],
    buildPrompt: (v) =>
      `Plan meals for the week.\n${list([
        ["Ingredients on hand", v.ingredients],
        ["Diet", v.diet],
        ["People", v.people],
        ["Goal", v.goal],
      ])}\nInclude: 7 dinners, 2 healthy swaps, and a categorized shopping list for missing items.`,
  },
  {
    slug: "daily-planner",
    emoji: "📅",
    name: "Daily Planner",
    tagline: "A prioritized, time-blocked schedule tailored to your day.",
    icon: CalendarDays,
    system:
      "You are a productivity coach. Return a markdown schedule with time blocks (e.g. 8:00–9:00), priorities marked, and a short productivity tip.",
    fields: [
      { name: "wake", label: "Wake / start time", placeholder: "7:30" },
      { name: "sleep", label: "Wind-down time", placeholder: "22:30" },
      { name: "tasks", label: "Tasks & priorities", placeholder: "Finish report (high), gym, call mom, groceries", type: "textarea", required: true },
      { name: "context", label: "Context", placeholder: "remote work day, 2 meetings at 10 & 15" },
    ],
    buildPrompt: (v) =>
      `Build a personalized daily schedule.\n${list([
        ["Start", v.wake],
        ["Wind-down", v.sleep],
        ["Tasks", v.tasks],
        ["Context", v.context],
      ])}\nPrioritize important tasks, use time blocks, include short breaks, and end with 3 productivity tips.`,
  },
  {
    slug: "packing-assistant",
    emoji: "🎒",
    name: "Packing Assistant",
    tagline: "Smart packing lists based on destination, weather, and trip length.",
    icon: Backpack,
    system:
      "You are a seasoned travel packer. Return a categorized markdown checklist (Clothing, Toiletries, Electronics, Documents, Extras). Adjust for weather and trip type.",
    fields: [
      { name: "destination", label: "Destination", placeholder: "Lisbon, Portugal", required: true },
      { name: "type", label: "Trip type", placeholder: "vacation, business, camping, weekend, school" },
      { name: "days", label: "Trip length (days)", placeholder: "5", type: "number", required: true },
      { name: "weather", label: "Expected weather", placeholder: "sunny 22°C, some rain" },
    ],
    buildPrompt: (v) =>
      `Create a packing list.\n${list([
        ["Destination", v.destination],
        ["Trip type", v.type],
        ["Days", v.days],
        ["Weather", v.weather],
      ])}\nCategorize items and add a quick pre-departure checklist.`,
  },
  {
    slug: "gift-finder",
    emoji: "🎁",
    name: "Gift Finder",
    tagline: "Personalized gift ideas for any occasion, age and budget.",
    icon: Gift,
    system:
      "You are a thoughtful gift curator. Return 8 personalized gift ideas as a markdown list with a short reason and estimated price for each.",
    fields: [
      { name: "age", label: "Age", placeholder: "32", type: "number" },
      { name: "interests", label: "Interests / hobbies", placeholder: "hiking, coffee, sci-fi books", type: "textarea", required: true },
      { name: "budget", label: "Budget", placeholder: "$50" },
      { name: "occasion", label: "Occasion", placeholder: "birthday, anniversary, housewarming" },
    ],
    buildPrompt: (v) =>
      `Suggest personalized gifts.\n${list([
        ["Age", v.age],
        ["Interests", v.interests],
        ["Budget", v.budget],
        ["Occasion", v.occasion],
      ])}\nGive 8 varied ideas with why-they-fit and rough price.`,
  },
  {
    slug: "cleaning-planner",
    emoji: "🧹",
    name: "Cleaning Planner",
    tagline: "Daily, weekly and monthly checklists — room by room.",
    icon: Sparkles,
    system:
      "You are a cleaning expert. Return markdown with three sections (Daily / Weekly / Monthly) and a room-by-room checklist.",
    fields: [
      { name: "rooms", label: "Rooms", placeholder: "kitchen, living, 2 bedrooms, 1 bathroom", required: true },
      { name: "notes", label: "Notes (pets, allergies, time)", placeholder: "2 cats, dust allergy, 20 min/day", type: "textarea" },
    ],
    buildPrompt: (v) =>
      `Create a cleaning schedule.\n${list([
        ["Rooms", v.rooms],
        ["Notes", v.notes],
      ])}\nInclude daily, weekly, and monthly tasks plus room checklists.`,
  },
  {
    slug: "budget-helper",
    emoji: "💰",
    name: "Budget Helper",
    tagline: "A monthly budget, savings goals and practical spending tips.",
    icon: Wallet,
    system:
      "You are a personal finance coach. Return markdown with a suggested budget breakdown (percent + amount), savings plan, and 5 actionable tips.",
    fields: [
      { name: "income", label: "Monthly income (after tax)", placeholder: "3200", type: "number", required: true },
      { name: "currency", label: "Currency", placeholder: "USD" },
      { name: "fixed", label: "Fixed costs", placeholder: "rent 1200, phone 40, gym 30", type: "textarea" },
      { name: "goal", label: "Savings goal", placeholder: "Save $5000 for a trip in 10 months" },
    ],
    buildPrompt: (v) =>
      `Build a monthly budget plan.\n${list([
        ["Income", v.income],
        ["Currency", v.currency],
        ["Fixed costs", v.fixed],
        ["Goal", v.goal],
      ])}\nProvide a budget breakdown, saving plan, and 5 spending tips.`,
  },
  {
    slug: "shopping-list",
    emoji: "🛒",
    name: "Smart Shopping List",
    tagline: "Categorized grocery list with estimated cost and cheaper swaps.",
    icon: ShoppingCart,
    system:
      "You are a grocery-savvy assistant. Return a markdown list grouped by store aisle (Produce, Dairy, Pantry, Frozen, etc.), with estimated total cost and 3 cheaper alternatives.",
    fields: [
      { name: "items", label: "Items you need", placeholder: "milk, chicken breast, tomatoes, bread, olive oil...", type: "textarea", required: true },
      { name: "budget", label: "Budget (optional)", placeholder: "$60" },
      { name: "region", label: "Region", placeholder: "US, EU, UK" },
    ],
    buildPrompt: (v) =>
      `Organize this shopping list.\n${list([
        ["Items", v.items],
        ["Budget", v.budget],
        ["Region", v.region],
      ])}\nGroup by aisle, estimate total cost, and suggest 3 cheaper alternatives.`,
  },
  {
    slug: "reminders",
    emoji: "⏰",
    name: "Reminder Generator",
    tagline: "Reminders for bills, appointments, birthdays and to-dos.",
    icon: BellRing,
    system:
      "You are a scheduling assistant. Return a markdown table (or list) of reminders with date/time, category, and a short note. Add helpful lead-time reminders.",
    fields: [
      { name: "items", label: "What should I remind you about?", placeholder: "electric bill 15th, dentist Nov 12, mom's birthday Dec 3", type: "textarea", required: true },
      { name: "style", label: "Reminder style", placeholder: "gentle, punchy, formal" },
    ],
    buildPrompt: (v) =>
      `Generate a reminder plan.\n${list([
        ["Items", v.items],
        ["Style", v.style],
      ])}\nInclude lead-time reminders (e.g. 3 days before) and grouped categories.`,
  },
  {
    slug: "travel-planner",
    emoji: "✈️",
    name: "Travel Planner",
    tagline: "Full itineraries with budget, sights, weather and packing.",
    icon: Plane,
    system:
      "You are an expert travel planner. Return a day-by-day markdown itinerary, budget estimate, top places to visit, weather notes, and a short packing checklist.",
    fields: [
      { name: "destination", label: "Destination", placeholder: "Tokyo, Japan", required: true },
      { name: "days", label: "Trip length (days)", placeholder: "7", type: "number", required: true },
      { name: "budget", label: "Total budget", placeholder: "$2500" },
      { name: "style", label: "Travel style", placeholder: "food + culture, family friendly, adventure" },
      { name: "season", label: "Time of year", placeholder: "late April" },
    ],
    buildPrompt: (v) =>
      `Plan this trip.\n${list([
        ["Destination", v.destination],
        ["Days", v.days],
        ["Budget", v.budget],
        ["Style", v.style],
        ["Season", v.season],
      ])}\nInclude a day-by-day itinerary, budget breakdown, must-see places, weather notes, and a compact packing checklist.`,
  },
  {
    slug: "problem-solver",
    emoji: "💡",
    name: "Problem Solver",
    tagline: "Describe any everyday problem — get clear step-by-step help.",
    icon: Lightbulb,
    system:
      "You are a calm, practical problem-solving assistant. Return markdown with: a short diagnosis, a numbered step-by-step plan, and 2 alternative approaches.",
    fields: [
      { name: "problem", label: "Describe your problem", placeholder: "My sleep schedule is a mess and mornings are chaos.", type: "textarea", required: true },
      { name: "context", label: "Anything else worth knowing?", placeholder: "I work from home, have a toddler", type: "textarea" },
    ],
    buildPrompt: (v) =>
      `Help me solve this everyday problem.\n${list([
        ["Problem", v.problem],
        ["Context", v.context],
      ])}\nGive a short diagnosis, numbered steps, and 2 alternatives.`,
  },
];

export const getTool = (slug: string) => tools.find((t) => t.slug === slug);
