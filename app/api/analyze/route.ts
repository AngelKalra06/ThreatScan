import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

// Move calculateEntropy outside POST
function calculateEntropy(buf: Buffer) {
  const freq = new Array(256).fill(0)
  for (let i = 0; i < buf.length; i++) freq[buf[i]]++
  let entropy = 0
  for (let i = 0; i < 256; i++) {
    if (freq[i] === 0) continue
    const p = freq[i] / buf.length
    entropy -= p * Math.log2(p)
  }
  return entropy
}

export async function POST(request: NextRequest) {
  try {
    // Set a higher limit for this specific route
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Check file size limit (100MB)
    const maxSize = 100 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File too large. Maximum size is 100MB." }, { status: 413 })
    }

    // Convert file to buffer for analysis
    let bytes: ArrayBuffer
    let buffer: Buffer
    
    try {
      bytes = await file.arrayBuffer()
      buffer = Buffer.from(bytes)
    } catch (error) {
      console.error("Error reading file:", error)
      return NextResponse.json({ error: "Error reading file. File may be corrupted or too large." }, { status: 500 })
    }

    // Generate SHA256 hash
    const hash = crypto.createHash("sha256").update(buffer).digest("hex")

    // Generate MD5 hash
    const md5 = crypto.createHash("md5").update(buffer).digest("hex")

    // Get MIME type if available
    let mimeType = file.type || "unknown"
    let fileType = "unknown"
    const extMatch = file.name.match(/\.([a-zA-Z0-9]+)$/)
    if (extMatch) {
      fileType = extMatch[1].toLowerCase()
    }

    // Upload time
    const uploadTime = new Date().toISOString()

    // Heuristic analysis
    const suspiciousIndicators: string[] = []
    const detectionRulesTriggered: string[] = []

    // Check if file is text-based or binary
    const isTextFile = ["txt", "log", "md", "json", "xml", "html", "css", "js", "py", "java", "c", "cpp", "h", "bat", "ps1", "sh"].includes(fileType)
    const isDocumentFile = ["doc", "docx", "pdf", "rtf"].includes(fileType)
    
    // Only perform string analysis on text-based files or if we can safely convert to string
    if (isTextFile || isDocumentFile) {
      try {
        const fileContent = buffer.toString("utf8")
        
        // Suspicious strings
        const suspiciousStrings = [
          "powershell",
          "cmd.exe",
          "base64",
          "eval",
          "exec",
          "system",
          "shell",
          "download",
          "http://",
          "ftp://",
          "bitcoin",
          "crypto",
          "taskkill",
          "system32",
          "admin",
          "reverse shell",
          "nc.exe",
          "/bin/sh",
          "bash -i",
          "whoami",
          "net user",
          "reg add",
          "reg delete",
          "schtasks",
          "at.exe",
          "sc.exe",
          "wmic",
          "vssadmin",
          "bypass",
          "encodedcommand",
          "-enc",
          "Invoke-Expression",
          "Invoke-WebRequest"
        ]
        
        suspiciousStrings.forEach((str) => {
          if (fileContent.toLowerCase().includes(str)) {
            suspiciousIndicators.push(`Contains suspicious string: ${str}`)
            detectionRulesTriggered.push("SUSPICIOUS_STRING_DETECTED")
          }
        })

        // System folder/admin tool usage
        if (fileContent.toLowerCase().includes("system32")) {
          suspiciousIndicators.push("Access to system32 folder")
          detectionRulesTriggered.push("SYSTEM_FOLDER_ACCESS")
        }
        if (fileContent.toLowerCase().includes("taskkill")) {
          suspiciousIndicators.push("Uses 'taskkill' command")
          detectionRulesTriggered.push("ADMIN_TOOL_USAGE")
        }
      } catch (error) {
        console.warn("Could not analyze file content as text:", error)
        // Continue with other analysis methods
      }
    }

    // Calculate entropy safely
    let entropy = 0
    try {
      entropy = calculateEntropy(buffer)
      if (entropy > 7.5) {
        suspiciousIndicators.push("High file entropy (possible obfuscation or packed binary)")
        detectionRulesTriggered.push("HIGH_ENTROPY_DETECTED")
      }
    } catch (error) {
      console.warn("Could not calculate entropy:", error)
      // Continue without entropy analysis
    }

    // Threat scoring
    let threatScore = 0
    if (["exe", "dll", "scr", "bat", "cmd", "pif", "com"].includes(fileType)) threatScore += 30
    if (file.size < 1024) threatScore += 10
    if (file.size > 50 * 1024 * 1024) threatScore += 10
    threatScore += suspiciousIndicators.length * 10
    if (entropy > 7.5) threatScore += 10
    if (detectionRulesTriggered.length > 0) threatScore += detectionRulesTriggered.length * 5
    if (threatScore > 100) threatScore = 100

    let threatLevel: "clean" | "suspicious" | "malicious" = "clean"
    if (threatScore >= 70) threatLevel = "malicious"
    else if (threatScore >= 30) threatLevel = "suspicious"

    // Recommendation
    let recommendation = "No obvious threats detected in the file. However, proceed with caution if you do not trust the source."
    if (threatLevel === "malicious") recommendation = "Do not run this file. It is likely malware."
    else if (threatLevel === "suspicious") recommendation = "File may be suspicious. Analyze further before running."

    // Optional: External report link (mock)
    let externalReportLink = undefined
    if (threatScore > 50) {
      externalReportLink = `https://www.virustotal.com/gui/file/${hash}`
    }

    // Build response
    const response = {
      file_name: file.name,
      sha256: hash,
      md5: md5,
      file_size: `${(file.size / 1024).toFixed(2)} KB`,
      file_type: fileType,
      mime_type: mimeType,
      upload_time: uploadTime,
      threat_score: threatScore,
      threat_level: threatLevel,
      suspicious_indicators: suspiciousIndicators,
      detection_rules_triggered: detectionRulesTriggered,
      recommendation,
      external_report_link: externalReportLink,
    }

    // Store the report for later retrieval
    try {
      const reportData = {
        ...response,
        scanTime: uploadTime,
        id: hash,
      }
      const { storeReport } = await import("../report/utils")
      storeReport(hash, reportData)
    } catch (error) {
      console.warn("Could not store report:", error)
      // Continue without storing report
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 })
  }
}
