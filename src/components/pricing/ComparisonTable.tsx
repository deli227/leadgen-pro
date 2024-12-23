import { Check, X } from "lucide-react"

export const ComparisonTable = () => {
  return (
    <div className="w-full max-w-4xl mx-auto overflow-x-auto">
      <div className="bg-black/40 backdrop-blur-sm border border-primary/20 rounded-xl p-2 sm:p-4">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Comparaison détaillée des solutions de prospection
        </h2>
        <div className="min-w-[600px] sm:min-w-0">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-primary/20">
                <th className="p-2 sm:p-4 text-left text-sm sm:text-base text-primary-light">Critères</th>
                <th className="p-2 sm:p-4 text-left text-sm sm:text-base text-primary-light">Notre solution</th>
                <th className="p-2 sm:p-4 text-left text-sm sm:text-base text-primary-light">Concurrent 1</th>
                <th className="p-2 sm:p-4 text-left text-sm sm:text-base text-primary-light">Concurrent 2</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-primary/10">
                <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-300">Prix (200 leads)</td>
                <td className="p-2 sm:p-4 text-xs sm:text-sm text-primary-light font-medium">24.99 €/mois (garantis)</td>
                <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-400">1 000 €/mois (volume estimé)</td>
                <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-400">1 200 €/mois (volume estimé)</td>
              </tr>
              <tr className="border-b border-primary/10">
                <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-300">Prix (500 leads)</td>
                <td className="p-2 sm:p-4 text-xs sm:text-sm text-primary-light font-medium">59.99 €/mois (garantis)</td>
                <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-400">1 500 €/mois (volume estimé)</td>
                <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-400">2 000 €/mois (volume estimé)</td>
              </tr>
              <tr className="border-b border-primary/10">
                <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-300">Analyse IA avancée</td>
                <td className="p-2 sm:p-4">
                  <div className="flex items-center text-emerald-500 text-xs sm:text-sm">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                    <span>Oui (chaque lead qualifié)</span>
                  </div>
                </td>
                <td className="p-2 sm:p-4">
                  <div className="flex items-center text-red-500 text-xs sm:text-sm">
                    <X className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                    <span>Non</span>
                  </div>
                </td>
                <td className="p-2 sm:p-4">
                  <div className="flex items-center text-red-500 text-xs sm:text-sm">
                    <X className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                    <span>Non</span>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-primary/10">
                <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-300">Volume garanti</td>
                <td className="p-2 sm:p-4">
                  <div className="flex items-center text-emerald-500 text-xs sm:text-sm">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                    <span>Oui (200 à 500 leads garantis)</span>
                  </div>
                </td>
                <td className="p-2 sm:p-4">
                  <div className="flex items-center text-red-500 text-xs sm:text-sm">
                    <X className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                    <span>Non</span>
                  </div>
                </td>
                <td className="p-2 sm:p-4">
                  <div className="flex items-center text-red-500 text-xs sm:text-sm">
                    <X className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                    <span>Non</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-300">Qualité des leads</td>
                <td className="p-2 sm:p-4">
                  <div className="flex items-center text-emerald-500 text-xs sm:text-sm">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                    <span>Très élevée et garantie</span>
                  </div>
                </td>
                <td className="p-2 sm:p-4">
                  <div className="flex items-center text-amber-500 text-xs sm:text-sm">
                    <span>Moyenne</span>
                  </div>
                </td>
                <td className="p-2 sm:p-4">
                  <div className="flex items-center text-red-500 text-xs sm:text-sm">
                    <span>Faible</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}