/**
 * Cloudinary URLs for phone mockup clips (same order as former `public/videos/*` list).
 * Panel index `n` plays `FEATURE_VIDEO_SOURCES[n]` (clamped at runtime).
 */
export const FEATURE_VIDEO_SOURCES = [
  'https://res.cloudinary.com/dhzx4ux2v/video/upload/v1776014009/onboarding_jne0mr.mp4',
  'https://res.cloudinary.com/dhzx4ux2v/video/upload/v1776013743/create-transaction_kej9w6.mp4',
  'https://res.cloudinary.com/dhzx4ux2v/video/upload/v1776013152/accessibility_fceqrb.mp4',
  'https://res.cloudinary.com/dhzx4ux2v/video/upload/v1776013446/type-expense-shortcut_esivtc.mp4',
  'https://res.cloudinary.com/dhzx4ux2v/video/upload/v1776013983/voice-expenses_qsxgvo.mp4',
  'https://res.cloudinary.com/dhzx4ux2v/video/upload/v1776014072/import-statement_ifytdl.mp4',
  'https://res.cloudinary.com/dhzx4ux2v/video/upload/v1776014088/analytics_wrdpq8.mp4',
] as const;

/** Index into `FEATURE_VIDEO_SOURCES` for the voice-expense clip (used for optional sound UI). */
export const VOICE_EXPENSES_VIDEO_INDEX: number = (() => {
  const i = FEATURE_VIDEO_SOURCES.findIndex((url) => url.includes('voice-expense'));
  return i >= 0 ? i : 4;
})();
