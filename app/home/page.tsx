"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Award, Globe, CheckCircle, Zap, Shield, Linkedin, Mail } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <div id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Brand moved from Scan */}
          <div className="bg-gradient-to-r from-cyan-500 to-cyan-400 p-6 rounded-2xl mb-8 shadow-xl w-fit mx-auto">
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
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">ThreatScan</h2>
            <p className="text-gray-300 text-xl max-w-4xl mx-auto leading-relaxed">
            ThreatScan is a modern web-based tool that helps users detect malware in files quickly and easily. It’s designed for learners, developers, and anyone curious about how malware behaves. It offers a fast and simple way to scan, assess, and download detailed threat reports.
            

      
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
                <div className="space-y-6 text-center">
                  <div className="flex items-center justify-center space-x-3">
                    <a 
                      href="https://www.linkedin.com/in/angel-kaur-kalra-1203532b0/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center space-x-2"
                    >
                      <span className="text-gray-300 font-bold text-xl">Angel Kaur Kalra</span>
                      <Linkedin className="w-6 h-6" />
                    </a>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <a 
                      href="mailto:kaurkalra041@gmail.com" 
                      className="text-cyan-400 hover:text-cyan-300 transition-colors text-lg font-semibold"
                    >
                      kaurkalra041@gmail.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-white">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <Award className="w-6 h-6 text-cyan-400" />
                  </div>
                  <span>How It Works</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">
                ThreatScan analyzes uploaded files using heuristic rules and static inspection. It checks for suspicious patterns, risky code, and known threat indicators. Each file receives a threat score and status - Clean, Suspicious, or Malicious along with a downloadable report for quick, clear insights.


                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-white">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <Globe className="w-6 h-6 text-cyan-400" />
                  </div>
                  <span>Tech Stack</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-300 leading-relaxed space-y-2 text-center">
                  <li className="flex items-center justify-center space-x-2">
                    <span className="text-cyan-400 font-semibold">Frontend:</span>
                    <span>TypeScript, JavaScript, Next.js 15</span>
                  </li>
                  <li className="flex items-center justify-center space-x-2">
                    <span className="text-cyan-400 font-semibold">Styling:</span>
                    <span>Tailwind CSS</span>
                  </li>
                  <li className="flex items-center justify-center space-x-2">
                    <span className="text-cyan-400 font-semibold">UI Components:</span>
                    <span>shadcn/ui</span>
                  </li>
                  <li className="flex items-center justify-center space-x-2">
                    <span className="text-cyan-400 font-semibold">Icons:</span>
                    <span>Lucide React</span>
                  </li>
                  <li className="flex items-center justify-center space-x-2">
                    <span className="text-cyan-400 font-semibold">Deployment:</span>
                    <span>Vercel</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-white">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-cyan-400" />
                  </div>
                  <span>Motivation</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">
                  I built ThreatScan to combine my interest in cybersecurity with hands-on web development. The goal was to create a simple tool that helps users understand file-based threats without needing advanced technical knowledge. It's a learning project turned into something practical.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Key Features Section */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-2xl">
            <CardContent className="p-12">
              <h3 className="text-4xl font-bold text-white mb-8 text-center">Key Features</h3>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h4 className="text-2xl font-semibold text-cyan-400 mb-6 flex items-center">
                    <Zap className="w-6 h-6 mr-3" />
                    Core Functionality
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">File Upload Interface – Drag & drop or browse to upload suspicious files</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">Real-Time Scanning – Progress-tracked threat analysis on the spot</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">Threat Categorization – Clean, Suspicious, or Malicious status</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">Threat Score – Accurate scoring from 0–100 with visual indicators</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-2xl font-semibold text-cyan-400 mb-6 flex items-center">
                    <Shield className="w-6 h-6 mr-3" />
                    Advanced Features
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">Heuristic Analysis – Detects encoded payloads, reverse shells, suspicious strings</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">Detailed Reports – Downloadable TXT & PDF reports with full scan details</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">Dark Cyber UI – Built with a green-black gradient design</span>
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


