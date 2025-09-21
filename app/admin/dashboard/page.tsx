"use client"

import { useState, useEffect } from "react"
import { Users, BookOpen, TrendingUp, Clock, Calendar } from "lucide-react"
import Link from "next/link"

// Mock data for active students
const mockStudents = [
  {
    id: 1,
    name: "Ahmed Hassan",
    course: "Thanawi",
    lastActive: "2 minutes ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Fatima Zahra",
    course: "Idaad",
    lastActive: "5 minutes ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Ibrahim Malik",
    course: "Quran",
    lastActive: "10 minutes ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Zainab Ali",
    course: "IPLE",
    lastActive: "15 minutes ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function AdminDashboard() {
  const [totalStudents, setTotalStudents] = useState(0)
  const [totalCourses, setTotalCourses] = useState(0)
  const [activeStudents, setActiveStudents] = useState(0)
  const [pendingAssignments, setPendingAssignments] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Set mock data
        setTotalStudents(156)
        setTotalCourses(12)
        setActiveStudents(87)
        setPendingAssignments(34)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  return (
    <div className="min-vh-100 pb-5 mb-5 md:pb-0 md:mb-0">
      <header className="bg-islamic-secondary p-3 sticky-top shadow-sm">
        <div className="container-fluid">
          <h1 className="fs-4 fw-semibold text-white">Admin Dashboard</h1>
          <p className="text-gray-300 mb-0">Welcome back, Administrator</p>
        </div>
      </header>

      <main className="container-fluid py-4">
        {/* Stats Cards */}
        <div className="row g-4 mb-5">
          <div className="col-6 col-md-3">
            <div className="card bg-dark-blue border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="rounded-circle bg-primary/20 p-2 me-3">
                    <Users className="text-primary h-6 w-6" />
                  </div>
                  <h2 className="card-title fs-6 mb-0 text-gray-300">Total Students</h2>
                </div>
                {loading ? (
                  <div className="placeholder-glow">
                    <span className="placeholder col-6"></span>
                  </div>
                ) : (
                  <h3 className="fs-2 fw-bold text-white">{totalStudents}</h3>
                )}
                <Link href="/admin/students" className="text-primary text-decoration-none small">
                  View all students
                </Link>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="card bg-dark-blue border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="rounded-circle bg-success/20 p-2 me-3">
                    <BookOpen className="text-success h-6 w-6" />
                  </div>
                  <h2 className="card-title fs-6 mb-0 text-gray-300">Total Courses</h2>
                </div>
                {loading ? (
                  <div className="placeholder-glow">
                    <span className="placeholder col-6"></span>
                  </div>
                ) : (
                  <h3 className="fs-2 fw-bold text-white">{totalCourses}</h3>
                )}
                <Link href="/admin/courses" className="text-success text-decoration-none small">
                  View all courses
                </Link>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="card bg-dark-blue border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="rounded-circle bg-warning/20 p-2 me-3">
                    <TrendingUp className="text-warning h-6 w-6" />
                  </div>
                  <h2 className="card-title fs-6 mb-0 text-gray-300">Active Students</h2>
                </div>
                {loading ? (
                  <div className="placeholder-glow">
                    <span className="placeholder col-6"></span>
                  </div>
                ) : (
                  <h3 className="fs-2 fw-bold text-white">{activeStudents}</h3>
                )}
                <span className="text-gray-400 small">
                  {Math.round((activeStudents / totalStudents) * 100) || 0}% of total
                </span>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="card bg-dark-blue border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="rounded-circle bg-danger/20 p-2 me-3">
                    <Clock className="text-danger h-6 w-6" />
                  </div>
                  <h2 className="card-title fs-6 mb-0 text-gray-300">Pending Assignments</h2>
                </div>
                {loading ? (
                  <div className="placeholder-glow">
                    <span className="placeholder col-6"></span>
                  </div>
                ) : (
                  <h3 className="fs-2 fw-bold text-white">{pendingAssignments}</h3>
                )}
                <Link href="/admin/assignments" className="text-danger text-decoration-none small">
                  Review assignments
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Active Students and Calendar */}
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <div className="card bg-dark-blue border-0 shadow-sm">
              <div className="card-header bg-transparent border-bottom border-secondary d-flex justify-content-between align-items-center">
                <h2 className="fs-5 mb-0 text-white">Currently Active Students</h2>
                <Link href="/admin/students" className="btn btn-sm btn-outline-primary">
                  View All
                </Link>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-dark table-hover mb-0">
                    <thead>
                      <tr>
                        <th scope="col" className="ps-4">
                          Student
                        </th>
                        <th scope="col">Course</th>
                        <th scope="col">Last Active</th>
                        <th scope="col" className="text-end pe-4">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockStudents.map((student) => (
                        <tr key={student.id}>
                          <td className="ps-4">
                            <div className="d-flex align-items-center">
                              <img
                                src={student.avatar || "/placeholder.svg"}
                                alt={student.name}
                                className="rounded-circle me-3"
                                width="32"
                                height="32"
                              />
                              <span>{student.name}</span>
                            </div>
                          </td>
                          <td>{student.course}</td>
                          <td>{student.lastActive}</td>
                          <td className="text-end pe-4">
                            <Link
                              href={`/admin/students/${student.id}`}
                              className="btn btn-sm btn-outline-primary me-2"
                            >
                              View
                            </Link>
                            <Link href={`/admin/chat/${student.id}`} className="btn btn-sm btn-outline-success">
                              Message
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="card bg-dark-blue border-0 shadow-sm">
              <div className="card-header bg-transparent border-bottom border-secondary">
                <h2 className="fs-5 mb-0 text-white">Upcoming Events</h2>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush bg-transparent">
                  <li className="list-group-item bg-transparent border-secondary d-flex align-items-center py-3">
                    <div className="rounded-circle bg-primary/20 p-2 me-3 flex-shrink-0">
                      <Calendar className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h6 className="mb-1">New Semester Registration</h6>
                      <p className="small text-muted mb-0">Tomorrow, 9:00 AM</p>
                    </div>
                  </li>
                  <li className="list-group-item bg-transparent border-secondary d-flex align-items-center py-3">
                    <div className="rounded-circle bg-success/20 p-2 me-3 flex-shrink-0">
                      <Calendar className="text-success h-5 w-5" />
                    </div>
                    <div>
                      <h6 className="mb-1">Teacher's Meeting</h6>
                      <p className="small text-muted mb-0">Dec 10, 2:00 PM</p>
                    </div>
                  </li>
                  <li className="list-group-item bg-transparent border-secondary d-flex align-items-center py-3">
                    <div className="rounded-circle bg-warning/20 p-2 me-3 flex-shrink-0">
                      <Calendar className="text-warning h-5 w-5" />
                    </div>
                    <div>
                      <h6 className="mb-1">End of Term Exams</h6>
                      <p className="small text-muted mb-0">Dec 15 - Dec 20</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="card-footer bg-transparent border-top border-secondary text-end">
                <button className="btn btn-sm btn-outline-primary">Add Event</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
