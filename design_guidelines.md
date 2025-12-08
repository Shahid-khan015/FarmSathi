# Design Guidelines: Agricultural Machinery Work Monitoring & Wage Transparency System

## Design Philosophy
Create a mobile-first UI optimized for **outdoor readability** and **large touch targets** that reduces disputes through clear visual hierarchy and wage transparency. The design should feel professional yet approachable for agricultural workers.

---

## Visual Design System

### Color Palette
- **Primary Color**: Green or Blue (agricultural/tech aesthetic)
- **Background**: Light grey / off-white (neutral, reduces eye strain outdoors)
- **Status Colors**:
  - **Green**: Approved, Active, Completed
  - **Yellow/Amber**: Pending, In Progress, Awaiting Approval
  - **Red**: Disputed, Offline, Error states
- **Text**: Clear contrast ratios for outdoor visibility

### Typography
Establish clear visual hierarchy across all screens:
- **Large Titles**: Role headers, screen titles ("Hi, [Name]", "Owner Dashboard")
- **Subtitles**: Section headers ("Today's Jobs", "My Machines", "Work Summary")
- **Body Text**: Job details, descriptions, labels
- **Small Text**: Metadata (dates, IDs, secondary info)
- **Emphasis**: Wage amounts should be prominent and easily scannable

### Component Styling
- **Cards**: Primary container for jobs, machines, summaries, and stats
  - Subtle shadows or borders
  - Adequate padding for touch-friendly spacing
  - Rounded corners for modern feel
- **Badges**: Small colored chips for status indicators
  - Pill-shaped or rounded rectangles
  - Color-coded as per status colors above
- **Buttons**:
  - Large, full-width primary actions ("Start Job", "Approve Job & Wage")
  - Secondary buttons for disputes or cancel actions
  - Floating action buttons where contextually appropriate
- **Icons**: Use meaningful icons throughout
  - Machine/tractor icons
  - Clock/time icons for hours
  - Rupee symbol (₹) for wages
  - Distance/location icons

---

## Architecture Decisions

### Authentication & Roles
- **No Real Authentication**: Mock login flow only
- **Role Selection as Entry Point**: Large, clear role buttons for "Farmer", "Machine Owner", "Operator"
- **Optional Mock Login**: Simple name + phone fields (no validation) or skip directly to role home

### Navigation Structure
- **Root Stack Navigation** with three role-specific stacks:
  - RoleSelectScreen (entry point)
  - Optional MockLoginScreen
  - OperatorStack, FarmerStack, OwnerStack
- **Optional Bottom Tabs** within each role:
  - Home, Jobs, Profile tabs for easier navigation
- **Stack-based drill-down** for details (job details, machine details, wage details)

---

## Screen Specifications by Role

### 1. Role Selection & Entry
**RoleSelectScreen**
- App logo and title at top
- Three large, vertically stacked buttons:
  - "I am a Farmer"
  - "I am a Machine Owner"
  - "I am an Operator"
- Each button navigates to corresponding role home (or optional mock login)

**MockLoginScreen** (Optional)
- Header: "Enter Your Details"
- Fields: Name (text), Phone (numeric input)
- "Continue" button → navigate to role home

---

### 2. Operator Interface

**OperatorHomeScreen**
- Header: Personalized greeting "Hi, [Operator Name]"
- Stats row: 3 small cards displaying:
  - "Jobs Today" (number)
  - "Completed" (number)
  - "Pending" (number)
- Section: "Today's Jobs"
  - FlatList of job cards, each showing:
    - Field name + village
    - Machine name
    - Status badge (Not Started/In Progress/Completed)
    - Estimated wage (₹ amount, prominent)
- Footer/FAB: "View Wage Summary" button

**OperatorJobDetailScreen**
- Header: Job ID
- Job Info card:
  - Field name, Machine name, Farmer name
- Work Summary card (static mock values):
  - Distance covered (km)
  - Engine hours (h)
  - Fuel used (L) - optional
- Large status chip at top
- Action buttons:
  - "Start Job" (primary, green when available)
  - "End Job" (enabled when in progress)
- On button press: show toast/snackbar confirmation, update status visually

**OperatorWageSummaryScreen**
- List of past jobs with cards showing:
  - Job name
  - Date
  - Net wage amount (₹)
  - Status badge (Approved/Pending/Disputed)
- Tap to drill down to WageDetailScreen

**OperatorWageDetailScreen**
- Work Summary section: distance, hours
- Wage Breakdown section:
  - Formula display: "₹200 per hour × 5.0 hours"
  - Gross wage (large, prominent)
- Status badge: Approved/Pending/Disputed

---

### 3. Farmer Interface

**FarmerHomeScreen**
- Header: "Welcome, Farmer"
- Stats cards row:
  - Jobs this week
  - Total wage to pay (₹)
  - Machines used
- Section: "Recent Jobs on My Fields"
  - Job cards showing:
    - Field name
    - Machine name + Operator name
    - Date
    - Status: Awaiting Approval/Approved/Disputed
- Tap job → FarmerJobDetailScreen

**FarmerJobDetailScreen**
- Job Info section: Field, Machine, Operator, Date
- Work Summary card: Distance, Engine hours, Estimated area (mock values)
- Wage Summary card:
  - Rate type (per hour/per distance)
  - Rate value
  - Calculated wage amount (prominent)
- Action buttons:
  - "Approve Job & Wage" (primary, green)
  - "Raise Dispute" (secondary, red/amber outline)
- On Approve: disable button, show green success state
- On Dispute: open modal with:
  - Reason dropdown (distance incorrect, area incorrect, etc.)
  - Text input for comments
  - "Submit Dispute" button
  - On submit: close modal, change status to "Disputed"

**FarmerJobHistoryScreen**
- Filter pills at top: "All", "Approved", "Pending", "Disputed" (visual only, optional local filtering)
- List of all jobs with cards showing:
  - Field, Machine, Date
  - Wage amount
  - Status badge

---

### 4. Owner Interface

**OwnerHomeScreen**
- Header: "Owner Dashboard"
- Stats cards row:
  - Active machines
  - Jobs today
  - Total wage (week)
- Section: "My Machines"
  - Machine cards showing:
    - Machine name
    - Type (Tractor, Harvester, etc.)
    - Status badge: Active/Idle/Offline
- "View All Jobs" button

**MachineDetailScreen**
- Header: Machine name + ID
- Tabs or segmented control:
  - **Jobs Tab**: List of jobs for this machine
  - **Usage Tab**: Simple bar chart UI using View widths (show utilization percentages)
  - **Maintenance Tab**: Next service due info + list of past services

**OwnerJobsScreen**
- List of all jobs for owner's machines
- Job cards showing:
  - Field, Machine, Operator
  - Status badge
  - Wage amount
  - Farmer approval status ("Farmer: Approved" / "Pending")
- Optional toggle for "Wage Paid" status (local state update only)

---

## Interaction Design

### Touch Targets
- **Minimum 44pt height** for all tappable elements
- **Large buttons** for primary actions (full-width or prominent)
- **Card-based lists** with entire card tappable (not just text)

### Feedback & States
- **Button press states**: Visual feedback (opacity, color change)
- **Status changes**: Toast/Snackbar messages for confirmations
- **Loading states**: "Loading..." text or simple placeholders when simulating delays
- **Success states**: Green checkmarks, disabled buttons after approval
- **Error/Dispute states**: Red badges, clear error messaging in dispute modal

### Forms & Inputs
- **Dispute Modal**: Clean modal design with dropdown + text area
- **Mock Login**: Simple, non-validated inputs with clear labels
- **Clear CTAs**: Primary button always visible and accessible

---

## Data Presentation

### Job Cards
Consistently show across all roles:
- Job/Field identifier
- Machine info
- Relevant role info (operator name for farmer, farmer name for operator)
- Wage amount (prominent, right-aligned or bottom)
- Status badge (color-coded, top-right or bottom)

### Wage Information
Always display with clarity:
- **Formula**: Show calculation method (e.g., "₹200/hour × 5h")
- **Amount**: Large, bold rupee amount (₹)
- **Status**: Separate visual indicator

### Summary Cards
Use structured card layouts for:
- Work summaries (distance, hours, fuel)
- Stats dashboards (3-card row layout)
- Machine info (with tabs/segments)

---

## Accessibility & Usability

- **Outdoor Readability**: High contrast, avoid pure white backgrounds
- **Scannable Lists**: Use visual hierarchy, icons, and color-coding
- **Clear Status Indicators**: Never rely on color alone; use text labels + badges
- **Chunked Information**: Group related data in cards to reduce cognitive load
- **Thumb-Friendly Navigation**: Bottom tabs or FABs for primary navigation within roles

---

## Mock Data & States
- All data hardcoded in frontend (jobs, machines, users, wages)
- Simulate state changes locally (job start/end, approvals, disputes)
- No backend calls—pure UI demonstration
- Optional simulated delays (timeouts) to show loading states