import { PreviewCodeTabs } from "../../components/landing/components/preview/preview-code-tabs";
import { Button } from "../../components/ui/button";

const exampleCode = `'use client'

import React from 'react';
import { Button } from "../../components/ui/button";

export default function ExampleButtons() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Button variant="primary" size="sm">Primary Small</Button>
      <Button variant="primary" size="md">Primary Medium</Button>
      <Button variant="primary" size="lg">Primary Large</Button>
      <Button variant="secondary" size="sm">Secondary Small</Button>
      <Button variant="secondary" size="md">Secondary Medium</Button>
      <Button variant="secondary" size="lg">Secondary Large</Button>
      <Button variant="outline" size="sm">Outline Small</Button>
      <Button variant="outline" size="md">Outline Medium</Button>
      <Button variant="outline" size="lg">Outline Large</Button>
    </div>
  );
}
`;

export default function ComponentButton() {
  return (
    <>
      <PreviewCodeTabs code={exampleCode}>
        <div className="grid grid-cols-3 gap-4">
          <Button variant="primary" size="sm">Primary Small</Button>
          <Button variant="primary" size="md">Primary Medium</Button>
          <Button variant="primary" size="lg">Primary Large</Button>
          <Button variant="secondary" size="sm">Secondary Small</Button>
          <Button variant="secondary" size="md">Secondary Medium</Button>
          <Button variant="secondary" size="lg">Secondary Large</Button>
          <Button variant="outline" size="sm">Outline Small</Button>
          <Button variant="outline" size="md">Outline Medium</Button>
          <Button variant="outline" size="lg">Outline Large</Button>
        </div>
      </PreviewCodeTabs>
    </>
  );
}
