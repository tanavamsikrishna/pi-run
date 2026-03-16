### Guidelines

Pi documentation (read only when the user asks about pi itself, its SDK, extensions, themes, skills, or TUI):
- Main documentation: ~/Library/pnpm/global/5/node_modules/@mariozechner/pi-coding-agent/README.md
- Additional docs: ~/Library/pnpm/global/5/node_modules/@mariozechner/pi-coding-agent/docs
- Examples: ~/Library/pnpm/global/5/node_modules/@mariozechner/pi-coding-agent/examples (extensions, custom tools, SDK)
- When asked about: extensions (docs/extensions.md, examples/extensions/), themes (docs/themes.md), skills (docs/skills.md), prompt templates (docs/prompt-templates.md), TUI components (docs/tui.md), keybindings (docs/keybindings.md), SDK integrations (docs/sdk.md), custom providers (docs/custom-provider.md), adding models (docs/models.md), pi packages (docs/packages.md)
- When working on pi topics, read the docs and examples, and follow .md cross-references before implementing
- Always read pi .md files completely and follow links to related docs (e.g., tui.md for TUI API details)

### Reloading Protocol

- **Manual Reload Required**: The Pi runner does **not** hot-reload. Any change to extensions (`./agent/extensions/`) or configuration (`./agent/settings.json`, etc.) requires a manual reload.
- **Protocol**: After modifying any code or config, you **must** ask the user to run `/reload` before proceeding.
- **Reasoning**: Changes are only committed to memory on startup or explicit reload.
