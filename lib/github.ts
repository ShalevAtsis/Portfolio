export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  fork?: boolean;
  language: string | null;
  topics?: string[];
  pushed_at: string;
}

const GITHUB_API = "https://api.github.com";

/** Desired display order for the Projects section (repo names). */
export const PROJECT_REPO_ORDER = [
  "SwellSight",
  "Anomalyze",
  "Machine-Learning-Flow",
  "Multithreaded-TCP-Chat",
  "DevOps-Project",
  "LeetCode",
] as const;

export async function getReposInOrder(
  username: string,
  repoNames: readonly string[] = PROJECT_REPO_ORDER
): Promise<GitHubRepo[]> {
  const results: GitHubRepo[] = [];
  for (const name of repoNames) {
    try {
      const res = await fetch(
        `${GITHUB_API}/repos/${username}/${name}`,
        {
          headers: { Accept: "application/vnd.github.v3+json" },
          next: { revalidate: 3600 },
        }
      );
      if (!res.ok) continue;
      const data = (await res.json()) as GitHubRepo;
      if (!data.fork) results.push(data);
    } catch {
      // skip repo if fetch fails
    }
  }
  return results;
}

export async function getPinnedRepos(username: string): Promise<GitHubRepo[]> {
  return getReposInOrder(username);
}
