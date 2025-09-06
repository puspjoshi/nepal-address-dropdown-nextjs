"use client"

import React from 'react'

function TextInput({id, label, name, placeholder, onChnage}) {
  return (
      <div className="mb-4">
        <label className="text-2xl block text-gray-800 font-medium capitalize">{label}</label>
        <input type="text" onChange={onChnage} id={id}  name={name} placeholder={placeholder} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
    </div>
  )
}

export default TextInput