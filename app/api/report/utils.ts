// In a real application, this would be stored in a database
// For now, we'll simulate a report storage
const mockReports = new Map()

// Helper function to store reports (called from analyze endpoint)
export function storeReport(hash: string, reportData: any) {
  mockReports.set(hash, reportData)
}

// Helper function to get reports
export function getReport(hash: string) {
  return mockReports.get(hash)
}

// Helper function to check if report exists
export function hasReport(hash: string) {
  return mockReports.has(hash)
} 