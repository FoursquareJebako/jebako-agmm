const AUTO_PORTAL_TIMES = {
  start: new Date('July 25, 2026 07:00:00'),
  pause: new Date('July 25, 2026 16:01:00'),
  resume: new Date('July 26, 2026 6:00:00'),
  end: new Date('July 26, 2026 10:01:00'),
};

export const autoPortal = (now = new Date()) => {
  const hasStarted = now >= AUTO_PORTAL_TIMES.start;
  const hasPaused = now >= AUTO_PORTAL_TIMES.pause;
  const hasResumed = now >= AUTO_PORTAL_TIMES.resume;
  const hasEnded = now >= AUTO_PORTAL_TIMES.end;

  return {
    openPortal: hasStarted, // hasStarted
    votePaused: hasPaused && !hasResumed, // hasPaused && !hasResumed
    voteEnds: hasEnded, //hasEnded
  };
};