import React from 'react'
import LeftPanel from './components/LeftPanel.jsx'
import CanvasEditor from './components/CanvasEditor.jsx'
import Toolbar from './components/Toolbar.jsx'

export default function App() {
  return (
    <div className="min-h-screen grid grid-cols-5 border-2 border-yellow-600">
      {/* Left Panel collapses on small screens */}
      <div className="w-full h-screen col-span-5 sm:col-span-1 flex-shrink-0  ">
        <LeftPanel />
      </div>

      <div className="col-span-5 sm:col-span-4   flex-1 flex flex-col border-4">
        <Toolbar />
        <div className="flex-1 p-4">
          <div className="bg-white shadow-sm rounded-md h-screen flex items-center justify-center overflow-hidden">
            <CanvasEditor />
          </div>
        </div>
      </div>
    </div>
  )
}
