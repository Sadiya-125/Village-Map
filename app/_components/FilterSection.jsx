"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const FilterSection = ({
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
  setState,
  setDistrict,
  setBlockTehsil,
  setPopulationRange,
  setPublicBus,
  setRailwayStation,
  setNearestTown,
  setSortBy,
  setArea,
  setSexRatio,
  setPopulation,
  setHouseholds,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="flex gap-2 w-full sm:w-28 h-10 text-md"
        >
          <Filter className="h-4 w-4 text-primary" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[320px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-xl font-extrabold tracking-tight">
            Village Filters
          </SheetTitle>
        </SheetHeader>

        <div className="px-3 py-4 grid grid-cols-1 gap-4">
          {/* District */}
          <Input
            placeholder="District"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />

          {/* Block / Tehsil */}
          <Input
            placeholder="Block / Tehsil"
            value={blockTehsil}
            onChange={(e) => setBlockTehsil(e.target.value)}
          />

          {/* Area */}
          <Input
            placeholder="Area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />

          {/* Sex Ratio 2011 */}
          <Input
            placeholder="Sex Ratio 2011"
            value={sexRatio}
            onChange={(e) => setSexRatio(e.target.value)}
          />

          {/* Population 2011 */}
          <Input
            placeholder="Population 2011"
            value={population}
            onChange={(e) => setPopulation(e.target.value)}
          />

          {/* Households */}
          <Input
            placeholder="Households"
            value={households}
            onChange={(e) => setHouseholds(e.target.value)}
          />

          {/* Nearest Town */}
          <Input
            placeholder="Nearest Town"
            value={nearestTown}
            onChange={(e) => setNearestTown(e.target.value)}
          />

          {/* Sort By */}
          <div>
            <label className="text-sm font-medium mb-2 block">Sort By</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Sort Option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="population">
                  Population (High to Low)
                </SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="nearest_town">Nearest Town (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Population Slider */}
          <div>
            <label className="text-sm font-medium mb-4 block">
              Population Range
            </label>
            <Slider
              min={0}
              max={1000}
              step={50}
              value={populationRange}
              onValueChange={(value) => setPopulationRange(value)}
            />
            <p className="text-xs mt-4 text-muted-foreground">
              {Array.isArray(populationRange) && populationRange.length === 2
                ? `${populationRange[0].toLocaleString()} – ${populationRange[1].toLocaleString()}`
                : "N/A"}
            </p>
          </div>

          <Button
            variant="secondary"
            className="w-full mt-2"
            onClick={() => {
              setState("");
              setDistrict("");
              setBlockTehsil("");
              setNearestTown("");
              setSortBy("population");
              setPopulationRange([0, 20000]);
              setPublicBus(false);
              setRailwayStation(false);
              setArea("");
              setSexRatio("");
              setPopulation("");
              setHouseholds("");
            }}
          >
            Reset Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSection;
