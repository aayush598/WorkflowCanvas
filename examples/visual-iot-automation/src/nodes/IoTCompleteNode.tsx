import React from 'react';
import { NodeProps } from 'reactflow';
import { PowerOff } from 'lucide-react';
import { CustomNodeData, BaseNode } from 'workflow-canvas';

export const IoTCompleteNode: React.FC<NodeProps<CustomNodeData>> = (props) => {
    const { data } = props;
    const action = data.properties?.action || 'Log Event';

    const headerRight = (
        <span className="text-[9px] font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded uppercase">
            {action}
        </span>
    );

    return (
        <BaseNode
            {...props}
            title={data.label || 'End Process'}
            icon={data.icon || <PowerOff size={16} />}
            color={data.color || '#ef4444'}
            headerRight={headerRight}
            isSource={false}
        />
    );
};

export const config = {
    id: 'iotComplete',
    type: 'iotComplete',
    label: 'End Process',
    category: 'System',
    color: '#ef4444',
    icon: <PowerOff size={16} />,
    defaultData: {
        description: 'Terminates the local IoT process step',
        properties: {
            action: 'Log Event'
        }
    },
    propertyDefinitions: [
        {
            name: 'action',
            label: 'On Complete Action',
            type: 'select',
            options: [
                { label: 'Log Event Locally', value: 'Log Event' },
                { label: 'Sleep Device (Deep Sleep)', value: 'Deep Sleep' },
                { label: 'Reset Loop', value: 'Reset Loop' }
            ],
            defaultValue: 'Log Event'
        }
    ]
};
