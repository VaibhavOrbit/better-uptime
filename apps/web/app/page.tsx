import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { MainContent } from "./component/main";

 const App = ()  => {

  return (
      <>
        <MainContent/>
      </>

  );
};

 export default App