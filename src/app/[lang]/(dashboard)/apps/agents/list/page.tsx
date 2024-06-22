"use client";

import React, { useEffect, useState } from 'react';
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
import AgentDialog from '@/components/agent/AgentDialog';
import AgentCard from '@/components/agent/agentCard';
import { createAssistant, getAssistants } from '@/app/api/functions/agents';

interface Agent {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  voice: {
    provider: string;
    voiceId: string;
    similarityBoost: number;
    stability: number;
  };
  model: {
    provider: string;
    functions?: Function[];
    maxTokens: number;
    messages: [{ role: string, content: string }, { role: string, content: string }]
  };
  voicemailMessage: string;
}

interface Assistant {
  id: string;
  name: string;
  voiceProvider: string;
  modelProvider: string;
  createdAt: string;
  functions?: Function[];
}

const transformAssistantToAgent = (assistant: Assistant): Agent => ({
  id: assistant.id,
  name: assistant.name,
  createdAt: assistant.createdAt,
  updatedAt: assistant.createdAt,
  voice: {
    provider: assistant.voiceProvider,
    voiceId: '',
    similarityBoost: 0,
    stability: 0,
  },
  model: {
    provider: assistant.modelProvider,
    functions: assistant.functions,
    maxTokens: 0,
    messages: [{ role: 'user', content: '' }, { role: 'assistant', content: '' }],
  },
  voicemailMessage: '',
});

const AgentsList: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [open, setOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [view, setView] = useState<'table' | 'card'>('table');

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const assistantsRes = await getAssistants();
        // console.log("**", assistantsRes.data);
        setAgents(assistantsRes.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAgents();
  }, []);

  const handleClickOpen = (agent: Agent) => {
    setEditingAgent(agent);
    setOpen(true);
  };

  const handleAddAgentClick = () => {
    setEditingAgent(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (newAgent: Agent) => {
    console.log("newagent => ", newAgent);


    // console.log("newAgent.name ", newAgent.name);
    // console.log("newAgent.prompt ", newAgent.prompt),
    //   console.log("newAgent.firstMessage ", newAgent.firstMessage)
    // console.log("functionsList ", newAgent.functionsList),

    const data = {
      name: newAgent.name,
      model: {
        provider: "openai",
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        systemPrompt: newAgent.prompt,
        functions: newAgent.functionsList
      },
      voice: {
        provider: "11labs",
        voiceId: "pFZP5JQG7iQjIQuC4Bku"
      },
      firstMessage: newAgent.firstMessage,
      serverUrl: "https://webhook.site/20988bdc-a6f7-41b8-af41-8978220de89c"
    };

    try {
      const response = await createAssistant(data);

    } catch (error) {
      console.error(error);
    }

    handleClose();
  };

  const handleDelete = (id: string) => {
    setAgents(agents.filter(agent => agent.id !== id));
  };

  const handleViewToggle = () => {
    setView(view === 'table' ? 'card' : 'table');
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

      {view === 'table' ? (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Voice Provider</TableCell>
                <TableCell>Model Provider</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {agents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell>{agent.name}</TableCell>
                  <TableCell>{agent?.voice?.provider}</TableCell>
                  <TableCell>{agent?.model?.provider}</TableCell>
                  <TableCell>{new Date(agent.createdAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleClickOpen(agent)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(agent.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
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

      <AgentDialog
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        editingAgent={editingAgent}
      />
    </Container>
  );
};

export default AgentsList;
