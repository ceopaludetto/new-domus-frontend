import * as React from "react";

interface FocusTrapProps {
  nodeRef: React.MutableRefObject<any>;
  children: React.ReactNode | React.ReactNodeArray;
}

function isHTMLElement(current: any): current is HTMLElement {
  return "querySelectorAll" in current;
}

export function FocusTrap({ nodeRef, children }: FocusTrapProps) {
  function handleTab(els: NodeListOf<HTMLElement>) {
    const first = els[0];
    const last = els[els.length - 1];

    return (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };
  }

  React.useEffect(() => {
    if (nodeRef && nodeRef.current && isHTMLElement(nodeRef.current)) {
      const els = nodeRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href]:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (els.length) {
        els[0].focus();

        const listener = handleTab(els);

        window.addEventListener("keydown", listener);
        return () => window.removeEventListener("keydown", listener);
      }

      return () => {};
    }

    return () => {};
  }, [nodeRef]);

  return <>{children}</>;
}
