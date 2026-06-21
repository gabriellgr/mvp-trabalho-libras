import { useState, useRef, useEffect } from 'react';
import { Sparkles, X, ChevronRight, PlaySquare, Info, Camera, Send } from 'lucide-react';
import './AssistantOverlay.css';

interface AssistantOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: number;
}

type ChatMessage = {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  options?: string[];
  type?: 'text' | 'libras-video';
};

export default function AssistantOverlay({ isOpen, onClose, currentPage }: AssistantOverlayProps) {
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Olá! Notei que você está na página ${currentPage}. Como posso ajudar com este passo?`,
      options: [
        'Não entendi esta etapa',
        'Onde esta peça encaixa?',
        'Faltou uma peça, o que fazer?',
        'Quais ferramentas preciso?'
      ],
    },
  ]);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Simulate AI response for specific typed questions
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: 'Entendi a sua dúvida. Como este é um protótipo, não tenho a resposta exata conectada ao banco de dados ainda, mas na versão final eu analisaria o manual para te dar o passo a passo exato!',
          options: ['Voltar ao menu inicial']
        }
      ]);
    }, 1000);
  };

  const handleOptionClick = (option: string) => {
    const userMsg: ChatMessage = { id: Date.now().toString(), sender: 'user', text: option };
    
    setMessages((prev) => [...prev, userMsg]);

    // Simular resposta da IA baseada na opção escolhida
    setTimeout(() => {
      let aiResponse: ChatMessage;
      
      if (option === 'Não entendi esta etapa') {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: 'Não se preocupe! Tente olhar a página de Leitura Simplificada. Se ainda houver dúvida, posso detalhar qual peça você deve segurar primeiro.',
          options: ['Detalhar a primeira peça', 'Voltar ao menu inicial'],
        };
      } else if (option === 'Onde esta peça encaixa?') {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: 'Por favor, aponte a câmera para a peça que você está segurando para que eu possa identificá-la no manual.',
          options: ['📷 Abrir Câmera', 'Voltar ao menu inicial'],
        };
      } else if (option === 'Faltou uma peça, o que fazer?') {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: 'Vamos checar a lista de itens. Se realmente estiver faltando, você precisará contatar a assistência técnica do fabricante.',
          options: ['Ver lista de peças', 'Voltar ao menu inicial'],
        };
      } else if (option === 'Quais ferramentas preciso?') {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: 'Para esta etapa específica, o manual indica que você precisará apenas de uma chave Philips (estrela).',
          options: ['Voltar ao menu inicial'],
        };
      } else {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: 'Certo, vamos voltar ao início. Escolha uma das opções abaixo ou digite sua dúvida:',
          options: ['Não entendi esta etapa', 'Onde esta peça encaixa?', 'Faltou uma peça, o que fazer?'],
        };
      }

      setMessages((prev) => [...prev, aiResponse]);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="overlay-backdrop" onClick={onClose} />
      <div className="assistant-bottom-sheet">
        <header className="assistant-header">
          <div className="assistant-title">
            <Sparkles className="sparkle-icon" size={20} />
            <h2>Assistente Inteligente</h2>
          </div>
          <button onClick={onClose} className="close-btn" aria-label="Fechar assistente">
            <X size={24} />
          </button>
        </header>

        <div className="chat-container">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-message-wrapper ${msg.sender}`}>
              <div className={`chat-bubble ${msg.sender}`}>
                <p>{msg.text}</p>
                
                {msg.type === 'libras-video' && (
                  <div className="mock-video-player">
                    <PlaySquare size={32} />
                    <span>Vídeo em Libras (Exemplo)</span>
                  </div>
                )}
              </div>

              {msg.options && msg.sender === 'ai' && (
                <div className="chat-options">
                  {msg.options.map((opt, i) => (
                    <button key={i} onClick={() => handleOptionClick(opt)} className="option-chip">
                      {opt.includes('Libras') && <Info size={14} />}
                      {opt.includes('Câmera') && <Camera size={14} />}
                      {!opt.includes('Libras') && !opt.includes('Câmera') && <ChevronRight size={14} />}
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="chat-input-container">
          <input 
            type="text" 
            placeholder="Digite sua dúvida aqui..." 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
            className="chat-input-field"
          />
          <button 
            className="chat-send-btn" 
            onClick={() => handleSendMessage(inputText)}
            disabled={!inputText.trim()}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </>
  );
}
