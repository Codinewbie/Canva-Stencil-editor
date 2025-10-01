import React, { useState } from 'react'
import LeftPanel from './components/LeftPanel.jsx'
import CanvasEditor from './components/CanvasEditor.jsx'
import Toolbar from './components/Toolbar.jsx'

export default function App() {
  const [isLeftPanelOpen, setLeftPanelOpen] = useState(false)

  return (
    <div className="min-h-screen grid grid-cols-5 relative bg-[#0b101b]">
      {/* Left Panel */}
      <div
  className={`
    col-span-1 sm:col-span-2 
    bg-white border-r border-[#262d38] transition-transform duration-300
    fixed sm:static top-0 left-0 h-full z-20
    ${isLeftPanelOpen ? 'translate-x-0' : '-translate-x-full'}
    sm:translate-x-0
  `}
>
  <LeftPanel toggleLeftPanel={() => setLeftPanelOpen(false)} />
</div>


      {/* Main Area */}
      <div className="col-span-5 sm:col-span-3 flex flex-col h-full box-border relative z-10">
        <Toolbar toggleLeftPanel={() => setLeftPanelOpen(!isLeftPanelOpen)} isLeftPanelOpen={isLeftPanelOpen} />
        <div className="flex-1 p-4 flex">
          <div className="bg-[#151c26] shadow-sm rounded-md box-border flex-1 flex items-center justify-center overflow-hidden">
            <CanvasEditor />
          </div>
        </div>
      </div>
    </div>
  )
}
