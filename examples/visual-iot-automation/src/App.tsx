import { useState } from 'react';
import {
  WorkflowCanvasCore as WorkflowCanvas,
  WorkflowNode,
  WorkflowEdge,
  ThemeProvider,
  WorkflowProvider
} from 'workflow-canvas';
import { Activity, Wifi, Play, Cpu, Radio } from 'lucide-react';
import { registerIoTNodes } from './utils/registerIoTNodes';

// Register IoT nodes initially
registerIoTNodes();

const initialNodes: WorkflowNode[] = [
  {
    id: 'start-1',
    type: 'iotTrigger',
    position: { x: 50, y: 150 },
    data: {
      label: 'Deploy Flow',
      description: 'Trigger on deployment',
      color: '#10b981'
    }
  },
  {
    id: 'sensor-1',
    type: 'tempSensor',
    position: { x: 300, y: 150 },
    data: {
      label: 'Temp Sensor',
      description: 'ESP32 - Factory Floor A',
      color: '#3b82f6'
    }
  },
  {
    id: 'filter-1',
    type: 'signalFilter',
    position: { x: 550, y: 150 },
    data: {
      label: 'FFT / Filter',
      description: 'Noise reduction',
      color: '#14b8a6'
    }
  },
  {
    id: 'cond-1',
    type: 'logicThreshold',
    position: { x: 800, y: 150 },
    data: {
      label: 'Temp > 85°C',
      description: 'Threshold check',
      color: '#f59e0b'
    }
  },
  {
    id: 'relay-1',
    type: 'relayControl',
    position: { x: 1050, y: 50 },
    data: {
      label: 'Relay Control',
      description: 'Turn off Machine A',
      color: '#ec4899'
    }
  },
  {
    id: 'cloud-1',
    type: 'cloudUpload',
    position: { x: 1050, y: 250 },
    data: {
      label: 'Cloud Upload',
      description: 'MQTT to AWS IoT Core',
      color: '#06b6d4'
    }
  },
  {
    id: 'end-1',
    type: 'iotComplete',
    position: { x: 1300, y: 150 },
    data: {
      label: 'Process Complete',
      description: 'Log and end',
      color: '#ef4444'
    }
  }
];

const initialEdges: WorkflowEdge[] = [
  { id: 'e-start-sensor', source: 'start-1', target: 'sensor-1', animated: true },
  { id: 'e-sensor-filter', source: 'sensor-1', target: 'filter-1', animated: true },
  { id: 'e-filter-cond', source: 'filter-1', target: 'cond-1', animated: true },
  { id: 'e-cond-relay', source: 'cond-1', target: 'relay-1', sourceHandle: 'true', animated: true, label: 'True / Fault' },
  { id: 'e-cond-cloud', source: 'cond-1', target: 'cloud-1', sourceHandle: 'false', animated: true, label: 'False / Normal' },
  { id: 'e-relay-cloud', source: 'relay-1', target: 'cloud-1', animated: true },
  { id: 'e-cloud-end', source: 'cloud-1', target: 'end-1', animated: true }
];

function AppContent() {
  const [isDeploying, setIsDeploying] = useState(false);

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      alert('Workflow deployed successfully to ESP32 Gateway device!');
    }, 1500);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', background: '#0f172a' }}>

      {/* Header Bar */}
      <div style={{
        height: '64px',
        background: '#1e293b',
        borderBottom: '1px solid #334155',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        color: 'white'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Cpu className="w-6 h-6 text-emerald-400" />
          <div>
            <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Visual IoT Automation Studio</h1>
            <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>Factory Floor - ESP32 Gateway Node</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#10b981' }}>
            <Wifi className="w-4 h-4" /> Gateway Online
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#f59e0b' }}>
            <Activity className="w-4 h-4" /> Live CPU: 34%
          </div>
          <button
            onClick={handleDeploy}
            style={{
              background: isDeploying ? '#3b82f6' : '#10b981',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
          >
            {isDeploying ? <Radio className="w-4 h-4 animate-pulse" /> : <Play className="w-4 h-4" />}
            {isDeploying ? 'Deploying...' : 'Deploy to ESP32'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Device Discovery Sidebar - Custom Left Sidebar */}
        <div style={{
          width: '260px',
          background: '#1e293b',
          borderRight: '1px solid #334155',
          padding: '16px',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          zIndex: 10
        }}>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#94a3b8', marginBottom: '12px', textTransform: 'uppercase' }}>Discovered Devices (mDNS)</h3>
            <div style={{ background: '#0f172a', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontWeight: '500', fontSize: '14px' }}>ESP32-Temp-A</span>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
              </div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>192.168.1.104</div>
            </div>
            <div style={{ background: '#0f172a', padding: '12px', borderRadius: '8px', border: '1px solid #334155', marginTop: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontWeight: '500', fontSize: '14px' }}>Relay-Module-1</span>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
              </div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>192.168.1.105</div>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#94a3b8', marginBottom: '12px', textTransform: 'uppercase' }}>Toolbox Mapping</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#8b5cf6' }}>●</span> Input → Sensor</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#ec4899' }}>●</span> Action → Device Control</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#f59e0b' }}>●</span> Conditional → Logic</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ color: '#06b6d4' }}>●</span> API Call → Cloud Upload</li>
            </ul>
          </div>
        </div>

        {/* Main Canvas Area */}
        <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <WorkflowCanvas
              showMinimap={true}
              showControls={true}
              showSidebar={true}
            />
          </div>

          {/* Execution Logs / Console */}
          <div style={{
            height: '180px',
            background: '#0f172a',
            borderTop: '1px solid #334155',
            padding: '12px',
            color: '#94a3b8',
            fontFamily: 'monospace',
            fontSize: '12px',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ color: '#cbd5e1', fontWeight: 'bold', fontSize: '11px', textTransform: 'uppercase' }}>Edge Execution Logs</span>
              <span style={{ color: '#10b981' }}>Live Streaming...</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div><span style={{ color: '#64748b' }}>[17:52:01]</span> <span style={{ color: '#3b82f6' }}>INFO:</span> Initializing workflow 'FactoryAuto_v1'...</div>
              <div><span style={{ color: '#64748b' }}>[17:52:02]</span> <span style={{ color: '#3b82f6' }}>INFO:</span> Connected to ESP32 Gateway (192.168.1.104)</div>
              <div><span style={{ color: '#64748b' }}>[17:52:04]</span> <span style={{ color: '#10b981' }}>DATA:</span> TempSensor [A] {'->'} 24.5°C</div>
              <div><span style={{ color: '#64748b' }}>[17:52:06]</span> <span style={{ color: '#10b981' }}>DATA:</span> TempSensor [A] {'->'} 26.1°C</div>
              <div><span style={{ color: '#64748b' }}>[17:52:08]</span> <span style={{ color: '#3b82f6' }}>INFO:</span> SignalFilter {'->'} Noise Floor identified at -84dBm</div>
              <div><span style={{ color: '#64748b' }}>[17:52:10]</span> <span style={{ color: '#10b981' }}>DATA:</span> TempSensor [A] {'->'} 28.4°C</div>
              <div><span style={{ color: '#64748b' }}>[17:52:11]</span> <span style={{ color: '#f59e0b' }}>WARN:</span> Gateway latency increased to 45ms</div>
              <div style={{ color: '#cbd5e1', borderLeft: '2px solid #3b82f6', paddingLeft: '8px', marginTop: '4px' }}>_ Waiting for next event...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <WorkflowProvider initialNodes={initialNodes} initialEdges={initialEdges}>
        <AppContent />
      </WorkflowProvider>
    </ThemeProvider>
  );
}

export default App;
