import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, Loader2, Sparkles, BookOpenText } from 'lucide-react';
import AssistantOverlay from './AssistantOverlay';
import SimplifiedReading from './SimplifiedReading';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './PDFViewer.css';

// Configura o worker do PDF.js para funcionar com o Vite
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface PDFViewerProps {
  pdfUrl: string;
}

export default function PDFViewer({ pdfUrl }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale] = useState(0.85); // Reduzido para dar um visual mais compacto
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isSimplifiedOpen, setIsSimplifiedOpen] = useState(false);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages || 1));
  };

  return (
    <div className="pdf-viewer-container">
      <div className="pdf-top-bar">
        <div className="page-indicator">
          <span>{pageNumber}</span>
          <span className="page-total">/ {numPages || '-'}</span>
        </div>
      </div>

      <main className="pdf-main">
        <button
          onClick={goToPrevPage}
          disabled={pageNumber <= 1}
          className="side-button left"
          aria-label="Página anterior"
        >
          <ChevronLeft size={32} />
        </button>

        <div className="pdf-document-wrapper">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="pdf-loading">
                <Loader2 className="spinner" />
                <p>Carregando manual...</p>
              </div>
            }
            error={
              <div className="pdf-error">
                <p>Erro ao carregar o PDF.</p>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="pdf-page"
              width={Math.min(window.innerWidth - 32, 450)} // Ajuste sutil na largura para comportar os botões sobrepostos
            />
          </Document>
        </div>

        <button
          onClick={goToNextPage}
          disabled={pageNumber >= (numPages || 1)}
          className="side-button right"
          aria-label="Próxima página"
        >
          <ChevronRight size={32} />
        </button>
      </main>

      {/* FABs de Ações */}
      {/* Botão de Leitura Simplificada Centralizado */}
      <div className="simplify-action-container">
        <button 
          className="simplify-action-btn"
          onClick={() => setIsSimplifiedOpen(true)}
          aria-label="Ativar Leitura Simplificada para Surdos"
        >
          <BookOpenText size={24} />
          <span>Simplificar Leitura</span>
        </button>
      </div>

      <div className="fab-container">
        <button 
          className="fab-button" 
          onClick={() => setIsAssistantOpen(true)}
          aria-label="Abrir Assistente Inteligente"
          title="Assistente IA"
        >
          <Sparkles size={28} />
        </button>
      </div>

      <AssistantOverlay 
        isOpen={isAssistantOpen} 
        onClose={() => setIsAssistantOpen(false)} 
        currentPage={pageNumber} 
      />

      {isSimplifiedOpen && (
        <SimplifiedReading
          currentPage={pageNumber}
          totalPages={numPages || 1}
          onClose={() => setIsSimplifiedOpen(false)}
          onNext={goToNextPage}
          onPrev={goToPrevPage}
          onOpenAssistant={() => setIsAssistantOpen(true)}
        />
      )}
    </div>
  );
}
