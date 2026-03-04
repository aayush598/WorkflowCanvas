import React from 'react';
import { NodeProps } from 'reactflow';
import { Play } from 'lucide-react';
import { CustomNodeData, BaseNode } from 'workflow-canvas';

export const IoTTriggerNode: React.FC<NodeProps<CustomNodeData>> = (props) => {
    const { data } = props;
    const triggerType = data.properties?.triggerType || 'Manual';

    const headerRight = (
        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded uppercase">
            {triggerType}
        </span>
    );

    return (
        <BaseNode
            {...props}
            title={data.label || 'IoT Trigger'}
            icon={data.icon || <Play size={16} />}
            color={data.color || '#10b981'}
            headerRight={headerRight}
            isTarget={false}
        />
    );
};

export const config = {
    id: 'iotTrigger',
    type: 'iotTrigger',
    label: 'IoT Trigger',
    category: 'Triggers',
    color: '#10b981',
    icon: <Play size={16} />,
    defaultData: {
        description: 'Starts the IoT workflow',
        properties: {
            triggerType: 'Manual Deployment'
        }
    },
    propertyDefinitions: [
        {
            name: 'triggerType',
            label: 'Trigger Type',
            type: 'select',
            options: [
                { label: 'Manual Deployment', value: 'Manual' },
                { label: 'Schedule (Cron)', value: 'Schedule' },
                { label: 'Webhook (HTTP)', value: 'Webhook' }
            ],
            defaultValue: 'Manual'
        }
    ]
};
