import Editor from "@monaco-editor/react"
import { LANGUAGE_CONFIG } from "../data/problems.js"
import { CircleArrowOutUpRightIcon, Loader2Icon, PlayIcon } from "lucide-react";

function CodeEditorPanel({selectedLanguage,
code,
isRunning,
onLanguageChange,
onCodeChange,
onRunCode}) {
  return (
    <div className="h-full bg-base-300 flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 bg-base-100 border-t border-base-300">
        <div className="flex items-center gap-3">
          <img 
            src={LANGUAGE_CONFIG[selectedLanguage].icon}  
            alt={LANGUAGE_CONFIG[selectedLanguage].name} 
            className="size-6"
            />
            <select
              className="select select-sm"
              onChange={onLanguageChange}
              value={selectedLanguage}
            >
              {
                Object.entries(LANGUAGE_CONFIG).map(([key,lang]) =>
                  <option value={key} key={key}>
                    {lang.name}
                  </option>
                )
              }
            </select>
        </div>

        <button className="btn btn-primary btn-sm gap-2" disabled={isRunning} onClick={onRunCode}>
          {isRunning ? (
            <Loader2Icon className="size-4 animate-spin"/>
          ):(
            <>
            <PlayIcon className="size-4 "/>
            Run Code
            </>
          )}
        </button>
      </div>

      <Editor
        height={"100%"}
        language={LANGUAGE_CONFIG[selectedLanguage].monacoLang}
        onChange={onCodeChange}
        value={code}
        theme="vs-dark"
        options={{
          fontSize: 16,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: { enabled: false },
        }}
      />
    </div>

  )
}

export default CodeEditorPanel