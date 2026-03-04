import React from 'react';
import { NodeProps } from 'reactflow';
import { Zap } from 'lucide-react';
import { CustomNodeData, BaseNode } from 'workflow-canvas';

export const SignalFilterNode: React.FC<NodeProps<CustomNodeData>> = (props) => {
    const { data } = props;
    const filterType = data.properties?.filterType || 'FFT';
    const windowSize = data.properties?.windowSize || '1024';

    const headerRight = (
        <>
            <span className="text-[9px] font-bold text-teal-700 bg-teal-100 px-1.5 py-0.5 rounded uppercase">
                {filterType}
            </span>
            <span className="text-[9px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded font-mono">
                {windowSize} samples
            </span>
        </>
    );

    return (
        <BaseNode
            {...props}
            title={data.label || 'Signal Filter'}
            icon={data.icon || <Zap size={16} />}
            color={data.color || '#14b8a6'}
            headerRight={headerRight}
        />
    );
};

export const config = {
    id: 'signalFilter',
    type: 'signalFilter',
    label: 'Signal Filter',
    category: 'Processing',
    color: '#14b8a6',
    icon: <Zap size={16} />,
    defaultData: {
        description: 'Applies DSP on sensor signal',
        properties: {
            filterType: 'Low-Pass',
            windowSize: '256'
        }
    },
    propertyDefinitions: [
        {
            name: 'filterType',
            label: 'Filter Algorithm',
            type: 'select',
            options: [
                { label: 'Fast Fourier Transform (FFT)', value: 'FFT' },
                { label: 'Low-Pass Filter', value: 'Low-Pass' },
                { label: 'High-Pass Filter', value: 'High-Pass' },
                { label: 'Moving Average', value: 'Moving Avg' }
            ],
            defaultValue: 'FFT'
        },
        {
            name: 'windowSize',
            label: 'Sample Window Size',
            type: 'string',
            defaultValue: '1024'
        }
    ]
};
