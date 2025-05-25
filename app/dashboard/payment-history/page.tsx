import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"

export default function PaymentHistory() {
  const payments = [
    {
      course: "Thanawi",
      amount: "UGX 50000",
      date: "December, 02, 2024",
      status: "success",
    },
    {
      course: "Thanawi",
      amount: "UGX 25000",
      date: "December, 02, 2024",
      status: "failed",
    },
  ]

  return (
    <div className="payment-history-container">
      <div className="heading bg-secondary p-4">
        <div className="container mx-auto flex items-center gap-4">
          <Link href="/dashboard/account">
            <Button variant="ghost" size="icon" className="text-foreground p-0">
              <ArrowLeft className="h-5 w-5" />
              <span className="ml-2">Back</span>
            </Button>
          </Link>
          <span className="text-xl font-semibold">Payment History</span>
        </div>
      </div>

      <div className="payment-history-section py-6">
        <div className="container mx-auto space-y-6">
          {payments.map((payment, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <h3 className="text-lg font-semibold">Details</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Course:</span>
                    <span className="font-medium">{payment.course}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-medium">{payment.amount}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Payment Date:</span>
                    <span className="font-medium">{payment.date}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span
                      className={`font-medium ${payment.status === "success" ? "text-green-500" : "text-red-500"} flex items-center`}
                    >
                      {payment.status === "success" ? "Payment Successfully!" : "Payment Failed!"}
                      {payment.status === "success" && <Check className="ml-1 h-4 w-4" />}
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
