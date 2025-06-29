"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { useState } from "react";
import VillageMapView from "./_components/ListingMapView";

export default function Home() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  return (
    <div className="px-10 py-5">
      <VillageMapView />
    </div>
  );
}
