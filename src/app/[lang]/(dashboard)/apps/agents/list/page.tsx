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
  IconButton
} from '@mui/material';
import { Chat, Delete, Edit, TableRows, ViewModule } from '@mui/icons-material';
import AgentDialog from '../add/page';
import AgentCard from '@/components/agent/agentCard';

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

  const handleClickOpen = (agent: Agent) => {
    setEditingAgent(agent);
    setName(agent.name);
    setGreeting(agent.greeting);
    setLanguage(agent.language);
    setPrompt(agent.prompt);
    setWhoSpeaksFirst(agent.whoSpeaksFirst);
    setCustomGreeting(agent.customGreeting);
    setAmbientSound(agent.ambientSound);
    setCompanyInfo(agent.companyInfo);
    setObjectives(agent.objectives);
    setTags(agent.tags);
    setOpen(true);
  };

  const handleAddAgentClick = () => {
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
    setTags([]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (editingAgent) {
      setAgents(agents.map(agent => (agent.id === editingAgent.id ? {
        ...agent,
        name,
        greeting,
        language,
        prompt,
        whoSpeaksFirst,
        customGreeting,
        ambientSound,
        companyInfo,
        objectives,
        tags
      } : agent)));
    } else {
      setAgents([...agents, {
        id: Date.now(),
        name,
        greeting,
        language,
        prompt,
        whoSpeaksFirst,
        customGreeting,
        ambientSound,
        companyInfo,
        objectives,
        tags
      }]);
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
      <Button variant="contained" color="primary" onClick={handleAddAgentClick}>
        Add Agent
      </Button>
      <Button variant="contained" color="secondary" onClick={handleViewToggle} style={{ marginLeft: '10px' }}>
        {view === 'table' ? <ViewModule /> : <TableRows />}
      </Button>

      {/* ================================= LIST OF AGENTS START ================================= */}
      {view === 'table' ? (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Greeting</TableCell>
                <TableCell>Language</TableCell>
                <TableCell>Call</TableCell>
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
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Chat />}
                      onClick={() => {/* talk functionality here */ }}
                    >
                      Talk
                    </Button>
                  </TableCell>
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
            <AgentCard
              agent={agent}
              key={agent.id}
              handleClickOpen={handleClickOpen}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
      {/* ================================= LIST OF AGENTS END ================================= */}


      {/* ================================= ADD NEW AGENT DIALOG START ================================= */}
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
      {/* ================================= ADD NEW AGENT DIALOG END ================================= */}

    </Container>
  );
};

export default AgentsList;
