import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './store'

// Use these hooks instead of plain useDispatch and useSelector
// They have TypeScript types built-in!

// Use this to dispatch actions
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

// Use this to read state from Redux
export const useAppSelector = useSelector.withTypes<RootState>()
