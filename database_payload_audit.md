# Business & Beyond — Complete Database Payload Audit
### READ-ONLY — No code or database changes made
---

# 1. Registration Form Fields

| Form Label | Frontend Variable | Type | Required | Example Value | Validation Rule | API Property Name |
|---|---|---|---|---|---|---|
| Full Name | `name` | string | **Yes** | `<TEST_NAME>` | Non-empty, trimmed | `name` |
| Email Address | `email` | string | **Yes** | `<TEST_EMAIL>` | Valid email regex `^[^\s@]+@[^\s@]+\.[^\s@]+$` | `email` |
| Contact Number | `phone` | string | **Yes** | `<TEST_PHONE>` | Non-empty, `.length >= 10` | `phone` |
| Gender | `gender` | string (select) | **Yes** | `Male` | Non-empty (must select option) | `gender` |
| LinkedIn Profile URL | `linkedin` | string | **No** | `https://linkedin.com/in/username` | None | `linkedin` |
| Instagram Handle | `instagram` | string | **No** | `@username` | None | `instagram` |
| Company / Business Name | `company_name` | string | **Yes** | `<TEST_COMPANY>` | Non-empty, trimmed | `company_name` |
| Your Role | `role` | string (select) | **Yes** | `Founder / Co-Founder` | Non-empty | `role` |
| Industry | `industry` | string (select) | **Yes** | `Technology` | Non-empty | `industry` |
| Annual Revenue | `annual_revenue` | string (select) | **Yes** | `₹50L – ₹2Cr` | Non-empty | `annual_revenue` |
| Business Sector | `business_sector` | string (select) | **Yes** | `B2B` | Non-empty | `business_sector` |
| Please specify (sector) | `other_sector` | string | **No** | `<TEST_SECTOR>` | Only shown if `business_sector === "Other"` | `other_sector` |
| What does your business do? | `product_service` | string (textarea) | **Yes** | `<TEST_PRODUCT>` | Non-empty, trimmed | `product_service` |
| Primary Need | `primary_need` | string (select) | **Yes** | `Finding investors / funding` | Non-empty | `primary_need` |
| Primary Goal | `primary_goal` | string (select) | **Yes** | `Business growth & scaling` | Non-empty | `primary_goal` |
| About (yourself & journey) | `about` | string (textarea) | **Yes** | `<TEST_ABOUT>` | Non-empty, `.trim().length >= 20` | `about` |

**Total fields collected: 16**  
**Required: 13 | Optional: 3 (linkedin, instagram, other_sector)**

---

# 2. Frontend → API Payload

**How it is sent** (line 261–265 of `FormOnboarding.tsx`):
```javascript
fetch("/api/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),   // formData is the raw React state object
})
```

The frontend sends the **raw `formData` state object with zero transformation**. Every field is sent as-is, including empty strings for optional fields that were not filled in.

**Complete request body structure:**
```json
{
  "name": "<TEST_NAME>",
  "email": "<TEST_EMAIL>",
  "phone": "<TEST_PHONE>",
  "gender": "<TEST_GENDER>",
  "linkedin": "<TEST_LINKEDIN_OR_EMPTY_STRING>",
  "instagram": "<TEST_INSTAGRAM_OR_EMPTY_STRING>",
  "company_name": "<TEST_COMPANY>",
  "role": "<TEST_ROLE>",
  "industry": "<TEST_INDUSTRY>",
  "annual_revenue": "<TEST_REVENUE>",
  "business_sector": "<TEST_SECTOR>",
  "other_sector": "<TEST_OTHER_SECTOR_OR_EMPTY_STRING>",
  "product_service": "<TEST_PRODUCT>",
  "primary_need": "<TEST_NEED>",
  "primary_goal": "<TEST_GOAL>",
  "about": "<TEST_ABOUT>"
}
```

> **Note:** `linkedin`, `instagram`, and `other_sector` are always present in the payload, even when not filled in — they arrive as `""` (empty string), **not** `null` or `undefined`.

---

# 3. API → Supabase Payload

**File:** `src/app/api/register/route.ts`

### Transformation steps (lines 42–115):

```
body (raw JSON) 
  ↓
body.email.toLowerCase().trim()  → stored as emailKey
  ↓
crypto.randomBytes(32).toString("hex")  → rawToken
  ↓
hashToken(rawToken)  → tokenHash (SHA-256 hex string)
  ↓
new Date(Date.now() + 48h).toISOString()  → expiresAt
  ↓
supabaseServer.from("registrations").select("*", {count:"exact", head:true})  → count
  ↓
`BNB-2026-${String(count + 1).padStart(5, "0")}`  → registrationId
  ↓
newRecord object assembled (lines 93–115)
  ↓
supabaseServer.from("registrations").insert([newRecord])
```

---

# 4. Complete Supabase Insert Object

This is the **exact object** passed to `.insert([newRecord])` (assembled at lines 93–115 of `register/route.ts`):

```json
{
  "registration_id": "BNB-2026-00001",
  "name": "<TEST_NAME trimmed>",
  "email": "<TEST_EMAIL lowercased+trimmed>",
  "phone": "<TEST_PHONE trimmed>",
  "gender": "<TEST_GENDER>",
  "linkedin": null,
  "instagram": null,
  "company_name": "<TEST_COMPANY trimmed>",
  "role": "<TEST_ROLE>",
  "industry": "<TEST_INDUSTRY>",
  "annual_revenue": "<TEST_REVENUE>",
  "business_sector": "<TEST_SECTOR>",
  "other_sector": null,
  "product_service": "<TEST_PRODUCT trimmed>",
  "primary_need": "<TEST_NEED>",
  "primary_goal": "<TEST_GOAL>",
  "about": "<TEST_ABOUT trimmed>",
  "approval_status": "PENDING_APPROVAL",
  "approval_token_hash": "<SHA256_HEX_64_CHARS>",
  "approval_token_expires_at": "2026-08-17T13:XX:XX.XXXZ",
  "payment_status": "NOT_STARTED"
}
```

**Total properties explicitly sent to Supabase: 20**

---

# 5. Data Types

| Property | JS Type | Example Value | Expected PostgreSQL Type |
|---|---|---|---|
| `registration_id` | string | `BNB-2026-00001` | `TEXT` |
| `name` | string | `<TEST_NAME>` | `TEXT` |
| `email` | string | `<TEST_EMAIL>` | `TEXT` |
| `phone` | string | `<TEST_PHONE>` | `TEXT` |
| `gender` | string | `Male` | `TEXT` |
| `linkedin` | string \| null | `null` | `TEXT` (nullable) |
| `instagram` | string \| null | `null` | `TEXT` (nullable) |
| `company_name` | string | `<TEST_COMPANY>` | `TEXT` |
| `role` | string | `Founder / Co-Founder` | `TEXT` |
| `industry` | string | `Technology` | `TEXT` |
| `annual_revenue` | string | `₹50L – ₹2Cr` | `TEXT` |
| `business_sector` | string | `B2B` | `TEXT` |
| `other_sector` | string \| null | `null` | `TEXT` (nullable) |
| `product_service` | string | `<TEST_PRODUCT>` | `TEXT` |
| `primary_need` | string | `Finding investors / funding` | `TEXT` |
| `primary_goal` | string | `Business growth & scaling` | `TEXT` |
| `about` | string | `<TEST_ABOUT>` | `TEXT` |
| `approval_status` | string | `PENDING_APPROVAL` | `TEXT` with CHECK constraint |
| `approval_token_hash` | string | `<64 hex chars>` | `TEXT` (UNIQUE) |
| `approval_token_expires_at` | string (ISO 8601) | `2026-08-17T13:00:00.000Z` | `TIMESTAMP WITH TIME ZONE` |
| `payment_status` | string | `NOT_STARTED` | `TEXT` with CHECK constraint |

---

# 6. NULL / Empty / Optional Fields

| Property | Sent as NULL? | Sent as Empty String? | Omitted entirely? | Notes |
|---|---|---|---|---|
| `registration_id` | No | No | No | Always explicitly set |
| `name` | No | No | No | Required, trimmed |
| `email` | No | No | No | Required, lowercased+trimmed |
| `phone` | No | No | No | Required, trimmed |
| `gender` | No | No | No | Required, selected value |
| `linkedin` | **Yes** (when blank) | No | No | `body.linkedin?.trim() \|\| null` |
| `instagram` | **Yes** (when blank) | No | No | `body.instagram?.trim() \|\| null` |
| `company_name` | No | No | No | Required, trimmed |
| `role` | No | No | No | Required, selected value |
| `industry` | No | No | No | Required, selected value |
| `annual_revenue` | No | No | No | Required, selected value |
| `business_sector` | No | No | No | Required, selected value |
| `other_sector` | **Yes** (when blank) | No | No | `body.other_sector?.trim() \|\| null` |
| `product_service` | No | No | No | Required, trimmed |
| `primary_need` | No | No | No | Required, selected value |
| `primary_goal` | No | No | No | Required, selected value |
| `about` | No | No | No | Required, trimmed |
| `approval_status` | No | No | No | Always `"PENDING_APPROVAL"` |
| `approval_token_hash` | No | No | No | Always a 64-char SHA-256 hex string |
| `approval_token_expires_at` | No | No | No | Always an ISO date string |
| `payment_status` | No | No | No | Always `"NOT_STARTED"` |

**Fields NOT sent at all (rely entirely on DB defaults):**

| Property | DB Default |
|---|---|
| `id` | `gen_random_uuid()` |
| `approved_at` | Not sent → column remains NULL |
| `rejected_at` | Not sent → column remains NULL |
| `confirmation_status` | `'PENDING'` (DB default) |
| `confirmation_token_hash` | Not sent → column remains NULL |
| `confirmation_expires_at` | Not sent → column remains NULL |
| `confirmed_at` | Not sent → column remains NULL |
| `payment_id` | Not sent → column remains NULL |
| `payment_reference` | Not sent → column remains NULL |
| `amount` | Not sent → column remains NULL |
| `payment_method` | Not sent → column remains NULL |
| `paid_at` | Not sent → column remains NULL |
| `registered_at` | `now()` (DB default) |
| `created_at` | `now()` (DB default) |
| `updated_at` | `now()` (DB default) |

---

# 7. Status / Enum Values

### `approval_status`
- **Value sent during INSERT:** `"PENDING_APPROVAL"`
- **Valid values in code:** `"PENDING_APPROVAL"`, `"APPROVED"`, `"REJECTED"`
- **Valid values in schema.sql CHECK constraint:** `'PENDING_APPROVAL'`, `'APPROVED'`, `'REJECTED'`
- **Status match:** ✅ `"PENDING_APPROVAL"` is in the CHECK constraint

### `payment_status`
- **Value sent during INSERT:** `"NOT_STARTED"`
- **Valid values in schema.sql CHECK constraint:** `'NOT_STARTED'`, `'PENDING'`, `'PAYMENT_PENDING'`, `'PAID'`, `'FAILED'`, `'REFUNDED'`, `'CANCELLED'`
- **Values used in code (across files):** `"NOT_STARTED"`, `"PAYMENT_PENDING"`, `"PAID"`, `"FAILED"`, `"PENDING"`
- **Status match:** ✅ All code values are in the CHECK constraint

### `confirmation_status` (legacy — NOT sent by the application)
- **NOT explicitly sent by `register/route.ts`**
- **Schema default:** `'PENDING'`
- **Valid values in schema.sql CHECK constraint:** `'PENDING'`, `'CONFIRMED'`, `'EXPIRED'`

---

# 8. Additional Database Operations

The `POST /api/register` route performs **3 Supabase operations** before INSERT:

### Operation 1 — SELECT (duplicate email check)
```
Table: registrations
Operation: SELECT
Columns: email, approval_status, payment_status, registration_id
Condition: .eq("email", emailKey)
Mode: .maybeSingle()
Purpose: Detect duplicate registration for same email
```

### Operation 2 — SELECT (duplicate phone check)
```
Table: registrations
Operation: SELECT
Columns: phone
Condition: .eq("phone", body.phone.trim())
Mode: .maybeSingle()
Purpose: Detect duplicate registration for same phone number
```

### Operation 3 — SELECT COUNT (ID generation)
```
Table: registrations
Operation: SELECT with count: "exact", head: true
Purpose: Get total record count to generate sequential registration ID
Result: count (integer)
Formula: registrationId = `BNB-2026-${String(count + 1).padStart(5, "0")}`
```

### Operation 4 — INSERT (the registration record)
```
Table: registrations
Operation: INSERT
Payload: newRecord (20 properties — see Section 4)
```

### After INSERT:
```
sendClientApprovalEmail(newRecord, reviewUrl, rawToken)
  → Sends email via Resend (or stores to dev-emails.json in dev mode)
  → NO further database operations after INSERT in the register route
```

---

# 9. Duplicate Email Query

**Exact query (lines 55–59 of `register/route.ts`):**
```javascript
const { data: existingEmail, error: emailErr } = await supabaseServer
  .from("registrations")
  .select("email, approval_status, payment_status, registration_id")
  .eq("email", emailKey)   // emailKey = body.email.toLowerCase().trim()
  .maybeSingle();
```

| Detail | Value |
|---|---|
| Table | `registrations` |
| Column filtered | `email` |
| Filter value | `body.email.toLowerCase().trim()` |
| Result mode | `.maybeSingle()` — returns `null` if not found, never throws |
| Error property | `emailErr` — checked explicitly |

**If duplicate found:**
- `approval_status === "PENDING_APPROVAL"` → returns 400 "already under review"
- `approval_status === "APPROVED"` + `payment_status === "PAID"` → returns 400 "already complete"
- `approval_status === "APPROVED"` → returns 400 "already approved, complete payment" + `registration_id`
- `approval_status === "REJECTED"` → returns 400 "unable to accept duplicate"

**If NOT found:** proceeds to phone check.

---

# 10. Registration ID Generation

**Exact code (lines 86–91 of `register/route.ts`):**
```javascript
const { count } = await supabaseServer
  .from("registrations")
  .select("*", { count: "exact", head: true });

const indexNum = (count || 0) + 1;
const registrationId = `BNB-2026-${String(indexNum).padStart(5, "0")}`;
```

| Detail | Value |
|---|---|
| Method | Database COUNT query + arithmetic |
| Uses UUID | **No** |
| Uses timestamp | **No** |
| Uses random | **No** |
| Uses sequence | **No** — uses `SELECT COUNT(*)` |
| Formula | `BNB-2026-` + zero-padded sequential number |
| Example | `BNB-2026-00001`, `BNB-2026-00042` |
| JS Type sent | `string` |
| PostgreSQL type expected | `TEXT UNIQUE NOT NULL` |
| Collision risk | Yes — if two registrations happen simultaneously, both may get the same count, causing a UNIQUE constraint violation |

---

# 11. Approval Token Handling

**Generation (lines 46–51 of `register/route.ts`):**
```javascript
const rawToken = crypto.randomBytes(32).toString("hex");  // 64-char hex string
const tokenHash = hashToken(rawToken);                     // SHA-256 of rawToken
const expiryHours = Number(process.env.APPROVAL_TOKEN_EXPIRY_HOURS) || 48;
const expiresAt = new Date(Date.now() + expiryHours * 60 * 60 * 1000).toISOString();
```

| Detail | Value |
|---|---|
| Raw token generated | Yes — 32 random bytes → 64-char hex string |
| Raw token stored in DB | **No** — only the hash is stored |
| Hash algorithm | SHA-256 (via `src/lib/hash.ts`) |
| Hash output | 64-character lowercase hex string |
| Database field for hash | `approval_token_hash` (TEXT, UNIQUE) |
| Database field for expiry | `approval_token_expires_at` (TIMESTAMP WITH TIME ZONE) |
| Expiry value | `APPROVAL_TOKEN_EXPIRY_HOURS` env var OR 48 hours default |
| Raw token sent to | Review URL in the admin email only |
| Raw token sent to DB | **Never** |

---

# 12. Old Confirmation System References

The `POST /api/register` route **does NOT reference** any of the following:
- `confirmation_status`
- `confirmation_token_hash`
- `confirmation_expires_at`
- `confirmed_at`

**These fields are NEVER explicitly sent during INSERT.** They are present in `schema.sql` but rely entirely on the database `DEFAULT 'PENDING'` for `confirmation_status`, and `NULL` for the rest.

> **Critical implication:** The schema defines `confirmation_status TEXT NOT NULL DEFAULT 'PENDING'`. Since the INSERT does not send this field, PostgreSQL must supply the DEFAULT. If the existing live Supabase table was created **before** this DEFAULT was defined, or the DEFAULT was never applied, the INSERT will fail with a NOT NULL constraint violation.

---

# 13. Payment Fields

| Property | Sent during registration INSERT? | Value if sent | Set later? |
|---|---|---|---|
| `payment_status` | **Yes** | `"NOT_STARTED"` | Yes — by `POST /api/payment-webhook` |
| `payment_id` | **No** | — | Yes — by `/api/payment-webhook` when PAID |
| `payment_reference` | **No** | — | Yes — by `/api/payment-webhook` when PAID |
| `amount` | **No** | — | Yes — by `/api/payment-webhook` when PAID |
| `payment_method` | **No** | — | Yes — by `/api/payment-webhook` when PAID |
| `paid_at` | **No** | — | Yes — by `/api/payment-webhook` when PAID |

---

# 14. Complete Registration Lifecycle

Based on what the **current code actually does**:

```
1. USER SUBMITS form on /community/join
   → POST /api/register called with 16-field JSON body

2. RATE LIMIT CHECK
   → IP-based, 10 requests per 5 minutes (in-memory)
   → If exceeded: 429 returned, flow stops

3. SERVER VALIDATION
   → 13 required fields checked (missing = 400)
   → Email regex validated (invalid = 400)

4. EMAIL KEY NORMALISED
   → body.email.toLowerCase().trim() → emailKey

5. TOKEN GENERATED
   → 32 random bytes → 64-char hex rawToken
   → SHA-256(rawToken) → tokenHash
   → expiresAt = now + 48 hours

6. isSupabaseConfigured() CHECK
   → Reads NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
   → If NOT configured → falls to LOCAL JSON fallback (not relevant here)

7. DATABASE SELECT — duplicate email check
   → SELECT email, approval_status, payment_status, registration_id
      FROM registrations WHERE email = emailKey
   → If found → appropriate 400 returned

8. DATABASE SELECT — duplicate phone check
   → SELECT phone FROM registrations WHERE phone = body.phone.trim()
   → If found → 400 "phone already registered"

9. DATABASE SELECT COUNT — registration ID generation
   → SELECT COUNT(*) FROM registrations
   → registrationId = BNB-2026-{count+1 zero-padded to 5 digits}

10. newRecord ASSEMBLED (20 properties)

11. DATABASE INSERT
    → INSERT INTO registrations (...20 fields...) VALUES (...)
    → If error → console.error + 500 "Failed to save registration."
    → If success → continue

12. SEND ADMIN EMAIL
    → sendClientApprovalEmail(newRecord, reviewUrl, rawToken)
    → In dev mode: stores to src/data/dev-emails.json
    → In prod mode: sends via Resend API

13. 200 SUCCESS RESPONSE
    → { success: true, registration_id, token }

FINAL DATABASE STATE after registration:
  approval_status    = "PENDING_APPROVAL"
  approval_token_hash = <SHA-256 hash>
  approval_token_expires_at = now + 48h
  payment_status     = "NOT_STARTED"
  confirmation_status = "PENDING"  ← DB DEFAULT (not sent by app)
  All other fields   = NULL or DB defaults
```

---

# 15. Supabase Client Configuration

**File:** `src/lib/supabaseServer.ts`

| Detail | Value |
|---|---|
| Supabase URL env var | `NEXT_PUBLIC_SUPABASE_URL` |
| Service role key env var | `SUPABASE_SERVICE_ROLE_KEY` |
| Client type used | **Service Role client** (bypasses RLS) |
| Anon client used | **No** |
| `autoRefreshToken` | `false` |
| `persistSession` | `false` |
| CONFIGURED | **YES** — both env vars present in `.env.local` |
| Fallback/mock mode | Yes — `isSupabaseConfigured()` returns `false` if env vars are missing/placeholder, routes to local JSON DB |

---

# 16. Error Handling

### Where Supabase errors are caught:

**Duplicate email SELECT (lines 61–64):**
```javascript
if (emailErr) {
  console.error("Database query error:", emailErr);
  return NextResponse.json({ success: false, error: "Database communication failed." }, { status: 500 });
}
```
→ Full Supabase error object is logged to server console only. Frontend receives only: `"Database communication failed."`

**INSERT (lines 118–121):**
```javascript
if (insertErr) {
  console.error("Supabase insert error:", insertErr);
  return NextResponse.json({ success: false, error: "Failed to save registration." }, { status: 500 });
}
```
→ Full Supabase error logged to server console. Frontend receives: `"Failed to save registration."`

**Outer catch (lines 179–182):**
```javascript
} catch (error) {
  console.error("Registration handler error:", error);
  return NextResponse.json({ success: false, error: "An internal server error occurred." }, { status: 500 });
}
```

> **Logging assessment:** The actual Supabase `error` object (with PostgreSQL error code, message, details, hint) is logged to the **server console only**. The frontend only ever receives a generic string. To diagnose the exact Postgres error, the server/Next.js console output must be inspected — the browser Network tab only shows the generic message.

---

# 17. Expected Database Schema (from application code only)

| Column | Required by Code | Expected Type | Nullable | Notes |
|---|---|---|---|---|
| `id` | No (DB generates) | UUID | No | Not sent, DB default |
| `registration_id` | Yes | TEXT, UNIQUE | No | Always sent |
| `name` | Yes | TEXT | No | Always sent |
| `email` | Yes | TEXT, UNIQUE | No | Always sent |
| `phone` | Yes | TEXT | No | Always sent |
| `gender` | Yes | TEXT | No | Always sent |
| `linkedin` | Yes | TEXT | Yes | Sent as NULL when blank |
| `instagram` | Yes | TEXT | Yes | Sent as NULL when blank |
| `company_name` | Yes | TEXT | No | Always sent |
| `role` | Yes | TEXT | No | Always sent |
| `industry` | Yes | TEXT | No | Always sent |
| `annual_revenue` | Yes | TEXT | No | Always sent |
| `business_sector` | Yes | TEXT | No | Always sent |
| `other_sector` | Yes | TEXT | Yes | Sent as NULL when blank |
| `product_service` | Yes | TEXT | No | Always sent |
| `primary_need` | Yes | TEXT | No | Always sent |
| `primary_goal` | Yes | TEXT | No | Always sent |
| `about` | Yes | TEXT | No | Always sent |
| `approval_status` | Yes | TEXT, CHECK constraint | No | Sent as `"PENDING_APPROVAL"` |
| `approval_token_hash` | Yes | TEXT, UNIQUE | Yes | Sent as 64-char hex |
| `approval_token_expires_at` | Yes | TIMESTAMP WITH TIME ZONE | Yes | Sent as ISO 8601 string |
| `payment_status` | Yes | TEXT, CHECK constraint | No | Sent as `"NOT_STARTED"` |
| `confirmation_status` | No (DB default) | TEXT, CHECK, NOT NULL | No | NOT sent — relies on DB DEFAULT 'PENDING' |
| `confirmation_token_hash` | No | TEXT, UNIQUE | Yes | NOT sent — column stays NULL |
| `confirmation_expires_at` | No | TIMESTAMP WITH TIME ZONE | Yes | NOT sent — column stays NULL |
| `confirmed_at` | No | TIMESTAMP WITH TIME ZONE | Yes | NOT sent — column stays NULL |
| `approved_at` | No | TIMESTAMP WITH TIME ZONE | Yes | NOT sent during INSERT |
| `rejected_at` | No | TIMESTAMP WITH TIME ZONE | Yes | NOT sent during INSERT |
| `payment_id` | No | TEXT | Yes | NOT sent during INSERT |
| `payment_reference` | No | TEXT | Yes | NOT sent during INSERT |
| `amount` | No | NUMERIC(10,2) | Yes | NOT sent during INSERT |
| `payment_method` | No | TEXT | Yes | NOT sent during INSERT |
| `paid_at` | No | TIMESTAMP WITH TIME ZONE | Yes | NOT sent during INSERT |
| `registered_at` | No (DB default) | TIMESTAMP WITH TIME ZONE | No | DB default: `now()` |
| `created_at` | No (DB default) | TIMESTAMP WITH TIME ZONE | No | DB default: `now()` |
| `updated_at` | No (DB default) | TIMESTAMP WITH TIME ZONE | No | DB default: `now()` |

---

# 18. Files Involved

| File | Role |
|---|---|
| `src/components/FormOnboarding.tsx` | React form UI — collects 16 fields across 3 steps, sends raw `formData` state to `/api/register` via `fetch` POST |
| `src/app/community/join/page.tsx` | Page wrapper — renders `<Header>`, `<FormOnboarding>`, `<Footer>` |
| `src/app/api/register/route.ts` | Next.js API route — validates, transforms, inserts to Supabase, sends admin email |
| `src/lib/supabaseServer.ts` | Supabase service-role client init + `isSupabaseConfigured()` check |
| `src/lib/hash.ts` | `hashToken()` — SHA-256 hash of the raw approval token |
| `src/lib/rateLimit.ts` | `checkRateLimit()` — in-memory IP-based rate limiter |
| `src/lib/email.ts` | `sendClientApprovalEmail()` — sends or stores the admin review email |
| `src/lib/db.ts` | Local JSON DB fallback — only used when Supabase is NOT configured |
| `src/data/registrations.json` | Local DB file — only used in fallback mode |
| `src/data/dev-emails.json` | Dev mailbox storage — stores simulated emails in dev mode |
| `schema.sql` | Reference schema — defines the expected PostgreSQL table structure |
| `.env.local` | Runtime environment — provides Supabase URL, service role key, Resend API key |

---

# 19. Potential Database Mismatch Candidates

These are fields/patterns identified as **likely causes of the 500 error**, based on code vs. schema analysis. **No fixes applied.**

| # | Field / Concern | Risk Level | Reason |
|---|---|---|---|
| 1 | **`approval_status` column missing** | 🔴 CRITICAL | The original table may have been created WITHOUT this column. Code sends it in BOTH the duplicate-check SELECT and the INSERT. If the column doesn't exist, Postgres returns error code `42703` ("column does not exist") during the email duplicate SELECT — before INSERT even runs. This matches the error previously logged: `'column registrations.approval_status does not exist'` |
| 2 | **`approval_token_hash` column missing** | 🔴 CRITICAL | Sent in the INSERT payload. If missing from the live table, INSERT will fail with `42703` |
| 3 | **`approval_token_expires_at` column missing** | 🔴 CRITICAL | Sent in the INSERT payload. Same risk as above |
| 4 | **`confirmation_status` DEFAULT missing** | 🟡 MEDIUM | Not sent by code — relies on DB DEFAULT `'PENDING'`. If the column exists but was added WITHOUT the DEFAULT (e.g., via a bare `ADD COLUMN`), the NOT NULL constraint will fail the INSERT |
| 5 | **`payment_status` CHECK constraint mismatch** | 🟡 MEDIUM | Code sends `"NOT_STARTED"`. If the live table has an OLD CHECK constraint (e.g., only `'PENDING'`, `'PAID'`, `'FAILED'`), the INSERT will fail with a constraint violation |
| 6 | **`phone` column NOT UNIQUE in live DB** | 🟢 LOW | The duplicate phone SELECT is a code-level check (not a DB constraint), so this alone won't cause 500. Not a mismatch risk. |
| 7 | **`approval_status` CHECK constraint value** | 🟡 MEDIUM | Code sends `"PENDING_APPROVAL"`. If the live DB has a different CHECK (e.g., `'PENDING'` instead of `'PENDING_APPROVAL'`), the INSERT will fail |
| 8 | **`linkedin` / `instagram` NULL vs empty string** | 🟢 LOW | Code correctly converts empty strings to NULL (`body.linkedin?.trim() \|\| null`). Column defined as nullable TEXT — should be fine |
| 9 | **Race condition in registration ID** | 🟢 LOW | Concurrent registrations could generate the same ID (same count), causing UNIQUE constraint violation on `registration_id`. Not the immediate 500 cause but a latent bug |
| 10 | **`id` column not being `gen_random_uuid()`** | 🟢 LOW | Code never sends `id` — relies entirely on DB default. If the live table's `id` column was created differently (e.g., no default), the INSERT will fail |
| 11 | **RLS blocking Service Role** | 🟢 LOW | RLS is enabled on the table. The code uses the Service Role client which should bypass RLS. However, if the client was accidentally initialized with the anon key instead of service role key, RLS would block all writes |

### Summary of Most Likely Root Cause:

The error `"Database communication failed."` is returned when `emailErr` is truthy (lines 61–64). This happens during the **first SELECT** (duplicate email check), which includes `approval_status` in its `.select()` call. If the live Supabase table does not have the `approval_status` column yet, Postgres returns code `42703` — caught as `emailErr`, returned as 500. **This is the same error that was logged previously.** The migration queries in `schema.sql` (lines 72–80) need to be executed in the Supabase SQL editor.
