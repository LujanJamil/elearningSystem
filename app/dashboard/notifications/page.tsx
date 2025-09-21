import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Copy, Trash, Share, Clock } from "lucide-react"
import Image from "next/image"

export default function Notifications() {
  return (
    <div className="notification-container my-5 py-5">
      <div className="heading bg-secondary p-4">
        <div className="container mx-auto">
          <span className="text-xl font-semibold">Notifications</span>
        </div>
      </div>

      <div className="notification-section container mx-auto py-6">
        <Tabs defaultValue="announcements" className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="announcements" className="flex-1 text-warning">
              Announcements
            </TabsTrigger>
            <TabsTrigger value="remainders" className="flex-1 text-info">
              Remainders
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex-1 text-success">
              Payments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="announcements" className="space-y-4">
            {[1, 2].map((item) => (
              <Card key={item} className="notification-body">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center border-b border-secondary pb-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span>From:</span>
                      <div className="flex flex-col items-center">
                        <Image
                          src="/logo.png"
                          alt="Sama Islamic Digital College"
                          width={50}
                          height={50}
                          className="notify-logo"
                        />
                        <span className="text-xs">Sama Islamic Digital College</span>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>December 6, 2024 | 09:45 PM</span>
                    </div>
                  </div>

                  <p className="mb-4">
                    {item === 1
                      ? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, dicta."
                      : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, dicta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, dicta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, dicta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, dicta."}
                  </p>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 text-destructive">
                      <Trash className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 text-success">
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="remainders" className="space-y-4">
            {[1, 2].map((item) => (
              <Card key={item} className="notification-body">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center border-b border-secondary pb-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span>From:</span>
                      <span className="text-xs">Sama Islamic Digital College</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>December 6, 2024 | 09:45 PM</span>
                    </div>
                  </div>

                  <p className="mb-4">
                    {item === 1
                      ? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, dicta."
                      : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, dicta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, dicta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, dicta."}
                  </p>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 text-destructive">
                      <Trash className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 text-success">
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            {[
              { provider: "MTN", logo: "/mtn-logo.png" },
              { provider: "Airtel", logo: "/airtel-logo.png" },
            ].map((item, index) => (
              <Card key={index} className="notification-body">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center border-b border-secondary pb-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span>From:</span>
                      <div className="flex flex-col items-center">
                        <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          {item.provider}
                        </div>
                        <span className="text-xs">{item.provider}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>December 6, 2024 | 09:45 PM</span>
                    </div>
                  </div>

                  <p className="mb-4">
                    {index === 0
                      ? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, dicta."
                      : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea aspernatur nobis distinctio ut aperiam exercitationem sequi eos quisquam, odit quibusdam labore dolorem sint veritatis mollitia eligendi aut quod magnam neque."}
                  </p>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 text-destructive">
                      <Trash className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 text-success">
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
