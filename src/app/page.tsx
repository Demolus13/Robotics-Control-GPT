/** @format */
"use client";

import React, { useState } from "react";
import SidebarRight from "@/components/SidebarRight";
import MainChat from "@/components/MainChat";

export default function Home() {
  const [currentSection, setCurrentSection] = useState("");
  return (
    <div className="flex h-full">
      <div className="flex-1">
        <MainChat currentSection={currentSection} />
      </div>
      <div>
        <SidebarRight setCurrentSection={setCurrentSection} currentSection={currentSection} />
      </div>
    </div>
  );
}
