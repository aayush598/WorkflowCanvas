import React from 'react';
import { NodeProps } from 'reactflow';
import { Activity } from 'lucide-react';
import { CustomNodeData, BaseNode } from 'workflow-canvas';

export const TempSensorNode: React.FC<NodeProps<CustomNodeData>> = (props) => {
    const { data } = props;
    const deviceId = data.properties?.deviceId || 'ESP-001';
    const protocol = data.properties?.protocol || 'mDNS';

    const headerRight = (
        <>
            <span className="text-[9px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded uppercase">
                {protocol}
            </span>
            <span className="text-[9px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded font-mono">
                {deviceId}
            </span>
        </>
    );

    return (
        <BaseNode
            {...props}
            title={data.label || 'Temp Sensor'}
            icon={data.icon || <Activity size={16} />}
            color={data.color || '#3b82f6'}
            headerRight={headerRight}
        />
    );
};

export const config = {
    id: 'tempSensor',
    type: 'tempSensor',
    label: 'Temperature Sensor',
    category: 'Sensors',
    color: '#3b82f6',
    icon: <Activity size={16} />,
    defaultData: {
        description: 'Reads temperature data from an ESP device',
        properties: {
            deviceId: 'ESP32-Temp-A',
            protocol: 'MQTT',
            topic: 'sensors/temp/A'
        }
    },
    propertyDefinitions: [
        {
            name: 'deviceId',
            label: 'Device ID',
            type: 'string',
            defaultValue: 'ESP32-Temp-A',
        },
        {
            name: 'protocol',
            label: 'Protocol',
            type: 'select',
            options: [
                { label: 'MQTT', value: 'MQTT' },
                { label: 'HTTP', value: 'HTTP' },
                { label: 'CoAP', value: 'CoAP' }
            ],
            defaultValue: 'MQTT'
        },
        {
            name: 'topic',
            label: 'MQTT Topic (If applicable)',
            type: 'string',
            defaultValue: 'sensors/temp/A'
        }
    ]
};
