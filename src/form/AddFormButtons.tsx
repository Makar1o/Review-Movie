interface AddFormButtonsProps {
  onAdd: () => void;
  onClear: () => void;
}

export const AddFormButtons = ({ onAdd, onClear }: AddFormButtonsProps) => (
  <div className="flex flex-col sm:flex-row gap-4 pt-6">
    <button
      type="button"
      onClick={onAdd}
      className="flex-1 bg-[#2C275F] hover:bg-[#2C275F]-hover text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
    >
      Add Movie
    </button>
    <button
      type="button"
      onClick={onClear}
      className="px-8 py-4 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
    >
      Clear Form
    </button>
  </div>
);
