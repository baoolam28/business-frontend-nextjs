/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/VjbckIqHoCf
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/components/ui/chart"
import { Pie, PieChart, CartesianGrid, XAxis, Line, LineChart } from "recharts"
import { DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import Menu from "../component/menu"
export default   function dashboardCustomer() {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      orders: [
        { id: 1, total: 100, date: "2023-04-01" },
        { id: 2, total: 150, date: "2023-05-15" },
        { id: 3, total: 75, date: "2023-06-20" },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      orders: [
        { id: 1, total: 200, date: "2023-03-10" },
        { id: 2, total: 120, date: "2023-05-01" },
      ],
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      orders: [
        { id: 1, total: 80, date: "2023-02-15" },
        { id: 2, total: 90, date: "2023-04-05" },
        { id: 3, total: 110, date: "2023-06-01" },
      ],
    },
  ])
  const [showModal, setShowModal] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const handleCreateCustomer = () => {
    setSelectedCustomer(null)
    setShowModal(true)
  }
  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer)
    setShowModal(true)
  }
  const handleDeleteCustomer = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id))
  }
  const handleSaveCustomer = (customer) => {
    if (selectedCustomer) {
      setCustomers(customers.map((c) => (c.id === customer.id ? customer : c)))
    } else {
      setCustomers([...customers, { ...customer, id: customers.length + 1 }])
    }
    setShowModal(false)
  }
  const totalOrders = customers.reduce((total, customer) => total + customer.orders.length, 0)
  const totalRevenue = customers.reduce(
    (total, customer) => total + customer.orders.reduce((sum, order) => sum + order.total, 0),
    0
  )
  const averageOrderValue = totalRevenue / totalOrders
  const customerSegments = customers.reduce((segments, customer) => {
    const orderCount = customer.orders.length
    if (orderCount < 3) {
      segments.new += 1
    } else if (orderCount < 10) {
      segments.recurring += 1
    } else {
      segments.loyal += 1
    }
    return segments
  }, { new: 0, recurring: 0, loyal: 0 })
  return (
    
    (<div className="flex min-h-screen w-full flex-col bg-muted/40 ">
      <Menu/>
      
      <main className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 ml-5">
        <header className="bg-primary text-primary-foreground py-4 px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Customer Admin</h1>
          <Dialog>
              <DialogTrigger asChild>
                <Button onClick={handleCreateCustomer}>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Create Customer
                </Button>
            </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Customer</DialogTitle>
                  <DialogDescription>Fill out the form below to create a new customer.</DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 555-5555" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="123 Main St, Anytown USA" />
                    </div>
                  </div>
                </form>
                <DialogFooter>
                  <Button type="submit">Save Customer</Button>
                  
                  <DialogClose>
                    <div>
                    <Button variant="outline">Cancel</Button>
                  </div>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
        </div>
      </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{totalOrders}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">${totalRevenue.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Average Order Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">${averageOrderValue.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>
        <Separator className="my-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Segmentation</CardTitle>
            </CardHeader>
            <CardContent>
              <PiechartcustomChart className="aspect-square" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Orders Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <LinechartChart className="aspect-[9/4]" />
            </CardContent>
          </Card>
        </div>
        <Separator className="my-6" />
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Customers</h2>
          
            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={handleCreateCustomer}>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Create Customer
                </Button>
            </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Customer</DialogTitle>
                  <DialogDescription>Fill out the form below to create a new customer.</DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 555-5555" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="123 Main St, Anytown USA" />
                    </div>
                  </div>
                </form>
                <DialogFooter>
                  <Button type="submit">Save Customer</Button>
                  <div>
                    <Button variant="outline">Cancel</Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.orders.length}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEditCustomer(customer)}>
                        <FilePenIcon className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeleteCustomer(customer.id)}>
                        <TrashIcon className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
      {showModal && (
        <Dialog>
          <DialogContent className="sm:max-w-[425px]">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">{selectedCustomer ? "Edit Customer" : "Create Customer"}</h3>
                <div>
                  <Button variant="ghost" size="icon">
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    defaultValue={selectedCustomer?.name}
                    placeholder="Enter customer name" />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={selectedCustomer?.email}
                    placeholder="Enter customer email" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={() =>
                  handleSaveCustomer({
                    id: selectedCustomer?.id,
                    name: document.getElementById("name").value,
                    email: document.getElementById("email").value,
                    orders: selectedCustomer?.orders || [],
                  })
                }>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>)
  );
}

function FilePenIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>)
  );
}


function LinechartChart(props) {
  return (
    (<div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}>
        <LineChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
          ]}
          margin={{
            left: 12,
            right: 12,
          }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Line
            dataKey="desktop"
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={false} />
        </LineChart>
      </ChartContainer>
    </div>)
  );
}


function PiechartcustomChart(props) {
  return (
    (<div {...props}>
      <ChartContainer
        config={{
          visitors: {
            label: "Visitors",
          },
          chrome: {
            label: "Chrome",
            color: "hsl(var(--chart-1))",
          },
          safari: {
            label: "Safari",
            color: "hsl(var(--chart-2))",
          },
          firefox: {
            label: "Firefox",
            color: "hsl(var(--chart-3))",
          },
          edge: {
            label: "Edge",
            color: "hsl(var(--chart-4))",
          },
          other: {
            label: "Other",
            color: "hsl(var(--chart-5))",
          },
        }}>
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={[
              { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
              { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
              { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
              { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
              { browser: "other", visitors: 90, fill: "var(--color-other)" },
            ]}
            dataKey="visitors"
            nameKey="browser" />
        </PieChart>
      </ChartContainer>
      <div>
      
      </div>
    </div>)
  );
}


function PlusIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>)
  );
}


function TrashIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>)
  );
}


function XIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>)
  );
}
