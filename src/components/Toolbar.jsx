import React from 'react'
import { useDispatch } from 'react-redux'
import aman from '../images/aman.jpg';

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
       
      </div>

      <div className="flex items-center font-bold gap-2 text-xs sm:text-sm md:text-base text-gray-500">
        Stencil Editor
      </div>
      <a href="https://github.com/Codinewbie" target="_blank" rel="noopener noreferrer" className="border-[#295aac] p-1 flex justify-start items-center rounded-md px-2 border space-x-2 ">
          <div className="h-5 w-5 md:h-7 md:w-7 bg-gray-100  z-20 text-center flex justify-center  items-center rounded-full overflow-hidden">
              <img
                  src={aman} // Path relative to the public folder
                  alt="aman image"
                  width={40}
                  height={40}
                  className="object-cover rounded-full"
              />
          </div>
          <div className="flex text-xs md:text-sm text-gray-500 font-bold items-center justify-center mb-1">Aman Kumar</div>
      </a>
      
    </div>
  )
}
