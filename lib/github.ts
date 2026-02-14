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

export async function getPinnedRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=6`,
      {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return [];
    const data = (await res.json()) as GitHubRepo[];
    return data.filter((r) => !r.fork).slice(0, 6);
  } catch {
    return [];
  }
}
