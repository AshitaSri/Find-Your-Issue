# GitHub Issue Explorer

## Backend Architecture

![WhatsApp Image 2024-12-22 at 6 19 12 PM](https://github.com/user-attachments/assets/f754dac7-236f-4bb1-9580-8ecea83bc167)

![WhatsApp Image 2024-12-22 at 6 19 40 PM](https://github.com/user-attachments/assets/a006cc8e-b661-4a9b-bb36-d2221aadbd9f)


### Structure & Components

- **Server**: Node.js with Express framework
- **API Integration**: GitHub REST API for fetching repository and issue data
- **Authentication**: Custom email/password authentication system
- **Rate Limiting**: Custom middleware to handle GitHub API rate limits
- **Caching Layer**: Vercel's Edge CDN for optimized response times

### Database Design (MongoDB)

- **User Collection**
    - Email and hashed password
    - User profile information
    - Authentication tokens
- **Bookmarks Collection**
    - Repository references
    - Issue tracking
    - User references
    - Timestamp data

### Server-side Logic

- **Authentication System**
    - Secure password hashing with bcrypt
    - JWT token generation and validation
    - Session management
- **Rate Limiting Implementation**
    - Token bucket algorithm for API requests
    - Debouncing for search queries (3 second delay)
- **Data Processing Pipeline**
    - Filter processing for repository queries
    - Issue aggregation and sorting
    - Pagination implementation (server-side)
    - Response optimization

## Frontend Implementation

### Technologies

- **Core Framework**: React
- **State Management**: Redux for global state
- **API Communication**: Axios for HTTP requests
- **UI Components**: Custom components with responsive design
- **Theme Management**: Context API for theme switching

### UI Design & Features

- **Authentication Interface**
    - Email/password login form
    - User registration
    - Password recovery flow
- **Search Interface**
    - Dynamic filter system with 5 configurable options
    - Real-time search updates with debouncing
    - Visual feedback for loading states
- **Repository Display**
    - Card-based layout for repository information
    - Issue preview with direct links
    - Bookmark functionality with visual indicators
    - Pagination controls with configurable items per page
- **User Dashboard**
    - Personalized bookmarks view
    - Filter history
    - User preferences management
- **Theme System**
    - Light/dark mode toggle
    - Persistent theme preference
    - System theme detection
    - Smooth theme transitions

### User Experience Optimizations

- Implemented loading states and skeleton screens
- Error handling with user-friendly messages
- Responsive design for mobile and desktop
- Keyboard navigation support
- Infinite scroll with pagination
- Theme-aware component styling

## Hosting & Deployment

### Environment Configuration

- **Frontend**: Vercel hosting with automatic deployments
- **Backend**: Vercel serverless functions
- **Database**: MongoDB Atlas cloud hosting

### Deployment Process

1. **Development Flow**
    - Feature development in feature branches
    - Pull requests to master branch
    - Code review and testing
    - Merge to main branch for production
2. **Automated Pipeline**
    - GitHub Actions for CI/CD
    - Automatic deployment on main branch updates
    - Environment variable management
    - Build optimization
3. **Monitoring**
    - Vercel Analytics integration
    - Error tracking and logging
    - Performance monitoring

## Project Access

- **Live Application**: https://find-your-issue.vercel.app/
- **Frontend Repository**: https://github.com/AshitaSri/Find-Your-Issue
- **Backend Repository**: https://github.com/AshitaSri/Find-Your-Issue-backend
