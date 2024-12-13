import { supabase } from "@/integrations/supabase/client";

export async function getScrapingApiKey() {
  const { data, error } = await supabase
    .from('secrets')
    .select('value')
    .eq('name', 'scraping_api_key')
    .single();

  if (error) {
    console.error('Error fetching API key:', error);
    return null;
  }

  return data?.value;
}