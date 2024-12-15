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
    <div className="h-[400px] w-full p-6 bg-black/40 rounded-lg border border-primary/20">
      <h2 className="text-xl font-semibold text-primary-light mb-4">Évolution des inscriptions</h2>
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
            <defs>
              <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="waitlistGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--primary) / 0.1)" />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--primary-light) / 0.5)"
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.toLocaleDateString()} (${new Intl.DateTimeFormat('fr-FR', { weekday: 'short' }).format(date)})`;
              }}
              tick={{ fill: 'hsl(var(--primary-light) / 0.7)' }}
            />
            <YAxis 
              stroke="hsl(var(--primary-light) / 0.5)"
              tick={{ fill: 'hsl(var(--primary-light) / 0.7)' }}
            />
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
            <Legend 
              wrapperStyle={{ 
                paddingTop: '20px',
                color: 'hsl(var(--primary-light))'
              }}
            />
            <Area
              type="monotone"
              dataKey="users"
              name="Utilisateurs"
              stroke="hsl(var(--primary))"
              fill="url(#usersGradient)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="waitlist"
              name="Waitlist"
              stroke="hsl(var(--accent))"
              fill="url(#waitlistGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </ResponsiveContainer>
    </div>
  )
}