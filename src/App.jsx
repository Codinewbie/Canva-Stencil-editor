import React from 'react'
import LeftPanel from './components/LeftPanel.jsx'
import CanvasEditor from './components/CanvasEditor.jsx'
import Toolbar from './components/Toolbar.jsx'

export default function App() {
  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Left Panel collapses on small screens */}
      <div className="w-full md:w-72 flex-shrink-0">
        <LeftPanel />
      </div>

      <div className="flex-1 flex flex-col">
        <Toolbar />
        <div className="flex-1 p-4 md:p-6">
          <div className="bg-white shadow-sm rounded-md h-full flex items-center justify-center overflow-hidden">
            <CanvasEditor />
          </div>
        </div>
      </div>
    </div>
  )
}
