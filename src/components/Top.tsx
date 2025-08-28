import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { userPoints } from "../data/mockData";
import logo from "../assets/logo.png";
import heroVideo from "../assets/hero.mp4"; // 背景動画
import userIcon from "../assets/user.png";
import paypayIcon from "../assets/paypay.png";
import tcardIcon from "../assets/tcard.png";
import dpointIcon from "../assets/dpoint.png";
import lineIcon from "../assets/line.png";
import xIcon from "../assets/x.png";

type Props = {
  onNavigate: (screen: "top" | "history" | "flow") => void;
};

const Top: React.FC<Props> = ({ onNavigate }) => {
  const [balance, setBalance] = useState(userPoints.balance);
  const [modal, setModal] = useState<{ open: boolean; service: string }>({
    open: false,
    service: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setBalance(userPoints.balance);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const icons = [
    { src: paypayIcon, alt: "PayPay", url: "https://www.paypay.ne.jp/" },
    { src: tcardIcon, alt: "Tカード", url: "https://www.tsite.jp/guide/card/" },
    { src: dpointIcon, alt: "dポイント", url: "https://dpoint.jp/" },
    { src: lineIcon, alt: "LINE", url: "#" },
    { src: xIcon, alt: "X", url: "#" },
  ];

  const handleModal = (service: string) => {
    setModal({ open: true, service });
  };

  const closeModal = () => setModal({ open: false, service: "" });

  return (
    <div className="w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden border border-gray-200 relative min-h-[650px]">
      {/* 背景動画 */}
      <video
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* コンテンツ */}
      <div className="relative z-10 flex flex-col gap-6 p-6">
        {/* ヘッダー */}
        <div className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-md rounded-xl">
          <div className="flex items-center gap-4">
            <img src={logo} alt="logo" className="w-16 h-16 rounded-md shadow" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">ポイ活アプリ</h1>
              <p className="text-sm text-gray-500 italic">
                たのしく、たのしく、たのしいを、プロジェクトに。
              </p>
            </div>
          </div>
          <img
            src={userIcon}
            alt="user"
            className="w-12 h-12 rounded-full border-2 border-yellow-500 shadow"
          />
        </div>

        {/* ポイント残高＆操作 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 bg-white/50 backdrop-blur-md rounded-xl">
          <div>
            <div className="text-sm text-gray-500">ポイント残高</div>
            <motion.div
              className="text-4xl font-bold text-yellow-600"
              key={balance}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {balance.toLocaleString()} P
            </motion.div>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button
              className="px-5 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg shadow-lg hover:from-gray-700 hover:to-gray-800 transition"
              onClick={() => onNavigate("history")}
            >
              履歴を見る
            </button>
            <button
              className="px-5 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg shadow-lg hover:from-yellow-400 hover:to-yellow-500 transition"
              onClick={() => onNavigate("flow")}
            >
              ポイント交換
            </button>
          </div>
        </div>

        {/* 外部連携アイコン */}
        <div className="flex items-center gap-4 mt-4 flex-wrap">
          {icons.map((icon) => (
            <div
              key={icon.alt}
              className="bg-white/50 backdrop-blur-md rounded-full p-1 shadow-lg"
            >
              <motion.img
                src={icon.src}
                alt={icon.alt}
                title={icon.alt}
                className="w-12 h-12 cursor-pointer rounded-full"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  icon.url === "#"
                    ? handleModal(icon.alt)
                    : window.open(icon.url, "_blank")
                }
              />
            </div>
          ))}
        </div>

        <div className="text-xs text-gray-500 mt-2">
          ※これらのリンクはデモです。実際のポイント連携には対応していません。
        </div>

        <div className="flex items-center gap-3 mt-4 flex-wrap">
          <a
            href="https://www.kadobeya.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg shadow hover:bg-gray-800 transition font-semibold"
          >
            株式会社カドベヤ
          </a>
          <a
            href="#"
            className="text-sm text-gray-500 underline hover:text-gray-700 transition"
            onClick={(e) => {
              e.preventDefault();
              alert("デモリンク(本番では外部リンクにします)");
            }}
          >
            デモ説明を見る
          </a>
        </div>
      </div>

      {/* モーダル */}
      {modal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80 shadow-lg relative">
            <h3 className="text-xl font-bold mb-4">{modal.service}連携</h3>
            <p className="mb-4">
              {modal.service}に接続しますか？（デモ演出です）
            </p>
            <button
              className="px-5 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-700 transition mr-2"
              onClick={closeModal}
            >
              キャンセル
            </button>
            <button
              className="px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
              onClick={() => {
                alert(`${modal.service}連携完了！（デモ）`);
                closeModal();
              }}
            >
              接続
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Top;
