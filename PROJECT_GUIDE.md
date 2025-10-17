# 📌 Git & Project Workflow

> Beginner-friendly guide to working on this project, following Git conventions, commit rules, and workflow.

---

## 1. ✅ Branching Rules

- `main` → Stable, production-ready code
- `develop` → Latest development, tested features
- `feature/<name>` → New feature branches
- `bugfix/<name>` → Bug fix branches
- `hotfix/<name>` → Quick fix in production
- Always branch off `develop` for new work

---

## 2. ✅ Commit Message Conventions

Use **Conventional Commits** format:

```

<tag>(<scope>): <short summary>

<body (optional)>

<footer (optional)>
```

### Common Tags

| Tag      | When to Use                       | Example Commit Message                  |
| -------- | --------------------------------- | --------------------------------------- |
| feat     | New feature                       | feat(auth): add JWT login               |
| fix      | Bug fix                           | fix(cart): prevent negative quantity    |
| docs     | Documentation                     | docs(readme): add setup instructions    |
| style    | Code formatting only              | style(ui): format navbar component      |
| refactor | Code restructure (no feature/fix) | refactor(api): split user service       |
| perf     | Performance improvements          | perf(db): optimize product query        |
| test     | Add/update tests                  | test(auth): add JWT validation tests    |
| build    | Build system/dependencies         | build(npm): update webpack              |
| ci       | CI/CD workflow changes            | ci(github): add lint workflow           |
| chore    | Misc maintenance tasks            | chore(deps): bump express to 4.18.2     |
| revert   | Revert a previous commit          | revert: feat(cart): add discount system |

**Tips:**

- Keep title ≤ 50 characters
- Use **imperative mood** (“Add feature”, not “Added feature”)
- Optional body: explain _why_

---

## 3. ✅ Useful Git Commands

| Command                          | Description                                   |
| -------------------------------- | --------------------------------------------- |
| `git status`                     | Check current branch and changes              |
| `git add <file>`                 | Stage a file for commit                       |
| `git add .`                      | Stage all changes                             |
| `git commit -m "message"`        | Commit staged changes                         |
| `git commit -am "message"`       | Stage modified files & commit (not new files) |
| `git log --oneline`              | Show commit history                           |
| `git checkout <branch>`          | Switch branch                                 |
| `git checkout -b <branch>`       | Create & switch to new branch                 |
| `git pull`                       | Pull latest changes from remote               |
| `git push origin <branch>`       | Push commits to remote                        |
| `git stash`                      | Save changes temporarily                      |
| `git stash pop`                  | Apply saved changes                           |
| `git stash list`                 | List stashes                                  |
| `git stash drop <stash>`         | Delete a stash                                |
| `git tag -a v1.0.0 -m "message"` | Create annotated tag                          |
| `git push origin --tags`         | Push all tags to remote                       |
| `git revert <commit>`            | Revert a commit                               |

---

## 4. ✅ Typical Workflow

```bash
# Update local develop branch
git checkout develop
git pull

# Create a feature branch
git checkout -b feature/auth

# Work on the feature
# Stage and commit changes
git add .
git commit -m "feat(auth): add login page"

# Push branch to remote
git push origin feature/auth

# Create Pull Request to merge into develop
```

---

## 5. ✅ Handling Stashes

```bash
# Save current changes
git stash push -m "WIP: auth flow"

# Switch branches to fix bug
git checkout main
git pull
git commit -m "fix(cart): prevent negative quantity"

# Return to feature branch and apply stash
git checkout feature/auth
git stash pop
```

**Options:**

- `git stash -u` → Include untracked files
- `git stash -a` → Include untracked & ignored files

---

## 6. ✅ Tags / Releases

```bash
# Create an annotated tag
git tag -a v1.0.0 -m "First stable release"

# Push tag to remote
git push origin v1.0.0

# Push all tags
git push origin --tags
```

- Lightweight tag → just a pointer
- Annotated (`-a`) → includes author, date, message (recommended)

---

## 7. ✅ Code Style & Guidelines

- 2-space indentation
- Single quotes for strings
- Run linters/tests before committing
- Comment code when needed
- Keep commits small & focused
- Use descriptive branch/file names (`feature/login`, `bugfix/cart`)

---

## 8. ✅ Pull Request Guidelines

- PR title short & clear
- Link issues in PR: `Closes #123`
- Ensure tests pass and lint is clean
- Mention reviewer(s) if needed

---

## 9. ✅ Helpful Tips

- Always write meaningful commit messages
- Don’t commit broken code
- Stash work when switching tasks
- Test changes locally before pushing
- Tag releases for version tracking
- Review branch before creating a PR

---

## 10. ✅ Quick Reference

**Branches:** `main`, `develop`, `feature/*`, `bugfix/*`
**Commit Tags:** feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
**Stash:** `git stash`, `git stash pop`, `git stash list`
**Tag:** `git tag -a v1.0.0 -m "message"`, `git push origin --tags`
**Push & Pull:** `git push origin <branch>`, `git pull`

```

---


```
