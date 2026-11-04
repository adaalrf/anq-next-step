# ANQ Next Step

[![Checks](https://github.com/adaalrf/anq-next-step/actions/workflows/check.yml/badge.svg)](https://github.com/adaalrf/anq-next-step/actions/workflows/check.yml)

A small workspace for keeping track of job applications and what to do next.

[Explore the demo](https://nextstep.demo.adaalrf.dev) · [Read the case study](https://adaalrf.dev/work/anq-next-step/)

![The application pipeline, with fictional applications](docs/screenshots/pipeline-desktop.png)

The demo is read-only and holds fictional applications.

## Why it exists

This began as an Excel sheet. A job hunt spreads itself across saved links, notes
and message threads, and a sheet only holds so much of that. Replacing it meant
building something that looks simple: a list of applications, each with a few fields
and a stage.

The hard part turned out to be the forms. What should happen to a half-written
cover letter when a save fails? When the same application is open in two tabs? How
do you keep a follow-up date on the right day across timezones?

It's in real use, which is the quickest way to find the answers.

## What it does

- Saves a role with its listing, contacts, terms and a plain-text cover letter.
- Moves each application through stages, from Saved to Applied, Interviewing, Offer
  and a final outcome.
- Keeps the next action and follow-up date with the application.
- Adds follow-ups, notes and stage changes to a running history.
- Shows what's due, and archives old applications without losing their history.
- Exports everything as JSON.

## How it works

Each application has a version number, and the server refuses an edit based on an
older one, so a stale tab gets a conflict to review instead of overwriting newer
work. A failed save leaves the form open with your text in it, and leaving an edited
form asks first.

Stage changes and notes go into a separate history, saved together with the change
they describe. Follow-up dates are stored as calendar dates rather than moments in
time, so they don't shift between timezones.

## Try it yourself

You'll need Linux, Node.js 26 or newer, npm and rootless Podman. Then, from this
directory:

```sh
npm ci
npm run setup:local
npm run dev
```

Open <http://localhost:5174>. Setup starts a local PostgreSQL database with fictional
records. Your generated password is in `.local/owner-credentials.json`. Press Ctrl-C
to stop; your data stays, and running setup again keeps it.

The [workflow guide](docs/WORKFLOW.md) walks through using it for a real application.

## Under the hood

Built with React, TypeScript, Fastify and PostgreSQL. In production, one process
serves both the interface and the API.

| Worth reading                                                | Why                                  |
| ------------------------------------------------------------ | ------------------------------------ |
| [`RecordDialog.tsx`](src/client/components/RecordDialog.tsx) | Saving, validation, unsaved changes  |
| [`model.ts`](src/shared/model.ts)                            | Stages and calendar-date follow-ups  |
| [`validation.ts`](src/server/validation.ts)                  | The rules every request has to pass  |
| [`browser.ts`](tests/browser.ts)                             | An application from start to archive |

## What it leaves out

It's a personal project, with one owner and no collaboration. It
doesn't send reminders, upload documents or submit applications, and there's no
JSON import.

## Going further

- [Workflow](docs/WORKFLOW.md): using it for a real application
- [Architecture](docs/ARCHITECTURE.md): the data model and security boundary
- [Deployment](docs/DEPLOYMENT.md): owner mode, the demo, backups and recovery
- [Contributing](CONTRIBUTING.md): where things live and how to run the tests
- [Design](DESIGN.md): the visual rules

The [first public commit](https://github.com/adaalrf/anq-next-step/commit/3abb4a5) is
a squashed snapshot of earlier work; changes since then are recorded one by one.
