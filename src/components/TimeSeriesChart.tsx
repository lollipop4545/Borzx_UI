"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3 } from "lucide-react"

export type TimeSeriesData = {
  days: Array<{ name: string, value: number }>
  weeks: Array<{ name: string, value: number }>
  months: Array<{ name: string, value: number }>
  years: Array<{ name: string, value: number }>
}

export default function TimeSeriesChart({ data, title = "Click Traffic" }: { data: TimeSeriesData, title?: string }) {
  const [timeView, setTimeView] = useState<"days" | "weeks" | "months" | "years">("days")

  const currentData = data?.[timeView] ?? []

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-xl font-bold tracking-tight flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <Tabs value={timeView} onValueChange={(v: any) => setTimeView(v)}>
          <TabsList className="h-8">
            <TabsTrigger value="days" className="text-xs">Days</TabsTrigger>
            <TabsTrigger value="weeks" className="text-xs">Weeks</TabsTrigger>
            <TabsTrigger value="months" className="text-xs">Months</TabsTrigger>
            <TabsTrigger value="years" className="text-xs">Years</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        {currentData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[300px] bg-slate-50 rounded-xl border border-dashed">
            <p className="text-sm text-slate-400">No data available.</p>
          </div>
        ) : (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: "#64748b" }} 
                  dy={10} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: "#64748b" }} 
                  allowDecimals={false}
                />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: any) => [`${value} clicks`, "Traffic"]}
                />
                <Bar dataKey="value" fill="#0f172a" radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
