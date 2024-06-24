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
    const [openModal, setOpenModal] = useState(false); // State for controlling "New Action" dialog
    const [newActionName, setNewActionName] = useState('');
    const [newActionDescription, setNewActionDescription] = useState('');

    useEffect(() => {
        if (editingAgent) {
            setName(editingAgent.name);
            setFirstMessage(editingAgent.firstMessage);
            setLanguage(editingAgent.language);
            setPrompt(editingAgent.prompt);
            setEndCallMessage(editingAgent.endCallMessage || '');
            setVoicemailMessage(editingAgent.voicemailMessage || '');
            setFunctionsList(editingAgent.model.functions || []);
            console.log("editingAgent.functionsList ", editingAgent);
        }

    }, [editingAgent]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const handleSubmitForm = () => {
        const agent: Agent = {
            id: editingAgent?.id,
            name,
            firstMessage,
            language,
            prompt,
            endCallMessage,
            voicemailMessage,
            functionsList,
        };
        handleSubmit(agent);
        handleClose();
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleAddAction = () => {
        // Implement action handling logic here
        const newFunction: Function = {
            name: newActionName,
            description: newActionDescription,
        };
        setFunctionsList([...functionsList, newFunction]);
        setNewActionName('');
        setNewActionDescription('');
        handleCloseModal();
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
                            {functionsList && functionsList.map((func, index) => (
                                <FunctionCard func={func} key={index} />
                            ))}
                        </Grid>
                        <Button variant="outlined" color="primary" onClick={handleOpenModal}>
                            Add New Function
                        </Button>
                        <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
                            <DialogTitle>Add New Action</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Action Name"
                                    type="text"
                                    fullWidth
                                    value={newActionName}
                                    onChange={(e) => setNewActionName(e.target.value)}
                                />
                                <TextField
                                    margin="dense"
                                    label="Action Description"
                                    type="text"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={newActionDescription}
                                    onChange={(e) => setNewActionDescription(e.target.value)}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseModal} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleAddAction} color="primary">
                                    Add
                                </Button>
                            </DialogActions>
                        </Dialog>
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
