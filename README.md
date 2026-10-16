# Signal — AI Sales Prospecting

A beginner-friendly React dashboard for exploring AI sales conversations. Version 1 uses **clearly labeled mock data and local templates**. It does not use an AI model, research companies, visit submitted websites, or send emails. No API key or account is needed.

## Run it on your computer

1. Install [Node.js](https://nodejs.org/) 22.12 or newer (Node 24 LTS is recommended). npm comes with Node.js.
2. Open a terminal inside this repository.
3. Install the dependencies:

   ```sh
   npm ci
   ```

4. Start the development server:

   ```sh
   npm run dev
   ```

5. Open the local address printed by Vite in your terminal. Keep the terminal open while using the app. Press Ctrl+C to stop it.

If npm reports that its cache is not writable, use `npm ci --cache /tmp/ai-sales-npm-cache` on Linux/macOS.

## Try the dashboard

- The initial Acme Studio brief is an illustrative example, not a researched company profile.
- Enter a company name. Optionally enter a website such as `example.com`.
- Choose a focus: team productivity, customer experiences, or software development.
- Click **Generate mock brief**. The company overview, three use cases, solution recommendation, score, and email draft update together.
- Expand **How this score is calculated** to see every criterion, point allocation, and assumption.
- Edit the email draft and replace `[Your name]`. **Copy email** copies the edited text; it never sends anything. Clipboard access usually needs a secure page or localhost. If your browser blocks it, select and copy the text manually.

Edits to the form take effect when you generate a new brief. Generating replaces your current email edits. Results stay only in browser memory; refreshing resets the example. There is no database, analytics, or API request.

## Understand the mock score

The score is a transparent demonstration, not evidence of buying intent:

| Criterion | Demo points | Maximum |
| --- | ---: | ---: |
| Potential workflow fit (assumed) | 30 | 40 |
| Potential business impact (assumed) | 20 | 30 |
| Buying readiness (unknown) | 5 | 20 |
| Account details supplied | 5 for a name, 10 with a website | 10 |

A name alone scores **60/100**; adding a website scores **65/100**. Website presence means only more complete user input, not verification. Every company uses the same assumptions. Focus determines the suggested solution: productivity → ChatGPT Enterprise; customer experiences → OpenAI API; software development → Codex. Validate business needs and product fit before outreach.

## Test and build

Run the automated data and scoring checks:

```sh
npm test
```

Create the production website:

```sh
npm run build
```

Serve that build locally:

```sh
npm run preview
```

Manual browser checks:

1. Generate a brief with just a name; confirm the overview and email use it and the score is 60.
2. Add a website; confirm the score becomes 65 and the criteria explain why.
3. Try each focus; confirm three use cases and the corresponding solution appear.
4. Try an empty name or invalid website; confirm validation prevents a new result.
5. Edit and copy the email, then paste into a text editor to check the copied text.
6. Make the browser narrow; confirm the cards stack and the form remains usable.

## Project structure

- `src/main.jsx`: React dashboard, form, editable email, and clipboard behavior.
- `src/prospect.js`: local mock templates, website validation, and scoring rules.
- `src/prospect.test.js`: Node.js tests for templates, input validation, and score calculations.
- `src/styles.css`: responsive CSS. No UI framework is required.

This is an independent demo, not an official OpenAI product. A future live-data version would require a separately designed backend, secure credentials, reliable sources, and clearly distinguished researched information.
