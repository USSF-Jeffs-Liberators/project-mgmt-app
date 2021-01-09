import React from "react";
import { RuxAccordion } from "../Accordion/rux-accordion";

export const Review = ({ formData, navigation }) => {
  const { go } = navigation;
  const {
    firstName,
    lastName,
    nickName,
    address,
    city,
    state,
    zip,
    phone,
    email,
  } = formData;

  return (
    <div>
      <h1>Review</h1>
      <RenderAccordion
        summary="Names"
        go={ go }
        details={[
          { 'First Name': firstName },
          { 'Last Name': lastName },
          { 'Nick Name': nickName },
        ]}
      />
      <RenderAccordion
        summary="Address"
        go={ go }
        details={[
          { 'Address': address },
          { 'City': city },
          { 'State': state },
          { 'Zip': zip },
        ]}
      />
      <RenderAccordion
        summary="Contact"
        go={ go }
        details={[{ 'Phone': phone }, { 'E-Mail': email }]}
      />
      <button
        className="rux-button"
        type="button"
        style={{ marginTop: "1rem" }}
      >
        Submit
      </button>
    </div>
  );
};

export const RenderAccordion = ({ summary, details, go }) => (
  <rux-accordion>
    <span slot="label">{summary}</span>
    <span slot="content">
      <ul>
        {details.map((data, index) => {
          const objKey = Object.keys(data)[0];
          const objValue = data[Object.keys(data)[0]];
          return <li>{`${objKey}: ${objValue}`}</li>;
        })}
      </ul>
      <rux-button size="small" iconOnly onClick={() => go(`${summary.toLowerCase()}`)}>
        <rux-icon icon="resources" library="/icons/astro.svg" />
      </rux-button>
    </span>
  </rux-accordion>
);
