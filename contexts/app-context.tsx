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
  chatStorage,
  mediaStorage,
} from "@/lib/storage"

interface AppContextType {
  user: User | null
  teachers: Teacher[]
  updateUser: (updates: Partial<User>) => void
  updateProgress: (course: string, progress: number) => void
  addAssignment: (assignment: Assignment) => void
  updateAssignment: (id: string, updates: Partial<Assignment>) => void
  addChatMessage: (message: ChatMessage) => void
  getChatMessages: (teacherId: string) => ChatMessage[]
  clearChat: (teacherId: string) => void
  addContactMessage: (message: ContactMessage) => void
  uploadFile: (file: File) => Promise<string>
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>
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

    // Simulate progress updates over time
    const progressInterval = setInterval(() => {
      if (userData) {
        const courses = Object.keys(userData.progress)
        const randomCourse = courses[Math.floor(Math.random() * courses.length)]
        const currentProgress = userData.progress[randomCourse]

        // Randomly increase progress by 1-3%
        if (currentProgress < 100) {
          const increase = Math.floor(Math.random() * 3) + 1
          const newProgress = Math.min(currentProgress + increase, 100)
          updateProgress(randomCourse, newProgress)
        }
      }
    }, 30000) // Update every 30 seconds

    return () => clearInterval(progressInterval)
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

  const addChatMessage = (message: ChatMessage) => {
    chatStorage.addMessage(message)
  }

  const getChatMessages = (teacherId: string): ChatMessage[] => {
    if (!user) return []
    return chatStorage.getMessages(user.id, teacherId)
  }

  const clearChat = (teacherId: string) => {
    if (!user) return
    chatStorage.clearChat(user.id, teacherId)
  }

  const addContactMessage = (message: ContactMessage) => {
    const messages = storage.get<ContactMessage[]>("islamic_college_contact_messages") || []
    messages.push(message)
    storage.set("islamic_college_contact_messages", messages)

    // Simulate auto-response after 2 seconds
    setTimeout(() => {
      const updatedMessages = storage.get<ContactMessage[]>("islamic_college_contact_messages") || []
      const messageIndex = updatedMessages.findIndex((m) => m.id === message.id)
      if (messageIndex !== -1) {
        updatedMessages[messageIndex] = {
          ...updatedMessages[messageIndex],
          status: "responded",
          response:
            "Thank you for contacting us. We have received your message and will get back to you within 24 hours.",
        }
        storage.set("islamic_college_contact_messages", updatedMessages)
      }
    }, 2000)
  }

  const uploadFile = async (file: File): Promise<string> => {
    return await mediaStorage.saveFile(file)
  }

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    // Simulate password validation
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, you would validate the current password
    // For demo purposes, we'll assume it's correct if it's not empty
    if (currentPassword.length > 0 && newPassword.length >= 6) {
      // Update user password (in real app, this would be hashed)
      if (user) {
        updateUser({ ...user, email: user.email }) // Trigger update
      }
      return true
    }
    return false
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
        addChatMessage,
        getChatMessages,
        clearChat,
        addContactMessage,
        uploadFile,
        changePassword,
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
