import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Quote, 
  Link, 
  Image, 
  Heading1, 
  Heading2, 
  Heading3,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Eye,
  FileCode
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

interface ToolbarButtonProps {
  icon: typeof Bold;
  label: string;
  onClick: () => void;
  active?: boolean;
}

function ToolbarButton({ icon: Icon, label, onClick, active }: ToolbarButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onClick}
          className={cn(
            "h-8 w-8 p-0",
            active && "bg-muted text-foreground"
          )}
        >
          <Icon className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = "Write your content here...",
  minHeight = "300px"
}: RichTextEditorProps) {
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [history, setHistory] = useState<string[]>([value]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const insertAtCursor = useCallback((before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    
    onChange(newText);
    
    // Update history
    const newHistory = [...history.slice(0, historyIndex + 1), newText];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    // Set cursor position after the inserted text
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + before.length + selectedText.length + after.length;
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  }, [value, onChange, history, historyIndex]);

  const wrapSelection = useCallback((tag: string) => {
    insertAtCursor(`<${tag}>`, `</${tag}>`);
  }, [insertAtCursor]);

  const insertHeading = useCallback((level: number) => {
    insertAtCursor(`<h${level}>`, `</h${level}>\n`);
  }, [insertAtCursor]);

  const insertList = useCallback((ordered: boolean) => {
    const tag = ordered ? 'ol' : 'ul';
    insertAtCursor(`<${tag}>\n  <li>`, `</li>\n</${tag}>\n`);
  }, [insertAtCursor]);

  const insertLink = useCallback(() => {
    const url = prompt('Enter URL:');
    if (url) {
      insertAtCursor(`<a href="${url}">`, '</a>');
    }
  }, [insertAtCursor]);

  const insertImage = useCallback(() => {
    const url = prompt('Enter image URL:');
    if (url) {
      const alt = prompt('Enter alt text:') || '';
      insertAtCursor(`<img src="${url}" alt="${alt}" />`, '');
    }
  }, [insertAtCursor]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      onChange(history[historyIndex - 1]);
    }
  }, [historyIndex, history, onChange]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      onChange(history[historyIndex + 1]);
    }
  }, [historyIndex, history, onChange]);

  const handleChange = useCallback((newValue: string) => {
    onChange(newValue);
    // Debounce history updates
    const newHistory = [...history.slice(0, historyIndex + 1), newValue];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [onChange, history, historyIndex]);

  return (
    <div className="border rounded-lg overflow-hidden bg-background">
      {/* Toolbar */}
      <div className="border-b bg-muted/50 p-2 flex flex-wrap items-center gap-1">
        <div className="flex items-center gap-0.5 border-r pr-2 mr-2">
          <ToolbarButton icon={Undo} label="Undo" onClick={undo} />
          <ToolbarButton icon={Redo} label="Redo" onClick={redo} />
        </div>

        <div className="flex items-center gap-0.5 border-r pr-2 mr-2">
          <ToolbarButton icon={Heading1} label="Heading 1" onClick={() => insertHeading(1)} />
          <ToolbarButton icon={Heading2} label="Heading 2" onClick={() => insertHeading(2)} />
          <ToolbarButton icon={Heading3} label="Heading 3" onClick={() => insertHeading(3)} />
        </div>

        <div className="flex items-center gap-0.5 border-r pr-2 mr-2">
          <ToolbarButton icon={Bold} label="Bold" onClick={() => wrapSelection('strong')} />
          <ToolbarButton icon={Italic} label="Italic" onClick={() => wrapSelection('em')} />
          <ToolbarButton icon={Underline} label="Underline" onClick={() => wrapSelection('u')} />
          <ToolbarButton icon={Code} label="Code" onClick={() => wrapSelection('code')} />
        </div>

        <div className="flex items-center gap-0.5 border-r pr-2 mr-2">
          <ToolbarButton icon={List} label="Bullet List" onClick={() => insertList(false)} />
          <ToolbarButton icon={ListOrdered} label="Numbered List" onClick={() => insertList(true)} />
          <ToolbarButton icon={Quote} label="Quote" onClick={() => wrapSelection('blockquote')} />
        </div>

        <div className="flex items-center gap-0.5 border-r pr-2 mr-2">
          <ToolbarButton icon={AlignLeft} label="Align Left" onClick={() => insertAtCursor('<p style="text-align: left;">', '</p>')} />
          <ToolbarButton icon={AlignCenter} label="Align Center" onClick={() => insertAtCursor('<p style="text-align: center;">', '</p>')} />
          <ToolbarButton icon={AlignRight} label="Align Right" onClick={() => insertAtCursor('<p style="text-align: right;">', '</p>')} />
        </div>

        <div className="flex items-center gap-0.5 border-r pr-2 mr-2">
          <ToolbarButton icon={Link} label="Insert Link" onClick={insertLink} />
          <ToolbarButton icon={Image} label="Insert Image" onClick={insertImage} />
        </div>

        <div className="flex items-center gap-0.5 ml-auto">
          <Button
            type="button"
            variant={mode === 'edit' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setMode('edit')}
            className="h-8 gap-1.5"
          >
            <FileCode className="h-4 w-4" />
            <span className="hidden sm:inline">Edit</span>
          </Button>
          <Button
            type="button"
            variant={mode === 'preview' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setMode('preview')}
            className="h-8 gap-1.5"
          >
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">Preview</span>
          </Button>
        </div>
      </div>

      {/* Editor/Preview */}
      {mode === 'edit' ? (
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          className="border-0 rounded-none focus-visible:ring-0 resize-none font-mono text-sm"
          style={{ minHeight }}
        />
      ) : (
        <div 
          className="p-4 prose prose-sm max-w-none overflow-auto"
          style={{ minHeight }}
          dangerouslySetInnerHTML={{ __html: value }}
        />
      )}
    </div>
  );
}
