# 📚 Component Lifecycle & Clean Structure Guide

## 🔄 React Component Lifecycle (Hooks)

### **The 3 Phases:**

```
MOUNT → UPDATE → UNMOUNT
  ↓       ↓         ↓
useEffect runs   useEffect re-runs   Cleanup function runs
```

---

## **1. MOUNT Phase (Component Appears)**

```typescript
useEffect(() => {
  console.log('Component mounted!')
  
  // Fetch data from API
  fetchData()
  
  // Subscribe to events
  const subscription = eventEmitter.on('update', handleUpdate)
  
}, []) // ← Empty array = runs ONCE on mount
```

**Use cases:**
- Fetch initial data
- Setup subscriptions
- Track screen views (Analytics)
- Initialize timers

---

## **2. UPDATE Phase (Props/State Change)**

```typescript
useEffect(() => {
  console.log('userId changed:', userId)
  
  // Fetch new data when userId updates
  fetchUserData(userId)
  
}, [userId]) // ← Runs when userId changes
```

**Use cases:**
- Fetch data when props change
- Track user actions
- Update UI based on state
- Sync with external systems

---

## **3. UNMOUNT Phase (Component Disappears)**

```typescript
useEffect(() => {
  const timer = setInterval(() => console.log('tick'), 1000)
  
  return () => {
    // CLEANUP: This runs when component unmounts
    clearInterval(timer)
    console.log('Component unmounted, timer cleared')
  }
}, [])
```

**Use cases:**
- Cancel API requests
- Unsubscribe from events
- Clear timers/intervals
- Close WebSocket connections
- Save state to storage

---

## 🏗️ Clean Component Structure

### **Best Practice Template:**

```typescript
import { memo, useCallback, useEffect, useState } from 'react'

// ========================================
// 1. TYPE DEFINITIONS
// ========================================
interface Props {
  userId: string
}

interface User {
  id: string
  name: string
}

// ========================================
// 2. COMPONENT
// ========================================
const MyComponentInit = ({ userId }: Props) => {
  
  // ----------------------------------------
  // A. STATE (Group related states)
  // ----------------------------------------
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // ----------------------------------------
  // B. LIFECYCLE HOOKS
  // ----------------------------------------
  useEffect(() => {
    // Mount
    console.log('Component mounted')
    return () => {
      // Unmount
      console.log('Component unmounted')
    }
  }, [])
  
  useEffect(() => {
    // Update when userId changes
    fetchUser(userId)
  }, [userId])
  
  // ----------------------------------------
  // C. FUNCTIONS (Business logic)
  // ----------------------------------------
  const fetchUser = async (id: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/users/${id}`)
      const data = await response.json()
      setUser(data)
    } catch (err) {
      setError('Failed to load user')
    } finally {
      setLoading(false)
    }
  }
  
  const handleRefresh = useCallback(() => {
    fetchUser(userId)
  }, [userId])
  
  // ----------------------------------------
  // D. RENDER FUNCTIONS
  // ----------------------------------------
  const renderLoading = () => <Text>Loading...</Text>
  const renderError = () => <Text>{error}</Text>
  
  // Early returns for loading/error states
  if (loading) return renderLoading()
  if (error) return renderError()
  
  // ----------------------------------------
  // E. MAIN RENDER
  // ----------------------------------------
  return (
    <View>
      <Text>{user?.name}</Text>
    </View>
  )
}

// ========================================
// 3. EXPORT WITH MEMO
// ========================================
export const MyComponent = memo(MyComponentInit)

// ========================================
// 4. STYLES (Always at bottom)
// ========================================
const styles = StyleSheet.create({
  container: { flex: 1 }
})
```

---

## 🎯 Component Organization Rules

### **1. Order Matters!**

```
✅ CORRECT ORDER:
1. Imports
2. Type definitions
3. Component function
   - State declarations
   - useEffect hooks
   - Functions
   - Render logic
   - Return JSX
4. Export with memo
5. Styles
```

### **2. Naming Conventions**

```typescript
// Component names: PascalCase
export const UserProfile = () => {}

// Functions: camelCase
const handlePress = () => {}
const fetchData = async () => {}

// Event handlers: handle + EventName
const handleSubmit = () => {}
const handleTextChange = () => {}

// Render functions: render + What
const renderHeader = () => {}
const renderItem = () => {}
```

### **3. Performance Optimizations**

```typescript
// Memo: Prevent unnecessary re-renders
export const MyComponent = memo(MyComponentInit)

// useCallback: Memoize functions
const handlePress = useCallback(() => {
  console.log('Pressed')
}, [])

// useMemo: Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return calculateExpensiveValue(data)
}, [data])

// FlatList optimization
<FlatList
  data={items}
  renderItem={renderItem}  // ← Memoized with useCallback
  keyExtractor={item => item.id}
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
/>
```

---

## 📊 Common Lifecycle Patterns

### **Pattern 1: Fetch Data on Mount**

```typescript
useEffect(() => {
  const fetchData = async () => {
    const data = await api.getData()
    setData(data)
  }
  fetchData()
}, [])
```

### **Pattern 2: Cleanup Subscriptions**

```typescript
useEffect(() => {
  const subscription = eventEmitter.subscribe('event', handleEvent)
  
  return () => {
    subscription.unsubscribe()
  }
}, [])
```

### **Pattern 3: Debounced Search**

```typescript
useEffect(() => {
  const timer = setTimeout(() => {
    searchAPI(searchTerm)
  }, 500) // Wait 500ms after user stops typing
  
  return () => clearTimeout(timer)
}, [searchTerm])
```

### **Pattern 4: Track Screen Views**

```typescript
useEffect(() => {
  analytics().logScreenView({ screen_name: 'Home' })
}, [])
```

---

## ✅ Clean Component Checklist

- [ ] Types defined at top
- [ ] Component name is PascalCase
- [ ] State grouped logically
- [ ] useEffect hooks organized (mount → update → cleanup)
- [ ] Functions use useCallback when passed as props
- [ ] Event handlers start with "handle"
- [ ] Render functions start with "render"
- [ ] Early returns for loading/error states
- [ ] Component exported with memo()
- [ ] Styles at bottom of file
- [ ] No console.logs in production code
- [ ] Comments explain "why", not "what"

---

## 🚀 Examples in This Project

1. **LifecycleExample.tsx** - Shows all 3 phases
2. **CleanComponentStructure.tsx** - Perfect structure template
3. **HomeWithLifecycle.tsx** - Your Home screen improved

Check these files to learn! 📚
