import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  uploadedImages: [], // store all uploaded images
  activeImage: null,  // the image currently on canvas
  transform: { left: 0, top: 0, scale: 1 },
  history: [] // undo stack for transforms
}

const editor = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    // add a new uploaded image to the list
    addUploadedImage(state, action) {
      state.uploadedImages.push(action.payload)
    },

    // set the active image (when user drags & drops)
    setActiveImage(state, action) {
      state.activeImage = action.payload
      // reset transform/history for the new active image
      state.transform = { left: 0, top: 0, scale: 1 }
      state.history = []
    },

    setTransform(state, action) {
      // push previous state into history
      state.history.push(state.transform)
      if (state.history.length > 50) state.history.shift()
      state.transform = { ...state.transform, ...action.payload }
    },

    undo(state) {
      // Reverts to the previous transform if available
      if (state.history.length > 0) {
        const prev = state.history.pop()
        state.transform = prev
      }
    },

    resetTransform(state) {
      // Resets transform to default and clears history
      state.transform = { left: 0, top: 0, scale: 1 }
      state.history = []
    }
  }
})

export const { addUploadedImage, setActiveImage, setTransform, undo, resetTransform } = editor.actions
export default editor.reducer
