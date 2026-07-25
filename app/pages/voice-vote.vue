<template>
  <div id="voice-vote-page">
    <div class="page-frame" :class="{ active: aiAction.speaking || aiAction.listening }"></div>
    <div id="close-chat">Close voice chat</div>
    <div id="ai-container">
      <h3>Jebako AI vote Assistant</h3>
      <div class="ai-content">
        <p class="ai-action">{{ aiActionText }}</p>
        <p class="ai-speech">
          {{ aiSpeech }}
        </p>
      </div>
    </div>
    <div class="orb-shell">
      <button id="orb" :class="aiAction.listening ? 'orb-gradient' : 'orb-disabled'" type="button" aria-label="Start voice input">
        <Icon name="material-symbols-light:stop-rounded" style="color: #ccc" size="35px" />
      </button>
      <p class="orb-text">Click the orb to start speaking</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from '#imports';
import { isSpeechSupported, speakText } from '../utils/voice';

const aiAction = ref({
  speaking: false,
  listening: false,
  processing: false,
});

const aiActionText = computed(() => {
  if (aiAction.value.speaking) {
    return 'AI is speaking...';
  } else if (aiAction.value.listening) {
    return 'AI is listening...';
  } else if (aiAction.value.processing) {
    return 'AI is processing...';
  } else {
    return 'What would you like to do?';
  }
});

const aiSpeech = ref(
  "Hi there! Welcome to the Jebako AGMM voting platform. I am your AI assistant, and I am here to help you with the voting process. Please tell me your access code and we will proceed with the voting."
);


</script>

<style scoped lang="less">
@import "../assets/theme.less";

#voice-vote-page {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;
}

/* --- Top and Bottom Only (16px Blurred Edge) --- */
.page-frame {
  position: absolute; 
  inset: 0; 
  pointer-events: none; 
  z-index: 999; 
  opacity: 0; 
  transition: opacity 0.5s ease-in-out;
  overflow: hidden; 
}

.page-frame.active {
  opacity: 1;
}

.page-frame::before {
  content: "";
  position: absolute;
  
  /* Push -8px off the top and bottom, stay flush on the left/right */
  inset: -8px 0; 
  border-top: 0;
  border-bottom: 16px solid transparent;
  border-left: 0;
  border-right: 0;
  
  /* The moving Cyan and Light Blue gradient */
  background: linear-gradient(
    60deg,
    rgba(0, 255, 255, 0) 10%,
    rgba(0, 255, 255, 0.9) 30%,
    rgba(0, 119, 255, 1) 50%,
    rgba(0, 255, 255, 0.9) 70%,
    rgba(0, 255, 255, 0) 90%
  ) border-box;
  
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: destination-out;
  mask-composite: exclude;
  filter: blur(100px);
  
  background-size: 300% 300%;
  animation: frame-move 3s linear infinite;
}

@keyframes frame-move {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

#close-chat {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1rem;
  cursor: pointer;
  background: linear-gradient(225deg, #b0b1b1 25%, #bebebe 100%);
  padding: 5px 12px;
  color: #fff;
  border-radius: 15px;
  text-align: center;
}

#ai-container {
  position: absolute;
  top: 50px;
  width: 100%;
  text-align: center;
  margin-top: 10px;

  h3 {
    font-size: 1.5rem;
    color: #666;
  }
}

.ai-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 5px;
  padding: 0 20px;

  p {
    font-size: 1.2rem;
    color: #666;
  }
}

.ai-speech {
  font-size: 1.2rem;
  color: #666;
  margin-top: 30px;
  background: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
}

.orb-shell {
  width: 100%;
  position: absolute;
  bottom: 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

#orb {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.orb-text {
  font-size: 1.2rem;
  color: #666;
}

.orb-gradient {
  background: linear-gradient(225deg, #83a858 0%, #9ca82e 25%, #1e8939 50%, #1fa3be 75%, #c22aa1 100%);
  animation: gradient-wave 9s ease infinite alternate;
  /* make the background larger than the element so moving the background-position is visible */
  background-size: 200% 200%;
  overflow: hidden;
  box-shadow: rgba(10, 10, 16, 0.1) 0px 0px 16px;
  border: 5px solid rgba(255, 255, 255, 0.3);
}

.orb-disabled {
  cursor: not-allowed;
  animation: none;
  filter: grayscale(100%) opacity(0.6);
  background: linear-gradient(225deg, #83a858 0%, #9ca82e 25%, #1e8939 50%, #1fa3be 75%, #c22aa1 100%);
  border-color: rgba(255, 255, 255, 0.15);
}

@keyframes gradient-wave {

  0%,
  100% {
    background-position: 0% 50%;
  }

  25% {
    background-position: 100% 50%;
  }

  50% {
    background-position: 100% 100%;
  }

  75% {
    background-position: 0% 100%;
  }
}
</style>