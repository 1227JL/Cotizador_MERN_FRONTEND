import React from 'react'

export default function Spinner({children, size}) {
  return (
    <> 
      <div className="spinner">
        <div className="cube1"></div>
        <div className="cube2"></div>
      </div>
      <p className={`text-center ${size}`}>{children}</p>
    </>
  )
}
