import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { FeatureMap, UserRole } from '../types';
import { hasSubFeature, hasChildFeature } from '../utils';

interface SubFeatureRowProps {
  feature: string;
  subFeature: string;
  featureMap: FeatureMap;
  roles: UserRole[];
  level: number;
}

const SubFeatureRow: React.FC<SubFeatureRowProps> = ({ 
  feature, 
  subFeature, 
  featureMap, 
  roles, 
  level 
}) => {
  const [expanded, setExpanded] = useState(false);
  const subFeatureInfo = featureMap[feature].subFeatures[subFeature];
  const hasChildFeatures = Object.keys(subFeatureInfo.childFeatures).length > 0;

  return (
    <>
      <tr className="border-b bg-gray-50 hover:bg-gray-100">
        <td className="px-4 py-2 flex items-center">
          <div style={{ marginLeft: `${level * 20}px` }} className="flex items-center">
            {hasChildFeatures && (
              <button 
                onClick={() => setExpanded(!expanded)} 
                className="mr-2 focus:outline-none"
              >
                {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
            )}
            <span className="text-gray-700">{subFeature}</span>
          </div>
        </td>
        {roles.map((role) => (
          <td key={`${role.roleName}-${feature}-${subFeature}`} className="px-4 py-2 text-center">
            <input
              type="checkbox"
              checked={hasSubFeature(role, feature, subFeature)}
              readOnly
              className="h-4 w-4"
            />
          </td>
        ))}
      </tr>
      
      {expanded && Object.keys(subFeatureInfo.childFeatures).map((childFeature) => (
        <tr key={`${feature}-${subFeature}-${childFeature}`} className="border-b bg-gray-100 hover:bg-gray-200">
          <td className="px-4 py-2 flex items-center">
            <div style={{ marginLeft: `${(level + 1) * 20}px` }} className="flex items-center">
              <span className="text-gray-600">{childFeature}</span>
            </div>
          </td>
          {roles.map((role) => (
            <td 
              key={`${role.roleName}-${feature}-${subFeature}-${childFeature}`} 
              className="px-4 py-2 text-center"
            >
              <input
                type="checkbox"
                checked={hasChildFeature(role, feature, subFeature, childFeature)}
                readOnly
                className="h-4 w-4"
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default SubFeatureRow;
