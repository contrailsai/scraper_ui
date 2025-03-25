import { Page_container } from "./container"

export const metadata = {
  title: "Contrails | Instagram profile",
}

export default function InstagramProfileViewer() {


  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Instagram Profile Viewer</h1>
      <Page_container />
    </div>
  )
}

