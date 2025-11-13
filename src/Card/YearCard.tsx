import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import {Button, Card, CardContent, Typography, Collapse, Box, IconButton} from "@mui/material";
import {useState} from "react";
import {Close} from "@mui/icons-material";

type YearCardProps = {
    setChoosenYear: (year: number) => void;
    disabled: boolean;
    isMobile: boolean;
    closeDrawer?: () => void;
};

export default function YearCard({setChoosenYear, disabled, isMobile, closeDrawer}: YearCardProps) {
    const bigYears = Array.from({length: 10}, (_, i) => 2000 - 50 * i);
    const [expandedYear, setExpandedYear] = useState<number | null>(null);

    const getSubYears = (fromYear: number) => {
        return Array.from({length: 50}, (_, i) => fromYear - i);
    };

    const handleYearClick = (year: number) => {
        setExpandedYear(expandedYear === year ? null : year);
    };

    const handleSubYearClick = (year: number) => {
        setChoosenYear(year);

        if (isMobile && closeDrawer) {
            closeDrawer();
        }
    }

    return (
        <Card
            sx={{
                width: isMobile ? '100%' : 400,
                minWidth: isMobile ? '100%' : 400,
                boxShadow: 4,
                bgcolor: "#F2EAD3",
                opacity: disabled ? 0.5 : 1,
                pointerEvents: disabled ? "none" : "auto",
                transition: "opacity 0.3s ease"
            }}>

            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2}}>
                <Typography variant="h6">
                    Jahresübersicht
                </Typography>
                {isMobile && closeDrawer && (
                    <IconButton onClick={closeDrawer} size="small">
                        <Close />
                    </IconButton>
                )}
            </Box>

            <CardContent
                sx={{
                    maxHeight: isMobile ? 'calc(100vh - 100px)' : 450,
                    overflowY: "auto",
                    pr: 1,
                    mt: 2,
                }}
            >
                <Timeline position="left">
                    {bigYears.map((year, index) => (
                        <React.Fragment key={year}>
                            <TimelineItem>
                                <TimelineSeparator>
                                    <Button onClick={() => handleYearClick(year)}>
                                        <TimelineDot
                                            sx={{
                                                bgcolor:
                                                    expandedYear === year
                                                        ? "#B99470"
                                                        : index % 2 === 0
                                                            ? "#E2B59A"
                                                            : "#957C62",
                                            }}
                                        />
                                    </Button>
                                    {index < bigYears.length - 1 && <TimelineConnector/>}
                                </TimelineSeparator>
                                <TimelineContent sx={{fontWeight: "bold"}}>
                                    {year}
                                </TimelineContent>
                            </TimelineItem>
                            <Collapse in={expandedYear === year} timeout="auto" unmountOnExit>
                                <Timeline sx={{ml: 5}}>
                                    {getSubYears(year).map((subYear, subIndex) => (
                                        <TimelineItem key={subYear}>
                                            <TimelineSeparator>
                                                <Button onClick={() => handleSubYearClick(subYear)}>
                                                    <TimelineDot
                                                        sx={{
                                                            bgcolor:
                                                                subIndex % 2 === 0
                                                                    ? "#D7B377"
                                                                    : "#A68A64",
                                                            width: 10,
                                                            height: 10,
                                                        }}
                                                    />
                                                </Button>
                                                {subIndex < 49 && <TimelineConnector/>}
                                            </TimelineSeparator>
                                            <TimelineContent
                                                sx={{fontSize: 12, color: "#555"}}
                                            >
                                                {subYear}
                                            </TimelineContent>
                                        </TimelineItem>
                                    ))}
                                </Timeline>
                            </Collapse>
                        </React.Fragment>
                    ))}
                </Timeline>
            </CardContent>
        </Card>
    );
}