# RIYAS NIFRAN – PREMIUM ACCOUNTING & FINANCE E-PORTFOLIO

Production-grade, dynamic executive portfolio and content management system for **Riyas Nifran**, an undergraduate reading for the **Bachelor of Business Management (Honours) in Accountancy** at the **University of Kelaniya, Sri Lanka** (Faculty of Commerce and Management Studies, Department of Accountancy, Batch 2023, Second Year).

Designed and built to the standard required for corporate applications in:
- Junior Accountant
- Audit Trainee
- Accounts Executive
- Finance Assistant
- Corporate Finance Intern / Trainee

---

## 1. VISUAL IDENTITY & THEME SPECIFICATIONS

**Theme:** Executive Finance  
Inspired by modern financial institutions, audit firms, and corporate governance portals.

### Design Tokens
- **Midnight Navy:** `#10243A` (Primary backgrounds, headings, strong corporate containers)
- **Deep Navy:** `#172F49` (Secondary dark backgrounds, interactive depth)
- **Warm Ivory:** `#F7F6F2` (Editorial canvas background)
- **Pure White:** `#FFFFFF` (Card surfaces, clean document backgrounds)
- **Champagne Gold:** `#B89A5A` (Sophisticated accent borders, badges, line graphs)
- **Muted Slate:** `#64748B` (Secondary text, metadata, subtle borders)
- **Soft Border:** `#E4E7EB` (Clean, unobtrusive structural dividers)
- **Success Green:** `#277A59` (Verified statuses, high-grade badges)
- **Error Red:** `#C44F4F` (Alerts, destructive confirmations)

### Typography
- **Headings:** Manrope / DM Sans
- **Body & Paragraphs:** Inter
- **Financial Figures & Metrics:** Tabular numerals (`tabular-nums`)

---

## 2. SYSTEM ARCHITECTURE

```
portfolio-ruja/
├── client/                     # Frontend SPA (React + Vite + Tailwind CSS)
│   ├── public/
│   │   ├── assets/             # Real photographic and academic result assets
│   │   │   ├── profile/        # Portraits of Riyas Nifran
│   │   │   ├── academic-results/ # Official examination result PDFs (RUJA.pdf, etc.)
│   │   │   ├── company-visits/ # Kelani Cables PLC & LB Finance PLC photos
│   │   │   ├── projects/       # Academic projects
│   │   │   └── certificates/   # AAT, CA Sri Lanka certificates
│   │   └── uploads/            # Persistent local mirror of uploaded files
│   ├── src/
│   │   ├── components/         # Modular corporate components (Navbar, Footer, AcademicCard, etc.)
│   │   ├── context/            # AuthContext (JWT/Sessions) & PortfolioContext (Data cache)
│   │   ├── pages/              # 9 Public Pages + Complete Admin Management Suite
│   │   └── services/           # REST API client with credentials & headers
│   └── tailwind.config.js
│
├── server/                     # Backend REST API (Node.js + Express + Mongoose)
│   ├── public/uploads/         # Persistent uploaded file storage
│   ├── src/
│   │   ├── config/db.js        # MongoDB connection with retry logic
│   │   ├── middleware/         # JWT auth middleware, Multer file signature & MIME validation
│   │   ├── models/             # 13 Mongoose Schemas (Admin, Profile, Academics, Projects, etc.)
│   │   ├── routes/             # Auth, Public, Admin CRUD, Contact, Upload routes
│   │   └── scripts/seed.js     # Master database seeding script
│   ├── .env                    # Active local environment variables
│   └── .env.example            # Template environment variables
│
└── package.json                # Root orchestration scripts
```

---

## 3. ADMIN ACCESS & SECURITY

- **Portal URL:** `http://localhost:5173/admin`
- **Initial Username:** `RIYAS NIFRAN` *(case-insensitive)*
- **Initial Password:** `nifran2026`
- **First-Time Login Requirement:** The system automatically identifies the initial password flag and presents a mandatory security password change dialogue upon first login.
- **Privacy Enforcement:** Date of Birth (`05 April 2003`) is stored in MongoDB but strictly excluded from all public API responses (`select('-dateOfBirth')`). It is accessible and editable only by authenticated administrators inside `/admin`.

---

## 4. DATABASE & PERSISTENCE

### MongoDB Collections
1. `admins` – Admin accounts with bcrypt-hashed passwords and first-login change flags.
2. `profiles` – Biographies, degree information, portrait links, CV link, and career objectives.
3. `academicachievements` – G.C.E. A/L (3 As, Z-Score 1.7047), G.C.E. O/L, AAT Level 3 (2024), CA Sri Lanka Business Level, linked to official PDF results.
4. `projects` – Financial Accounting, HRM, Taxation, and Corporate Finance case studies with objectives, contributions, and outcomes.
5. `companyvisits` – Kelani Cables PLC & LB Finance PLC field visits with verified image galleries and key learnings.
6. `extracurricularactivities` – Association of Islamic Students, Cricket Team, Egyptians House, Deepavali organization, etc.
7. `events` – Accounting seminars and tax awareness workshops.
8. `skills` – Technical software (Tally ERP, MYOB, Excel) and Executive professional traits.
9. `certificates` – AAT Level 3 Certificate, CA Sri Lanka records, examination boards.
10. `reflections` – Structured evaluation (What I Learned, Most Valuable Experience, Strengths/Improvements, Challenges/Solutions, Career Goals).
11. `contactmessages` – Public inquiries with email, phone, timestamp, and read status.
12. `documents` – Centralized document repository with MIME type, size, and download paths.
13. `sitesettings` – Dynamic title, design theme, and contact form availability.

---

## 5. INSTALLATION & RUNNING INSTRUCTIONS

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB service running locally on `mongodb://127.0.0.1:27017`

### Setup Commands

1. **Install Dependencies:**
   ```bash
   npm run install:all
   ```

2. **Seed Initial Database Content:**
   ```bash
   npm run seed
   ```

3. **Start Full Application:**
   - **Terminal 1 (Backend API):**
     ```bash
     npm run server
     ```
     *Server runs on: `http://localhost:5000`*

   - **Terminal 2 (Frontend Client):**
     ```bash
     npm run client
     ```
     *Client runs on: `http://localhost:5173`*

4. **Production Build:**
   ```bash
   npm run build
   ```

---

## 6. VERIFIED CANDIDATE ACADEMIC RECORD

- **Degree:** Bachelor of Business Management (Honours) in Accountancy, University of Kelaniya (Batch 2023, Second Year).
- **AAT Sri Lanka:** Level 3 Completed (2024)
  - Financial Reporting: A
  - Management Accounting and Finance: A
  - Corporate and Personal Taxation: B
  - Financial Control and Audit: B
- **CA Sri Lanka:** Business Level (Currently Pursuing).
- **G.C.E. Advanced Level (Commerce Stream):**
  - Business Studies: A
  - Accounting: A
  - Economics: A
  - Z-Score: 1.7047
- **G.C.E. Ordinary Level:**
  - Mathematics: A, History: A, Health: A, Islamic Studies: A
  - Tamil: B, Tamil Literature: B, Civics: B
  - English: C, Science: C

