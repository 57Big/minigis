import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  useMapEvents,
  useMap,
} from 'react-leaflet';
import { useEffect } from 'react';

const { BaseLayer, Overlay } = LayersControl;

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick?.({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

function FlyController({ flyTo }) {
  const map = useMap();
  useEffect(() => {
    if (flyTo && Number.isFinite(flyTo.lat) && Number.isFinite(flyTo.lng)) {
      map.flyTo([flyTo.lat, flyTo.lng], flyTo.zoom || 13, { duration: 0.8 });
    }
  }, [flyTo, map]);
  return null;
}

function ResizeWatcher() {
  const map = useMap();
  useEffect(() => {
    const container = map.getContainer();
    const ro = new ResizeObserver(() => {
      map.invalidateSize();
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, [map]);
  return null;
}

export default function MapView({
  center = [41.3111, 69.2797],
  zoom = 12,
  baseLayer = 'osm',
  marker = null,
  savedMarkers = [],
  onMapClick,
  flyTo = null,
}) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom
      className="h-full w-full"
      zoomControl
    >
      <LayersControl position="topright">
        <BaseLayer checked={baseLayer === 'osm'} name="🗺️ OpenStreetMap">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            maxZoom={19}
          />
        </BaseLayer>

        <BaseLayer checked={baseLayer === 'satellite'} name="🛰️ Satellite (Esri)">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles &copy; Esri — Source: Esri, Maxar, Earthstar Geographics, GIS User Community"
            maxZoom={19}
          />
        </BaseLayer>

        <BaseLayer checked={baseLayer === 'terrain'} name="⛰️ Terrain (OpenTopoMap)">
          <TileLayer
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            attribution='Map data: &copy; OpenStreetMap contributors, SRTM | Style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)'
            maxZoom={17}
          />
        </BaseLayer>

        <BaseLayer name="🌑 Dark (Carto)">
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            maxZoom={20}
          />
        </BaseLayer>

        <Overlay name="🏷️ Labels (Esri)">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
            attribution="Labels &copy; Esri"
            maxZoom={19}
          />
        </Overlay>
      </LayersControl>

      <MapClickHandler onMapClick={onMapClick} />
      <FlyController flyTo={flyTo} />
      <ResizeWatcher />

      {marker && Number.isFinite(marker.lat) && Number.isFinite(marker.lng) && (
        <Marker position={[marker.lat, marker.lng]}>
          <Popup>
            <div className="text-sm">
              <div className="font-semibold mb-1">{marker.name || 'Tanlangan joy'}</div>
              <div className="text-xs text-gray-600">
                {marker.lat.toFixed(5)}, {marker.lng.toFixed(5)}
              </div>
            </div>
          </Popup>
        </Marker>
      )}

      {savedMarkers.map((m) => (
        <Marker key={m._id} position={[m.latitude, m.longitude]}>
          <Popup>
            <div className="text-sm">
              <div className="font-semibold mb-1">{m.name}</div>
              <div className="text-xs text-gray-600">
                {m.latitude.toFixed(5)}, {m.longitude.toFixed(5)}
              </div>
              <div className="text-[11px] text-gray-500 mt-1">
                {new Date(m.createdAt).toLocaleString('uz-UZ')}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
