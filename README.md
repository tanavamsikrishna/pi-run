# pi-run

This is a [Pi](https://pi.dev) extension for Pi extension developers. It enables running Typescript within the Node.js context of the Pi coding agent

<p align="center">
    <img src="https://raw.githubusercontent.com/tanavamsikrishna/pi-run/refs/heads/main/screenshot.png" width="500" alt="Alt text description">
</p>

## Installation

```sh
pi install npm:@vamsitalupula/pi-run
```

## How to use?
1. Create a new file by running `/pi-run ./debug.ts` in Pi user prompt
2. You should see a new file called `debug.ts` created in the current folder
```ts
import type {
    ExtensionAPI,
    ExtensionContext,
} from "@mariozechner/pi-coding-agent";

export default function (
    pi: ExtensionAPI,
    getCtx: () => ExtensionContext | null,
) {
    // Your code here
    return pi.getActiveTools();
}
```
3. Now run the file with `/pi-run ./debug.ts`
4. The data/object returned by the `default export function` is shown as a pi notification
5. The package `@mariozechner/pi-coding-agent` is available in the node environment running *pi*. But if you need LSP/linting support in your editor, you need to point your editor tools to the install location of the package one way or an other. The easiest is to just run `pnpm i --save-dev @mariozechner/pi-coding-agent` in the project or local directory

