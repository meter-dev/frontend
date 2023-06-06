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
