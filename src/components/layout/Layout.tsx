import React from "react";
import { BrowserRouter } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Main from "../main/Main";
import "./layout.css";

function Layout() {
  return (
    <section className="Layout">
      <BrowserRouter>
      
        <header>
          <Header />
        </header>

        <main>
          <Main />
        </main>

        <footer>
          <Footer />
        </footer>

      </BrowserRouter>
    </section>
  );
}

export default Layout;
