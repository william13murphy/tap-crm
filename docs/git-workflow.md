### Git Workflow

**Branching**

To begin working, clone the repo.

Then, create a new branch from the master branch.

Name your branch the same as the feature you are implementing. For example, to create a feature branch for the "school-admin-dashboard" feature:

```
git fetch --all
git checkout master
git checkout -b feature/school-admin-dashboard
```

**Merging**

All commits will be reviewed before merging them into the frontend branch.

The process for committing is as follows:

1. Commit your code to your feature branch.
2. Create a pull request to merge the feature into the master branch.
3. If there are any merge conflicts, resolve them and push another commit to the branch.
4. The Lead Dev will review and comment on the pull request.
5. Once the pull request is accepted, the Lead Dev will merge it into the master branch.

**Merging Master into Feature Branch**

When merging the master branch into your feature branch, make sure to use the `-ff-only` flag.

This will prevent blank merge commits from occurring, which tend to sully the commit history. (A merge commit contains no changes, and has a message similar to: `Merge branch 'master' of https://github.com/EducationalFundingCompany/TAP-Frontend into feature/my-feature-branch`)

Example:

```
git fetch --all
git merge origin/master --ff-only
```

**Commit Message Guidelines:**

Use descriptive commit messages. For example: “Add graph component to School Admin Dashboard”.

If you are working against a particular GitHub issue, reference the issue in your commit message:

"Issue #123: Add New School User Form"

If you ware working against a Jira issue, reference the issue in your commit message:

"TAP-123: Add New School User Form"

A commit should be as small as possible, but should contain a discrete piece of work. Incomplete features should never be merged into the master branch.

No two commit messages in a row, should be the same. This is a sign that you are not being descriptive enough in your commit messages.

**Continuous Integration**

Commits to the master branch, and merged pull requests, will be automatically deployed to the "tap-dev" server via Jenkins.
