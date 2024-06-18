import React from 'react';
import { Delete, Edit } from '@mui/icons-material';
import { Card, CardActions, CardContent, Grid, IconButton, Typography } from '@mui/material';

interface CallInfo {
    name: string;
    description: string;
}

interface FunctionCardProps {
    callInfo: CallInfo;
}

const FunctionCard: React.FC<FunctionCardProps> = ({ callInfo }) => {
    return (
        <Grid item xs={6}>
            <Card style={{ margin: '10px', width: '400px' }}>
                <CardContent>
                    <Typography variant="h3">{callInfo.name}</Typography>
                    <Typography color="textSecondary">{callInfo.description}</Typography>
                </CardContent>
                <CardActions>
                    <IconButton aria-label="Edit">
                        <Edit />
                    </IconButton>
                    <IconButton aria-label="Delete">
                        <Delete />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default FunctionCard;
