import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface FeatureAction {
  [key: string]: boolean;
}

interface ChildFeature {
  childFeature: string;
  childFeatureDescription: string | null;
  childFeaturePermissions: string;
  childFeatureVisibility: boolean;
  allowedchildFeatureActions: FeatureAction;
  selected?: boolean;
}

interface SubFeature {
  subFeature: string;
  subFeatureDescription: string | null;
  subFeaturePermissions: string;
  subFeatureVisibility: boolean;
  allowedSubFeatureActions: FeatureAction;
  childFeatures: ChildFeature[];
  selected?: boolean;
}

interface Feature {
  feature: string;
  featureDescription: string | null;
  featurePermissions: string;
  featureVisibility: boolean;
  allowedFeatureActions: FeatureAction;
  subFeatures: SubFeature[];
  selected?: boolean;
}

interface RoleAssociation {
  role: string;
  features: Feature[];
  createdAt: string;
}

const initialFeatures: Feature[] = [
  {
    feature: "Vulnerability Management",
    featureDescription: null,
    featurePermissions: "VIEW",
    featureVisibility: true,
    allowedFeatureActions: {},
    subFeatures: [
      {
        subFeature: "Dashboard",
        subFeatureDescription: null,
        subFeaturePermissions: "VIEW",
        subFeatureVisibility: true,
        allowedSubFeatureActions: {
          view: true,
          lobwidgets: false,
        },
        childFeatures: [
          {
            childFeature: "Black Duck",
            childFeatureDescription: null,
            childFeaturePermissions: "VIEW",
            childFeatureVisibility: true,
            allowedchildFeatureActions: {
              view: true,
              markforupload: false,
              downloadscan: false,
            },
          },
        ]
      },
      {
        subFeature: "Black Duck",
        subFeatureDescription: null,
        subFeaturePermissions: "VIEW",
        subFeatureVisibility: true,
        allowedSubFeatureActions: {
          view: true,
          markforupload: false,
          downloadscan: false,
        },
        childFeatures: [
          {
            childFeature: "Black Duck",
            childFeatureDescription: null,
            childFeaturePermissions: "VIEW",
            childFeatureVisibility: true,
            allowedchildFeatureActions: {
              view: true,
              markforupload: false,
              downloadscan: false,
            },
          },
        ]
      },
      {
        subFeature: "Checkmarx",
        subFeatureDescription: null,
        subFeaturePermissions: "VIEW",
        subFeatureVisibility: true,
        allowedSubFeatureActions: {
          view: true,
          markforupload: false,
          downloadscan: false,
          createproject: true,
        },
        childFeatures: [
          {
            childFeature: "Black Duck",
            childFeatureDescription: null,
            childFeaturePermissions: "VIEW",
            childFeatureVisibility: true,
            allowedchildFeatureActions: {
              view: true,
              markforupload: false,
              downloadscan: false,
            },
          },
        ]
      },
    ],
  },
];

const roles = ['admin', 'developer', 'lead_developer'];

const initialAssociations: RoleAssociation[] = [
  {
    role: 'admin',
    features: initialFeatures,
    createdAt: '2024-02-20',
  },
  {
    role: 'developer',
    features: initialFeatures.map(f => ({
      ...f,
      allowedFeatureActions: { view: true },
      subFeatures: f.subFeatures.map(s => ({
        ...s,
        allowedSubFeatureActions: { view: true },
        childFeatures: s.childFeatures.map(c => ({
          ...c,
          allowedchildFeatureActions: { view: true }
        }))
      }))
    })),
    createdAt: '2024-02-21',
  },
];

function App() {
  const [features, setFeatures] = useState<Feature[]>(JSON.parse(JSON.stringify(initialFeatures)));
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [associations, setAssociations] = useState<RoleAssociation[]>(initialAssociations);
  const [selectedAssociation, setSelectedAssociation] = useState<RoleAssociation | null>(null);

  const handleRoleChange = (event: any) => {
    setSelectedRole(event.target.value);
    const association = associations.find(a => a.role === event.target.value);
    if (association) {
      setFeatures(JSON.parse(JSON.stringify(association.features)));
      setSelectedAssociation(association);
    } else {
      setFeatures(JSON.parse(JSON.stringify(initialFeatures)));
      setSelectedAssociation(null);
    }
    setEditMode(true);
  };

  const handleNewAssociation = () => {
    setDialogOpen(true);
    setEditMode(false);
    setFeatures(JSON.parse(JSON.stringify(initialFeatures)));
    setSelectedRole('');
    setSelectedAssociation(null);
  };

  const handleSaveAssociation = () => {
    if (!selectedRole) return;

    const newAssociation: RoleAssociation = {
      role: selectedRole,
      features: features,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setAssociations(prev => {
      const existing = prev.findIndex(a => a.role === selectedRole);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = newAssociation;
        return updated;
      }
      return [...prev, newAssociation];
    });

    setDialogOpen(false);
    setEditMode(false);
  };

  const handleFeatureSelect = (featureIndex: number) => {
    setFeatures(prev => {
      const updated = [...prev];
      const newSelected = !updated[featureIndex].selected;
      updated[featureIndex] = {
        ...updated[featureIndex],
        selected: newSelected,
        subFeatures: updated[featureIndex].subFeatures.map(s => ({
          ...s,
          selected: newSelected ? s.selected : false,
          childFeatures: s.childFeatures.map(c => ({
            ...c,
            selected: newSelected ? c.selected : false
          }))
        }))
      };
      return updated;
    });
  };

  const handleSubfeatureSelect = (featureIndex: number, subfeatureIndex: number) => {
    setFeatures(prev => {
      const updated = [...prev];
      const newSelected = !updated[featureIndex].subFeatures[subfeatureIndex].selected;
      
      if (!updated[featureIndex].selected && newSelected) {
        return prev;
      }

      updated[featureIndex].subFeatures[subfeatureIndex] = {
        ...updated[featureIndex].subFeatures[subfeatureIndex],
        selected: newSelected,
        childFeatures: updated[featureIndex].subFeatures[subfeatureIndex].childFeatures.map(c => ({
          ...c,
          selected: newSelected ? c.selected : false
        }))
      };
      return updated;
    });
  };

  const handleChildFeatureSelect = (featureIndex: number, subfeatureIndex: number, childIndex: number) => {
    setFeatures(prev => {
      const updated = [...prev];
      const subfeature = updated[featureIndex].subFeatures[subfeatureIndex];
      
      if (!updated[featureIndex].selected || !subfeature.selected) {
        return prev;
      }

      const childFeature = subfeature.childFeatures[childIndex];
      updated[featureIndex].subFeatures[subfeatureIndex].childFeatures[childIndex] = {
        ...childFeature,
        selected: !childFeature.selected
      };
      return updated;
    });
  };

  const handleActionToggle = (
    featureIndex: number,
    subfeatureIndex: number | null,
    childIndex: number | null,
    action: string,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();
    
    setFeatures(prev => {
      const updated = [...prev];
      const feature = updated[featureIndex];

      if (!feature.selected) {
        return prev;
      }

      if (childIndex !== null && subfeatureIndex !== null) {
        const subfeature = feature.subFeatures[subfeatureIndex];
        if (!subfeature.selected) {
          return prev;
        }
        const actions = subfeature.childFeatures[childIndex].allowedchildFeatureActions;
        actions[action] = !actions[action];
      } else if (subfeatureIndex !== null) {
        const subfeature = feature.subFeatures[subfeatureIndex];
        if (!subfeature.selected) {
          return prev;
        }
        const actions = subfeature.allowedSubFeatureActions;
        actions[action] = !actions[action];
      } else {
        const actions = feature.allowedFeatureActions;
        actions[action] = !actions[action];
      }
      return updated;
    });
  };

  const handleDeleteAssociation = (role: string) => {
    setAssociations(prev => prev.filter(a => a.role !== role));
    if (selectedRole === role) {
      setSelectedRole('');
      setFeatures(JSON.parse(JSON.stringify(initialFeatures)));
      setSelectedAssociation(null);
    }
  };

  const renderActions = (
    actions: FeatureAction,
    featureIndex: number,
    subfeatureIndex: number | null = null,
    childIndex: number | null = null,
    isEnabled: boolean
  ) => (
    <Box sx={{ mt: 1 }}>
      <FormGroup row>
        {Object.entries(actions).map(([action, value]) => (
          <FormControlLabel
            key={action}
            control={
              <Checkbox
                checked={value}
                onChange={(e) => handleActionToggle(featureIndex, subfeatureIndex, childIndex, action, e)}
                size="small"
                disabled={!isEnabled}
              />
            }
            label={action}
            onClick={(e) => e.stopPropagation()}
          />
        ))}
      </FormGroup>
    </Box>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Box sx={{ backgroundColor: 'white', padding: 3, borderRadius: 1, boxShadow: 1 }}>
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h5">Role Feature Management</Typography>
          <Button
            variant="contained"
            startIcon={<Plus size={20} />}
            onClick={handleNewAssociation}
          >
            New Association
          </Button>
        </div>

        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Role</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {associations.map((association) => (
                <TableRow key={association.role}>
                  <TableCell>{association.role}</TableCell>
                  <TableCell>{association.createdAt}</TableCell>
                  <TableCell>
                    <Button
                      startIcon={<Edit size={16} />}
                      onClick={() => {
                        setSelectedRole(association.role);
                        setFeatures(JSON.parse(JSON.stringify(association.features)));
                        setSelectedAssociation(association);
                        setEditMode(true);
                        setDialogOpen(true);
                      }}
                      size="small"
                    >
                      Edit
                    </Button>
                    <Button
                      startIcon={<Trash2 size={16} />}
                      color="error"
                      onClick={() => handleDeleteAssociation(association.role)}
                      size="small"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            {editMode ? 'Edit Role Association' : 'New Role Association'}
          </DialogTitle>
          <DialogContent>
            <FormControl fullWidth sx={{ mt: 2, mb: 4 }}>
              <InputLabel>Select Role</InputLabel>
              <Select
                value={selectedRole}
                label="Select Role"
                onChange={handleRoleChange}
              >
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <List>
              {features.map((feature, featureIndex) => (
                <React.Fragment key={feature.feature}>
                  <ListItem
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      backgroundColor: feature.selected ? 'action.selected' : 'transparent',
                    }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        checked={feature.selected || false}
                        onChange={() => handleFeatureSelect(featureIndex)}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={feature.feature}
                      secondary={
                        <>
                          {feature.featureDescription}
                          {renderActions(feature.allowedFeatureActions, featureIndex, null, null, feature.selected || false)}
                        </>
                      }
                    />
                  </ListItem>

                  {feature.selected && (
                    <List sx={{ pl: 4 }}>
                      {feature.subFeatures.map((subfeature, subfeatureIndex) => (
                        <React.Fragment key={subfeature.subFeature}>
                          <ListItem
                            sx={{
                              borderRadius: 1,
                              mb: 1,
                              backgroundColor: subfeature.selected ? 'action.selected' : 'transparent',
                            }}
                          >
                            <ListItemIcon>
                              <Checkbox
                                checked={subfeature.selected || false}
                                onChange={() => handleSubfeatureSelect(featureIndex, subfeatureIndex)}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={subfeature.subFeature}
                              secondary={
                                <>
                                  {subfeature.subFeatureDescription}
                                  {renderActions(subfeature.allowedSubFeatureActions, featureIndex, subfeatureIndex, null, subfeature.selected || false)}
                                </>
                              }
                            />
                          </ListItem>

                          {subfeature.selected && (
                            <List sx={{ pl: 4 }}>
                              {subfeature.childFeatures.map((child, childIndex) => (
                                <ListItem
                                  key={child.childFeature}
                                  sx={{
                                    borderRadius: 1,
                                    mb: 1,
                                    backgroundColor: child.selected ? 'action.selected' : 'transparent',
                                  }}
                                >
                                  <ListItemIcon>
                                    <Checkbox
                                      checked={child.selected || false}
                                      onChange={() => handleChildFeatureSelect(featureIndex, subfeatureIndex, childIndex)}
                                    />
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={child.childFeature}
                                    secondary={
                                      <>
                                        {child.childFeatureDescription}
                                        {renderActions(child.allowedchildFeatureActions, featureIndex, subfeatureIndex, childIndex, child.selected || false)}
                                      </>
                                    }
                                  />
                                </ListItem>
                              ))}
                            </List>
                          )}
                        </React.Fragment>
                      ))}
                    </List>
                  )}
                </React.Fragment>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveAssociation} variant="contained" disabled={!selectedRole}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}

export default App;
