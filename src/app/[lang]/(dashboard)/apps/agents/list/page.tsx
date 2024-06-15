"use client"; // Add this line at the top

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
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

// Define the Agent type
interface Agent {
  id: number;
  name: string;
  greeting: string;
  language: string;
}

const AgentsList: React.FC = () => {
  // State to manage the list of agents
  const [agents, setAgents] = useState<Agent[]>([]);
  const [open, setOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');
  const [language, setLanguage] = useState('');

  // Handle opening the dialog
  const handleClickOpen = (agent: Agent | null = null) => {
    if (agent) {
      setEditingAgent(agent);
      setName(agent.name);
      setGreeting(agent.greeting);
      setLanguage(agent.language);
    } else {
      setEditingAgent(null);
      setName('');
      setGreeting('');
      setLanguage('');
    }
    setOpen(true);
  };

  // Handle closing the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Handle form submission for adding/updating an agent
  const handleSubmit = () => {
    if (editingAgent) {
      // Update existing agent
      setAgents(agents.map(agent => (agent.id === editingAgent.id ? { ...agent, name, greeting, language } : agent)));
    } else {
      // Add new agent
      setAgents([...agents, { id: Date.now(), name, greeting, language }]);
    }
    handleClose();
  };

  // Handle deleting an agent
  const handleDelete = (id: number) => {
    setAgents(agents.filter(agent => agent.id !== id));
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Agents
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleClickOpen()}>
        Add Agent
      </Button>
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingAgent ? 'Update Agent' : 'Add Agent'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {editingAgent ? 'Update the details of the agent.' : 'Enter the details of the new agent.'}
          </DialogContentText>
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
          <TextField
            margin="dense"
            label="Language"
            type="text"
            fullWidth
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
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
