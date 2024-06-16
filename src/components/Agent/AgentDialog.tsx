
import React, { useState } from 'react';
import {
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Tabs,
    Tab,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    Grid,
} from '@mui/material';


const AgentDialog: React.FC<{
    open: boolean;
    handleClose: () => void;
    handleSubmit: () => void;
    editingAgent: Agent | null;
    activeTab: number;
    handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
    name: string;
    setName: (name: string) => void;
    greeting: string;
    setGreeting: (greeting: string) => void;
    language: string;
    setLanguage: (language: string) => void;
    prompt: string;
    setPrompt: (prompt: string) => void;
    whoSpeaksFirst: string;
    setWhoSpeaksFirst: (whoSpeaksFirst: string) => void;
    customGreeting: string;
    setCustomGreeting: (customGreeting: string) => void;
    ambientSound: string;
    setAmbientSound: (ambientSound: string) => void;
    companyInfo: string;
    setCompanyInfo: (companyInfo: string) => void;
    objectives: string;
    setObjectives: (objectives: string) => void;
    variablesOpen: boolean;
    handleVariablesToggle: () => void;
    insertVariable: (variable: string) => void;
    tags: string[];
    setTags: (tags: string[]) => void;
}> = ({
    open,
    handleClose,
    handleSubmit,
    editingAgent,
    activeTab,
    handleTabChange,
    name,
    setName,
    greeting,
    setGreeting,
    language,
    setLanguage,
    prompt,
    setPrompt,
    whoSpeaksFirst,
    setWhoSpeaksFirst,
    customGreeting,
    setCustomGreeting,
    ambientSound,
    setAmbientSound,
    companyInfo,
    setCompanyInfo,
    objectives,
    setObjectives,
    variablesOpen,
    handleVariablesToggle,
    insertVariable,
    tags,
    setTags,
}) => {
        const languageOptions = [
            { value: 'en-US', label: 'English (US)' },
            { value: 'es-ES', label: 'Spanish (Spain)' },
            { value: 'fr-FR', label: 'French (France)' },
            { value: 'de-DE', label: 'German (Germany)' },
            { value: 'it-IT', label: 'Italian (Italy)' },
            { value: 'ja-JP', label: 'Japanese (Japan)' },
            { value: 'zh-CN', label: 'Chinese (Simplified, China)' },
            { value: 'pt-BR', label: 'Portuguese (Brazil)' },
            { value: 'ru-RU', label: 'Russian (Russia)' },
            { value: 'ko-KR', label: 'Korean (South Korea)' },
            { value: 'ar-SA', label: 'Arabic (Saudi Arabia)' },
            { value: 'hi-IN', label: 'Hindi (India)' },
            { value: 'nl-NL', label: 'Dutch (Netherlands)' },
        ];

        return (
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>{editingAgent ? 'Update Agent' : 'Add Agent'}</DialogTitle>
                <DialogContent>
                    <Tabs value={activeTab} onChange={handleTabChange}>
                        <Tab label="Settings" />
                        <Tab label="Prompt" />
                        <Tab label="Actions" />
                        <Tab label="Variables" />
                    </Tabs>
                    {activeTab === 0 && (
                        <Box mt={2}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Name"
                                type="text"
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="Greeting"
                                type="text"
                                fullWidth
                                value={greeting}
                                onChange={(e) => setGreeting(e.target.value)}
                            />
                            <FormControl fullWidth margin="dense">
                                <InputLabel>Language</InputLabel>
                                <Select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                >
                                    {languageOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                margin="dense"
                                label="Ambient Sound"
                                type="text"
                                fullWidth
                                value={ambientSound}
                                onChange={(e) => setAmbientSound(e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="Company Info"
                                type="text"
                                fullWidth
                                multiline
                                rows={4}
                                value={companyInfo}
                                onChange={(e) => setCompanyInfo(e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="Objectives"
                                type="text"
                                fullWidth
                                multiline
                                rows={4}
                                value={objectives}
                                onChange={(e) => setObjectives(e.target.value)}
                            />
                        </Box>
                    )}
                    {activeTab === 1 && (
                        <Box mt={2}>
                            <TextField
                                margin="dense"
                                label="Who Speaks First"
                                type="text"
                                fullWidth
                                value={whoSpeaksFirst}
                                onChange={(e) => setWhoSpeaksFirst(e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                label="Custom Greeting"
                                type="text"
                                fullWidth
                                value={customGreeting}
                                onChange={(e) => setCustomGreeting(e.target.value)}
                            />
                            <Button variant="outlined" color="primary" onClick={handleVariablesToggle} style={{ marginTop: '10px' }}>
                                Insert Variables
                            </Button>
                            {variablesOpen && (
                                <List>
                                    <ListItem button onClick={() => insertVariable('{Current name}')}>
                                        <ListItemText primary="Current name" />
                                    </ListItem>
                                    <ListItem button onClick={() => insertVariable('{Current time}')}>
                                        <ListItemText primary="Current time" />
                                    </ListItem>
                                    <ListItem button onClick={() => insertVariable('{Contact first name}')}>
                                        <ListItemText primary="Contact first name" />
                                    </ListItem>
                                    <ListItem button onClick={() => insertVariable('{Contact phone}')}>
                                        <ListItemText primary="Contact phone" />
                                    </ListItem>
                                    <ListItem button onClick={() => insertVariable('{Contact e-mail}')}>
                                        <ListItemText primary="Contact e-mail" />
                                    </ListItem>
                                </List>
                            )}
                            <TextField
                                margin="dense"
                                label="Prompt"
                                type="text"
                                fullWidth
                                multiline
                                rows={4}
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                            />
                        </Box>
                    )}
                    {activeTab === 2 && (
                        <Box mt={2}>
                            <Typography variant="h6">Actions Section</Typography>
                        </Box>
                    )}
                    {activeTab === 3 && (
                        <Box mt={2}>
                            <Typography variant="h6">Variables Section</Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {editingAgent ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

export default AgentDialog;
