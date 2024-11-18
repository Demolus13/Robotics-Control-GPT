/** @format */
"use client";

import React from "react";
import SidebarRight from "@/components/SidebarRight";
import MainChat from "@/components/MainChat";

export default function Home() {

  return (
    <div className="flex h-full">
      <div className="flex-1">
        <MainChat />
      </div>
      <div>
        <SidebarRight />
      </div>
    </div>
  );
}
