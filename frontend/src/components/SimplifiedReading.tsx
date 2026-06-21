import { ChevronLeft, ChevronRight, PlaySquare, X, Wrench, Hand, Sparkles } from 'lucide-react';
import './SimplifiedReading.css';

interface SimplifiedReadingProps {
  currentPage: number;
  totalPages: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onOpenAssistant: () => void;
}

// Mocking some didactic data to demonstrate the concept
const MOCK_PAGES: Record<number, any> = {
  1: {
    title: "Capa do Manual",
    text: "Bem-vindo! Este é o manual do Ventilador Turbo.",
    action: "Vamos aprender a montar de forma simples.",
    tools: [],
    videoLabel: "Libras: Bem-vindo ao Manual",
    image: null,
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" // Placeholder
  },
  2: {
    title: "Passo 1: A Base",
    text: "Pegue a base preta de plástico e encaixe o tubo de metal maior nela.",
    action: "Encaixe firme até o fundo.",
    tools: ["Mão (Sem ferramentas)"],
    videoLabel: "Libras: Encaixando a base",
    image: "/images/fan_base.png",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  3: {
    title: "Passo 2: O Parafuso da Base",
    text: "Embaixo da base, gire o parafuso borboleta para prender o tubo de metal.",
    action: "Gire para a direita até ficar apertado.",
    tools: ["Mão (Sem ferramentas)"],
    videoLabel: "Libras: Apertando o parafuso da base",
    image: "/images/fan_screw.png",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  4: {
    title: "Passo 3: O Motor",
    text: "Encaixe a cabeça do motor no topo do tubo de metal.",
    action: "Verifique se travou no lugar.",
    tools: ["Mão (Sem ferramentas)"],
    videoLabel: "Libras: Colocando o motor",
    image: "/images/fan_motor.png",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  5: {
    title: "Passo 4: A Grade Traseira",
    text: "Coloque a grade de trás no motor, alinhando os pinos.",
    action: "Prenda girando a porca de plástico preta.",
    tools: ["Mão (Sem ferramentas)"],
    videoLabel: "Libras: Fixando a grade de trás",
    image: "/images/fan_back_grille.png",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  6: {
    title: "Passo 5: A Hélice",
    text: "Encaixe a hélice no pino de metal do motor.",
    action: "Gire a tampinha no sentido contrário para travar.",
    tools: ["Mão (Sem ferramentas)"],
    videoLabel: "Libras: Colocando a hélice",
    image: "/images/fan_propeller.png",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  7: {
    title: "Passo 6: A Grade Frontal",
    text: "Junte a grade da frente com a de trás.",
    action: "Feche as travas ao redor para garantir segurança.",
    tools: ["Mão (Sem ferramentas)"],
    videoLabel: "Libras: Fechando a grade da frente",
    image: "/images/fan_front_grille.png",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  }
};

const DEFAULT_PAGE = {
  title: "Passo",
  text: "Siga a ilustração do produto para realizar este passo.",
  action: "Lembre-se de encaixar corretamente.",
  tools: ["Atenção visual"],
  videoLabel: "Libras: Explicação Geral",
  image: null,
  videoUrl: null
};

export default function SimplifiedReading({ 
  currentPage, 
  totalPages, 
  onClose, 
  onNext, 
  onPrev,
  onOpenAssistant
}: SimplifiedReadingProps) {
  
  const pageData = MOCK_PAGES[currentPage] || { ...DEFAULT_PAGE, title: `Passo da Página ${currentPage}` };

  return (
    <div className="simplified-overlay">
      <div className="simplified-header">
        <button onClick={onClose} className="back-to-pdf-btn">
          <X size={24} /> Sair da Leitura Simplificada
        </button>
        
        <div className="simplified-page-indicator">
          <span>{currentPage}</span> / {totalPages}
        </div>
      </div>

      <button
        onClick={onPrev}
        disabled={currentPage <= 1}
        className="side-button left"
        style={{ zIndex: 105 }}
        aria-label="Página anterior"
      >
        <ChevronLeft size={32} />
      </button>

      <button
        onClick={onNext}
        disabled={currentPage >= totalPages}
        className="side-button right"
        style={{ zIndex: 105 }}
        aria-label="Próxima página"
      >
        <ChevronRight size={32} />
      </button>

      <main className="simplified-content">
        
        {/* Mockup do Player de Libras */}
        <div className="libras-video-container">
          <img 
            src="/images/libras_interpreter.png" 
            alt="Intérprete de Libras" 
            className="libras-interpreter-mockup"
          />
          <div className="video-overlay-play">
            <PlaySquare size={64} className="play-icon" />
            <p>{pageData.videoLabel}</p>
          </div>
          <span className="video-badge">Vídeo em Libras</span>
        </div>

        {/* Informação Didática */}
        <div className="didactic-card">
          <h2 className="didactic-title">{pageData.title}</h2>
          
          <div className="didactic-content-row">
            <div className="didactic-text-box">
              <p className="didactic-main-text">{pageData.text}</p>
              <p className="didactic-action-text">👉 {pageData.action}</p>
            </div>
            
            {pageData.image && (
              <div className="didactic-image-box">
                <img src={pageData.image} alt={pageData.title} />
              </div>
            )}
          </div>

          {pageData.tools.length > 0 && (
            <div className="didactic-tools">
              <h3>O que você vai precisar:</h3>
              <div className="tools-list">
                {pageData.tools.map((tool: string, index: number) => (
                  <span key={index} className="tool-item">
                    {tool.includes('ferramenta') ? <Hand size={18} /> : <Wrench size={18} />}
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

      </main>

      {/* FAB Assistente IA exclusivo da Leitura Simplificada */}
      <div className="fab-container" style={{ zIndex: 110 }}>
        <button 
          className="fab-button" 
          onClick={onOpenAssistant}
          aria-label="Abrir Assistente Inteligente"
          title="Assistente IA"
        >
          <Sparkles size={28} />
        </button>
      </div>
    </div>
  );
}
