import React, { useState } from "react";
import { historyData, userPoints } from "../data/mockData";
import historyIcon from "../assets/history.png";
import lineIcon from "../assets/line.png"; // LINEロゴ
import xIcon from "../assets/x.png";       // Xロゴ
import { motion } from "framer-motion";

type Props = {
  onNavigate: (screen: "top" | "history" | "flow") => void;
};

const History: React.FC<Props> = ({ onNavigate }) => {
  const [, update] = useState(0);

  const handleDelete = (id: number) => {
    const index = historyData.findIndex((h) => h.id === id);
    if (index !== -1) {
      const item = historyData[index];
      if (item.points < 0) userPoints.balance -= item.points;
      historyData.splice(index, 1);
      update((v) => v + 1);
    }
  };

  // 外部連動アイコン（LINE, X）
  const socialIcons = [
    { src: lineIcon, alt: "LINE", url: "https://line.me" },
    { src: xIcon, alt: "X", url: "https://twitter.com" },
  ];

  return (
    <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
      {/* ヘッダー */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={historyIcon}
          alt="history"
          className="w-12 h-12 p-2 bg-yellow-100 rounded-full shadow"
        />
        <h2 className="text-2xl font-bold text-gray-800">ポイント履歴</h2>
      </div>

      {/* 履歴テーブル */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-sm text-gray-500 border-b">
              <th className="py-2">日付</th>
              <th className="py-2">タイプ</th>
              <th className="py-2">ポイント</th>
              <th className="py-2">備考</th>
              <th className="py-2">操作</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((h) => (
              <motion.tr
                key={h.id}
                className="border-b last:border-b-0 hover:bg-gray-50 transition"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
              >
                <td className="py-3">{h.date}</td>
                <td className="py-3">{h.type}</td>
                <td
                  className={`py-3 font-mono ${
                    h.points > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {h.points > 0 ? `+${h.points}` : h.points}
                </td>
                <td className="py-3 text-sm text-gray-600">{h.note ?? "-"}</td>
                <td className="py-3">
                  <button
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
                    onClick={() => handleDelete(h.id)}
                  >
                    削除
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 外部連動アイコン */}
      <div className="flex items-center gap-4 mt-6">
        {socialIcons.map((icon) => (
          <motion.img
            key={icon.alt}
            src={icon.src}
            alt={icon.alt}
            title={icon.alt}
            className="w-12 h-12 cursor-pointer rounded-full shadow-lg"
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open(icon.url, "_blank")}
          />
        ))}
      </div>
      <div className="text-xs text-gray-500 mt-2">
        ※外部連動アイコンはデモです。実際の連携には対応していません。
      </div>

      {/* ナビボタン */}
      <div className="mt-8 flex justify-between">
        <button
          className="px-5 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg shadow-lg hover:from-gray-700 hover:to-gray-800 transition"
          onClick={() => onNavigate("top")}
        >
          トップに戻る
        </button>
        <button
          className="px-5 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg shadow-lg hover:from-yellow-400 hover:to-yellow-500 transition"
          onClick={() => onNavigate("flow")}
        >
          もう一度交換する
        </button>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        ※履歴の削除はデモ用です。実際の残高には影響しません。
      </div>
    </div>
  );
};

export default History;
