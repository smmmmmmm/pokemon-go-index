import getConfig from "next/config";

export function publicURL(filename?: string): string {
  if (!filename) {
    return "";
  }
  const { publicRuntimeConfig } = getConfig() as {
    publicRuntimeConfig: { urlPrefix: string };
  };
  return publicRuntimeConfig.urlPrefix + filename;
}
