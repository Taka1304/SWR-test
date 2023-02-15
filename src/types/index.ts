export type busstopData = {
  route: {
    id: number;
    name: string;
    lat: number;
    lng: number;
    timetable: string[];
    timetableToHospital?: string[];
  }[]
}

export type busstop = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  timetable: string[];
  timetableToHospital?: string[];
}