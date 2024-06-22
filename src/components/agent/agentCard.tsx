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
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, handleClickOpen, handleDelete }) => {
    return (
      
    );
};

export default AgentCard;
