import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LocationDropdown = () => {
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
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent className="z-1001">
        <SelectGroup>
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
