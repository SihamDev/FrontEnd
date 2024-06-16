"use client";

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Tabs,
  Tab,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Delete, Edit, TableRows, ViewModule } from '@mui/icons-material';

interface Agent {
  id: number;
  name: string;
  greeting: string;
  language: string;
  prompt: string;
  ambientSound: string;
  companyInfo: string;
  objectives: string;
}

const AgentsList: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [open, setOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');
  const [language, setLanguage] = useState('');
  const [prompt, setPrompt] = useState('');
  const [ambientSound, setAmbientSound] = useState('');
  const [companyInfo, setCompanyInfo] = useState('');
  const [objectives, setObjectives] = useState('');
  const [view, setView] = useState<'table' | 'card'>('table');
  const [activeTab, setActiveTab] = useState(0);

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

  const handleClickOpen = (agent: Agent | null = null) => {
    if (agent) {
      setEditingAgent(agent);
      setName(agent.name);
      setGreeting(agent.greeting);
      setLanguage(agent.language);
      setPrompt(agent.prompt);
      setAmbientSound(agent.ambientSound);
      setCompanyInfo(agent.companyInfo);
      setObjectives(agent.objectives);
    } else {
      setEditingAgent(null);
      setName('');
      setGreeting('');
      setLanguage('');
      setPrompt('');
      setAmbientSound('');
      setCompanyInfo('');
      setObjectives('');
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (editingAgent) {
      setAgents(agents.map(agent => (agent.id === editingAgent.id ? { ...agent, name, greeting, language, prompt, ambientSound, companyInfo, objectives } : agent)));
    } else {
      setAgents([...agents, { id: Date.now(), name, greeting, language, prompt, ambientSound, companyInfo, objectives }]);
    }
    handleClose();
  };

  const handleDelete = (id: number) => {
    setAgents(agents.filter(agent => agent.id !== id));
  };

  const handleViewToggle = () => {
    setView(view === 'table' ? 'card' : 'table');
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Agents
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleClickOpen()}>
        Add Agent
      </Button>
      <Button variant="contained" color="secondary" onClick={handleViewToggle} style={{ marginLeft: '10px' }}>
        {view === 'table' ? <ViewModule /> : <TableRows />}
      </Button>
      {view === 'table' ? (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Greeting</TableCell>
                <TableCell>Language</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {agents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell>{agent.name}</TableCell>
                  <TableCell>{agent.greeting}</TableCell>
                  <TableCell>{agent.language}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleClickOpen(agent)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(agent.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
          {agents.map((agent) => (
            <Card key={agent.id} style={{ margin: '10px', width: '300px' }}>
              <CardContent>
                <Typography variant="h6">{agent.name}</Typography>
                <Typography color="textSecondary">{agent.greeting}</Typography>
                <Typography color="textSecondary">{agent.language}</Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleClickOpen(agent)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(agent.id)}>
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </div>
      )}
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
    </Container>
  );
};

export default AgentsList;
