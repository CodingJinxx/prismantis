---
name: prismantis
description: Show what prismantis does in Codex. Use when the user runs $prismantis or asks what prismantis is or does.
---

Reply with exactly the markdown between the START and END lines, nothing before or after it.

START
**prismantis for Codex**

Replies here come back as tables, copyable commands and text pictures, which Codex draws on its own.

| You ask for | You get |
|---|---|
| A comparison | A table with short cells |
| Something to run | A fenced block that copies cleanly |
| A flow, timeline or layout | A text picture, no mermaid source |

```text
┌──────────┐     ┌──────────┐     ┌──────────┐
│ Question │ ──► │ Table or │ ──► │ Answer   │
│          │     │ picture  │     │ in prose │
└──────────┘     └──────────┘     └──────────┘
```

```text
Deploy  0     6        15             30        40
        ▏─────▏────────▏──────────────▏─────────▏
Build   ██████
Tests         █████████
Canary                 ███████████████
Rollout                               ██████████
```

Try it:

```text
Compare Postgres, SQLite and DuckDB for a 10 GB analytics job
```

Themes, colored diagrams and copy buttons are Claude Code only: github.com/NahumLitvin/prismantis
END
