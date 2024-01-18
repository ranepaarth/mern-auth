import React from 'react'

const FormHeader = ({header}) => {
  return (
    <h3 className='text-2xl md:text-3xl capitalize font-bold text-center text-neutral-800'>{header}</h3>
  )
}

export default FormHeader