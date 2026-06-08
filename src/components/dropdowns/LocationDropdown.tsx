import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// import { GeoCode } from "../../schema/weatherSchema";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
};

const LocationDropdown = ({ location, setLocation }: Props) => {
  const popularLocations = [
    "France",
    "New York",
    "London",
    "Italy",
    "Spain",
    "Australia",
    "Dubai",
    "Turkey",
    "Bangkok",
    "Cape Town",
    "Japan",
    "Peru",
    "Indonesia",
    "Brazil",
    "Greece",
    "Cairo",
    "Prague",
    "Morocco",
    "Iceland",
  ];

  return (
    <Select value={location} onValueChange={(value) => setLocation(value)}>
      <SelectTrigger className="w-full xs:w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent className="z-1001">
        <SelectGroup>
          {location === "custom" && (
            <SelectItem value="custom">Custom</SelectItem>
          )}
          {popularLocations.map((location) => (
            <SelectItem key={location} value={location}>
              {location}
            </SelectItem>
          ))}
          -
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LocationDropdown;
