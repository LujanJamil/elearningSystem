"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Download, Plus, MoreVertical } from "lucide-react"
import Link from "next/link"

// Mock student data
const mockStudents = [
  {
    id: 1,
    name: "Ahmed Hassan",
    email: "ahmed@student.com",
    course: "Thanawi",
    progress: 75,
    status: "Active",
    joinDate: "2023-09-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Fatima Zahra",
    email: "fatima@student.com",
    course: "Idaad",
    progress: 60,
    status: "Active",
    joinDate: "2023-08-20",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Ibrahim Malik",
    email: "ibrahim@student.com",
    course: "Quran",
    progress: 45,
    status: "Inactive",
    joinDate: "2023-07-10",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Zainab Ali",
    email: "zainab@student.com",
    course: "IPLE",
    progress: 30,
    status: "Active",
    joinDate: "2023-10-05",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Omar Khan",
    email: "omar@student.com",
    course: "Thanawi",
    progress: 90,
    status: "Active",
    joinDate: "2023-06-12",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Aisha Mahmood",
    email: "aisha@student.com",
    course: "Idaad",
    progress: 85,
    status: "Active",
    joinDate: "2023-05-18",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 7,
    name: "Yusuf Ahmed",
    email: "yusuf@student.com",
    course: "Quran",
    progress: 50,
    status: "Inactive",
    joinDate: "2023-04-22",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 8,
    name: "Khadija Omar",
    email: "khadija@student.com",
    course: "IPLE",
    progress: 65,
    status: "Active",
    joinDate: "2023-03-30",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function AdminStudents() {
  const [students, setStudents] = useState(mockStudents)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [courseFilter, setCourseFilter] = useState("All")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch students
    const fetchStudents = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Set mock data
        setStudents(mockStudents)
      } catch (error) {
        console.error("Error fetching students:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [])

  // Filter students based on search term and filters
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.course.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "All" || student.status === statusFilter
    const matchesCourse = courseFilter === "All" || student.course === courseFilter

    return matchesSearch && matchesStatus && matchesCourse
  })

  // Get unique courses for filter
  const courses = ["All", ...new Set(students.map((student) => student.course))]

  return (
    <div className="min-vh-100 pb-5 mb-5 md:pb-0 md:mb-0">
      <header className="bg-islamic-secondary p-3 sticky-top shadow-sm">
        <div className="container-fluid">
          <h1 className="fs-4 fw-semibold text-white">Student Management</h1>
          <p className="text-gray-300 mb-0">Manage all students</p>
        </div>
      </header>

      <main className="container-fluid py-4">
        <div className="card bg-dark-blue border-0 shadow-sm mb-4">
          <div className="card-body p-4">
            <div className="row g-3 align-items-center">
              <div className="col-12 col-md-4">
                <div className="input-group">
                  <span className="input-group-text bg-dark border-0">
                    <Search size={18} />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="d-flex gap-2 flex-wrap">
                  <div className="input-group">
                    <span className="input-group-text bg-dark border-0">
                      <Filter size={18} />
                    </span>
                    <select
                      className="form-select"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="All">All Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <span className="input-group-text bg-dark border-0">
                      <Filter size={18} />
                    </span>
                    <select
                      className="form-select"
                      value={courseFilter}
                      onChange={(e) => setCourseFilter(e.target.value)}
                    >
                      {courses.map((course, index) => (
                        <option key={index} value={course}>
                          {course}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-2">
                <div className="d-flex gap-2 justify-content-md-end">
                  <button className="btn btn-outline-primary">
                    <Download size={18} className="me-1" />
                    Export
                  </button>
                  <button className="btn btn-primary">
                    <Plus size={18} className="me-1" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-dark-blue border-0 shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-dark table-hover mb-0">
                <thead>
                  <tr>
                    <th scope="col" className="ps-4">
                      Student
                    </th>
                    <th scope="col">Email</th>
                    <th scope="col">Course</th>
                    <th scope="col">Progress</th>
                    <th scope="col">Status</th>
                    <th scope="col">Join Date</th>
                    <th scope="col" className="text-end pe-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <tr key={index}>
                          <td colSpan={7} className="text-center">
                            <div className="placeholder-glow">
                              <span className="placeholder col-12"></span>
                            </div>
                          </td>
                        </tr>
                      ))
                  ) : filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
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
                        <td>{student.email}</td>
                        <td>{student.course}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="progress flex-grow-1 me-2" style={{ height: "6px" }}>
                              <div
                                className="progress-bar bg-primary"
                                role="progressbar"
                                style={{ width: `${student.progress}%` }}
                                aria-valuenow={student.progress}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              ></div>
                            </div>
                            <span className="text-muted small">{student.progress}%</span>
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${student.status === "Active" ? "bg-success" : "bg-danger"}`}>
                            {student.status}
                          </span>
                        </td>
                        <td>{new Date(student.joinDate).toLocaleDateString()}</td>
                        <td className="text-end pe-4">
                          <div className="dropdown">
                            <button className="btn btn-sm btn-outline-secondary" data-bs-toggle="dropdown">
                              <MoreVertical size={16} />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end bg-dark-blue">
                              <li>
                                <Link href={`/admin/students/${student.id}`} className="dropdown-item text-white">
                                  View Details
                                </Link>
                              </li>
                              <li>
                                <Link href={`/admin/chat/${student.id}`} className="dropdown-item text-white">
                                  Send Message
                                </Link>
                              </li>
                              <li>
                                <hr className="dropdown-divider bg-secondary" />
                              </li>
                              <li>
                                <button className="dropdown-item text-danger">Deactivate</button>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center py-4">
                        <div className="d-flex flex-column align-items-center">
                          <Search size={48} className="text-muted mb-3" />
                          <h5 className="text-white">No students found</h5>
                          <p className="text-muted">Try adjusting your search or filters</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
