/**
 * This code was generated by Builder.io.
 */
import React from "react";

const SocialLinks = () => {
  const socialIcons = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/30ef1881c8ba382ad841b10dec22c4728e1ac56594cd8fd1b8fc54e4c0c91052?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb",
      alt: "Facebook",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/93fa87233ec955ff04576feefc40e56c04c88bf1a46815e8a2dbe02743fde52a?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb",
      alt: "Twitter",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d0b67f52bb53b8c3b436cfc50867157e647c1cc5fa6f7cc373ba309b35f3d286?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb",
      alt: "Instagram",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/017f03fd6271e23e94e189db8506f53ec67e53623ecac07e20b0cc0e64aa481c?placeholderIfAbsent=true&apiKey=a7423420d6024871abbabbd8b3aee7fb",
      alt: "LinkedIn",
    },
  ];

  return (
    <div className="flex gap-6 items-start self-start mt-6">
      {socialIcons.map((icon, index) => (
        <a key={index} href="#" aria-label={icon.alt}>
          <img
            loading="lazy"
            src={icon.src}
            className="object-contain shrink-0 w-6 aspect-square"
            alt=""
          />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
