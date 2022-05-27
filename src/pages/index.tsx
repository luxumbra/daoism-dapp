import { Box, Button, HStack, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import ChakraNextLink from '../components/ChakraNextLink'
import { Header } from '../components/Header'


const Home: NextPage = () => {
  return (
    <Box className="wrapper">
      <Box as="main" display="flex" flexFlow="column nowrap" w="full">
        <Box as="section" display="flex" position="relative" w="full" maxW="100vw" maxH="100vh" h="100vh" alignItems="center" justifyContent="center">
          <Box maxW="3xl">
            <Text as="h1">Daoism Systems Challenge</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Home
