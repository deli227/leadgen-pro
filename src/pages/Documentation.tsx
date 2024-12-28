import { DocumentationSection } from "@/components/DocumentationSection"

export function Documentation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-dark via-[#1A1F2C] to-black">
      <div className="container mx-auto py-8 px-4">
        <DocumentationSection />
      </div>
    </div>
  )
}