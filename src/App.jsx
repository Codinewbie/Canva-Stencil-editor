import React from 'react'
import LeftPanel from './components/LeftPanel'
import CanvasEditor from './components/CanvasEditor'
import Toolbar from './components/Toolbar'

export default function App(){
  return (
    <div className="h-screen flex">
      <LeftPanel />
      <div className="flex-1 flex flex-col">
        <Toolbar />
        <div className="flex-1 p-6">
          <div className="bg-white shadow-sm rounded-md h-full flex items-center justify-center">
            <CanvasEditor />
          </div>
        </div>
      </div>
    </div>
  )
}
