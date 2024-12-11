import React from "react";

export default function Footer() {
  return (
    <div className="absolute bottom-0 w-full h-8 flex flex-row items-center justify-center bg-white -ml-14">
      <p className="text-center text-sm text-gray-400">
        made by
        <a
          href="https://github.com/Blondie-TheManWithNoName"
          target="_blank"
          rel="noreferrer"
          className="text-violet-800 hover:text-violet-800/40 font-normal text-sm ml-1"
        >
          Noah Guardiola
        </a>
      </p>
    </div>
  );
}
