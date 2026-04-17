import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

const Card = ({ card, index, hovered, setHovered, onClick }) => {
  const isHovered = hovered === index;
  const hasHover = hovered !== null;

  return (
    <motion.div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-xl cursor-pointer block",
        "transition-all duration-500 ease-out"
      )}
      animate={{
        scale: isHovered ? 1.02 : hasHover ? 0.97 : 1,
        filter:
          hasHover && !isHovered
            ? "blur(4px) brightness(0.85)"
            : "blur(0px) brightness(1)",
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{ breakInside: "avoid", marginBottom: 24 }}
    >
      <div className="w-full overflow-hidden rounded-xl" style={{ aspectRatio: '3/4' }}>
        <motion.img
          src={card.src}
          alt={card.title}
          className="w-full h-full object-cover block"
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          loading="lazy"
        />
      </div>

      {/* 底部渐变遮罩 + 标题 */}
      <motion.div
        className="absolute inset-x-0 bottom-0 rounded-b-xl flex items-end p-5 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
          height: "55%",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="flex flex-col gap-1">
          <span
            className="text-white text-lg font-medium tracking-wide"
            style={{ fontFamily: "var(--heading)" }}
          >
            {card.title}
          </span>
          {card.description && (
            <span
              className="text-white/80 text-sm line-clamp-2"
              style={{ fontFamily: "var(--sans)" }}
            >
              {card.description}
            </span>
          )}
        </div>
      </motion.div>

      {/* 角标 */}
      {card.tag && (
        <div className="absolute top-3 left-3 z-10">
          <span
            className="inline-block px-2.5 py-1 text-xs rounded-full text-white font-medium"
            style={{ backgroundColor: "var(--ochre-brown)" }}
          >
            {card.tag}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export function FocusCards({ cards, className }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      className={cn(
        "columns-1 sm:columns-2 lg:columns-3 gap-6",
        className
      )}
    >
      {cards.map((card, index) => (
        <Card
          key={card.id || index}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
          onClick={card.onClick}
        />
      ))}
    </div>
  );
}
