# Project Instructions for AI Agents

## Git & Deployment

### What NOT to push to GitHub
- `.idx/` directory — Firebase Studio / IDX cloud configuration files. These are environment-specific and should NOT be committed.
- Any other Firebase Studio or cloud provider specific configs that would conflict on a standard cloud server.

### What SHOULD be pushed
- Only the application source code and standard config files that can run on any cloud server (e.g., Vercel, Railway, etc.).
- Standard project configs like `next.config.ts`, `package.json`, `tsconfig.json`, etc.

### .gitignore
The `.gitignore` file already includes `.idx/` and other common entries. Do NOT remove these entries.

### When connecting to GitHub
1. Ensure `.gitignore` is updated to exclude `.idx/` and any other cloud-specific files.
2. If `.idx/` was previously committed, run `git rm -r --cached .idx/` to untrack it.
3. Commit and push as normal.