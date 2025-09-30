import React from 'react'
import { useDispatch } from 'react-redux'
import { undo, resetTransform } from '../store/editorSlice'

export default function Toolbar(){
  const dispatch = useDispatch()
  return (
    <div className="bg-white border-b w-full flex p-2 items-center justify-between">
  <div className="flex items-center gap-2 md:gap-3">
    <button onClick={() => dispatch(undo())} className="px-2 py-1 md:px-3 m rounded-xl border bg-green-200 hover:bg-green-800 text-xs  md:text-sm">Undo</button>
    <button onClick={() => dispatch(resetTransform())} className="px-2 py-1 md:px-3 rounded-xl border bg-blue-200 hover:bg-blue-800 text-xs  md:text-sm">Reset</button>
  </div>
  <div className="text-sm md:text-base text-gray-500">Stencil Editor</div>
  <div />
</div>
 
  )
}
