import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'OpenClaw How - Real Cases & Scene Solutions'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1a2e',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '12px',
            marginBottom: '32px',
          }}
        >
          <span style={{ fontSize: '72px', fontWeight: 800, color: '#ff6b35' }}>
            OpenClaw
          </span>
          <span style={{ fontSize: '72px', fontWeight: 800, color: '#4ecdc4' }}>
            How
          </span>
        </div>
        <p
          style={{
            fontSize: '28px',
            color: '#cccccc',
            maxWidth: '700px',
            textAlign: 'center',
            lineHeight: 1.5,
          }}
        >
          Real-world cases &amp; ready-to-use scene solutions built with AI agents
        </p>
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '40px',
          }}
        >
          <span
            style={{
              fontSize: '18px',
              color: '#ffffff',
              backgroundColor: '#ff6b35',
              padding: '8px 24px',
              borderRadius: '24px',
            }}
          >
            Case Studies
          </span>
          <span
            style={{
              fontSize: '18px',
              color: '#ffffff',
              backgroundColor: '#4ecdc4',
              padding: '8px 24px',
              borderRadius: '24px',
            }}
          >
            Scene Solutions
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
