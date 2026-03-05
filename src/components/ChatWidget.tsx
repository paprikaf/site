import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useCallback, useEffect, useRef, useState } from 'react';

function renderSimpleMarkdown(text: string): React.ReactNode {
  const lines = text.split('\n');
  const result: React.ReactNode[] = [];
  lines.forEach((line, lineIdx) => {
    if (lineIdx > 0) result.push(<br key={`br-${lineIdx}`} />);
    if (line.startsWith('- ')) {
      result.push(
        <li key={lineIdx} className="ml-4 list-disc">
          {processInline(line.slice(2))}
        </li>
      );
    } else {
      result.push(<span key={lineIdx}>{processInline(line)}</span>);
    }
  });
  return <>{result}</>;
}

function processInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  while (remaining.length > 0) {
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);
    const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
    const firstLink = linkMatch?.index ?? Infinity;
    const firstBold = boldMatch?.index ?? Infinity;
    const first = Math.min(firstLink, firstBold);
    if (first === Infinity) {
      parts.push(remaining);
      break;
    }
    if (first > 0) parts.push(remaining.slice(0, first));
    if (first === firstLink && linkMatch) {
      parts.push(
        <a
          key={parts.length}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 decoration-yellow-500 hover:opacity-70"
        >
          {linkMatch[1]}
        </a>
      );
      remaining = remaining.slice(first + linkMatch[0].length);
    } else if (first === firstBold && boldMatch) {
      parts.push(<strong key={parts.length}>{boldMatch[1]}</strong>);
      remaining = remaining.slice(first + boldMatch[0].length);
    } else {
      remaining = remaining.slice(first);
    }
  }
  return <>{parts}</>;
}

function getMessageText(message: { parts?: Array<{ type: string; text?: string }> }): string {
  if (!message.parts) return '';
  return message.parts
    .filter((p): p is { type: string; text: string } => p.type === 'text' && typeof p.text === 'string')
    .map((p) => p.text)
    .join('');
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error, clearError } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, status, scrollToBottom]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = input.trim();
      if (!trimmed || status === 'streaming' || status === 'submitted') return;
      sendMessage({ text: trimmed });
      setInput('');
    },
    [input, status, sendMessage]
  );

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(e.target.value);
  }, []);

  const isStreaming = status === 'streaming' || status === 'submitted';
  const hasUserMessages = messages.some((m) => m.role === 'user');

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center bg-yellow-500 border-2 border-border shadow-light dark:shadow-dark rounded-sm hover:scale-105 hover:opacity-90 transition-transform transition-opacity no-print"
        aria-label="Open chat"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[400px] h-[520px] flex flex-col bg-main border-2 border-border shadow-light dark:shadow-dark rounded-sm no-print"
          role="dialog"
          aria-label="Chat with Ahmed's AI"
        >
          <header className="flex items-center justify-between border-b-2 border-border px-4 py-3 shrink-0">
            <h2 className="font-semibold text-text">Chat with Ahmed&apos;s AI</h2>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 hover:opacity-70 transition-opacity"
              aria-label="Close chat"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </header>

          <div className="overflow-y-auto flex-1 p-4 space-y-3">
            {!hasUserMessages && (
              <div className="flex justify-start">
                <div className="px-3 py-2 rounded-sm max-w-[85%] text-sm bg-main border-2 border-border">
                  Hey! I&apos;m Ahmed&apos;s AI assistant. Ask me anything about my experience, projects, or skills.
                </div>
              </div>
            )}

            {error && (
              <div className="flex justify-start">
                <div className="px-3 py-2 rounded-sm max-w-[85%] text-sm bg-red-500/20 border-2 border-red-500 text-red-700 dark:text-red-300">
                  {error.message}
                  <button type="button" onClick={clearError} className="ml-2 underline">
                    Dismiss
                  </button>
                </div>
              </div>
            )}

            {messages.map((message) => {
              const text = getMessageText(message);
              if (message.role === 'user') {
                return (
                  <div key={message.id} className="flex justify-end">
                    <div className="px-3 py-2 rounded-sm max-w-[85%] text-sm bg-yellow-500 text-black border-2 border-border">
                      {text}
                    </div>
                  </div>
                );
              }
              if (message.role === 'assistant') {
                return (
                  <div key={message.id} className="flex justify-start">
                    <div className="px-3 py-2 rounded-sm max-w-[85%] text-sm bg-main border-2 border-border">
                      {renderSimpleMarkdown(text)}
                    </div>
                  </div>
                );
              }
              return null;
            })}

            {isStreaming && (
              <div className="flex justify-start">
                <div className="px-3 py-2 rounded-sm max-w-[85%] text-sm bg-main border-2 border-border">
                  <span className="animate-pulse">...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t-2 border-border px-4 py-3 shrink-0 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask a question..."
              disabled={isStreaming}
              className="border-2 border-border bg-main text-text px-3 py-2 text-sm rounded-sm flex-1 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isStreaming}
              className="bg-yellow-500 border-2 border-border text-black px-3 py-2 rounded-sm font-semibold disabled:opacity-60"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
