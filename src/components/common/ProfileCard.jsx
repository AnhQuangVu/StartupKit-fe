export default function ProfileCard({ avatar, name, desc, tag, button }) {
  return (
    <div className="bg-white border rounded-xl shadow p-2 w-full max-w-xs md:w-[180px] flex flex-col items-center mx-auto">
      {avatar && (
        <div className="w-full h-24 md:w-32 md:h-20 mb-2 flex items-center justify-center">
          <img
            src={avatar}
            alt={name}
            className="w-full h-24 md:w-32 md:h-20 rounded-xl object-cover border-2 border-[#FFCE23]"
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      <h3 className="font-bold text-base md:text-sm mb-1 text-center truncate w-full">
        {name}
      </h3>
      <p className="text-gray-500 text-xs md:text-xs mb-2 text-center truncate w-full">
        {desc}
      </p>
      <div className="flex items-center justify-center gap-2 w-full mt-auto">
        {tag && (
          <span className="bg-gray-100 text-gray-700 text-xs md:text-[10px] px-2 py-0.5 rounded truncate">
            {tag}
          </span>
        )}
        {button && (
          <button className="bg-[#FFCE23] hover:bg-yellow-400 text-black font-semibold px-3 py-2 rounded text-xs md:text-xs transition w-full md:w-auto">
            {button}
          </button>
        )}
      </div>
    </div>
  );
}