
import React, { useState } from 'react';
import JapanMap from './components/JapanMap';
import InfoPanel from './components/InfoPanel';
import { PrefectureData } from './types';

const App: React.FC = () => {
  const [selectedPrefecture, setSelectedPrefecture] = useState<PrefectureData | null>(null);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-slate-50 font-sans">
      {/* Map Area */}
      <div className="flex-grow relative h-2/3 md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-gray-200">
        <JapanMap onPrefectureClick={setSelectedPrefecture} />
        
        {/* Floating Header */}
        <div className="absolute top-4 left-4 z-[1000] pointer-events-none">
          <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-gray-100 pointer-events-auto">
            <h1 className="text-xl font-black text-gray-800 flex items-center gap-2">
              <span className="text-2xl">🗾</span> 日本観光マップ
            </h1>
            <p className="text-xs text-gray-500 font-medium">都道府県をクリックして詳細を表示</p>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 z-[1000] bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow text-[10px] text-gray-500">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 bg-[#a6ce39] opacity-80 border border-white rounded-sm"></div>
            <span>都道府県エリア</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#c1e16c] border border-white rounded-sm"></div>
            <span>ホバー中</span>
          </div>
        </div>
      </div>

      {/* Info Panel Area */}
      <div className="w-full md:w-[400px] lg:w-[450px] flex-shrink-0 h-1/3 md:h-full z-[1001]">
        <InfoPanel data={selectedPrefecture} />
      </div>
    </div>
  );
};

export default App;
