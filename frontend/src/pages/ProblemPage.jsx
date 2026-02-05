import { useEffect, useState } from "react";
import {useParams, useNavigate} from "react-router"
import { PROBLEMS } from "../data/problems.js";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Navbar from "../components/Navbar.jsx";
import ProblemDescription from "../components/ProblemDescription.jsx";
import OutputPanel from "../components/OutputPanel.jsx";
import CodeEditorPanel from "../components/CodeEditorPanel.jsx";
import { executeCode } from "../lib/piston.js";
import toast from "react-hot-toast"
import confetti from "canvas-confetti";

function ProblemPage() {
  const {id}= useParams();
  const navigate = useNavigate();
  const [currentProblemId, setCurrentProblemId] = useState("two-sum")
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(PROBLEMS[currentProblemId].starterCode.javascript);
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning]  = useState(false);

  const currentProblem = PROBLEMS[currentProblemId];

  useEffect(()=>{
    if(id&& PROBLEMS[id]){
      setCurrentProblemId(id);
      setCode(PROBLEMS[id].starterCode[selectedLanguage]);
      setOutput(null);
    }
  },[id,selectedLanguage]);


  const handleLangugageChange = (e)=>{
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setCode(currentProblem.starterCode[newLang]);
    setOutput(null);
  };
  const handleProblemChange = (newProblemId) => navigate(`/problems/${newProblemId}`);

  const triggerConfetti = ()=>{
    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.2, y: 0.6 },
    });

    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.8, y: 0.6 },
    });

  };
    const normalizeOutput = (output) => {
    // normalize output for comparison (trim whitespace, handle different spacing)
    return output
      .trim()
      .split("\n")
      .map((line) =>
        line
          .trim()
          // remove spaces after [ and before ]
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          // normalize spaces around commas to single space after comma
          .replace(/\s*,\s*/g, ",")
      )
      .filter((line) => line.length > 0)
      .join("\n");
  };

  const checkIfTestPassed = (actualOutput,  expectedOutput)=>{
    const normalizedActual = normalizeOutput(actualOutput);
    const normalizedExpected = normalizeOutput(expectedOutput);

    return normalizedActual == normalizedExpected;
  };
  const handleRunCode = async ()=>{
    setIsRunning(true);
    setOutput(null);

    const result = await executeCode(selectedLanguage,code);
    setOutput(result);
    setIsRunning(false);
    // console.log(result);

    if(result.success){
      
      const expectedOutput = currentProblem.expectedOutput[selectedLanguage];
      const testPassed = checkIfTestPassed(result.output,expectedOutput);

      if(testPassed){
        triggerConfetti();
        toast.success("All test cases passed!!!")
      } else{
        toast.error("Test failed! Check your code and output!")
      }
    }
    else{
      toast.error("Code execution failed")
    }



  };
  return (
    <div className="h-screen bg-base-100 flex flex-col">
      <Navbar/>
      <div className="flex-1">
        <PanelGroup direction="horizontal">
          {/* left problem */}
          <Panel defaultSize={40} minSize={20}>
            <ProblemDescription
              problem = {currentProblem}
              currentProblemId = {currentProblemId}
              onProblemChange = {handleProblemChange}
              allProblems = {Object.values(PROBLEMS)}
            />
          </Panel>

          <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />
          {/* right problem */}
          <Panel defaultSize={60} minSize={20}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={70} minSize={30}>
                <CodeEditorPanel 
                  selectedLanguage = {selectedLanguage}
                  code = {code}
                  isRunning = {isRunning}
                  onLanguageChange = {handleLangugageChange}
                  onCodeChange = {setCode}
                  onRunCode = {handleRunCode}
                />
              </Panel>

              <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />

              <Panel defaultSize={30} minSize={30}>
                <OutputPanel
                  output = {output}
                />
              </Panel>

            </PanelGroup>
          </Panel>
            
        </PanelGroup>
      </div>
      
    </div>
  )
}

export default ProblemPage