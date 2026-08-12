import { render, screen } from '@testing-library/react'
import OmniSpace from '../src/app/page'

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

describe('OmniSpace Page', () => {
  it('renders the header title', () => {
    render(<OmniSpace />)
    expect(screen.getByText('OmniSpace')).toBeInTheDocument()
  })

  it('renders the navigation items', () => {
    render(<OmniSpace />)
    expect(screen.getAllByText('System Overview')[0]).toBeInTheDocument()
    expect(screen.getByText('Secret Scanner')).toBeInTheDocument()
    expect(screen.getByText('API Proxy')).toBeInTheDocument()
    expect(screen.getByText('Local Docs')).toBeInTheDocument()
  })
})
