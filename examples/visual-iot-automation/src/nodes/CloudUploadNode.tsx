import React from 'react';
import { NodeProps } from 'reactflow';
import { Cloud } from 'lucide-react';
import { CustomNodeData, BaseNode } from 'workflow-canvas';

export const CloudUploadNode: React.FC<NodeProps<CustomNodeData>> = (props) => {
    const { data } = props;
    const provider = data.properties?.provider || 'AWS IoT';
    const method = data.properties?.method || 'MQTT';

    const headerRight = (
        <>
            <span className="text-[9px] font-bold text-cyan-700 bg-cyan-100 px-1.5 py-0.5 rounded uppercase">
                {method}
            </span>
            <span className="text-[9px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded font-mono">
                {provider}
            </span>
        </>
    );

    return (
        <BaseNode
            {...props}
            title={data.label || 'Cloud Upload'}
            icon={data.icon || <Cloud size={16} />}
            color={data.color || '#06b6d4'}
            headerRight={headerRight}
        />
    );
};

export const config = {
    id: 'cloudUpload',
    type: 'cloudUpload',
    label: 'Cloud Upload',
    category: 'Cloud',
    color: '#06b6d4',
    icon: <Cloud size={16} />,
    defaultData: {
        description: 'Sends data to a cloud provider',
        properties: {
            provider: 'AWS IoT Core',
            method: 'MQTT',
            endpoint: 'your-endpoint.iot.aws.com'
        }
    },
    propertyDefinitions: [
        {
            name: 'provider',
            label: 'Cloud Provider',
            type: 'select',
            options: [
                { label: 'AWS IoT Core', value: 'AWS IoT Core' },
                { label: 'Azure IoT Hub', value: 'Azure IoT Hub' },
                { label: 'GCP IoT Core', value: 'GCP IoT Core' },
                { label: 'Custom MQTT Broker', value: 'Custom MQTT Broker' }
            ],
            defaultValue: 'AWS IoT Core'
        },
        {
            name: 'method',
            label: 'Upload Method',
            type: 'select',
            options: [
                { label: 'MQTT', value: 'MQTT' },
                { label: 'HTTPS POST', value: 'HTTPS POST' }
            ],
            defaultValue: 'MQTT'
        },
        {
            name: 'endpoint',
            label: 'Endpoint/Broker URL',
            type: 'string',
            defaultValue: 'hostname'
        }
    ]
};
