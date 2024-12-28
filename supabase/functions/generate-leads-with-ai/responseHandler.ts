export const extractJSONFromText = (text: string): any => {
  console.log('Extraction du JSON depuis le texte:', text);
  
  try {
    // Recherche du premier crochet ouvrant et du dernier crochet fermant
    const start = text.indexOf('[');
    const end = text.lastIndexOf(']') + 1;
    
    if (start === -1 || end === 0) {
      console.error('Aucun tableau JSON trouvé dans la réponse');
      throw new Error('Format de réponse invalide');
    }
    
    const jsonStr = text.slice(start, end);
    console.log('JSON extrait:', jsonStr);
    
    const parsedData = JSON.parse(jsonStr);
    
    if (!Array.isArray(parsedData)) {
      throw new Error('Le JSON extrait n\'est pas un tableau');
    }
    
    return parsedData;
  } catch (error) {
    console.error('Erreur lors de l\'extraction du JSON:', error);
    throw new Error('Format de réponse invalide');
  }
}