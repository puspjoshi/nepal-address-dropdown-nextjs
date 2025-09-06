"use client"

import React from 'react'

function ButtonInput( { id, name, label, onClick }) {
  return (
    <div className="mb-4">
        <button  
            type="button" 
            id={id} 
            name={name} 
            onClick={onClick}
            className="
                w-full 
                border 
                border-gray-300 
                rounded-lg 
                px-4 
                py-2 
                focus:outline-none 
                focus:ring 
                hover:cursor-pointer 
                focus:ring-blue-200"
        > {label} </button>
    </div>
  )
}

export default ButtonInput