export function isSpeechSupported() {
  return (
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    'SpeechSynthesisUtterance' in window
  );
}

export function speakText(text, options = {}) {
  return new Promise((resolve, reject) => {
    if (!isSpeechSupported()) {
      reject(new Error('Speech synthesis is not supported.'));
      return;
    }

    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new window.SpeechSynthesisUtterance(String(text));
    utterance.lang = options.lang || 'en-US';
    utterance.rate = typeof options.rate === 'number' ? options.rate : 1;
    utterance.pitch = typeof options.pitch === 'number' ? options.pitch : 1;
    utterance.volume = typeof options.volume === 'number' ? options.volume : 1;

    if (typeof options.onstart === 'function') {
      utterance.onstart = (event) => options.onstart(event);
    }

    utterance.onend = (event) => {
      if (typeof options.onend === 'function') {
        options.onend(event);
      }
      resolve(event);
    };

    utterance.onerror = (event) => {
      if (typeof options.onerror === 'function') {
        options.onerror(event);
      }
      reject(event);
    };

    synth.speak(utterance);
  });
}
