"use client"

import React, { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  Shield,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowLeft,
  ExternalLink,
  Clock,
  Hash,
  HardDrive,
  FileType,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert } from "@/components/ui/alert"
import { jsPDF } from "jspdf"

interface ReportData {
  id: string
  fileName: string
  fileSize: string
  fileType: string
  hash: string
  threatLevel: "clean" | "suspicious" | "malicious"
  threatScore: number
  suspiciousIndicators: string[]
  scanTime: string
  uploadTime: string
}

export default function ReportPage() {
  const params = useParams()
  const router = useRouter()
  const [report, setReport] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReport = async () => {
      // Try to load from localStorage first
      const localReport = localStorage.getItem(`report_${params.id}`)
      if (localReport) {
        setReport(JSON.parse(localReport))
        setLoading(false)
        return
      }
      try {
        setLoading(true)
        const response = await fetch(`/api/report/${params.id}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            setError("Report not found")
          } else {
            setError("Failed to load report")
          }
          return
        }

        const data = await response.json()
        setReport(data)
      } catch (err) {
        console.error("Error fetching report:", err)
        setError("Failed to load report")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchReport()
    }
  }, [params.id])

  const getThreatColor = (status: string) => {
    switch (status) {
      case "clean":
        return "text-emerald-600"
      case "suspicious":
        return "text-amber-600"
      case "malicious":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getThreatBadgeColor = (status: string) => {
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

  const getThreatIcon = (status: string) => {
    switch (status) {
      case "clean":
        return <CheckCircle className="w-6 h-6 text-emerald-600" />
      case "suspicious":
        return <AlertTriangle className="w-6 h-6 text-amber-600" />
      case "malicious":
        return <XCircle className="w-6 h-6 text-red-600" />
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading report...</p>
        </div>
      </div>
    )
  }

  // Download as TXT
  const handleDownloadTxt = () => {
    if (!report) return
    const txt = [
      `File Name: ${report.fileName}`,
      `File Size: ${report.fileSize}`,
      `File Type: ${report.fileType}`,
      `SHA256 Hash: ${report.hash}`,
      `Threat Level: ${report.threatLevel}`,
      `Threat Score: ${report.threatScore}/100`,
      `Scan Time: ${new Date(report.scanTime).toLocaleString()}`,
      '',
      'Security Findings:',
      ...report.suspiciousIndicators.map((ind, i) => `${i + 1}. ${ind}`)
    ].join('\n')
    const blob = new Blob([txt], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${report.fileName || 'report'}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Download as PDF
  const handleDownloadPdf = () => {
    if (!report) return
    const doc = new jsPDF() as any
    doc.setFontSize(16)
    doc.text('Security Scan Report', 10, 15)
    doc.setFontSize(12)
    doc.text(`File Name: ${report.fileName}`, 10, 30)
    doc.text(`File Size: ${report.fileSize}`, 10, 38)
    doc.text(`File Type: ${report.fileType}`, 10, 46)
    doc.text(`SHA256 Hash: ${report.hash}`, 10, 54)
    doc.text(`Threat Level: ${report.threatLevel}`, 10, 62)
    doc.text(`Threat Score: ${report.threatScore}/100`, 10, 70)
    doc.text(`Scan Time: ${new Date(report.scanTime).toLocaleString()}`, 10, 78)
    doc.text('Security Findings:', 10, 90)
    (report.suspiciousIndicators || []).forEach((ind: string, i: number) => {
      doc.text(`${i + 1}. ${ind}`, 14, 98 + i * 8)
    })
    doc.save(`${report.fileName || 'report'}.pdf`)
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-red-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Report Not Found</h1>
          <p className="text-gray-300 mb-8">
            The report you're looking for doesn't exist or has been removed.
          </p>
          <Button
            onClick={() => router.push("/")}
            className="bg-gradient-to-r from-cyan-500 to-turquoise-500 hover:from-cyan-600 hover:to-turquoise-600 text-white px-6 py-3 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 bg-transparent backdrop-blur-sm rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center space-x-3">
            {getThreatIcon(report.threatLevel)}
            <Badge className={`${getThreatBadgeColor(report.threatLevel)} text-lg px-4 py-2`}>
              {(report.threatLevel ? report.threatLevel.toUpperCase() : "UNKNOWN")}
            </Badge>
          </div>
        </div>
        {/* Download Buttons */}
        <div className="flex gap-4 mb-6">
          <Button onClick={handleDownloadTxt} className="bg-cyan-600 text-white">
            Download TXT
          </Button>
          <Button onClick={handleDownloadPdf} className="bg-cyan-600 text-white">
            Download PDF
          </Button>
        </div>

        {/* Main Report Card */}
        <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-white text-2xl">
              <Shield className="w-8 h-8 text-cyan-400" />
              <span>Security Scan Report</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* File Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-gray-700/30 rounded-xl">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-gray-400 text-sm">File Name</p>
                    <p className="text-white font-semibold">{report.fileName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-700/30 rounded-xl">
                  <Hash className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-gray-400 text-sm">SHA256 Hash</p>
                    <p className="text-white font-mono text-sm break-all">{report.hash}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-gray-700/30 rounded-xl">
                  <HardDrive className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-gray-400 text-sm">File Size</p>
                    <p className="text-white">{report.fileSize}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-700/30 rounded-xl">
                  <FileType className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-gray-400 text-sm">File Type</p>
                    <p className="text-white">{report.fileType}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Threat Analysis */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
                <AlertTriangle className="w-6 h-6 text-amber-400" />
                <span>Threat Analysis</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-700/30 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Threat Score</p>
                  <p className="text-white font-bold text-2xl">{report.threatScore}/100</p>
                </div>
                <div className="p-4 bg-gray-700/30 rounded-xl">
                  <p className="text-gray-400 text-sm mb-1">Scan Time</p>
                  <p className="text-white">{new Date(report.scanTime).toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Suspicious Indicators */}
            {report.suspiciousIndicators?.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Security Findings</h3>
                <div className="space-y-3">
                  {report.suspiciousIndicators.map((indicator, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
                    >
                      <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <p className="text-red-300">{indicator}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}


          </CardContent>
        </Card>
      </div>
    </div>
  )
}
