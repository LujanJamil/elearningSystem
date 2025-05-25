"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Mail, Phone, Calendar, BookOpen, TrendingUp, MessageSquare } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock student data
const mockStudentDetails = {
  id: 1,
  name: "Ahmed Hassan",
  email: "ahmed@student.com",
  phone: "+256 712 345 678",
  address: "123 Main St, Kampala, Uganda",
  joinDate: "2023-09-15",
  avatar: "/placeholder.svg?height=120&width=120",
  courses: [
    { id: 1, name: "Thanawi", progress: 75, grade: "B+" },
    { id: 2, name: "Quran", progress: 60, grade: "A-" },
  ],
  attendance: 85,
  payments: [
    { id: 1, amount: "UGX 50000", date: "2023-09-01", status: "Paid" },
    { id: 2, amount: "UGX 25000", date: "2023-10-01", status: "Pending" },
  ],
  assignments: [
    { id: 1, title: "Introduction To swalah", status: "Completed", grade: "A", submittedOn: "2023-10-10" },
    { id: 2, title: "Recite suraht Nasi", status: "Pending", grade: "-", submittedOn: "-" },
  ],
  activityLog: [
    { id: 1, activity: "Logged in", timestamp: "2023-12-05 09:45 AM" },
    { id: 2, activity: "Submitted assignment", timestamp: "2023-12-04 02:30 PM" },
    { id: 3, activity: "Viewed course materials", timestamp: "2023-12-04 11:15 AM" },
    { id: 4, activity: "Messaged teacher", timestamp: "2023-12-03 03:20 PM" },
  ],
}

export default function StudentDetails({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [student, setStudent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // Simulate API call to fetch student details
    const fetchStudentDetails = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Set mock data
        setStudent(mockStudentDetails)
      } catch (error) {
        console.error("Error fetching student details:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStudentDetails()
  }, [params.id])

  const handleMessageStudent = () => {
    router.push(`/admin/chat/${params.id}`)
  }

  return (
    <div className="min-vh-100 pb-5 mb-5 md:pb-0 md:mb-0">
      <header className="bg-islamic-secondary p-3 sticky-top shadow-sm">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <Link href="/admin/students" className="me-3">
              <button className="btn btn-link text-white p-1">
                <ArrowLeft size={20} />
              </button>
            </Link>
            <h1 className="fs-4 fw-semibold text-white mb-0">Student Details</h1>
          </div>
        </div>
      </header>

      <main className="container-fluid py-4">
        {loading ? (
          <div className="card bg-dark-blue border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="row">
                <div className="col-12 col-md-4 text-center">
                  <div className="placeholder-glow">
                    <span className="placeholder rounded-circle" style={{ width: "120px", height: "120px" }}></span>
                  </div>
                </div>
                <div className="col-12 col-md-8">
                  <div className="placeholder-glow">
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8 mt-3"></span>
                    <span className="placeholder col-4 mt-3"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : student ? (
          <>
            <div className="card bg-dark-blue border-0 shadow-sm mb-4">
              <div className="card-body p-4">
                <div className="row">
                  <div className="col-12 col-md-4 text-center mb-4 mb-md-0">
                    <img
                      src={student.avatar || "/placeholder.svg"}
                      alt={student.name}
                      className="rounded-circle border-4 border-primary p-1 mb-3"
                      style={{ width: "120px", height: "120px", objectFit: "cover" }}
                    />
                    <h2 className="fs-4 fw-bold text-white">{student.name}</h2>
                    <p className="text-muted mb-3">Student ID: {student.id}</p>
                    <div className="d-flex justify-content-center gap-2">
                      <button className="btn btn-primary" onClick={handleMessageStudent}>
                        <MessageSquare size={18} className="me-1" />
                        Message
                      </button>
                      <button className="btn btn-outline-danger">Deactivate</button>
                    </div>
                  </div>
                  <div className="col-12 col-md-8">
                    <div className="row g-3">
                      <div className="col-12 col-md-6">
                        <div className="d-flex align-items-center">
                          <div className="rounded-circle bg-primary/20 p-2 me-3">
                            <Mail className="text-primary h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-muted small mb-0">Email</p>
                            <p className="mb-0">{student.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="d-flex align-items-center">
                          <div className="rounded-circle bg-success/20 p-2 me-3">
                            <Phone className="text-success h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-muted small mb-0">Phone</p>
                            <p className="mb-0">{student.phone}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="d-flex align-items-center">
                          <div className="rounded-circle bg-warning/20 p-2 me-3">
                            <Calendar className="text-warning h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-muted small mb-0">Join Date</p>
                            <p className="mb-0">{new Date(student.joinDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="d-flex align-items-center">
                          <div className="rounded-circle bg-info/20 p-2 me-3">
                            <BookOpen className="text-info h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-muted small mb-0">Courses</p>
                            <p className="mb-0">{student.courses.map((c) => c.name).join(", ")}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-flex align-items-center">
                          <div className="rounded-circle bg-danger/20 p-2 me-3">
                            <TrendingUp className="text-danger h-5 w-5" />
                          </div>
                          <div className="flex-grow-1">
                            <p className="text-muted small mb-0">Overall Progress</p>
                            <div className="d-flex align-items-center">
                              <div className="progress flex-grow-1 me-2" style={{ height: "8px" }}>
                                <div
                                  className="progress-bar bg-primary"
                                  role="progressbar"
                                  style={{
                                    width: `${Math.round(
                                      student.courses.reduce((acc, course) => acc + course.progress, 0) /
                                        student.courses.length,
                                    )}%`,
                                  }}
                                  aria-valuenow={Math.round(
                                    student.courses.reduce((acc, course) => acc + course.progress, 0) /
                                      student.courses.length,
                                  )}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                ></div>
                              </div>
                              <span className="text-muted small">
                                {Math.round(
                                  student.courses.reduce((acc, course) => acc + course.progress, 0) /
                                    student.courses.length,
                                )}
                                %
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ul className="nav nav-tabs mb-4">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "overview" ? "active" : ""}`}
                  onClick={() => setActiveTab("overview")}
                >
                  Overview
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "courses" ? "active" : ""}`}
                  onClick={() => setActiveTab("courses")}
                >
                  Courses
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "assignments" ? "active" : ""}`}
                  onClick={() => setActiveTab("assignments")}
                >
                  Assignments
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "payments" ? "active" : ""}`}
                  onClick={() => setActiveTab("payments")}
                >
                  Payments
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "activity" ? "active" : ""}`}
                  onClick={() => setActiveTab("activity")}
                >
                  Activity
                </button>
              </li>
            </ul>

            {activeTab === "overview" && (
              <div className="row g-4">
                <div className="col-12 col-lg-6">
                  <div className="card bg-dark-blue border-0 shadow-sm h-100">
                    <div className="card-header bg-transparent border-bottom border-secondary">
                      <h3 className="fs-5 mb-0">Course Progress</h3>
                    </div>
                    <div className="card-body">
                      {student.courses.map((course) => (
                        <div key={course.id} className="mb-4">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <h4 className="fs-6 mb-0">{course.name}</h4>
                            <span className="badge bg-primary">{course.grade}</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <div className="progress flex-grow-1 me-2" style={{ height: "8px" }}>
                              <div
                                className="progress-bar bg-primary"
                                role="progressbar"
                                style={{ width: `${course.progress}%` }}
                                aria-valuenow={course.progress}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              ></div>
                            </div>
                            <span className="text-muted small">{course.progress}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="col-12 col-lg-6">
                  <div className="card bg-dark-blue border-0 shadow-sm h-100">
                    <div className="card-header bg-transparent border-bottom border-secondary">
                      <h3 className="fs-5 mb-0">Recent Activity</h3>
                    </div>
                    <div className="card-body p-0">
                      <ul className="list-group list-group-flush bg-transparent">
                        {student.activityLog.slice(0, 4).map((activity) => (
                          <li
                            key={activity.id}
                            className="list-group-item bg-transparent border-secondary d-flex justify-content-between align-items-center py-3 px-4"
                          >
                            <span>{activity.activity}</span>
                            <span className="text-muted small">{activity.timestamp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="card-footer bg-transparent border-top border-secondary text-end">
                      <button className="btn btn-sm btn-outline-primary" onClick={() => setActiveTab("activity")}>
                        View All Activity
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "courses" && (
              <div className="card bg-dark-blue border-0 shadow-sm">
                <div className="card-header bg-transparent border-bottom border-secondary">
                  <h3 className="fs-5 mb-0">Enrolled Courses</h3>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-dark table-hover mb-0">
                      <thead>
                        <tr>
                          <th scope="col" className="ps-4">
                            Course
                          </th>
                          <th scope="col">Progress</th>
                          <th scope="col">Grade</th>
                          <th scope="col" className="text-end pe-4">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {student.courses.map((course) => (
                          <tr key={course.id}>
                            <td className="ps-4">{course.name}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="progress flex-grow-1 me-2" style={{ height: "6px" }}>
                                  <div
                                    className="progress-bar bg-primary"
                                    role="progressbar"
                                    style={{ width: `${course.progress}%` }}
                                    aria-valuenow={course.progress}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  ></div>
                                </div>
                                <span className="text-muted small">{course.progress}%</span>
                              </div>
                            </td>
                            <td>
                              <span className="badge bg-primary">{course.grade}</span>
                            </td>
                            <td className="text-end pe-4">
                              <button className="btn btn-sm btn-outline-primary me-2">View Details</button>
                              <button className="btn btn-sm btn-outline-danger">Unenroll</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card-footer bg-transparent border-top border-secondary text-end">
                  <button className="btn btn-sm btn-primary">Add Course</button>
                </div>
              </div>
            )}

            {activeTab === "assignments" && (
              <div className="card bg-dark-blue border-0 shadow-sm">
                <div className="card-header bg-transparent border-bottom border-secondary">
                  <h3 className="fs-5 mb-0">Assignments</h3>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-dark table-hover mb-0">
                      <thead>
                        <tr>
                          <th scope="col" className="ps-4">
                            Title
                          </th>
                          <th scope="col">Status</th>
                          <th scope="col">Grade</th>
                          <th scope="col">Submitted On</th>
                          <th scope="col" className="text-end pe-4">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {student.assignments.map((assignment) => (
                          <tr key={assignment.id}>
                            <td className="ps-4">{assignment.title}</td>
                            <td>
                              <span
                                className={`badge ${assignment.status === "Completed" ? "bg-success" : "bg-warning"}`}
                              >
                                {assignment.status}
                              </span>
                            </td>
                            <td>{assignment.grade}</td>
                            <td>{assignment.submittedOn}</td>
                            <td className="text-end pe-4">
                              <button className="btn btn-sm btn-outline-primary">View Submission</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card-footer bg-transparent border-top border-secondary text-end">
                  <button className="btn btn-sm btn-primary">Assign New</button>
                </div>
              </div>
            )}

            {activeTab === "payments" && (
              <div className="card bg-dark-blue border-0 shadow-sm">
                <div className="card-header bg-transparent border-bottom border-secondary">
                  <h3 className="fs-5 mb-0">Payment History</h3>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-dark table-hover mb-0">
                      <thead>
                        <tr>
                          <th scope="col" className="ps-4">
                            Amount
                          </th>
                          <th scope="col">Date</th>
                          <th scope="col">Status</th>
                          <th scope="col" className="text-end pe-4">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {student.payments.map((payment) => (
                          <tr key={payment.id}>
                            <td className="ps-4">{payment.amount}</td>
                            <td>{payment.date}</td>
                            <td>
                              <span className={`badge ${payment.status === "Paid" ? "bg-success" : "bg-warning"}`}>
                                {payment.status}
                              </span>
                            </td>
                            <td className="text-end pe-4">
                              <button className="btn btn-sm btn-outline-primary me-2">View Receipt</button>
                              {payment.status === "Pending" && (
                                <button className="btn btn-sm btn-success">Mark as Paid</button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card-footer bg-transparent border-top border-secondary text-end">
                  <button className="btn btn-sm btn-primary">Record Payment</button>
                </div>
              </div>
            )}

            {activeTab === "activity" && (
              <div className="card bg-dark-blue border-0 shadow-sm">
                <div className="card-header bg-transparent border-bottom border-secondary">
                  <h3 className="fs-5 mb-0">Activity Log</h3>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-dark table-hover mb-0">
                      <thead>
                        <tr>
                          <th scope="col" className="ps-4">
                            Activity
                          </th>
                          <th scope="col" className="text-end pe-4">
                            Timestamp
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {student.activityLog.map((activity) => (
                          <tr key={activity.id}>
                            <td className="ps-4">{activity.activity}</td>
                            <td className="text-end pe-4">{activity.timestamp}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="alert alert-danger">Student not found</div>
        )}
      </main>
    </div>
  )
}
