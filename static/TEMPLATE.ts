import type {
    ExtensionAPI,
    ExtensionContext,
} from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI, getCtx: () => ExtensionContext) {
    // Your code here
    // return getCtx().getSystemPrompt();
    return pi.getActiveTools();
}
