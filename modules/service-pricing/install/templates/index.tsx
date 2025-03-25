import { Install } from "@/types/services/install";
import InstallBundleForm from "../components/form/bundle-form";
import InstallOnlyForm from "../components/form/install-only-form";

interface InstallTemplateProps {
  install: Install
}

export function InstallTemplate({ install }: InstallTemplateProps) {
  const { bundle, installOnly } = install;

  return (
    <>
      <InstallBundleForm values={bundle} />
      <InstallOnlyForm values={installOnly} />
    </>
  );
}