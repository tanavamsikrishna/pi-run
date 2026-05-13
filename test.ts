import type {
    ExtensionAPI,
    ExtensionContext,
} from "@earendil-works/pi-coding-agent";

export default function (
    pi: ExtensionAPI,
    getCtx: () => ExtensionContext | null,
) {
    // Your code here
    return pi.getActiveTools();
}
