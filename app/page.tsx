"use client"

import React, { useState } from "react"
import { useRequireAuth, useAuth } from "@/app/context/AuthContext"
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
  Linkedin,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { jsPDF } from "jspdf"

export default function ThreatScanApp() {
  useRequireAuth()
  const { userId } = useAuth()
  // Note: Avoid early returns before declaring all hooks to keep hook order stable
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
    if (!userId) return
    const storedHistory = localStorage.getItem(`reportsHistory_${userId}`)
    if (storedHistory) {
      setReportsHistory(JSON.parse(storedHistory))
    }
  }, [userId])

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
    const maxSize = 100 * 1024 * 1024 // 100MB
    if (selectedFile.size > maxSize) {
      alert("File size too large. Please upload a file smaller than 100MB.")
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
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }))
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      clearInterval(progressInterval)
      setProgress(100)

      setAnalysisResult(result)

      if (!userId) return

      // Save full report to localStorage with user-specific key
      localStorage.setItem(
        `report_${userId}_${result.hash}`,
        JSON.stringify(result)
      )

      // Update reports history in localStorage with user-specific key
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
      localStorage.setItem(`reportsHistory_${userId}`, JSON.stringify(updatedHistory))
    } catch (error) {
      console.error("Analysis failed:", error)
      clearInterval(progressInterval)
      setProgress(0)
      
      // Show more specific error message
      let errorMessage = "Analysis failed. Please try again."
      if (error instanceof Error) {
        errorMessage = error.message || errorMessage
      }
      alert(errorMessage)
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
          {/* Centered Scanner Card */}
          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
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
                            {/* Precautions Section */}
                            {analysisResult.precautions && analysisResult.precautions.length > 0 && (
                              <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                                <h4 className="text-amber-400 font-bold text-lg mb-4 flex items-center">
                                  <AlertTriangle className="w-5 h-5 mr-2" />
                                  Important Precautions
                                </h4>
                                <ul className="space-y-2">
                                  {analysisResult.precautions.map((precaution: string, idx: number) => (
                                    <li key={idx} className="flex items-start space-x-3 text-amber-300">
                                      <span className="text-amber-400 mt-1.5">⚠</span>
                                      <span>{precaution}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {/* Countermeasures Section */}
                            {analysisResult.countermeasures && analysisResult.countermeasures.length > 0 && (
                              <div className="p-6 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                                <h4 className="text-cyan-400 font-bold text-lg mb-4 flex items-center">
                                  <Shield className="w-5 h-5 mr-2" />
                                  Recommended Countermeasures
                                </h4>
                                <ul className="space-y-2">
                                  {analysisResult.countermeasures.map((countermeasure: string, idx: number) => (
                                    <li key={idx} className="flex items-start space-x-3 text-cyan-300">
                                      <Shield className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                                      <span>{countermeasure}</span>
                                    </li>
                                  ))}
                                </ul>
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
                                    '',
                                    'IMPORTANT PRECAUTIONS:',
                                    ...(analysisResult.precautions?.length > 0 ? analysisResult.precautions.map((p: string) => `⚠ ${p}`) : ['None specified']),
                                    '',
                                    'RECOMMENDED COUNTERMEASURES:',
                                    ...(analysisResult.countermeasures?.length > 0 ? analysisResult.countermeasures.map((c: string) => `✓ ${c}`) : ['None specified']),
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
                                  const doc = new jsPDF() as any
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
                                  y = y + 20
                                  doc.setFontSize(12)
                                  doc.setTextColor(255, 193, 7)
                                  doc.text('IMPORTANT PRECAUTIONS:', 10, y)
                                  doc.setFont('helvetica', 'normal')
                                  doc.setTextColor(40, 40, 40)
                                  ;(analysisResult.precautions || []).forEach((p: string, i: number) => {
                                    doc.text(`⚠ ${p}`, 14, y + 10 + i * 8)
                                  })
                                  y = y + 10 + (analysisResult.precautions?.length || 0) * 8 + 10
                                  doc.setFontSize(12)
                                  doc.setTextColor(0, 153, 255)
                                  doc.text('RECOMMENDED COUNTERMEASURES:', 10, y)
                                  doc.setFont('helvetica', 'normal')
                                  doc.setTextColor(40, 40, 40)
                                  ;(analysisResult.countermeasures || []).forEach((c: string, i: number) => {
                                    doc.text(`✓ ${c}`, 14, y + 10 + i * 8)
                                  })
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

      {/* Reports Section removed for Scan page */}

      {/* About Section removed for Scan page */}
    </div>
  )
}
