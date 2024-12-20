import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';
import { corsHeaders } from './cors.ts';
import { searchWithBrightData, buildSearchQuery } from './brightdata.ts';
import { insertLeadsAndUpdateProfile } from './database.ts';
import { SearchParams, LeadResult } from './types.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('Erreur: Pas d\'en-tête d\'autorisation');
      throw new Error('Missing Authorization header');
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    );

    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      console.error('Erreur d\'authentification:', userError);
      throw new Error(userError?.message || 'Unauthorized');
    }

    const searchParams: SearchParams = await req.json();
    console.log('Paramètres de recherche reçus:', searchParams);

    const searchQuery = buildSearchQuery(searchParams);
    console.log('Requête de recherche finale:', searchQuery);

    const organicResults = await searchWithBrightData(searchQuery, searchParams.leadCount);

    const leads: LeadResult[] = organicResults
      .slice(0, searchParams.leadCount)
      .map((result: any) => ({
        company: result.title.replace(/[-–—|].+$/, '').trim(),
        website: result.link,
        industry: searchParams.industry === 'all' ? 'Non spécifié' : searchParams.industry,
        user_id: user.id,
        qualification: 0,
        score: 0,
        social_media: {},
        strengths: [],
        weaknesses: [],
      }));

    console.log('Leads formatés:', leads);

    await insertLeadsAndUpdateProfile(supabaseClient, leads, user.id);

    return new Response(
      JSON.stringify({ success: true, leads }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Erreur générale:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});