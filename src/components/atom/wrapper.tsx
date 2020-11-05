import React from 'react'
import { Box } from '@chakra-ui/core';

interface WrapperProps {
    small?: true;
}

export const Wrapper: React.FC<WrapperProps> = ({ children, small }) => {
    return (
        <Box mt={16} mx='auto' maxW={small ? "400px" :  "800px"} w="100%">
            {children}
        </Box>
    );
}
