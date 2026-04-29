# AGENTS.md - Employee Directory

## Tech Stack
- **Framework**: Next.js 15.2.1-canary.2 (App Router)
- **Database**: MongoDB native driver (not Mongoose)
- **UI**: Radix UI components in `src/components/ui/`
- **Forms**: Server Actions (`src/lib/actions.ts`)

## Developer Commands
```bash
npm run dev          # Start dev server
npm run build        # Production build
node scripts/seed.js # Seed DB with departments + employees
```

## Database
- **URI**: `mongodb://127.0.0.1:27017/employee_directory` (see `.env`)
- **Requirement**: MongoDB must be running locally before starting dev server
- **Connection pattern**: Use `connectToDatabase()` from `src/lib/mongodb.ts` - creates fresh connection per request
- **Avoid**: Cached `clientPromise` patterns - they break when MongoDB restarts

## Critical Type Facts
- `Employee` type has `departmentId` (string), NOT `department` or `email` fields
- Strip `_id` before `insertOne()` - MongoDB adds its own ObjectId
- Use department lookup map in pages: `const deptMap = new Map(departments.map(d => [d.id, d.name]))`

## Build Issues
- **Cache corruption**: Delete `.next` folder if build fails with MODULE_NOT_FOUND
- **Type errors**: Most common are missing fields on Employee type - check `src/lib/schema.ts`

## Dialog Centering Fix
Radix Dialog uses Tailwind arbitrary values: `-translate-x-1/2 -translate-y-1/2` (not `translate-x-[-50%]`)

## Routing
- Pages: `src/app/*/page.tsx`
- Dashboard: `/dashboard` (created, was missing)
- Add Employee: Dialog triggered from Sidebar, not a page route
