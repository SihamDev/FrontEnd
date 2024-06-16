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
  IconButton,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import { Delete, Edit, TableRows, ViewModule } from '@mui/icons-material';
import AgentDialog from '@/components/Agent/AgentDialog';

interface Agent {
  id: number;
  name: string;
  greeting: string;
  language: string;
  prompt: string;
  ambientSound: string;
  companyInfo: string;
  objectives: string;
  tags: string[];
}

const AgentsList: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [open, setOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');
  const [language, setLanguage] = useState('');
  const [prompt, setPrompt] = useState('');
  const [whoSpeaksFirst, setWhoSpeaksFirst] = useState('');
  const [customGreeting, setCustomGreeting] = useState('');
  const [ambientSound, setAmbientSound] = useState('');
  const [companyInfo, setCompanyInfo] = useState('');
  const [objectives, setObjectives] = useState('');
  const [view, setView] = useState<'table' | 'card'>('table');
  const [activeTab, setActiveTab] = useState(0);
  const [variablesOpen, setVariablesOpen] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

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
      setWhoSpeaksFirst(agent.prompt);
      setCustomGreeting(agent.prompt);
      setAmbientSound(agent.ambientSound);
      setCompanyInfo(agent.companyInfo);
      setObjectives(agent.objectives);
    } else {
      setEditingAgent(null);
      setName('');
      setGreeting('');
      setLanguage('');
      setPrompt('');
      setWhoSpeaksFirst('');
      setCustomGreeting('');
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

  const handleVariablesToggle = () => {
    setVariablesOpen(!variablesOpen);
  };

  const insertVariable = (variable: string) => {
    setCustomGreeting(customGreeting + ' ' + variable);
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

      <AgentDialog
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        editingAgent={editingAgent}
        activeTab={activeTab}
        handleTabChange={handleTabChange}
        name={name}
        setName={setName}
        greeting={greeting}
        setGreeting={setGreeting}
        language={language}
        setLanguage={setLanguage}
        prompt={prompt}
        setPrompt={setPrompt}
        whoSpeaksFirst={whoSpeaksFirst}
        setWhoSpeaksFirst={setWhoSpeaksFirst}
        customGreeting={customGreeting}
        setCustomGreeting={setCustomGreeting}
        ambientSound={ambientSound}
        setAmbientSound={setAmbientSound}
        companyInfo={companyInfo}
        setCompanyInfo={setCompanyInfo}
        objectives={objectives}
        setObjectives={setObjectives}
        variablesOpen={variablesOpen}
        handleVariablesToggle={handleVariablesToggle}
        insertVariable={insertVariable}
        tags={tags}
        setTags={setTags}
      />

    </Container >
  );
};

export default AgentsList;
