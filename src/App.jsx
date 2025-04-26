import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Structures/Layout";
import React, { useEffect, Suspense } from "react";
import { CircularProgress, Box } from "@mui/material";
import RestrictedRoute from "./components/routes/RestrictedRoute";
import PrivateRoute from "./components/routes/PrivateRoute";

const HomePage = React.lazy(() => import("./pages/Home"));
const Book = React.lazy(() => import("./pages/Book"));
const Library = React.lazy(() => import("./pages/Library"));
const Rated = React.lazy(() => import("./pages/Rated"));
const RegistrationPage = React.lazy(() => import("./pages/RegistrationPage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));

function App() {
  const fallbackLoader = (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <CircularProgress />
    </Box>
  );

  return (
    <Layout>
      <Suspense fallback={fallbackLoader}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/ratings"
                component={<RegistrationPage />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                redirectTo="/ratings"
                component={<LoginPage />}
              />
            }
          />
          <Route
            path="/ratings"
            element={<PrivateRoute redirectTo="/login" component={<Rated />} />}
          />
          <Route path="/books/:bookId" element={<Book />} />
          <Route path="/books" element={<Library />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
