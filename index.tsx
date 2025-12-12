import React, { Component, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// Professional Error Boundary to prevent "White Screen of Death"
class SystemErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          height: '100vh',
          width: '100vw',
          backgroundColor: '#020617',
          color: '#ef4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'monospace',
          flexDirection: 'column',
          padding: '20px'
        }}>
          <div style={{ maxWidth: '600px', width: '100%', border: '1px solid #7f1d1d', padding: '2rem', backgroundColor: 'rgba(127, 29, 29, 0.1)', borderRadius: '8px' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', letterSpacing: '0.1em' }}>/// CRITICAL SYSTEM FAILURE ///</h1>
            <p style={{ marginBottom: '1rem', color: '#fca5a5' }}>The Quantum Nexus encountered an unrecoverable runtime error.</p>
            <div style={{ backgroundColor: '#000', padding: '1rem', borderRadius: '4px', overflowX: 'auto', border: '1px solid #450a0a' }}>
              <code style={{ fontSize: '0.8rem' }}>
                {this.state.error?.message || 'Unknown Quantum State Error'}
              </code>
            </div>
            <p style={{ marginTop: '1rem', fontSize: '0.75rem', opacity: 0.7 }}>
              Error Code: 0xCRASH_PROTOCOL_INIT<br/>
              Timestamp: {new Date().toISOString()}
            </p>
            <button 
              onClick={() => window.location.reload()}
              style={{
                marginTop: '20px',
                backgroundColor: '#7f1d1d',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                cursor: 'pointer',
                fontFamily: 'monospace',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              Reboot System
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <SystemErrorBoundary>
      <App />
    </SystemErrorBoundary>
  </React.StrictMode>
);