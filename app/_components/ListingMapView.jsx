"use client";

import { supabase } from "../../utils/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import GoogleMapSection from "./GoogleMapSection";
import VillageList from "./Listing";

const VillageMapView = () => {
  const [allVillages, setAllVillages] = useState([]);
  const [filteredVillages, setFilteredVillages] = useState([]);
  const [searchedAddress, setSearchedAddress] = useState("");
  const [coordinates, setCoordinates] = useState();

  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [blockTehsil, setBlockTehsil] = useState("");
  const [populationRange, setPopulationRange] = useState([0, 20000]);
  const [publicBus, setPublicBus] = useState(false);
  const [railwayStation, setRailwayStation] = useState(false);
  const [nearestTown, setNearestTown] = useState("");
  const [sortBy, setSortBy] = useState("population");
  const [area, setArea] = useState("");
  const [sexRatio, setSexRatio] = useState("");
  const [population, setPopulation] = useState("");
  const [households, setHouseholds] = useState("");

  useEffect(() => {
    getVillages();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [
    allVillages,
    state,
    district,
    blockTehsil,
    populationRange,
    publicBus,
    railwayStation,
    nearestTown,
    sortBy,
    area,
    sexRatio,
    population,
    households,
  ]);

  const getVillages = async () => {
    const { data, error } = await supabase
      .from("villages")
      .select("*")
      .order("id", { ascending: false });

    if (data) {
      setAllVillages(data);
    }
    if (error) {
      toast.error("Server Side Error");
      console.error(error);
    }
  };

  const applyFilters = () => {
    let filtered = [...allVillages];

    // Filter by state
    if (state) {
      filtered = filtered.filter((village) =>
        village.state?.toLowerCase().includes(state.toLowerCase())
      );
    }

    // Filter by district
    if (district) {
      filtered = filtered.filter((village) =>
        village.district?.toLowerCase().includes(district.toLowerCase())
      );
    }

    // Filter by block/tehsil
    if (blockTehsil) {
      filtered = filtered.filter((village) =>
        village.block_tehsil?.toLowerCase().includes(blockTehsil.toLowerCase())
      );
    }

    // Filter by area
    if (area) {
      filtered = filtered.filter((village) =>
        (village.area || "").toLowerCase().includes(area.toLowerCase())
      );
    }

    // Filter by sex ratio
    if (sexRatio) {
      filtered = filtered.filter((village) =>
        (village.sex_ratio_2011 || "")
          .toLowerCase()
          .includes(sexRatio.toLowerCase())
      );
    }

    // Filter by population_2011
    if (population) {
      filtered = filtered.filter((village) =>
        (village.population_2011 || "")
          .toLowerCase()
          .includes(population.toLowerCase())
      );
    }

    // Filter by households
    if (households) {
      filtered = filtered.filter((village) =>
        (village.households || "")
          .toLowerCase()
          .includes(households.toLowerCase())
      );
    }

    // Filter by population range
    if (Array.isArray(populationRange) && populationRange.length === 2) {
      filtered = filtered.filter((village) => {
        const pop = parseInt(village.population_2011) || 0;
        return pop >= populationRange[0] && pop <= populationRange[1];
      });
    }

    // Filter by public bus service
    if (publicBus) {
      filtered = filtered.filter(
        (village) =>
          village.public_bus_service === true ||
          village.public_bus_service === "Yes"
      );
    }

    // Filter by railway station
    if (railwayStation) {
      filtered = filtered.filter(
        (village) =>
          village.railway_station === true || village.railway_station === "Yes"
      );
    }

    // Filter by nearest town
    if (nearestTown) {
      filtered = filtered.filter((village) =>
        (village.nearest_town || "")
          .toLowerCase()
          .includes(nearestTown.toLowerCase())
      );
    }

    // Sort the results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "population":
          return (
            (parseInt(b.population_2011) || 0) -
            (parseInt(a.population_2011) || 0)
          );
        case "name":
          return (a.gram_panchayat || "")
            .toLowerCase()
            .trim()
            .localeCompare((b.gram_panchayat || "").toLowerCase().trim());
        case "nearest_town":
          return (a.nearest_town || "")
            .toLowerCase()
            .trim()
            .localeCompare((b.nearest_town || "").toLowerCase().trim());
        default:
          return 0;
      }
    });

    // Limit to top 15 results
    filtered = filtered.slice(0, 20);

    setFilteredVillages(filtered);
  };

  const handleSearchClick = async () => {
    let query = supabase
      .from("villages")
      .select("*")
      .ilike("district", `%${searchedAddress}%`)
      .order("id", { ascending: false });

    const { data, error } = await query;

    if (data) {
      setAllVillages(data);
    }
    if (error) {
      toast.error("Error Searching villages");
    }
  };

  return (
    <div className="relative">
      <div className="hidden md:flex">
        <div className="w-full pr-[350px] lg:pr-[550px] xl:pr-[650px]">
          <VillageList
            listing={filteredVillages}
            handleSearchClick={handleSearchClick}
            searchedAddress={setSearchedAddress}
            setCoordinates={setCoordinates}
            state={state}
            district={district}
            blockTehsil={blockTehsil}
            populationRange={populationRange}
            publicBus={publicBus}
            railwayStation={railwayStation}
            nearestTown={nearestTown}
            sortBy={sortBy}
            area={area}
            sexRatio={sexRatio}
            population={population}
            households={households}
            setState={setState}
            setDistrict={setDistrict}
            setBlockTehsil={setBlockTehsil}
            setPopulationRange={setPopulationRange}
            setPublicBus={setPublicBus}
            setRailwayStation={setRailwayStation}
            setNearestTown={setNearestTown}
            setSortBy={setSortBy}
            setArea={setArea}
            setSexRatio={setSexRatio}
            setPopulation={setPopulation}
            setHouseholds={setHouseholds}
          />
        </div>

        <div className="fixed right-0 top-33 bottom-10 w-[350px] lg:w-[550px] xl:w-[650px] z-10">
          <GoogleMapSection
            listing={filteredVillages}
            coordinates={coordinates}
          />
        </div>
      </div>

      <div className="md:hidden space-y-8">
        <VillageList
          listing={filteredVillages}
          handleSearchClick={handleSearchClick}
          searchedAddress={setSearchedAddress}
          setCoordinates={setCoordinates}
          state={state}
          district={district}
          blockTehsil={blockTehsil}
          populationRange={populationRange}
          publicBus={publicBus}
          railwayStation={railwayStation}
          nearestTown={nearestTown}
          sortBy={sortBy}
          area={area}
          sexRatio={sexRatio}
          population={population}
          households={households}
          setState={setState}
          setDistrict={setDistrict}
          setBlockTehsil={setBlockTehsil}
          setPopulationRange={setPopulationRange}
          setPublicBus={setPublicBus}
          setRailwayStation={setRailwayStation}
          setNearestTown={setNearestTown}
          setSortBy={setSortBy}
          setArea={setArea}
          setSexRatio={setSexRatio}
          setPopulation={setPopulation}
          setHouseholds={setHouseholds}
        />
        <GoogleMapSection
          listing={filteredVillages}
          coordinates={coordinates}
        />
      </div>
    </div>
  );
};

export default VillageMapView;
