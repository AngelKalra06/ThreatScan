"use client"

import { Shield, Users, Award, Globe, CheckCircle, ArrowLeft, Search, BarChart3, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
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
                    className="flex items-center space-x-4 px-6 py-4 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/20 border border-transparent rounded-xl transition-all duration-200 backdrop-blur-sm"
                  >
                    <BarChart3 className="w-5 h-5" />
                    <span>Reports</span>
                  </Link>
                  <Link
                    href="/about"
                    className="flex items-center space-x-4 px-6 py-4 text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-xl font-medium backdrop-blur-sm shadow-lg"
                  >
                    <Users className="w-5 h-5" />
                    <span>About</span>
                  </Link>
                </nav>

                {/* Back Button */}
                <div className="mb-6">
                  <Link href="/">
                    <Button
                      variant="outline"
                      className="w-full border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 bg-transparent backdrop-blur-sm"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Scanner
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9">
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-white mb-6">About ThreatScan</h1>
                <p className="text-gray-300 text-xl max-w-4xl mx-auto leading-relaxed">
                  Leading the cybersecurity revolution with cutting-edge malware detection technology and advanced
                  threat intelligence systems.
                </p>
              </div>

              {/* Mission Section */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-2xl mb-12">
                <CardContent className="p-12">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-turquoise-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                      <Shield className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
                    <p className="text-gray-300 text-lg max-w-4xl mx-auto leading-relaxed">
                      ThreatScan is dedicated to providing enterprise-grade malware detection and threat analysis
                      services to organizations worldwide. We leverage advanced AI, machine learning, and behavioral
                      analysis to identify and neutralize sophisticated cyber threats before they can cause damage.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Section */}
              <div className="grid md:grid-cols-4 gap-6 mb-12">
                <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-center shadow-xl">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-cyan-400 mb-2">10M+</div>
                    <p className="text-gray-300">Files Analyzed</p>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-center shadow-xl">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-red-400 mb-2">500K+</div>
                    <p className="text-gray-300">Threats Detected</p>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-center shadow-xl">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-emerald-400 mb-2">150+</div>
                    <p className="text-gray-300">Countries Protected</p>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-center shadow-xl">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-cyan-400 mb-2">99.9%</div>
                    <p className="text-gray-300">Detection Rate</p>
                  </CardContent>
                </Card>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3 text-white">
                      <div className="p-2 bg-cyan-500/20 rounded-lg">
                        <Users className="w-6 h-6 text-cyan-400" />
                      </div>
                      <span>Expert Security Team</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 leading-relaxed">
                      Our team consists of world-class cybersecurity experts, malware researchers, and AI specialists
                      with decades of combined experience in advanced threat detection and analysis.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3 text-white">
                      <div className="p-2 bg-cyan-500/20 rounded-lg">
                        <Award className="w-6 h-6 text-cyan-400" />
                      </div>
                      <span>Industry Recognition</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 leading-relaxed">
                      Recognized by leading cybersecurity organizations and trusted by Fortune 500 companies worldwide
                      for our innovative threat detection capabilities and zero-day protection.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3 text-white">
                      <div className="p-2 bg-cyan-500/20 rounded-lg">
                        <Globe className="w-6 h-6 text-cyan-400" />
                      </div>
                      <span>Global Threat Intelligence</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 leading-relaxed">
                      Our global threat intelligence network spans across continents, providing real-time updates on
                      emerging threats and ensuring comprehensive protection against the latest attack vectors.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3 text-white">
                      <div className="p-2 bg-cyan-500/20 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-cyan-400" />
                      </div>
                      <span>Proven Excellence</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 leading-relaxed">
                      With over 10 million files analyzed and 500,000 threats neutralized, our track record speaks for
                      itself. We consistently deliver industry-leading detection rates and minimal false positives.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Technology Section */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-2xl mb-12">
                <CardContent className="p-12">
                  <h2 className="text-4xl font-bold text-white mb-8 text-center">Advanced Technology Stack</h2>
                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      <h3 className="text-2xl font-semibold text-cyan-400 mb-6 flex items-center">
                        <Zap className="w-6 h-6 mr-3" />
                        Detection Engines
                      </h3>
                      <ul className="space-y-4">
                        <li className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                          <span className="text-gray-300">
                            AI-powered behavioral analysis with deep learning models
                          </span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                          <span className="text-gray-300">Multi-signature scanning with 100+ detection engines</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                          <span className="text-gray-300">Advanced heuristic analysis for zero-day detection</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                          <span className="text-gray-300">Real-time threat intelligence integration</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-cyan-400 mb-6 flex items-center">
                        <Shield className="w-6 h-6 mr-3" />
                        Security & Privacy
                      </h3>
                      <ul className="space-y-4">
                        <li className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                          <span className="text-gray-300">End-to-end encryption for all file transfers</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                          <span className="text-gray-300">Automatic secure file deletion after analysis</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                          <span className="text-gray-300">Zero data retention policy for maximum privacy</span>
                        </li>
                        <li className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                          <span className="text-gray-300">SOC 2 Type II and ISO 27001 certified infrastructure</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Section */}
              <Card className="bg-gradient-to-r from-cyan-500 to-turquoise-500 text-white border-0 shadow-2xl">
                <CardContent className="p-12 text-center">
                  <h2 className="text-4xl font-bold mb-6">Enterprise Security Solutions</h2>
                  <p className="text-cyan-100 mb-10 max-w-3xl mx-auto text-lg leading-relaxed">
                    Ready to protect your organization with enterprise-grade malware detection? Our security experts are
                    standing by to design a custom solution for your specific needs.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Button className="bg-white text-cyan-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-xl shadow-lg">
                      Contact Security Team
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-cyan-600 bg-transparent px-8 py-3 text-lg font-semibold rounded-xl"
                    >
                      Request Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
