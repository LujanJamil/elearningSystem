import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

export default function Certificates() {
  const certificates = [
    { title: "Thanawi", image: "/placeholder.svg?height=180&width=180" },
    { title: "Thanawi", image: "/placeholder.svg?height=180&width=180" },
    { title: "Idaad", image: "/placeholder.svg?height=180&width=180" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-secondary p-4 fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="text-xl font-semibold">My Report Cards</div>
          <div></div>
        </div>
      </header>

      <div className="container mx-auto py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="bg-green-800 text-white p-2 text-center font-semibold">{cert.title}</div>
              <CardContent className="p-0">
                <Image
                  src={cert.image || "/placeholder.svg"}
                  alt={cert.title}
                  width={180}
                  height={180}
                  className="w-full h-auto"
                />
              </CardContent>
              <CardFooter className="p-0">
                <Button className="w-full rounded-none bg-blue-800 hover:bg-blue-900">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report Card
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
