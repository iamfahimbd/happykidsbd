export default function FeatureCard({ feature }) {
  const Icon = feature.icon;

  const styles = {
    blue: {
      iconBg: "bg-[#26BDFF]/10",
      iconText: "text-[#26BDFF]",
      hover:
        "hover:shadow-[0_20px_50px_rgba(38,189,255,0.20)]",
    },

    pink: {
      iconBg: "bg-[#F74C83]/10",
      iconText: "text-[#F74C83]",
      hover:
        "hover:shadow-[0_20px_50px_rgba(247,76,131,0.20)]",
    },

    yellow: {
      iconBg: "bg-[#F9E553]/30",
      iconText: "text-[#D4A700]",
      hover:
        "hover:shadow-[0_20px_50px_rgba(249,229,83,0.25)]",
    },

    gradient: {
      iconBg:
        "bg-gradient-to-r from-[#26BDFF]/20 to-[#F74C83]/20",
      iconText: "text-[#26BDFF]",
      hover:
        "hover:shadow-[0_20px_50px_rgba(120,120,255,0.20)]",
    },
  };

  const style = styles[feature.color];

  return (
    <div
      className={`
        group
        rounded-3xl
        border
        border-gray-100
        bg-white
        p-5 md:p-8
        text-center
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-transparent
        ${style.hover}
      `}
    >
      {/* Icon */}

      <div
        className={`
          mx-auto
          mb-4
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          transition-all
          duration-300
          ${style.iconBg}
          ${style.iconText}
          group-hover:scale-110
        `}
      >
        <Icon size={28} strokeWidth={2.2} />
      </div>

      {/* Title */}

      <h3 className="text-base font-bold text-gray-900 md:text-xl">
        {feature.title}
      </h3>

      {/* Description */}

      <p className="hidden md:block text-base leading-7 text-gray-600">
        {feature.description}
      </p>
    </div>
  );
}