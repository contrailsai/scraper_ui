import { Page_container } from "./container";

export const metadata = {
  title: "Contrails | Video downloader",
}

export default function Page() {

  return (
    <div className="px-5 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Download Video From Social Media</h1>
      <Page_container />
    </div>
  );
}
