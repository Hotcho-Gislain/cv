# Portfolio CMS - Complete Setup Guide

This document explains how to set up a portfolio website with a Firebase-powered Content Management System (CMS), allowing you to edit content, upload images, and manage visitor reviews from an admin dashboard.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Step 1: Firebase Project Setup](#step-1-firebase-project-setup)
4. [Step 2: Firebase Authentication Setup](#step-2-firebase-authentication-setup)
5. [Step 3: Firestore Database Setup](#step-3-firestore-database-setup)
6. [Step 4: Firebase Storage Setup](#step-4-firebase-storage-setup)
7. [Step 5: Contact Form Setup (Web3Forms)](#step-5-contact-form-setup-web3forms)
8. [Step 6: Security Configuration](#step-6-security-configuration)
9. [Step 7: Deployment](#step-7-deployment)
10. [Admin Dashboard Usage](#admin-dashboard-usage)
11. [Troubleshooting](#troubleshooting)
12. [File Structure](#file-structure)

---

## Project Overview

### Features
- ✅ **Editable Content**: Hero, About, Facts, Skills, Resume, Services, Contact sections
- ✅ **Image Uploads**: Profile picture, Hero background, About image
- ✅ **Review System**: Visitors can leave reviews, admin approves them
- ✅ **Contact Form**: Emails sent directly to your inbox
- ✅ **Admin Dashboard**: Secure login to manage everything
- ✅ **Static Hosting**: Works on GitHub Pages (free)

### Tech Stack
- **Frontend**: HTML, CSS, JavaScript, Bootstrap
- **Backend**: Firebase (Firestore, Auth, Storage)
- **Contact Form**: Web3Forms
- **Hosting**: GitHub Pages

---

## Prerequisites

Before starting, you need:
- A GitHub account
- A Google account (for Firebase)
- Basic knowledge of HTML/CSS/JavaScript
- Git installed on your computer

---

## Step 1: Firebase Project Setup

### 1.1 Create Firebase Project

1. Go to **https://console.firebase.google.com/**
2. Click **"Create a project"** (or "Add project")
3. Enter project name: `portfolio-cms` (or any name)
4. **Disable** Google Analytics (not needed)
5. Click **Create Project**
6. Wait for creation, then click **Continue**

### 1.2 Register Web App

1. On the project overview page, click the **Web icon** `</>`
2. App nickname: `portfolio`
3. **Don't** check "Firebase Hosting"
4. Click **Register app**
5. You'll see a config object - **COPY THIS**:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123..."
};
```

### 1.3 Add Config to Your Code

Add this config to both files:
- `index.html` (in the Firebase script section)
- `admin.html` (in the Firebase script section)

---

## Step 2: Firebase Authentication Setup

### 2.1 Enable Authentication

1. In Firebase Console, click **Build** → **Authentication**
2. Click **Get started**
3. Click **Email/Password**
4. Toggle **Enable** → Click **Save**

### 2.2 Create Admin User

1. Go to **Authentication** → **Users** tab
2. Click **Add user**
3. Enter:
   - **Email**: your-email@example.com
   - **Password**: your-secure-password (min 6 characters)
4. Click **Add user**

⚠️ **Remember these credentials** - you'll use them to log into the admin dashboard.

---

## Step 3: Firestore Database Setup

### 3.1 Create Database

1. In Firebase Console, click **Build** → **Firestore Database**
2. Click **Create database**
3. Select **Start in test mode** (we'll secure it later)
4. Choose a location close to you
5. Click **Enable**

### 3.2 Database Structure

The database will automatically create these collections when you save content:

```
firestore/
├── content/
│   ├── hero          {name, typedItems}
│   ├── about         {name, title, bio, description, birthday, phone, city, degree, email, freelance, website}
│   ├── facts         {description, clients, projects, hours, collaborators}
│   ├── skills        {description, skills[]}
│   ├── resume        {summary, location, phone, email, eduTitle, eduYears, eduInstitution, eduDescription, expTitle, expYears, expCompany, expDescription}
│   ├── services      {description, services[]}
│   ├── contact       {location, email, phone}
│   └── images        {profileImage, heroBg, aboutImage}
└── reviews/
    └── {reviewId}    {name, title, email, text, rating, approved, createdAt}
```

---

## Step 4: Firebase Storage Setup

### 4.1 Enable Storage

1. In Firebase Console, click **Build** → **Storage**
2. Click **Get started**
3. Select **Start in test mode**
4. Choose a location
5. Click **Done**

### 4.2 Storage Structure

Images are stored in:
```
storage/
└── images/
    ├── profile-{timestamp}.{ext}
    ├── hero-bg-{timestamp}.{ext}
    └── about-{timestamp}.{ext}
```

---

## Step 5: Contact Form Setup (Web3Forms)

### 5.1 Get Access Key

1. Go to **https://web3forms.com/**
2. Scroll to "Create your Access Key"
3. Enter your email address
4. Click **Create Access Key**
5. Check your email for the access key

### 5.2 Add to Code

In `index.html`, find the contact form JavaScript and add your access key:

```javascript
formData.append("access_key", "YOUR_ACCESS_KEY_HERE");
```

---

## Step 6: Security Configuration

### 6.1 Firestore Security Rules

Go to **Firebase Console** → **Firestore Database** → **Rules**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Content - anyone can read, only authenticated users can write
    match /content/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Reviews - anyone can read and create, only authenticated users can update/delete
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if true;
      allow update, delete: if request.auth != null;
    }
  }
}
```

Click **Publish**.

### 6.2 Storage Security Rules

Go to **Firebase Console** → **Storage** → **Rules**:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Click **Publish**.

### 6.3 API Key Restrictions (Important!)

1. Go to **https://console.cloud.google.com/**
2. Select your Firebase project
3. Go to **APIs & Services** → **Credentials**
4. Click on your API key
5. Under **Application restrictions**:
   - Select **"HTTP referrers (websites)"**
   - Add: `https://YOUR-USERNAME.github.io/*`
6. Click **Save**

---

## Step 7: Deployment

### 7.1 GitHub Repository Setup

1. Create a new repository on GitHub
2. Clone it to your computer:
   ```bash
   git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
   ```
3. Add your portfolio files to the repository

### 7.2 Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **main** branch
4. Click **Save**
5. Your site will be live at: `https://YOUR-USERNAME.github.io/YOUR-REPO/`

### 7.3 Push Changes

```bash
git add -A
git commit -m "Your commit message"
git push
```

Changes deploy automatically in 1-2 minutes.

---

## Admin Dashboard Usage

### Accessing the Dashboard

URL: `https://YOUR-USERNAME.github.io/YOUR-REPO/admin.html`

### Login

1. Enter your admin email and password (created in Step 2.2)
2. Click **Login**

### Editing Content

1. Click a section in the sidebar (Hero, About, Facts, etc.)
2. Edit the fields
3. Click **Save Changes**
4. Refresh your main site to see updates

### Uploading Images

1. Click **Images** in the sidebar
2. Choose an image file
3. Click the **Upload** button
4. Wait for the progress bar to complete
5. Refresh your main site to see the new image

### Managing Reviews

1. Click **Reviews** in the sidebar
2. **Pending Reviews**: Click **Approve** to make visible, or **Delete** to remove
3. **Approved Reviews**: Click **Unapprove** to hide, or **Delete** to remove

---

## Troubleshooting

### Problem: Can't Login to Admin

**Solutions:**
1. Check your email/password are correct
2. Make sure you created a user in Firebase Authentication
3. Check API key restrictions include your domain
4. Clear browser cache and try again

### Problem: Changes Not Showing on Site

**Solutions:**
1. Wait 1-2 minutes for GitHub Pages to deploy
2. Hard refresh the page: `Ctrl + Shift + R`
3. Clear browser cache
4. Check browser console for errors

### Problem: Firebase Abuse Notification

**Solutions:**
1. Immediately restrict API key to your domain only
2. Set proper Firestore and Storage security rules
3. Delete any compromised API keys
4. Create a new API key if needed

### Problem: Images Not Uploading

**Solutions:**
1. Make sure Firebase Storage is enabled
2. Check Storage security rules
3. Check you're logged in as admin
4. Check browser console for errors

### Problem: Reviews Not Showing

**Solutions:**
1. Make sure reviews are **approved** in admin dashboard
2. Check Firestore has the reviews collection
3. Check browser console for errors
4. You may need to create a Firestore index (check console for link)

### Problem: Contact Form Not Working

**Solutions:**
1. Check Web3Forms access key is correct
2. First submission requires email confirmation from Web3Forms
3. Check browser console for errors

---

## File Structure

```
cv/
├── index.html              # Main portfolio page
├── admin.html              # Admin dashboard
├── SETUP_GUIDE.md          # This documentation
├── .gitignore              # Git ignore file
├── package.json            # Dependencies (Tailwind)
├── assets/
│   ├── css/
│   │   ├── style.css       # Main styles
│   │   └── tailwind.css    # Tailwind output
│   ├── js/
│   │   └── main.js         # Main JavaScript
│   ├── img/
│   │   ├── profile-img.png # Default profile image
│   │   ├── hero-bg.jpg     # Default hero background
│   │   └── testimonials/   # Testimonial images
│   └── vendor/             # Third-party libraries
│       ├── bootstrap/
│       ├── aos/
│       ├── swiper/
│       └── ...
```

---

## Firebase Configuration Reference

Here's where the Firebase config appears in each file:

### index.html
```javascript
<!-- Firebase SDK for Dynamic Content -->
<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
  import { getFirestore, doc, getDoc, collection, addDoc, getDocs, query, where, orderBy } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  // ... rest of code
</script>
```

### admin.html
```javascript
<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
  import { getFirestore, doc, getDoc, setDoc, collection, getDocs, deleteDoc, updateDoc, query, where, orderBy } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
  import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-storage.js";

  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);
  // ... rest of code
</script>
```

---

## Support

If you encounter issues:
1. Check this documentation first
2. Check the browser console for errors (`F12` → Console tab)
3. Review Firebase documentation: https://firebase.google.com/docs
4. Check GitHub Pages documentation: https://docs.github.com/en/pages

---

## License

This project template is free to use for personal and commercial projects.

---

**Created with ❤️ for Hotcho Gislain's Portfolio**

*Last updated: December 2024*

