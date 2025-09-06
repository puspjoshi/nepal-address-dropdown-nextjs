"use client"

import React from 'react'

function SelectInput({label, id, name, value, onChange, options, placeholder}) {
  
  return (
    <div className="mb-4">
        <label className="text-2xl block text-gray-800 font-medium capitalize">{label}</label>
        <select 
            id={id}
            value={value}
            name={name}
            onChange={onChange}
            
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        >
            <option value="">{placeholder}</option>
            {
              options?.map((opt)=> (
                <option key={opt.id} value={opt.id}> { opt.name } </option>
              ))
            }
            
        </select>
    </div>
  )
}

export default SelectInput