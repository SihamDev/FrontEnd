import React, { useEffect } from 'react';
import { Delete, Edit } from '@mui/icons-material';
import { Card, CardActions, CardContent, Grid, IconButton, Typography } from '@mui/material';

interface Function {
    name: string;
    description: string;
}

interface FunctionCardProps {
    func: Function;
}

const FunctionCard: React.FC<FunctionCardProps> = ({ func }) => {

    return (
        <Grid item xs={6}>
            <Card style={{ margin: '10px', width: '400px' }}>
                <CardContent>
                    <Typography variant="h3">{func.name}</Typography>
                    <Typography color="textSecondary">{func.description}</Typography>
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
