export interface EletricityResource {
  id: number;
  timestamp: number;
  east: {
    load: number;
    max_supply: number;
    recv_rate: number;
  };
  south: {
    load: number;
    max_supply: number;
    recv_rate: number;
  };
  central: {
    load: number;
    max_supply: number;
    recv_rate: number;
  };
  north: {
    load: number;
    max_supply: number;
    recv_rate: number;
  };
  whole: {
    load: number;
    max_supply: number;
    recv_rate: number;
  };
}

export interface WaterResource {
  id: number | null;
  name: string;
  timestamp: number;
  storage: number;
  percent: number;
}

export interface EarthquakeResource {
  id: number;
  timestamp: number;
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  scale: number;
  intensity: [number, number, number];
  link: string;
  img: string;
}
