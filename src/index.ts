import type {
    ExtensionAPI,
    ExtensionContext,
} from "@mariozechner/pi-coding-agent";
import { existsSync, writeFileSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createJiti } from "jiti";

const TEMPLATE = `import type {
    ExtensionAPI,
    ExtensionContext,
} from "@mariozechner/pi-coding-agent";

export default function (pi: ExtensionAPI, getCtx: () => ExtensionContext | null) {
    // Your code here
    return pi.getActiveTools();
}
`;

export default function (pi: ExtensionAPI) {
    let lastCtx: ExtensionContext | null = null;
    const jiti = createJiti(import.meta.url);

    pi.on("session_start", async (_event, ctx) => {
        lastCtx = ctx;
    });
    pi.on("turn_start", async (_event, ctx) => {
        lastCtx = ctx;
    });

    pi.registerCommand("pi-run", {
        description: "Run a .ts file with default export function",
        handler: async (args, ctx) => {
            lastCtx = ctx;

            let filePath = args?.trim() || "";
            if (filePath.startsWith("@")) filePath = filePath.slice(1);
            if (!filePath) {
                ctx.ui.notify("Usage: /pi-run <file-path>", "info");
                return;
            }

            const fullPath = resolve(ctx.cwd, filePath);

            if (!existsSync(fullPath)) {
                writeFileSync(fullPath, TEMPLATE, "utf-8");
                ctx.ui.notify(`Created new file: ${fullPath}`, "info");
                return;
            }

            const code = readFileSync(fullPath, "utf-8");
            if (!code.trim()) {
                writeFileSync(fullPath, TEMPLATE, "utf-8");
                ctx.ui.notify(
                    `File was empty, reset to template: ${fullPath}`,
                    "info",
                );
                return;
            }

            try {
                const mod = await jiti.import(fullPath);
                const fn = mod?.default || mod;

                if (typeof fn !== "function") {
                    ctx.ui.notify(
                        `Error: No default export function found`,
                        "error",
                    );
                    return;
                }

                const result = await fn(pi, () => lastCtx);

                if (result !== undefined) {
                    const str =
                        typeof result === "object"
                            ? JSON.stringify(result, null, 2)
                            : String(result);
                    ctx.ui.notify(`Result:\n${str}`, "info");
                } else {
                    ctx.ui.notify("Done (no return value)", "info");
                }
            } catch (e: any) {
                ctx.ui.notify(`Error: ${e.message}`, "error");
            }
        },
    });
}
