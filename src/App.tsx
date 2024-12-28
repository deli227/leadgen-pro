import { Routes, Route } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster"
import { Dashboard } from "@/pages/Dashboard"
import { Documentation } from "@/pages/Documentation"
import { Auth } from "@/pages/Auth"
import { AdminDashboard } from "@/pages/AdminDashboard"
import Index from "@/pages/Index"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App