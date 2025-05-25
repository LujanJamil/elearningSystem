"use client"

import type React from "react"

import { useState } from "react"
import { Phone, Video, MoreVertical, Search } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Teacher {
  id: string
  name: string
  avatar: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  course: string
  online: boolean
}

export default function Teachers() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("All Courses")

  // Mock teachers data
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: "1",
      name: "Lucjan Jamil",
      avatar: "/placeholder.svg?height=50&width=50",
      lastMessage: "Tomorrow Send me the work",
      lastMessageTime: "15:21",
      unreadCount: 1,
      course: "IPLE",
      online: true,
    },
    {
      id: "2",
      name: "Ahmed Hassan",
      avatar: "/placeholder.svg?height=50&width=50",
      lastMessage: "The assignment is due next week",
      lastMessageTime: "12:05",
      unreadCount: 3,
      course: "Thanawi",
      online: true,
    },
    {
      id: "3",
      name: "Fatima Zahra",
      avatar: "/placeholder.svg?height=50&width=50",
      lastMessage: "Please review the Quran recitation",
      lastMessageTime: "Yesterday",
      unreadCount: 0,
      course: "Quran",
      online: false,
    },
    {
      id: "4",
      name: "Ibrahim Malik",
      avatar: "/placeholder.svg?height=50&width=50",
      lastMessage: "Class is rescheduled for tomorrow",
      lastMessageTime: "Monday",
      unreadCount: 0,
      course: "Idaad",
      online: false,
    },
  ])

  const courses = ["All Courses", "IPLE", "Thanawi", "Quran", "Idaad"]

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = selectedCourse === "All Courses" || teacher.course === selectedCourse

    return matchesSearch && matchesCourse
  })

  const handleChatClick = (teacherId: string) => {
    router.push(`/dashboard/chat/${teacherId}`)
  }

  const handleCallTeacher = (teacherId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    alert(`Calling teacher with ID: ${teacherId}`)
    // In a real app, you would implement call functionality here
  }

  const handleVideoCallTeacher = (teacherId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    alert(`Video calling teacher with ID: ${teacherId}`)
    // In a real app, you would implement video call functionality here
  }

  return (
    <div className="min-vh-100 pb-5 mb-5">
      <header className="bg-islamic-secondary p-3 sticky-top shadow-sm">
        <div className="container-fluid">
          <div className="row g-3">
            <div className="col-12 col-md-7">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <span className="fs-4 fw-semibold text-white">My Teachers</span>
                </div>
                <div className="d-flex align-items-center">
                  <div className="dropdown">
                    <button className="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
                      {selectedCourse}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end bg-dark-blue">
                      {courses.map((course) => (
                        <li key={course}>
                          <button className="dropdown-item text-white" onClick={() => setSelectedCourse(course)}>
                            {course}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-5">
              <div className="position-relative">
                <Search className="position-absolute start-0 top-50 translate-middle-y ms-3 text-muted" size={16} />
                <input
                  type="text"
                  className="form-control bg-dark text-white ps-5"
                  placeholder="Search teachers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container-fluid py-4">
        {filteredTeachers.length > 0 ? (
          <div className="row g-3">
            {filteredTeachers.map((teacher) => (
              <div className="col-12" key={teacher.id}>
                <div
                  className="card bg-dark-blue text-white shadow-sm border-0 fade-in"
                  onClick={() => handleChatClick(teacher.id)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card-body p-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-3">
                        <div className="position-relative">
                          <img
                            src={teacher.avatar || "/placeholder.svg"}
                            alt={teacher.name}
                            className="rounded-circle border border-secondary"
                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                          />
                          {teacher.online && (
                            <span
                              className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-dark"
                              style={{ width: "12px", height: "12px" }}
                            ></span>
                          )}
                        </div>
                        <div>
                          <div className="fw-medium d-flex align-items-center gap-2">
                            {teacher.name}
                            <span className="badge bg-primary rounded-pill small">{teacher.course}</span>
                          </div>
                          <div className="text-muted small">{teacher.lastMessage}</div>
                        </div>
                      </div>
                      <div className="d-flex flex-column align-items-end">
                        <span className="text-muted small">{teacher.lastMessageTime}</span>
                        {teacher.unreadCount > 0 && (
                          <span className="badge bg-danger rounded-pill">{teacher.unreadCount}</span>
                        )}
                      </div>
                    </div>
                    <div className="d-flex justify-content-end mt-3 gap-2">
                      <button
                        className="btn btn-outline-primary btn-sm rounded-circle"
                        onClick={(e) => handleCallTeacher(teacher.id, e)}
                      >
                        <Phone size={16} />
                      </button>
                      <button
                        className="btn btn-outline-success btn-sm rounded-circle"
                        onClick={(e) => handleVideoCallTeacher(teacher.id, e)}
                      >
                        <Video size={16} />
                      </button>
                      <div className="dropdown">
                        <button
                          className="btn btn-outline-light btn-sm rounded-circle"
                          onClick={(e) => e.stopPropagation()}
                          data-bs-toggle="dropdown"
                        >
                          <MoreVertical size={16} />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end bg-dark-blue">
                          <li>
                            <Link
                              href={`/dashboard/assignments?teacher=${teacher.id}`}
                              className="dropdown-item text-white"
                              onClick={(e) => e.stopPropagation()}
                            >
                              View Assignments
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={`/dashboard/timetable?teacher=${teacher.id}`}
                              className="dropdown-item text-white"
                              onClick={(e) => e.stopPropagation()}
                            >
                              View Schedule
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5 mt-4">
            <div className="mb-3">
              <Search size={48} className="text-muted" />
            </div>
            <h4 className="text-white">No teachers found</h4>
            <p className="text-muted">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
