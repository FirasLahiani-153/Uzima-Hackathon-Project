import { useRef, useState } from 'react';
import bodyImg from '../assets/bodyh.png';

// Detection zones for pain area names
const ZONES = [
  {
    area: 'Head',
    box: { x: 42, y: 6, w: 16, h: 10 }, // %
  },
  {
    area: 'Chest',
    box: { x: 41, y: 17, w: 18, h: 11 },
  },
  {
    area: 'Abdomen',
    box: { x: 42, y: 28, w: 16, h: 11 },
  },
  {
    area: 'Left Arm',
    box: { x: 13, y: 18, w: 13, h: 28 },
  },
  {
    area: 'Right Arm',
    box: { x: 74, y: 18, w: 13, h: 28 },
  },
  {
    area: 'Left Leg',
    box: { x: 39, y: 48, w: 10, h: 32 },
  },
  {
    area: 'Right Leg',
    box: { x: 51, y: 48, w: 10, h: 32 },
  },
];

function getAreaName(x, y) {
  for (const zone of ZONES) {
    const { x: zx, y: zy, w, h } = zone.box;
    if (x >= zx && x <= zx + w && y >= zy && y <= zy + h) {
      return zone.area;
    }
  }
  return 'Other';
}

// Each point: { x: percent, y: percent, area: string }
const BodyMap = ({ onPointsChange, points: controlledPoints }) => {
  const [points, setPoints] = useState([]);
  const containerRef = useRef(null);

  // Use controlled or local state
  const painPoints = controlledPoints !== undefined ? controlledPoints : points;

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    // Check if a dot is already close (within 2% radius)
    const existingIdx = painPoints.findIndex(
      p => Math.hypot(p.x - x, p.y - y) < 2
    );
    let newPoints;
    if (existingIdx !== -1) {
      // Remove
      newPoints = painPoints.filter((_, i) => i !== existingIdx);
    } else {
      // Add
      const area = getAreaName(x, y);
      newPoints = [...painPoints, { x, y, area }];
    }
    if (onPointsChange) onPointsChange(newPoints);
    else setPoints(newPoints);
  };

  return (
    <div className="w-full flex justify-center">
      <div
        className="relative select-none"
        style={{ width: 'min(320px, 90vw)' }}
        ref={containerRef}
      >
        <img
          src={bodyImg}
          alt="Body Map"
          className="w-full h-auto block select-none rounded-xl border border-gray-200 shadow"
          draggable={false}
          onClick={handleClick}
          style={{ cursor: 'crosshair' }}
        />
        {painPoints.map((pt, i) => (
          <span
            key={i}
            title={pt.area}
            onClick={e => {
              e.stopPropagation();
              // Remove this dot
              const newPoints = painPoints.filter((_, idx) => idx !== i);
              if (onPointsChange) onPointsChange(newPoints);
              else setPoints(newPoints);
            }}
            style={{
              position: 'absolute',
              left: `${pt.x}%`,
              top: `${pt.y}%`,
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: '#ef4444',
              boxShadow: '0 0 6px 2px #ef4444aa',
              border: '2px solid #fff',
              transform: 'translate(-50%, -50%)',
              zIndex: 3,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{
              color: '#fff',
              fontSize: 10,
              fontWeight: 700,
              textShadow: '0 1px 4px #ef4444',
              pointerEvents: 'none',
              marginTop: 20,
            }}>{pt.area !== 'Other' ? pt.area : ''}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default BodyMap;
