import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function Timetable() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const timeSlots = ["8:00 AM - 9:30 AM", "10:00 AM - 11:30 AM", "12:00 PM - 1:30 PM", "2:00 PM - 3:30 PM"]

  const schedule = [
    { day: "Monday", time: "8:00 AM - 9:30 AM", subject: "Thanawi", teacher: "Lucjan Jamil" },
    { day: "Monday", time: "10:00 AM - 11:30 AM", subject: "Quran", teacher: "Lucjan Jamil" },
    { day: "Tuesday", time: "8:00 AM - 9:30 AM", subject: "IPLE", teacher: "Lucjan Jamil" },
    { day: "Wednesday", time: "12:00 PM - 1:30 PM", subject: "Idaad", teacher: "Lucjan Jamil" },
    { day: "Thursday", time: "2:00 PM - 3:30 PM", subject: "Thanawi", teacher: "Lucjan Jamil" },
    { day: "Friday", time: "10:00 AM - 11:30 AM", subject: "Quran", teacher: "Lucjan Jamil" },
  ]

  const getClassForTimeSlot = (day: string, time: string) => {
    const classSession = schedule.find((s) => s.day === day && s.time === time)
    return classSession ? (
      <div className="p-2 bg-primary/20 rounded text-sm">
        <div className="font-semibold">{classSession.subject}</div>
        <div className="text-xs text-muted-foreground">{classSession.teacher}</div>
      </div>
    ) : null
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-secondary p-4">
        <div className="container mx-auto flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <span className="text-xl font-semibold">My Timetable</span>
        </div>
      </header>

      <div className="container mx-auto py-6">
        <Card>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-2 border text-left">Time / Day</th>
                    {days.map((day) => (
                      <th key={day} className="p-2 border text-left">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((time) => (
                    <tr key={time}>
                      <td className="p-2 border font-medium">{time}</td>
                      {days.map((day) => (
                        <td key={`${day}-${time}`} className="p-2 border">
                          {getClassForTimeSlot(day, time)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
