import { Box, Flex, HStack, IconButton, SkeletonText, Text } from "@chakra-ui/react"
import { DirectionsRenderer, GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"
import jwtDecode from "jwt-decode"
import { useEffect, useState } from "react"
import { FaLocationArrow } from "react-icons/fa"

import { useAuth } from "../../contexts/AuthContext"
import { api } from "../../services/api"

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

    const { isLoaded } = useJsApiLoader({
        // Mudar isso pro env (se for possível, visto o erro com a biblioteca)
        googleMapsApiKey: "AIzaSyAEongSsn0PJdwDmneVLpuhr0zers6itKQ",
    })

    const [map, setMap] = useState<any | null>(null)
    const [directionsResponse, setDirectionsResponse] = useState<any | null>(null)
    const [chosenSpot, setChosenSpot] = useState({})
    const [distance, setDistance] = useState("")
    const [duration, setDuration] = useState("")
    const [spots, setSpots] = useState<any>([])

    useEffect(() => {
        api.get(`dumpSpot/free`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        })
        .then((response) => {
            const data = response.data
            setSpots(Object.values(data))
        }) 
        .catch((err) => {
            console.log(err)
        })
    }, [])

    const spotsPositions: Object[] = spots.map((obj: any) => {
        return {
            lat: parseFloat(obj.address.latitude),
            lng: parseFloat(obj.address.longitude)
        }
    })

    console.log(spotsPositions)

    const calculateRoute = async (spot: any) => {
        
        setChosenSpot(spot)

        const directionsService = new google.maps.DirectionsService()
            
        const results: any = await directionsService.route({
            origin: center,
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

    if (!isLoaded) {
        return <SkeletonText/>
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
                    <Marker 
                    icon={{
                        url: "https://img.icons8.com/flat-round/64/000000/home--v1.png",
                        anchor: new google.maps.Point(17, 46),
                        scaledSize: new google.maps.Size(37, 37)
                    }}
                    position={center} 
                    title={"marker"} 
                    />
                    {directionsResponse && (<DirectionsRenderer directions={directionsResponse}/>)}
                    {spotsPositions.map((spot: any, index: number) => (<Marker key={index} position={spot} onClick={() => calculateRoute(spot)} />))}
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
                <Text>Distância: {distance} </Text>
                <Text>Tempo de viagem: {duration} </Text>
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