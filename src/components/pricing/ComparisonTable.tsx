import { Check, X } from "lucide-react"

export const ComparisonTable = () => {
  return (
    <div className="w-full max-w-4xl mx-auto overflow-x-auto">
      <div className="bg-black/40 backdrop-blur-sm border border-primary/20 rounded-xl p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-primary/20">
              <th className="p-4 text-left text-primary-light">Critères</th>
              <th className="p-4 text-left text-primary-light">Notre solution</th>
              <th className="p-4 text-left text-primary-light">Concurrent 1</th>
              <th className="p-4 text-left text-primary-light">Concurrent 2</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-primary/10">
              <td className="p-4 text-gray-300">Prix (200 leads)</td>
              <td className="p-4 text-primary-light font-medium">24.99 €/mois (garantis)</td>
              <td className="p-4 text-gray-400">~50 €/mois (non qualifiés)</td>
              <td className="p-4 text-gray-400">~60 €/mois (non qualifiés)</td>
            </tr>
            <tr className="border-b border-primary/10">
              <td className="p-4 text-gray-300">Prix (500 leads)</td>
              <td className="p-4 text-primary-light font-medium">59.99 €/mois (garantis)</td>
              <td className="p-4 text-gray-400">~300 €/mois (non qualifiés)</td>
              <td className="p-4 text-gray-400">~400 €/mois (non qualifiés)</td>
            </tr>
            <tr className="border-b border-primary/10">
              <td className="p-4 text-gray-300">Analyse IA avancée</td>
              <td className="p-4">
                <div className="flex items-center text-emerald-500">
                  <Check className="w-5 h-5 mr-2" />
                  <span>Oui (chaque lead qualifié)</span>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center text-red-500">
                  <X className="w-5 h-5 mr-2" />
                  <span>Non</span>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center text-red-500">
                  <X className="w-5 h-5 mr-2" />
                  <span>Non</span>
                </div>
              </td>
            </tr>
            <tr className="border-b border-primary/10">
              <td className="p-4 text-gray-300">Volume garanti</td>
              <td className="p-4">
                <div className="flex items-center text-emerald-500">
                  <Check className="w-5 h-5 mr-2" />
                  <span>Oui (200 à 500 leads garantis)</span>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center text-red-500">
                  <X className="w-5 h-5 mr-2" />
                  <span>Non</span>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center text-red-500">
                  <X className="w-5 h-5 mr-2" />
                  <span>Non</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="p-4 text-gray-300">Qualité des leads</td>
              <td className="p-4">
                <div className="flex items-center text-emerald-500">
                  <Check className="w-5 h-5 mr-2" />
                  <span>Très élevée et garantie</span>
                </div>
              </td>
              <td className="p-4 text-amber-500">Moyenne</td>
              <td className="p-4 text-red-500">Faible</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}