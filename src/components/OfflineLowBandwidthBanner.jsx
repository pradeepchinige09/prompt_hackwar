import React from 'react';
import { Wifi, WifiOff, Signal } from 'lucide-react';

export function OfflineLowBandwidthBanner({ isLowBandwidth, onToggle }) {
  return (
    <div className="offline-banner" id="low-bandwidth-banner">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <span className="offline-badge">
          {isLowBandwidth ? <WifiOff size={14} color="var(--accent-saffron)" /> : <Wifi size={14} color="var(--accent-emerald)" />}
          {isLowBandwidth ? "RURAL 2G & LOW-BANDWIDTH MODE ACTIVE" : "HIGH-SPEED STREAMING MODE"}
        </span>

        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {isLowBandwidth 
            ? "Offline Local Cache Active • Animations paused & lightweight UI active for low-connectivity schools" 
            : "Ultra-low latency streaming with real-time SVG simulation canvas"}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <button
          className="topic-pill"
          style={{ 
            padding: '0.25rem 0.65rem', 
            fontSize: '0.72rem',
            background: isLowBandwidth ? 'rgba(245,158,11,0.2)' : 'transparent',
            borderColor: isLowBandwidth ? 'var(--accent-saffron)' : 'var(--border-subtle)'
          }}
          onClick={onToggle}
          id="toggle-low-bandwidth-btn"
        >
          <Signal size={12} /> {isLowBandwidth ? "Disable 2G Mode" : "Simulate Rural 2G Mode"}
        </button>
      </div>
    </div>
  );
}
