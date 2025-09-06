"use client"
import {React, useEffect, useState} from 'react'
import {motion, AnimatePresence} from "framer-motion"
import Links from '../components/Links';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function ThankYou() {
  const [addresses, setAddresses] = useState([]);
  console.log(addresses);
  useEffect(()=>{
    const fetchAddress = async () => {
      try{
        const response = await fetch(`${BASE_URL}address.php?type=allAddress`);
        
        if(!response.ok){
          throw new Error(`HTTP error. status : ${response.status}`)
        }
        
        const data = await response.json();
        if(Array.isArray(data)){
          setAddresses(data);
        }else{
          setAddresses([]);
        }
      
      }catch(e){
        console.log(" Could not fetch addresses ",e);  
      }
    };
    fetchAddress();
  },[])
  
  return (
    <>
    <div className="bg-blue-600 font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
         <Links />       
        <AnimatePresence>
        
          <motion.div
            key="box"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start bg-white rounded-2xl shadow-xl p-8 w-1/3"
          >
            {
              addresses.map((address)=>(
                <div key={address.id} className='border-b border-b-blue-500 pb-5'>
                  {address.prvince_name} - {address.city_name} - {address.zone_name} , {address.address}
                </div>      
              ))
            }
            
          </motion.div>
        </AnimatePresence>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 text-white hover:underline hover:underline-offset-4"
          href="https://rubricitsolutions.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Copyright &copy; 2025 Rubric IT Inc
        </a>
        
      </footer>
    </div>
    </>
  )
}

export default ThankYou