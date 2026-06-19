# Tech Mart - Project Architecture & Logic Guide

This document provides a detailed overview of the system architecture, component structures, pages, APIs, and key backend/frontend logic of the **Tech Mart** application.

---

## 1. Technology Stack Overview
Tech Mart is built with a modern, high-performance web development stack:
- **Core Framework**: [Next.js 16 (App Router)](https://nextjs.org/) for Server-Side Rendering (SSR), Client-Side rendering, and serverless API routing.
- **Styling & UI**: [Material UI (MUI v9)](https://mui.com/) for a premium, highly aesthetic design, combined with [TailwindCSS v4](https://tailwindcss.com/) for layout structures.
- **Database & ORM**: [MongoDB](https://www.mongodb.com/) for catalog and user storage, queried through [Prisma ORM](https://www.prisma.io/).
- **Authentication**: [Clerk Next.js SDK](https://clerk.com/) to manage user accounts, sessions, OAuth, and verification flows.
- **HTTP Client**: [Axios](https://axios-http.com/) for backend endpoint communications.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for fluid page entries and interactive micro-animations.

---

## 2. Authentication & Database Sync Flow
Tech Mart leverages **Clerk** for secure user authentication and maps Clerk users to a MongoDB database through Prisma.

### Registration Flow (OTP Verification)
Registration is handled in the custom form within [register/page.jsx](file:///d:/Backend/NEXT/my-project/src/app/(auth)/register/page.jsx):
1. **Account Creation**: The user enters their email, username, and password. The page invokes:
   ```javascript
   await signUp.create({
     emailAddress: email,
     password: password,
     firstName: username,
   });
   ```
2. **OTP Generation**: Clerk generates an email verification code and sends it to the user's inbox:
   ```javascript
   await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
   ```
3. **OTP Submission**: The user enters the 6-digit code on the dynamic verification sub-screen. The input is processed:
   ```javascript
   const completeSignUp = await signUp.attemptEmailAddressVerification({ code: verificationCode });
   ```
4. **Session Activation**: If the OTP is correct, the new session is set as active:
   ```javascript
   await setActive({ session: completeSignUp.createdSessionId });
   ```

### Authentication State & Database Syncing
The application uses [AuthContext.jsx](file:///d:/Backend/NEXT/my-project/src/context/AuthContext.jsx) to sync authentication states globally:
- Once Clerk finishes loading the session (`isSignedIn === true`), a `useEffect` runs to extract the authenticated user's profile details (`email`, `username`, and `avatarUrl`).
- The context sends a GET request to the database sync API `/API/profile`:
  ```javascript
  const res = await axios.get(`/API/profile?email=${email}&username=${username}&avatarUrl=${avatarUrl}`);
  ```
- **Prisma Synchronization** in [profile/route.js](file:///d:/Backend/NEXT/my-project/src/app/API/profile/route.js):
  If the API finds that this user does not yet exist in the MongoDB `User` collection, it automatically creates a corresponding record:
  ```javascript
  user = await prisma.user.create({
    data: {
      username: username || email.split("@")[0],
      email: email,
      password: "", // Managed securely by Clerk
      avatar: avatarUrl || "",
    }
  });
  ```
- The synchronised database user is then saved in the React `user` state context, making details like the MongoDB user ID (`user.id`) and shipping configurations available globally to other components.

---

## 3. How the Site Identifies Administrators
Administration rights in Tech Mart are determined by checking the authenticated user's primary email address against a secure hardcoded admin address.

### The Admin Verification Check
Throughout components like [Navbar.jsx](file:///d:/Backend/NEXT/my-project/src/components/Navbar.jsx), [profile/page.jsx](file:///d:/Backend/NEXT/my-project/src/app/profile/page.jsx), and [FloatingControls.jsx](file:///d:/Backend/NEXT/my-project/src/Helper/FloatingControls.jsx), the admin condition is defined:
```javascript
const isAdmin = user?.email === "sajunpalraj2004@gmail.com";
```
When `isAdmin` resolves to `true`:
1. **Navigation Changes**: The user's menu shifts from pointing to "My Profile" to displaying "Admin Dashboard" with customized panel interfaces.
2. **Dashboard Controls**: In [profile/page.jsx](file:///d:/Backend/NEXT/my-project/src/app/profile/page.jsx), the standard user tabs (Cart, Shipping, Profile) are replaced with administration-specific tabs:
   - **Profile Settings**: Standard profile editing.
   - **Add Product Panel**: An administrative form to create new inventory items in MongoDB.
   - **Site Members List**: A table showing all registered users queried from MongoDB.
3. **API Level Guard**: In [products/route.js](file:///d:/Backend/NEXT/my-project/src/app/API/products/route.js) (POST method for creating items), a validation check blocks any operations unless they are initiated by the verified administrator email:
   ```javascript
   if (adminEmail !== "sajunpalraj2004@gmail.com") {
     return NextResponse.json({ error: "Access Denied" }, { status: 403 });
   }
   ```

---

## 4. Global Cart & Wishlist Logic
Users can interact with cart and wishlist utilities across any view because Tech Mart uses **React Context** combined with **localStorage persistence**.

### Cart State Management
The cart logic is encapsulated in [CartContext.jsx](file:///d:/Backend/NEXT/my-project/src/context/CartContext.jsx):
- **Initialization**: Upon client mounting, the provider checks `localStorage.getItem("cart")` to load any pre-existing items.
- **Persistence**: A React `useEffect` automatically serializes and writes the state to `localStorage` whenever `cartItems` changes.
- **Login Restrictions**:
  When a user calls `addToCart(item)` from any component (e.g. the Shop page, categories list, or product detail drawer), the context verifies login state:
  ```javascript
  const addToCart = (item) => {
    if (!user) {
      alert("Only logged-in users can add items to the cart. Redirecting to login...");
      window.location.href = "/login";
      return;
    }
    // Adds item details, standardizes the currency/prices, and updates cartItems state...
  };
  ```
- **Logout Purging**: If a user logs out, a cleanup hook empties `cartItems` and purges the `localStorage` cart, preventing cross-user session pollution.

### Wishlist State Management
Similarly, [WishlistContext.jsx](file:///d:/Backend/NEXT/my-project/src/context/WishlistContext.jsx) manages a list of favorited products. The `toggleWishlist(item)` routine behaves identically:
- Validates the logged-in status. If missing, prompts the user to authenticate and redirects to `/login`.
- If logged in, toggles the product's presence inside the user's localized state and triggers updates.

---

## 5. Page-by-Page Logic & Routing

### 1. Home Page (`/`)
Serves as the root display containing hero banners, featured categories, and promo cards. It includes:
- **Featured Products ([FeaturedProducts.jsx](file:///d:/Backend/NEXT/my-project/src/components/FeaturedProducts.jsx))**: Displays trending products. Because the local lists are static arrays, it resolves the items to database records by querying `/API/products` on load and mapping product titles to MongoDB IDs.
- **Shop by Categories ([Categories.jsx](file:///d:/Backend/NEXT/my-project/src/components/Categories.jsx))**: Includes category tabs (GPU, CPU, Laptops, etc.) and lists matching cards. It uses the title-to-ID mapping to wrap product images/details in a dynamic Next.js `<Link href={`/products/${resolvedId}`}>`, allowing anyone to inspect the product.

### 2. Products Catalog (`/products`)
A product list view featuring:
- Search inputs and sorting filters (Price: High-to-Low, Rating, etc.).
- Communication with `/API/products` using search query parameters.

### 3. Product Details Page (`/products/[id]`)
A dynamic route page ([page.jsx](file:///d:/Backend/NEXT/my-project/src/app/products/[id]/page.jsx)):
- Extracts the dynamic database ID param.
- Fetches detailed specs from `/API/products/${id}`.
- Shows pincode-based mock shipping estimates and related products within the same category.
- **Public Visibility (Middleware)**: Handled in [proxy.js](file:///d:/Backend/NEXT/my-project/src/proxy.js), which flags paths starting with `/products` as public. Unauthenticated guests can read product descriptions and specifications. If they try to click "Add to Cart" or "Buy Now", they are safely redirected to `/login` via context guards.

### 4. User Profile & Admin Dashboard (`/profile`)
The central user account page:
- Dynamically renders dashboard panels depending on whether the user is a standard customer or the system administrator (`sajunpalraj2004@gmail.com`).
- Connects to `/API/members` to show registered accounts (Admin only).
- Allows editing names, bios, avatars, and shipping details which submit modifications via the `PUT /API/profile` endpoint.
