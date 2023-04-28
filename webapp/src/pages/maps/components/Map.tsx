import L from "leaflet";
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { PlacePOD } from '../../../shared/shareddtypes';
import { useState } from "react";
import IconoRestaurante from "../../../assets/icono-restaurante.svg";
import IconoMonumento from "../../../assets/icono-monumento.svg";
import IconoBiblioteca from "../../../assets/icono-biblioteca.svg";


type MapProps = {
    markers: PlacePOD[];
    funcNewMarker: (p: L.Marker) => void;
    funcSelectedMarker: (p: PlacePOD) => void;
    newMarker: L.Marker | undefined;
    selectedMarker: PlacePOD | undefined;
};

const icon = new L.Icon({
    iconUrl: require('../../../assets/marker-icon.png'),
    iconSize: new L.Point(30, 30),
    iconAnchor: [15, 30],
    className: 'leaflet-div-icon'
});

function Map(props: MapProps): JSX.Element {

    const [showMarkers, setShowMarkers] = useState(true);

    const MapContent = () => {

        useMapEvents({
            click(e) {
                var marker = new L.Marker([e.latlng.lat, e.latlng.lng]);
                props.funcNewMarker(marker);
                marker.setIcon(icon);
            }
        });

        return (
            <>

            </>
        );
    }

    type markerProps = {
        marker: PlacePOD
    }



    const CustomMarker = function (propsM: markerProps) {
        const map = useMap()

        let icono = undefined;

        switch (propsM.marker.place.category) {
            case "Monumento":
                icono = new L.Icon({
                    iconUrl: IconoMonumento,
                    iconSize: new L.Point(40, 40),
                    iconAnchor: [20, 40],
                    className: 'leaflet-div-icon'
                });
                break;
            case "Biblioteca":
                icono = new L.Icon({
                    iconUrl: IconoBiblioteca,
                    iconSize: new L.Point(40, 40),
                    iconAnchor: [20, 40],
                    className: 'leaflet-div-icon'
                });
                break;
            case "Restaurante":
                icono = new L.Icon({
                    iconUrl: IconoRestaurante,
                    iconSize: new L.Point(40, 40),
                    iconAnchor: [20, 40],
                    className: 'leaflet-div-icon'
                });
                break;
            default:
                icono = icon;
                break;
        }

        return (<Marker
            key={propsM.marker.place.name}
            position={[propsM.marker.place.latitude, propsM.marker.place.longitude]}
            icon={icono}
            eventHandlers={{
                click: (e) => {
                    map.flyTo([propsM.marker.place.latitude, propsM.marker.place.longitude], 14, {
                        animate: true,
                        duration: 1
                    });
                    props.funcSelectedMarker(propsM.marker);
                },
            }}
        >
        </Marker>
        );
    }

    const HideShowLayers = () => {
        const map = useMap();

        map.on('zoomend', function () {

            console.log(map.getZoom());
            if (map.getZoom() < 12) {
                setShowMarkers(false);
            } else {
                setShowMarkers(true);
            }
        });

        return null;
    }

    return (
        <>
            <div className="buscador">
                <input type="text" name="buscar"></input>
                <button> 🔍︎ Buscar  </button>
            </div>
            <div className="map">
                <MapContainer center={[43.35485, -5.85123]} zoom={14} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapContent />
                    { Array.isArray(props.markers) && showMarkers?props.markers.map((marker) =>
                        <CustomMarker marker={marker} />):<></>}
                    <HideShowLayers />

                </MapContainer>
            </div>
        </>
    );
}

export default Map;