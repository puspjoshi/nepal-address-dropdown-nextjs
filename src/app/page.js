"use client"
import {motion, AnimatePresence} from 'framer-motion';
import AddressForm from "./components/AddressForm";
import Links from './components/Links';
function Home() {
  
  return (
    
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
      
            <AddressForm />
      
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
  );
}

export default Home