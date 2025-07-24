-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create entidades_mitologicas table
CREATE TABLE public.entidades_mitologicas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  categoria TEXT NOT NULL,
  descricao TEXT,
  dominios TEXT[],
  poderes TEXT[],
  simbolos TEXT[],
  imagem_url TEXT,
  relacoes JSONB,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.entidades_mitologicas ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (educational content)
CREATE POLICY "Anyone can view mythological entities" 
ON public.entidades_mitologicas 
FOR SELECT 
USING (true);

-- Insert Poseidon data
INSERT INTO public.entidades_mitologicas (
  nome, categoria, descricao, dominios, poderes, simbolos, tags
) VALUES (
  'Poseidon',
  'olimpico',
  'Deus dos mares, oceanos, terremotos e cavalos. Irmão de Zeus e Hades, Poseidon governa todos os corpos d''água e possui um temperamento tão tempestuoso quanto as águas que comanda. É conhecido por sua força colossal e por sua capacidade de causar tanto tempestades devastadoras quanto calmarias serenas.',
  ARRAY['Mares', 'Oceanos', 'Terremotos', 'Cavalos', 'Navegação'],
  ARRAY['Controle das águas', 'Criação de terremotos', 'Transformação', 'Comunicação com criaturas marinhas', 'Criação de cavalos'],
  ARRAY['Tridente', 'Cavalos', 'Touros', 'Golfinhos', 'Conchas'],
  ARRAY['olimpico', 'mar', 'agua', 'terremoto', 'cavalo', 'tridente']
);

-- Create trigger for updated_at
CREATE TRIGGER update_entidades_mitologicas_updated_at
BEFORE UPDATE ON public.entidades_mitologicas
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();