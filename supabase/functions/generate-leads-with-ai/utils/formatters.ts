import { SocialMedia } from '../types/lead';

export function formatWebsite(url: string): string {
  if (!url) return '';
  try {
    if (!url.startsWith('http')) {
      return `https://${url.replace(/^[/\\]+/, '')}`;
    }
    return url;
  } catch (error) {
    console.error('Erreur lors du formatage du site web:', url, error);
    return '';
  }
}

export function formatSocialUrl(url: string, platform: string): string {
  if (!url) return '';
  
  try {
    url = url.trim().toLowerCase();
    url = url.replace(/^[@/\\]+/, '');
    
    if (url.startsWith('http')) {
      return url;
    }
    
    const platformUrls = {
      linkedin: `https://linkedin.com/in/${url}`,
      twitter: `https://twitter.com/${url}`,
      facebook: `https://facebook.com/${url}`,
      instagram: `https://instagram.com/${url}`
    };

    return platformUrls[platform as keyof typeof platformUrls] || `https://${url}`;
  } catch (error) {
    console.error('Erreur lors du formatage de l\'URL sociale:', url, platform, error);
    return '';
  }
}

export function extractValue(line: string): string {
  try {
    const matches = line.match(/(?::|=|-)\s*([^,}\]]+)/);
    if (matches && matches[1]) {
      return matches[1].trim().replace(/['"]/g, '');
    }
    const words = line.split(/\s+/);
    return words.slice(1).join(' ').replace(/['"]/g, '');
  } catch (error) {
    console.error('Erreur lors de l\'extraction de la valeur:', line, error);
    return '';
  }
}