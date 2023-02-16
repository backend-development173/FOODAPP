import './new.css';
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import mapSDK from '@tomtom-international/web-sdk-maps'
import mapServices from '@tomtom-international/web-sdk-services'
import { React, useState, useEffect, useRef } from 'react'
const API_KEY  = 4903770537053
async function mainProcessor(targetMap) {
 
    let coords_arr =444
 
  let coords_length = 11
  let full_coord = "efe"
 
    coords_arr.forEach((coordinate, index) => {
      //whenever a comma is encountered, split the text into an array
      let points = coordinate.split(",")
      //accessing the latitude and longitude from the split array
      
      let latitude = points[0]
      let longitude = points[1]
      full_coord = full_coord.concat(longitude + "," + latitude)
      if (index < (coords_length - 1)) {
        full_coord = full_coord.concat(";")
      }
 
    });
 
    //fields object
    let fields  = "{projectedPoints{type,geometry{type,coordinates},properties{routeIndex,snapResult}},route{type,geometry{type,coordinates},properties{id,linearReference,speedLimits{value,unit,type},address{roadName,roadNumbers,municipality,countryName,countryCode,countrySubdivision},traveledDistance{value,unit},privateRoad,partOfTunnel,urbanArea,elementType,frc,formOfWay,roadUse,laneInfo{numberOfLanes},heightInfo{height,chainage,unit},trafficSigns{signType,chainage,unit},trafficLight}},distances{total,ferry,road,privateRoad,publicRoad,offRoad,unit}}"
  
    let snap_to_roads_url = 'https://api.tomtom.com/snap-to-roads/1/snap-to-roads?points=' + full_coord + '&fields='+ fields +'&key=' + API_KEY
    snap_to_roads(snap_to_roads_url, targetMap)
  }
async function snap_to_roads(snapUrl, targetMap) {
    let snap_response = await fetch(snapUrl);
    let roads_data = await snap_response.json();
    let routes_arr = roads_data.route
 
    //extracting the coordinates for setting the map's boundaries
    let boundary_coordinates = routes_arr[0].geometry.coordinates
    routes_arr.forEach((point, index) => {
      boundary_coordinates = boundary_coordinates.concat(point.geometry.coordinates)
    });
 
    //setting the GEOJSON object required for the map display
    //choosing the first route object to give us a quick GeoJSON-ready object
    routes_arr[0].geometry.coordinates = boundary_coordinates
    let mapGeoJsonObj = routes_arr[0]
 
    drawMap(targetMap, boundary_coordinates, mapGeoJsonObj)
 
  }
async function drawMap(targetMap, boundaryCoords, geojsonObj) {
    try {
      setMapBounds(targetMap, boundaryCoords)
      targetMap.addLayer({
        'id': 'routeDemo',
        'type': 'line',
        'source': {
          'type': 'geojson',
          'data': geojsonObj
        },
        'paint': {
          'line-color': '#ff0000',
          'line-width': 8
        }
      });
    } catch (e) {
      console.log(e)
    }
  }
function setMapBounds(targetMap, coordinatesObj) {
    let mapBounds = new mapSDK.LngLatBounds();
    coordinatesObj.forEach((point) => {
      mapBounds.extend(mapSDK.LngLat.convert(point));
    });
    targetMap.fitBounds(mapBounds, { duration: 0, padding: 50 });
  }
function App() {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const mapContainer = useRef();
    //use this to change the zoom level of the map 
    const [zoomLevel, setZoomLevel] = useState(3);
    useEffect(() => {
        let ourMap = mapSDK.map({
          key: API_KEY,
          container: mapContainer.current,
          zoom: zoomLevel
        });
        setMap(ourMap);
        ourMap.on('load', 'routeDemo' ,mainProcessor(ourMap));
        return () => ourMap.remove();
      }, []);
    let traffic_flow_url = encodeURI('https://api.tomtom.com/traffic/services/4/flowSegmentData/relative0/12/json?point=38.219901,-85.773140&unit=KMPH&openLr=false&key=' + API_KEY);
  
  return (
    <div className="App">
      <div ref={mapContainer} className="routeMapDemo" />
    </div>
  );
}


export default App;