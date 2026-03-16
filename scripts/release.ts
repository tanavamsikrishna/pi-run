#!/usr/bin/env bun

import { $ } from "bun";

// Get the version bump type from command line argument (required)
const validBumpTypes = ["major", "minor", "patch"] as const;
type BumpType = (typeof validBumpTypes)[number];

const args = Bun.argv.slice(2);

if (args.length === 0) {
  console.error("Error: Version bump type is required.");
  console.error(`Usage: bun scripts/release.ts <major|minor|patch>`);
  process.exit(1);
}

const input = args[0].toLowerCase();
if (!validBumpTypes.includes(input as BumpType)) {
  console.error(`Invalid bump type: ${input}. Valid options: ${validBumpTypes.join(", ")}`);
  process.exit(1);
}

const bumpType = input as BumpType;

console.log(`Bumping version: ${bumpType}`);

// Run npm version (handles git commit and tag)
await $`npm version ${bumpType}`;

// Push
await $`git push`;
await $`git push --tags`;

console.log("Successfully released!");
