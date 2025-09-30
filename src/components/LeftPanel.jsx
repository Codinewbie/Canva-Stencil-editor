import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUploadedImage } from '../store/editorSlice'

export default function LeftPanel() {
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
    <div className="w-72 bg-white border-r p-4">
      <h2 className="text-lg font-semibold mb-4">Uploads</h2>
      <div className="mb-4">
        <button
          onClick={() => fileRef.current.click()}
          className="w-full py-2 px-3 rounded bg-purple-600 text-white hover:bg-purple-700"
        >
          Upload files
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
        <p className="text-sm text-gray-500 mb-2">Uploaded</p>
        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          {uploadedImages.length > 0 ? (
            uploadedImages.map((img, idx) => (
              <div
                key={idx}
                className={`relative border rounded p-1 cursor-pointer transition-all duration-200 ${
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
            <div className="border rounded p-4 text-gray-400 text-sm">
              No uploads yet — try uploading a photo.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
