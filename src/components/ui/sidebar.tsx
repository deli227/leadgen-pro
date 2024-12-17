import * as React from "react"
import { useMobile } from "@/hooks/use-mobile"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, ...props }: SidebarProps) {
  const isMobile = useMobile()

  return (
    <div className={className} {...props}>
      <nav className={`flex flex-col ${isMobile ? 'mobile-class' : 'desktop-class'}`}>
        <ul>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/admin-dashboard">Admin Dashboard</a></li>
          <li><a href="/auth">Login</a></li>
        </ul>
      </nav>
    </div>
  )
}
