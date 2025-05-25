"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, TimerIcon as Stopwatch, PencilRuler } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { useApp } from "@/contexts/app-context"

export default function UserProgress() {
  const { user } = useApp()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000)
  }, [])

  if (!user) {
    return (
      <div className="min-h-screen bg-background d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  // Calculate course details dynamically
  const courseDetails = user.courses.map((courseName) => {
    const progress = user.progress[courseName] || 0
    const assignments = user.assignments.filter((a) => a.course === courseName)
    const completedAssignments = assignments.filter((a) => a.status === "submitted" || a.status === "graded").length

    // Calculate estimated time left based on progress
    const totalMonths = 24 // Base duration
    const remainingProgress = 100 - progress
    const timeLeft = Math.ceil((remainingProgress / 100) * totalMonths)

    // Calculate lessons based on progress (assuming 20 lessons per course)
    const totalLessons = 20
    const lessonsCompleted = Math.floor((progress / 100) * totalLessons)

    return {
      id: courseName,
      name: courseName,
      class: "Senior Five",
      progress,
      lessonsCompleted,
      totalLessons,
      assignmentsAttempted: completedAssignments,
      totalAssignments: assignments.length,
      timeLeft: `${timeLeft} months`,
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-secondary p-4 fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="text-xl font-semibold">My Progress</div>
          <div></div>
        </div>
      </header>

      <div className="container mx-auto py-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((index) => (
              <Card key={index} className="overflow-hidden bg-dark-blue border-0 shadow-sm">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row animate-pulse">
                    <div className="p-6 md:w-1/3 flex items-center justify-center bg-primary/20">
                      <div className="h-8 w-24 bg-gray-700 rounded"></div>
                    </div>
                    <div className="p-6 w-full">
                      <div className="h-6 w-32 bg-gray-700 rounded mb-4"></div>
                      <div className="space-y-3 mb-4">
                        <div className="h-4 w-full bg-gray-700 rounded"></div>
                        <div className="h-4 w-full bg-gray-700 rounded"></div>
                        <div className="h-4 w-full bg-gray-700 rounded"></div>
                      </div>
                      <div className="h-2 w-full bg-gray-700 rounded mt-4"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {/* Overall Progress Summary */}
            <div className="mb-6">
              <Card className="bg-dark-blue border-0 shadow-sm">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">Overall Progress Summary</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">
                        {Math.round(
                          Object.values(user.progress).reduce((a, b) => a + b, 0) / Object.values(user.progress).length,
                        )}
                        %
                      </div>
                      <div className="text-sm text-gray-400">Average Progress</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-success">
                        {user.assignments.filter((a) => a.status === "submitted" || a.status === "graded").length}
                      </div>
                      <div className="text-sm text-gray-400">Completed Assignments</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-warning">{user.courses.length}</div>
                      <div className="text-sm text-gray-400">Active Courses</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Individual Course Progress */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courseDetails.map((course) => (
                <Card key={course.id} className="overflow-hidden bg-dark-blue border-0 shadow-sm">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="progress-text-img p-6 md:w-1/3 flex items-center justify-center">
                        <span className="text-xl font-bold">{course.name}</span>
                      </div>
                      <div className="p-6 w-full">
                        <div className="mb-4">
                          <span className="text-lg font-semibold">{course.class}</span>
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-primary" />
                            <span className="text-sm">
                              {course.lessonsCompleted} / {course.totalLessons} lessons
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <PencilRuler className="h-4 w-4 text-green-500" />
                            <span className="text-sm">
                              {course.assignmentsAttempted} / {course.totalAssignments} Assignments Attempted
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Stopwatch className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">{course.timeLeft} left</span>
                          </div>
                        </div>
                        <div className="progress-indicator">
                          <Progress value={course.progress} className="h-2" />
                          <div className="flex justify-between text-sm mt-1">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-white font-medium">{course.progress}%</span>
                          </div>
                        </div>

                        {/* Progress trend indicator */}
                        <div className="mt-3 text-xs text-gray-400">
                          {course.progress >= 75 ? (
                            <span className="text-green-400">🎯 Excellent progress!</span>
                          ) : course.progress >= 50 ? (
                            <span className="text-yellow-400">📈 Good progress</span>
                          ) : course.progress >= 25 ? (
                            <span className="text-orange-400">⚡ Keep going!</span>
                          ) : (
                            <span className="text-red-400">🚀 Just getting started</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="mt-8">
              <Card className="bg-dark-blue border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {user.assignments.slice(0, 5).map((assignment) => (
                      <div key={assignment.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <div>
                          <div className="font-medium text-white">{assignment.title}</div>
                          <div className="text-sm text-gray-400">{assignment.course}</div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-sm font-medium ${
                              assignment.status === "graded"
                                ? "text-green-400"
                                : assignment.status === "submitted"
                                  ? "text-blue-400"
                                  : "text-yellow-400"
                            }`}
                          >
                            {assignment.status === "graded"
                              ? `Grade: ${assignment.grade}`
                              : assignment.status === "submitted"
                                ? "Submitted"
                                : "Pending"}
                          </div>
                          <div className="text-xs text-gray-500">
                            Due: {new Date(assignment.dueDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
