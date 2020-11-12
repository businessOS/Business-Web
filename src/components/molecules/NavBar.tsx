import React from 'react'
import { Box, Button, Flex, Link } from '@chakra-ui/core';
import NextLink from "next/link";

import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { isServer } from '../../utils/isServer';

interface NavBarProps {
}

export const NavBar: React.FC<NavBarProps> = ({ }) => {
    const [{fetching: logoutFeching}, logout] = useLogoutMutation();
   
    //  We create a function call isServer to determine where the fuction is called
    //  if server rendering then pause cause to not run this useQuery
    //  but will be run in the client to define if the user is login
    const [{ data, fetching }] = useMeQuery({
        pause: isServer(),
    })
    let body = null;

    if (fetching) {
        
    } else if (!data?.me) {
        body = (
            <>
                <Box ml={"auto"}>
                    <NextLink href="/login">
                        <Link mr={2}>Login</Link>
                    </NextLink>
                    <NextLink href="/register">
                        <Link>Register</Link>
                    </NextLink>
                </Box>
            </>
        );
        
    } else {
        body = (<Box>
            <Box ml={"auto"}>{data.me.username}</Box>
            <Button onClick={() =>{
                logout();
            }}
            isLoading={logoutFeching}
            variant='link'>Logout</Button>
        </Box>)
    }
    
    return (
        <Flex bg="tan" p={4}>
            <Box ml={"auto"}>{body}</Box>
        </Flex>
    );
}
