import React, { useState, useEffect } from "react";

export default function GraduationChecklistApp() {
  const checklistItems = [
    { name: "Quần áo" },
    { name: "Đầm" },
    { name: "Giày cao gót" },
    { name: "Nước uống" },
    { name: "Snack" },
    { name: "Dép" },
    { name: "Giấy thấm dầu" },
    { name: "Quạt" },
    { name: "Sạc dự phòng" },
    { name: "Son môi" },
    { name: "Khăn giấy" },
    { name: "Quà cảm ơn" },
    { name: "Quà cho Thúy" },
    { name: "Máy ủi hơi nước" },
    { name: "CCCD / Thẻ sinh viên" },
    { name: "Ghim kẹp mũ (đen)" },
    { name: "Gương" },
    { name: "Lược" },
  ];

  const timeline = [
    { time: "6h30", task: "Keybox (makeup)", icon: "💄" },
    {
      time: "8h - 10h",
      task: "Lấy lễ phục màu xanh dương",
      detail: "Lấy lúc 8h: UEL (căn tin nhỏ) + CCCD/thẻ SV + Số seat Phụ huynh",
      icon: "🎓",
    },
    { time: "9h30 - 10h", task: "UEL ➜ Thay đồ", icon: "👗" },
    { time: "10h - 11h", task: "Mời", icon: "💌" },
    { time: "13h30", task: "Tập trung", icon: "👥" },
    { time: "14h", task: "Vào lễ", icon: "🎉" },
  ];

  const notes = [
    "Lấy vỏ bằng ở phòng đào tạo",
    "Trả lễ phục trước 17h30",
    "Đi ăn 🍽️",
  ];

  const [checkedItems, setCheckedItems] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("graduationChecklist");
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("graduationChecklist", JSON.stringify(checkedItems));
  }, [checkedItems]);

  const toggleCheck = (itemName) => {
    setCheckedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((item) => item !== itemName)
        : [...prev, itemName]
    );
  };

  const completedCount = checkedItems.length;
  const totalCount = checklistItems.length;
  const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
  const isCompleted = progress === 100;

  return (
    <div className="min-h-screen bg-[#f7f5f2] text-slate-800 flex justify-center p-4">
      <div className="w-full max-w-md space-y-5 pb-10">
        <div className="bg-white rounded-3xl shadow-md p-5 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-blue-900">
                🎓 Graduation
              </h1>
              <p className="text-sm text-slate-500 mt-1">Timeline & Checklist</p>
            </div>
            <div className="text-5xl">📋</div>
          </div>
        </div>

        <section className="bg-white rounded-3xl shadow-md p-5 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-slate-500">Tiến độ checklist</p>
              <h2 className="text-2xl font-bold text-slate-800 mt-1">
                {completedCount}/{totalCount}
              </h2>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-700">{progress}%</div>
              <p className="text-xs text-slate-500 mt-1">
                {isCompleted ? "Đã chuẩn bị xong 🎉" : "Đang chuẩn bị ✨"}
              </p>
            </div>
          </div>
          <div className="w-full h-4 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        <section className="bg-white rounded-3xl shadow-md p-5 border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
              1
            </div>
            <h2 className="text-xl font-bold text-blue-900">Checklist cần chuẩn bị</h2>
          </div>
          <div className="space-y-3">
            {checklistItems.map((item, index) => {
              const checked = checkedItems.includes(item.name);
              return (
                <label
                  key={index}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 border transition active:scale-[0.99] cursor-pointer ${
                    checked ? "bg-blue-50 border-blue-200" : "bg-slate-50 border-slate-100"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleCheck(item.name)}
                    className="w-5 h-5 accent-blue-600 rounded"
                  />
                  <span
                    className={`text-[15px] font-medium flex-1 ${
                      checked ? "line-through text-slate-400" : ""
                    }`}
                  >
                    {item.name}
                  </span>
                  {checked && <div className="text-green-600 text-lg font-bold">✓</div>}
                </label>
              );
            })}
          </div>
        </section>

        <section className="bg-white rounded-3xl shadow-md p-5 border border-slate-200">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
              2
            </div>
            <h2 className="text-xl font-bold text-blue-900">Lịch trình chi tiết</h2>
          </div>
          <div className="space-y-4">
            {timeline.map((item, index) => (
              <div key={index} className="rounded-2xl border border-blue-100 bg-blue-50/40 p-4">
                <div className="flex items-start gap-4">
                  <div className="min-w-[74px] rounded-xl bg-blue-700 text-white text-sm font-semibold px-3 py-2 text-center shadow-sm">
                    {item.time}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-slate-800 leading-snug">{item.task}</h3>
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    {item.detail && (
                      <p className="text-sm text-slate-600 mt-2 leading-relaxed">{item.detail}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-3xl shadow-md p-5 border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
              3
            </div>
            <h2 className="text-xl font-bold text-green-800">Lưu ý sau buổi lễ</h2>
          </div>
          <div className="space-y-3">
            {notes.map((note, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-2xl bg-green-50 border border-green-100 px-4 py-3"
              >
                <div className="w-2 h-2 rounded-full bg-green-600"></div>
                <p className="text-sm font-medium leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-3xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Good luck ✨</p>
              <h3 className="text-2xl font-bold mt-1">Graduation Day</h3>
            </div>
            <div className="text-5xl">🎓</div>
          </div>
        </section>
      </div>
    </div>
  );
}