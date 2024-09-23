import React from "react";

function NavItem({ text, link, hasUnderline }) {
  return (
    <li className={`whitespace-nowrap ${hasUnderline ? "w-[66px]" : "w-12"}`}>
      <a href={link} className="flex flex-col items-center">
        {text}
        {hasUnderline && (
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0947c4aeb13f405d8dda20a1ebf8472d3cc3dea21c4822f06f45bf7693a93e8c?placeholderIfAbsent=true&apiKey=b9ca3c09dab7473dba421305306c78ba"
            alt=""
            className="object-contain aspect-[66.67] w-[66px]"
          />
        )}
      </a>
    </li>
  );
}

export default NavItem;