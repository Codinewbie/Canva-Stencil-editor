import React from 'react'
import { useDispatch } from 'react-redux'
import { undo, resetTransform } from '../store/editorSlice'
import { Undo2,Redo2 } from 'lucide-react';

export default function Toolbar({ toggleLeftPanel, isLeftPanelOpen }) {
  const dispatch = useDispatch()

  return (
    <div className="bg-[#0b101b] border-b border-[#262d38] w-full flex p-2 items-center justify-between">
      <div className="flex items-center gap-2 md:gap-3">
        {/* Show toggle button only on small screens */}
        <button
          onClick={toggleLeftPanel}
          className="px-2 py-1 md:px-3 rounded-xl border bg-gray-200 hover:bg-gray-400 text-xs md:text-sm xs:block sm:hidden"
        >
          {isLeftPanelOpen ? '✕' : '☰'}
        </button>

        {/* <button
          onClick={() => dispatch(undo())}
          className="px-2 py-1 pb-1.5 md:px-3 rounded-md border-[#295aac] text-[#295aac] space-x-2 flex flex-rows items-center justify-center border bg-[#262d38]  text-xs md:text-sm"
        >
          <Undo2 size={16} />
          <h5 className ="font-semibold">Undo</h5>
        </button>

        <button
          onClick={() => dispatch(resetTransform())}
          className="px-2 py-1 pb-1.5 md:px-3 text-[#295aac] rounded-md border border-[#295aac] space-x-2 flex flex-rows items-center justify-center bg-[#262d38]  text-xs md:text-sm"
        >
          <Redo2 size={16} />
          <h5 className ="font-semibold">Redo</h5>
        </button> */}
      </div>

      <div className="flex items-center font-bold gap-2 text-sm md:text-base text-gray-500">
        Stencil Editor
      </div>
      <div />
    </div>
  )
}
