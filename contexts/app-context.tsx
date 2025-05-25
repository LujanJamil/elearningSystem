"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import {
  type User,
  type Teacher,
  type Assignment,
  type ChatMessage,
  type ContactMessage,
  userStorage,
  storage,
  initializeDefaultData,
} from "@/lib/storage"

interface AppContextType {
  user: User | null
  teachers: Teacher[]
  updateUser: (updates: Partial<User>) => void
  updateProgress: (course: string, progress: number) => void
  addAssignment: (assignment: Assignment) => void
  updateAssignment: (id: string, updates: Partial<Assignment>) => void
  sendMessage: (message: ChatMessage) => void
  getMessages: (teacherId: string) => ChatMessage[]
  addContactMessage: (message: ContactMessage) => void
  refreshData: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [teachers, setTeachers] = useState<Teacher[]>([])

  useEffect(() => {
    // Initialize default data if needed
    initializeDefaultData()

    // Load user and teachers
    const userData = userStorage.getUser()
    const teachersData = storage.get<Teacher[]>("islamic_college_teachers") || []

    setUser(userData)
    setTeachers(teachersData)
  }, [])

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      userStorage.setUser(updatedUser)
      setUser(updatedUser)
    }
  }

  const updateProgress = (course: string, progress: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        progress: { ...user.progress, [course]: progress },
      }
      userStorage.setUser(updatedUser)
      setUser(updatedUser)
    }
  }

  const addAssignment = (assignment: Assignment) => {
    if (user) {
      const updatedUser = {
        ...user,
        assignments: [...user.assignments, assignment],
      }
      userStorage.setUser(updatedUser)
      setUser(updatedUser)
    }
  }

  const updateAssignment = (id: string, updates: Partial<Assignment>) => {
    if (user) {
      const updatedAssignments = user.assignments.map((a) => (a.id === id ? { ...a, ...updates } : a))
      const updatedUser = { ...user, assignments: updatedAssignments }
      userStorage.setUser(updatedUser)
      setUser(updatedUser)
    }
  }

  const sendMessage = (message: ChatMessage) => {
    const messages = storage.get<ChatMessage[]>("islamic_college_chat_messages") || []
    messages.push(message)
    storage.set("islamic_college_chat_messages", messages)
  }

  const getMessages = (teacherId: string): ChatMessage[] => {
    if (!user) return []
    const messages = storage.get<ChatMessage[]>("islamic_college_chat_messages") || []
    return messages
      .filter(
        (m) =>
          (m.senderId === user.id && m.receiverId === teacherId) ||
          (m.senderId === teacherId && m.receiverId === user.id),
      )
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
  }

  const addContactMessage = (message: ContactMessage) => {
    const messages = storage.get<ContactMessage[]>("islamic_college_contact_messages") || []
    messages.push(message)
    storage.set("islamic_college_contact_messages", messages)
  }

  const refreshData = () => {
    const userData = userStorage.getUser()
    const teachersData = storage.get<Teacher[]>("islamic_college_teachers") || []
    setUser(userData)
    setTeachers(teachersData)
  }

  return (
    <AppContext.Provider
      value={{
        user,
        teachers,
        updateUser,
        updateProgress,
        addAssignment,
        updateAssignment,
        sendMessage,
        getMessages,
        addContactMessage,
        refreshData,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
