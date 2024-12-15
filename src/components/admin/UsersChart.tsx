import { Card } from "@/components/ui/card"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface ChartData {
  date: string
  users: number
  waitlist: number
}

interface UsersChartProps {
  data: ChartData[]
}

export function UsersChart({ data }: UsersChartProps) {
  const formatDate = (dateString: string) => {
    try {
      // S'assurer que la date est valide
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        console.error('Date invalide:', dateString);
        return 'Date invalide';
      }
      
      // Formater la date en français
      return new Intl.DateTimeFormat('fr-FR', {
        day: 'numeric',
        month: 'short',
        weekday: 'short'
      }).format(date);
    } catch (error) {
      console.error('Erreur lors du formatage de la date:', error);
      return 'Date invalide';
    }
  };

  return (
    <div className="h-[400px] w-full p-6 bg-black/40 rounded-lg border border-primary/20">
      <h2 className="text-xl font-semibold text-primary-light mb-4">Évolution des inscriptions</h2>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="users" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="hsl(var(--primary))"
                stopOpacity={0.5}
              />
              <stop
                offset="100%"
                stopColor="hsl(var(--primary))"
                stopOpacity={0}
              />
            </linearGradient>
            <linearGradient id="waitlist" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="hsl(var(--accent))"
                stopOpacity={0.5}
              />
              <stop
                offset="100%"
                stopColor="hsl(var(--accent))"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            stroke="hsl(var(--primary-light) / 0.5)"
            tickFormatter={formatDate}
            tick={{ fill: 'hsl(var(--primary-light) / 0.7)' }}
          />
          <YAxis
            stroke="hsl(var(--primary-light) / 0.5)"
            tick={{ fill: 'hsl(var(--primary-light) / 0.7)' }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Date
                        </span>
                        <span className="font-bold text-muted-foreground">
                          {formatDate(payload[0].payload.date)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Utilisateurs
                        </span>
                        <span className="font-bold">
                          {payload[0].value}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Liste d'attente
                        </span>
                        <span className="font-bold">
                          {payload[1].value}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Area
            type="monotone"
            dataKey="users"
            stroke="hsl(var(--primary))"
            fillOpacity={1}
            fill="url(#users)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="waitlist"
            stroke="hsl(var(--accent))"
            fillOpacity={1}
            fill="url(#waitlist)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}