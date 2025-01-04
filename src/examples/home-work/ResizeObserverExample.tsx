import React, { useEffect, useRef, useState } from 'react';

interface Size {
  width: number;
  height: number;
}

export const ResizeObserverExample: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{ 
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '20px',
        margin: '20px',
        resize: 'both',
        overflow: 'auto',
        minWidth: '300px',
        minHeight: '200px',
        backgroundColor: '#f8f9fa'
      }}
    >
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        height: '100%',
        gap: '16px'
      }}>
        <h3 style={{ margin: 0, color: '#2c3e50' }}>Resizable Container</h3>
        
        <div style={{ 
          backgroundColor: '#fff',
          padding: '16px',
          borderRadius: '6px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <p style={{ margin: '0 0 12px 0', fontWeight: 'bold' }}>Current dimensions:</p>
          <ul style={{ 
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            gap: '16px'
          }}>
            <li style={{ 
              backgroundColor: '#e9ecef',
              padding: '8px 16px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>📏</span>
              <span>Width: {Math.round(size.width)}px</span>
            </li>
            <li style={{ 
              backgroundColor: '#e9ecef',
              padding: '8px 16px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>📐</span>
              <span>Height: {Math.round(size.height)}px</span>
            </li>
          </ul>
        </div>

        <div style={{ 
          marginTop: 'auto',
          fontSize: '13px',
          color: '#6c757d',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>💡</span>
          <span>Drag the bottom-right corner to resize this container</span>
        </div>
      </div>
    </div>
  );
};
