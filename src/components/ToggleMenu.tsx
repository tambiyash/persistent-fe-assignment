import React from 'react';

export type ToggleViewMode = 'grid' | 'table';

interface ToggleMenuProps {
  viewMode: ToggleViewMode;
  onToggle: (mode: ToggleViewMode) => void;
}

const ToggleMenu: React.FC<ToggleMenuProps> = ({ viewMode, onToggle }) => {
  const handleClick = (mode: ToggleViewMode) => {
    if (mode !== viewMode) {
      onToggle(mode);
    }
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => handleClick('grid')}
        className={`px-4 py-2 rounded transition-colors ${
          viewMode === 'grid' ? 'bg-yellow-400 text-gray-900' : 'bg-gray-200 text-gray-700'
        }`}
      >
        Grid
      </button>
      <button
        onClick={() => handleClick('table')}
        className={`px-4 py-2 rounded transition-colors ${
          viewMode === 'table' ? 'bg-yellow-400 text-gray-900' : 'bg-gray-200 text-gray-700'
        }`}
      >
        Table
      </button>
    </div>
  );
};

export default ToggleMenu; 