"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/slider";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

interface SliderType {
  id: number;
  label: string;
  value: number;
  color: string;
}

export default function NeedSlidersLite() {
  const [sliders, setSliders] = useState<SliderType[]>([]);

  useEffect(() => {
    const defaultSliders: SliderType[] = [
      { id: 1, label: "sleep", value: 3, color: "#cc00cc" }, // fuchsia
      { id: 2, label: "exercise", value: 2, color: "#00cccc" }, // cyan
      { id: 3, label: "nutrition", value: 4, color: "#6B00a2" }, // indigo
      { id: 4, label: "social", value: 3, color: "#DE3163" }, // cerise
      { id: 5, label: "[tap to edit]", value: 0, color: "#cccccc" }, // cerise
    ];

    const storedSliders = localStorage.getItem("sliders");
    if (storedSliders) {
      setSliders(JSON.parse(storedSliders));
    } else {
      setSliders(defaultSliders);
    }
  }, []);

  const handleSliderChange = (id: number, newValue: number) => {
    const updatedSliders = sliders.map((slider) =>
      slider.id === id ? { ...slider, value: newValue } : slider
    );
    setSliders(updatedSliders);
    localStorage.setItem("sliders", JSON.stringify(updatedSliders));
  };

  const handleLabelChange = (id: number, newLabel: string) => {
    const updatedSliders = sliders.map((slider) =>
      slider.id === id ? { ...slider, label: newLabel } : slider
    );
    setSliders(updatedSliders);
    localStorage.setItem("sliders", JSON.stringify(updatedSliders));
  };

  const handleColorChange = (id: number, newColor: string) => {
    const updatedSliders = sliders.map((slider) =>
      slider.id === id ? { ...slider, color: newColor } : slider
    );
    setSliders(updatedSliders);
    localStorage.setItem("sliders", JSON.stringify(updatedSliders));
  };

  const deleteSlider = (id: number) => {
    const updatedSliders = sliders.filter((slider) => slider.id !== id);
    setSliders(updatedSliders);
    localStorage.setItem("sliders", JSON.stringify(updatedSliders));
  };

  const addSlider = () => {
    if (sliders.length < 16) {
      const newId = Math.max(...sliders.map((s) => s.id)) + 1;
      const updatedSliders = [
        ...sliders,
        {
          id: newId,
          label: `[need ${newId}]`,
          value: 3,
          color: getRandomHexColor(),
        },
      ];
      setSliders(updatedSliders);
      localStorage.setItem("sliders", JSON.stringify(updatedSliders));
    }
  };

  const getRandomHexColor = (
    rMin = 0,
    rMax = 255,
    gMin = 0,
    gMax = 255,
    bMin = 0,
    bMax = 255
  ) => {
    // helper function to get a random number between min and max
    const randomChannel = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    // get random values for each color channel
    const r = randomChannel(rMin, rMax);
    const g = randomChannel(gMin, gMax);
    const b = randomChannel(bMin, bMax);

    // convert to hex and return the color
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  return (
    <div className="min-h-screen bg-black text-cyan-200 p-6 flex flex-col items-center">
      <div className="flex justify-between items-center mb-2">
        <h4
          className="flex-grow mr-2 mb-4 font-mono font-bold"
          style={{ textShadow: `1 1 2px dkgray` }}
        >
          <a
            href="https://need-meter.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-fuchsia-600">need-meter</span>.
            <span className="text-cyan-500">netlify</span>.
            <span className="text-indigo-600">app</span>
          </a>
        </h4>
        <div className="flex font-mono pl-4 mb-4">
          <Image
            src="/github-mark-white.svg"
            alt="GitHub"
            width={18}
            height={18}
            onClick={() =>
              window.open("https://github.com/JacKaL37/need-meter", "_blank")
            }
            className="cursor-pointer opacity-60"
          />
        </div>
      </div>
      <div className="w-full max-w-sm space-y-6 mb-8">
        {sliders.map((slider) => (
          <div
            key={slider.id}
            className="transition-opacity duration-500 ease-in-out opacity-0 animate-fadeIn"
          >
            <Slider
              {...slider}
              onChange={(newValue) => handleSliderChange(slider.id, newValue)}
              onLabelChange={(newLabel) =>
                handleLabelChange(slider.id, newLabel)
              }
              onColorChange={(newColor) =>
                handleColorChange(slider.id, newColor)
              }
              onDelete={() => deleteSlider(slider.id)}
            />
          </div>
        ))}
      </div>
      {sliders.length < 16 && (
        <button
          onClick={addSlider}
          className="mt-4 text-cyan-300 opacity-50 hover:opacity-100 transition-opacity duration-300 ease-in-out"
          aria-label="Add new slider"
        >
          <PlusCircle size={40} />
        </button>
      )}
    </div>
  );
}
