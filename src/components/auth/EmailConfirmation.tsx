export function EmailConfirmation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-dark to-[#1A1F2C] flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <h2 className="text-xl font-semibold text-primary-light">Confirmation de votre email en cours...</h2>
        <p className="text-primary-light/70">Veuillez patienter pendant que nous vérifions votre email.</p>
      </div>
    </div>
  )
}