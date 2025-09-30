import React from 'react'
import { useDispatch } from 'react-redux'
import { undo, resetTransform } from '../store/editorSlice'

export default function Toolbar(){
  const dispatch = useDispatch()
  return (
    <div className="h-14 bg-white border-b px-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button onClick={() => dispatch(undo())} className="px-3 py-1 rounded border">Undo</button>
        <button onClick={() => dispatch(resetTransform())} className="px-3 py-1 rounded border">Reset</button>
      </div>
      <div className="text-sm text-gray-500">Stencil Editor</div>
      <div />
    </div>
  )
}
