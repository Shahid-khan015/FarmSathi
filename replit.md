# AgriTrack - Agricultural Machinery Work Monitoring App

## Overview
AgriTrack is a React Native (Expo) mobile application designed for agricultural machinery work monitoring and wage transparency. The app features three distinct role-based interfaces to help farmers, machine owners, and operators track work, reduce wage disputes, and improve transparency.

## Current State
The app is fully functional with mock data and ready for user testing.

## User Roles

### 1. Operator
Machine operators can:
- View their daily job assignments
- Track job progress and status
- View wage summaries and detailed breakdowns
- See earnings by period

### 2. Farmer
Farmers can:
- View jobs on their land
- Approve or dispute completed work
- Review job history with filtering options
- Track total costs and job statistics

### 3. Machine Owner
Machine owners can:
- Manage their machinery fleet
- View all jobs across their machines
- Track revenue and machine utilization
- Monitor operator performance

## Project Architecture

### Frontend (client/)
- **App.tsx**: Main app entry point with providers (ErrorBoundary, AppProvider, Navigation)
- **navigation/**: React Navigation setup with role-based stack navigators
- **screens/**: Screens organized by user role (operator/, farmer/, owner/)
- **components/**: Reusable UI components (JobCard, StatusBadge, StatCard, etc.)
- **context/AppContext.tsx**: Global state management for user data and mock data
- **data/mockData.ts**: Mock data for jobs, machines, and users
- **constants/theme.ts**: Design system with colors, spacing, typography

### Backend (server/)
- Express server on port 5000
- Currently serves static files for Expo
- Ready for API endpoints when database integration is needed

## Design System
- Agricultural theme with green primary color (#2E7D32)
- Status colors: Green (completed), Yellow (pending), Red (disputed)
- Card-based layouts for outdoor readability
- Touch-friendly interaction patterns
- iOS 26 Liquid Glass design inspiration

## Key Features
- Role selection screen for switching between personas
- Dashboard views with statistics and job lists
- Detailed job views with work information
- Wage/cost transparency with clear breakdowns
- Job approval/dispute workflow for farmers
- Machine management for owners

## Running the App
The app runs automatically via the "Start dev servers" workflow:
- Expo dev server on port 8081
- Express server on port 5000
- Scan QR code with Expo Go to test on physical device

## Recent Changes
- December 2024: Initial implementation with full role-based UI and mock data system

## User Preferences
- Mock data only (no backend integration required)
- Card-based layouts throughout
- Touch-friendly design for outdoor use
