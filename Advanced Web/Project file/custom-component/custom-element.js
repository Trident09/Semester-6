class MyCustomElement extends HTMLElement {
	constructor() {
		super();

		const shadow = this.attachShadow({ mode: "open" });

		const template = document.createElement("template");
		template.innerHTML = `
            <style>
                :host {
                    display: block;
                    margin-bottom: 20px;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }

                .container {
                    font-family: 'Arial', sans-serif;
                    padding: 20px;
                    background-color: #ffffff;
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                }
            </style>
            <div class="container">
                <slot></slot>
            </div>
        `;

		shadow.appendChild(template.content.cloneNode(true));
	}
}

customElements.define("my-custom-element", MyCustomElement);
