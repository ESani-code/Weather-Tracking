import { type Dispatch, type SetStateAction } from "react";
import LightDarkToggleMode from "./LightDarkToggleMode";

type Props = {
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

const MobileHeader = ({ setIsSidebarOpen }: Props) => {
  return (
    <div className="xs:hidden w-full h-16 p-4 flex items-center justify-end gap-6 bg-background sticky top-0 z-1002">
      <div>
        <button className="ml-auto pr-3" onClick={() => setIsSidebarOpen(true)}>
          <i className="bi bi-list text-3xl lg:hidden" />
        </button>
      </div>
      <div className="xs:hidden">
        <LightDarkToggleMode />
      </div>
    </div>
  );
};

export default MobileHeader;
