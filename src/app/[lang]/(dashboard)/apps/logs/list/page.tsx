import React from 'react';
import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Typography,
} from '@mui/material';

interface Log {
    id: number;
    date: string;
    duration: string;
    contactName: string;
    contactNumber: string;
    status: string;
}

const LogsList: React.FC = () => {
    const logsList: Log[] = [
        { id: 1, date: '2024-06-18', duration: '00:15:23', contactName: 'John Doe', contactNumber: '+1234567890', status: 'Completed' },
        { id: 2, date: '2024-06-17', duration: '00:10:45', contactName: 'Jane Smith', contactNumber: '+1987654321', status: 'Missed' },
    ];

    return (
        <TableContainer component={Paper}>
            <Typography variant="h5" style={{ padding: '16px' }}>
                Call Logs
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell>Contact Name</TableCell>
                        <TableCell>Contact Number</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {logsList.map((log) => (
                        <TableRow key={log.id}>
                            <TableCell>{log.date}</TableCell>
                            <TableCell>{log.duration}</TableCell>
                            <TableCell>{log.contactName}</TableCell>
                            <TableCell>{log.contactNumber}</TableCell>
                            <TableCell>{log.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default LogsList;
