# 🎓 College Discovery Platform - Technical Project Report

**Date**: April 29, 2026  
**Developer**: Kaustubh Jadhav  
**Status**: Production Live  

---

## 1. Executive Summary
The **College Discovery Platform** is a full-stack web application designed to streamline the university search process for prospective students. It features a predictive ranking engine, a community-driven discussion forum, and a robust institution comparison system.

## 2. Technical Architecture
The project follows a modern **Decoupled Monolith** architecture:
*   **Frontend**: Next.js 14 (App Router) for Server-Side Rendering (SSR) and SEO optimization.
*   **Backend**: Node.js & Express.js REST API for business logic and data orchestration.
*   **Database**: PostgreSQL hosted on Neon (Serverless SQL) for relational data integrity.
*   **Authentication**: JSON Web Tokens (JWT) for secure, stateless user sessions.

## 3. Core Feature Specifications
### 🔍 Smart Discovery
*   Multi-parameter filtering (Location, Fees, Rating).
*   Real-time search debouncing for high performance.
### 📈 Admission Predictor
*   A rule-based algorithm that matches user exam ranks with historical cutoff data.
### 💬 Community Hub
*   A nested Q&A forum allowing users to post questions and receive verified answers from the community.
### ⚖️ Comparison Engine
*   Side-by-side analysis of college metrics including fees, placement stats, and student ratings.

## 4. Deployment & DevOps
*   **Frontend Hosting**: Netlify (CI/CD integrated with GitHub).
*   **Backend Hosting**: Render (Web Service).
*   **Database**: Neon Console (AWS ap-southeast-1).
*   **Configuration**: Managed via environment variables (`.env`) for security.

## 5. System Maintenance (For Handover)
*   **Database Schema**: Located in `backend/schema.sql`.
*   **Seeding Data**: Run `node src/db/seed.js` to refresh the institution database.
*   **Environment Variables**: Ensure `NEXT_PUBLIC_API_URL` points to the Render production link.

---
*This document serves as the official technical handover for the College Discovery Platform v1.0.*
