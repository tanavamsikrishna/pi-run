import type {
    ExtensionAPI,
    ExtensionContext,
} from "@mariozechner/pi-coding-agent";

export default function (pi: ExtensionAPI, getCtx: () => ExtensionContext) {
    // Your code here
    // return getCtx().getSystemPrompt();
    return pi.getActiveTools();
}
