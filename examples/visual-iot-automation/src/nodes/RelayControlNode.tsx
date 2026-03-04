import React from 'react';
import { NodeProps } from 'reactflow';
import { Cpu } from 'lucide-react';
import { CustomNodeData, BaseNode } from 'workflow-canvas';

export const RelayControlNode: React.FC<NodeProps<CustomNodeData>> = (props) => {
    const { data } = props;
    const pin = data.properties?.pin || 'GPIO 4';
    const state = data.properties?.defaultState || 'LOW';

    const headerRight = (
        <>
            <span className="text-[9px] font-bold text-pink-700 bg-pink-100 px-1.5 py-0.5 rounded uppercase">
                {state}
            </span>
            <span className="text-[9px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded font-mono">
                {pin}
            </span>
        </>
    );

    return (
        <BaseNode
            {...props}
            title={data.label || 'Relay Control'}
            icon={data.icon || <Cpu size={16} />}
            color={data.color || '#ec4899'}
            headerRight={headerRight}
        />
    );
};

export const config = {
    id: 'relayControl',
    type: 'relayControl',
    label: 'Relay Control',
    category: 'Actuators',
    color: '#ec4899',
    icon: <Cpu size={16} />,
    defaultData: {
        description: 'Triggers a relay on a connected ESP device',
        properties: {
            deviceId: 'ESP32-Relay-X',
            pin: 'GPIO 4',
            defaultState: 'LOW'
        }
    },
    propertyDefinitions: [
        {
            name: 'deviceId',
            label: 'Device ID',
            type: 'string',
            defaultValue: 'ESP32-Relay-X',
        },
        {
            name: 'pin',
            label: 'GPIO Pin',
            type: 'string',
            defaultValue: 'GPIO 4',
        },
        {
            name: 'defaultState',
            label: 'Default State',
            type: 'select',
            options: [
                { label: 'LOW', value: 'LOW' },
                { label: 'HIGH', value: 'HIGH' }
            ],
            defaultValue: 'LOW'
        }
    ]
};
