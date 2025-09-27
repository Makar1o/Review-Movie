interface ReviewInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const ReviewInput = ({ value, onChange }: ReviewInputProps) => (
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-[#2C275F]">Review</label>
    <textarea
      rows={4}
      placeholder="Write a short review..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2C275F] focus:border-[#2C275F] outline-none text-gray-900 placeholder-gray-400 resize-none hover:border-gray-400"
    />
  </div>
);
