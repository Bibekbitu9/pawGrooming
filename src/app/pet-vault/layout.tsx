import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BBMP Pet Vault – AI-Powered Document Verification',
  description:
    'Upload your pet\'s vaccination certificates and BBMP registration documents. AI-powered extraction verifies Rabies vaccine dates and tracks renewal deadlines.',
};

export default function PetVaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
