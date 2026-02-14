import { getPinnedRepos } from "@/lib/github";
import Navbar from "@/components/Navbar";
import ViewSwitcher from "@/components/ViewSwitcher";

const GITHUB_USERNAME = "ShalevAtsis";

export default async function Home() {
  const repos = await getPinnedRepos(GITHUB_USERNAME);

  return (
    <>
      <Navbar />
      <ViewSwitcher repos={repos} />
    </>
  );
}
