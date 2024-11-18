/** @format */
"use client";

import Link from "next/link";
import React, { useState } from "react";
import { BsArchiveFill } from "react-icons/bs";
import { FaEdit, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import { TbMinusVertical } from "react-icons/tb";
import { cn } from "@/utils/cn";
import { usePathname } from "next/navigation";

type Props = {};

type Timeline = {
  label: string;
  timelines: {
    title: string;
    href: string;
  }[];
};

const timelineData: Timeline[] = [
  {
    label: "Open Manipulator X",
    timelines: [
      {
        href: "llm-pick-and-place",
        title: "LLM Pick and Place",
      },
    ],
  },
];

export default function SidebarRight({}: Props) {
  const [isSidebar, setSidebar] = useState(true);

  function toggleSidebar() {
    setSidebar(!isSidebar);
  }

  return (
    <div
      className={cn("min-h-screen relative transition-all z-50", {
        "translate-x-full": !isSidebar,
        "w-full min-w-[250px] max-w-[300px]": isSidebar,
      })}
    >
      {isSidebar && (
        <div className="min-h-screen w-full pl-4 pr-6 pt-20 dark:bg-[#0D0D0D]">
          {/* Fill this section */}
        </div>
      )}
      <div className="absolute inset-y-0 left-[-30px] flex items-center justify-center w-[30px]">
        <button
          onClick={toggleSidebar}
          className="h-[100px] group text-gray-500 hover:text-white w-full flex items-center justify-center transition-all"
        >
          <FaChevronRight className="hidden group-hover:flex text-xl delay-500 duration-500 ease-in-out transition-all" />
          <TbMinusVertical className="text-3xl group-hover:hidden delay-500 duration-500 ease-in-out transition-all" />
        </button>
      </div>
    </div>
  );
}

function Timeline(props: Timeline) {
  const pathName = usePathname();

  return (
    <div className="w-full flex flex-col">
      <p className="text-sm text-gray-500 font-bold p-2">{props.label}</p>
      {props.timelines.map((d, i) => (
        <Link
          key={i}
          className={cn(
            "p-2 group ease-in-out duration-300 hover:bg-slate-800 rounded-lg transition-all items-center text-sm w-full flex justify-between",
            { "bg-slate-800": `/${d.href}` === pathName }
          )}
          href={d.href}
        >
          <div className="text-ellipsis overflow-hidden w-[80%] whitespace-nowrap">
            {d.title}
          </div>
          <div className="transition-all items-center gap-2 hidden group-hover:flex ease-in-out duration-300">
            <BsThreeDots />
            <BsArchiveFill />
          </div>
        </Link>
      ))}
    </div>
  );
}