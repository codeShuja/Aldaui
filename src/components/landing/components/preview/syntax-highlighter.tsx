import { CopyButton } from './copy-button'

interface Token {
  type: 'keyword' | 'string' | 'function' | 'punctuation' | 'jsx' | 'text' | 'comment' | 'variable' | 'operator' | 'number'
  content: string
}

function tokenize(code: string): Token[] {
  const tokens: Token[] = []
  const keywords = ['import', 'export', 'default', 'function', 'return', 'const', 'let', 'var', 'from', 'useState', 'useEffect', 'async', 'await']
  const regex = /(\/\/.*|\/\*[\s\S]*?\*\/)|(\b\w+\b)|("[^"]*"|'[^']*')|([\{\}$$$$<>=.,:])|(<[^>]+>)|(\d+)|([+\-*/])|(\s+)/g

  let match
  while ((match = regex.exec(code)) !== null) {
    if (match[1]) {
      tokens.push({ type: 'comment', content: match[0] })
    } else if (match[2] && keywords.includes(match[0])) {
      tokens.push({ type: 'keyword', content: match[0] })
    } else if (match[2] && /^[A-Z]/.test(match[0])) {
      tokens.push({ type: 'function', content: match[0] })
    } else if (match[2]) {
      tokens.push({ type: 'variable', content: match[0] })
    } else if (match[3]) {
      tokens.push({ type: 'string', content: match[0] })
    } else if (match[4]) {
      tokens.push({ type: 'punctuation', content: match[0] })
    } else if (match[5]) {
      tokens.push({ type: 'jsx', content: match[0] })
    } else if (match[6]) {
      tokens.push({ type: 'number', content: match[0] })
    } else if (match[7]) {
      tokens.push({ type: 'operator', content: match[0] })
    } else {
      tokens.push({ type: 'text', content: match[0] })
    }
  }

  return tokens
}

export function SyntaxHighlighter({ code }: { code: string }) {
  const tokens = tokenize(code)

  return (
    <div className="relative">
      <CopyButton text={code} />
      <pre className="font-mono text-sm leading-relaxed overflow-x-auto max-h-[400px] p-4 scrollbar-hide">
        <code>
          {tokens.map((token, index) => (
            <span
              key={index}
              className={
                token.type === 'keyword'
                  ? 'text-pink-400'
                  : token.type === 'string'
                  ? 'text-green-300'
                  : token.type === 'function'
                  ? 'text-blue-300'
                  : token.type === 'punctuation'
                  ? 'text-gray-500'
                  : token.type === 'jsx'
                  ? 'text-yellow-300'
                  : token.type === 'comment'
                  ? 'text-gray-400 italic'
                  : token.type === 'variable'
                  ? 'text-purple-300'
                  : token.type === 'operator'
                  ? 'text-cyan-300'
                  : token.type === 'number'
                  ? 'text-orange-300'
                  : 'text-gray-300'
              }
            >
              {token.content}
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}

const scrollbarHideStyles = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = scrollbarHideStyles;
  document.head.appendChild(style);
}

