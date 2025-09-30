import React from 'react'
import { useDispatch } from 'react-redux'
import { undo, resetTransform } from '../store/editorSlice'

export default function Toolbar(){
  const dispatch = useDispatch()
  return (
    <div className="h-14 bg-white border-b px-4 flex items-center justify-between">
  <div className="flex items-center gap-2 md:gap-3">
    <button onClick={() => dispatch(undo())} className="px-2 py-1 md:px-3 md:py-1.5 rounded border text-sm md:text-base">Undo</button>
    <button onClick={() => dispatch(resetTransform())} className="px-2 py-1 md:px-3 md:py-1.5 rounded border text-sm md:text-base">Reset</button>
  </div>
  <div className="text-sm md:text-base text-gray-500">Stencil Editor</div>
  <div />
</div>
 
  )
}
