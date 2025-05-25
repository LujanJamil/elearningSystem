"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useApp } from "@/contexts/app-context"
import {
  BookOpen,
  Calendar,
  Clock,
  GraduationCap,
  MessageSquare,
  TrendingUp,
  Users,
  CheckCircle,
  AlertCircle,
  DollarSign,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { user, teachers, updateProgress } = useApp()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Simulate automatic progress updates
    const progressTimer = setInterval(() => {
      if (user) {
        const courses = Object.keys(user.progress)
        const randomCourse = courses[Math.floor(Math.random() * courses.length)]
        const currentProgress = user.progress[randomCourse]

        if (currentProgress < 100) {
          const increase = Math.floor(Math.random() * 2) + 1
          updateProgress(randomCourse, Math.min(currentProgress + increase, 100))
        }
      }
    }, 10000) // Update every 10 seconds for demo

    return () => clearInterval(progressTimer)
  }, [user, updateProgress])

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  const onlineTeachers = teachers.filter((t) => t.status === "online").length
  const pendingAssignments = user.assignments.filter((a) => a.status === "pending").length
  const averageProgress = Math.round(
    Object.values(user.progress).reduce((sum, progress) => sum + progress, 0) / Object.values(user.progress).length,
  )

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground">
            {currentTime.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            • {currentTime.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {onlineTeachers} Teachers Online
          </Badge>
          <Badge variant={pendingAssignments > 0 ? "destructive" : "default"} className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {pendingAssignments} Pending Tasks
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageProgress}%</div>
            <Progress value={averageProgress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.courses.length}</div>
            <p className="text-xs text-muted-foreground">{user.courses.join(", ")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.assignments.length}</div>
            <p className="text-xs text-muted-foreground">{pendingAssignments} pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Status</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.payments.filter((p) => p.status === "paid").length}</div>
            <p className="text-xs text-muted-foreground">
              {user.payments.filter((p) => p.status === "pending").length} pending
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Course Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Course Progress
          </CardTitle>
          <CardDescription>Your learning journey across all courses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(user.progress).map(([course, progress]) => (
            <div key={course} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{course}</span>
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Recent Assignments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {user.assignments.slice(0, 3).map((assignment) => (
              <div key={assignment.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{assignment.title}</p>
                  <p className="text-sm text-muted-foreground">{assignment.course}</p>
                </div>
                <Badge variant={assignment.status === "pending" ? "destructive" : "default"}>{assignment.status}</Badge>
              </div>
            ))}
            <Link href="/dashboard/assignments">
              <Button variant="outline" className="w-full">
                View All Assignments
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Access your most used features</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Link href="/dashboard/teachers">
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                <MessageSquare className="h-5 w-5" />
                Chat with Teachers
              </Button>
            </Link>
            <Link href="/dashboard/courses">
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                <BookOpen className="h-5 w-5" />
                View Courses
              </Button>
            </Link>
            <Link href="/dashboard/timetable">
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                <Clock className="h-5 w-5" />
                Class Schedule
              </Button>
            </Link>
            <Link href="/dashboard/progress">
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                <TrendingUp className="h-5 w-5" />
                Progress Report
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Online Teachers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Teachers Available Now
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teachers
              .filter((teacher) => teacher.status === "online")
              .map((teacher) => (
                <div key={teacher.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="relative">
                    <img
                      src={teacher.avatar || "/placeholder.svg"}
                      alt={teacher.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{teacher.name}</p>
                    <p className="text-sm text-muted-foreground">{teacher.courses.join(", ")}</p>
                  </div>
                  <Link href={`/dashboard/chat/${teacher.id}`}>
                    <Button size="sm" variant="outline">
                      Chat
                    </Button>
                  </Link>
                </div>
              ))}
          </div>
          {onlineTeachers === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No teachers are currently online. Check back later!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
