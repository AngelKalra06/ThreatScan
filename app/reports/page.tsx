"use client"

import { Shield, FileText, Clock, Search, Filter, BarChart3, Users, Zap, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function ReportsPage() {
  // Mock reports data
  const mockReports = [
    {
      id: "1704649200000",
      file_name: "suspicious_file.exe",
      threat_level: "suspicious",
      threat_score: 65,
      scan_time: "2025-01-07 18:15:00",
      file_size: "546 KB",
    },
    {
      id: "1704649100000",
      file_name: "document.pdf",
      threat_level: "clean",
      threat_score: 5,
      scan_time: "2025-01-07 18:10:00",
      file_size: "2.1 MB",
    },
    {
      id: "1704649000000",
      file_name: "malware.dll",
      threat_level: "malicious",
      threat_score: 95,
      scan_time: "2025-01-07 18:05:00",
      file_size: "128 KB",
    },
    {
      id: "1704648900000",
      file_name: "installer.msi",
      threat_level: "clean",
      threat_score: 10,
      scan_time: "2025-01-07 18:00:00",
      file_size: "15.2 MB",
    },
  ]

  const getThreatBadgeColor = (level: string) => {
    switch (level) {
      case "clean":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "suspicious":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30"
      case "malicious":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Navigation */}
            <div className="lg:col-span-3">
              <div className="sticky top-8">
                {/* Brand */}
                <div className="bg-gradient-to-r from-cyan-500 to-turquoise-500 p-6 rounded-2xl mb-8 shadow-xl">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">ThreatScan</h2>
                      <p className="text-cyan-100 text-sm">Advanced Malware Detection</p>
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-3 mb-8">
                  <Link
                    href="/"
                    className="flex items-center space-x-4 px-6 py-4 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/20 border border-transparent rounded-xl transition-all duration-200 backdrop-blur-sm"
                  >
                    <Search className="w-5 h-5" />
                    <span>Scan Files</span>
                  </Link>
                  <Link
                    href="/reports"
                    className="flex items-center space-x-4 px-6 py-4 text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-xl font-medium backdrop-blur-sm shadow-lg"
                  >
                    <BarChart3 className="w-5 h-5" />
                    <span>Reports</span>
                  </Link>
                  <Link
                    href="/about"
                    className="flex items-center space-x-4 px-6 py-4 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/20 border border-transparent rounded-xl transition-all duration-200 backdrop-blur-sm"
                  >
                    <Users className="w-5 h-5" />
                    <span>About</span>
                  </Link>
                </nav>

                {/* Activity Stats */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 shadow-xl">
                  <h3 className="font-semibold text-white mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 text-cyan-400 mr-2" />
                    Scan Activity
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Today</span>
                      <span className="font-bold text-cyan-400">4 scans</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">This Week</span>
                      <span className="font-bold text-cyan-400">12 scans</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Threats Found</span>
                      <span className="font-bold text-red-400">2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-4">Threat Analysis Reports</h1>
                <p className="text-gray-300 text-lg">View and manage your comprehensive security scan history</p>
              </div>

              {/* Filters */}
              <div className="mb-8 flex flex-col sm:flex-row gap-4">
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

              {/* Reports Grid */}
              <div className="grid gap-6">
                {mockReports.map((report) => (
                  <Card
                    key={report.id}
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                          <div className="p-3 bg-cyan-500/20 rounded-xl">
                            <FileText className="w-8 h-8 text-cyan-400" />
                          </div>
                          <div>
                            <h3 className="font-bold text-white text-lg mb-2">{report.file_name}</h3>
                            <div className="flex items-center space-x-6 text-sm text-gray-400">
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-2" />
                                {report.scan_time}
                              </span>
                              <span className="flex items-center">
                                <Zap className="w-4 h-4 mr-2" />
                                {report.file_size}
                              </span>
                              <span className="flex items-center">
                                <BarChart3 className="w-4 h-4 mr-2" />
                                Score: {report.threat_score}/100
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge
                            className={`${getThreatBadgeColor(report.threat_level)} px-4 py-2 text-sm font-semibold`}
                          >
                            {report.threat_level.toUpperCase()}
                          </Badge>
                          <Link href={`/report/${report.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 bg-transparent backdrop-blur-sm rounded-xl px-6"
                            >
                              View Analysis
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Empty State */}
              {mockReports.length === 0 && (
                <div className="text-center py-20">
                  <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-8">
                    <FileText className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">No Reports Found</h3>
                  <p className="text-gray-400 mb-8 text-lg">Start by scanning your first file for threats</p>
                  <Link href="/">
                    <Button className="bg-gradient-to-r from-cyan-500 to-turquoise-500 hover:from-cyan-600 hover:to-turquoise-600 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg">
                      Start Threat Scan
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
