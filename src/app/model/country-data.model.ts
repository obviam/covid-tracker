import { InfectionData } from './infection-data.model';

export class CountryData {
    country: string;
    countryName: string;
    latestData: InfectionData;
    totalData: InfectionData;
    dailyData: Array<InfectionData>;
}