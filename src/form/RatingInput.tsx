interface RatingInputProps {
  value: number | "";
  onChange: (value: number | "") => void;
}

export const RatingInput = ({ value, onChange }: RatingInputProps) => (
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-[#2C275F]">
      Your Rating
    </label>
    <input
      type="number"
      step="0.1"
      min={0}
      max={10}
      placeholder="0 - 10"
      value={value}
      onChange={(e) =>
        onChange(e.target.value === "" ? "" : parseFloat(e.target.value))
      }
      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2C275F] focus:border-[#2C275F] outline-none text-gray-900 placeholder-gray-400 hover:border-gray-400"
    />
  </div>
);
