import React, { ReactElement, ReactNode } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Toaster } from 'sonner'



export const CustomWrapper = ({ children }: { children: ReactNode }) => {
  return <>
    {children}
    <Toaster />
  </>
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: CustomWrapper, ...options })


export * from '@testing-library/react'

// override render method
export { customRender as render }
