import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function Assignments() {
  return (
    <div className="assignment-container">
      <div className="assigment-header bg-secondary p-4">
        <nav className="container mx-auto flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <span className="text-xl font-semibold">Assignments</span>
        </nav>
      </div>
      <section className="my-5 pt-5">
        <div className="container mx-auto">
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="pdfassigments">
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="pdfassigments" className="flex-1">
                    Papers (PDF)
                  </TabsTrigger>
                  <TabsTrigger value="questionsassigments" className="flex-1">
                    Questions
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="pdfassigments">
                  <ul className="space-y-2">
                    <li className="p-3 bg-secondary/50 rounded-md hover:bg-secondary cursor-pointer">
                      <span>Introduction To swalah</span>
                    </li>
                    <li className="p-3 bg-secondary/50 rounded-md hover:bg-secondary cursor-pointer">
                      <span>Recite suraht Nasi</span>
                    </li>
                  </ul>
                </TabsContent>
                <TabsContent value="questionsassigments">
                  <ul className="space-y-2">
                    <li className="p-3 bg-secondary/50 rounded-md hover:bg-secondary cursor-pointer">
                      <span>Introduction To Quran</span>
                    </li>
                    <li className="p-3 bg-secondary/50 rounded-md hover:bg-secondary cursor-pointer">
                      <span>Complete this Quiz</span>
                    </li>
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
