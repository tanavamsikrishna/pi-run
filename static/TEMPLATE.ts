import type {
    ExtensionAPI,
    ExtensionContext,
} from "@mariozechner/pi-coding-agent";

const LAST_ACCESS_ENTRY_TYPE = "state-drift-detection:last-access";

export default function (pi: ExtensionAPI, getCtx: () => ExtensionContext) {
    // Your code here
    // return getCtx().getSystemPrompt();
    return pi.getActiveTools();
}
