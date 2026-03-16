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
