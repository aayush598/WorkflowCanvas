import React from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import { GitBranch } from 'lucide-react';
import { CustomNodeData, BaseNode } from 'workflow-canvas';

export const LogicNode: React.FC<NodeProps<CustomNodeData>> = (props) => {
    const { data } = props;
    const operator = data.properties?.operator || '>';
    const threshold = data.properties?.threshold || '85';

    const headerRight = (
        <>
            <span className="text-[9px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded uppercase">
                {operator} {threshold}
            </span>
        </>
    );

    const handles = (
        <>
            <Handle
                type="source"
                position={Position.Right}
                id="true"
                isConnectable={props.isConnectable}
                className="w-3 h-3 !bg-green-500 !border-2 !border-white !top-[40%]"
            />
            <Handle
                type="source"
                position={Position.Right}
                id="false"
                isConnectable={props.isConnectable}
                className="w-3 h-3 !bg-red-500 !border-2 !border-white !top-[60%]"
            />
        </>
    );

    return (
        <BaseNode
            {...props}
            title={data.label || 'Condition'}
            icon={data.icon || <GitBranch size={16} />}
            color={data.color || '#f59e0b'}
            headerRight={headerRight}
            isSource={false}
            handles={handles}
        />
    );
};

export const config = {
    id: 'logicThreshold',
    type: 'logicThreshold',
    label: 'Threshold Logic',
    category: 'Logic',
    color: '#f59e0b',
    icon: <GitBranch size={16} />,
    defaultData: {
        description: 'Checks if value exceeds/falls below threshold',
        properties: {
            operator: '>',
            threshold: '85',
            valuePath: 'payload.temperature'
        }
    },
    propertyDefinitions: [
        {
            name: 'valuePath',
            label: 'Data Path (JSON)',
            type: 'string',
            defaultValue: 'payload.temperature',
        },
        {
            name: 'operator',
            label: 'Operator',
            type: 'select',
            options: [
                { label: '>', value: '>' },
                { label: '<', value: '<' },
                { label: '==', value: '==' },
                { label: '!=', value: '!=' }
            ],
            defaultValue: '>'
        },
        {
            name: 'threshold',
            label: 'Threshold Value',
            type: 'string',
            defaultValue: '85'
        }
    ]
};
