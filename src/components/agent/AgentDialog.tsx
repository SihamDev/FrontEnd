import React, { useState, useEffect } from 'react';
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
    Grid,
} from '@mui/material';
import FunctionCard from '@/components/agent/functionCard';
import AddAction from '@/components/agent/addAction';

interface Function {
    name: string;
    description: string;
}

interface Agent {
    id: number;
    name: string;
    firstMessage: string;
    language: string;
    prompt: string;
    endCallMessage: string;
    voicemailMessage: string;
    functionsList: Function[];
}

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

const AgentDialog: React.FC<{
    open: boolean;
    handleClose: () => void;
    handleSubmit: (agent: Agent) => void;
    editingAgent: Agent | null;
}> = ({ open, handleClose, handleSubmit, editingAgent }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [name, setName] = useState('');
    const [firstMessage, setFirstMessage] = useState('');
    const [language, setLanguage] = useState('en-US');
    const [prompt, setPrompt] = useState('');
    const [endCallMessage, setEndCallMessage] = useState('');
    const [voicemailMessage, setVoicemailMessage] = useState('');
    const [functionsList, setFunctionsList] = useState<Function[]>([]);

    useEffect(() => {
        if (editingAgent) {
            setName(editingAgent.name);
            setFirstMessage(editingAgent.firstMessage);
            setLanguage(editingAgent.language);
            setPrompt(editingAgent.prompt);
            setEndCallMessage(editingAgent.endCallMessage || '');
            setVoicemailMessage(editingAgent.voicemailMessage || '');
            setFunctionsList(editingAgent.functionsList || []);
        }
    }, [editingAgent]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const handleSubmitForm = () => {
        const newAgent: Agent = {
            id: editingAgent ? editingAgent.id : 0, // Assigning 0 if creating a new agent
            name,
            firstMessage,
            language,
            prompt,
            endCallMessage,
            voicemailMessage,
            functionsList,
        };
        handleSubmit(newAgent);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle>{editingAgent ? 'Update Agent' : 'Add Agent'}</DialogTitle>
            <DialogContent>
                <Tabs value={activeTab} onChange={handleTabChange}>
                    <Tab label="Settings" />
                    <Tab label="Prompt" />
                    <Tab label="Actions" />
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
                            label="First Message"
                            type="text"
                            fullWidth
                            value={firstMessage}
                            onChange={(e) => setFirstMessage(e.target.value)}
                        />
                        <FormControl fullWidth margin="dense">
                            <InputLabel>Language</InputLabel>
                            <Select value={language} onChange={(e) => setLanguage(e.target.value as string)}>
                                {languageOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                )}
                {activeTab === 1 && (
                    <Box mt={2}>
                        <TextField
                            margin="dense"
                            label="End Call Message"
                            type="text"
                            fullWidth
                            value={endCallMessage}
                            onChange={(e) => setEndCallMessage(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Voicemail Message"
                            type="text"
                            fullWidth
                            multiline
                            rows={4}
                            value={voicemailMessage}
                            onChange={(e) => setVoicemailMessage(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Prompt"
                            type="text"
                            fullWidth
                            multiline
                            rows={6}
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />
                    </Box>
                )}
                {activeTab === 2 && (
                    <Box mt={2} pl={3}>
                        <Typography variant="h3">Actions</Typography>
                        <Grid container spacing={2} mt={2}>
                            {functionsList && functionsList.map((func) => (
                                <FunctionCard func={func} key={func.name} />
                            ))}
                        </Grid>
                        <AddAction />
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmitForm} color="primary" disabled={!name}>
                    {editingAgent ? 'Update' : 'Add'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AgentDialog;
