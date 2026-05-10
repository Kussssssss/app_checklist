import React, { useState, useEffect } from 'react';

export default function App() {
  const checklistItems = [
    { name: 'Quần áo' },
    { name: 'Đầm' },
    { name: 'Giày cao gót' },
    { name: 'Nước uống' },
    { name: 'Snack' },
    { name: 'Dép' },
    { name: 'Giấy thấm dầu' },
    { name: 'Quạt' },
    { name: 'Sạc dự phòng' },
    { name: 'Son môi' },
    { name: 'Khăn giấy' },
    { name: 'Quà cảm ơn' },
    { name: 'Quà cho Thúy' },
    { name: 'Máy ủi hơi nước' },
    { name: 'CCCD / Thẻ sinh viên' },
    { name: 'Ghim kẹp mũ (đen)' },
    { name: 'Gương' },
    { name: 'Lược' },
    { name: 'Nước hoa' },
  ];

  const timeline = [
    { time: '6h30', task: 'Keybox (makeup)', icon: '💄' },
    {
      time: '8h - 10h',
      task: 'Lấy lễ phục màu xanh dương',
      detail: 'Lấy lúc 8h: UEL (căn tin nhỏ) + CCCD/thẻ SV + Số seat Phụ huynh',
      icon: '🎓',
    },
    { time: '9h30 - 10h', task: 'UEL ➜ Thay đồ', icon: '👗' },
    { time: '10h - 11h', task: 'Mời', icon: '💌' },
    { time: '13h30', task: 'Tập trung', icon: '👥' },
    { time: '14h', task: 'Vào lễ', icon: '🎉' },
  ];

  const notes = [
    'Lấy vỏ bằng ở phòng đào tạo',
    'Trả lễ phục trước 17h30',
    'Đi ăn 🍽️',
  ];

  const [checkedItems, setCheckedItems] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('graduationChecklist');
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return [];
  });

  // PWA install prompt
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    localStorage.setItem('graduationChecklist', JSON.stringify(checkedItems));
  }, [checkedItems]);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallBanner(false);
    }
    setDeferredPrompt(null);
  };

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
    <div className="app-wrapper">
      <div className="app-container">
        {/* Header */}
        <div className="card">
          <div className="header-card">
            <div>
              <h1 className="header-title">🎓 Graduation</h1>
              <p className="header-subtitle">Timeline & Checklist</p>
            </div>
            <div className="header-emoji">📋</div>
          </div>
        </div>

        {/* Progress */}
        <section className="card">
          <div className="progress-header">
            <div>
              <p className="progress-label">Tiến độ checklist</p>
              <h2 className="progress-count">
                {completedCount}/{totalCount}
              </h2>
            </div>
            <div>
              <div className="progress-percent">{progress}%</div>
              <p className="progress-status">
                {isCompleted ? 'Đã chuẩn bị xong 🎉' : 'Đang chuẩn bị ✨'}
              </p>
            </div>
          </div>
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        {/* Checklist */}
        <section className="card">
          <div className="section-header">
            <div className="section-badge section-badge--blue">1</div>
            <h2 className="section-title section-title--blue">
              Checklist cần chuẩn bị
            </h2>
          </div>
          <div className="checklist-list">
            {checklistItems.map((item, index) => {
              const checked = checkedItems.includes(item.name);
              return (
                <label
                  key={index}
                  className={`checklist-item ${checked ? 'checklist-item--checked' : ''}`}
                  id={`checklist-item-${index}`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleCheck(item.name)}
                    className="checklist-checkbox"
                  />
                  <span
                    className={`checklist-name ${checked ? 'checklist-name--checked' : ''}`}
                  >
                    {item.name}
                  </span>
                  {checked && <div className="checklist-tick">✓</div>}
                </label>
              );
            })}
          </div>
        </section>

        {/* Timeline */}
        <section className="card">
          <div className="section-header">
            <div className="section-badge section-badge--blue">2</div>
            <h2 className="section-title section-title--blue">
              Lịch trình chi tiết
            </h2>
          </div>
          <div className="timeline-list">
            {timeline.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-content">
                  <div className="timeline-time">{item.time}</div>
                  <div className="timeline-body">
                    <div className="timeline-task-row">
                      <h3 className="timeline-task">{item.task}</h3>
                      <span className="timeline-icon">{item.icon}</span>
                    </div>
                    {item.detail && (
                      <p className="timeline-detail">{item.detail}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Notes */}
        <section className="card">
          <div className="section-header">
            <div className="section-badge section-badge--green">3</div>
            <h2 className="section-title section-title--green">
              Lưu ý sau buổi lễ
            </h2>
          </div>
          <div className="notes-list">
            {notes.map((note, index) => (
              <div key={index} className="note-item">
                <div className="note-dot" />
                <p className="note-text">{note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PWA Install Banner */}
        {showInstallBanner && (
          <button
            className="pwa-install-banner"
            onClick={handleInstallClick}
            id="pwa-install-button"
          >
            <span className="pwa-install-icon">📲</span>
            <div className="pwa-install-text">
              <div className="pwa-install-title">Cài App lên điện thoại</div>
              <div className="pwa-install-subtitle">
                Thêm vào màn hình chính để dùng ngoại tuyến
              </div>
            </div>
            <span className="pwa-install-arrow">→</span>
          </button>
        )}

        {/* Footer */}
        <section className="footer-banner">
          <div>
            <p className="footer-label">Good luck ✨</p>
            <h3 className="footer-title">Graduation Day</h3>
          </div>
          <div className="footer-emoji">🎓</div>
        </section>
      </div>
    </div>
  );
}
