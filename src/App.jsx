import React, { useState } from 'react';
import {
  Trophy,
  ArrowUp,
  XOctagon,
  Grid,
  Anchor,
  RefreshCw,
  Layers,
  Activity,
  ChevronUp,
  Box,
  Map,
  Info,
  Hammer,
  Move,
  Printer
} from 'lucide-react';

const App = () => {
  // Expanded grid size to allow for adding more tiles
  const ROWS = 8;
  const COLS = 10;

  // Initial State: "The Switchback" irregular shape
  const initialTiles = [
    { x: 1, y: 1 }, { x: 2, y: 1 }, // Start Zone
    { x: 1, y: 2 }, { x: 2, y: 2 },

    { x: 3, y: 2 }, // Narrow Corridor 1
    { x: 4, y: 2 },

    { x: 4, y: 3 }, { x: 5, y: 3 }, // The Arena
    { x: 4, y: 4 }, { x: 5, y: 4 },
    { x: 4, y: 5 }, { x: 5, y: 5 },

    { x: 6, y: 5 }, // Dead End Spur
    { x: 7, y: 5 },
  ];

  // Initial Hazard Data
  const initialHazards = [
    { id: 1, name: "Zig-Zag", icon: Activity, x: 3, y: 2, color: "text-yellow-500", bg: "bg-yellow-100", desc: "Slalom weave. Balloon at end.", height: "Ground", difficulty: "Medium" },
    { id: 2, name: "Tight Corner", icon: XOctagon, x: 4, y: 2, color: "text-red-500", bg: "bg-red-100", desc: "Inside corner turn. Hard to reach without hitting wall.", height: "Ground", difficulty: "Hard" },
    { id: 3, name: "The Cave", icon: Box, x: 4, y: 4, color: "text-slate-700", bg: "bg-slate-300", desc: "Covered tunnel/bridge. Dark and low.", height: "Ground (Inside)", difficulty: "Medium" },
    { id: 4, name: "12in Tower", icon: ArrowUp, x: 5, y: 3, color: "text-purple-600", bg: "bg-purple-100", desc: "High tower. Requires lift or launcher.", height: "12 inches", difficulty: "Very Hard" },
    { id: 5, name: "Moving Spinner", icon: RefreshCw, x: 5, y: 4, color: "text-blue-500", bg: "bg-blue-100", desc: "On a spinning wheel/gear. Moves when touched.", height: "Variable", difficulty: "Hard" },
    { id: 6, name: "Jail Cell", icon: Grid, x: 6, y: 5, color: "text-orange-600", bg: "bg-orange-100", desc: "Behind bars. Requires poker/spear.", height: "Ground", difficulty: "Hard" },
    { id: 7, name: "Dead End", icon: XOctagon, x: 7, y: 5, color: "text-red-700", bg: "bg-red-200", desc: "End of narrow alley. Must reverse out.", height: "Ground", difficulty: "Medium" },
    { id: 8, name: "Suspended Trap", icon: Anchor, x: 5, y: 5, color: "text-pink-500", bg: "bg-pink-100", desc: "Hanging on string. Swings away.", height: "3 inches (Floating)", difficulty: "Extreme" },
    { id: 9, name: "Stacked Duo", icon: Layers, x: 4, y: 3, color: "text-green-600", bg: "bg-green-100", desc: "Two balloons, one on top of other.", height: "3in & 7in", difficulty: "Medium" },
    { id: 10, name: "6in Step", icon: ChevronUp, x: 4, y: 5, color: "text-indigo-500", bg: "bg-indigo-100", desc: "Mid-height platform or atop the cave.", height: "6 inches", difficulty: "Medium" },
  ];

  const [tiles, setTiles] = useState(initialTiles);
  const [hazards, setHazards] = useState(initialHazards);
  const [selectedHazardId, setSelectedHazardId] = useState(null);
  const [editMode, setEditMode] = useState('hazards'); // 'hazards' | 'floor'
  const [activeTab, setActiveTab] = useState('map');

  const selectedHazard = hazards.find(h => h.id === selectedHazardId);

  // Check if a coordinate is a valid floor tile
  const isValidTile = (x, y) => {
    return tiles.some(tile => tile.x === x && tile.y === y);
  };

  const toggleTile = (x, y) => {
    setTiles(prev => {
      const exists = prev.some(t => t.x === x && t.y === y);
      if (exists) {
        return prev.filter(t => t.x !== x || t.y !== y);
      } else {
        return [...prev, { x, y }];
      }
    });
  };

  // Handle interaction with the grid
  const handleGridClick = (x, y) => {
    // Mode 1: Floor Editing
    if (editMode === 'floor') {
      toggleTile(x, y);
      return;
    }

    // Mode 2: Hazard Moving
    const isTile = isValidTile(x, y);
    const hazardHere = hazards.find(h => h.x === x && h.y === y);

    if (selectedHazardId) {
      if (isTile && !hazardHere) {
        setHazards(prev => prev.map(h =>
          h.id === selectedHazardId ? { ...h, x, y } : h
        ));
        setSelectedHazardId(null);
      } else if (hazardHere) {
        setSelectedHazardId(hazardHere.id);
      } else if (!isTile) {
        setSelectedHazardId(null);
      }
    } else {
      if (hazardHere) {
        setSelectedHazardId(hazardHere.id);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 p-4 md:p-8 print:p-0 print:bg-white">

      {/* Header - Hidden on Print */}
      <div className="max-w-6xl mx-auto mb-6 flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200 print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Trophy className="text-yellow-500" />
            VEX IQ Battlebot Arena
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {editMode === 'hazards' ? 'Mode: Hazard Placement' : 'Mode: Floor Layout Editor'}
          </p>
        </div>

        {/* Mode Toggle Switch & Print Button */}
        <div className="mt-4 md:mt-0 flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => { setEditMode('hazards'); setSelectedHazardId(null); }}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-bold transition-all ${
              editMode === 'hazards'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Move size={16} />
            <span className="hidden sm:inline">Move Hazards</span>
          </button>
          <button
            onClick={() => { setEditMode('floor'); setSelectedHazardId(null); }}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-bold transition-all ${
              editMode === 'floor'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Hammer size={16} />
            <span className="hidden sm:inline">Edit Floor</span>
          </button>
          <div className="w-px h-6 bg-slate-300 mx-1"></div>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-bold text-slate-700 hover:bg-white hover:text-green-600 transition-all"
            title="Print Field Layout"
          >
            <Printer size={16} />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Print Only Header */}
      <div className="hidden print:block mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Battlebot Arena Layout</h1>
        <p className="text-slate-500">Hazard & Floor Configuration Plan</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 print:block">

        {/* Left Column: The Interactive Field */}
        <div className="lg:col-span-2 space-y-4 print:w-full">
          <div className={`p-8 rounded-xl shadow-inner border-4 overflow-x-auto transition-colors duration-300 print:shadow-none print:border-2 print:border-slate-800 ${
            editMode === 'floor' ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-200 border-slate-300 print:bg-white'
          }`}>

            {/* Field Grid Visualization */}
            <div
              className="grid gap-1 mx-auto relative select-none print:gap-0"
              style={{
                gridTemplateColumns: `repeat(${COLS}, minmax(3rem, 1fr))`,
                width: 'fit-content'
              }}
            >
              {/* Generate Grid */}
              {Array.from({ length: ROWS }).map((_, y) => (
                Array.from({ length: COLS }).map((_, x) => {
                  const isTile = isValidTile(x, y);
                  const hazardHere = hazards.find(h => h.x === x && h.y === y);
                  const isSelected = hazardHere?.id === selectedHazardId;

                  // Dynamic styles based on mode and state
                  let cellStyle = "bg-transparent"; // Default void
                  let cursorStyle = "cursor-default";

                  if (editMode === 'floor') {
                    cursorStyle = "cursor-pointer hover:bg-indigo-200";
                    if (isTile) cellStyle = "bg-slate-300 border-2 border-slate-400";
                    else cellStyle = "bg-transparent border-2 border-dashed border-indigo-200";
                  } else {
                    // Hazard Mode
                    if (isTile) {
                      cellStyle = "bg-slate-300 border-2 border-slate-400 print:bg-white print:border-slate-800";
                      cursorStyle = selectedHazardId ? "cursor-pointer hover:bg-blue-100" : (hazardHere ? "cursor-pointer" : "cursor-default");
                    }
                  }

                  return (
                    <div
                      key={`${x}-${y}`}
                      onClick={() => handleGridClick(x, y)}
                      className={`
                        w-10 h-10 md:w-14 md:h-14 print:w-16 print:h-16 rounded-sm flex items-center justify-center transition-all duration-200 relative
                        ${cellStyle}
                        ${cursorStyle}
                        ${isSelected && editMode === 'hazards' ? 'ring-2 ring-blue-400 ring-opacity-50 print:ring-0' : ''}
                      `}
                    >
                      {/* Visual indicator for "Void" in Edit Mode */}
                      {editMode === 'floor' && !isTile && (
                         <div className="text-indigo-200 opacity-0 hover:opacity-100 transition-opacity print:hidden">
                           <Hammer size={12} />
                         </div>
                      )}

                      {/* VEX Tile Pattern Effect (Subtle dots) */}
                      {isTile && (
                        <div className="absolute inset-0 opacity-10 flex flex-wrap justify-center items-center gap-1 p-1 pointer-events-none print:opacity-20">
                          <div className="w-1 h-1 bg-black rounded-full"></div>
                          <div className="w-1 h-1 bg-black rounded-full"></div>
                          <div className="w-1 h-1 bg-black rounded-full"></div>
                          <div className="w-1 h-1 bg-black rounded-full"></div>
                        </div>
                      )}

                      {/* Render Hazard Token */}
                      {hazardHere && (
                        <div
                          className={`
                            relative z-10 w-8 h-8 md:w-10 md:h-10 print:w-12 print:h-12 rounded-full shadow-lg flex items-center justify-center transform transition-transform pointer-events-none
                            ${hazardHere.bg} ${hazardHere.color} border-2 border-white print:border-black
                            ${isSelected ? 'scale-110 ring-4 ring-blue-500 print:ring-0' : ''}
                            ${editMode === 'floor' ? 'opacity-50' : 'opacity-100'}
                          `}
                        >
                          <hazardHere.icon size={18} strokeWidth={2.5} className="print:w-6 print:h-6" />
                        </div>
                      )}
                    </div>
                  );
                })
              ))}
            </div>

            {/* Map Legend */}
            <div className="mt-6 flex justify-between items-center text-xs text-slate-500 uppercase tracking-wider font-semibold print:text-black">
               <div className="flex items-center gap-2">
                 <div className="w-4 h-4 bg-slate-300 border-2 border-slate-400 rounded-sm print:bg-white print:border-black"></div>
                 <span>Floor Tile</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-4 h-4 bg-slate-100 rounded-sm border border-slate-200 border-dashed print:hidden"></div>
                 <span className="print:hidden">Void</span>
               </div>
            </div>
          </div>
        </div>

        {/* Right Column: Details Panel */}
        <div className={`lg:col-span-1 print:hidden ${activeTab === 'list' ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 h-full flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50">
              <h2 className="font-bold text-slate-700 flex items-center gap-2">
                <Map size={18} />
                Hazard Details
              </h2>
            </div>
            <div className="p-4 flex-1 overflow-y-auto space-y-4">
              {editMode === 'floor' ? (
                 <div className="p-6 text-center text-slate-500 space-y-2">
                   <Hammer className="mx-auto text-indigo-300 mb-2" size={48} />
                   <h3 className="text-lg font-bold text-slate-700">Floor Editor Active</h3>
                   <p className="text-sm">Click grid cells to add or remove VEX IQ floor tiles.</p>
                 </div>
              ) : selectedHazard ? (
                <div className="animate-fade-in space-y-4">
                  <div className={`p-6 rounded-xl ${selectedHazard.bg} flex flex-col items-center text-center border-2 border-white shadow-sm`}>
                    <selectedHazard.icon size={48} className={`mb-3 ${selectedHazard.color}`} />
                    <h3 className="text-xl font-bold text-slate-800">{selectedHazard.name}</h3>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 space-y-3">
                    <p className="text-slate-700 font-medium leading-tight text-sm">{selectedHazard.desc}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-white p-2 rounded shadow-sm border border-slate-100">
                         <span className="text-xs font-semibold text-slate-400 uppercase">Height</span>
                         <p className="text-slate-800 font-bold">{selectedHazard.height}</p>
                      </div>
                      <div className="bg-white p-2 rounded shadow-sm border border-slate-100">
                         <span className="text-xs font-semibold text-slate-400 uppercase">Difficulty</span>
                         <p className="text-orange-600 font-bold">{selectedHazard.difficulty}</p>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setSelectedHazardId(null)} className="w-full py-2 text-sm text-slate-500 font-medium">Deselect</button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-slate-400 text-sm text-center mb-4 italic">Select a hazard on the map</p>
                  {hazards.map(h => (
                    <button key={h.id} onClick={() => setSelectedHazardId(h.id)} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors text-left group">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${h.bg} ${h.color} group-hover:scale-110 transition-transform`}>
                        <h.icon size={16} />
                      </div>
                      <div>
                        <div className="font-bold text-slate-700 text-sm">{h.name}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Print Only Hazard List (Table format) */}
        <div className="hidden print:block print:w-full print:mt-6">
           <h3 className="text-xl font-bold mb-4 border-b border-slate-300 pb-2">Hazard Manifest</h3>
           <div className="grid grid-cols-2 gap-4">
              {hazards.map(h => (
                 <div key={h.id} className="flex items-start gap-4 p-4 border border-slate-200 rounded-lg break-inside-avoid">
                    <div className={`p-2 rounded-full border border-slate-300 ${h.bg} ${h.color}`}>
                       <h.icon size={24} />
                    </div>
                    <div>
                       <h4 className="font-bold text-lg">{h.name}</h4>
                       <p className="text-sm text-slate-600 mb-1">{h.desc}</p>
                       <div className="flex gap-4 text-sm font-semibold text-slate-800">
                          <span>Height: {h.height}</span>
                          <span>Diff: {h.difficulty}</span>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
};

export default App;
