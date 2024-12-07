import React from 'react'
import DocumentContent from "../../components/document-page/document-content"
import Menu from "../../components/component/menu"
export default function DocumentPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Menu/>
      <main className='ml-[60px] grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
        <DocumentContent/>
      </main>
    </div>
  )
}