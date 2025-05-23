import InstallBundleForm from "../components/form/bundle-form";
import InstallOnlyForm from "../components/form/install-only-form";

export function InstallTemplate() {
  return (
    <>
      <InstallBundleForm />
      <InstallOnlyForm />
    </>
  );
}
