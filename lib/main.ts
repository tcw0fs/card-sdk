const DEFAULT_EVENT_S = 5;
const DEFAULT_TICK_MS = 1000;

interface SDKConfig {
  eventSeconds?: number;
}

export default class CardSDK {
  private interval: ReturnType<typeof setInterval> | null = null;
  private passedTime: number = 0;
  private eventMs: number = DEFAULT_EVENT_S * 1000;

  constructor(
    {} = {},
    { eventSeconds = DEFAULT_EVENT_S }: SDKConfig = {
      eventSeconds: DEFAULT_EVENT_S,
    }
  ) {
    this.eventMs = ~~eventSeconds * 1000;
  }

  init() {
    this.interval = setInterval(() => this.loop(), DEFAULT_TICK_MS);
  }

  private loop() {
    this.passedTime += DEFAULT_TICK_MS;
    console.log('Passed time: ', this.passedTime);

    if (this.passedTime >= this.eventMs) {
      this.passedTime = 0;
      //   this.triggerEvent();
    }
  }

  destroy() {
    this.interval && clearInterval(this.interval);
  }
}
