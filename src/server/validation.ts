import { z } from 'zod';
import { stages, type ApplicationInput } from '../shared/model.js';

// Request schemas stay on the server; the client only shares the plain types they produce.
const text = (max: number) => z.string().trim().max(max);
const webUrl = z.union([
  z.literal(''),
  z
    .url()
    .max(2000)
    .refine(
      (value) => ['https:', 'http:'].includes(new URL(value).protocol),
      'Use an HTTP or HTTPS URL',
    ),
]);
export const applicationInput = z
  .object({
    company: text(120).min(1),
    role: text(160).min(1),
    location: text(160),
    jobUrl: webUrl,
    contact: text(200),
    salary: text(160),
    notes: text(4000),
    coverLetter: text(20000).default(''),
    applicationAddress: text(2000).default(''),
    nextAction: text(500).default(''),
    stage: z.enum(stages),
    appliedOn: z.iso.date().nullable(),
    followUpOn: z.iso.date().nullable(),
  })
  .strict();
export const applicationUpdate = applicationInput.extend({
  version: z.number().int().positive(),
  archived: z.boolean(),
  coverLetter: text(20000).optional(),
  applicationAddress: text(2000).optional(),
  nextAction: text(500).optional(),
});
export const noteInput = z.object({ body: text(8000).min(1) }).strict();
export const followUpInput = z
  .object({
    version: z.number().int().positive(),
    followUpOn: z.iso.date().nullable(),
    body: text(7800).min(1),
    nextAction: text(500).optional(),
  })
  .strict()
  .refine((input) => input.body.length + (input.nextAction?.length || 0) <= 7900, {
    path: ['body'],
    message: 'Shorten the follow-up note or next action (7,900 characters combined).',
  });

// Fails to compile if the schema and the shared ApplicationInput type drift apart.
type Same<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;
const schemaMatchesSharedType: Same<z.infer<typeof applicationInput>, ApplicationInput> = true;
void schemaMatchesSharedType;
