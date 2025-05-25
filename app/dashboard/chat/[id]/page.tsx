"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Phone,
  Video,
  MoreVertical,
  Plus,
  Send,
  Camera,
  ImageIcon,
  FileText,
  FileVideo,
  Mic,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useApp } from "@/contexts/app-context"
import type { ChatMessage } from "@/lib/storage"

export default function ChatRoom({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { user, teachers, addChatMessage, getChatMessages, clearChat, uploadFile } = useApp()
  const [message, setMessage] = useState("")
  const [showAttachments, setShowAttachments] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)

  // Find the teacher based on the ID parameter
  const teacher = teachers.find((t) => t.id === params.id) || {
    id: params.id,
    name: `Teacher ${params.id}`,
    status: "online" as const,
    avatar: "/placeholder.svg?height=50&width=50",
    phone: "+256750123456",
    courses: ["Unknown"],
    email: "teacher@samacollege.com",
  }

  // Check if the device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Load messages from storage
  useEffect(() => {
    if (user) {
      const storedMessages = getChatMessages(teacher.id)
      setMessages(storedMessages)

      // If no messages exist, add a welcome message
      if (storedMessages.length === 0) {
        const welcomeMessage: ChatMessage = {
          id: Date.now().toString(),
          senderId: teacher.id,
          receiverId: user.id,
          text: `Welcome to Sama college! I'm ${teacher.name}. We're very excited to begin this educational adventure with you. Remember that you're only here to study so value your school fees.`,
          timestamp: new Date().toISOString(),
          status: "read",
        }
        addChatMessage(welcomeMessage)
        setMessages([welcomeMessage])
      }
    }
  }, [user, teacher.id, teacher.name, getChatMessages, addChatMessage])

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Close attachment menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showAttachments && event.target instanceof Element && !event.target.closest(".attachment-menu")) {
        setShowAttachments(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showAttachments])

  // Adjust UI when input is focused on mobile
  useEffect(() => {
    if (isMobile && isInputFocused) {
      scrollToBottom()
    }
  }, [isInputFocused, isMobile])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (message.trim() && user) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        senderId: user.id,
        receiverId: teacher.id,
        text: message,
        timestamp: new Date().toISOString(),
        status: "sent",
      }

      addChatMessage(newMessage)
      setMessages((prev) => [...prev, newMessage])
      setMessage("")

      // Show typing indicator
      setIsLoading(true)

      // Simulate teacher response after a delay
      setTimeout(() => {
        const teacherResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          senderId: teacher.id,
          receiverId: user.id,
          text: getRandomResponse(message),
          timestamp: new Date().toISOString(),
          status: "sent",
        }

        addChatMessage(teacherResponse)
        setMessages((prev) => [...prev, teacherResponse])
        setIsLoading(false)
      }, 2000)
    }
  }

  const getRandomResponse = (userMessage: string) => {
    // More contextual responses based on user message
    if (userMessage.toLowerCase().includes("assignment") || userMessage.toLowerCase().includes("homework")) {
      const assignmentResponses = [
        "For the assignment, make sure you focus on the key concepts we discussed in class. The deadline is next Friday.",
        "The assignment requires you to demonstrate your understanding of the material. Feel free to ask if you need clarification on any part.",
        "I've posted detailed instructions for the assignment in the course materials section. Let me know if anything is unclear.",
        "Don't forget that the assignment counts for 20% of your final grade. Take your time to do it properly.",
      ]
      return assignmentResponses[Math.floor(Math.random() * assignmentResponses.length)]
    } else if (userMessage.toLowerCase().includes("exam") || userMessage.toLowerCase().includes("test")) {
      const examResponses = [
        "The exam will cover all material from chapters 1-5. Focus on the key concepts we highlighted in class.",
        "For the upcoming test, make sure to review your notes and practice the example problems.",
        "The exam format will be multiple choice and short answer questions. We'll have a review session next week.",
        "Don't worry too much about the exam. If you've been keeping up with the coursework, you'll do fine.",
      ]
      return examResponses[Math.floor(Math.random() * examResponses.length)]
    } else if (userMessage.toLowerCase().includes("thank")) {
      return "You're welcome! Let me know if you need anything else."
    } else if (userMessage.toLowerCase().includes("hello") || userMessage.toLowerCase().includes("hi")) {
      return "Hello! How can I help you today with your studies?"
    } else {
      // General responses
      const generalResponses = [
        "I understand. Let me help you with that.",
        "That's a good question. Let me explain...",
        "I appreciate your engagement with the course material.",
        "Would you like to schedule a one-on-one session to discuss this further?",
        "Don't forget to review the materials from last week before starting the new topics.",
        "Let me know if you need any clarification on the course materials.",
      ]
      return generalResponses[Math.floor(Math.random() * generalResponses.length)]
    }
  }

  const handleAttachmentClick = (type: string) => {
    setShowAttachments(false)

    if (type === "camera") {
      // In a real app, you would open the camera
      alert("Camera functionality would open here")
    } else if (type === "mic") {
      // In a real app, you would start audio recording
      alert("Audio recording would start here")
    } else {
      // For other types, trigger file input
      if (fileInputRef.current) {
        fileInputRef.current.accept = getAcceptType(type)
        fileInputRef.current.click()
      }
    }
  }

  const getAcceptType = (type: string) => {
    switch (type) {
      case "photos":
        return "image/*"
      case "documents":
        return ".pdf,.doc,.docx,.txt"
      case "videos":
        return "video/*"
      default:
        return "*/*"
    }
  }

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0 && user) {
      const file = files[0]

      try {
        // Upload file and get persistent URL
        const fileUrl = await uploadFile(file)

        // Create a message with the file
        const newMessage: ChatMessage = {
          id: Date.now().toString(),
          senderId: user.id,
          receiverId: teacher.id,
          text: `Sent file: ${file.name}`,
          timestamp: new Date().toISOString(),
          status: "sent",
          attachments: [
            {
              type: file.type.startsWith("image/")
                ? "image"
                : file.type.startsWith("video/")
                  ? "video"
                  : file.type.startsWith("audio/")
                    ? "audio"
                    : "document",
              url: fileUrl,
              name: file.name,
            },
          ],
        }

        addChatMessage(newMessage)
        setMessages((prev) => [...prev, newMessage])

        // Reset the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }

        // Show typing indicator
        setIsLoading(true)

        // Simulate teacher response to the file
        setTimeout(() => {
          const fileResponses = [
            `I've received your file "${file.name}". I'll review it and get back to you soon.`,
            `Thanks for sending "${file.name}". I'll take a look at it.`,
            `Got your file "${file.name}". I'll check it out and provide feedback.`,
            `I've downloaded "${file.name}". I'll review it and let you know my thoughts.`,
          ]

          const teacherResponse: ChatMessage = {
            id: (Date.now() + 1).toString(),
            senderId: teacher.id,
            receiverId: user.id,
            text: fileResponses[Math.floor(Math.random() * fileResponses.length)],
            timestamp: new Date().toISOString(),
            status: "sent",
          }

          addChatMessage(teacherResponse)
          setMessages((prev) => [...prev, teacherResponse])
          setIsLoading(false)
        }, 2000)
      } catch (error) {
        console.error("Error uploading file:", error)
        alert("Failed to upload file. Please try again.")
      }
    }
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })
    }
  }

  const handleCall = () => {
    alert("Call functionality would be implemented here")
  }

  const handleVideoCall = () => {
    alert("Video call functionality would be implemented here")
  }

  const handleClearChat = () => {
    if (confirm("Are you sure you want to clear all chat messages?")) {
      clearChat(teacher.id)
      setMessages([])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!user) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-vh-100 position-relative">
      {/* Header */}
      <header className="fixed-top bg-dark-blue shadow-sm">
        <div className="container-fluid py-2">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <Link href="/dashboard/teachers" className="me-3">
                <button className="btn btn-link text-white p-1">
                  <ArrowLeft size={20} />
                </button>
              </Link>
              <div
                className="d-flex align-items-center gap-2"
                data-bs-toggle="offcanvas"
                data-bs-target="#teacherProfile"
                aria-controls="teacherProfile"
                style={{ cursor: "pointer" }}
              >
                <img
                  src={teacher.avatar || "/placeholder.svg"}
                  alt={teacher.name}
                  className="rounded-circle border border-primary p-1"
                  style={{ width: "40px", height: "40px", objectFit: "cover" }}
                />
                <div className="d-flex flex-column">
                  <div className="fw-medium text-white">{teacher.name}</div>
                  <div className="text-muted small">
                    {teacher.status === "online"
                      ? "Online"
                      : teacher.status === "teaching"
                        ? "Teaching now..."
                        : teacher.lastSeen || "Offline"}
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <button className="btn btn-outline-primary rounded-circle p-1" onClick={handleCall}>
                <Phone size={18} />
              </button>
              <button className="btn btn-outline-primary rounded-circle p-1" onClick={handleVideoCall}>
                <Video size={18} />
              </button>
              <div className="dropdown">
                <button className="btn btn-outline-primary rounded-circle p-1" data-bs-toggle="dropdown">
                  <MoreVertical size={18} />
                </button>
                <ul className="dropdown-menu dropdown-menu-end bg-dark-blue">
                  <li>
                    <Link href="/dashboard/timetable" className="dropdown-item text-white">
                      Time Table
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/progress" className="dropdown-item text-white">
                      View Progress
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/certificates" className="dropdown-item text-white">
                      Download Report Cards
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/assignments" className="dropdown-item text-white">
                      Assignments
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider bg-secondary" />
                  </li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleClearChat}>
                      Clear Chat
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div ref={chatContainerRef} className="chat-area" style={{ paddingTop: "70px", paddingBottom: "80px" }}>
        <div className="position-absolute top-0 start-50 translate-middle-x mt-5 pt-2">
          <span className="badge bg-dark-blue px-3 py-2 rounded-pill">{formatDate(new Date().toISOString())}</span>
        </div>

        <div className="container-fluid mt-4 pt-2">
          {messages.map((msg, index) => {
            // Check if we need to show a date separator
            const showDateSeparator =
              index === 0 || formatDate(msg.timestamp) !== formatDate(messages[index - 1].timestamp)

            return (
              <div key={msg.id} className="fade-in">
                {showDateSeparator && (
                  <div className="text-center my-3">
                    <span className="badge bg-dark-blue px-3 py-2 rounded-pill">{formatDate(msg.timestamp)}</span>
                  </div>
                )}

                <div
                  className={`d-flex mb-3 ${msg.senderId === user.id ? "justify-content-end" : "justify-content-start"}`}
                >
                  {msg.senderId === teacher.id && (
                    <img
                      src={teacher.avatar || "/placeholder.svg"}
                      alt={teacher.name}
                      className="rounded-circle align-self-end me-2 d-none d-sm-block"
                      style={{ width: "30px", height: "30px", objectFit: "cover" }}
                    />
                  )}

                  <div className={`message-bubble ${msg.senderId === user.id ? "sent" : "received"}`}>
                    {msg.attachments &&
                      msg.attachments.map((attachment, idx) => (
                        <div key={idx} className="mb-2">
                          {attachment.type === "image" && (
                            <div>
                              <img
                                src={attachment.url || "/placeholder.svg"}
                                alt="Attachment"
                                className="img-fluid rounded-3"
                                style={{ maxHeight: "200px" }}
                              />
                              <div className="small text-white-50 mt-1">{attachment.name}</div>
                            </div>
                          )}

                          {attachment.type === "document" && (
                            <div className="d-flex align-items-center bg-dark bg-opacity-50 p-2 rounded">
                              <FileText size={24} className="me-2 text-info" />
                              <span className="text-truncate">{attachment.name}</span>
                            </div>
                          )}

                          {attachment.type === "video" && (
                            <div>
                              <video
                                controls
                                className="img-fluid rounded-3"
                                style={{ maxHeight: "200px" }}
                                src={attachment.url}
                              >
                                Your browser does not support the video tag.
                              </video>
                              <div className="small text-white-50 mt-1">{attachment.name}</div>
                            </div>
                          )}

                          {attachment.type === "audio" && (
                            <div className="d-flex align-items-center bg-dark bg-opacity-50 p-2 rounded">
                              <Mic size={24} className="me-2 text-success" />
                              <audio controls className="flex-grow-1">
                                <source src={attachment.url} />
                                Your browser does not support the audio element.
                              </audio>
                            </div>
                          )}
                        </div>
                      ))}

                    <p className="mb-1">{msg.text}</p>
                    <div className="message-time">{formatTime(msg.timestamp)}</div>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Typing indicator */}
          {isLoading && (
            <div className="d-flex mb-3 justify-content-start">
              <img
                src={teacher.avatar || "/placeholder.svg"}
                alt={teacher.name}
                className="rounded-circle align-self-end me-2 d-none d-sm-block"
                style={{ width: "30px", height: "30px", objectFit: "cover" }}
              />
              <div className="message-bubble received typing-indicator">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input - Fixed at bottom */}
      <div className="fixed-bottom chat-input-container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="input-group">
                <button
                  className="btn btn-outline-primary rounded-circle"
                  type="button"
                  onClick={() => setShowAttachments(!showAttachments)}
                >
                  <Plus size={20} />
                </button>
                <textarea
                  className="form-control custom-textarea"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  style={{ height: "50px", backgroundColor: "#001a33", color: "white" }}
                ></textarea>
                <button
                  className="btn btn-primary rounded-circle"
                  type="button"
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Attachment Menu */}
      {showAttachments && (
        <div className="position-fixed bottom-0 mb-5 start-0 ms-4 z-3 fade-in attachment-menu">
          <div className="card bg-dark-blue rounded-4 shadow-lg">
            <div className="card-body d-flex flex-wrap justify-content-center">
              <button
                className="btn btn-link text-white d-flex flex-column align-items-center p-3"
                onClick={() => handleAttachmentClick("photos")}
              >
                <ImageIcon size={32} className="text-warning mb-2" />
                <span className="small">Photos</span>
              </button>
              <button
                className="btn btn-link text-white d-flex flex-column align-items-center p-3"
                onClick={() => handleAttachmentClick("camera")}
              >
                <Camera size={32} className="text-success mb-2" />
                <span className="small">Camera</span>
              </button>
              <button
                className="btn btn-link text-white d-flex flex-column align-items-center p-3"
                onClick={() => handleAttachmentClick("documents")}
              >
                <FileText size={32} className="text-info mb-2" />
                <span className="small">Documents</span>
              </button>
              <button
                className="btn btn-link text-white d-flex flex-column align-items-center p-3"
                onClick={() => handleAttachmentClick("videos")}
              >
                <FileVideo size={32} className="text-primary mb-2" />
                <span className="small">Videos</span>
              </button>
              <button
                className="btn btn-link text-white d-flex flex-column align-items-center p-3"
                onClick={() => handleAttachmentClick("mic")}
              >
                <Mic size={32} className="text-danger mb-2" />
                <span className="small">Audio</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden file input for attachments */}
      <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileSelected} />

      {/* Teacher Profile Offcanvas */}
      <div className="offcanvas offcanvas-end bg-dark-blue text-white" tabIndex={-1} id="teacherProfile">
        <div className="offcanvas-header border-bottom border-secondary">
          <h5 className="offcanvas-title">Teacher Profile</h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="d-flex flex-column align-items-center">
            <img
              src={teacher.avatar || "/placeholder.svg"}
              alt={teacher.name}
              className="rounded-circle border border-primary p-1 mb-3"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
            <h3 className="mt-2 fs-4 fw-bold">{teacher.name}</h3>
            <div className="text-muted">{teacher.phone}</div>
            <div className="text-muted small">{teacher.email}</div>

            <div className="mt-4 w-100">
              <h4 className="fw-semibold fs-5 border-bottom border-secondary pb-2 mb-3">Courses Taught:</h4>
              <ul className="list-group list-group-flush bg-transparent">
                {teacher.courses.map((course, index) => (
                  <li key={index} className="list-group-item bg-transparent border-secondary text-white">
                    <div className="d-flex align-items-center">
                      <div className="bg-primary rounded-circle me-2" style={{ width: "8px", height: "8px" }}></div>
                      {course}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="d-grid gap-2 mt-4 w-100">
              <button className="btn btn-outline-primary" onClick={handleCall}>
                <Phone size={18} className="me-2" /> Call Teacher
              </button>
              <button className="btn btn-outline-danger" onClick={handleClearChat}>
                Clear Chat History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
