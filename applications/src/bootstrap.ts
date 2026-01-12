import { registerTask } from "./utils/appLoader";
import { initAuth } from "./context/AuthContext";
import Logo from "../src/assets/logo.png";

registerTask(() => initAuth());

registerTask(() => document.fonts.ready);

registerTask(
  () =>
    new Promise((resolve) => {
      const img = new Image();
      img.src = Logo;
      img.onload = () => resolve(true);
    })
);
