export const profiles = {
  productivity: {
    label: "Team productivity",
    solution: "ChatGPT Enterprise",
    reason:
      "A shared AI workspace could help teams draft, summarize, and explore ideas without building a custom application.",
    cases: [
      [
        "Internal knowledge assistant",
        "Help employees turn approved internal documents into useful answers and summaries.",
      ],
      [
        "Sales preparation",
        "Draft meeting briefs, discovery questions, and first-pass account plans.",
      ],
      [
        "Content acceleration",
        "Help marketing teams create and refine drafts with a consistent voice.",
      ],
    ],
  },
  customer: {
    label: "Customer experiences",
    solution: "OpenAI API",
    reason:
      "The API could embed AI into an existing product or customer workflow, with custom integrations and application controls.",
    cases: [
      [
        "Support copilot",
        "Draft responses using an approved help center, with a person reviewing before sending.",
      ],
      [
        "Feedback insights",
        "Group customer feedback into themes to help teams prioritize improvements.",
      ],
      [
        "Guided product discovery",
        "Help customers explore a catalog through a conversational interface.",
      ],
    ],
  },
  engineering: {
    label: "Software development",
    solution: "Codex",
    reason:
      "Codex could support a software team with implementation, code understanding, and testing inside its development workflow.",
    cases: [
      [
        "Codebase onboarding",
        "Help developers understand unfamiliar modules and trace how features work.",
      ],
      [
        "Test development",
        "Draft meaningful tests for review and help investigate failing checks.",
      ],
      [
        "Routine implementation",
        "Assist with scoped changes and documentation while developers review the results.",
      ],
    ],
  },
};

export function normalizeWebsite(value) {
  if (!value.trim()) return "";
  const url = new URL(
    /^https?:\/\//i.test(value.trim())
      ? value.trim()
      : `https://${value.trim()}`,
  );
  if (
    !["http:", "https:"].includes(url.protocol) ||
    !url.hostname.includes(".") ||
    url.username ||
    url.password
  ) {
    throw new Error("Enter a website such as example.com, or leave it blank.");
  }
  return url.href;
}

export function createProspect({ name, website = "", focus = "productivity" }) {
  const company = name.trim();
  if (!company || company.length > 100)
    throw new Error("Enter a company name between 1 and 100 characters.");
  if (!profiles[focus])
    throw new Error("Choose a supported opportunity focus.");
  const site = normalizeWebsite(website);
  const profile = profiles[focus];
  const criteria = [
    {
      label: "Potential workflow fit",
      points: 30,
      max: 40,
      detail:
        "Mock assumption: a repeatable workflow could benefit from AI. No company evidence collected.",
    },
    {
      label: "Potential business impact",
      points: 20,
      max: 30,
      detail:
        "Mock assumption: time savings may be possible. Impact has not been measured.",
    },
    {
      label: "Buying readiness",
      points: 5,
      max: 20,
      detail: "Mock placeholder: budget, sponsorship, and timing are unknown.",
    },
    {
      label: "Account details supplied",
      points: site ? 10 : 5,
      max: 10,
      detail: site
        ? "You supplied a name and website. The website has not been visited or verified."
        : "You supplied a name. Add a website for more complete account details; it will not be visited.",
    },
  ];
  const email = `Subject: Exploring AI opportunities at ${company}\n\nHi ${company} team,\n\nI’m reaching out to explore whether AI could support your ${profile.label.toLowerCase()} workflows. One possibility to discuss is ${profile.cases[0][0].toLowerCase()}.\n\n${profile.solution} may be worth exploring: ${profile.reason}\n\nI haven’t validated your team’s needs yet, so I’d love to learn what matters most to you. Would you be open to a short conversation next week?\n\nBest,\n[Your name]`;
  return {
    company,
    website: site,
    profile,
    criteria,
    score: criteria.reduce((sum, item) => sum + item.points, 0),
    email,
  };
}
