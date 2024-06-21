import React from 'react';
import { Card, CardContent, Typography, CardActions, IconButton, Button } from '@mui/material';
import { Edit, Delete, Phone } from '@mui/icons-material';

interface Agent {
    id: string;
    name: string;
    createdAt: string;
    voice: {
        provider: string;
    };
    model: {
        provider: string;
    };
}

interface AgentCardProps {
    agent: Agent;
    handleClickOpen: (agent: Agent) => void;
    handleDelete: (id: string) => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, handleClickOpen, handleDelete }) => {
    return (
        <Card style={{ margin: '10px', minWidth: '500px' }}>
            <CardContent>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h3" component="div" style={{ fontSize: '40px', fontWeight: 'bold' }}>
                        {agent.name}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Phone style={{ fontSize: '20px' }} />}
                        onClick={() => {/* talk functionality here */ }}
                        style={{ padding: '10px 40px', fontSize: '20px' }}
                    >
                        Talk
                    </Button>
                </div>
                <Typography color="textSecondary">
                    Voice Provider: {agent.voice.provider}
                </Typography>
                <Typography color="textSecondary">
                    Model Provider: {agent.model.provider}
                </Typography>
                <Typography color="textSecondary">
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
    );
};

export default AgentCard;
