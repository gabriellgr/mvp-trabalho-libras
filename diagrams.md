# Projeto: Universal Manuals (TCC Acessibilidade)

## 📌 Visão Geral
Plataforma SaaS (B2B2C) que substitui manuais de instruções complexos por um Assistente Inteligente Web (via QR Code). O foco é aplicar o **Design Universal**, oferecendo uma interface simplificada que beneficia todos os usuários, mas com otimizações profundas para pessoas surdas (Linguagem simplificada, suporte a Libras, explicações iterativas e hiper-visuais).

## 🏗️ Arquitetura Tecnológica
- **Frontend**: React.js. Focado em Mobile-First (acesso primário pelo smartphone do usuário ao escanear a caixa). A interface deve suportar renderização de animações, componentes interativos de passos (concluído/não concluído) e overlay de câmera.
- **Backend**: Django (Python) + PostgreSQL. Gerenciamento do catálogo de fabricantes, produtos, componentes (peças) e o roteiro mestre de montagem.
- **Inteligência Artificial (Core)**: OpenAI API (GPT-4o e GPT-4o-Vision). O backend atua como orquestrador, enviando o contexto do manual original para a IA e controlando os prompts para que as respostas sejam adaptáveis (ex: Tentativa 1 = texto simples; Tentativa 2 = descrição física; Tentativa 3 = acionamento de mídia visual).
- **Visão Computacional (Câmera)**: Uso da API do GPT-4o-Vision para identificação de peças ou símbolos em tempo real via foto do navegador.
- **Tradução para Libras**: MVP utilizando banco de vídeos curtos gravados por intérprete para os passos críticos (garante qualidade extrema e validação da tese acadêmica) com visão arquitetural futura para integração com APIs de avatares 3D (ex: HandTalk ou VLibras) visando escalabilidade para a fabricante.

## 🚀 Sprints de Desenvolvimento

### Sprint 1: Fundação do Sistema (Produto e QR Code)
- Definição do Modelo de Dados (Django): Product, Component (Peça), Step (Passo), Instruction (Instrução original vs Simplificada).
- Geração de QR Code dinâmico apontando para a aplicação web (`/product/{id}`).
- Setup inicial do Frontend (React) responsivo e com suporte a acessibilidade nativa (Aria, contrastes).

### Sprint 2: Motor de Assistência IA (Chat e Passos)
- Implementação da interface conversacional guiada.
- Fluxo de "Passo a passo": IA pergunta "Passo concluído?" -> "Ainda não" -> Gatilho para mudança de abordagem explicativa.
- Integração da API da OpenAI com RAG (Retrieval-Augmented Generation) focado apenas nas instruções do produto específico.

### Sprint 3: Módulo Visual e Acessibilidade (Libras)
- Integração de imagens de destaque e GIFs/vídeos ao fluxo de explicação.
- Implementação do recurso "🧏 Ver em Libras". No MVP: acionamento de reprodutor de vídeo sobreposto carregando o arquivo de vídeo correspondente àquele passo (HLS ou MP4 otimizado).

### Sprint 4: Inteligência Visual (Identificador de Peças e Símbolos)
- Implementação da feature de câmera no navegador (WebRTC).
- Captura de frame (foto da peça ou do símbolo "⚠") e envio ao backend, que repassa à API Vision da OpenAI com o prompt contextual: "Neste guarda-roupa XYZ, qual é a peça na imagem e onde ela se encaixa?".
- Retorno processado exibido na interface: "Você está segurando a Peça B14".

### Sprint 5: Validação, Polimento e Defesa (TCC)
- Testes de usabilidade (heurísticas) preferencialmente com usuários surdos e ouvintes.
- Elaboração do modelo de negócios (SaaS para empresas de móveis/eletrônicos).
- Escrita final da documentação arquitetural.
