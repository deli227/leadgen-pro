import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Database, Mail, Phone, Globe, Search, Brain, TrendingUp } from "lucide-react";

export const DataAnalyticsSection = () => {
  const data = [
    { name: "Emails", value: 30, color: "#9b87f5" },
    { name: "Téléphones", value: 25, color: "#F97316" },
    { name: "Sites Web", value: 20, color: "#7E69AB" },
    { name: "Réseaux Sociaux", value: 25, color: "#6E59A5" },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-secondary-dark/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary/20 shadow-xl">
          <p className="text-white font-medium">{`${payload[0].name}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="relative py-12 sm:py-24 bg-gradient-to-br from-secondary-dark to-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.6)_100%)]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl animate-pulse" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative h-[300px] sm:h-[400px] w-full order-2 lg:order-1"
          >
            <div className="absolute inset-0 bg-secondary-dark/30 backdrop-blur-sm rounded-xl border border-primary/10 shadow-lg">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={Math.min(100, window.innerWidth * 0.2)}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                    labelLine={false}
                  >
                    {data.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>

              {/* Icons around the chart */}
              <div className="absolute inset-0 pointer-events-none">
                <Mail className="absolute top-8 sm:top-12 left-8 sm:left-12 w-6 h-6 sm:w-8 sm:h-8 text-primary animate-pulse" />
                <Phone className="absolute top-8 sm:top-12 right-8 sm:right-12 w-6 h-6 sm:w-8 sm:h-8 text-accent animate-pulse" />
                <Globe className="absolute bottom-8 sm:bottom-12 left-8 sm:left-12 w-6 h-6 sm:w-8 sm:h-8 text-primary-dark animate-pulse" />
                <Search className="absolute bottom-8 sm:bottom-12 right-8 sm:right-12 w-6 h-6 sm:w-8 sm:h-8 text-primary-light animate-pulse" />
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8 order-1 lg:order-2 px-2 sm:px-4"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent">
              Données Complètes, Décisions Éclairées
            </h2>
            
            <div className="space-y-4 sm:space-y-6 text-gray-300">
              <div className="flex items-start gap-3 sm:gap-4">
                <Database className="w-5 h-5 sm:w-6 sm:h-6 text-primary mt-1 flex-shrink-0" />
                <p className="text-base sm:text-lg">
                  Accédez à des informations complètes sur vos leads : emails directs, numéros de téléphone, 
                  sites internet et tous leurs réseaux sociaux.
                </p>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4">
                <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-primary mt-1 flex-shrink-0" />
                <p className="text-base sm:text-lg">
                  Ensuite lancez l'analyse avec notre IA avancée qui scanne, analyse et identifie les meilleures opportunités pour vous 
                  en quelques secondes.
                </p>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary mt-1 flex-shrink-0" />
                <p className="text-base sm:text-lg">
                  Prenez des décisions stratégiques en un temps record et voyez vos conversions décoller.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};