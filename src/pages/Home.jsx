
import { Body } from "../components/body/body";
import { Footer } from "../components/footer/footer";
import { Header } from "../components/header/header";

function Home() {
  return (
    <>
      <div style={{margin: "0",padding:"0"}}>
        <Header/>
        <Body/>
        <Footer/>
      </div>
    </>
  );
}
export default Home;
