-- Populate entidades_mitologicas table with all 12 Olympian gods
INSERT INTO public.entidades_mitologicas (nome, categoria, descricao, dominios, poderes, simbolos, tags) VALUES
('Zeus', 'olimpico', 'Rei dos deuses e governante do Olimpo, Zeus é o deus do céu e do trovão. Filho de Cronos e Reia, libertou seus irmãos do ventre do pai e liderou a guerra contra os Titãs.', 
 ARRAY['céu', 'trovão', 'justiça', 'ordem'], 
 ARRAY['controle do tempo', 'raios', 'transformação', 'liderança divina'], 
 ARRAY['raio', 'águia', 'carvalho', 'cetro'],
 ARRAY['rei', 'olimpo', 'trovão', 'justiça']),

('Hera', 'olimpico', 'Rainha dos deuses e esposa de Zeus, Hera é a deusa do casamento e da família. Conhecida por sua personalidade ciumenta e vingativa contra as amantes de Zeus.',
 ARRAY['casamento', 'família', 'mulheres', 'fidelidade'],
 ARRAY['proteção matrimonial', 'fertilidade', 'vingança divina', 'autoridade feminina'],
 ARRAY['pavão', 'coroa', 'romã', 'lírio'],
 ARRAY['rainha', 'casamento', 'ciúme', 'família']),

('Deméter', 'olimpico', 'Deusa da agricultura e da colheita, Deméter é responsável pela fertilidade da terra. Mãe de Perséfone, criou as estações ao buscar sua filha no submundo.',
 ARRAY['agricultura', 'colheita', 'fertilidade', 'estações'],
 ARRAY['crescimento das plantas', 'fertilidade da terra', 'controle das estações', 'abundância'],
 ARRAY['espiga de trigo', 'foice', 'cornucópia', 'papoula'],
 ARRAY['colheita', 'terra', 'mãe', 'estações']),

('Atena', 'olimpico', 'Deusa da sabedoria, estratégia militar e artesanato, Atena nasceu da cabeça de Zeus. Protetora de Atenas e patrona dos heróis, representa a guerra justa e inteligente.',
 ARRAY['sabedoria', 'guerra estratégica', 'artesanato', 'justiça'],
 ARRAY['estratégia militar', 'sabedoria divina', 'proteção heroica', 'habilidades artesanais'],
 ARRAY['coruja', 'oliveira', 'escudo', 'lança', 'capacete'],
 ARRAY['sabedoria', 'guerra', 'artesanato', 'proteção']),

('Apolo', 'olimpico', 'Deus da música, poesia, profecia e medicina, Apolo é uma das divindades mais complexas do panteão grego. Irmão gêmeo de Ártemis, representa a luz, a razão e a harmonia.',
 ARRAY['música', 'poesia', 'profecia', 'medicina', 'sol'],
 ARRAY['inspiração artística', 'cura', 'profecia', 'tiro com arco', 'luz solar'],
 ARRAY['lira', 'arco e flecha', 'louro', 'cisne', 'sol'],
 ARRAY['música', 'profecia', 'medicina', 'luz']),

('Ártemis', 'olimpico', 'Deusa da caça, vida selvagem e virginidade, Ártemis é irmã gêmea de Apolo. Protetora das jovens donzelas e da natureza, representa a independência feminina.',
 ARRAY['caça', 'vida selvagem', 'virginidade', 'lua'],
 ARRAY['tiro com arco', 'proteção da natureza', 'caça', 'proteção das donzelas'],
 ARRAY['arco e flecha', 'crescente lunar', 'cervo', 'cipreste'],
 ARRAY['caça', 'lua', 'natureza', 'virgindade']),

('Ares', 'olimpico', 'Deus da guerra, coragem e valor militar, Ares representa o aspecto mais brutal e sanguinário dos conflitos. Filho de Zeus e Hera, é temido até mesmo pelos outros deuses.',
 ARRAY['guerra', 'coragem', 'violência', 'força bruta'],
 ARRAY['fúria de batalha', 'resistência física', 'intimidação', 'liderança militar'],
 ARRAY['lança', 'escudo', 'capacete', 'abutre', 'cão'],
 ARRAY['guerra', 'violência', 'coragem', 'força']),

('Afrodite', 'olimpico', 'Deusa do amor, beleza e prazer, Afrodite nasceu da espuma do mar. Representa tanto o amor romântico quanto a paixão carnal, exercendo poder sobre mortais e imortais.',
 ARRAY['amor', 'beleza', 'prazer', 'fertilidade'],
 ARRAY['inspiração do amor', 'beleza irresistível', 'sedução', 'fertilidade'],
 ARRAY['pomba', 'rosa', 'mirto', 'concha', 'espelho'],
 ARRAY['amor', 'beleza', 'paixão', 'sedução']),

('Hefesto', 'olimpico', 'Deus do fogo, metalurgia e artesanato, Hefesto é o ferreiro divino do Olimpo. Apesar de sua aparência defeituosa, cria as mais belas e poderosas armas e objetos mágicos.',
 ARRAY['fogo', 'metalurgia', 'artesanato', 'tecnologia'],
 ARRAY['forja divina', 'criação de artefatos mágicos', 'domínio do fogo', 'engenharia'],
 ARRAY['martelo', 'bigorna', 'fogo', 'machado', 'tenaz'],
 ARRAY['fogo', 'forja', 'artesanato', 'tecnologia']),

('Hermes', 'olimpico', 'Mensageiro dos deuses e guia das almas, Hermes é o deus do comércio, viagem e comunicação. Protetor dos viajantes, comerciantes e também dos ladrões.',
 ARRAY['comunicação', 'comércio', 'viagem', 'fronteiras'],
 ARRAY['velocidade sobre-humana', 'eloquência', 'negociação', 'orientação'],
 ARRAY['caduceu', 'sandálias aladas', 'capacete alado', 'tartaruga'],
 ARRAY['mensageiro', 'comércio', 'viagem', 'comunicação']),

('Héstia', 'olimpico', 'Deusa do lar, lareira e família, Héstia é a mais velha dos filhos de Cronos. Representa a estabilidade doméstica e a hospitalidade, mantendo o fogo sagrado do Olimpo.',
 ARRAY['lar', 'lareira', 'família', 'hospitalidade'],
 ARRAY['proteção do lar', 'manutenção do fogo sagrado', 'harmonia familiar', 'hospitalidade'],
 ARRAY['lareira', 'fogo sagrado', 'círculo', 'chave'],
 ARRAY['lar', 'família', 'fogo', 'hospitalidade']);

-- Update Poseidon's data to match the standard format
UPDATE public.entidades_mitologicas 
SET 
  descricao = 'Deus dos mares, terremotos e cavalos, Poseidon é uma das divindades mais poderosas do Olimpo. Irmão de Zeus e Hades, governa todos os corpos d''água e é conhecido por seu temperamento tempestuoso.',
  dominios = ARRAY['mares', 'oceanos', 'terremotos', 'cavalos'],
  poderes = ARRAY['controle das águas', 'criação de terremotos', 'comunicação com criaturas marinhas', 'criação de cavalos'],
  simbolos = ARRAY['tridente', 'cavalo', 'golfinho', 'touro'],
  tags = ARRAY['mar', 'oceano', 'terremoto', 'cavalos']
WHERE nome = 'Poseidon';