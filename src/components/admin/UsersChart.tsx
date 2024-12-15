import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Legend } from 'recharts'

interface ChartData {
  date: string
  users: number
  waitlist: number
}

interface UsersChartProps {
  data: ChartData[]
}

export function UsersChart({ data }: UsersChartProps) {
  return (
    <div className="h-[400px]">
      <ChartContainer
        config={{
          users: {
            theme: {
              light: "hsl(var(--primary))",
              dark: "hsl(var(--primary))",
            },
          },
          waitlist: {
            theme: {
              light: "hsl(var(--accent))",
              dark: "hsl(var(--accent))",
            },
          },
        }}
      >
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary) / 0.1)" />
          <XAxis
            dataKey="date"
            stroke="hsl(var(--primary-light) / 0.5)"
            tickFormatter={(value) => new Date(value).toLocaleDateString()}
          />
          <YAxis stroke="hsl(var(--primary-light) / 0.5)" />
          <ChartTooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null
              return (
                <ChartTooltipContent
                  payload={payload}
                  nameKey="name"
                  labelKey="date"
                  labelFormatter={(value) => new Date(value as string).toLocaleDateString()}
                />
              )
            }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="users"
            name="Utilisateurs"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary) / 0.2)"
          />
          <Area
            type="monotone"
            dataKey="waitlist"
            name="Waitlist"
            stroke="hsl(var(--accent))"
            fill="hsl(var(--accent) / 0.2)"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}