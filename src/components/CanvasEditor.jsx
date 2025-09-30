import React, { useEffect, useRef } from 'react'
import * as Fabric from 'fabric'
import { useSelector, useDispatch } from 'react-redux'
import { setTransform, resetTransform, setActiveImage } from '../store/editorSlice'

export default function CanvasEditor() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const fabricRef = useRef(null)
  const imageObjRef = useRef(null)
  const dispatch = useDispatch()
  const activeImage = useSelector(s => s.editor.activeImage)

  const stencil = { width: 320, height: 380, rx: 8 }

  useEffect(() => {
    const canvasEl = document.createElement('canvas')
    canvasEl.id = 'fabric-canvas'
    canvasEl.width = 1000
    canvasEl.height = 700
    canvasEl.style.width = '100%'
    canvasEl.style.height = '100%'
    canvasRef.current.appendChild(canvasEl)

    const c = new Fabric.fabric.Canvas(canvasEl, {
      selection: false,
      preserveObjectStacking: true,
      backgroundColor: '#F7F5F0'
    })
    fabricRef.current = c

    function resize() {
      const rect = containerRef.current.getBoundingClientRect()
      c.setWidth(rect.width)
      c.setHeight(rect.height)
      c.calcOffset()
      c.renderAll()
      if (c.frameRect) centerFrame(c)
    }
    window.addEventListener('resize', resize)
    resize()

    createFrame(c)

    // frame move
    c.on('object:moving', (e) => {
      const t = e.target
      if (t && t.isFrame) {
        const mask = c.maskRect
        const dx = t.left - (mask.left + mask.width / 2)
        const dy = t.top - (mask.top + mask.height / 2)

        mask.set({
          left: mask.left + dx,
          top: mask.top + dy
        })
        mask.setCoords()

        if (imageObjRef.current) {
          const img = imageObjRef.current
          img.left += dx
          img.top += dy
          if (img.clipPath) {
            img.clipPath.left += dx
            img.clipPath.top += dy
            img.clipPath.setCoords()
          }
          img.setCoords()
        }
        c.requestRenderAll()
      }

      if (t && t._maskRect) {
        constrainImageToMask(t, t._maskRect, c)
        dispatch(setTransform({ left: t.left, top: t.top, scale: t.scaleX }))
      }
    })

    // frame resize
    c.on('object:scaling', (e) => {
      const t = e.target
      if (t && t.isFrame) {
        const mask = c.maskRect
        const newW = t.width * t.scaleX
        const newH = t.height * t.scaleY

        mask.set({
          left: t.left - newW / 2,
          top: t.top - newH / 2,
          width: newW,
          height: newH
        })
        mask.setCoords()

        if (imageObjRef.current) {
          const img = imageObjRef.current
          if (img.clipPath) {
            img.clipPath.set({
              left: mask.left + mask.width / 2,
              top: mask.top + mask.height / 2,
              width: mask.width,
              height: mask.height,
              angle: t.angle
            })
            img.clipPath.setCoords()
          }
          img.left = mask.left + mask.width / 2
          img.top = mask.top + mask.height / 2
          img.angle = t.angle
          img.setCoords()
          constrainImageToMask(img, mask, c)
        }

        t.set({
          scaleX: 1,
          scaleY: 1,
          width: newW,
          height: newH
        })
        t.setCoords()
        c.requestRenderAll()
      }
    })

    // rotation event
    c.on('object:rotating', (e) => {
      const t = e.target
      if (t && t.isFrame) {
        const mask = c.maskRect
        mask.set({
          angle: t.angle,
          left: t.left - mask.width / 2,
          top: t.top - mask.height / 2
        })
        mask.setCoords()

        if (imageObjRef.current) {
          const img = imageObjRef.current
          img.angle = t.angle
          img.left = mask.left + mask.width / 2
          img.top = mask.top + mask.height / 2
          img.setCoords()

          if (img.clipPath) {
            img.clipPath.angle = t.angle
            img.clipPath.left = mask.left + mask.width / 2
            img.clipPath.top = mask.top + mask.height / 2
            img.clipPath.setCoords()
          }
        }
        c.requestRenderAll()
      }
    })

    return () => {
      window.removeEventListener('resize', resize)
      c.dispose()
    }
  }, [])

  useEffect(() => {
    if (!activeImage) return
    addImageToCanvas(activeImage)
  }, [activeImage])

  function centerFrame(c) {
    const cw = c.getWidth()
    const ch = c.getHeight()
    const { width: w, height: h } = stencil
    const left = (cw / 2) - (w / 2)
    const top = (ch / 2) - (h / 2) - 10
    if (c.maskRect) c.maskRect.set({ left, top, width: w, height: h })
    if (c.frameRect) c.frameRect.set({ left: left + w / 2, top: top + h / 2 })
  }

  function createFrame(c) {
    const cw = c.getWidth()
    const ch = c.getHeight()
    const { width: w, height: h, rx } = stencil
    const left = (cw / 2) - (w / 2)
    const top = (ch / 2) - (h / 2) - 10

    const maskRect = new Fabric.fabric.Rect({
      left, top, width: w, height: h, rx,
      originX: 'left', originY: 'top',
      selectable: false, evented: false,
      fill: 'transparent'
    })
    maskRect.absolutePositioned = true
    c.add(maskRect)
    c.maskRect = maskRect

    const frameRect = new Fabric.fabric.Rect({
      left: left + w / 2, top: top + h / 2,
      originX: 'center', originY: 'center',
      width: w, height: h, rx,
      fill: 'transparent',
      stroke: '#7b3fe4',
      strokeWidth: 3,
      selectable: true,
      hasControls: true,
      lockRotation: false,
      evented: true
    })
    frameRect.isFrame = true
    c.add(frameRect)
    c.frameRect = frameRect
  }

  function addImageToCanvas(src) {
    const c = fabricRef.current
    if (!c) return
    if (imageObjRef.current) {
      c.remove(imageObjRef.current)
      imageObjRef.current = null
    }
    const mask = c.maskRect

    Fabric.fabric.Image.fromURL(src, (img) => {
      img.set({
        originX: 'center', originY: 'center',
        left: mask.left + mask.width / 2,
        top: mask.top + mask.height / 2
      })
      const minScale = Math.max(mask.width / img.width, mask.height / img.height)
      img.scale(minScale * 1.05)
      img.selectable = true
      img.hasControls = false

      const clipRect = new Fabric.fabric.Rect({
        left: mask.left + mask.width / 2,
        top: mask.top + mask.height / 2,
        width: mask.width, height: mask.height, rx: stencil.rx,
        originX: 'center', originY: 'center',
        absolutePositioned: true
      })
      img.clipPath = clipRect
      img._maskRect = mask
      c.add(img)
      img.moveTo(0)
      imageObjRef.current = img
      dispatch(setTransform({ left: img.left, top: img.top, scale: img.scaleX }))
      c.requestRenderAll()
    }, { crossOrigin: 'anonymous' })
  }

  function constrainImageToMask(img, mask, canvas) {
    img.setCoords()
    const b = img.getBoundingRect(true)
    let dx = 0, dy = 0
    if (b.left > mask.left) dx = mask.left - b.left
    if (b.left + b.width < mask.left + mask.width) dx = (mask.left + mask.width) - (b.left + b.width)
    if (b.top > mask.top) dy = mask.top - b.top
    if (b.top + b.height < mask.top + mask.height) dy = (mask.top + mask.height) - (b.top + b.height)
    if (dx !== 0 || dy !== 0) {
      img.left += dx
      img.top += dy
      img.setCoords()
      if (canvas) canvas.requestRenderAll()
    }
  }

  function zoom(deltaFactor) {
    const img = imageObjRef.current
    if (!img) return
    const c = fabricRef.current
    const mask = c.maskRect
    const curr = img.scaleX
    const newScale = curr * deltaFactor
    const minScale = Math.max(mask.width / img.width, mask.height / img.height)
    img.scale(Math.max(minScale, newScale))
    img.setCoords()
    constrainImageToMask(img, mask, c)
    c.requestRenderAll()
    dispatch(setTransform({ left: img.left, top: img.top, scale: img.scaleX }))
  }

  function onReset() {
    const img = imageObjRef.current
    const c = fabricRef.current
    if (!img) return
    const mask = c.maskRect
    const minScale = Math.max(mask.width / img.width, mask.height / img.height)
    img.scale(minScale)
    img.left = mask.left + mask.width / 2
    img.top = mask.top + mask.height / 2
    img.angle = 0
    img.setCoords()
    if (img.clipPath) {
      img.clipPath.left = mask.left + mask.width / 2
      img.clipPath.top = mask.top + mask.height / 2
      img.clipPath.angle = 0
      img.clipPath.setCoords()
    }
    c.requestRenderAll()
    dispatch(resetTransform())
  }

  return (
    <div className="w-full h-[70vh] flex items-center justify-center" ref={containerRef}>
      <div
        ref={canvasRef}
        className="w-[1000px] h-[620px] bg-[#f2efe9] rounded-md shadow-inner relative overflow-hidden"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          const src = e.dataTransfer.getData("text/plain")
          if (src) {
            dispatch(setActiveImage(src))
          }
        }}
      >
        <div className="absolute top-3 right-3 flex gap-2 z-20">
          <button onClick={() => zoom(1.1)} className="px-2 py-1 bg-white rounded border shadow-sm text-sm">Zoom +</button>
          <button onClick={() => zoom(0.9)} className="px-2 py-1 bg-white rounded border shadow-sm text-sm">Zoom -</button>
          <button onClick={onReset} className="px-2 py-1 bg-white rounded border shadow-sm text-sm">Reset</button>
        </div>
        <div className="absolute left-4 bottom-4 text-xs text-gray-500 z-20">
          Drag image from left panel into frame; use Zoom buttons to scale.  
          You can drag/resize/rotate the frame; image + clip mask follow automatically.
        </div>
      </div>
    </div>
  )
}
