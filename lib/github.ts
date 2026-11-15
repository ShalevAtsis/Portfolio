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
const OWNER = "ShalevAtsis";

/** Desired display order for the Projects section (repo names). */
export const PROJECT_REPO_ORDER = [
  "SwellSight_Colab",
  "Anomalyze",
  "Multithreaded-TCP-Chat",
  "DevOps-Project",
  "Machine-Learning-Flow",
  "LeetCode",
] as const;

function fallbackRepo(
  id: number,
  name: string,
  description: string,
  language: string,
  topics: string[]
): GitHubRepo {
  return {
    id,
    name,
    full_name: `${OWNER}/${name}`,
    description,
    html_url: `https://github.com/${OWNER}/${name}`,
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    language,
    topics,
    pushed_at: "2026-01-01T00:00:00Z",
  };
}

/**
 * Static snapshot used whenever the GitHub API is unreachable or rate-limited
 * (unauthenticated builds only get 60 requests/hour per IP). Keeps the site
 * buildable offline and guarantees Projects never renders empty.
 */
export const FALLBACK_REPOS: GitHubRepo[] = [
  fallbackRepo(1, "SwellSight_Colab", "AI wave analysis from beach-cam footage: sim-to-real pipeline with Depth-Anything-V2, FLUX.1 and DINOv2.", "Python", ["computer-vision", "pytorch", "genai"]),
  fallbackRepo(2, "Anomalyze", "AI-powered web security scanner with ML-based analysis and CVE intelligence.", "JavaScript", ["security", "react", "nodejs"]),
  fallbackRepo(3, "Multithreaded-TCP-Chat", "Multithreaded TCP chat server with private and broadcast messaging.", "Python", ["sockets", "multithreading"]),
  fallbackRepo(4, "DevOps-Project", "End-to-end DevOps pipeline: Jenkins CI/CD, Selenium UI automation, Gatling benchmarks.", "Java", ["ci-cd", "jenkins", "selenium"]),
  fallbackRepo(5, "Machine-Learning-Flow", "Titanic survival prediction with KNN, Decision Tree and Naive Bayes.", "Jupyter Notebook", ["machine-learning", "scikit-learn"]),
  fallbackRepo(6, "LeetCode", "Optimised solutions to algorithm, data-structure and database problems.", "Python", ["algorithms", "data-structures"]),
];

async function fetchRepo(username: string, name: string): Promise<GitHubRepo | null> {
  const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
  // Optional: authenticated requests get 5,000/hour. The token is only ever
  // read at build time on the server; it is never shipped to the client.
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(`${GITHUB_API}/repos/${username}/${name}`, {
      headers,
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    return (await res.json()) as GitHubRepo;
  } catch {
    return null;
  }
}

/**
 * Fetch repos in display order. Every repo that cannot be fetched is replaced
 * by its static fallback, so the result always has one entry per repo name.
 */
export async function getReposInOrder(
  username: string,
  repoNames: readonly string[] = PROJECT_REPO_ORDER
): Promise<GitHubRepo[]> {
  const live = await Promise.all(repoNames.map((name) => fetchRepo(username, name)));
  return repoNames
    .map((name, i) => live[i] ?? FALLBACK_REPOS.find((r) => r.name === name) ?? null)
    .filter((r): r is GitHubRepo => r !== null && !r.fork);
}

export async function getPinnedRepos(username: string): Promise<GitHubRepo[]> {
  return getReposInOrder(username);
}
