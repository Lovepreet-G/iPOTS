import React, { useState } from "react";
import law from "/Law.png";
import "../styles/legal.css";
import Accordion from "react-bootstrap/Accordion";

export default function LegalPage() {
  return (
    <div className="legal">
      <div className="legal-header">
        <img src={law} alt="image of gavel hitting a sounding block" />
        <h1 className="legal-header-title">Legal</h1>
      </div>
      <div className="legal-body">
        <h2 className="legal-body-title">NOTE:</h2>
        <p className="legal-body-text">
          Please note that this is not legal advice, and individuals should
          consult with a legal professional for specific guidance related to
          their situation. Here is a basic guide:
        </p>
      </div>
      <div className="legal-Accordion">
        <div class="accordion accordion-flush" id="accordionFlushExample">
          <div class="accordion-item rounded-2">
            <h2 class="accordion-header">
              <button
                class="accordion-button rounded-2 collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                Lorem Ipsum
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div class="accordion-body">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Suscipit est officia ea eum tempore unde, mollitia quam
                veritatis repudiandae quo. Minus pariatur illo officia! Quam
                excepturi deserunt cum dolore optio.
              </div>
            </div>
          </div>
          <div class="accordion-item rounded-2">
            <h2 class="accordion-header">
              <button
                class="accordion-button rounded-2 collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded="false"
                aria-controls="flush-collapseTwo"
              >
                Lorem Ipsum
              </button>
            </h2>
            <div
              id="flush-collapseTwo"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div class="accordion-body">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex
                unde nihil dolorem aperiam odio atque harum quidem quae cum
                distinctio magni similique ab maxime, repellat ipsum et, labore
                totam quis?
              </div>
            </div>
          </div>
          <div class="accordion-item rounded-2">
            <h2 class="accordion-header">
              <button
                class="accordion-button rounded-2 collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseThree"
                aria-expanded="false"
                aria-controls="flush-collapseThree"
              >
                Lorem Ipsum
              </button>
            </h2>
            <div
              id="flush-collapseThree"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div class="accordion-body">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam
                corporis ratione aliquid. Iste obcaecati mollitia, voluptatem
                asperiores omnis delectus soluta, impedit dolorem enim nemo ad
                debitis similique? Eius, optio in!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
