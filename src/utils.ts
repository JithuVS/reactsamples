import { Feature, FeatureMap, UserRole } from './types';

// Extract all features, subfeatures, and child features
export const extractAllFeatures = (features: Feature[]): FeatureMap => {
  const featureMap: FeatureMap = {};

  features.forEach(feature => {
    if (!featureMap[feature.feature]) {
      featureMap[feature.feature] = {
        actions: [], // We're not using actions anymore
        subFeatures: {}
      };
    }

    feature.subFeatures.forEach(subFeature => {
      if (!featureMap[feature.feature].subFeatures[subFeature.subFeature]) {
        featureMap[feature.feature].subFeatures[subFeature.subFeature] = {
          actions: [], // We're not using actions anymore
          childFeatures: {}
        };
      }

      subFeature.childFeatures.forEach(childFeature => {
        if (!featureMap[feature.feature].subFeatures[subFeature.subFeature].childFeatures[childFeature.childFeature]) {
          featureMap[feature.feature].subFeatures[subFeature.subFeature].childFeatures[childFeature.childFeature] = {
            actions: [] // We're not using actions anymore
          };
        }
      });
    });
  });

  return featureMap;
};

// Check if a role has a specific feature
export const hasFeature = (role: UserRole, featureName: string): boolean => {
  return role.allowedFeatures.some(f => f.feature === featureName);
};

// Check if a role has a specific subfeature
export const hasSubFeature = (
  role: UserRole,
  featureName: string,
  subFeatureName: string
): boolean => {
  const feature = role.allowedFeatures.find(f => f.feature === featureName);
  if (!feature) return false;
  
  return feature.subFeatures.some(sf => sf.subFeature === subFeatureName);
};

// Check if a role has a specific child feature
export const hasChildFeature = (
  role: UserRole,
  featureName: string,
  subFeatureName: string,
  childFeatureName: string
): boolean => {
  const feature = role.allowedFeatures.find(f => f.feature === featureName);
  if (!feature) return false;
  
  const subFeature = feature.subFeatures.find(sf => sf.subFeature === subFeatureName);
  if (!subFeature) return false;
  
  return subFeature.childFeatures.some(cf => cf.childFeature === childFeatureName);
};

// The following functions are kept for backward compatibility
export const extractAllActions = extractAllFeatures;
export const hasFeatureAction = (role: UserRole, featureName: string, actionName: string): boolean => {
  const feature = role.allowedFeatures.find(f => f.feature === featureName);
  return feature?.allowedFeatureActions[actionName] === true;
};
export const hasSubFeatureAction = (
  role: UserRole,
  featureName: string,
  subFeatureName: string,
  actionName: string
): boolean => {
  const feature = role.allowedFeatures.find(f => f.feature === featureName);
  if (!feature) return false;
  
  const subFeature = feature.subFeatures.find(sf => sf.subFeature === subFeatureName);
  return subFeature?.allowedSubFeatureActions[actionName] === true;
};
export const hasChildFeatureAction = (
  role: UserRole,
  featureName: string,
  subFeatureName: string,
  childFeatureName: string,
  actionName: string
): boolean => {
  const feature = role.allowedFeatures.find(f => f.feature === featureName);
  if (!feature) return false;
  
  const subFeature = feature.subFeatures.find(sf => sf.subFeature === subFeatureName);
  if (!subFeature) return false;
  
  const childFeature = subFeature.childFeatures.find(cf => cf.childFeature === childFeatureName);
  return childFeature?.allowedChildFeatureActions[actionName] === true;
};
