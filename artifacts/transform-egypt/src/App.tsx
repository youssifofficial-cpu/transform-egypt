import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nProvider } from "@/lib/i18n";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Transformations from "@/pages/Transformations";
import Boutique from "@/pages/Boutique";
import Reviews from "@/pages/Reviews";
import Book from "@/pages/Book";
import Cart from "@/pages/Cart";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/transformations" element={<Transformations />} />
              <Route path="/boutique" element={<Boutique />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/book" element={<Book />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </I18nProvider>
    </QueryClientProvider>
  );
}
