import L from "leaflet";
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Place } from '../../../shared/shareddtypes';


type MapProps = {
    markers: Place[];
    funcNewMarker: (p: L.Marker) => void;
    funcSelectedMarker: (p: Place) => void;
    newMarker: L.Marker | undefined;
};

const icon = new L.Icon({
    iconUrl: require('../../../assets/marker-icon.png'),
    iconSize: new L.Point(50, 50),
    iconAnchor: [25, 50],
    className: 'leaflet-div-icon'
});

function Map(props: MapProps): JSX.Element {

    const MapContent = () => {
        const map = useMapEvents({
            click(e) {
                if (props.newMarker) {
                    map.removeLayer(props.newMarker);
                }
                var marker = new L.Marker([e.latlng.lat, e.latlng.lng]);
                props.funcNewMarker(marker);
                marker.setIcon(icon);
                map.addLayer(marker);
            },
        })

        return (
            <>

            </>
        );
    }

    type markerProps = {
        marker: Place
    }

    

    const CustomMarker = function (propsM: markerProps) {
        const map = useMap()

        return (<Marker
            key={propsM.marker.direction}
            position={[propsM.marker.latitude, propsM.marker.longitude]}
            icon={icon}
            eventHandlers={{
                click: (e) => {
                    if (props.newMarker) {
                        map.removeLayer(props.newMarker!);
                    }
                    props.funcSelectedMarker(propsM.marker);
                },
            }}
        >
            <Popup>
                {propsM.marker.direction}
            </Popup>
        </Marker>
        );
    }

    return (
        <>
            <div className="buscador">
                <input type="text" name="buscar"></input>
                <button> 🔍︎ Buscar  </button>
            </div>
            <div className="map">
                <MapContainer center={[43.35485, -5.85123]} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapContent />

                    {Array.isArray(props.markers) && props.markers.map((marker) =>
                        <CustomMarker marker={marker} />
                    )}
                </MapContainer>
            </div>
        </>
    );
}

export default Map;