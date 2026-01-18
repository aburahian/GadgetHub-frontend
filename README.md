# Next.js Frontend

A modern, responsive frontend built with Next.js 15, featuring authentication and item management.

## 🚀 Features

- **Landing Page**: 7 distinct sections (Hero, Features, Stats, Testimonials, Pricing, About, Contact)
- **Authentication**: NextAuth.js integration with Google OAuth
- **Public Pages**: Browse items and view details
- **Protected Routes**: Secure "Add Item" page for authenticated users
- **Modern UI**: Tailwind CSS with premium design

## 📦 Technologies

- Next.js 15 (App Router)
- Tailwind CSS
- NextAuth.js
- Axios
- React Hot Toast
- Lucide React Icons

## 🛠️ Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
   NEXTAUTH_URL=https://your-frontend-url.com
   NEXTAUTH_SECRET=your-secret-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## 🌐 Deployment (Vercel)

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## 📝 Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXTAUTH_URL` - Frontend URL
- `NEXTAUTH_SECRET` - Secret for NextAuth
- `GOOGLE_CLIENT_ID` - Google OAuth Client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth Client Secret
