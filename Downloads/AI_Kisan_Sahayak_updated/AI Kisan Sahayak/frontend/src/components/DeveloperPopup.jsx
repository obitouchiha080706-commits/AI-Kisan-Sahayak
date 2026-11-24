
import "./DeveloperPopup.css";

export default function DeveloperPopup() {
  const closePopup = () => {
    document.body.classList.remove("developer-popup-open");
    document.getElementById("developer-popup")?.classList.add("closing");

    setTimeout(() => {
      const popup = document.getElementById("developer-popup");
      if (popup) popup.style.display = "none";
    }, 250);
  };

  return (
    <div
      className="developer-overlay"
      id="developer-popup"
      onClick={(e) => {
        if (e.target.id === "developer-popup") closePopup();
      }}
    >
      <div className="developer-card">
        <button
          className="developer-close"
          onClick={closePopup}
          aria-label="Close developer profile"
        >
          ×
        </button>

        <div className="developer-top">
          <span className="developer-label">DEVELOPER PROFILE</span>

          <div className="developer-avatar">RP</div>

          <h2>RISHABH PANDEY</h2>
          <p>Full Stack Developer</p>
        </div>

        <div className="developer-content">
          <div className="developer-item">
            <span className="developer-icon">✦</span>
            <div>
              <h3>Skills</h3>
              <p>HTML, CSS, JavaScript And Much More...</p>
            </div>
          </div>

          <div className="developer-item">
            <span className="developer-icon">⌘</span>
            <div>
              <h3>Frontend</h3>
              <p>HTML, CSS & JavaScript</p>
            </div>
          </div>

          <div className="developer-item">
            <span className="developer-icon">⚙</span>
            <div>
              <h3>Backend</h3>
              <p>Auth + REST API</p>
            </div>
          </div>

          <div className="developer-item">
            <span className="developer-icon">▤</span>
            <div>
              <h3>Database</h3>
              <p>PostgreSQL</p>
            </div>
          </div>
        </div>

        <div className="developer-footer">
          <span>CRAFTED WITH PASSION</span>
          <span>AI KISAN SAHAYAK</span>
        </div>
      </div>
    </div>
  );
}
