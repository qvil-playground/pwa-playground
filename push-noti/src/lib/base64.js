const convertDataURIToBinary = dataURI => {
  // const BASE64_MARKER = ";base64,";
  // const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  // const base64 = dataURI.substring(base64Index);
  const padding = "=".repeat((4 - (dataURI.length % 4)) % 4);
  const base64 = (dataURI + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = window.atob(base64);
  const rawLength = raw.length;
  // const array = new Uint8Array(new ArrayBuffer(rawLength));
  const array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
};

export default convertDataURIToBinary;
