import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, DollarSign, User } from "lucide-react"

export default function Courses() {
  return (
    <div className="course-container min-h-screen pb-[30%]">
      <div className="heading fixed top-0 left-0 right-0 bg-transparent text-center z-12 text-white">
        <span className="inline-block py-2.5 px-6 bg-[rgb(0,50,112)] rounded-[10px] text-lg shadow-md">My Courses</span>
      </div>
      <div className="course-section container mx-auto py-6">
        <Tabs defaultValue="enrolled" className="w-full">
          <TabsList className="w-full mb-6 fixed top-0 left-0 right-0 z-10 bg-[rgb(1,23,50)] shadow-md flex justify-between list-none py-5 px-2.5 overflow-x-auto pt-[60px]">
            <TabsTrigger
              value="enrolled"
              className="flex-1 text-[rgb(35,190,188)] rounded-md border border-[rgb(1,23,50)] bg-transparent p-1 text-warning"
            >
              Enrolled
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="flex-1 text-[rgb(35,190,188)] rounded-md border border-[rgb(1,23,50)] bg-transparent p-1 text-info"
            >
              Completed
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="flex-1 text-[rgb(35,190,188)] rounded-md border border-[rgb(1,23,50)] bg-transparent p-1 text-success"
            >
              Report Cards
            </TabsTrigger>
          </TabsList>

          <div className="tab-wrapper min-h-screen pt-[10%]">
            <TabsContent value="enrolled">
              <div className="tab-container flex flex-wrap items-center justify-center">
                {[1, 2].map((item) => (
                  <div key={item} className="card-course-content">
                    <div className="card-course-text-img">
                      <span className="text-xl font-bold">Thanawi</span>
                    </div>
                    <div className="p-6 w-full">
                      <div className="course-details">
                        <span className="class-course-name text-xl font-semibold block mb-2">Senior Five</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                          <div className="flex items-center gap-2">
                            <DollarSign className="text-red-500 h-5 w-5" />
                            <span>
                              Half Paid <span className="money-paid">(UGX 25000)</span>
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BookOpen className="text-primary h-5 w-5" />
                            <span>4 subjects</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="text-blue-400 h-5 w-5" />
                            <span>
                              2 - 3 yrs <small className="text-muted-foreground">Completion</small>
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="text-foreground h-5 w-5" />
                            <span className="teacher-names truncate">By Lucjan Jamil, Lucjan Jamil</span>
                          </div>
                        </div>
                        <Button className="card-course-continue-btn w-[90%] my-2.5">
                          {item === 1 ? "Start now" : "Tap to continue"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed">
              <div className="tab-container flex flex-wrap items-center justify-center">
                <div className="card-course-content">
                  <div className="card-course-text-img">
                    <span className="text-xl font-bold">Thanawi</span>
                  </div>
                  <div className="p-6 w-full">
                    <div className="course-details">
                      <span className="class-course-name text-xl font-semibold block mb-2">Senior Five</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="text-red-500 h-5 w-5" />
                          <span>
                            Fully Paid <span className="money-paid">(UGX 50000)</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="text-primary h-5 w-5" />
                          <span>4 subjects</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="text-blue-400 h-5 w-5" />
                          <span>
                            2 - 3 yrs <small className="text-muted-foreground">Completion</small>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="text-foreground h-5 w-5" />
                          <span className="teacher-names truncate">By Lucjan Jamil, Lucjan Jamil</span>
                        </div>
                      </div>
                      <Button
                        variant="success"
                        className="card-course-continue-btn w-[90%] my-2.5 bg-green-600 hover:bg-green-700"
                      >
                        Course Completed
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reports">
              <div className="tab-container flex flex-wrap items-center justify-center">
                <div className="card-course-content">
                  <div className="card-course-text-img">
                    <span className="text-xl font-bold">Thanawi</span>
                  </div>
                  <div className="p-6 w-full">
                    <div className="course-details">
                      <span className="class-course-name text-xl font-semibold block mb-2">Senior Five</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="text-red-500 h-5 w-5" />
                          <span>
                            Fully Paid <span className="money-paid">(UGX 50000)</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="text-primary h-5 w-5" />
                          <span>4 subjects</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="text-blue-400 h-5 w-5" />
                          <span>
                            2 - 3 yrs <small className="text-muted-foreground">Completion</small>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="text-foreground h-5 w-5" />
                          <span className="teacher-names truncate">By Lucjan Jamil, Lucjan Jamil</span>
                        </div>
                      </div>
                      <Button className="card-course-continue-btn w-[90%] my-2.5 bg-purple-800 hover:bg-purple-900">
                        Contact us For certificate
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
