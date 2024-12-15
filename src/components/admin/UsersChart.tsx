import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts'

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
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
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
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary) / 0.1)" />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--primary-light) / 0.5)"
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.toLocaleDateString()} (${new Intl.DateTimeFormat('fr-FR', { weekday: 'short' }).format(date)})`;
              }}
            />
            <YAxis stroke="hsl(var(--primary-light) / 0.5)" />
            <ChartTooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                return (
                  <ChartTooltipContent
                    payload={payload}
                    nameKey="name"
                    labelKey="date"
                    labelFormatter={(value) => {
                      const date = new Date(value as string);
                      return `${date.toLocaleDateString()} (${new Intl.DateTimeFormat('fr-FR', { weekday: 'short' }).format(date)})`;
                    }}
                  />
                );
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
      </ResponsiveContainer>
    </div>
  )
}