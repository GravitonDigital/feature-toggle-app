export default class FormSubmitOnChange extends HTMLElement {
  formEl: HTMLFormElement | null = null;
  cleanup: () => void = () => {};

  connectedCallback(): void {
    this.formEl = this.querySelector("form");
    const submitButtonEl = this.formEl?.querySelector<HTMLButtonElement>("button[type=submit]");
    const inputEls = this.formEl?.querySelectorAll("input, select, textarea");

    if (!this.formEl || !inputEls) {
      console.error("SubmitFormOnChange: No form or input elements found");
      return;
    }

    // Use setTimeout to wait for reset to finish before submitting
    const eventHandler: EventListenerOrEventListenerObject = (e: Event) => setTimeout(() => this.requestSubmit(e));

    submitButtonEl?.setAttribute("hidden", "");
    this.formEl.addEventListener("reset", eventHandler);
    inputEls.forEach((inputEl) => inputEl.addEventListener("change", eventHandler));

    this.cleanup = () => {
      submitButtonEl?.removeAttribute("hidden");
      this.formEl?.removeEventListener("reset", eventHandler);
      inputEls.forEach((el) => el.removeEventListener("change", eventHandler));
    };
  }

  disconnectedCallback(): void {
    this.cleanup();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  requestSubmit(e: Event): void {
    this.formEl?.requestSubmit();
  }
}
