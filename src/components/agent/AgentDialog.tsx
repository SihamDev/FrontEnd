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
    greeting: string;
    language: string;
    prompt: string;
    whoSpeaksFirst: string;
    customGreeting: string;
    ambientSound: string;
    companyInfo: string;
    objectives: string;
    tags: string[];
    model: string;
    endCallMessage: string;
    voicemailMessage: string;
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

const modelsOptions = [
    { value: 'nova-2', label: 'Nova 2' },
    { value: 'nova-2-generate', label: 'Nova 2 Generate' },
    { value: 'nova-2-meeting', label: 'Nova 2 Meeting' },
    { value: 'nova-2-general', label: 'Nova 2 General' },
    { value: 'nova-2-phonecall', label: 'Nova 2 Phonecall' },
    { value: 'nova-2-finance', label: 'Nova 2 Finance' },
    { value: 'nova-2-conversationalai', label: 'Nova 2 Conversational AI' },
    { value: 'nova-2-voicemail', label: 'Nova 2 Voicemail' },
    { value: 'nova-2-video', label: 'Nova 2 Video' },
    { value: 'nova-2-medical', label: 'Nova 2 Medical' },
    { value: 'nova-2-drivethru', label: 'Nova 2 Drive Thru' },
    { value: 'nova-2-automotive', label: 'Nova 2 Automotive' },
    { value: 'nova', label: 'Nova' },
    { value: 'nova-general', label: 'Nova General' },
    { value: 'nova-phonecall', label: 'Nova Phonecall' },
    { value: 'nova-medical', label: 'Nova Medical' },
    { value: 'enhanced', label: 'Enhanced' },
    { value: 'enhanced-general', label: 'Enhanced General' },
    { value: 'enhanced-meeting', label: 'Enhanced Meeting' },
    { value: 'enhanced-phonecall', label: 'Enhanced Phonecall' },
    { value: 'enhanced-finance', label: 'Enhanced Finance' },
    { value: 'base', label: 'Base' },
    { value: 'base-general', label: 'Base General' },
    { value: 'base-meeting', label: 'Base Meeting' },
    { value: 'base-phonecall', label: 'Base Phonecall' },
    { value: 'base-finance', label: 'Base Finance' },
    { value: 'base-conversationalai', label: 'Base Conversational AI' },
    { value: 'base-voicemail', label: 'Base Voicemail' },
    { value: 'base-video', label: 'Base Video' },
];

const AgentDialog: React.FC<{
    open: boolean;
    handleClose: () => void;
    handleSubmit: (agent: Agent) => void;
    editingAgent: Agent | null;
    functions: Function[];
}> = ({ open, handleClose, handleSubmit, editingAgent, functions }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [name, setName] = useState('');
    const [firstMessage, setFirstMessage] = useState('');
    const [language, setLanguage] = useState('en-US');
    const [prompt, setPrompt] = useState('');
    const [whoSpeaksFirst, setWhoSpeaksFirst] = useState('');
    const [customGreeting, setCustomGreeting] = useState('');
    const [ambientSound, setAmbientSound] = useState('');
    const [companyInfo, setCompanyInfo] = useState('');
    const [objectives, setObjectives] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [model, setModel] = useState('');
    const [endCallMessage, setEndCallMessage] = useState('');
    const [voicemailMessage, setVoicemailMessage] = useState('');

    useEffect(() => {
        if (editingAgent) {
            setName(editingAgent.name);
            setFirstMessage(editingAgent.firstMessage);
            setLanguage(editingAgent.transcriber.language);
            setPrompt(editingAgent.model.messages[0].content);
            setWhoSpeaksFirst(editingAgent.whoSpeaksFirst);
            setCustomGreeting(editingAgent.customGreeting);
            setAmbientSound(editingAgent.ambientSound);
            setCompanyInfo(editingAgent.companyInfo);
            setObjectives(editingAgent.objectives);
            setTags(editingAgent.tags);
            setModel(editingAgent.model);
            setEndCallMessage(editingAgent.endCallMessage || '');
            setVoicemailMessage(editingAgent.voicemailMessage || '');
        }
    }, [editingAgent]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const handleSubmitForm = () => {
        const newAgent: Agent = {
            id: editingAgent ? editingAgent.id : Date.now(),
            name,
            greeting: firstMessage,
            language,
            prompt,
            whoSpeaksFirst,
            customGreeting,
            ambientSound,
            companyInfo,
            objectives,
            tags,
            model,
            endCallMessage,
            voicemailMessage,
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
                            {functions && functions.map((func) => (
                                <FunctionCard function={func} key={func.name} />
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
