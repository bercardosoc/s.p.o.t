import { Box, Flex, HStack, IconButton, SkeletonText, Text } from "@chakra-ui/react"
import { DirectionsRenderer, GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"
import jwtDecode from "jwt-decode"
import { useState } from "react"
import { FaLocationArrow } from "react-icons/fa"

import { useAuth } from "../../contexts/AuthContext"

// Casa do usuário
export const Dashboard = () => {

    interface User {
        id: string
        name: string
        email: string
        password?: string
        address: {
            city: string 
            complement?: string 
            isDumpSpot: boolean 
            latitude: number 
            longitude: number 
            number: number 
            state: string 
            street: string 
            zipCode: string
        } 
    }

    const { accessToken } = useAuth()

    const decoded: User = jwtDecode(accessToken)
    const userLat = decoded.address.latitude 
    const userLon = decoded.address.longitude 
    
    const center = { lat: userLat, lng: userLon } 
    
    interface Spot {
        lat: number
        lng: number 
    }

    interface DirectionResponseData {
        origin: Spot 
        destination: Spot
        travelMode: string 
    }

    const { isLoaded } = useJsApiLoader({
        // Mudar isso pro env (se for possível, visto o erro com a biblioteca)
        googleMapsApiKey: "AIzaSyAEongSsn0PJdwDmneVLpuhr0zers6itKQ",
    })

    const [map, setMap] = useState<any | null>(null)
    const [directionsResponse, setDirectionsResponse] = useState<any | null>(null)
    const [chosenSpot, setChosenSpot] = useState({})
    const [distance, setDistance] = useState("")
    const [duration, setDuration] = useState("")
    const [travelMode, setTravelMode] = useState("WALKING")

    if (!isLoaded) {
        return <SkeletonText/>
    }

    // Pegá-los do back-end a partir do endereço do usuário
    const spots = [
        {lat: -22.78661191761933, lng: -43.426467025617825},
        {lat: -22.7850886197071, lng: -43.42688545022195},
        {lat: -22.783917126554538, lng: -43.429634153455375}
    ]

    const calculateRoute = async (spot: any) => {
        
        setChosenSpot(spot)

        const directionsService = new google.maps.DirectionsService()
            
        const results: any = await directionsService.route({
            origin: { lat: -22.787638099915984, lng: -43.426555186544796 },
            destination: chosenSpot,
            travelMode: google.maps.TravelMode.WALKING,
        })

        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
    }
    const onLoadFunction = () => {
        setMap(map)
    }

    return (
        <Flex
            position='relative'
            flexDirection='column'
            alignItems='center'
            h='100vh'
            w='100vw'
        >
            <Box position='absolute' left={0} top={0} h='100%' w='100%'>
                <GoogleMap
                    center={center}
                    zoom={15}
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                      }}
                    onLoad={onLoadFunction}>
                    <Marker position={center} title={"marker"} />
                    {directionsResponse && (<DirectionsRenderer directions={directionsResponse}/>)}
                    {spots.map((spot, index) => (<Marker key={index} position={spot} onClick={() => calculateRoute(spot)} />))}            
                </GoogleMap>   
            </Box>
            <Box
                p={4}
                borderRadius='lg'
                m={4}
                bgColor='white'
                shadow='base'
                minW='container.md'
                zIndex='1'
            >
                <HStack spacing={4} mt={4} justifyContent='space-between'>
                <Text>Distance: {distance} </Text>
                <Text>Duration: {duration} </Text>
                <IconButton
                    aria-label='center back'
                    icon={<FaLocationArrow />}
                    isRound
                    onClick={() => {
                    map.panTo(center)
                    map.setZoom(15)
                    }}
                />
                </HStack>
      </Box>
        </Flex>
    )
}