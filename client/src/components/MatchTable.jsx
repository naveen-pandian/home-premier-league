import React, { useMemo } from "react";

function MatchTable({ matchHistory, players }) {

  // ✅ Player map (memoized)
  const playerMap = useMemo(() => {
    const map = {};
    players?.forEach((p) => { map[p.player] = p; });
    return map;
  }, [players]);

  // ✅ Reverse matches (latest first)
  const reversedMatches = useMemo(() => {
    return [...(matchHistory || [])].reverse();
  }, [matchHistory]);

  // ✅ Get ALL winners (handles ties)
  const getWinners = (playersList = []) => {
    if (!playersList.length) return [];
    const parsed = playersList.map((p) => ({
      ...p,
      points: parseFloat(p.points || 0),
      paid: parseFloat(p.paid || 0),
    }));
    const maxPoints = Math.max(...parsed.map((p) => p.points));
    return parsed.filter((p) => p.points === maxPoints);
  };

  // ✅ Total prize = sum of paid
  const getTotalPrize = (playersList = []) =>
    playersList.reduce((sum, p) => sum + parseFloat(p.paid || 0), 0);

  // 🎨 Tailwind gradient mapping
  const colorMap = {
    red: "bg-gradient-to-b from-gray-300 to-gray-900",
    blue: "bg-gradient-to-b from-blue-300 to-blue-600",
    green: "bg-gradient-to-b from-emerald-300 to-emerald-600",
    orange: "bg-gradient-to-b from-rose-300 to-rose-600",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white px-4 py-6">

      {/* Title */}
      <h2 className="text-center text-3xl font-extrabold tracking-widest uppercase text-gray-700 mb-6">
        Match <span className="text-red-500">History</span>
      </h2>

      {!matchHistory?.length ? (
        <p className="text-center text-gray-400 mt-10">
          No match data available
        </p>
      ) : (
        <div className="flex flex-col gap-5 max-w-md mx-auto">
          {reversedMatches.map((match, index) => {
            const winners = getWinners(match?.players);
            const winnerIds = new Set(winners.map((w) => w.player));
            const prize = getTotalPrize(match?.players);

            // ✅ Correct match number (original order)
            const matchNumber = matchHistory.length - index;

            return (
              <div
                key={match?.id || index}
                className="bg-white rounded-3xl shadow-sm p-5 border border-gray-100"
              >
                {/* Card Header */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold tracking-widest uppercase text-gray-400">
                    Match {match?.match || matchNumber}
                  </span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                    {match?.matchOn || "N/A"}
                  </span>
                </div>

                {/* Teams */}
                <div className="flex items-center justify-center gap-3 mb-4">
                  {match?.Teams?.map((team, i) => (
                    <React.Fragment key={i}>
                      <span className="text-sm font-bold tracking-wide text-gray-500 bg-gray-100 px-4 py-1 rounded-full border border-gray-200">
                        {team}
                      </span>
                      {i < match.Teams.length - 1 && (
                        <span className="text-xs font-extrabold text-gray-300">
                          VS
                        </span>
                      )}
                    </React.Fragment>
                  )) || <span className="text-gray-400">Teams</span>}
                </div>

                {/* Players Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {match?.players?.map((p, i) => {
                    const details = playerMap[p.player];
                    const isWinner = winnerIds.has(p.player);
                    const baseColor =
                      colorMap[details?.color] ||
                      "bg-gradient-to-b from-gray-300 to-gray-500";

                    return (
                      <div
                        key={p.player || i}
                        className={`
                          relative rounded-2xl p-3 text-center text-white
                          transition-all duration-300
                          ${baseColor}
                          ${
                            isWinner
                              ? "opacity-100 scale-105 shadow-md"
                              : "opacity-40"
                          }
                        `}
                      >
                        {/* 🏆 Prize Badge */}
                        {isWinner && (
                          <div className="absolute -top-4 -left-4 w-16 h-16 flex items-center justify-center -rotate-[20deg]">

                            {/* Sun Rays */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              {[...Array(10)].map((_, i) => (
                                <span
                                  key={i}
                                  className="absolute w-0 h-0
                                  border-l-[10px] border-r-[10px] border-b-[18px]
                                  border-l-transparent border-r-transparent border-b-yellow-400"
                                  style={{
                                    transform: `rotate(${i * 36}deg) translateY(-22px)`
                                  }}
                                />
                              ))}
                            </div>

                            {/* Center Circle */}
                            <div className="relative w-11 h-11 bg-yellow-400 text-black text-sm font-extrabold rounded-full flex items-center justify-center">
                              ₹{prize}
                            </div>

                          </div>
                        )}

                        {/* Avatar */}
                        {details?.image ? (
                          <img
                            src={details.image}
                            alt={details.name}
                            className="w-12 h-12 rounded-full mx-auto mb-2 object-cover border-2 border-white/50"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full mx-auto mb-2 bg-white/20 border-2 border-white/40 flex items-center justify-center text-lg font-extrabold">
                            {(details?.name || p.player)?.[0]?.toUpperCase() || "?"}
                          </div>
                        )}

                        {/* Name */}
                        <div className="text-xs font-semibold text-white/90 truncate">
                          {details?.name || `Player ${p.player}`}
                        </div>

                        {/* Points */}
                        <div className="text-2xl font-extrabold leading-tight mt-0.5">
                          {p.points}
                        </div>
                        <div className="text-[10px] text-white/60 uppercase tracking-wider">
                          pts
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MatchTable;