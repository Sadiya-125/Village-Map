"use client";

import { MapPin, Search, Users, Map, Landmark } from "lucide-react";
import GoogleAddressSearch from "./GoogleAddressSearch";
import { Button } from "@/components/ui/button";
import FilterSection from "./FilterSection";
import { useState } from "react";
import Link from "next/link";

const VillageList = ({
  listing,
  handleSearchClick,
  setCoordinates,
  setBoundingBox,
  state,
  district,
  blockTehsil,
  populationRange,
  publicBus,
  railwayStation,
  setState,
  setDistrict,
  setBlockTehsil,
  setPopulationRange,
  setPublicBus,
  setRailwayStation,
}) => {
  const [searchAddress, setSearchAddress] = useState("");

  return (
    <div>
      {/* Search & Filters */}
      <div className="p-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-2">
        <div className="w-auto sm:w-full">
          <GoogleAddressSearch
            onSelectAddress={(value) => {
              console.log("Selected Address:", value);
              setSearchAddress(value.address);
              setDistrict(value.district);
              setCoordinates({ lat: value.lat, lon: value.lon });
            }}
          />
        </div>

        <Button
          className="flex gap-2 w-full sm:w-28 h-10 text-md sm:mt-10 mt-0"
          onClick={handleSearchClick}
        >
          <Search className="h-4 w-4" /> Search
        </Button>

        <div className="w-full sm:w-auto sm:mt-10 mt-0">
          <FilterSection
            state={state}
            district={district}
            blockTehsil={blockTehsil}
            populationRange={populationRange}
            publicBus={publicBus}
            railwayStation={railwayStation}
            setState={setState}
            setDistrict={setDistrict}
            setBlockTehsil={setBlockTehsil}
            setPopulationRange={setPopulationRange}
            setPublicBus={setPublicBus}
            setRailwayStation={setRailwayStation}
          />
        </div>
      </div>

      {district && (
        <div className="px-3 py-3">
          <h2 className="text-md">
            Found <span className="font-bold">{listing?.length}</span>{" "}
            {listing?.length !== 1 ? "villages" : "village"} in{" "}
            <span className="text-primary font-bold">{district}</span>
          </h2>
        </div>
      )}

      {/* Village Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-3">
        {listing?.length > 0
          ? listing.map((item, index) => (
              <Link
                href={`/village/${item.id}`}
                key={index}
                target="_blank"
                className="block"
              >
                <div className="p-4 border rounded-lg hover:border-primary transition">
                  <h2 className="text-lg font-bold mb-2">
                    {item.gram_panchayat || "Unknown Panchayat"}
                  </h2>
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <MapPin className="h-4 w-4 mr-1" /> {item.block_tehsil},{" "}
                    {item.district}, {item.state}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Users className="h-4 w-4 mr-1" /> Population:{" "}
                    {item.population_2011}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Landmark className="h-4 w-4 mr-1" /> Nearest Town:{" "}
                    {item.nearest_town || "N/A"}
                  </div>
                </div>
              </Link>
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="h-[120px] w-full bg-slate-200 animate-pulse rounded-lg"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default VillageList;
