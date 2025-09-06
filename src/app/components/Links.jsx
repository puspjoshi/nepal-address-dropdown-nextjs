import React from 'react'
import Link from 'next/link'
function Links() {
  return (
    <>
      <div className="flex gap-4 text-white">
          <Link href="/">Home</Link>
          <Link href="/thank-you">Address List</Link>
        </div>
    </>
  )
}

export default Links