/**
 * This code was generated by Builder.io.
 */
import React from "react";

function SocialLinks() {
  const socialIcons = ["ext_13-", "ext_14-", "ext_15-", "ext_16-"];

  return (
    <div className="flex gap-6 items-start self-start mt-6">
      {socialIcons.map((icon, index) => (
        <a key={index} href="#" aria-label={`Social media link ${index + 1}`}>
          <img
            loading="lazy"
            src={`http://b.io/${icon}`}
            alt=""
            className="object-contain shrink-0 w-6 aspect-square"
          />
        </a>
      ))}
    </div>
  );
}

export default SocialLinks;
