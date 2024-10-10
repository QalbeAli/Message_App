"use client";
// components/ParameterPicker.tsx
import { useState } from "react";
import Switch from "../CaptionVideoPageComponents/Switch";
import SelectComponent from "../AudioToVideoPageComponents/SelectComponent";

const TiktokParameterPicker = () => {

  const [selectedOption, setSelectedOption] = useState<string>("");

  console.log(selectedOption);
  

  const options = [
    { value: "option1", label: "Moving AI Image" },
    { value: "option2", label: "Stock Videos" },
    { value: "option3", label: "AI Video" },
  ];
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="p-6 w-full text-white mx-auto  shadow-md rounded-md">
      {/* Add Footage Toggle */}
      <div className="mb-4 flex   w-full  items-center">
        <Switch />
        <div className="text-gray-100 pl-4">
          <div className="font-bold text-lg">
            Add video footage to illustrate the content
          </div>
          <div>
            Our system will search for relevant video footage to illustrate the
            content
          </div>
        </div>
      </div>
      <div className="my-10 flex ">
        <div className="flex flex-col md:flex-row">
          <div>
            <SelectComponent options={options} onChange={handleSelectChange} />
          </div>
          <div className="text-gray-100 pl-4">
            <div className="font-bold text-lg">Choose your screen ratio</div>
            <div>
              Our AI will adapt the footage to your desired screen ratio
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4 flex   w-full  items-center">
        <Switch />
        <div className="text-gray-100 pl-4">
          <div className="font-bold text-lg">
            Use best-in-class AI generation model
          </div>
          <div>Each generated will cost 0.4 credit instead of 0.1 credit</div>
        </div>
      </div>
    </div>
  );
};

export default TiktokParameterPicker;
