/**
 * Per-service follow-up question templates.
 *
 * Edit the question copy here without touching the worker logic.
 * `serviceLabel` is what appears mid-sentence in the auto-reply
 * ("...about your roofing project...").
 */

export interface ServiceTemplate {
  serviceLabel: string;
  questions: string[];
}

export const SERVICE_LABELS: Record<string, string> = {
  "roofing": "Roofing",
  "siding": "Siding, Fascia & Soffit",
  "insulation": "Insulation",
  "decks": "Decks",
  "sheds-outbuildings": "Sheds & Outbuildings",
  "fences": "Fences",
  "lvp-flooring": "LVP Flooring",
  "other": "Other",
};

export const TIMEFRAME_LABELS: Record<string, string> = {
  "asap": "ASAP",
  "1-3-months": "1-3 months",
  "3-6-months": "3-6 months",
  "planning": "Planning ahead",
};

export const SERVICE_TEMPLATES: Record<string, ServiceTemplate> = {
  "roofing": {
    serviceLabel: "roofing project",
    questions: [
      "Roughly when was the current roof installed? (Age helps us figure out if it's a tear-off or if an overlay is an option.)",
      "What's the current roofing material (asphalt shingles, metal, cedar, other), and are you looking to keep the same or change?",
      "Approximate house footprint or square footage of the roof, if you happen to know?",
      "Are you seeing any active leaks or interior damage, or is this preventative?",
      "Any tricky access we should plan for (steep pitch, multiple stories, lots of valleys or dormers)?",
    ],
  },
  "siding": {
    serviceLabel: "siding project",
    questions: [
      "What's the existing siding (vinyl, wood, fibre cement, brick), and what are you considering for the new?",
      "Approximate dimensions of the house, or roughly how much siding needs to be replaced?",
      "Whole house, or specific walls and sections?",
      "Will trim, soffit, fascia, or any windows need attention at the same time?",
      "Any drafts, water issues, or insulation concerns we should look at while the siding is off?",
    ],
  },
  "insulation": {
    serviceLabel: "insulation project",
    questions: [
      "Which areas need attention: attic, basement, walls, crawl space, or a combination?",
      "What's the goal: comfort (cold rooms, drafts), lower energy bills, soundproofing, or all of the above?",
      "Roughly how old is the home, and do you know what insulation is in there now?",
      "Any moisture, mould, or air-sealing issues you've noticed?",
      "Are you planning to apply for the Canada Greener Homes Grant or another rebate? (Affects what documentation we'll need.)",
    ],
  },
  "decks": {
    serviceLabel: "deck project",
    questions: [
      "Roughly what size are you picturing (length and width, or square footage)?",
      "New build, full replacement of an existing deck, or expansion of one you already have?",
      "Material preference: pressure-treated, cedar, or composite (Trex, TimberTech, etc.)?",
      "Any features on the wishlist: stairs, multi-level, built-in seating, railings, pergola, lighting?",
      "Is the site flat, or does the deck need to handle a slope, rocks, or other tricky ground?",
    ],
  },
  "sheds-outbuildings": {
    serviceLabel: "shed or outbuilding project",
    questions: [
      "Approximate footprint you're imagining (8x10, 10x12, 12x16, custom)?",
      "Primary use: storage, workshop, she-shed/man-cave, garden, animal shelter?",
      "Do you need windows, electricity, insulation, or just a basic four walls and roof?",
      "What's the site like now: bare ground, existing gravel pad, concrete pad, or do you need us to prep the site too?",
      "Roof style preference: gable, gambrel (barn style), lean-to, or open?",
    ],
  },
  "fences": {
    serviceLabel: "fence project",
    questions: [
      "Approximate linear feet you need fenced?",
      "Material preference: pressure-treated wood, cedar, vinyl, chain link, or ornamental metal?",
      "Height (typically 4 ft, 6 ft, or 8 ft)?",
      "Style: full privacy (no gaps), semi-private with spacing, or open picket?",
      "How many gates and what kind (walk-through, drive-through)? Any sloped or rocky sections we should know about?",
    ],
  },
  "lvp-flooring": {
    serviceLabel: "LVP flooring project",
    questions: [
      "Approximate square footage and which rooms are getting LVP?",
      "What's there now (carpet, hardwood, laminate, tile), and would you like it removed or do we install over it?",
      "Any known issues with the subfloor: soft spots, water damage, uneven areas?",
      "Are baseboards, trim, or transitions between rooms part of the scope?",
      "Will we need to coordinate moving furniture, disconnecting laundry/dishwasher, or anything similar?",
    ],
  },
  "other": {
    serviceLabel: "project",
    questions: [
      "Can you describe the project in more detail? What does the finished result look like to you?",
      "Rough scope: roughly how big is the area we're working with? Square footage, linear feet, or dimensions if you have them.",
      "Do you have a target start date or deadline (e.g., before winter, before a family event)?",
      "Is there a rough budget range you're working with? Helps us recommend the right approach instead of over- or under-pitching.",
      "Any photos, sketches, or inspiration links you can share when you reply?",
    ],
  },
};

export function getServiceTemplate(service: string): ServiceTemplate {
  return SERVICE_TEMPLATES[service] ?? SERVICE_TEMPLATES["other"];
}

export function getServiceLabel(service: string): string {
  return SERVICE_LABELS[service] ?? "Other";
}

export function getTimeframeLabel(timeframe: string): string {
  return TIMEFRAME_LABELS[timeframe] ?? timeframe;
}
