export type Message = {
  id: string
  text: string
  createdAt: number
  userId: string
  userName: string
  contactId?: string // For individual chats
}

export type User = {
  id: string
  email: string
  displayName: string
  avatar?: string
  createdAt?: number
}
