import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface RequestBody {
  nome?: string;
  type?: 'god' | 'blog' | 'primordial' | 'minor';
  id?: string;
  action?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { nome, type = 'god', id, action }: RequestBody = await req.json()
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Handle blog post requests
    if (type === 'blog') {
      // List all blog posts
      if (action === 'list') {
        const { data: posts, error } = await supabase
          .from('posts_blog')
          .select('id, titulo, resumo, data_publicacao, tags')
          .order('data_publicacao', { ascending: false })

        if (error) {
          console.error('Erro do Supabase (blog list):', error)
          return new Response(
            JSON.stringify({ error: 'Erro ao buscar posts' }),
            { 
              status: 500, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        }

        return new Response(
          JSON.stringify({ posts }),
          { 
            status: 200, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      // Get specific blog post
      if (!id) {
        return new Response(
          JSON.stringify({ error: 'ID é obrigatório para posts do blog' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      const { data: post, error } = await supabase
        .from('posts_blog')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Erro do Supabase (blog):', error)
        return new Response(
          JSON.stringify({ error: 'Post não encontrado' }),
          { 
            status: 404, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      return new Response(
        JSON.stringify({ post }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Handle primordial entity requests
    if (type === 'primordial') {
      // List all primordial entities
      if (action === 'list') {
        const { data: primordials, error } = await supabase
          .from('primordiais')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Erro do Supabase (primordials list):', error)
          return new Response(
            JSON.stringify({ error: 'Erro ao buscar primordiais' }),
            { 
              status: 500, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        }

        return new Response(
          JSON.stringify(primordials),
          { 
            status: 200, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      // Get specific primordial entity
      if (!nome) {
        return new Response(
          JSON.stringify({ error: 'Nome é obrigatório para primordiais' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      const { data: primordials, error } = await supabase
        .from('primordiais')
        .select('*')
        .ilike('nome', `%${nome}%`)

      if (error) {
        console.error('Erro do Supabase (primordial):', error)
        return new Response(
          JSON.stringify({ error: 'Primordial não encontrado' }),
          { 
            status: 404, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      // Usar Gemini para gerar conteúdo adicional se necessário
      const geminiApiKey = Deno.env.get('VER_MAIS_PRIMORDIAIS')
      if (geminiApiKey && primordials.length > 0) {
        const primordial = primordials[0]
        if (!primordial.descricao || primordial.descricao.length < 100) {
          try {
            const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                contents: [{
                  parts: [{
                    text: `Gere uma descrição completa, poderes, domínios, símbolos sobre o ser primordial da mitologia grega ${nome}, em tom educativo e clássico. Formate a resposta em JSON com as propriedades: descricao, poderes, dominios, simbolos.`
                  }]
                }],
                generationConfig: {
                  temperature: 0.7,
                  maxOutputTokens: 1000,
                }
              })
            })

            if (geminiResponse.ok) {
              const geminiData = await geminiResponse.json()
              const generatedText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text
              
              if (generatedText) {
                try {
                  const parsedContent = JSON.parse(generatedText)
                  primordial.descricao = parsedContent.descricao || primordial.descricao
                  primordial.poderes = parsedContent.poderes || primordial.poderes
                  primordial.dominios = parsedContent.dominios || primordial.dominios
                  primordial.simbolos = parsedContent.simbolos || primordial.simbolos
                } catch (parseError) {
                  console.log('Erro ao parsear resposta do Gemini, usando dados do banco')
                }
              }
            }
          } catch (geminiError) {
            console.log('Erro ao conectar com Gemini, usando dados do banco')
          }
        }
      }

      return new Response(
        JSON.stringify(primordials),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Handle minor gods requests
    if (type === 'minor') {
      // List all minor gods
      if (action === 'list') {
        const { data: minorGods, error } = await supabase
          .from('deuses_menores')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Erro do Supabase (minor gods list):', error)
          return new Response(
            JSON.stringify({ error: 'Erro ao buscar deuses menores' }),
            { 
              status: 500, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        }

        return new Response(
          JSON.stringify(minorGods),
          { 
            status: 200, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      // Get specific minor god
      if (!nome) {
        return new Response(
          JSON.stringify({ error: 'Nome é obrigatório para deuses menores' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      const { data: minorGods, error } = await supabase
        .from('deuses_menores')
        .select('*')
        .ilike('nome', `%${nome}%`)

      if (error) {
        console.error('Erro do Supabase (minor god):', error)
        return new Response(
          JSON.stringify({ error: 'Deus menor não encontrado' }),
          { 
            status: 404, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      // Usar Gemini para gerar conteúdo adicional se necessário
      const geminiApiKey = Deno.env.get('VER_MAIS_DEUSES_MENORES')
      if (geminiApiKey && minorGods.length > 0) {
        const minorGod = minorGods[0]
        if (!minorGod.descricao || minorGod.descricao.length < 100) {
          try {
            const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                contents: [{
                  parts: [{
                    text: `Gere uma descrição completa, poderes, domínios, símbolos sobre o deus menor da mitologia grega ${nome}, em tom educativo e clássico. Formate a resposta em JSON com as propriedades: descricao, poderes, dominios, simbolos.`
                  }]
                }],
                generationConfig: {
                  temperature: 0.7,
                  maxOutputTokens: 1000,
                }
              })
            })

            if (geminiResponse.ok) {
              const geminiData = await geminiResponse.json()
              const generatedText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text
              
              if (generatedText) {
                try {
                  const parsedContent = JSON.parse(generatedText)
                  minorGod.descricao = parsedContent.descricao || minorGod.descricao
                  minorGod.poderes = parsedContent.poderes || minorGod.poderes
                  minorGod.dominios = parsedContent.dominios || minorGod.dominios
                  minorGod.simbolos = parsedContent.simbolos || minorGod.simbolos
                } catch (parseError) {
                  console.log('Erro ao parsear resposta do Gemini, usando dados do banco')
                }
              }
            }
          } catch (geminiError) {
            console.log('Erro ao conectar com Gemini, usando dados do banco')
          }
        }
      }

      return new Response(
        JSON.stringify(minorGods),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Handle god entity requests (existing logic)
    if (!nome) {
      return new Response(
        JSON.stringify({ error: 'Nome é obrigatório' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const { data: entidade, error } = await supabase
      .from('entidades_mitologicas')
      .select('*')
      .eq('nome', nome)
      .single()

    if (error) {
      console.error('Erro do Supabase:', error)
      return new Response(
        JSON.stringify({ error: 'Entidade não encontrada' }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Usar Gemini para gerar conteúdo adicional se necessário
    const geminiApiKey = Deno.env.get('VER_MAIS_POSEIDON')
    if (geminiApiKey && (!entidade.descricao || entidade.descricao.length < 100)) {
      try {
        const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Gere uma descrição completa, poderes, domínios, símbolos e imagem representativa do deus grego ${nome}, em tom educativo e clássico. Formate a resposta em JSON com as propriedades: descricao, poderes, dominios, simbolos.`
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1000,
            }
          })
        })

        if (geminiResponse.ok) {
          const geminiData = await geminiResponse.json()
          const generatedText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text
          
          if (generatedText) {
            try {
              const parsedContent = JSON.parse(generatedText)
              entidade.descricao = parsedContent.descricao || entidade.descricao
              entidade.poderes = parsedContent.poderes || entidade.poderes
              entidade.dominios = parsedContent.dominios || entidade.dominios
              entidade.simbolos = parsedContent.simbolos || entidade.simbolos
            } catch (parseError) {
              console.log('Erro ao parsear resposta do Gemini, usando dados do banco')
            }
          }
        }
      } catch (geminiError) {
        console.log('Erro ao conectar com Gemini, usando dados do banco')
      }
    }

    return new Response(
      JSON.stringify({ entidade }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Erro na função:', error)
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})