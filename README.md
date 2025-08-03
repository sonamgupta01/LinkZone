# Mini LinkedIn - Community Platform

A modern, full-stack social media platform inspired by LinkedIn, built with Next.js, React, and SQLite.

## 🚀 Features

### Core Features
- **User Authentication**: Secure email/password registration and login with JWT tokens
- **User Profiles**: Customizable profiles with name, email, and bio
- **Post Management**: Create, view, and display text-only posts
- **Public Feed**: Home feed showing all posts with author details and timestamps
- **Profile Pages**: View user profiles and their posts

### Interactive Features
- **Like System**: Like/unlike posts with real-time counters and heart animations
- **Search Functionality**: Search posts by content or author name
- **Character Counter**: Real-time character counting with visual feedback (500 char limit)
- **Responsive Design**: Beautiful, mobile-friendly interface with hover effects
- **Real-time Updates**: Dynamic post creation and interaction feedback

### UI/UX Enhancements
- **Gradient Avatars**: Colorful user avatars with initials
- **Smooth Animations**: Hover effects, transitions, and loading states
- **Modern Design**: Clean, professional interface with Tailwind CSS
- **Interactive Elements**: Animated buttons, form validation, and error handling

## 🛠️ Tech Stack

- **Frontend**: React 18, Next.js 15, TypeScript
- **Backend**: Next.js API Routes (serverless functions)
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT tokens with bcryptjs for password hashing
- **Styling**: Tailwind CSS with custom gradients and animations
- **Date Handling**: date-fns for relative timestamps

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up the database**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` (or the port shown in terminal)

## 🎯 Usage

### Authentication
1. **Register**: Create a new account with email, password, name, and optional bio
2. **Login**: Sign in with your credentials
3. **Logout**: Securely logout from any page

### Creating Posts
1. Use the "Share your thoughts" box on the home page
2. Type your message (up to 500 characters)
3. Watch the character counter for remaining characters
4. Click "Share Post" to publish

### Interacting with Posts
1. **Like Posts**: Click the heart icon to like/unlike posts
2. **View Profiles**: Click on user names to view their profiles
3. **Search**: Use the search bar to find posts by content or author

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected API routes
- Input validation and sanitization
- SQL injection prevention with Prisma

## 🎨 Design Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean, professional appearance with gradients
- **Animations**: Smooth transitions and hover effects
- **Loading States**: Visual feedback during actions
- **Error Handling**: User-friendly error messages

## 🐛 Troubleshooting

### Common Issues

1. **Database Issues**
   ```bash
   # Reset database if needed
   rm prisma/dev.db
   npx prisma migrate dev --name reset
   ```

2. **Port Already in Use**
   - The app will automatically use the next available port
   - Check the terminal output for the correct URL

3. **Authentication Issues**
   - Clear browser localStorage if having login issues
   - Check that JWT_SECRET is set in .env file

---

**Built with ❤️ using Next.js, React, and modern web technologies**
