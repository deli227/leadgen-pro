export const extractJSONFromText = (text: string): any => {
  console.log('Texte reçu de Perplexity:', text);
  
  try {
    const start = text.indexOf('[');
    const end = text.lastIndexOf(']') + 1;
    
    if (start === -1 || end === 0) {
      console.error('Aucun tableau JSON trouvé dans la réponse');
      throw new Error('Format de réponse invalide');
    }
    
    const jsonStr = text.slice(start, end);
    console.log('JSON extrait:', jsonStr);
    
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('Erreur lors de l\'extraction du JSON:', error);
    throw new Error('Format de réponse invalide');
  }
}