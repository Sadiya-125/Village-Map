"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../../utils/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Layers,
  Home,
  Users,
  Link as LinkIcon,
} from "lucide-react";
import GoogleMapSection from "../../../_components/GoogleMapSection";

const ViewVillage = () => {
  const { id } = useParams();
  const [village, setVillage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVillage = async () => {
      const { data, error } = await supabase
        .from("villages")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error Fetching Village:", error);
        toast.error("Failed to Load Village");
      } else {
        setVillage(data);
      }
      setLoading(false);
    };

    if (id) fetchVillage();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <p className="text-primary font-semibold text-lg">Loading Village...</p>
      </div>
    );
  }

  if (!village) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <p className="text-primary font-semibold text-lg">Village Not Found</p>
      </div>
    );
  }

  const fieldDisplay = (label, value, Icon) => {
    if (!value) return null;

    return (
      <div className="flex items-center space-x-3 bg-muted rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
        {Icon && (
          <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center text-primary">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div className="flex flex-col">
          <Label className="text-xs uppercase text-muted-foreground">
            {label}
          </Label>
          <p className="font-medium text-sm">{value}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="bg-card shadow-xl rounded-2xl p-6">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-3xl font-extrabold tracking-tight">
              Village Details
            </CardTitle>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3 py-2 border border-input rounded-md text-sm font-medium hover:bg-muted transition"
            >
              <ArrowLeft className="w-4 h-4 text-primary" />
              Back
            </Link>
          </div>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fieldDisplay("Gram Panchayat", village.gram_panchayat, Home)}
          {fieldDisplay("Block/Tehsil", village.block_tehsil, Layers)}
          {fieldDisplay("District", village.district, Layers)}
          {fieldDisplay("State", village.state, Layers)}
          {fieldDisplay("Pincode", village.pincode, Layers)}
          {fieldDisplay("Area", village.area, Layers)}
          {fieldDisplay("Sex Ratio (2011)", village.sex_ratio_2011, Users)}
          {fieldDisplay("Population (2011)", village.population_2011, Users)}
          {fieldDisplay("Households", village.households, Users)}
          {fieldDisplay("Nearest Town", village.nearest_town, MapPin)}
          {fieldDisplay(
            "URL",
            <a
              href={village.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-words"
            >
              {village.url}
            </a>,
            LinkIcon
          )}

          {/* Population Details */}
          {fieldDisplay(
            "Total Population",
            village.population_total_population_total,
            Users
          )}
          {fieldDisplay(
            "Total Male",
            village.population_total_population_male,
            Users
          )}
          {fieldDisplay(
            "Total Female",
            village.population_total_population_female,
            Users
          )}

          {/* Child Population */}
          {fieldDisplay(
            "Child Pop (0-6) Total",
            village.population_child_population_0_6_yrs_total,
            Users
          )}
          {fieldDisplay(
            "Child Pop (0-6) Male",
            village.population_child_population_0_6_yrs_male,
            Users
          )}
          {fieldDisplay(
            "Child Pop (0-6) Female",
            village.population_child_population_0_6_yrs_female,
            Users
          )}

          {/* Scheduled Castes & Tribes */}
          {fieldDisplay(
            "SC Total",
            village.population_scheduled_castes_sc_total,
            Users
          )}
          {fieldDisplay(
            "ST Total",
            village.population_scheduled_tribes_st_total,
            Users
          )}
          {fieldDisplay(
            "Literate Total",
            village.population_literate_population_total,
            Users
          )}
          {fieldDisplay(
            "Illiterate Total",
            village.population_illiterate_population_total,
            Users
          )}

          {/* Connectivity */}
          {fieldDisplay(
            "Public Bus Service",
            village.connectivity_public_bus_service,
            Layers
          )}
          {fieldDisplay(
            "Private Bus Service",
            village.connectivity_private_bus_service,
            Layers
          )}
          {fieldDisplay(
            "Railway Station",
            village.connectivity_railway_station,
            Layers
          )}

          {fieldDisplay("Nearby Villages", village.nearby_villages, MapPin)}
          {fieldDisplay(
            "Coordinates",
            `${village.latitude}, ${village.longitude}`,
            MapPin
          )}

          <div className="col-span-full">
            <GoogleMapSection
              coordinates={{
                lat: parseFloat(village.latitude),
                lon: parseFloat(village.longitude),
              }}
              listing={[village]}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewVillage;
