import React from "react";
import { RuxAccordion } from "../Accordion/rux-accordion";

export const Review = ({ formData }) => {
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
        details={[
          { 'First Name': firstName },
          { 'Last Name': lastName },
          { 'Nick Name': nickName },
        ]}
      />
      <RenderAccordion
        summary="Address"
        details={[
          { 'Address': address },
          { 'City': city },
          { 'State': state },
          { 'Zip': zip },
        ]}
      />
      <RenderAccordion
        summary="Contact"
        details={[
            { 'Phone': phone }, 
            { 'E-Mail': email }
        ]}
      />
    </div>
  );
};

export const RenderAccordion = ({ summary, details }) => (
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
      <button><i></i></button>
    </span>
  </rux-accordion>
);
