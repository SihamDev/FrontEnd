// @ts-nocheck
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
  IconButton,
  Card,
  CardContent,
  CardActions,
  Grid
} from '@mui/material';
import { Edit, Delete, Phone, ViewModule, TableRows } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AgentDialog from '@/components/agent/AgentDialog';
import { getAssistants, createAssistant, updateAssistant as updateAssistantApi, deleteAssistant } from '@/app/api/functions/agents';
import { Agent } from '@/types/Agent';

const AgentsList: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [open, setOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [view, setView] = useState<'table' | 'card'>('table');

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const assistantsRes = await getAssistants();
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
      toast.success('Agent created successfully!');
    } catch (error) {
      toast.error('Failed to create agent.');
      console.error(error);
    }

    handleClose();
  };

  const handleUpdate = async (updatedAgent: Agent) => {
    try {
      const response = await updateAssistantApi(updatedAgent.id, updatedAgent);
      const updatedAgents = agents.map(agent =>
        agent.id === updatedAgent.id ? { ...agent, ...updatedAgent } : agent
      );
      setAgents(updatedAgents);
      toast.success('Agent updated successfully!');
    } catch (error) {
      toast.error('Failed to update agent.');
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAssistant(id);
      const updatedAgents = agents.filter(agent => agent.id !== id);
      setAgents(updatedAgents);
      toast.success('Agent deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete agent.');
      console.error(error);
    }
  };

  const handleViewToggle = () => {
    setView(view === 'table' ? 'card' : 'table');
  };

  const handleCall = async (agent: Agent) => {
    try {
      console.log("Starting conversation with:", agent.name);
      const response = await fetch('https://api.vapi.ai/call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ agentId: agent.id })
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(`Started conversation with ${agent.name}!`);
      } else {
        toast.error(`Failed to start conversation with ${agent.name}.`);
      }
    } catch (error) {
      console.error('Error starting conversation:', error);
      toast.error('Failed to start conversation.');
    }
  };

  return (
    <Container>
      <ToastContainer />
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
                      startIcon={<Phone style={{ fontSize: '20px' }} />}
                      onClick={() => handleCall(agent)}
                      style={{ padding: '10px 30px', fontSize: '18px' }}
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
        <Grid container spacing={2}>
          {agents.map((agent) => (
            <Grid item xs={6} key={agent.id}>
              <Card style={{ margin: '10px', minWidth: '400px' }}>
                <CardContent>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: "30px" }}>
                    <Typography variant="h4" component="div" style={{ fontSize: '40px', fontWeight: 'bold' }}>
                      {agent.name}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Phone style={{ fontSize: '20px' }} />}
                      onClick={() => handleCall(agent)}
                      style={{ padding: '10px 40px', fontSize: '20px' }}
                    >
                      Talk
                    </Button>
                  </div>
                  <Typography color="textSecondary" marginBottom={"20px"}>
                    Voice Provider: {agent.voice.provider}
                  </Typography>
                  <Typography color="textSecondary" marginBottom={"20px"}>
                    Model Provider: {agent.model.provider}
                  </Typography>
                  <Typography color="textSecondary" >
                    Created At: {new Date(agent.createdAt).toLocaleString()}
                  </Typography>
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
            </Grid>
          ))}
        </Grid>
      )}

      <AgentDialog
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        handleUpdate={handleUpdate}
        editingAgent={editingAgent}
      />
    </Container>
  );
};

export default AgentsList;
