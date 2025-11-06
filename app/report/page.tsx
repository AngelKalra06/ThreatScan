"use client"

import React from "react"
import { useRequireAuth, useAuth } from "@/app/context/AuthContext"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, FileText } from "lucide-react"

type HistoryItem = {
  id: string
  fileName: string
  status: "clean" | "suspicious" | "malicious"
  threatScore: number
  scanTime: string
  hash: string
}

export default function ReportPage() {
  useRequireAuth()
  const { userId } = useAuth()

  const [reportsHistory, setReportsHistory] = React.useState<HistoryItem[]>([])

  React.useEffect(() => {
    if (!userId) return
    const storedHistory = localStorage.getItem(`reportsHistory_${userId}`)
    if (storedHistory) {
      setReportsHistory(JSON.parse(storedHistory))
    }
  }, [userId])

  const clearHistory = () => {
    if (!userId) return
    setReportsHistory([])
    localStorage.setItem(`reportsHistory_${userId}`, JSON.stringify([]))
  }

  const getThreatBadgeColor = (status: string | null) => {
    switch (status) {
      case "clean":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "suspicious":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "malicious":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 py-20">
      <div className="max-w-5xl mx-auto px-4">
        <Card className="bg-gray-900/70 border border-gray-700/50 shadow-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Threat Analysis History</h2>
              <p className="text-gray-300 text-lg">View and manage your comprehensive security scan history</p>
            </div>
            {/* Filters */}
            <div className="mb-8 flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search by filename or threat type..."
                    className="pl-12 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400 focus:border-cyan-500/50 rounded-xl h-12"
                  />
                </div>
              </div>
              <Button
                variant="outline"
                className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 bg-transparent backdrop-blur-sm rounded-xl px-6"
              >
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filter
              </Button>
            </div>
            {/* Reports List */}
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Recent Scans ({reportsHistory.length})</h3>
                <Button
                  onClick={clearHistory}
                  variant="outline"
                  className="border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent backdrop-blur-sm rounded-xl"
                >
                  Clear History
                </Button>
              </div>
              {reportsHistory.length > 0 ? (
                <div className="grid gap-4">
                  {reportsHistory.map((report) => (
                    <Card key={report.id} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-200">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 bg-cyan-500/20 rounded-xl">
                              <FileText className="w-6 h-6 text-cyan-400" />
                            </div>
                            <div>
                              <h4 className="text-white font-semibold text-lg">{report.fileName}</h4>
                              <p className="text-gray-400 text-sm">
                                {new Date(report.scanTime).toLocaleString()}
                              </p>
                              <p className="text-gray-500 text-xs font-mono">
                                {report.hash.substring(0, 16)}...
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className="text-white font-bold text-lg">{report.threatScore}/100</p>
                              <p className="text-gray-400 text-sm">Threat Score</p>
                            </div>
                            <Badge className={`${getThreatBadgeColor(report.status)} text-sm px-3 py-1`}>
                              {report.status.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-400 py-12">No reports yet. Scan a file to see your report history here.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


