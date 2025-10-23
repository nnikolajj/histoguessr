import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Card, CardContent, Typography } from "@mui/material";

export default function YearCard() {
    const years = Array.from({ length: 525 }, (_, i) => 2025 - i);

    return (
        <Card sx={{ width: 400, boxShadow: 4, bgcolor: "#F2EAD3" }}>
            <CardContent
                sx={{
                    maxHeight: 300,        // feste Höhe
                    overflowY: "auto",     // Scrollbar aktivieren
                    pr: 1                  // etwas Platz rechts für Scrollbar
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Jahresübersicht
                </Typography>
                <Timeline position="left">
                    {years.map((year, index) => (
                        <TimelineItem key={year}>
                            <TimelineSeparator>
                                <TimelineDot sx={{ bgcolor: index % 2 === 0 ? "#E2B59A" : "#957C62"}} />
                                {index < years.length - 1 && <TimelineConnector />}
                            </TimelineSeparator>
                            <TimelineContent>{year}</TimelineContent>
                        </TimelineItem>
                    ))}
                </Timeline>
            </CardContent>
        </Card>
    );
}
