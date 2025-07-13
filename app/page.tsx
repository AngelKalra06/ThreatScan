"use client"

import React, { useState } from "react"
import {
  Shield,
  Upload,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity,
  Search,
  BarChart3,
  Users,
  Award,
  Globe,
  Zap,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { jsPDF } from "jspdf"

export default function ThreatScanApp() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [progress, setProgress] = useState(0)
  const [reportsHistory, setReportsHistory] = useState<Array<{
    id: string
    fileName: string
    status: "clean" | "suspicious" | "malicious"
    threatScore: number
    scanTime: string
    hash: string
  }>>([])

  React.useEffect(() => {
    const storedHistory = localStorage.getItem('reportsHistory')
    if (storedHistory) {
      setReportsHistory(JSON.parse(storedHistory))
    }
  }, [])

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setAnalysisResult(null)
    }
  }

  const handleAnalyze = async () => {
    if (!selectedFile) return

    // File validation
    const maxSize = 50 * 1024 * 1024 // 50MB
    if (selectedFile.size > maxSize) {
      alert("File size too large. Please upload a file smaller than 50MB.")
      return
    }

    const allowedTypes = [
      "application/octet-stream", // .exe, .dll, etc.
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/zip",
      "application/x-zip-compressed",
      "application/x-rar-compressed",
      "application/java-archive",
      "application/vnd.android.package-archive",
      "text/plain",
      "application/x-bat",
      "application/x-msdos-program"
    ]

    if (!allowedTypes.includes(selectedFile.type) && !selectedFile.name.match(/\.(exe|dll|scr|bat|ps1|jar|apk)$/i)) {
      alert("File type not supported. Please upload a supported file type.")
      return
    }

    setIsAnalyzing(true)
    setProgress(0)
    setAnalysisResult(null)

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + Math.random() * 15
      })
    }, 200)

    try {
      // Create FormData for file upload
      const formData = new FormData()
      formData.append("file", selectedFile)

      // Call our API endpoint
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      clearInterval(progressInterval)
      setProgress(100)

      setAnalysisResult(result)

      // Save full report to localStorage
      localStorage.setItem(
        `report_${result.hash}`,
        JSON.stringify(result)
      )

      // Update reports history in localStorage
      const updatedHistory = [
        {
          id: result.hash,
          fileName: result.file_name || selectedFile.name,
          status: result.threat_level,
          threatScore: result.threat_score || 0,
          scanTime: result.details?.scan_time || new Date().toISOString(),
          hash: result.hash || "N/A"
        },
        ...reportsHistory.slice(0, 9)
      ]
      setReportsHistory(updatedHistory)
      localStorage.setItem('reportsHistory', JSON.stringify(updatedHistory))
    } catch (error) {
      console.error("Analysis failed:", error)
      clearInterval(progressInterval)
      setProgress(0)
      alert("Analysis failed. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getThreatColor = (status: string | null) => {
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

  const getThreatIcon = (status: string | null) => {
    switch (status) {
      case "clean":
        return <CheckCircle className="w-5 h-5 text-emerald-600" />
      case "suspicious":
        return <AlertTriangle className="w-5 h-5 text-amber-600" />
      case "malicious":
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return null
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const clearHistory = () => {
    setReportsHistory([])
    localStorage.removeItem('reportsHistory')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      {/* Main Scanner Section */}
      <div id="scanner" className="pt-28 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section with Side Navigation */}
          <div className="grid lg:grid-cols-12 gap-8 items-start justify-start">
            {/* Left Navigation */}
            <div className="lg:col-span-3 mr-20">
              <div className="self-center">
                {/* Brand */}
                <div className="bg-gradient-to-r from-cyan-500 to-cyan-400 p-6 rounded-2xl mb-8 shadow-xl min-w-[220px] w-fit">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">ThreatScan</h2>
                      <p className="text-white text-sm">Malware Detection</p>
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-3 mb-8">
                  <button
                    onClick={() => scrollToSection("scanner")}
                    className="flex items-center space-x-4 px-6 py-4 text-xl text-cyan-400 hover:text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/20 border border-transparent rounded-xl transition-all duration-200 backdrop-blur-sm w-full text-left"
                  >
                    <Search className="w-5 h-5" />
                    <span>Scan Files</span>
                  </button>
                  <button
                    onClick={() => scrollToSection("reports")}
                    className="flex items-center space-x-4 px-6 py-4 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/20 border border-transparent rounded-xl transition-all duration-200 backdrop-blur-sm w-full text-left"
                  >
                    <BarChart3 className="w-5 h-5" />
                    <span>Reports</span>
                  </button>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="flex items-center space-x-4 px-6 py-4 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/20 border border-transparent rounded-xl transition-all duration-200 backdrop-blur-sm w-full text-left"
                  >
                    <Users className="w-5 h-5" />
                    <span>About</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-9 ml-8">
              <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-2xl">
                <CardContent className="p-12">
                  <div className="text-center mb-10">
                    <h1 className="text-5xl font-bold text-white mb-6">Malware Detection</h1>
                    <p className="text-gray-300 text-xl leading-relaxed max-w-3xl mx-auto">
                      Upload suspicious files for comprehensive security analysis using cutting-edge threat detection
                      algorithms and real-time intelligence feeds.
                    </p>
                  </div>

                  {/* File Upload Section */}
                  <div className="space-y-8">
                    <div className="relative border-2 border-dashed border-cyan-500/30 rounded-2xl p-12 text-center hover:border-cyan-400/50 transition-all duration-300 bg-gradient-to-br from-cyan-500/5 to-turquoise-500/5 backdrop-blur-sm">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-turquoise-500/10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                      <Upload className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
                      <div className="space-y-3 relative z-10">
                        <p className="text-white font-semibold text-lg">Drop your file here or click to browse</p>
                        <p className="text-gray-400">Supports: EXE, DLL, PDF, DOC, ZIP, APK, SCR, BAT, PS1 and more</p>
                      </div>
                      <input
                        type="file"
                        onChange={handleFileSelect}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                        accept=".exe,.dll,.pdf,.doc,.docx,.zip,.rar,.jar,.apk,.scr,.bat,.ps1"
                      />
                    </div>

                    {selectedFile && (
                      <div className="flex items-center justify-between p-6 bg-gray-700/50 backdrop-blur-sm rounded-2xl border border-gray-600/50">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-cyan-500/20 rounded-xl">
                            <FileText className="w-6 h-6 text-cyan-400" />
                          </div>
                          <div>
                            <p className="text-white font-semibold text-lg">{selectedFile.name}</p>
                            <p className="text-gray-400">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <Button
                          onClick={handleAnalyze}
                          disabled={isAnalyzing}
                          className="bg-gradient-to-r from-cyan-500 to-turquoise-500 hover:from-cyan-600 hover:to-turquoise-600 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg transition-all duration-200"
                        >
                          {isAnalyzing ? (
                            <>
                              <Activity className="w-5 h-5 mr-3 animate-spin" />
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <Shield className="w-5 h-5 mr-3" />
                              Analyze Threat
                            </>
                          )}
                        </Button>
                      </div>
                    )}

                    {isAnalyzing && (
                      <div className="space-y-4 p-6 bg-gray-700/30 backdrop-blur-sm rounded-2xl border border-gray-600/30">
                        <div className="flex justify-between text-lg">
                          <span className="text-white font-semibold">Scanning Progress</span>
                          <span className="text-cyan-400 font-bold">{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="bg-gray-600 h-3 rounded-full" />
                        <p className="text-gray-300 text-center">
                          Analyzing file signatures, behavioral patterns, and threat indicators...
                        </p>
                      </div>
                    )}

                    {analysisResult && (
                      <div className="space-y-6">
                        <Alert className="border-gray-600/50 bg-gray-700/30 backdrop-blur-sm p-6 rounded-2xl">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              {getThreatIcon(analysisResult.threat_level || analysisResult.status)}
                              <span className="font-bold text-white text-lg">Analysis Complete</span>
                            </div>
                            <Badge className={`${getThreatBadgeColor(analysisResult.threat_level || analysisResult.status)} text-lg px-4 py-2`}>
                              {analysisResult.threat_level || analysisResult.status?.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="p-4 bg-gray-800/50 rounded-xl">
                                <p className="text-gray-400 text-sm mb-1">Threat Score</p>
                                <p className="text-white font-bold text-xl">{analysisResult.threat_score || 0}/100</p>
                              </div>
                              <div className="p-4 bg-gray-800/50 rounded-xl">
                                <p className="text-gray-400 text-sm mb-1">SHA256</p>
                                <p className="text-white font-mono text-xs break-all">{analysisResult.sha256 || analysisResult.hash}</p>
                              </div>
                              <div className="p-4 bg-gray-800/50 rounded-xl">
                                <p className="text-gray-400 text-sm mb-1">MD5</p>
                                <p className="text-white font-mono text-xs break-all">{analysisResult.md5 || analysisResult.hash}</p>
                              </div>
                              <div className="p-4 bg-gray-800/50 rounded-xl">
                                <p className="text-gray-400 text-sm mb-1">File Name</p>
                                <p className="text-white font-semibold">{analysisResult.file_name || selectedFile?.name}</p>
                              </div>
                              <div className="p-4 bg-gray-800/50 rounded-xl">
                                <p className="text-gray-400 text-sm mb-1">File Size</p>
                                <p className="text-white">{analysisResult.file_size || (selectedFile?.size ? (selectedFile.size / 1024 / 1024).toFixed(2) + ' MB' : 'N/A')}</p>
                              </div>
                              <div className="p-4 bg-gray-800/50 rounded-xl">
                                <p className="text-gray-400 text-sm mb-1">File Type</p>
                                <p className="text-white">{analysisResult.file_type || selectedFile?.type || "unknown"}</p>
                              </div>
                              <div className="p-4 bg-gray-800/50 rounded-xl">
                                <p className="text-gray-400 text-sm mb-1">MIME Type</p>
                                <p className="text-white">{analysisResult.mime_type || selectedFile?.type || "unknown"}</p>
                              </div>
                              <div className="p-4 bg-gray-800/50 rounded-xl">
                                <p className="text-gray-400 text-sm mb-1">Upload Time</p>
                                <p className="text-white">{analysisResult.upload_time || new Date().toISOString()}</p>
                              </div>
                            </div>
                            <div className="p-4 bg-gray-800/50 rounded-xl">
                              <p className="text-gray-400 text-sm mb-1">Detection Rules Triggered</p>
                              {analysisResult.detection_rules_triggered?.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                  {analysisResult.detection_rules_triggered.map((rule: string, idx: number) => (
                                    <span key={idx} className="bg-amber-200 text-amber-800 px-2 py-1 rounded text-xs font-mono border border-amber-300">
                                      {rule}
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-gray-400">None</span>
                              )}
                            </div>
                            <div className="p-4 bg-gray-800/50 rounded-xl">
                              <p className="text-gray-400 text-sm mb-1">Suspicious Indicators</p>
                              {analysisResult.suspicious_indicators?.length > 0 ? (
                                <ul className="space-y-2">
                                  {analysisResult.suspicious_indicators.map((indicator: string, idx: number) => (
                                    <li key={idx} className="flex items-start space-x-3 p-2 bg-red-500/10 border border-red-500/20 rounded-xl">
                                      <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                                      <span className="text-red-300 text-sm">{indicator}</span>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <span className="text-emerald-400">No obvious threats detected in the file. However, proceed with caution if you do not trust the source.</span>
                              )}
                            </div>
                            <div className="p-4 bg-gray-800/50 rounded-xl">
                              <p className="text-gray-400 text-sm mb-1">Recommendation</p>
                              <span className={
                                analysisResult.threat_level === "malicious" || analysisResult.status === "malicious"
                                  ? "text-red-500 font-semibold"
                                  : analysisResult.threat_level === "suspicious" || analysisResult.status === "suspicious"
                                  ? "text-amber-400 font-semibold"
                                  : "text-emerald-400 font-semibold"
                              }>
                                {analysisResult.recommendation || "No specific recommendation available."}
                              </span>
                                </div>
                            {analysisResult.external_report_link && (
                              <div className="p-4 bg-gray-800/50 rounded-xl">
                                <a
                                  href={analysisResult.external_report_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-cyan-400 underline text-sm"
                                >
                                  View External Report (VirusTotal)
                                </a>
                              </div>
                            )}
                            <div className="flex gap-4 pt-4">
                              <Button
                                onClick={() => {
                                  // TXT download
                                  const txt = [
                                    `File Name: ${analysisResult.file_name || selectedFile?.name}`,
                                    `SHA256: ${analysisResult.sha256 || analysisResult.hash}`,
                                    `MD5: ${analysisResult.md5 || analysisResult.hash}`,
                                    `File Size: ${analysisResult.file_size || (selectedFile?.size ? (selectedFile.size / 1024 / 1024).toFixed(2) + ' MB' : 'N/A')}`,
                                    `File Type: ${analysisResult.file_type || selectedFile?.type || "unknown"}`,
                                    `MIME Type: ${analysisResult.mime_type || selectedFile?.type || "unknown"}`,
                                    `Upload Time: ${analysisResult.upload_time || new Date().toISOString()}`,
                                    `Threat Score: ${analysisResult.threat_score || 0}/100`,
                                    `Threat Level: ${analysisResult.threat_level || analysisResult.status}`,
                                    '',
                                    'Detection Rules Triggered:',
                                    ...(analysisResult.detection_rules_triggered?.length > 0 ? analysisResult.detection_rules_triggered.map((r: string) => `- ${r}`) : ['None']),
                                    '',
                                    'Suspicious Indicators:',
                                    ...(analysisResult.suspicious_indicators?.length > 0 ? analysisResult.suspicious_indicators.map((s: string) => `- ${s}`) : ['None']),
                                    '',
                                    `Recommendation: ${analysisResult.recommendation || "No specific recommendation available."}`,
                                    analysisResult.external_report_link ? `External Report: ${analysisResult.external_report_link}` : ''
                                  ].join('\n')
                                  const blob = new Blob([txt], { type: 'text/plain' })
                                  const url = URL.createObjectURL(blob)
                                  const a = document.createElement('a')
                                  a.href = url
                                  a.download = `${analysisResult.file_name || selectedFile?.name || 'report'}.txt`
                                  document.body.appendChild(a)
                                  a.click()
                                  document.body.removeChild(a)
                                  URL.revokeObjectURL(url)
                                }}
                                className="bg-cyan-600 text-white"
                              >
                                Download TXT
                              </Button>
                              <Button
                                onClick={() => {
                                  // PDF download
                                  const doc = new jsPDF()
                                  doc.setFontSize(20)
                                  doc.setTextColor(0, 153, 255)
                                  doc.text('Security Scan Report', 10, 20)
                                  doc.setFontSize(14)
                                  doc.setTextColor(40, 40, 40)
                                  doc.text('File Metadata', 10, 35)
                                  doc.setFont('helvetica', 'bold')
                                  doc.text('File Name:', 10, 45)
                                  doc.text(analysisResult.file_name || selectedFile?.name, 100, 45)
                                  doc.text('SHA256:', 10, 55)
                                  doc.text(analysisResult.sha256 || analysisResult.hash, 100, 55)
                                  doc.text('MD5:', 10, 65)
                                  doc.text(analysisResult.md5 || analysisResult.hash, 100, 65)
                                  doc.text('File Size:', 10, 75)
                                  doc.text(analysisResult.file_size || (selectedFile?.size ? (selectedFile.size / 1024 / 1024).toFixed(2) + ' MB' : 'N/A'), 100, 75)
                                  doc.text('File Type:', 10, 85)
                                  doc.text(analysisResult.file_type || selectedFile?.type || "unknown", 100, 85)
                                  doc.text('MIME Type:', 10, 95)
                                  doc.text(analysisResult.mime_type || selectedFile?.type || "unknown", 100, 95)
                                  doc.text('Upload Time:', 10, 105)
                                  doc.text(analysisResult.upload_time || new Date().toISOString(), 100, 105)
                                  doc.text('Threat Score:', 10, 115)
                                  doc.text(`${analysisResult.threat_score ?? 0}/100`, 100, 115)
                                  doc.text('Threat Level:', 10, 125)
                                  doc.text(analysisResult.threat_level || analysisResult.status, 100, 125)
                                  doc.text('Detection Rules Triggered:', 10, 135)
                                  ;(analysisResult.detection_rules_triggered || []).forEach((r: string, i: number) => {
                                    doc.text(`- ${r}`, 14, 143 + i * 8)
                                  })
                                  let y = 143 + (analysisResult.detection_rules_triggered?.length || 0) * 8 + 8
                                  doc.text('Suspicious Indicators:', 10, y)
                                  ;(analysisResult.suspicious_indicators || []).forEach((s: string, i: number) => {
                                    doc.text(`- ${s}`, 14, y + 8 + i * 8)
                                  })
                                  y = y + 8 + (analysisResult.suspicious_indicators?.length || 0) * 8 + 8
                                  doc.text(`Recommendation: ${analysisResult.recommendation || "No specific recommendation available."}`, 10, y)
                                  if (analysisResult.external_report_link) {
                                    doc.text(`External Report: ${analysisResult.external_report_link}`, 10, y + 8)
                                  }
                                  doc.save(`${analysisResult.file_name || selectedFile?.name || 'report'}.pdf`)
                                }}
                                className="bg-cyan-600 text-white"
                              >
                                Download PDF
                              </Button>
                              <Button
                                onClick={() => {
                                  setAnalysisResult(null)
                                  setSelectedFile(null)
                                  window.scrollTo({ top: 0, behavior: 'smooth' })
                                }}
                                className="bg-gray-600 text-white"
                              >
                                Clear
                              </Button>
                            </div>
                          </div>
                        </Alert>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Section */}
      <div id="reports" className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <Card className="bg-gray-900/70 border border-gray-700/50 shadow-2xl">
            <CardContent className="p-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">Threat Analysis Reports</h2>
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

      {/* About Section */}
      <div id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">About ThreatScan</h2>
            <p className="text-gray-300 text-xl max-w-4xl mx-auto leading-relaxed">
              ThreatScan exists to make malware detection simple, fast, and accessible. It’s built to help anyone—from learners to professionals—scan files confidently and understand potential threats instantly.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-white">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <Users className="w-6 h-6 text-cyan-400" />
                  </div>
                  <span>Built By</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">
                  Angel<br/>
                  <a href="https://linkedin.com/in/angel-kaur-kalra-1203532b0" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">linkedin.com/in/angel-kaur-kalra-1203532b0</a>
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-white">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <Award className="w-6 h-6 text-cyan-400" />
                  </div>
                  <span>What we Do</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">
                  ThreatScan analyzes uploaded files for suspicious behaviors, malicious patterns, and hidden risks. Using a mix of heuristics and lightweight analysis, it delivers clear results you can trust—no jargon, just what you need to know.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-white">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <Globe className="w-6 h-6 text-cyan-400" />
                  </div>
                  <span>Why Choose Us?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  Fast & Real-Time — Instant results  
                  Clear Reports — No complexity  
                  Modern Tech — Built with Next.js, Python & Tailwind  
                  Independent — Made solo, driven by passion
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-white">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-cyan-400" />
                  </div>
                  <span>Our Vision</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">
                  To make threat detection part of everyday awareness—quick, understandable, and always within reach.<br/><br/>
                  <span className="italic text-cyan-400">"Scan smart. Stay safe."</span>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Technology Section */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-2xl">
            <CardContent className="p-12">
              <h3 className="text-4xl font-bold text-white mb-8 text-center">Powered by Practical Security</h3>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h4 className="text-2xl font-semibold text-cyan-400 mb-6 flex items-center">
                    <Zap className="w-6 h-6 mr-3" />
                    Smart File Analysis
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">Heuristic detection for suspicious patterns</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">Real-time scanning for quick insights</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">Flags reverse shells, encoded payloads, and risky commands</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">Hash-based checks using SHA256</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-2xl font-semibold text-cyan-400 mb-6 flex items-center">
                    <Shield className="w-6 h-6 mr-3" />
                    Focused on User Safety
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">File is processed locally or securely — not stored</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">Lightweight design with no tracking</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">Report is instantly downloadable, nothing saved</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">Transparency in how scans work — no hidden engines</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
