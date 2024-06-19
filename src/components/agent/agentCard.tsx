import React from 'react';
import { Card, CardContent, Typography, CardActions, IconButton, Button } from '@mui/material';
import { Edit, Delete, Chat } from '@mui/icons-material';

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
        <Card style={{ margin: '10px', minWidth: '500px' }}>
            <CardContent>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h2" component="div">
                        {agent.name}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Chat />}
                        onClick={() => {/* talk functionality here */ }}
                    >
                        Talk
                    </Button>
                </div>
                <Typography color="textSecondary">
                    Greeting: {agent.greeting}
                </Typography>
                <Typography color="textSecondary">
                    Language: {agent.language}
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
