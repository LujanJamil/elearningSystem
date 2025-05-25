"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Send, Paperclip } from "lucide-react"

// Mock teachers data
const teachersData = [
  { id: "1", name: "Lucjan Jamil" },
  { id: "2", name: "Ahmed Hassan" },
  { id: "3", name: "Fatima Zahra" },
  { id: "4", name: "Ibrahim Malik" },
]

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export default function SimpleChat({ params }: { params: { id: string } }) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Find teacher name
  const teacher = teachersData.find((t) => t.id === params.id) || { id: params.id, name: `Teacher ${params.id}` }

  // Initialize with some messages
  useEffect(() => {
    setMessages([
      {
        id: "1",
        text: `Welcome! I'm ${teacher.name}. How can I help you today?`,
        isUser: false,
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: "2",
        text: "I have a question about the assignment due next week.",
        isUser: true,
        timestamp: new Date(Date.now() - 1800000),
      },
      {
        id: "3",
        text: "Of course, what would you like to know?",
        isUser: false,
        timestamp: new Date(Date.now() - 900000),
      },
    ])
  }, [teacher.name])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add user message
      const newMessage = {
        id: Date.now().toString(),
        text: message,
        isUser: true,
        timestamp: new Date(),
      }

      setMessages([...messages, newMessage])
      setMessage("")

      // Simulate teacher response
      setTimeout(() => {
        const teacherMessage = {
          id: (Date.now() + 1).toString(),
          text: "Thank you for your message. I'll get back to you soon.",
          isUser: false,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, teacherMessage])
      }, 1000)
    }
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]

      // Add file message
      const newMessage = {
        id: Date.now().toString(),
        text: `Sent file: ${file.name}`,
        isUser: true,
        timestamp: new Date(),
      }

      setMessages([...messages, newMessage])

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      // Simulate teacher response
      setTimeout(() => {
        const teacherMessage = {
          id: (Date.now() + 1).toString(),
          text: `I've received your file "${file.name}". I'll review it and get back to you.`,
          isUser: false,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, teacherMessage])
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-gray-800 p-4 z-10">
        <div className="flex items-center">
          <Link href="/dashboard/teachers">
            <button className="mr-4">
              <ArrowLeft size={24} />
            </button>
          </Link>
          <div>
            <h1 className="text-xl font-bold">{teacher.name}</h1>
            <p className="text-sm text-gray-400">Online</p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="pt-20 pb-24 px-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-4 max-w-[80%] ${msg.isUser ? "ml-auto bg-blue-600" : "mr-auto bg-gray-700"} rounded-lg p-3`}
          >
            <p>{msg.text}</p>
            <p className="text-xs text-gray-300 mt-1">
              {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4">
        <div className="flex gap-2">
          <button className="bg-gray-700 text-white p-2 rounded" onClick={handleFileUpload}>
            <Paperclip size={20} />
          </button>
          <input
            type="text"
            className="flex-1 bg-gray-700 text-white rounded px-4 py-2"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button className="bg-blue-600 text-white p-2 rounded" onClick={handleSendMessage}>
            <Send size={20} />
          </button>
        </div>
      </div>

      {/* Hidden file input */}
      <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileSelected} />
    </div>
  )
}
