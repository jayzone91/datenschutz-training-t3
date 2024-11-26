"use client";

import InfoForm from "../../_components/InfoForm";

export default function NewInfoPage() {
  return (
    <div className="container mx-auto">
      <h1>Neue Info anlegen</h1>
      <InfoForm Info={null} />
    </div>
  );
}
