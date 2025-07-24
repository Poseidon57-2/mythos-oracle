import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, transcribedText } = await req.json();
    
    // Verify the secret token
    const verMaisToken = Deno.env.get('VER_MAIS_POSEIDON');
    const authHeader = req.headers.get('Authorization');
    
    if (!authHeader || !authHeader.includes(verMaisToken)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'get_poseidon') {
      // Create Supabase client with service role for server access
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      );

      const { data: poseidon, error } = await supabase
        .from('entidades_mitologicas')
        .select('*')
        .eq('nome', 'Poseidon')
        .maybeSingle();

      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }

      if (!poseidon) {
        return new Response(JSON.stringify({ error: 'Poseidon not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ poseidon }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'get_curiosity' && transcribedText) {
      const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
      
      if (!GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is not configured');
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ 
              parts: [{ 
                text: `Como especialista em mitologia grega, conte uma curiosidade interessante sobre Poseidon relacionada a: "${transcribedText}". Responda em português brasileiro, de forma educativa e envolvente, em no máximo 150 palavras.` 
              }] 
            }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 200
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${await response.text()}`);
      }

      const data = await response.json();
      const curiosity = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Não foi possível gerar uma curiosidade no momento.';

      return new Response(JSON.stringify({ curiosity }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in poseidon-details function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});