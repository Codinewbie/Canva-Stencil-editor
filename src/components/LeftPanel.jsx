import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUploadedImage } from '../store/editorSlice'
import { Upload } from 'lucide-react';

export default function LeftPanel({ toggleLeftPanel }) {
  const dispatch = useDispatch()
  const fileRef = useRef(null)
  const uploadedImages = useSelector(s => s.editor.uploadedImages)
  const [selectedImageIdx, setSelectedImageIdx] = useState(null)

  function handleFile(e) {
    const files = Array.from(e.target.files)
    files.forEach((f) => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        dispatch(addUploadedImage(ev.target.result))
      }
      reader.readAsDataURL(f)
    })
  }

  return (
    <div className="w-full h-full flex flex-col bg-[#0b101b] box-border p-4">
      <h2 className="font-semibold text-white mb-4 flex items-center justify-between">
        Select & Edit 
        <button
          onClick={toggleLeftPanel}
          className="px-2 py-1 rounded border text-black bg-gray-200 hover:bg-gray-400 text-xs sm:text-sm sm:hidden"
        >
          ✕
        </button>
      </h2>


      <div className="mb-4">
        {/* <h1 className="text-white font-semibold mb-2 box-border"> Select & Edit </h1> */}
        <button
          onClick={() => fileRef.current.click()}
          className="w-full py-2 px-3 rounded-md flex justify-center items-center space-x-3 font-semibold bg-[#295aac] text-xs sm:text-sm md:text-base text-white hover:bg-[#3b76e1] transition-colors"
        >
          <Upload size={16} strokeWidth={2.5} />
          <h1>Upload New Photo</h1>
        </button>
        <input
          ref={fileRef}
          onChange={handleFile}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
        />
      </div>

      <div>
        <p className="text-sm text-gray-500 box-border mb-2">Uploaded</p>
        {/* Fixed height container with scrollbar */}
        <div 
  className="gap-3 mt-3 box-border p-2 grid grid-cols-2 overflow-y-auto no-scrollbar" 
  style={{ maxHeight: '85vh' }}
>
  {uploadedImages.length > 0 ? (
    uploadedImages.map((img, idx) => (
      <div
        key={idx}
        className={`relative box-border border bg-gray-100 col-span-2 md:col-span-1 flex items-center justify-center  rounded cursor-pointer transition-all duration-200 ${
          selectedImageIdx === idx
            ? 'border-4 border-purple-600 shadow-lg'
            : 'border-gray-300'
        }`}
        onClick={() => setSelectedImageIdx(idx)}
      >
        <img
          src={img}
          alt={`uploaded-${idx}`}
          draggable={selectedImageIdx === idx}
          onDragStart={(e) => {
            if (selectedImageIdx === idx) {
              e.dataTransfer.setData("text/plain", img)
            }
          }}
          className="w-full object-cover rounded"
        />
        {selectedImageIdx === idx && (
          <div className="absolute inset-0 bg-purple-200 opacity-30 rounded pointer-events-none"></div>
        )}
      </div>
    ))
  ) : (
    <div className="border box-border col-span-2 text-center w-full border-pink-300 rounded p-2 text-gray-400 text-sm">
      No uploads yet — try uploading a photo.
    </div>
  )}
</div>

      </div>
    </div>
  )
}
