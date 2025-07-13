import { type NextRequest, NextResponse } from "next/server"

// In a real application, this would be stored in a database
// For now, we'll simulate a report storage
const mockReports = new Map()

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reportId = params.id

    // In a real app, you would fetch from database
    // For demo purposes, we'll check if we have a report for this hash
    // and return a mock report if not found
    
    // Check if we have a stored report
    if (mockReports.has(reportId)) {
      const report = mockReports.get(reportId)
      return NextResponse.json(report)
    }

    // If no stored report, return a mock report for demo purposes
    // In production, you would return 404
    const mockReport = {
      id: reportId,
      fileName: "sample_file.exe",
      fileSize: "2.5 MB",
      fileType: "application/x-msdownload",
      hash: reportId,
      threatLevel: "suspicious" as const,
      threatScore: 65,
      suspiciousIndicators: [
        "Contains obfuscated PowerShell commands",
        "Attempts to access system registry",
        "Makes network requests to suspicious domains",
        "Uses base64 encoding for payload delivery"
      ],
      scanTime: new Date().toISOString(),
      uploadTime: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
    }

    return NextResponse.json(mockReport)
  } catch (error) {
    console.error("Error fetching report:", error)
    return NextResponse.json(
      { error: "Failed to fetch report" },
      { status: 500 }
    )
  }
}

// Helper function to store reports (called from analyze endpoint)
function storeReport(hash: string, reportData: any) {
  mockReports.set(hash, reportData)
}

// Export the function through a separate object to avoid Next.js route conflicts
export const reportUtils = {
  storeReport
} 