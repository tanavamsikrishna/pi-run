#!/usr/bin/env bun

import { $ } from "bun";

// 1. Check if git repo is not dirty
const gitStatus = await $`git status --porcelain`.text();
if (gitStatus.trim() !== "") {
    console.error(
        "Error: Git repository is dirty. Please commit or stash your changes first.",
    );
    process.exit(1);
}

console.log("Git repository is clean.");

// 2. Get the version bump type from command line argument (required)
const validBumpTypes = ["major", "minor", "patch"] as const;
type BumpType = (typeof validBumpTypes)[number];

const args = Bun.argv.slice(2);

if (args.length === 0) {
    console.error("Error: Version bump type is required.");
    console.error(`Usage: ./scripts/release.ts <major|minor|patch>`);
    process.exit(1);
}

const input = args[0].toLowerCase();
if (!validBumpTypes.includes(input as BumpType)) {
    console.error(
        `Invalid bump type: ${input}. Valid options: ${validBumpTypes.join(", ")}`,
    );
    process.exit(1);
}

const bumpType = input as BumpType;

console.log(`Bumping version: ${bumpType}`);

// Run npm version
const npmVersionResult = await $`npm version ${bumpType}`;
const newVersion = npmVersionResult.stdout.trim();
console.log(`Version updated to: ${newVersion}`);

// 3. Git commit and tag the commit `v<major>.<minor>.<patch>`
const versionTag = newVersion.replace(/^v/, "");
await $`git add -A`;
await $`git commit -m "Release v${versionTag}"`;
await $`git tag v${versionTag}`;

console.log(`Created commit and tag: v${versionTag}`);

// 4. Push
await $`git push`;
await $`git push --tags`;

console.log("Successfully pushed to remote!");
