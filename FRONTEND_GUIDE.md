# Frontend Development Guide

## Project Structure

```
frontend/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Card.jsx
│   │   ├── Modal.jsx
│   │   ├── Toast.jsx
│   │   ├── Avatar.jsx
│   │   ├── Badge.jsx
│   │   ├── Tabs.jsx
│   │   ├── Table.jsx
│   │   ├── Pagination.jsx
│   │   ├── Skeleton.jsx
│   │   ├── EmptyState.jsx
│   │   ├── TextArea.jsx
│   │   ├── ConfirmDialog.jsx
│   │   ├── Navbar.jsx
│   │   ├── ToastContainer.jsx
│   │   ├── ChatRoom.jsx
│   │   └── index.js          # Centralized exports
│   ├── pages/                # Feature pages
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── GroupDiscoveryPage.jsx
│   │   ├── StudentDashboardPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── NotificationsPage.jsx
│   │   ├── MyGroupsPage.jsx
│   │   └── GroupDetailsPage.jsx
│   ├── redux/                # State management
│   │   ├── store.js          # Redux store config
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   ├── groupsSlice.js
│   │   │   └── uiSlice.js
│   │   └── api/               # RTK Query APIs
│   │       ├── authApi.js
│   │       ├── groupsApi.js
│   │       ├── usersApi.js
│   │       ├── resourcesApi.js
│   │       ├── notificationsApi.js
│   │       └── sessionsApi.js
│   ├── services/             # External integrations
│   │   ├── api.js            # Axios instance
│   │   └── socket.js         # Socket.io client
│   ├── App.jsx               # Main router
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── .env                      # Environment variables
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Environment Variables

Create `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

### 3. Start Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Component Usage

### Basic Components

#### Button
```jsx
import { Button } from '../components';

// Primary button (default)
<Button onClick={handleClick}>Click Me</Button>

// Secondary button
<Button variant="secondary">Secondary</Button>

// Danger button
<Button variant="danger">Delete</Button>

// Loading state
<Button disabled>Loading...</Button>
```

#### Input
```jsx
import { Input } from '../components';

// Text input
<Input 
  label="Email" 
  placeholder="you@example.com"
  {...register('email')}
  error={errors.email?.message}
/>

// Select input
<Input 
  label="Semester"
  type="select"
  options={['1st', '2nd', '3rd', '4th']}
  onChange={handleChange}
/>
```

#### Modal
```jsx
import { Modal, Button } from '../components';

<Modal 
  isOpen={isOpen} 
  title="Confirm Action"
  onClose={handleClose}
  footer={
    <>
      <Button variant="secondary" onClick={handleClose}>Cancel</Button>
      <Button onClick={handleConfirm}>Confirm</Button>
    </>
  }
>
  <p>Are you sure?</p>
</Modal>
```

#### Card
```jsx
import { Card } from '../components';

<Card className="p-6">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>
```

#### Badge
```jsx
import { Badge } from '../components';

<Badge variant="primary">Active</Badge>
<Badge variant="success">Approved</Badge>
<Badge variant="warning" size="sm">Pending</Badge>
```

#### Avatar
```jsx
import { Avatar } from '../components';

// With image
<Avatar src={userImage} alt={userName} size="md" />

// With initials
<Avatar initials="JD" size="lg" />
```

### Advanced Components

#### Toast Notifications
```jsx
import { useDispatch } from 'react-redux';
import { addToast } from '../redux/slices/uiSlice';

const MyComponent = () => {
  const dispatch = useDispatch();
  
  const handleSuccess = () => {
    dispatch(addToast({
      type: 'success',
      title: 'Success',
      message: 'Operation completed!'
    }));
  };
};
```

#### Skeleton Loading
```jsx
import { Skeleton } from '../components';

<Skeleton count={5} height="h-20" />
```

#### EmptyState
```jsx
import { EmptyState } from '../components';

<EmptyState
  icon="🔍"
  title="No Results"
  message="Try adjusting your filters"
  buttonText="Clear Filters"
  onButtonClick={handleClear}
/>
```

## Redux & State Management

### Using Redux Slices

```jsx
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const MyComponent = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logout());
  };
};
```

### Using RTK Query

```jsx
import { useListGroupsQuery, useCreateGroupMutation } from '../redux/api/groupsApi';

const MyComponent = () => {
  // Query (fetch data)
  const { data, isLoading, error } = useListGroupsQuery({ page: 1 });
  
  // Mutation (create/update/delete)
  const [createGroup, { isLoading: isCreating }] = useCreateGroupMutation();
  
  const handleCreate = async (groupData) => {
    try {
      const result = await createGroup(groupData).unwrap();
      console.log('Group created:', result);
    } catch (error) {
      console.error('Failed to create group:', error);
    }
  };
};
```

## Form Handling with React Hook Form + Zod

```jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Button } from '../components';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be 8+ characters'),
});

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Email"
        {...register('email')}
        error={errors.email?.message}
      />
      <Input
        label="Password"
        type="password"
        {...register('password')}
        error={errors.password?.message}
      />
      <Button type="submit">Login</Button>
    </form>
  );
};
```

## Real-Time Chat Integration

```jsx
import { ChatRoom } from '../components';

const GroupPage = () => {
  return (
    <ChatRoom 
      groupId={groupId}
      groupName={groupName}
    />
  );
};
```

## Styling with Tailwind CSS 4.0

All components use Tailwind CSS 4.0 beta with an extended color palette:

- **Primary**: `primary-50`, `primary-600`, `primary-700`, `primary-900`
- **Secondary**: `secondary-700`, `secondary-800`, `secondary-900`
- **Success**: `success-600`
- **Warning**: `warning-500`
- **Danger**: `danger-600`

Example:
```jsx
<div className="bg-primary-600 text-white p-4 rounded-lg">
  Primary color button
</div>
```

## Protected Routes

Routes requiring authentication automatically redirect to `/login` if user is not authenticated:

```jsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
```

## Available APIs via RTK Query

### Authentication API
- `useRegisterMutation()` - Register new user
- `useLoginMutation()` - Login user
- `useLogoutMutation()` - Logout user
- `useRefreshTokenMutation()` - Refresh access token
- `useForgotPasswordMutation()` - Request password reset
- `useResetPasswordMutation()` - Reset password with token
- `useChangePasswordMutation()` - Change password for logged-in user

### Groups API
- `useListGroupsQuery(filters)` - List all groups with filters
- `useGetGroupQuery(groupId)` - Get single group details
- `useCreateGroupMutation()` - Create new group
- `useUpdateGroupMutation()` - Update group details
- `useDeleteGroupMutation()` - Delete group
- `useJoinGroupMutation()` - Request to join group
- `useLeaveGroupMutation()` - Leave group

### Users API
- `useGetProfileQuery()` - Get current user profile
- `useUpdateProfileMutation()` - Update user profile
- `useSearchUsersQuery()` - Search users

### Resources API
- `useListResourcesQuery(groupId)` - List group resources
- `useUploadResourceMutation()` - Upload new resource
- `useDeleteResourceMutation()` - Delete resource

### Notifications API
- `useListNotificationsQuery()` - List all notifications
- `useMarkAsReadMutation()` - Mark notification as read

### Sessions API
- `useListSessionsQuery(groupId)` - List group sessions
- `useCreateSessionMutation()` - Create new session
- `useUpdateSessionMutation()` - Update session
- `useDeleteSessionMutation()` - Delete session

## Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## Deployment

### To Vercel

```bash
npm install -g vercel
vercel
```

### To Netlify

```bash
npm run build
# Deploy the dist folder
```

## Troubleshooting

### Socket.io connection issues
- Verify backend is running on the correct port
- Check CORS settings in backend
- Ensure VITE_API_URL matches backend URL

### API calls returning 401
- Token may be expired, refresh token will be attempted automatically
- Check localStorage for accessToken and refreshToken
- Verify JWT_ACCESS_SECRET in backend matches

### Styles not applying
- Ensure Tailwind CSS is imported in index.css
- Clear browser cache
- Rebuild with `npm run dev`

## Performance Optimization Tips

1. **Code Splitting**: Pages are lazy-loaded with React.lazy()
2. **Image Optimization**: Use Avatar component for optimized images
3. **State Management**: Use Redux selectors to prevent unnecessary re-renders
4. **API Caching**: RTK Query automatically caches queries
5. **Bundle Size**: Vite provides fast HMR and optimized builds

## Resources

- [Tailwind CSS Docs](https://tailwindcss.com)
- [React Hook Form](https://react-hook-form.com)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [Socket.io Client](https://socket.io/docs/v4/client-api/)
- [Vite Docs](https://vitejs.dev)
