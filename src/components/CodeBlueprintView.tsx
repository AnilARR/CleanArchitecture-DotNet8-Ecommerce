import React, { useState } from 'react';
import { 
  Folder, FolderOpen, FileCode, Check, Copy, Search, Terminal, Download, 
  Info, Cpu, ShieldAlert, Sparkles, BookOpen, Code2 
} from 'lucide-react';
import { BLUEPRINTS } from '../data';

export const CodeBlueprintView: React.FC = () => {
  const [selectedFolderIdx, setSelectedFolderIdx] = useState(0);
  const [selectedFileIdx, setSelectedFileIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  // Active file details
  const activeFolder = BLUEPRINTS[selectedFolderIdx];
  const activeFile = activeFolder?.files[selectedFileIdx];

  // Actions
  const handleCopyCode = () => {
    if (!activeFile) return;
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simulated download as file
  const handleDownloadFile = () => {
    if (!activeFile) return;
    const blob = new Blob([activeFile.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full min-h-screen bg-zinc-900 text-zinc-100 flex flex-col font-mono selection:bg-zinc-700 selection:text-white">
      
      {/* Top Code Blueprints Subheading bar */}
      <div className="bg-zinc-950 border-b border-zinc-805 border-zinc-800 p-4 px-6 flex justify-between items-center flex-shrink-0 flex-col md:flex-row gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-zinc-800 text-indigo-400 rounded-xl">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5 font-sans">
              <span>.NET 8 Clean Architecture Studio Blueprints</span>
              <span className="bg-indigo-500/20 text-indigo-300 text-[10px] px-2 py-0.5 rounded font-mono font-bold">100% PRODUCTION READY</span>
            </h1>
            <p className="text-[10px] text-zinc-400 font-sans mt-0.5">Explore, search, browse, copy or download SQL scripts, Controllers, Service models, Razor views and DI configurations.</p>
          </div>
        </div>

        {/* Global info metrics */}
        <div className="flex gap-4 items-center text-[11px] text-zinc-400">
          <div className="flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-zinc-500" />
            <span>Target: .NET 8, EF Core, SQL Server</span>
          </div>
          <div className="hidden lg:flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-zinc-500" />
            <span>Auth: JWT & Cookie Multi-Roles</span>
          </div>
        </div>
      </div>

      {/* Primary Workspace */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden max-h-[calc(100vh-140px)]">
        
        {/* Left Side File Explorer Sidebar */}
        <div className="w-full md:w-80 bg-zinc-950 border-r border-zinc-850 border-zinc-800 flex flex-col flex-shrink-0">
          
          <div className="p-4 border-b border-zinc-850 border-zinc-800 flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Solution Explorer</span>
            <BookOpen className="w-3.5 h-3.5 text-zinc-500" />
          </div>

          {/* Search box within tree code */}
          <div className="p-3 border-b border-zinc-850 border-zinc-850 border-zinc-800">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-2.5" />
              <input 
                type="text" 
                placeholder="Find scripts or .cs classes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 pl-8 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-zinc-300 placeholder-zinc-500"
              />
            </div>
          </div>

          {/* Solution tree listing */}
          <div className="flex-1 overflow-y-auto p-2 space-y-4">
            {BLUEPRINTS.map((folder, folderIdx) => {
              const matchesSearch = folder.files.some(f => 
                f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                f.content.toLowerCase().includes(searchQuery.toLowerCase())
              );

              if (searchQuery && !matchesSearch) return null;

              const isFolderSelected = selectedFolderIdx === folderIdx;

              return (
                <div key={folder.name} className="space-y-1">
                  
                  {/* Folder header */}
                  <div 
                    onClick={() => setSelectedFolderIdx(folderIdx)}
                    className="flex items-center gap-2 p-1.5 hover:bg-zinc-900 rounded cursor-pointer text-xs font-semibold text-zinc-300 transition-colors"
                  >
                    {isFolderSelected ? (
                      <FolderOpen className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    ) : (
                      <Folder className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                    )}
                    <span className="truncate">{folder.name}</span>
                  </div>

                  {/* Folder files lists */}
                  {isFolderSelected && (
                    <div className="pl-6 flex flex-col gap-0.5 border-l border-zinc-800 ml-3">
                      {folder.files.map((file, fileIdx) => {
                        if (searchQuery && !file.name.toLowerCase().includes(searchQuery.toLowerCase()) && !file.content.toLowerCase().includes(searchQuery.toLowerCase())) {
                          return null;
                        }

                        const isFileActive = selectedFileIdx === fileIdx;

                        return (
                          <div 
                            key={file.id}
                            onClick={() => setSelectedFileIdx(fileIdx)}
                            className={`flex items-center gap-2 p-1.5 rounded cursor-pointer text-[11px] transition-all ${isFileActive ? 'bg-zinc-800 text-white font-bold border-r-2 border-indigo-500' : 'text-zinc-400 hover:bg-zinc-905 hover:bg-zinc-900'}`}
                          >
                            <FileCode className={`w-3.5 h-3.5 flex-shrink-0 ${isFileActive ? 'text-indigo-400' : 'text-zinc-500'}`} />
                            <span className="truncate">{file.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>
              );
            })}
          </div>

          {/* Interactive instruction box */}
          <div className="p-4 border-t border-zinc-850 border-zinc-800 bg-zinc-900/50 text-[10px] text-zinc-400 leading-relaxed font-sans">
            👨‍💻 <b>PRO TIP:</b> These C# blueprints contain the complete dependency injection, DTO validation, and stored procedure safe integration patterns exactly as requested. Select a file then press <b>Copy Code</b> to copy.
          </div>

        </div>

        {/* Right Middle Code Detail Workspace */}
        <div className="flex-1 flex flex-col bg-zinc-900 overflow-hidden relative">
          
          {activeFile ? (
            <>
              {/* File details panel */}
              <div className="bg-zinc-950 border-b border-zinc-850 border-zinc-800 p-3.5 px-5 flex justify-between items-center flex-shrink-0">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-semibold text-white">{activeFile.name}</span>
                  <span className="text-[9px] font-mono uppercase bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded ml-1 font-bold">
                    {activeFile.language}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] px-2.5 py-1.5 rounded transition-colors font-sans font-bold"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                    <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                  </button>

                  <button 
                    onClick={handleDownloadFile}
                    className="flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] px-2.5 py-1.5 rounded transition-colors font-sans font-bold"
                  >
                    <Download className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Download File</span>
                  </button>
                </div>
              </div>

              {/* Description file card banner */}
              <div className="bg-zinc-910 bg-zinc-950/40 border-b border-zinc-800/65 py-2 px-6 flex items-start gap-1.5 text-[10px] text-zinc-400 font-sans">
                <Info className="w-3.5 h-3.5 text-indigo-400 mt-0.5 flex-shrink-0" />
                <span><b>Module Focus:</b> {activeFile.description}</span>
              </div>

              {/* Code Panel Body with lines */}
              <div className="flex-1 overflow-auto p-4 pr-6 text-xs leading-relaxed flex bg-zinc-950/50">
                
                {/* Simulated line numbers */}
                <div className="text-right select-none pr-4 text-zinc-650 opacity-40 font-mono text-xs border-r border-zinc-850 h-fit">
                  {activeFile.content.split('\n').map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>

                {/* Actual code display */}
                <pre className="pl-4 text-zinc-300 font-mono overflow-x-auto whitespace-pre h-fit w-full text-xs selection:bg-zinc-700 selection:text-white">
                  {activeFile.content}
                </pre>

              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center space-y-3 p-12 text-center text-zinc-500">
              <Terminal className="w-12 h-12 text-zinc-700" />
              <h3>Select a clean architecture file from the Solution Explorer left panel to review its code context.</h3>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
