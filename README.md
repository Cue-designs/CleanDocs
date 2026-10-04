# CleanDocs

CleanDocs is a JSON-to-documentation tool built to help developers turn raw API responses into clear, usable TypeScript types and field descriptions.

Instead of manually rewriting JSON objects into interfaces or documentation, CleanDocs analyzes the data you paste in and converts it into structured output that is easier to understand, share, and reuse.

## What it does

CleanDocs helps you:

- paste JSON responses from an API or backend service
- validate the JSON format
- detect field types automatically (string, number, boolean, object, array, etc.)
- generate TypeScript interfaces from the data
- view the extracted fields in a readable table
- search through fields quickly
- copy or share the generated output

## Why it is useful

Working with APIs often involves reading large JSON payloads and manually translating them into TypeScript models or docs. This is time-consuming and error-prone.

CleanDocs reduces that effort by automatically turning response data into a clearer structure, so developers can:

- understand API payloads faster
- reduce manual documentation work
- create more accurate TypeScript definitions
- speed up frontend and backend integration
- communicate data contracts more clearly across teams

## Example

If you paste this JSON:

```json
{
  "status": "success",
  "user": {
    "id": 2048,
    "name": "Ada Lovelace",
    "verified": true
  }
}
```

CleanDocs can generate output similar to:

```ts
interface RootObject {
  status: string;
  user: User;
}

interface User {
  id: number;
  name: string;
  verified: boolean;
}
```

This makes the data easier to understand and use in TypeScript-based applications.

## Features

- JSON validation
- automatic field detection
- TypeScript generation
- searchable field explorer
- copy and share support
- browser-based workflow with no heavy setup

## Tech stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

## Getting started

```bash
npm install
npm run dev
```

Then open the local Vite URL in your browser and start pasting JSON data.

## Project goal

CleanDocs is designed to make API documentation and data understanding simpler, faster, and more reliable by turning JSON into structured documentation and typed interfaces.

