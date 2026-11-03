export const stages = [
  'saved',
  'applied',
  'interview',
  'offer',
  'accepted',
  'rejected',
  'withdrawn',
] as const;
export const stageLabels: Record<(typeof stages)[number], string> = {
  saved: 'Saved',
  applied: 'Applied',
  interview: 'Interviewing',
  offer: 'Offer',
  accepted: 'Accepted',
  rejected: 'Rejected',
  withdrawn: 'Withdrawn',
};
export const activeStages = ['saved', 'applied', 'interview', 'offer'] as const;
export const isActive = (stage: string) =>
  activeStages.includes(stage as (typeof activeStages)[number]);
export type Stage = (typeof stages)[number];
// Mirrors the server schema in src/server/validation.ts, which checks the two stay equal.
export type ApplicationInput = {
  company: string;
  role: string;
  location: string;
  jobUrl: string;
  contact: string;
  salary: string;
  notes: string;
  coverLetter: string;
  applicationAddress: string;
  nextAction: string;
  stage: Stage;
  appliedOn: string | null;
  followUpOn: string | null;
};
export type Application = ApplicationInput & {
  id: string;
  version: number;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
};
export type Activity = {
  id: string;
  applicationId: string;
  company: string;
  role: string;
  kind: 'created' | 'stage' | 'note';
  body: string;
  fromStage: (typeof stages)[number] | null;
  toStage: (typeof stages)[number] | null;
  createdAt: string;
};
export function localToday(now = new Date()) {
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}
export function needsFollowUp(
  app: Pick<Application, 'archived' | 'stage' | 'followUpOn'>,
  today = localToday(),
) {
  return !app.archived && isActive(app.stage) && app.followUpOn !== null && app.followUpOn <= today;
}
