"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Phone, Video, MoreVertical, Plus, Send, Camera, Image, FileText, FileVideo } from "lucide-react"
import { useRouter } from "next/navigation"

interface Message {
  id: string
  sender: "admin" | "student"
  text: string
  timestamp: Date
  status: "sent" | "delivered" | "read"
  attachmentType?: "image" | "document" | "video" | "audio"
  attachmentUrl?: string
  attachmentName?: string
}

export default function AdminChatRoom({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [showAttachments, setShowAttachments] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)

  // Mock student data
  const student = {
    id: params.id,
    name: "Ahmed Mohammed",
    status: "Online",
    avatar: "/placeholder.svg?height=50&width=50",
    phone: "+2567500123456",
    courses: ["Thanawi", "IPLE", "Quran"],
  }

  // Check if the device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Initialize with some mock messages
  useEffect(() => {
    const initialMessages: Message[] = [
      {
        id: "1",
        sender: "admin",
        text: "Hello Ahmed, I wanted to check in on your progress with the Quran memorization assignment.",
        timestamp: new Date(Date.now() - 86400000), // 1 day ago
        status: "read",
      },
      {
        id: "2",
        sender: "student",
        text: "Assalamu alaikum teacher, I've completed the first section but I'm having some difficulty with the pronunciation in the second part.",
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        status: "read",
      },
      {
        id: "3",
        sender: "admin",
        text: "Wa alaikum assalam. That's good progress. Would you like to schedule a one-on-one session to work on the pronunciation?",
        timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
        status: "read",
      },
      {
        id: "4",
        sender: "student",
        text: "Yes, that would be very helpful. When are you available?",
        timestamp: new Date(Date.now() - 900000), // 15 minutes ago
        status: "read",
      },
    ]

    setMessages(initialMessages)
  }, [])

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
    if (isMobile) {
      if (isInputFocused) {
        // Scroll to bottom when input is focused
        scrollToBottom()
      }
    }
  }, [isInputFocused, isMobile])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: "admin",
        text: message,
        timestamp: new Date(),
        status: "sent",
      }

      setMessages([...messages, newMessage])
      setMessage("")

      // Show typing indicator
      setIsLoading(true)

      // Simulate student response after a delay
      setTimeout(() => {
        const studentResponse: Message = {
          id: (Date.now() + 1).toString(),
          sender: "student",
          text: getRandomResponse(message),
          timestamp: new Date(),
          status: "sent",
        }

        setMessages((prev) => [...prev, studentResponse])
        setIsLoading(false)
      }, 2000)
    }
  }

  const getRandomResponse = (adminMessage: string) => {
    // More contextual responses based on admin message
    if (adminMessage.toLowerCase().includes("assignment") || adminMessage.toLowerCase().includes("homework")) {
      const assignmentResponses = [
        "I've been working on the assignment. I should be able to submit it by the deadline.",
        "I'm having some trouble with part of the assignment. Could you provide more guidance?",
        "I've completed the assignment and will submit it today.",
        "Thank you for the reminder about the assignment. I'll start working on it right away.",
      ]
      return assignmentResponses[Math.floor(Math.random() * assignmentResponses.length)]
    } else if (adminMessage.toLowerCase().includes("exam") || adminMessage.toLowerCase().includes("test")) {
      const examResponses = [
        "I've been studying for the exam. Are there any specific topics I should focus on?",
        "I'm a bit nervous about the upcoming test. Could we have a review session?",
        "I feel prepared for the exam, but I have a few questions about the format.",
        "Thank you for checking in. I'm reviewing all the material for the test.",
      ]
      return examResponses[Math.floor(Math.random() * examResponses.length)]
    } else if (adminMessage.toLowerCase().includes("thank")) {
      return "You're welcome, teacher. I appreciate your help."
    } else if (adminMessage.toLowerCase().includes("hello") || adminMessage.toLowerCase().includes("hi")) {
      return "Assalamu alaikum teacher. How can I help you today?"
    } else {
      // General responses
      const generalResponses = [
        "I understand. Thank you for letting me know.",
        "That makes sense. I'll work on improving that area.",
        "I appreciate your guidance, teacher.",
        "Yes, I'll make sure to follow your advice.",
        "I'll do my best to implement your suggestions.",
        "Thank you for your support and patience.",
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

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]

      // Create a message with the file
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: "admin",
        text: `Sent file: ${file.name}`,
        timestamp: new Date(),
        status: "sent",
        attachmentType: file.type.startsWith("image/")
          ? "image"
          : file.type.startsWith("video/")
            ? "video"
            : "document",
        attachmentUrl: URL.createObjectURL(file),
        attachmentName: file.name,
      }

      setMessages([...messages, newMessage])

      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      // Show typing indicator
      setIsLoading(true)

      // Simulate student response to the file
      setTimeout(() => {
        const fileResponses = [
          `Thank you for sending the file "${file.name}". I'll review it right away.`,
          `I've received your file "${file.name}". I'll look at it and let you know if I have questions.`,
          `Got the file "${file.name}". I'll go through it and follow the instructions.`,
          `Thank you for the resource "${file.name}". This will be helpful for my studies.`,
        ]

        const studentResponse: Message = {
          id: (Date.now() + 1).toString(),
          sender: "student",
          text: fileResponses[Math.floor(Math.random() * fileResponses.length)],
          timestamp: new Date(),
          status: "sent",
        }

        setMessages((prev) => [...prev, studentResponse])
        setIsLoading(false)
      }, 2000)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (date: Date) => {
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
      setMessages([])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-vh-100 position-relative pb-navbar">
      {/* Header */}
      <header className="position-fixed top-0 start-0 end-0 w-100 z-3 bg-dark-blue shadow-sm">
        <div className="container-fluid py-2">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <Link href="/admin/students" className="me-3">
                <button className="btn btn-link text-white p-1">
                  <ArrowLeft size={20} />
                </button>
              </Link>
              <div
                className="d-flex align-items-center gap-2"
                data-bs-toggle="offcanvas"
                data-bs-target="#studentProfile"
                aria-controls="studentProfile"
                style={{ cursor: "pointer" }}
              >
                <img
                  src={student.avatar || "/placeholder.svg"}
                  alt={student.name}
                  className="rounded-circle border border-primary p-1"
                  style={{ width: "40px", height: "40px", objectFit: "cover" }}
                />
                <div className="d-flex flex-column">
                  <div className="fw-medium text-white">{student.name}</div>
                  <div className="text-muted small">{student.status}</div>
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
                    <Link href={`/admin/students/${params.id}`} className="dropdown-item text-white">
                      View Student Profile
                    </Link>
                  </li>
                  <li>
                    <Link href={`/admin/students/${params.id}/progress`} className="dropdown-item text-white">
                      View Progress
                    </Link>
                  </li>
                  <li>
                    <Link href={`/admin/students/${params.id}/assignments`} className="dropdown-item text-white">
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
          <span className="badge bg-dark-blue px-3 py-2 rounded-pill">{formatDate(new Date())}</span>
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
                  className={`d-flex mb-3 ${msg.sender === "admin" ? "justify-content-end" : "justify-content-start"}`}
                >
                  {msg.sender === "student" && (
                    <img
                      src={student.avatar || "/placeholder.svg"}
                      alt={student.name}
                      className="rounded-circle align-self-end me-2 d-none d-sm-block"
                      style={{ width: "30px", height: "30px", objectFit: "cover" }}
                    />
                  )}

                  <div className={`message-bubble ${msg.sender === "admin" ? "sent" : "received"}`}>
                    {msg.attachmentType === "image" && msg.attachmentUrl && (
                      <div className="mb-2">
                        <img
                          src={msg.attachmentUrl || "/placeholder.svg"}
                          alt="Attachment"
                          className="img-fluid rounded-3"
                          style={{ maxHeight: "200px" }}
                        />
                        {msg.attachmentName && <div className="small text-white-50 mt-1">{msg.attachmentName}</div>}
                      </div>
                    )}

                    {msg.attachmentType === "document" && (
                      <div className="mb-2 d-flex align-items-center bg-dark bg-opacity-50 p-2 rounded">
                        <FileText size={24} className="me-2 text-info" />
                        <span className="text-truncate">{msg.attachmentName || "Document attachment"}</span>
                      </div>
                    )}

                    {msg.attachmentType === "video" && (
                      <div className="mb-2 d-flex align-items-center bg-dark bg-opacity-50 p-2 rounded">
                        <FileVideo size={24} className="me-2 text-danger" />
                        <span className="text-truncate">{msg.attachmentName || "Video attachment"}</span>
                      </div>
                    )}

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
                src={student.avatar || "/placeholder.svg"}
                alt={student.name}
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

      {/* Message Input */}
      <div className="position-fixed bottom-0 start-0 end-0 p-2 bg-dark-blue shadow-lg">
        <div className="container-fluid">
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-outline-primary rounded-circle p-2 flex-shrink-0 attachment-menu"
              onClick={() => setShowAttachments(!showAttachments)}
            >
              <Plus size={20} />
            </button>

            <textarea
              className="form-control message-input flex-grow-1"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              style={{ height: "50px" }}
            ></textarea>

            <button
              className="btn btn-primary rounded-circle p-2 flex-shrink-0"
              onClick={handleSendMessage}
              disabled={!message.trim()}
            >
              <Send size={20} />
            </button>
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
                <Image size={32} className="text-warning mb-2" />
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
            </div>
          </div>
        </div>
      )}

      {/* Hidden file input for attachments */}
      <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileSelected} />

      {/* Student Profile Offcanvas */}
      <div className="offcanvas offcanvas-end bg-dark-blue text-white" tabIndex={-1} id="studentProfile">
        <div className="offcanvas-header border-bottom border-secondary">
          <h5 className="offcanvas-title">Student Profile</h5>
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
              src={student.avatar || "/placeholder.svg"}
              alt={student.name}
              className="rounded-circle border border-primary p-1 mb-3"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
            <h3 className="mt-2 fs-4 fw-bold">{student.name}</h3>
            <div className="text-muted">{student.phone}</div>

            <div className="mt-4 w-100">
              <h4 className="fw-semibold fs-5 border-bottom border-secondary pb-2 mb-3">Enrolled Courses:</h4>
              <ul className="list-group list-group-flush bg-transparent">
                {student.courses.map((course, index) => (
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
              <Link href={`/admin/students/${params.id}`} className="btn btn-outline-primary">
                View Full Profile
              </Link>
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
