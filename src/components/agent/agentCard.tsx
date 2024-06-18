import React from 'react';
import { Card, CardContent, Typography, CardActions, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

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

interface AgentCardProps {
    agent: Agent;
    handleClickOpen: (agent: Agent) => void;
    handleDelete: (id: number) => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, handleClickOpen, handleDelete }) => {
    return (
        <Card style={{ margin: '10px', minWidth: '300px' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {agent.name}
                </Typography>
                <Typography color="textSecondary">
                    {agent.greeting}
                </Typography>
                <Typography color="textSecondary">
                    {agent.language}
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
