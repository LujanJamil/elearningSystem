"use client"
import {
  BookOpen,
  Calendar,
  TrendingUp,
  UserCog,
  Download,
  CreditCard,
  HelpCircle,
  Headphones,
  LogOut,
} from "lucide-react"
import type React from "react"

import { useRouter } from "next/navigation"
import { useApp } from "@/contexts/app-context"
import { useState } from "react"

export default function Account() {
  const router = useRouter()
  const { user, updateUser, changePassword, submitContactMessage } = useApp()

  // Form states
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: "",
  })
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  })

  // Loading states
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [contactLoading, setContactLoading] = useState(false)
  const [profileLoading, setProfileLoading] = useState(false)

  // Success/error states
  const [passwordMessage, setPasswordMessage] = useState("")
  const [contactMessage, setContactMessage] = useState("")
  const [profileMessage, setProfileMessage] = useState("")

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

  const handleLogout = () => {
    router.push("/")
  }

  const navigateTo = (path: string) => {
    router.push(path)
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordLoading(true)
    setPasswordMessage("")

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage("New passwords do not match")
      setPasswordLoading(false)
      return
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordMessage("Password must be at least 6 characters long")
      setPasswordLoading(false)
      return
    }

    try {
      const success = await changePassword(passwordForm.currentPassword, passwordForm.newPassword)
      if (success) {
        setPasswordMessage("Password changed successfully!")
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
      } else {
        setPasswordMessage("Current password is incorrect or new password is too weak")
      }
    } catch (error) {
      setPasswordMessage("An error occurred while changing password")
    } finally {
      setPasswordLoading(false)
    }
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setContactLoading(true)
    setContactMessage("")

    try {
      await submitContactMessage({
        name: user.name,
        email: user.email,
        subject: contactForm.subject,
        message: contactForm.message,
      })
      setContactMessage("Message sent successfully! We will get back to you within 24 hours.")
      setContactForm({ subject: "", message: "" })
    } catch (error) {
      setContactMessage("Failed to send message. Please try again.")
    } finally {
      setContactLoading(false)
    }
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setProfileLoading(true)
    setProfileMessage("")

    try {
      updateUser({
        name: profileForm.name,
        email: profileForm.email,
        phone: profileForm.phone,
      })
      setProfileMessage("Profile updated successfully!")
    } catch (error) {
      setProfileMessage("Failed to update profile. Please try again.")
    } finally {
      setProfileLoading(false)
    }
  }

  const averageProgress = Math.round(
    Object.values(user.progress).reduce((a, b) => a + b, 0) / Object.values(user.progress).length,
  )

  return (
    <div className="account-container min-vh-100 pb-5 mb-5">
      <header className="bg-islamic-secondary p-3 sticky-top shadow-sm">
        <div className="container-fluid">
          <h1 className="fs-4 fw-semibold text-white text-center m-0">Account Settings</h1>
        </div>
      </header>

      <div className="container-fluid py-4">
        {/* User Profile Card */}
        <div className="card bg-dark-blue rounded-3 mb-4 border-0 shadow-sm fade-in">
          <div className="card-body p-0">
            <div className="d-flex justify-content-between align-items-center p-3">
              <div className="d-flex align-items-center">
                <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="user-img me-3" />
                <div className="d-flex flex-column">
                  <span className="fs-5 text-white">{user.name}</span>
                  <span className="small text-bisque">{user.courses.join(", ")}</span>
                  <span className="small text-gray-400">Progress: {averageProgress}%</span>
                </div>
              </div>
              <button
                className="edit-btn"
                data-bs-toggle="modal"
                data-bs-target="#editProfileModal"
                aria-label="Edit Profile"
              >
                <UserCog size={22} />
              </button>
            </div>
            <button
              className="btn btn-link text-white w-100 text-start d-flex justify-content-between py-2 px-3 mt-2 border-top border-secondary rounded-0"
              data-bs-toggle="modal"
              data-bs-target="#accountSettingsModal"
            >
              Manage Account <UserCog className="ms-2" size={16} />
            </button>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="card bg-dark-blue rounded-3 mb-4 border-0 shadow-sm fade-in">
          <div className="card-body">
            <div className="row g-3 text-center">
              <div className="col-4">
                <button
                  className="btn btn-link text-white d-flex flex-column align-items-center w-100 h-100"
                  onClick={() => navigateTo("/dashboard/certificates")}
                >
                  <Download className="icon-yellow mb-2" size={28} />
                  <span className="small">Report Cards</span>
                </button>
              </div>
              <div className="col-4">
                <button
                  className="btn btn-link text-white d-flex flex-column align-items-center w-100 h-100"
                  onClick={() => navigateTo("/dashboard/progress")}
                >
                  <TrendingUp className="text-primary mb-2" size={28} />
                  <span className="small">Progress</span>
                </button>
              </div>
              <div className="col-4">
                <button
                  className="btn btn-link text-white d-flex flex-column align-items-center w-100 h-100"
                  data-bs-toggle="modal"
                  data-bs-target="#logoutModal"
                >
                  <LogOut className="text-danger mb-2" size={28} />
                  <span className="small">Log out</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Course Management Card */}
        <div className="card bg-dark-blue rounded-3 mb-4 border-0 shadow-sm fade-in">
          <div className="card-header bg-transparent border-bottom border-secondary">
            <h5 className="m-0 text-white">Course Management</h5>
          </div>
          <div className="card-body p-0">
            <ul className="list-group list-group-flush bg-transparent">
              <li
                className="list-group-item bg-transparent border-secondary d-flex align-items-center py-3"
                onClick={() => navigateTo("/dashboard/courses")}
                style={{ cursor: "pointer" }}
              >
                <BookOpen size={20} className="text-info" />
                <span className="w-100 ms-3 d-flex align-items-center justify-content-between text-white">
                  <span>Enrolled Courses ({user.courses.length})</span>
                  <span>›</span>
                </span>
              </li>
              <li
                className="list-group-item bg-transparent border-secondary d-flex align-items-center py-3"
                onClick={() => navigateTo("/dashboard/timetable")}
                style={{ cursor: "pointer" }}
              >
                <Calendar size={20} className="text-warning" />
                <span className="w-100 ms-3 d-flex align-items-center justify-content-between text-white">
                  <span>Course Timetable</span>
                  <span>›</span>
                </span>
              </li>
              <li
                className="list-group-item bg-transparent border-secondary d-flex align-items-center py-3"
                onClick={() => navigateTo("/dashboard/progress")}
                style={{ cursor: "pointer" }}
              >
                <TrendingUp size={20} className="text-success" />
                <span className="w-100 ms-3 d-flex align-items-center justify-content-between text-white">
                  <span>Course Progress ({averageProgress}%)</span>
                  <span>›</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Account Settings Card */}
        <div className="card bg-dark-blue rounded-3 mb-4 border-0 shadow-sm fade-in">
          <div className="card-header bg-transparent border-bottom border-secondary">
            <h5 className="m-0 text-white">Account Settings</h5>
          </div>
          <div className="card-body p-0">
            <ul className="list-group list-group-flush bg-transparent">
              <li
                className="list-group-item bg-transparent border-secondary d-flex align-items-center py-3"
                data-bs-toggle="modal"
                data-bs-target="#accountSettingsModal"
                style={{ cursor: "pointer" }}
              >
                <UserCog size={20} className="text-primary" />
                <span className="w-100 ms-3 d-flex align-items-center justify-content-between text-white">
                  <span>Settings</span>
                  <span>›</span>
                </span>
              </li>
              <li
                className="list-group-item bg-transparent border-secondary d-flex align-items-center py-3"
                onClick={() => navigateTo("/dashboard/certificates")}
                style={{ cursor: "pointer" }}
              >
                <Download size={20} className="text-warning" />
                <span className="w-100 ms-3 d-flex align-items-center justify-content-between text-white">
                  <span>Report Card Download</span>
                  <span>›</span>
                </span>
              </li>
              <li
                className="list-group-item bg-transparent border-secondary d-flex align-items-center py-3"
                onClick={() => navigateTo("/dashboard/payment-history")}
                style={{ cursor: "pointer" }}
              >
                <CreditCard size={20} className="text-info" />
                <span className="w-100 ms-3 d-flex align-items-center justify-content-between text-white">
                  <span>Payment History</span>
                  <span>›</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Support Card */}
        <div className="card bg-dark-blue rounded-3 mb-4 border-0 shadow-sm fade-in">
          <div className="card-header bg-transparent border-bottom border-secondary">
            <h5 className="m-0 text-white">Support</h5>
          </div>
          <div className="card-body p-0">
            <ul className="list-group list-group-flush bg-transparent">
              <li
                className="list-group-item bg-transparent border-secondary d-flex align-items-center py-3"
                data-bs-toggle="modal"
                data-bs-target="#helpCenterModal"
                style={{ cursor: "pointer" }}
              >
                <HelpCircle size={20} className="text-warning" />
                <span className="w-100 ms-3 d-flex align-items-center justify-content-between text-white">
                  <span>Help Center</span>
                  <span>›</span>
                </span>
              </li>
              <li
                className="list-group-item bg-transparent border-secondary d-flex align-items-center py-3"
                data-bs-toggle="modal"
                data-bs-target="#contactUsModal"
                style={{ cursor: "pointer" }}
              >
                <Headphones size={20} className="text-success" />
                <span className="w-100 ms-3 d-flex align-items-center justify-content-between text-white">
                  <span>Contact Us</span>
                  <span>›</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      <div className="modal fade" id="logoutModal" tabIndex={-1} aria-labelledby="logoutModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-dark-blue text-white">
            <div className="modal-header border-0">
              <h5 className="modal-title fs-4 w-100 text-center" id="logoutModalLabel">
                Are you sure you want to log out?
              </h5>
            </div>
            <div className="modal-footer border-0 justify-content-center">
              <button type="button" className="btn btn-outline-light" data-bs-dismiss="modal">
                Cancel
              </button>
              <button type="button" className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <div
        className="modal fade"
        id="editProfileModal"
        tabIndex={-1}
        aria-labelledby="editProfileModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-dark-blue text-white">
            <div className="modal-header border-bottom border-secondary">
              <h5 className="modal-title" id="editProfileModalLabel">
                Edit Profile
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleProfileUpdate}>
              <div className="modal-body">
                {profileMessage && (
                  <div className={`alert ${profileMessage.includes("success") ? "alert-success" : "alert-danger"}`}>
                    {profileMessage}
                  </div>
                )}
                <div className="text-center mb-4">
                  <img
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                    className="rounded-circle border border-primary p-1"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                  <button type="button" className="btn btn-sm btn-outline-light mt-2">
                    Change Photo
                  </button>
                </div>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white"
                    id="fullName"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control bg-dark text-white"
                    id="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control bg-dark text-white"
                    id="phone"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer border-top border-secondary">
                <button type="button" className="btn btn-outline-light" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={profileLoading}>
                  {profileLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Account Settings Modal */}
      <div
        className="modal fade"
        id="accountSettingsModal"
        tabIndex={-1}
        aria-labelledby="accountSettingsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-dark-blue text-white">
            <div className="modal-header border-bottom border-secondary">
              <h5 className="modal-title" id="accountSettingsModalLabel">
                Account Settings
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handlePasswordChange}>
              <div className="modal-body">
                {passwordMessage && (
                  <div className={`alert ${passwordMessage.includes("success") ? "alert-success" : "alert-danger"}`}>
                    {passwordMessage}
                  </div>
                )}
                <div className="mb-3">
                  <label htmlFor="currentPassword" className="form-label">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="form-control bg-dark text-white"
                    id="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control bg-dark text-white"
                    id="newPassword"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    required
                    minLength={6}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="form-control bg-dark text-white"
                    id="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    required
                    minLength={6}
                  />
                </div>
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="enableNotifications" defaultChecked />
                  <label className="form-check-label" htmlFor="enableNotifications">
                    Enable Notifications
                  </label>
                </div>
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="darkMode" defaultChecked />
                  <label className="form-check-label" htmlFor="darkMode">
                    Dark Mode
                  </label>
                </div>
              </div>
              <div className="modal-footer border-top border-secondary">
                <button type="button" className="btn btn-outline-light" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={passwordLoading}>
                  {passwordLoading ? "Changing..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Help Center Modal */}
      <div
        className="modal fade"
        id="helpCenterModal"
        tabIndex={-1}
        aria-labelledby="helpCenterModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content bg-dark-blue text-white">
            <div className="modal-header border-bottom border-secondary">
              <h5 className="modal-title" id="helpCenterModalLabel">
                Help Center
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="accordion" id="helpAccordion">
                <div className="accordion-item bg-dark text-white border-secondary">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button bg-dark text-white"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      How to contact my teacher?
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#helpAccordion"
                  >
                    <div className="accordion-body">
                      You can contact your teacher through the chat feature. Go to the Teachers section, select your
                      teacher, and start a conversation. You can send text messages, images, documents, and even audio
                      recordings.
                    </div>
                  </div>
                </div>
                <div className="accordion-item bg-dark text-white border-secondary">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed bg-dark text-white"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      How to submit assignments?
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#helpAccordion"
                  >
                    <div className="accordion-body">
                      Navigate to the Assignments section, select the assignment you want to submit, and upload your
                      work using the submission form. You can upload documents, images, or videos as attachments.
                    </div>
                  </div>
                </div>
                <div className="accordion-item bg-dark text-white border-secondary">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button collapsed bg-dark text-white"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      How to track my progress?
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#helpAccordion"
                  >
                    <div className="accordion-body">
                      Your progress is automatically tracked as you complete lessons and assignments. Visit the Progress
                      section to see detailed analytics for each course. Progress updates in real-time as you engage
                      with course materials.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer border-top border-secondary">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Us Modal */}
      <div
        className="modal fade"
        id="contactUsModal"
        tabIndex={-1}
        aria-labelledby="contactUsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-dark-blue text-white">
            <div className="modal-header border-bottom border-secondary">
              <h5 className="modal-title" id="contactUsModalLabel">
                Contact Us
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleContactSubmit}>
              <div className="modal-body">
                {contactMessage && (
                  <div className={`alert ${contactMessage.includes("success") ? "alert-success" : "alert-danger"}`}>
                    {contactMessage}
                  </div>
                )}
                <div className="mb-3">
                  <label htmlFor="contactSubject" className="form-label">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="form-control bg-dark text-white"
                    id="contactSubject"
                    placeholder="Enter subject"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contactMessage" className="form-label">
                    Message
                  </label>
                  <textarea
                    className="form-control bg-dark text-white"
                    id="contactMessage"
                    rows={5}
                    placeholder="Enter your message"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    required
                  ></textarea>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-success" disabled={contactLoading}>
                    {contactLoading ? "Sending..." : "Send Message"}
                  </button>
                </div>
                <hr className="my-4 border-secondary" />
                <div className="text-center">
                  <h6>Other Contact Methods</h6>
                  <p className="mb-1">
                    <strong>Email:</strong> support@samaislamiccollege.com
                  </p>
                  <p className="mb-1">
                    <strong>Phone:</strong> +256-750-123-456
                  </p>
                  <p className="mb-1">
                    <strong>WhatsApp:</strong> +256-750-123-456
                  </p>
                </div>
              </div>
              <div className="modal-footer border-top border-secondary">
                <button type="button" className="btn btn-outline-light" data-bs-dismiss="modal">
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
