type ParkingSpot = {
    osm_id: number;
    capacity: string;
    distancy: number;
    probability_occupancy: number;
    tags: {
      parking: string;
      capacity: string;
      orientation: string;
    };
    way_area: number;
    way: string;
    way_geojson: {
      type: string;
      coordinates: Array<Array<[number, number]>>;
    };
  };