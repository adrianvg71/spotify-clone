"use client"

import * as RadixSlider from "@radix-ui/react-slider"

interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({
  value = 1,
  onChange
}) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  }

  return ( 
    <RadixSlider.Root
    className="relative flex items-center select-none cursor-pointer touch-none w-full h-10 group"
    defaultValue={[1]}
    value={[value]}
    onValueChange={handleChange}
    max={1}
    step={0.01}
    aria-label="Volumen">
      <RadixSlider.Track
        className="bg-neutral-600 relative grow rounded-full h-[3px]"
      >
        <RadixSlider.Range className="absolute bg-white rounded-full h-full group-hover:bg-green-500 transition"/>
      </RadixSlider.Track>
      <RadixSlider.Thumb aria-label="Volumen" className="hidden group-hover:block w-[13px] h-[13px] bg-white shadow-[0_2px_10px] shadow-black rounded-full hover:bg-neutral-300"/>
    </RadixSlider.Root>
   );
}
 
export default Slider;