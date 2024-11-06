"use client"

import { Bar, BarChart, Line, LineChart, Pie, PieChart } from "recharts"
import { Bell, Home, Package, Settings, ShoppingCart, Users } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import { Input } from "../../components/ui/input"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../components/ui/chart"
import Menu from "./menu"

// Sample data for the charts
const activityData = [
  { week: "Week 01", spendings: 30, income: 45, others: 20 },
  { week: "Week 03", spendings: 35, income: 50, others: 22 },
  { week: "Week 04", spendings: 45, income: 60, others: 28 },
  { week: "Week 05", spendings: 38, income: 52, others: 24 },
  { week: "Week 06", spendings: 42, income: 58, others: 26 },
  { week: "Week 07", spendings: 36, income: 51, others: 23 },
  { week: "Week 08", spendings: 39, income: 54, others: 25 },
  { week: "Week 09", spendings: 41, income: 56, others: 27 },
  { week: "Week 10", spendings: 37, income: 53, others: 24 },
]

const transactionData = [
  { name: "Q1", income: 58, expense: 70 },
  { name: "Q2", income: 95, expense: 50 },
  { name: "Q3", income: 28, expense: 20 },
  { name: "Q4", income: 75, expense: 45 },
]

const flightShareData = [
  { name: "Domestic", value: 35 },
  { name: "International", value: 25 },
  { name: "Charter", value: 20 },
  { name: "Private", value: 20 },
]

export default function Component() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-14 bg-white border-r flex flex-col items-center py-4 gap-8">
        <Menu/>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white p-4 border-b flex items-center justify-between">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <Input
              type="search"
              placeholder="Search suppliers..."
              className="w-64"
            />
            <Button size="icon" variant="ghost">
              <Bell className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm">Designluch</span>
              <span className="text-xs text-muted-foreground">Super Admin</span>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Metrics */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-blue-500 text-white">
              <CardContent className="p-6">
                <div className="text-sm">Spends Today</div>
                <div className="text-3xl font-bold">$5,245</div>
              </CardContent>
            </Card>
            <Card className="bg-green-500 text-white">
              <CardContent className="p-6">
                <div className="text-sm">Spends Yesterday</div>
                <div className="text-3xl font-bold">$953.55</div>
              </CardContent>
            </Card>
          </div>

          {/* Chart Activity */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Chart Activity</CardTitle>
              <Select defaultValue="this-month">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="3-months">3 Months</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  spendings: {
                    label: "Spendings",
                    color: "hsl(var(--chart-1))",
                  },
                  income: {
                    label: "Income",
                    color: "hsl(var(--chart-2))",
                  },
                  others: {
                    label: "Others",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[300px]"
              >
                <LineChart data={activityData}>
                  <Line
                    type="monotone"
                    dataKey="spendings"
                    stroke="var(--color-spendings)"
                  />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="var(--color-income)"
                  />
                  <Line
                    type="monotone"
                    dataKey="others"
                    stroke="var(--color-others)"
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Bottom Charts */}
          <div className="grid grid-cols-2 gap-6">
            {/* Transaction Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Transaction Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    income: {
                      label: "Income",
                      color: "hsl(var(--chart-2))",
                    },
                    expense: {
                      label: "Expense",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[200px]"
                >
                  <BarChart data={transactionData}>
                    <Bar dataKey="income" fill="var(--color-income)" />
                    <Bar dataKey="expense" fill="var(--color-expense)" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Flights Share */}
            <Card>
              <CardHeader>
                <CardTitle>Flights Share</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Share",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[200px]"
                >
                  <PieChart>
                    <Pie
                      data={flightShareData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}