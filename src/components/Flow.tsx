import React, { useState } from "react";
import exchangeIcon from "../assets/exchange.png";
import {
  userPoints,
  historyData,
  initialUserPoints,
  initialHistoryData,
} from "../data/mockData";
import lineIcon from "../assets/line.png";
import xIcon from "../assets/x.png";

type Props = {
  onNavigate: (screen: "top" | "history" | "flow") => void;
};

const Flow: React.FC<Props> = ({ onNavigate }) => {
  const [amount, setAmount] = useState<number | "">("");
  const [message, setMessage] = useState<string>("");
  const [modal, setModal] = useState<{open: boolean; service: string}>({open: false, service: ""});

  const handleSubmit = () => {
    if (!amount || amount === 0) {
      setMessage("交換するポイント数を入力してください");
      return;
    }
    if (amount > userPoints.balance) {
      setMessage("残高が足りません");
      return;
    }

    userPoints.balance -= amount;

    historyData.unshift({
      id: historyData.length + 1,
      date: new Date().toISOString().slice(0, 10),
      type: "利用",
      points: -amount,
      note: "ポイント交換（デモ）",
    });

    setMessage(`ポイント交換 ${amount} P を申請しました（デモ）`);
    setAmount("");
  };

  const handleReset = () => {
    setAmount("");
    setMessage("");
  };

  const handleFullReset = () => {
    userPoints.balance = initialUserPoints.balance;
    historyData.length = 0;
    initialHistoryData.forEach((item) => historyData.push({ ...item }));
    setMessage("残高と履歴を初期状態にリセットしました");
  };

  const handleModal = (service: string) => {
    setModal({ open: true, service });
  };

  const closeModal = () => setModal({ open: false, service: "" });

  return (
    <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 border border-gray-200 relative">
      <div className="flex items-center gap-4 mb-6">
        <img src={exchangeIcon} alt="exchange" className="w-12 h-12 p-2 bg-yellow-100 rounded-full shadow" />
        <h2 className="text-2xl font-bold text-gray-800">ポイント交換</h2>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm text-gray-600 mb-1">交換ポイント数</label>
          <input
            type="number"
            min={0}
            value={amount as any}
            onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
            className="w-48 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            placeholder="例: 100"
          />
        </div>

        <div className="flex gap-4">
          <button
            className="px-5 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg shadow-lg hover:from-yellow-400 hover:to-yellow-500 transition"
            onClick={handleSubmit}
          >
            交換申請
          </button>
          <button
            className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition"
            onClick={handleReset}
          >
            リセット
          </button>
        </div>

        {message && <div className="text-blue-700 font-medium">{message}</div>}

        {/* LINE/X連携 */}
        <div className="flex items-center gap-4 mt-4">
          {[{src: lineIcon, alt: "LINE"}, {src: xIcon, alt: "X"}].map((icon) => (
            <img
              key={icon.alt}
              src={icon.src}
              alt={icon.alt}
              title={icon.alt}
              className="w-12 h-12 cursor-pointer rounded-full shadow-lg hover:scale-110 transition-transform"
              onClick={() => handleModal(icon.alt)}
            />
          ))}
        </div>

        <div className="text-xs text-gray-500 mt-2">
          ※LINE/X連携はデモ演出です。
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          className="px-5 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg shadow-lg hover:from-gray-700 hover:to-gray-800 transition"
          onClick={() => onNavigate("top")}
        >
          トップに戻る
        </button>
        <button
          className="px-5 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
          onClick={handleFullReset}
        >
          残高・履歴リセット
        </button>
      </div>

      {/* モーダル */}
      {modal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80 shadow-lg relative">
            <h3 className="text-xl font-bold mb-4">{modal.service}連携</h3>
            <p className="mb-4">{modal.service}に接続しますか？（デモ演出です）</p>
            <button
              className="px-5 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-700 transition mr-2"
              onClick={closeModal}
            >
              キャンセル
            </button>
            <button
              className="px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
              onClick={() => { alert(`${modal.service}連携完了！（デモ）`); closeModal(); }}
            >
              接続
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flow;
