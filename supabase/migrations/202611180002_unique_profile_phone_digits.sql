-- NMC: enforce unique phone numbers regardless of spaces, punctuation, or country-code plus sign.
-- Existing data was checked for duplicates before applying this migration.

CREATE UNIQUE INDEX IF NOT EXISTS profiles_phone_digits_unique_idx
ON public.profiles (
  regexp_replace(btrim(phone), '[^0-9]', '', 'g')
)
WHERE phone IS NOT NULL
  AND btrim(phone) <> '';
