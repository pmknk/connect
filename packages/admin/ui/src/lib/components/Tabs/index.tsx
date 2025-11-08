import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiTabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import type { ExtendedTheme } from '../../types';

import type React from 'react';
import { useSearchParams } from 'react-router-dom';

export type TabsItem = {
    label: React.ReactNode;
    value: string;
    panelTitle?: React.ReactNode;
    content: React.ReactNode;
};

export type TabsProps = {
    items: TabsItem[];
    paramName?: string;
    defaultValue?: string;
};

export const Tabs = ({ items, paramName = 'tab', defaultValue }: TabsProps) => {
    const { breakpoints } = useTheme<ExtendedTheme>();
    const isMobile = useMediaQuery(breakpoints.down('sm'));

    const [searchParams, setSearchParams] = useSearchParams();
    const effectiveDefault = defaultValue ?? (items[0] ? items[0].value : '');

    const param = (
        searchParams.get(paramName) || effectiveDefault
    ).toLowerCase();
    const activeIndex = Math.max(
        0,
        items.findIndex(({ value }) => value.toLowerCase() === param)
    );

    const handleChange = (event: React.SyntheticEvent, newIndex: number) => {
        const next = new URLSearchParams(searchParams);
        const nextValue = items[newIndex]?.value ?? effectiveDefault;
        next.set(paramName, nextValue);
        setSearchParams(next, { replace: true });
    };

    return (
        <>
            <Box sx={{ mt: 4 }}>
                <MuiTabs
                    value={activeIndex}
                    onChange={handleChange}
                    sx={{
                        '& .MuiTabs-flexContainer': { gap: isMobile ? 1 : 3 }
                    }}
                >
                    {items.map(({ label }, idx) => (
                        <Tab key={idx} label={label} />
                    ))}
                </MuiTabs>
            </Box>
            {items.map(({ panelTitle, content }, idx) => (
                <div
                    key={idx}
                    role="tabpanel"
                    hidden={activeIndex !== idx}
                    id={`tabs-with-query-tabpanel-${idx}`}
                    aria-labelledby={`tabs-with-query-tab-${idx}`}
                >
                    {activeIndex === idx && (
                        <Box sx={{ py: 6 }}>
                            {panelTitle && (
                                <Typography variant="body1" mb={4}>
                                    {panelTitle}
                                </Typography>
                            )}
                            {content}
                        </Box>
                    )}
                </div>
            ))}
        </>
    );
};
