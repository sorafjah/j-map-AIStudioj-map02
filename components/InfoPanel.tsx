
import React from 'react';
import { PrefectureData } from '../types';

interface InfoPanelProps {
  data: PrefectureData | null;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white shadow-xl">
        <div className="text-6xl mb-4">🗾</div>
        <h2 className="text-xl font-bold text-gray-800">都道府県を選択してください</h2>
        <p className="text-gray-500 mt-2">地図上の都道府県をクリックすると、<br/>観光情報が表示されます。</p>
      </div>
    );
  }

  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(data.name + ' 観光')}`;
  const googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(data.name)}`;

  return (
    <div className="flex flex-col h-full bg-white shadow-xl overflow-y-auto">
      <div className="p-6 bg-[#a6ce39] text-white">
        <h2 className="text-3xl font-black">{data.name}</h2>
        <p className="opacity-90">観光ガイド</p>
      </div>

      <div className="p-6 space-y-8 flex-grow">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="p-2 bg-orange-100 rounded-lg text-orange-600">🏛️</span>
            <h3 className="text-lg font-bold text-gray-800">おすすめの名所</h3>
          </div>
          <ul className="space-y-3">
            {data.spots.map((spot, i) => (
              <li key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <span className="text-gray-400 font-mono text-sm mt-0.5">{i + 1}.</span>
                <span className="text-gray-700 font-medium">{spot}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="p-2 bg-red-100 rounded-lg text-red-600">🍱</span>
            <h3 className="text-lg font-bold text-gray-800">おすすめグルメ</h3>
          </div>
          <ul className="space-y-3">
            {data.foods.map((food, i) => (
              <li key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <span className="text-gray-400 font-mono text-sm mt-0.5">{i + 1}.</span>
                <span className="text-gray-700 font-medium">{food}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="p-6 bg-gray-50 border-t space-y-3 sticky bottom-0">
        <a
          href={googleSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-sm"
        >
          <span>🔍</span> Googleで観光情報を検索
        </a>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-md"
        >
          <span>📍</span> Googleマップで場所を確認
        </a>
      </div>
    </div>
  );
};

export default InfoPanel;
