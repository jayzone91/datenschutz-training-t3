"use client";

import InfoKatForm from "../../_components/CatForm";

export default function NewInfoKatPage() {
  return (
    <div className="container mx-auto">
      <h1>Neue Info Kategorie anlegen</h1>
      <InfoKatForm Info={null} />
    </div>
  );
}
