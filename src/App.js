import { ContainerApp, Title, Section } from "App.styles";
import { Suspense, lazy } from "react";
import { Route } from "wouter";
import { FavContextProvider } from "context/favsContext";
import { GifsContextProvider } from "context/GifsContext";
import { AuthContextProvider } from "context/authContext";
import Header from "components/Header";
import Detail from "pages/Detail";
import SearchResults from "pages/SearchResults";
import Register from "pages/Register";
import Login from "pages/Login";
import Favorites from "pages/Favorites";

const HomePage = lazy(() => import("pages/Home"));

export default function App() {
  return (
    <ContainerApp>
      <AuthContextProvider>
        <FavContextProvider>
          <GifsContextProvider>
            <Header />
            <Title to="/">GifSticky</Title>
            <Suspense fallback={null}>
              <Section>
                <Route component={HomePage} path="/" />
                <Route component={Detail} path="/search/:id" />
                <Route component={SearchResults} path="/search/:type/:keyword/:rating?" />
                <Route component={Register} path="/register" />
                <Route component={Login} path="/login" />
                <Route component={Favorites} path="/favorites" />
                <Route component={() => <h1>Error 404</h1>} path="/404" />
              </Section>
            </Suspense>
          </GifsContextProvider>
        </FavContextProvider>
      </AuthContextProvider>
    </ContainerApp>
  );
}
