// Local storage utilities for persistent data
export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  courses: string[]
  joinDate: string
  progress: Record<string, number>
  assignments: Assignment[]
  payments: Payment[]
}

export interface Teacher {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  courses: string[]
  status: "online" | "offline" | "teaching"
  lastSeen?: string
}

export interface Assignment {
  id: string
  title: string
  description: string
  course: string
  dueDate: string
  status: "pending" | "submitted" | "graded"
  grade?: string
  submittedOn?: string
  attachments?: string[]
}

export interface Payment {
  id: string
  amount: string
  date: string
  status: "paid" | "pending" | "failed"
  course: string
  method?: string
}

export interface ChatMessage {
  id: string
  senderId: string
  receiverId: string
  text: string
  timestamp: string
  attachments?: {
    type: "image" | "video" | "document" | "audio"
    url: string
    name: string
  }[]
  status: "sent" | "delivered" | "read"
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  timestamp: string
  status: "pending" | "responded"
  response?: string
}

// Storage keys
const STORAGE_KEYS = {
  USER: "islamic_college_user",
  TEACHERS: "islamic_college_teachers",
  CHAT_MESSAGES: "islamic_college_chat_messages",
  ASSIGNMENTS: "islamic_college_assignments",
  CONTACT_MESSAGES: "islamic_college_contact_messages",
  PROGRESS: "islamic_college_progress",
  PAYMENTS: "islamic_college_payments",
  MEDIA_FILES: "islamic_college_media_files",
}

// Generic storage functions
export const storage = {
  get: <T,>(key: string): T | null => {
    if (typeof window === "undefined") return null
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      return null
    }
  },

  set: <T,>(key: string, value: T): void => {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error("Storage error:", error)
    }
  },

  remove: (key: string): void => {
    if (typeof window === "undefined") return
    localStorage.removeItem(key)
  },

  clear: (): void => {
    if (typeof window === "undefined") return
    localStorage.clear()
  },
}

// User management
export const userStorage = {
  getUser: (): User | null => storage.get<User>(STORAGE_KEYS.USER),

  setUser: (user: User): void => {
    storage.set(STORAGE_KEYS.USER, user)
  },

  updateUser: (updates: Partial<User>): User | null => {
    const user = userStorage.getUser()
    if (!user) return null

    const updatedUser = { ...user, ...updates }
    userStorage.setUser(updatedUser)
    return updatedUser
  },

  updateProgress: (course: string, progress: number): void => {
    const user = userStorage.getUser()
    if (user) {
      user.progress[course] = progress
      userStorage.setUser(user)
    }
  },

  addAssignment: (assignment: Assignment): void => {
    const user = userStorage.getUser()
    if (user) {
      user.assignments.push(assignment)
      userStorage.setUser(user)
    }
  },

  updateAssignment: (assignmentId: string, updates: Partial<Assignment>): void => {
    const user = userStorage.getUser()
    if (user) {
      const index = user.assignments.findIndex((a) => a.id === assignmentId)
      if (index !== -1) {
        user.assignments[index] = { ...user.assignments[index], ...updates }
        userStorage.setUser(user)
      }
    }
  },
}

// Chat management
export const chatStorage = {
  getMessages: (userId: string, teacherId: string): ChatMessage[] => {
    const messages = storage.get<ChatMessage[]>(STORAGE_KEYS.CHAT_MESSAGES) || []
    return messages
      .filter(
        (m) =>
          (m.senderId === userId && m.receiverId === teacherId) ||
          (m.senderId === teacherId && m.receiverId === userId),
      )
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
  },

  addMessage: (message: ChatMessage): void => {
    const messages = storage.get<ChatMessage[]>(STORAGE_KEYS.CHAT_MESSAGES) || []
    messages.push(message)
    storage.set(STORAGE_KEYS.CHAT_MESSAGES, messages)
  },

  clearChat: (userId: string, teacherId: string): void => {
    const messages = storage.get<ChatMessage[]>(STORAGE_KEYS.CHAT_MESSAGES) || []
    const filteredMessages = messages.filter(
      (m) =>
        !(
          (m.senderId === userId && m.receiverId === teacherId) ||
          (m.senderId === teacherId && m.receiverId === userId)
        ),
    )
    storage.set(STORAGE_KEYS.CHAT_MESSAGES, filteredMessages)
  },
}

// Contact messages
export const contactStorage = {
  getMessages: (): ContactMessage[] => storage.get<ContactMessage[]>(STORAGE_KEYS.CONTACT_MESSAGES) || [],

  addMessage: (message: ContactMessage): void => {
    const messages = contactStorage.getMessages()
    messages.push(message)
    storage.set(STORAGE_KEYS.CONTACT_MESSAGES, messages)
  },

  updateMessage: (id: string, updates: Partial<ContactMessage>): void => {
    const messages = contactStorage.getMessages()
    const index = messages.findIndex((m) => m.id === id)
    if (index !== -1) {
      messages[index] = { ...messages[index], ...updates }
      storage.set(STORAGE_KEYS.CONTACT_MESSAGES, messages)
    }
  },
}

// Media file management
export const mediaStorage = {
  saveFile: (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const fileData = {
          id: Date.now().toString(),
          name: file.name,
          type: file.type,
          size: file.size,
          data: reader.result as string,
          timestamp: new Date().toISOString(),
        }

        const files = storage.get<any[]>(STORAGE_KEYS.MEDIA_FILES) || []
        files.push(fileData)
        storage.set(STORAGE_KEYS.MEDIA_FILES, files)

        resolve(fileData.data)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    }),

  getFile: (id: string): any | null => {
    const files = storage.get<any[]>(STORAGE_KEYS.MEDIA_FILES) || []
    return files.find((f) => f.id === id) || null
  },

  deleteFile: (id: string): void => {
    const files = storage.get<any[]>(STORAGE_KEYS.MEDIA_FILES) || []
    const filteredFiles = files.filter((f) => f.id !== id)
    storage.set(STORAGE_KEYS.MEDIA_FILES, filteredFiles)
  },
}

// Initialize default data
export const initializeDefaultData = (): void => {
  // Initialize user if not exists
  if (!userStorage.getUser()) {
    const defaultUser: User = {
      id: "1",
      name: "Ahmed Hassan",
      email: "ahmed@student.com",
      phone: "+256 712 345 678",
      avatar: "/placeholder.svg?height=120&width=120",
      courses: ["Thanawi", "Quran", "Idaad", "IPLE"],
      joinDate: "2023-09-15",
      progress: {
        Thanawi: 75,
        Quran: 60,
        Idaad: 45,
        IPLE: 30,
      },
      assignments: [
        {
          id: "1",
          title: "Introduction To Swalah",
          description: "Complete the prayer methodology assignment",
          course: "Thanawi",
          dueDate: "2024-12-20",
          status: "pending",
        },
        {
          id: "2",
          title: "Recite Suraht Nasi",
          description: "Record and submit Quran recitation",
          course: "Quran",
          dueDate: "2024-12-25",
          status: "pending",
        },
      ],
      payments: [
        {
          id: "1",
          amount: "UGX 50000",
          date: "2024-09-01",
          status: "paid",
          course: "Thanawi",
          method: "Mobile Money",
        },
        {
          id: "2",
          amount: "UGX 25000",
          date: "2024-10-01",
          status: "pending",
          course: "Quran",
          method: "Bank Transfer",
        },
      ],
    }
    userStorage.setUser(defaultUser)
  }

  // Initialize teachers if not exists
  if (!storage.get(STORAGE_KEYS.TEACHERS)) {
    const defaultTeachers: Teacher[] = [
      {
        id: "1",
        name: "Lucjan Jamil",
        email: "lucjan@samacollege.com",
        phone: "+256 750 123 456",
        avatar: "/placeholder.svg?height=50&width=50",
        courses: ["Thanawi", "IPLE", "Quran"],
        status: "online",
      },
      {
        id: "2",
        name: "Ahmed Hassan",
        email: "ahmed.teacher@samacollege.com",
        phone: "+256 750 789 012",
        avatar: "/placeholder.svg?height=50&width=50",
        courses: ["Thanawi", "Idaad"],
        status: "teaching",
      },
      {
        id: "3",
        name: "Fatima Zahra",
        email: "fatima@samacollege.com",
        phone: "+256 750 345 678",
        avatar: "/placeholder.svg?height=50&width=50",
        courses: ["Quran"],
        status: "offline",
        lastSeen: "2 hours ago",
      },
      {
        id: "4",
        name: "Ibrahim Malik",
        email: "ibrahim@samacollege.com",
        phone: "+256 750 901 234",
        avatar: "/placeholder.svg?height=50&width=50",
        courses: ["Idaad"],
        status: "offline",
        lastSeen: "1 day ago",
      },
    ]
    storage.set(STORAGE_KEYS.TEACHERS, defaultTeachers)
  }
}
