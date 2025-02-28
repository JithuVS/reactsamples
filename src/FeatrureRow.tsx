import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { FeatureMap, UserRole } from '../types';
import { hasFeature } from '../utils';
import SubFeatureRow from './SubFeatureRow';

interface FeatureRowProps {
  feature: string;
  featureMap: FeatureMap;
  roles: UserRole[];
  level: number;
}

const FeatureRow: React.FC<FeatureRowProps> = ({ feature, featureMap, roles, level }) => {
  const [expanded, setExpanded] = useState(false);
  const featureInfo = featureMap[feature];
  const hasSubFeatures = Object.keys(featureInfo.subFeatures).length > 0;

  return (
    <>
      <tr className="border-b hover:bg-gray-50">
        <td className="px-4 py-2 flex items-center">
          <div style={{ marginLeft: `${level * 20}px` }} className="flex items-center">
            {hasSubFeatures && (
              <button 
                onClick={() => setExpanded(!expanded)} 
                className="mr-2 focus:outline-none"
              >
                {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
            )}
            <span className="font-medium">{feature}</span>
          </div>
        </td>
        {roles.map((role) => (
          <td key={`${role.roleName}-${feature}`} className="px-4 py-2 text-center">
            <input
              type="checkbox"
              checked={hasFeature(role, feature)}
              readOnly
              className="h-4 w-4"
            />
          </td>
        ))}
      </tr>
      
      {expanded && Object.keys(featureInfo.subFeatures).map((subFeature) => (
        <SubFeatureRow
          key={`${feature}-${subFeature}`}
          feature={feature}
          subFeature={subFeature}
          featureMap={featureMap}
          roles={roles}
          level={level + 1}
        />
      ))}
    </>
  );
};

export default FeatureRow;
