import { useEffect } from "react";

const baseTitle = "RodBase";

export default function PageTitle({ title, description }) {
  useEffect(() => {
    document.title = title ? `${title} | ${baseTitle}` : `${baseTitle} | Fishing Rod Database`;

    if (description) {
      let meta = document.querySelector('meta[name="description"]');

      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }

      meta.setAttribute("content", description);
    }
  }, [title, description]);

  return null;
}
