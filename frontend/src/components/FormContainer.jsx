import React from 'react'

const FormContainer = ({children}) => {
  return (
    <section className='bg-neutral-200 py-6 h-fit w-11/12 max-w-[650px] rounded border border-neutral-300'>{children}</section>
  )
}

export default FormContainer