import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: unknown) {
    console.error('Admin render error:', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="p-6 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl m-4">
          <p className="font-semibold mb-1">Помилка рендеру:</p>
          <pre className="whitespace-pre-wrap break-words">{this.state.error.message}</pre>
        </div>
      )
    }
    return this.props.children
  }
}
